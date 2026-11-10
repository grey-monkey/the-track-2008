import * as T from '../vendor/three.module.js';
import {Locomotion144} from './locomotion144.mjs';
import {adaptSlidePose,slideTime} from './slide-pose144.mjs';
import {ArticulatedBody,retarget,clips,animationData} from './body.mjs';
const boardIndex=animationData.skeleton.bones.findIndex(b=>b.name==='burnq_board');
const boardBindInverse=retarget.sourcePose(null).rotation[boardIndex].clone().invert();
const anchor=new T.Vector3(0,0,0);
const smooth=T.MathUtils.smoothstep;
export class ArticulatedSkating{
 constructor(view){this.view=view;this.h=view.human;this.body=new ArticulatedBody(this.h);this.lastClip=null;this.lastTime=-1;this.locomotion=new Locomotion144(clips);}
 update(sim){
  const v=this.view,h=this.h,r=sim.rider;
  // The authored rope reach stays in control while towing. Free skating uses the full rig.
  if(r.holding){this.lastClip=null;this.lastMotionKey=null;this.body.lastPose=null;this.locomotion.reset();this.fromPose=null;this.turnWeight=0;this.carve=0;this.compression=0;h.position.y=.023;return;}
  const selected=this.locomotion.sample(sim,h);
  if(selected.neutralizeYaw)selected.time=slideTime(retarget,clips[selected.clip],boardBindInverse,selected.sourceYaw);
  const {clip,time,kind}=selected;
  const discontinuity=sim.time<this.lastTime||sim.time-this.lastTime>.75;
  const motionKey=clip+':'+kind;
  if(motionKey!==this.lastMotionKey||discontinuity){
   this.transitionAt=sim.time;this.transitionDuration=selected.blend;
   this.fromPose=discontinuity?null:this.body.lastPose;
  }
  const baseBoardQ=v.board.quaternion.clone(),basePosition=v.board.position.clone();
  const riderBase=basePosition.clone().add(new T.Vector3(0,v.board.userData.deckHeight,0));
  const riderQ=v.rider.quaternion.clone(),inverseRider=riderQ.clone().invert();
  const finalBoardQ=pose=>{const q=baseBoardQ.clone();if(r.height>0||r.manual||selected.rotateBoard){const d=pose.board.rotation.clone().multiply(boardBindInverse);if(h.stance==='REGULAR'){d.y=-d.y;d.z=-d.z;}q.multiply(d);}return q;};
  const stepping=kind==='push'||kind==='brake';
  const planted=['idle','turn','crouch','land','powerslide'].includes(kind);
  // Transform the actual rendered deck plane into the signed/scaled rig frame.
  // Resolve from the blended pose so feet and board share exactly one reference.
  const deckPlane=(planted||stepping||r.manual||selected.rotateBoard)?pose=>{
   const q=finalBoardQ(pose),N=new T.Vector3(0,1,0).applyQuaternion(q);
   const raw=N.clone().applyQuaternion(inverseRider).multiply(h.scale),length=raw.length();
   const center=new T.Vector3(0,v.board.userData.deckHeight,0).applyQuaternion(q).add(basePosition);
   return {normal:raw.divideScalar(length),offset:N.dot(center.sub(riderBase))/length,sides:stepping?['r']:['l','r']};
  }:null;
  const grip=v.board.children.find(m=>m.name.startsWith('grip-'));
  if(grip&&!grip.geometry.boundingBox)grip.geometry.computeBoundingBox();
  const bounds=grip?.geometry.boundingBox,inverseBoard=baseBoardQ.clone().invert();
  const deckNormal=new T.Vector3(0,1,0).applyQuaternion(baseBoardQ);
  const deckCenter=new T.Vector3(0,v.board.userData.deckHeight,0).applyQuaternion(baseBoardQ).add(basePosition);
  const footFloor=stepping?(point,{pose})=>{
   const world=point.clone().sub(pose.board.position).multiply(h.scale).applyQuaternion(riderQ).add(riderBase);
   let ground=v.hazards?.skateHeight?.(world.x,world.z)??v.surfaceGround(world.x,world.z);
   const boardLocal=world.clone().sub(basePosition).applyQuaternion(inverseBoard);
   // A stepping sole must clear the deck before it can descend to the road.
   if(bounds&&boardLocal.x>=bounds.min.x&&boardLocal.x<=bounds.max.x&&boardLocal.z>=bounds.min.z&&boardLocal.z<=bounds.max.z&&deckNormal.y>.25){
    const deckY=deckCenter.y-(deckNormal.x*(world.x-deckCenter.x)+deckNormal.z*(world.z-deckCenter.z))/deckNormal.y;
    ground=Math.max(ground,deckY);
   }
   return pose.board.position.y+(ground-riderBase.y)/h.scale.y+animationData.contacts.airOffset;
  }:null;
  const gaze=new T.Vector3(r.vx,0,r.vz).applyQuaternion(inverseRider);if(h.scale.x<0)gaze.x=-gaze.x;
  const poseTransform=selected.neutralizeYaw?pose=>adaptSlidePose(pose,animationData.rig,boardBindInverse,gaze):null;
  const elapsed=T.MathUtils.clamp(sim.time-this.lastTime,0,.05);
  this.turnWeight=(this.turnWeight??0)+((selected.weight??0)-(this.turnWeight??0))*(1-Math.exp(-elapsed*13));
  const turn=(r.lean??0)/.48*(h.stance==='REGULAR'?-1:1),anticipation=r.rampApproach==null?0:Math.sin(Math.PI*r.rampApproach)*.105;
  this.carve=(this.carve??0)+(turn-(this.carve??0))*(1-Math.exp(-elapsed*10));
  this.compression=(this.compression??0)+((Math.abs(turn)*.045+anticipation)-(this.compression??0))*(1-Math.exp(-elapsed*12));
  // Source turn and landing clips already articulate the hips, knees and arms.
  // The old generic lean would overwrite/double their authored weight shift.
  const posture=kind==='idle'?{lean:this.carve,compression:this.compression}:null;
  const basePose=selected.baseClip?retarget.sample(clips[selected.baseClip],sim.time%clips[selected.baseClip].duration):null;
  const fade=smooth(sim.time-this.transitionAt,0,this.transitionDuration??.14);
  const pose=this.body.apply(clip,time,{anchor,deckPlane,posture,basePose,poseWeight:basePose?this.turnWeight:1,
   from:fade<1?this.fromPose:null,mix:fade,
   relaxedArms:0,poseTransform,footFloor});
  this.selected=selected;
  // The board is the moving reference: source root height must not add a second jump.
  if(selected.orbitBoard){
   // Native clip rotates around the hips. Preserve its board orbit instead of
   // pinning the inverted board in space and dragging the head underground.
   const origin=retarget.sample(clips[clip],0).board.position;
   const orbit=pose.board.position.clone().sub(origin).multiply(h.scale).applyQuaternion(riderQ).multiplyScalar(fade);
   v.board.position.add(orbit);
  }
  h.position.set(0,0,0);v.rider.position.copy(v.board.position);v.rider.position.y+=v.board.userData.deckHeight;
  const delta=pose.board.rotation.clone().multiply(boardBindInverse);
  if(h.stance==='REGULAR'){delta.y=-delta.y;delta.z=-delta.z;}
  if(r.height>0||r.manual||selected.rotateBoard)v.board.quaternion.multiply(delta);
  if(r.manual&&v.boardContact){v.boardContact.supportCache.clear();const old=v.board.position.y;v.board.position.y=Math.max(...v.boardContact.parts.map(p=>v.boardContact.support(p)));v.rider.position.y+=v.board.position.y-old;}
  // All supported poses use the same offset; individual feet solve their own
  // contacts instead of lifting the whole skater to hide a penetrating shoe.
  v.rider.position.y-=animationData.contacts.airOffset*h.scale.y;
  v.rider.updateWorldMatrix(true,true);this.lastClip=clip;this.lastMotionKey=motionKey;this.lastTime=sim.time;
 }
}

import {buildDualQuaternions,dualSkin,sleeveMask} from './sleeve-skin141.mjs';
import {relaxSkatingArms} from './relaxed-arms141.mjs';
import {skatePosture} from './skate-posture140.mjs';
import * as T from '../vendor/three.module.js';
import {supportFootOnDeck,supportPushFoot} from './sole-support144.mjs';
import {createRetarget} from './retarget.mjs';
import {RiderFall} from '../rider-fall.js';
import {fallMotion as previousMotion} from './legacy-fall.mjs';
const response=await fetch('./assets/articulated135.json.gz');
if(!response.ok)throw Error('Animation data unavailable');
export const animationData=JSON.parse(await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).text());
export const retarget=createRetarget(animationData.rig,animationData.skeleton);
export const clips=animationData.clips;
import {chooseFall} from './sequences.mjs';
export const fallClip=chooseFall;
export class ArticulatedBody{
 constructor(h){this.h=h;this.parts=[];for(const [role,m]of Object.entries(h.surfaces)){const binding=animationData.rig.characters[h.name][role];if(!binding)throw Error('Missing animation binding '+h.name+'/'+role);const base=m.userData.rideGeometry;if(binding.count!==base.attributes.position.count)throw Error('Animation vertex mismatch '+role);let g=m.userData.articulatedGeometry;if(!g){g=base.clone();if(binding.visibleIndices)g.setIndex(binding.visibleIndices);g.morphAttributes={};g.morphTargetsRelative=false;g.setAttribute('position',base.attributes.position.clone().setUsage(T.DynamicDrawUsage));g.setAttribute('normal',base.attributes.normal.clone().setUsage(T.DynamicDrawUsage));m.userData.articulatedGeometry=g;}m.frustumCulled=false;this.parts.push({m,g,base,weights:binding.weights,joints:binding.joints,sleeve:h.name==='SALLY'&&role==='clothing'?sleeveMask(binding,animationData.rig.bones):null});}this.matrices=new Float64Array(animationData.rig.bones.length*16);}
 apply(clip,time,{grounded=true,blend=1,origin=null,anchor=null,from=null,mix=1,basePose=null,poseWeight=1,footFloor=null,deckPlane=null,posture=null,relaxedArms=0,poseTransform=null}={}){
  let pose=retarget.sample(clips[clip],time);const start=origin??retarget.sample(clips[clip],0).pelvis;
  const blendPose=(a,b,t)=>{const p=retarget.blend(a,b,t);if(a.board&&b.board)p.board={position:a.board.position.clone().lerp(b.board.position,t),rotation:a.board.rotation.clone().slerp(b.board.rotation,t)};return p;};
  if(poseTransform)pose=poseTransform(pose);
  if(basePose)pose=blendPose(basePose,pose,poseWeight);
  if(relaxedArms)relaxSkatingArms(pose,animationData.rig,posture?.lean??0,relaxedArms);
  if(posture)skatePosture(pose,animationData.rig,posture);
  // Blend complete rigid joints before skinning. Modifiers belong to the target
  // pose only: applying them again to the outgoing pose compounds its lean.
  if(from)pose=blendPose(from,pose,mix);
  const supportPart=(footFloor!=null||deckPlane)?this.parts.find(p=>p.m===this.h.surfaces.shoes):null;
  if(footFloor!=null&&supportPart)supportPushFoot(pose,animationData.rig,supportPart.base.attributes.position.array,supportPart,animationData.contacts.soleVertexIds,footFloor);
  if(deckPlane&&supportPart){
   // Resolve after the pose blend, from the same board orientation that renders.
   const normal=typeof deckPlane==='function'?deckPlane(pose):deckPlane;
   for(const side of normal.sides??['l','r'])supportFootOnDeck(pose,animationData.rig,side,supportPart.base.attributes.position.array,supportPart,animationData.contacts.soleVertexIds[side],normal,animationData.contacts.airOffset);
  }
  const dx=anchor?pose.board.position.x-anchor.x:pose.pelvis.x-start.x,dy=anchor?pose.board.position.y-anchor.y:0,dz=anchor?pose.board.position.z-anchor.z:pose.pelvis.z-start.z;
  for(let i=0;i<pose.skin.length;i++){this.matrices.set(pose.skin[i].elements,i*16);this.matrices[i*16+12]-=dx;this.matrices[i*16+13]-=dy;this.matrices[i*16+14]-=dz;}

  const mat=this.matrices;
  if(this.h.name==='SALLY'){this.dual??=new Float64Array(animationData.rig.bones.length*8);this.dualOut??=new Float64Array(6);buildDualQuaternions(mat,this.dual);}
  for(const p of this.parts){const {m,g,base,weights,joints}=p;if(m.geometry!==g){m.geometry=g;m.updateMorphTargets();}const source=base.attributes.position.array,normal=base.attributes.normal.array,out=g.attributes.position.array,norm=g.attributes.normal.array;
   for(let i=0;i<source.length/3;i++){const at=i*3,x=source[at],y=source[at+1],z=source[at+2],nx=normal[at],ny=normal[at+1],nz=normal[at+2];let ox=0,oy=0,oz=0,nnx=0,nny=0,nnz=0;
    for(let k=0;k<8;k++){const w=weights[i*8+k];if(!w)continue;const j=joints[i*8+k]*16;ox+=w*(mat[j]*x+mat[j+4]*y+mat[j+8]*z+mat[j+12]);oy+=w*(mat[j+1]*x+mat[j+5]*y+mat[j+9]*z+mat[j+13]);oz+=w*(mat[j+2]*x+mat[j+6]*y+mat[j+10]*z+mat[j+14]);nnx+=w*(mat[j]*nx+mat[j+4]*ny+mat[j+8]*nz);nny+=w*(mat[j+1]*nx+mat[j+5]*ny+mat[j+9]*nz);nnz+=w*(mat[j+2]*nx+mat[j+6]*ny+mat[j+10]*nz);}
    if(p.sleeve){
     const sleeve=p.sleeve[i];if(sleeve>0){dualSkin(this.dual,joints,weights,i*8,x,y,z,nx,ny,nz,this.dualOut);ox+=(this.dualOut[0]-ox)*sleeve;oy+=(this.dualOut[1]-oy)*sleeve;oz+=(this.dualOut[2]-oz)*sleeve;nnx+=(this.dualOut[3]-nnx)*sleeve;nny+=(this.dualOut[4]-nny)*sleeve;nnz+=(this.dualOut[5]-nnz)*sleeve;}
    }
    out[at]=x+(ox-x)*blend;out[at+1]=y+(oy-y)*blend;out[at+2]=z+(oz-z)*blend;norm[at]=nnx;norm[at+1]=nny;norm[at+2]=nnz;
   }g.attributes.position.needsUpdate=true;g.attributes.normal.needsUpdate=true;
  }
  const h=this.h;h.armTurn.identity();h.headTurn.identity();h.headUniforms.armTurn.value.set(0,0,0,1);h.headUniforms.turn.value.set(0,0,0,1);for(const u of Object.values(h.pushUniforms??{}))u.value.identity();h.rotation.set(0,0,0);this.lastPose=pose;return pose;
 }
}
export class ArticulatedFall{
 constructor(rider,human,road,initialPose=null){this.initialPose=initialPose;this.rider=rider;this.human=human;this.road=road;this.body=new ArticulatedBody(human);this.point=new T.Vector3();this.matrix=new T.Matrix4();}
 update(sim){
  if(sim.reviewLegacy){this.legacy??=new RiderFall(this.rider,this.human,this.road);this.legacy.poseFunction=s=>previousMotion(s).weights;this.legacy.angleFunction=previousMotion;this.legacy.surface=this.surface;this.legacy.update(sim);return;}
  const info=fallClip(sim),r=this.rider,h=this.human,t=sim.phaseTime;const recovering=!!info.getup&&Number.isFinite(sim.rider.recoverStart);const clip=recovering?info.getup:info.fall,age=recovering?sim.time-sim.rider.recoverStart:Math.min(t,info.duration);
  const entry=this.initialPose&&t<.16;
  this.body.apply(clip,age,{blend:this.initialPose?1:T.MathUtils.smoothstep(t,0,.13),origin:retarget.sample(clips[info.fall],0).pelvis,from:recovering&&info.getup?retarget.sample(clips[info.fall],info.duration):entry?this.initialPose:null,mix:T.MathUtils.smoothstep(entry?t:age,0,entry?.16:.22)});
  r.rotation.order='YXZ';r.rotation.set(0,-(sim.rider.crashMotion?.travelHeading??sim.rider.heading)-Math.PI/2,0);r.position.set(sim.rider.x,0,sim.rider.z);h.updateMatrix();this.matrix.makeRotationFromQuaternion(r.quaternion).multiply(h.matrix);
  let support=-Infinity;const e=this.matrix.elements;const surface=this.surface??((x,z)=>this.road.height(x,z)??0);const local=surface.prepare?.(r.position.x-3,r.position.x+3,r.position.z-3,r.position.z+3)??surface;const ceiling=local.upperBound?.(r.position.x-3,r.position.x+3,r.position.z-3,r.position.z+3)??Infinity;
  for(const {g}of this.body.parts){const a=g.attributes.position.array;for(let i=0;i<a.length;i+=3){const x=a[i],y=a[i+1],z=a[i+2],wy=e[1]*x+e[5]*y+e[9]*z+e[13],wx=r.position.x+e[0]*x+e[4]*y+e[8]*z+e[12],wz=r.position.z+e[2]*x+e[6]*y+e[10]*z+e[14];if(ceiling-wy>=support)support=Math.max(support,local(wx,wz)-wy);}}
  r.position.y=support+.007+(sim.rider.fallLift??0);r.updateWorldMatrix(true,true);
 }
}

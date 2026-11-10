import * as T from '../vendor/three.module.js';
const up=new T.Vector3(0,1,0),forward=new T.Vector3(0,0,1);
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
export const boardYaw=(pose,bindInverse)=>{const f=forward.clone().applyQuaternion(pose.board.rotation.clone().multiply(bindInverse));return Math.atan2(f.x,f.z);};
const slideTables=new WeakMap();
export function slideTime(retarget,clip,bindInverse,yaw){
 let table=slideTables.get(clip);
 // Both source clips reach the sideways loaded pose before the 65% switch event.
 if(!table){table=Array.from({length:49},(_,i)=>{const t=clip.duration*.48*i/48;return {t,y:Math.abs(boardYaw(retarget.sample(clip,t),bindInverse))};});slideTables.set(clip,table);}
 const target=Math.abs(yaw);
 for(let i=1;i<table.length;i++)if(table[i].y>=target){const a=table[i-1],b=table[i];return a.t+(b.t-a.t)*T.MathUtils.clamp((target-a.y)/Math.max(.00001,b.y-a.y),0,1);}
 return table.at(-1).t;
}
// Remove the source switch maneuver's yaw around its board anchor. The Track's
// physical deck heading remains authoritative; hip/knee/arm articulation survives.
export function adaptSlidePose(pose,rig,bindInverse,gaze){
 const q=new T.Quaternion().setFromAxisAngle(up,-boardYaw(pose,bindInverse)),p=pose.board.position;
 const m=new T.Matrix4().makeTranslation(p.x,p.y,p.z).multiply(new T.Matrix4().makeRotationFromQuaternion(q)).multiply(new T.Matrix4().makeTranslation(-p.x,-p.y,-p.z));
 for(let i=0;i<pose.world.length;i++){pose.world[i].premultiply(m);pose.skin[i].premultiply(m);pose.positions[i].applyMatrix4(m);pose.rotations[i].premultiply(q);}
 pose.board.rotation.premultiply(q);pose.pelvis=pose.positions[rig.bones.findIndex(b=>b.name==='pelvis')];
 if(gaze){
  const head=rig.bones.findIndex(b=>b.name==='head'),face=new T.Vector3(-.7605468035,-.6421248913,.0961471796).transformDirection(pose.skin[head]);
  const delta=T.MathUtils.clamp(angle(Math.atan2(gaze.x,gaze.z)-Math.atan2(face.x,face.z)),-1.18,1.18);
  for(const [name,weight]of [['neck_01',.40],['head',.60]]){
   const id=rig.bones.findIndex(b=>b.name===name),pivot=pose.positions[id],turn=new T.Quaternion().setFromAxisAngle(up,delta*weight);
   const rot=new T.Matrix4().makeTranslation(pivot.x,pivot.y,pivot.z).multiply(new T.Matrix4().makeRotationFromQuaternion(turn)).multiply(new T.Matrix4().makeTranslation(-pivot.x,-pivot.y,-pivot.z));
   for(let i=0;i<rig.bones.length;i++){let j=i;while(j>=0&&j!==id)j=rig.bones[j].parent;if(j!==id)continue;pose.world[i].premultiply(rot);pose.skin[i].premultiply(rot);pose.positions[i].applyMatrix4(rot);pose.rotations[i].premultiply(turn);}
  }
 }
 return pose;
}

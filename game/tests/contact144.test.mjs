import assert from 'node:assert/strict';
import fs from 'node:fs';import zlib from 'node:zlib';
import * as T from '../source/vendor/three.module.js';
import {createRetarget} from '../source/motion135/retarget.mjs';
import {solePoints,supportFootOnDeck,supportPushFoot} from '../source/motion135/sole-support144.mjs';
const d=JSON.parse(zlib.gunzipSync(fs.readFileSync(new URL('../source/assets/articulated135.json.gz',import.meta.url))));
const r=createRetarget(d.rig,d.skeleton),board=d.skeleton.bones.findIndex(b=>b.name==='burnq_board'),bindInverse=r.sourcePose(null).rotation[board].clone().invert();
const fixtures={};
for(const name of ['SALLY','BLACK','DOG','BOSS']){
 const bin=zlib.gunzipSync(fs.readFileSync(new URL(`../source/assets/rider-${name.toLowerCase()}-133.bin.gz`,import.meta.url))),n=bin.readUInt32LE(),meta=JSON.parse(bin.subarray(4,4+n)),raw=bin.subarray(4+n),attr=meta.parts.shoes.ride.attributes.position.packed;
 fixtures[name]={positions:Float64Array.from({length:attr.length},(_,i)=>raw.readInt16LE(attr.offset+i*2)*attr.scale),binding:d.rig.characters[name].shoes};
}
const names=['Idle','CrouchIdle','TurnLeft','TurnRight','CrouchTurnLeft','CrouchTurnRight','CrouchedLand1','CrouchedLand2_small','Manual','Init_FiftyFifty','FiftyFifty_Range','Init_BSBoardSlide','BSBoardSlide_Range','BSBoardSlide_Out','Init_FSBoardSlide','FSBoardSlide_Range','FSBoardSlide_Out','Manual_range','Crouch','TurnLeftIdle','TurnRightIdle','CrouchTurnLeftIdle','CrouchTurnRightIdle','CrouchedLand3','CrouchedLand1_small','CrouchedLand3_small','CrouchBumpDown','IdleBump'].filter(n=>d.clips[n]);
let poses=0,maxGap=0,maxXZ=0,maxLengthError=0,maxPushPenetration=0;
for(const [character,{positions,binding}]of Object.entries(fixtures))for(const name of names)for(let frame=0;frame<=16;frame++){
 let p=r.sample(d.clips[name],d.clips[name].duration*frame/16);
 // Include a genuine source-to-source entry transition. Contact must follow
 // the blended board, while bone lengths/ankle orientation remain authored.
 if(frame<8){const from=r.sample(d.clips.Idle,0),t=frame/8;const blend=r.blend(from,p,t);blend.board={position:from.board.position.clone().lerp(p.board.position,t),rotation:from.board.rotation.clone().slerp(p.board.rotation,t)};p=blend;}
 const normal=new T.Vector3(0,1,0).applyQuaternion(p.board.rotation.clone().multiply(bindInverse));
 for(const side of ['l','r']){
  const ids=['thigh_','calf_','foot_','ball_'].map(n=>d.rig.bones.findIndex(b=>b.name===n+side));
  const before=ids.map(i=>p.positions[i].clone()),rotation=p.rotations[ids[2]].clone();
  supportFootOnDeck(p,d.rig,side,positions,binding,d.contacts.soleVertexIds[side],normal,d.contacts.airOffset);
  const low=Math.min(...solePoints(p,positions,binding,d.contacts.soleVertexIds[side]).map(v=>v.sub(p.board.position).addScaledVector(new T.Vector3(0,1,0),-d.contacts.airOffset).dot(normal)));
  maxGap=Math.max(maxGap,Math.abs(low));
  maxXZ=Math.max(maxXZ,Math.hypot(p.positions[ids[2]].x-before[2].x,p.positions[ids[2]].z-before[2].z));
  for(let i=0;i<2;i++)maxLengthError=Math.max(maxLengthError,Math.abs(before[i].distanceTo(before[i+1])-p.positions[ids[i]].distanceTo(p.positions[ids[i+1]])));
  assert(rotation.angleTo(p.rotations[ids[2]])<1e-7,'source ankle rotation retained');
  assert(p.world.every(m=>m.elements.every(Number.isFinite)));
 }
 poses++;
}
for(const {positions,binding}of Object.values(fixtures))for(let frame=0;frame<=90;frame++){
 const p=r.sample(d.clips.PushCycle,d.clips.PushCycle.duration*frame/90),right=Math.min(...solePoints(p,positions,binding,d.contacts.soleVertexIds.r).map(v=>v.y));
 const slope=.04,floor=(v,{supportHeight})=>supportHeight-.12+slope*v.z;
 supportPushFoot(p,d.rig,positions,binding,d.contacts.soleVertexIds,floor);
 const penetration=Math.max(0,...solePoints(p,positions,binding,d.contacts.soleVertexIds.l).map(v=>floor(v,{supportHeight:right})-v.y));
 maxPushPenetration=Math.max(maxPushPenetration,penetration);
}
console.log({poses,maxGap,maxXZ,maxLengthError,maxPushPenetration});
assert(maxGap<1e-5,'soles support the final blended board plane');
assert(maxXZ<1e-5,'contact preserves source stance width and sideways board position');
assert(maxLengthError<1e-5,'contact preserves shin and thigh lengths');
assert(maxPushPenetration<1e-5,'pushing foot clears the actual sloped floor');
let worldChecks=0,maxWorldGap=0;
for(const mirror of [-1,1])for(const scale of [.85,1.1])for(const pitch of [-.12,0,.12])for(const roll of [-.08,.08]){
 const {positions,binding}=fixtures.SALLY,p=r.sample(d.clips.Manual_range,d.clips.Manual_range.duration*.5);
 const yaw=.7,linear=new T.Matrix4().makeRotationY(yaw).scale(new T.Vector3(mirror*scale,scale,scale)),rotation=new T.Quaternion().setFromEuler(new T.Euler(pitch,yaw,roll,'YXZ'));
 const delta=p.board.rotation.clone().multiply(bindInverse);if(mirror<0){delta.y=-delta.y;delta.z=-delta.z;}rotation.multiply(delta);
 const worldNormal=new T.Vector3(0,1,0).applyQuaternion(rotation),raw=worldNormal.clone().applyMatrix3(new T.Matrix3().setFromMatrix4(linear).transpose()),length=raw.length(),normal=raw.normalize();
 const origin=new T.Vector3(7,3,-2),deckHeight=.09,base=origin.clone().add(new T.Vector3(0,deckHeight,0)),deckCenter=origin.clone().add(new T.Vector3(0,deckHeight,0).applyQuaternion(rotation)),offset=worldNormal.dot(deckCenter.clone().sub(base))/length;
 for(const side of ['l','r']){
  supportFootOnDeck(p,d.rig,side,positions,binding,d.contacts.soleVertexIds[side],{normal,offset},d.contacts.airOffset);
  const minimum=Math.min(...solePoints(p,positions,binding,d.contacts.soleVertexIds[side]).map(v=>v.sub(p.board.position).addScaledVector(new T.Vector3(0,1,0),-d.contacts.airOffset).applyMatrix4(linear).add(base).sub(deckCenter).dot(worldNormal)));
  maxWorldGap=Math.max(maxWorldGap,Math.abs(minimum));worldChecks++;
 }
}
assert(maxWorldGap<1e-5,'world deck height, terrain tilt, stance reflection and scale retain exact sole support');
console.log({worldChecks,maxWorldGap});


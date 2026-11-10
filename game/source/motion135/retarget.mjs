import * as T from '../vendor/three.module.js';
const V=(a)=>new T.Vector3(...a), Q=(a)=>new T.Quaternion(...a).normalize();
const boneMap={pelvis:'pelvis',spine_01:'stomach',spine_02:'chest',spine_03:'chest',neck_01:'neck',head:'head',clavicle_l:'left_collar',upperarm_l:'left_bicep',lowerarm_l:'left_forearm',hand_l:'left_wrist',clavicle_r:'right_collar',upperarm_r:'right_bicep',lowerarm_r:'right_forearm',hand_r:'right_wrist',thigh_l:'left_hip',calf_l:'left_knee',foot_l:'left_ankle',ball_l:'left_toes',thigh_r:'right_hip',calf_r:'right_knee',foot_r:'right_ankle',ball_r:'right_toes'};
// The source wrist is an intermediate joint, not the articulating palm. Its
// palm and grouped fingers carry substantial movement even during idle/push.
// Map the two source finger joints onto our proximal/distal chain. The third
// target joint shares the distal source direction, so the tow grip's baked
// closed fingers do not add another curl to the authored source motion.
for(const [side,prefix]of [['l','left'],['r','right']]){
 boneMap['hand_'+side]=prefix+'_palm';
 for(const finger of ['index','middle','ring','pinky']){
  const source=finger==='index'?'forefinger':'fingers';
  boneMap[finger+'_01_'+side]=prefix+'_'+source+'_base';
  boneMap[finger+'_02_'+side]=prefix+'_'+source+'_tip';
  boneMap[finger+'_03_'+side]=prefix+'_'+source+'_tip';
 }
 boneMap['thumb_01_'+side]=prefix+'_thumb_base';
 boneMap['thumb_02_'+side]=prefix+'_thumb_base';
 boneMap['thumb_03_'+side]=prefix+'_thumb_base';
}
const sourceChild={pelvis:'stomach',stomach:'chest',chest:'neck',neck:'head',left_collar:'left_bicep',left_bicep:'left_forearm',left_forearm:'left_wrist',left_wrist:'left_palm',right_collar:'right_bicep',right_bicep:'right_forearm',right_forearm:'right_wrist',right_wrist:'right_palm',left_hip:'left_knee',left_knee:'left_ankle',left_ankle:'left_toes',right_hip:'right_knee',right_knee:'right_ankle',right_ankle:'right_toes'};
function key(keys,t,base,quaternion=false){if(!keys?.length)return quaternion?Q(base):V(base);let i=0;while(i<keys.length-1&&keys[i+1].time<=t)i++;let a=keys[i],b=keys[Math.min(i+1,keys.length-1)],f=b.time>a.time?T.MathUtils.clamp((t-a.time)/(b.time-a.time),0,1):0;return quaternion?Q(a.value).slerp(Q(b.value),f):V(a.value).lerp(V(b.value),f);}
export function createRetarget(rig,skeleton,options={}){
 // Native geometry travels -Z by default. Pass facingYaw when the render wrapper uses another forward convention.
 const axisQ=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),options.facingYaw??Math.PI);
 const axis=new T.Matrix4().makeRotationFromQuaternion(axisQ);
 const sources=skeleton.bones,sourceIds=new Map(sources.map((b,i)=>[b.name,i]));
 function sourcePose(clip,time=0){const tracks=new Map((clip?.boneTracks??[]).map(t=>[t.boneIndex,t])),world=[],rotation=[],position=[];
  for(const b of sources){const tr=tracks.get(b.index),q=key(tr?.rotationKeys,time,b.bindRotation,true),p=key(tr?.translationKeys,time,b.bindTranslation);const m=new T.Matrix4().compose(p,q,new T.Vector3(1,1,1));world[b.index]=b.parentIndex<0?axis.clone().multiply(m):world[b.parentIndex].clone().multiply(m);position[b.index]=new T.Vector3().setFromMatrixPosition(world[b.index]);rotation[b.index]=new T.Quaternion().setFromRotationMatrix(world[b.index]).normalize();}
  return{world,rotation,position};}
 const def=sourcePose(null),bind=rig.bones.map(b=>new T.Matrix4().fromArray(b.matrix).transpose()),inv=bind.map(m=>m.clone().invert()),bindQ=bind.map(m=>new T.Quaternion().setFromRotationMatrix(m).normalize()),heads=rig.bones.map(b=>V(b.head)),ids=new Map(rig.bones.map((b,i)=>[b.name,i]));
 const offsets=rig.bones.map((b,i)=>b.parent<0?heads[i].clone():heads[i].clone().sub(heads[b.parent]).applyQuaternion(bindQ[b.parent].clone().invert()));
 const pelvis=ids.get('pelvis'),sourcePelvis=sourceIds.get('pelvis');
 const legLength=(side)=>heads[ids.get('thigh_'+side)].distanceTo(heads[ids.get('calf_'+side)])+heads[ids.get('calf_'+side)].distanceTo(heads[ids.get('foot_'+side)]);
 const sp=(n)=>def.position[sourceIds.get(n)];const sourceLeg=sp('left_hip').distanceTo(sp('left_knee'))+sp('left_knee').distanceTo(sp('left_ankle'));
 const scale=options.scale??(legLength('l')+legLength('r'))/(2*sourceLeg);
 const correction=rig.bones.map((b,i)=>{
  const sn=boneMap[b.name],si=sourceIds.get(sn);if(si==null)return null;
  let desired;
  if(sourceChild[sn])desired=def.position[sourceIds.get(sourceChild[sn])].clone().sub(def.position[si]).normalize();
  else desired=new T.Vector3(0,1,0).applyQuaternion(axisQ); // head/toe terminal extension
  if(sn.endsWith('_toes'))desired=new T.Vector3(0,0,1).applyQuaternion(axisQ);
  const targetDir=V(b.tail).sub(V(b.head)).normalize();let align=new T.Quaternion().setFromUnitVectors(targetDir,desired);
  // A single bone direction leaves axial twist undefined. The portrait's bind
  // face points sideways; calibrate both up and face axes for neck and head.
  if(b.name==='head'||b.name==='neck_01'){
   const frame=(up,forward)=>{const z=forward.clone().addScaledVector(up,-forward.dot(up)).normalize(),x=up.clone().cross(z).normalize();return new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(x,up,z));};
   const nativeFace=new T.Vector3(-.7605468035,-.6421248913,.0961471796).normalize();
   align=frame(desired,new T.Vector3(0,0,-1)).multiply(frame(targetDir,nativeFace).invert());
  }
  if(/^(upperarm|lowerarm)_/.test(b.name)){
   const side=b.name.endsWith('_l')?'l':'r',prefix=side==='l'?'left':'right';
   const ta=heads[ids.get('upperarm_'+side)],tb=heads[ids.get('lowerarm_'+side)],tc=heads[ids.get('hand_'+side)];
   const sa=sp(prefix+'_bicep'),sb=sp(prefix+'_forearm'),sc=sp(prefix+'_wrist');
   const nativePole=tb.clone().sub(ta).cross(tc.clone().sub(tb)).normalize(),sourcePole=sb.clone().sub(sa).cross(sc.clone().sub(sb)).normalize();
   const frame=(y,z)=>{z=z.clone().addScaledVector(y,-z.dot(y)).normalize();return new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(y.clone().cross(z).normalize(),y,z));};
   align=frame(desired,sourcePole).multiply(frame(targetDir,nativePole).invert());
  }
  if(/^(hand|index|middle|ring|pinky|thumb)_/.test(b.name)){
   const side=b.name.endsWith('_l')?'l':'r',prefix=side==='l'?'left':'right';
   // Calibrate twist from the actual hand spread, not from the elbow plane:
   // the authored tow grip and the source T-pose have different palm rolls.
   const nativeWidth=heads[ids.get('index_01_'+side)].clone().sub(heads[ids.get('pinky_01_'+side)]);
   const sourceWidth=sp(prefix+'_forefinger_base').clone().sub(sp(prefix+'_fingers_base'));
   let nativeForward=targetDir;
   if(b.name.startsWith('hand_')){
    nativeForward=heads[ids.get('middle_01_'+side)].clone().sub(heads[i]).normalize();
    desired=sp(prefix+'_fingers_base').clone().sub(sp(prefix+'_wrist')).normalize();
   }else if(sn.endsWith('_base')&&!sn.includes('thumb')){
    desired=sp(sn.replace('_base','_tip')).clone().sub(sp(sn)).normalize();
   }else desired=new T.Vector3(0,0,-1).applyQuaternion(def.rotation[si]).normalize();
   const frame=(y,width)=>{const z=width.clone().addScaledVector(y,-width.dot(y)).normalize();return new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(y.clone().cross(z).normalize(),y,z));};
   align=frame(desired,sourceWidth).multiply(frame(nativeForward,nativeWidth).invert());
  }
  return def.rotation[si].clone().invert().multiply(align).multiply(bindQ[i]);
 });
 function sample(clip,time=0){const s=sourcePose(clip,Math.max(0,Math.min(time,clip.duration))),world=[],positions=[],rotations=[],skin=[];
  for(let i=0;i<rig.bones.length;i++){const b=rig.bones[i],si=sourceIds.get(boneMap[b.name]);let q,p;
   if(b.name==='Root'){q=bindQ[i].clone();p=heads[i].clone();}
   else{q=si!=null?s.rotation[si].clone().multiply(correction[i]):rotations[b.parent].clone().multiply(bindQ[b.parent].clone().invert()).multiply(bindQ[i]);
    p=i===pelvis?heads[i].clone().add(s.position[sourcePelvis].clone().sub(def.position[sourcePelvis]).multiplyScalar(scale)):positions[b.parent].clone().add(offsets[i].clone().applyQuaternion(rotations[b.parent]));}
   rotations.push(q);positions.push(p);world.push(new T.Matrix4().compose(p,q,new T.Vector3(1,1,1)));skin.push(world[i].clone().multiply(inv[i]));
  }
  const boardIndex=sourceIds.get('burnq_board');return{skin,world,positions,rotations,source:s,scale,pelvis:positions[pelvis],board:boardIndex==null?null:{position:heads[pelvis].clone().add(s.position[boardIndex].clone().sub(def.position[sourcePelvis]).multiplyScalar(scale)),rotation:s.rotation[boardIndex]},duration:clip.duration};
 }
 function blend(a,b,t){
  t=T.MathUtils.clamp(t,0,1);const world=[],positions=[],rotations=[],skin=[];
  for(let i=0;i<rig.bones.length;i++){
   const parent=rig.bones[i].parent,local=p=>parent<0?p.world[i].clone():p.world[parent].clone().invert().multiply(p.world[i]);
   const am=local(a),bm=local(b),ap=new T.Vector3(),bp=new T.Vector3(),aq=new T.Quaternion(),bq=new T.Quaternion(),sc=new T.Vector3();am.decompose(ap,aq,sc);bm.decompose(bp,bq,sc);
   const m=new T.Matrix4().compose(ap.lerp(bp,t),aq.slerp(bq,t),new T.Vector3(1,1,1));world[i]=parent<0?m:world[parent].clone().multiply(m);positions[i]=new T.Vector3().setFromMatrixPosition(world[i]);rotations[i]=new T.Quaternion().setFromRotationMatrix(world[i]);skin[i]=world[i].clone().multiply(inv[i]);
  }
  return {...b,world,positions,rotations,skin,pelvis:positions[pelvis]};
 }
 return{sample,sourcePose,scale,rig,skeleton,blend};
}

import assert from 'node:assert/strict';
import fs from 'node:fs';import zlib from 'node:zlib';
import {createRetarget} from '../source/motion135/retarget.mjs';
const d=JSON.parse(zlib.gunzipSync(fs.readFileSync(new URL('../source/assets/articulated135.json.gz',import.meta.url)))),rt=createRetarget(d.rig,d.skeleton),ids=new Map(d.rig.bones.map((b,i)=>[b.name,i])),sources=new Map(d.skeleton.bones.map((b,i)=>[b.name,i]));
// The source animated palm is independent of its wrist. Preserve that motion
// through both landing and pushing, rather than retaining the fixed tow fist.
let fingerMotion=0,frames=0;
for(const name of ['PushCycle','CrouchedLand1','Hips','Init_FSBoardSlide']){
 const clip=d.clips[name],first=rt.sample(clip,0);
 for(let k=0;k<=24;k++){
  const pose=rt.sample(clip,clip.duration*k/24);
  for(const [side,prefix]of [['l','left'],['r','right']]){
   for(const [target,source]of [['hand_',prefix+'_palm'],['index_01_',prefix+'_forefinger_base'],['middle_01_',prefix+'_fingers_base']]){
    const a=first.rotations[ids.get(target+side)],b=pose.rotations[ids.get(target+side)],sa=first.source.rotation[sources.get(source)],sb=pose.source.rotation[sources.get(source)];
    assert(Math.abs(a.angleTo(b)-sa.angleTo(sb))<1e-6,`${name}: preserve authored ${source} rotation`);
   }
   const hand=ids.get('hand_'+side),finger=ids.get('middle_01_'+side);
   const local=p=>p.rotations[hand].clone().invert().multiply(p.rotations[finger]);
   fingerMotion=Math.max(fingerMotion,local(first).angleTo(local(pose)));
   // Fingers stay connected to their hand through arbitrary source rotations.
   const bindDistance=Math.hypot(...d.rig.bones[finger].head.map((x,i)=>x-d.rig.bones[hand].head[i]));
   assert(Math.abs(pose.positions[finger].distanceTo(pose.positions[hand])-bindDistance)<1e-7);
  }
  for(const m of pose.skin)assert(m.elements.every(Number.isFinite));frames++;
 }
}
assert(fingerMotion>.35,'authored finger flex must survive independently of the palm');
// Fitted right index tip belongs near the closed-grip mesh, not the obsolete
// straight-finger authored position that produced separated-looking knuckles.
const tip=d.rig.bones[ids.get('index_03_r')].head;
assert(tip[0]>-.15&&tip[1]>1.13,'right finger bind correction is packaged');
console.log({frames,fingerMotionDegrees:fingerMotion*180/Math.PI,sourcePalmAndFingerMotion:'preserved'});

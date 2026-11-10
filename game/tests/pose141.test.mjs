import assert from 'node:assert/strict';import fs from 'node:fs';import zlib from 'node:zlib';
import * as T from '../source/vendor/three.module.js';
import {createRetarget} from '../source/motion135/retarget.mjs';
import {relaxSkatingArms} from '../source/motion135/relaxed-arms141.mjs';
import {buildDualQuaternions,dualSkin} from '../source/motion135/sleeve-skin141.mjs';
const d=JSON.parse(zlib.gunzipSync(fs.readFileSync(new URL('../source/assets/articulated135.json.gz',import.meta.url)))),r=createRetarget(d.rig,d.skeleton),ids=new Map(d.rig.bones.map((b,i)=>[b.name,i])),face=new T.Vector3(-.7605468035,-.6421248913,.0961471796);
let poses=0;
for(const name of ['Idle','CrouchIdle','PushCycle'])for(let i=0;i<=60;i++){
 const p=r.sample(d.clips[name],i/60*d.clips[name].duration),f=face.clone().transformDirection(p.skin[ids.get('head')]);assert(-f.z>(name==='PushCycle'?.75:.9),'gaze follows travel, including mirrored stance');
 if(name==='PushCycle')continue;
 const before=p.positions.map(p=>p.clone());relaxSkatingArms(p,d.rig,Math.sin(i/10),name==='Idle'?1:.65);
 for(const side of ['l','r']){const [a,b,c]=['upperarm_','lowerarm_','hand_'].map(n=>ids.get(n+side));for(const [x,y]of [[a,b],[b,c]])assert(Math.abs(p.positions[x].distanceTo(p.positions[y])-before[x].distanceTo(before[y]))<1e-5,'arm lengths retained');assert(p.positions[c].y<p.positions[a].y-.3,'hands relaxed below chest');}
 poses++;
}
for(const [fall,getup]of [['Hips','GetUpHips'],['SlipBackwards','GetUpBackwards']])for(let i=0;i<=60;i++){
 const p=r.blend(r.sample(d.clips[fall],d.clips[fall].duration),r.sample(d.clips[getup],i/60*.22),i/60);
 for(const m of p.skin){assert(Math.abs(m.determinant()-1)<1e-5,'recovery rotation does not shear/collapse the neck');assert(m.elements.every(Number.isFinite));}
 for(let j=1;j<d.rig.bones.length;j++){const parent=d.rig.bones[j].parent,len=p.positions[j].distanceTo(p.positions[parent]),base=r.sample(d.clips[fall],d.clips[fall].duration);if(j!==ids.get('pelvis'))assert(Math.abs(len-base.positions[j].distanceTo(base.positions[parent]))<1e-5,'connected recovery skeleton');}
}
// Opposing forearm rotations used to pinch the sleeve to cos(70deg) of its radius.
const mats=new Float64Array(32);for(const [i,a]of [-70,70].entries())mats.set(new T.Matrix4().makeRotationY(a*Math.PI/180).elements,i*16);
const dq=new Float64Array(16),out=new Float64Array(6);buildDualQuaternions(mats,dq);dualSkin(dq,[0,1,0,0,0,0,0,0],[.5,.5,0,0,0,0,0,0],0,.07,.2,0,1,0,0,out);assert(Math.abs(Math.hypot(out[0],out[2])-.07)<1e-8);assert(Math.abs(Math.hypot(...out.slice(3))-1)<1e-8);
console.log(`PASS forward gaze, ${poses} relaxed-arm poses, connected rigid recovery blends and sleeve twist volume.`);

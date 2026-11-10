import assert from 'node:assert/strict';
import fs from 'node:fs';import zlib from 'node:zlib';
import {createRetarget} from '../source/motion135/retarget.mjs';
import {skatePosture} from '../source/motion135/skate-posture140.mjs';
const d=JSON.parse(zlib.gunzipSync(fs.readFileSync(new URL('../source/assets/articulated135.json.gz',import.meta.url)))),retarget=createRetarget(d.rig,d.skeleton),ids=new Map(d.rig.bones.map((b,i)=>[b.name,i]));
let count=0,maximumLegError=0;
for(const clip of ['Idle','CrouchIdle'])for(const lean of [-1,-.5,0,.5,1])for(const compression of [0,.05,.105,.15])for(const time of [0,.2,.5]){
 const p=retarget.sample(d.clips[clip],time),base=p.positions.map(v=>v.clone()),foot=d.rig.bones.map((b,i)=>b.name.startsWith('foot_')||b.name.startsWith('ball_')?p.skin[i].elements.slice():null);
 skatePosture(p,d.rig,{lean,compression});
 for(const side of ['l','r']){const [a,b,c]=['thigh_','calf_','foot_'].map(n=>ids.get(n+side));for(const [i,j]of [[a,b],[b,c]]){const err=Math.abs(p.positions[i].distanceTo(p.positions[j])-base[i].distanceTo(base[j]));maximumLegError=Math.max(maximumLegError,err);assert(err<.003,'preserve leg lengths');}}
 for(let i=0;i<foot.length;i++)if(foot[i])assert.deepEqual(p.skin[i].elements,foot[i],'keep feet and toes planted');
 for(const m of p.skin)assert(m.elements.every(Number.isFinite));count++;
}
console.log({poses:count,maximumLegError,feet:'exact source transforms preserved'});

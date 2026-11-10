import {buildDualQuaternions,dualSkin,sleeveMask} from '../source/motion135/sleeve-skin141.mjs';
import {relaxSkatingArms} from '../source/motion135/relaxed-arms141.mjs';
import fs from 'node:fs';import zlib from 'node:zlib';import assert from 'node:assert/strict';import {createRetarget} from '../source/motion135/retarget.mjs';
const d=JSON.parse(zlib.gunzipSync(fs.readFileSync(new URL('../source/assets/articulated135.json.gz',import.meta.url)))),retarget=createRetarget(d.rig,d.skeleton);
const bin=zlib.gunzipSync(fs.readFileSync(new URL('../source/assets/rider-sally-133.bin.gz',import.meta.url))),n=bin.readUInt32LE(),meta=JSON.parse(bin.subarray(4,4+n)),raw=bin.subarray(4+n),part=meta.parts.clothing.ride,attr=part.attributes.position.packed,p=Array.from({length:attr.length},(_,i)=>raw.readInt16LE(attr.offset+i*2)*attr.scale),idx=Array.from({length:part.index.length},(_,i)=>raw.readUInt32LE(part.index.offset+i*4)),binding=d.rig.characters.SALLY.clothing;
const edges=[];for(let i=0;i<idx.length;i+=3)for(let k=0;k<3;k++){const a=idx[i+k]*3,b=idx[i+(k+1)%3]*3,l=Math.hypot(p[a]-p[b],p[a+1]-p[b+1],p[a+2]-p[b+2]);if(l>.004)edges.push([a,b,l]);}
let maxP99=0,maxEdge=0,samples=0;
for(const name of ['Idle','CrouchIdle','PushCycle','Hips','SlipBackwards','Shoulders','RunOutQuick','Rolling','GetUpHips','GetUpBackwards'])for(let t=0;t<=12;t++){
const pose=retarget.sample(d.clips[name],d.clips[name].duration*t/12);if(name==='Idle'||name==='CrouchIdle')relaxSkatingArms(pose,d.rig,Math.sin(t),name==='Idle'?1:.65);const mats=pose.skin.map(m=>m.elements),out=new Float64Array(p.length),dq=new Float64Array(53*8),dual=new Float64Array(6),mask=sleeveMask(binding,d.rig.bones);buildDualQuaternions(Float64Array.from(mats.flat()),dq);
for(let i=0;i<p.length/3;i++){const a=i*3,x=p[a],y=p[a+1],z=p[a+2];for(let k=0;k<8;k++){const w=binding.weights[i*8+k],m=mats[binding.joints[i*8+k]];out[a]+=w*(m[0]*x+m[4]*y+m[8]*z+m[12]);out[a+1]+=w*(m[1]*x+m[5]*y+m[9]*z+m[13]);out[a+2]+=w*(m[2]*x+m[6]*y+m[10]*z+m[14]);}if(mask[i]){dualSkin(dq,binding.joints,binding.weights,i*8,x,y,z,0,1,0,dual);for(let j=0;j<3;j++)out[a+j]+=(dual[j]-out[a+j])*mask[i];}}
const ratios=edges.map(([a,b,l])=>{const length=Math.hypot(out[a]-out[b],out[a+1]-out[b+1],out[a+2]-out[b+2]);maxEdge=Math.max(maxEdge,length);return length/l;}).sort((a,b)=>a-b);maxP99=Math.max(maxP99,ratios[Math.floor(ratios.length*.99)]);samples++;
}
console.log({samples,maxP99,maxEdge});assert(maxP99<3.3,'Sweatshirt deformation regressed across fall/recovery clips');assert(maxEdge<.33,'Clothing forms an implausibly long triangle');

const skin=d.rig.characters.SALLY.skin;assert(skin.visibleIndices.length>0&&skin.visibleIndices.length<meta.parts.skin.ride.index.length);assert(skin.visibleIndices.every(i=>Number.isInteger(i)&&i>=0&&i<skin.count));

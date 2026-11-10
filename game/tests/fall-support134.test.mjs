import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
import * as T from '../source/vendor/three.module.js';
import {supportContact} from '../source/motion131/contact-clusters.mjs';
import {fallMotion} from '../source/motion131/fall-motion.mjs';
const root=new URL('../source/assets/',import.meta.url);
let checks=0,maxError=0,maxRestHeight=0;
function unpack(data,base,p){const a=new Float32Array(p.length);if(!p.scale)return a;for(let i=0;i<a.length;i++)a[i]=data.readInt16LE(base+p.offset+i*2)*p.scale;return a;}
for(const name of ['dog','sally','black','boss']){
 const b=gunzipSync(readFileSync(new URL(`rider-${name}-133.bin.gz`,root))),n=b.readUInt32LE(0),d=JSON.parse(b.subarray(4,4+n).toString()),offset=4+n;
 const samples=Object.values(d.parts).map(p=>{
  const position=unpack(b,offset,p.ride.attributes.position.packed),morph=p.crash.morph.position.map(m=>({array:unpack(b,offset,m)}));
  const indices=Array.from({length:p.crash.support.length},(_,i)=>b.readUInt32LE(offset+p.crash.support.offset+i*4));
  return {mesh:{geometry:{attributes:{position:{array:position}},morphAttributes:{position:morph},userData:{supportIndices:indices}}},indices};
 });
 for(const stance of [-1,1])for(const reason of ['WOBBLE','CAR','GRATE','DIRT'])for(const time of [0,.15,.42,.52,.8,1.2,2,3.4]){
  const m=fallMotion({phaseTime:time,rider:{groundContactAt:.42,heading:.6,crashMotion:{reason,speed:reason==='DIRT'?3:10,side:stance,heading:.6}}});
  const q=new T.Quaternion().setFromEuler(new T.Euler(m.pitch,m.yaw,m.roll,'YXZ'));
  const matrix=new T.Matrix4().makeRotationFromQuaternion(q).multiply(new T.Matrix4().makeScale(stance,1,1)),e=matrix.elements;
  const surface=(x,z)=>.03*x+.02*z;
  const result=supportContact(samples,m.weights,e,0,0,surface);
  let brute=-Infinity;
  for(const {mesh,indices} of samples){const g=mesh.geometry;for(const i of indices){const j=i*3,p=Array.from(g.attributes.position.array.subarray(j,j+3));m.weights.forEach((w,k)=>p.forEach((_,a)=>p[a]+=w*g.morphAttributes.position[k].array[j+a]));const v=new T.Vector3(...p).applyMatrix4(matrix);brute=Math.max(brute,surface(v.x,v.z)-v.y);}}
  const error=Math.abs(result.support-brute);maxError=Math.max(error,maxError);assert(error<1e-6,`${name} ${reason} ${time}: ground mismatch ${error}`);
  if(m.phase==='REST'){
   let low=Infinity,high=-Infinity;
   // All rendered vertices, not only the support set. Contact with a single
   // hand is insufficient: a settled body must also have a low silhouette.
   for(const {mesh} of samples){const g=mesh.geometry;for(let j=0;j<g.attributes.position.array.length;j+=3){const p=Array.from(g.attributes.position.array.subarray(j,j+3));m.weights.forEach((w,k)=>p.forEach((_,a)=>p[a]+=w*g.morphAttributes.position[k].array[j+a]));const v=new T.Vector3(...p).applyMatrix4(matrix);low=Math.min(low,v.y);high=Math.max(high,v.y);}}
   maxRestHeight=Math.max(maxRestHeight,high-low);
   assert(high-low<.65,`${name} ${reason}: settled body too tall (${high-low}m)`);
  }
  checks++;
 }
}
console.log(JSON.stringify({passed:checks,characters:4,stances:2,surface:'sloped plane',maximumSupportErrorMeters:maxError,maximumRestBodyHeightMeters:maxRestHeight},null,2));

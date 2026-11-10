import assert from 'node:assert/strict';
import {pathLayout149} from '../source/path-returns.js';
const {frames,rows,length}=pathLayout149();assert(length>250&&length<400);assert(rows.every(r=>r.w>=1.05&&r.w<=2.3));
for(const [index,f]of frames.entries()){
 const sample=index?rows.slice(-50).reverse():rows.slice(0,50);let last=-Infinity;
 for(const r of sample){const d=(r.x-f.x)*f.nx+(r.z-f.z)*f.nz;assert(d>last,'entrance must never hook backwards');last=d;}
}
let maxTurn=0;for(let i=1;i<rows.length;i++){const a=rows[i-1],b=rows[i];maxTurn=Math.max(maxTurn,Math.abs(Math.atan2(a.dx*b.dz-a.dz*b.dx,a.dx*b.dx+a.dz*b.dz)));}assert(maxTurn<.08,'no angular path corners');console.log({length,rows:rows.length,maxTurnDegrees:maxTurn*180/Math.PI,entryHooks:false});

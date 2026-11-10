import {FOOTPATH,roadDistance,ENTRANCE_HOUSES} from '../world.js';
export function pathDistance145(x,z){let d=Infinity;for(let i=1;i<FOOTPATH.length;i++){const a=FOOTPATH[i-1],b=FOOTPATH[i],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz)));d=Math.min(d,Math.hypot(x-a.x-dx*t,z-a.z-dz*t));}return d;}
export function worldPoint145(c,x,z){return{x:c.x+x*Math.cos(c.a)+z*Math.sin(c.a),z:c.z-x*Math.sin(c.a)+z*Math.cos(c.a)};}
// Test the entire perimeter, not just a prop's centre. Existing foundations are
// reused; no new object may narrow the asphalt, rolled curb or central path.
export function clearFootprint145(c,w,d,margin=2.4){const samples=[];for(let i=0;i<=8;i++){const t=i/8;for(const [x,z]of [[(t-.5)*w,-d/2],[(t-.5)*w,d/2],[-w/2,(t-.5)*d],[w/2,(t-.5)*d]])samples.push(worldPoint145(c,x,z));}return samples.every(p=>roadDistance(p.x,p.z)>margin&&pathDistance145(p.x,p.z)>margin&&ENTRANCE_HOUSES.every(h=>Math.hypot(p.x-h.x,p.z-h.z)>18));}

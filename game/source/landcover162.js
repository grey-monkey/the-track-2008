import {roadDistance,polygonDistance,roadPoints,FOOTPATH} from './world.js';

// Ground-material plan from the user's October 18 sketch. Gate, houses and
// cul-de-sac register it to the existing world; no riding surface is moved.
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
const oval=(x,z,cx,cz,rx,rz)=>Math.exp(-(((x-cx)/rx)**2+((z-cz)/rz)**2)*1.4);
const spine=FOOTPATH.slice(2,11);
const widths=[5,12,22,25,23,19,16,12,5];
function grassSpine(x,z){
 let distance=1e6;
 for(let i=1;i<spine.length;i++){
  const a=spine[i-1],b=spine[i],dx=b.x-a.x,dz=b.z-a.z;
  const t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz)));
  distance=Math.min(distance,Math.hypot(x-a.x-t*dx,z-a.z-t*dz)-(widths[i-1]*(1-t)+widths[i]*t));
 }
 return distance;
}
export function landcover162(x,z,knownRoadDistance){
 const road=knownRoadDistance??roadDistance(x,z),inside=polygonDistance(x,z,roadPoints)<0;
 const edge=2.1*Math.sin(x*.105+z*.034)+1.4*Math.sin(z*.133-x*.057)+.7*Math.sin(x*.31+z*.17);
 let grass,dirt;
 if(inside){
  const d=grassSpine(x,z)+edge;
  grass=(1-smooth(-2,5,d))*smooth(9,19,road);
  // Unequal dirt shoulders, deliberately interrupted by clay: not a uniform ring.
  const shoulders=Math.max(oval(x,z,45,91,23,43),oval(x,z,-24,94,24,29),oval(x,z,-55,199,18,31),oval(x,z,20,23,12,19));
  dirt=smooth(.16,.72,Math.max((1-smooth(4,15,d))*.64,shoulders))*smooth(5,16,road)*(1-grass);
 }else{
  // Clay beside the road, large dirt pockets, then grass beneath the woodland.
  const pockets=Math.max(oval(x,z,-143,170,28,60),oval(x,z,115,100,29,57),oval(x,z,66,-36,32,33),oval(x,z,-91,284,47,20));
  const disturbed=24+19*pockets+3*Math.sin(z*.039+x*.022);
  grass=smooth(disturbed-5,disturbed+7,road+edge);
  dirt=smooth(9,21,road+edge)*Math.max(.18,smooth(.18,.72,pockets))*(1-grass);
 }
 const clay=Math.max(0,1-grass-dirt);
 return {grass,dirt,clay};
}

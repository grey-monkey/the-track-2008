// Shared metre-scale definitions: visible geometry, support and riding response.
import {roadPoints,sample,heading,LENGTH,clamp} from './world.js';
import {BOARD_FEEL} from './board-personalities.js';
export function frameAt(index){const p=roadPoints[index],a=roadPoints[(index+roadPoints.length-1)%roadPoints.length],b=roadPoints[(index+1)%roadPoints.length],h=Math.atan2(b.z-a.z,b.x-a.x);return {...p,h,co:Math.cos(h),si:Math.sin(h)};}
export function local(f,x,z){const dx=x-f.x,dz=z-f.z;return{u:-dx*f.si+dz*f.co,v:dx*f.co+dz*f.si};}
export function at(f,u,v){return{x:f.x-f.si*u+f.co*v,z:f.z+f.co*u+f.si*v};}
const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
export const window=(x,half,bevel)=>1-smooth((Math.abs(x)-half+bevel)/bevel);
export const DIVOT={...frameAt(105),id:'DIVOT',u:-2.03,halfWidth:2.08,halfLength:.95,depth:.19};
export const PATCHES=[{...frameAt(221),id:'PATCH-A',u:-2.1,v:-4,halfWidth:1.56,halfLength:1.75,rise:.045},{...frameAt(221),id:'PATCH-B',u:2.1,v:4,halfWidth:1.56,halfLength:1.55,rise:.045}];
// Shift the rideable ramp six inches toward road center; preserve the upright block anchor.
const rf=frameAt(270),uprightAnchor=at(rf,2.9,0),rp=at(rf,2.9-.1524,0),rh=rf.h-.15;
// Three-inch takeoff overhang; plywood rests on the front upper edge of the unchanged block.
const supportLip=.0762,supportDepth=.194,rampLength=1.2192;
const rampRise=(.190+.013-.003)*rampLength/(rampLength-supportLip-supportDepth);
export const RAMP={...rp,uprightAnchor,h:rh,co:Math.cos(rh),si:Math.sin(rh),id:'PLYWOOD',width:.6096,length:rampLength,rise:rampRise,thickness:.013,supportLip};
export function depression(x,z){const q=local(DIVOT,x,z),v=q.v/DIVOT.halfLength;if(Math.abs(v)>=1)return 0;return -DIVOT.depth*window(q.u-DIVOT.u,DIVOT.halfWidth,.40)*Math.cos(v*Math.PI/2)**2;}
export function patchAmount(p,x,z){const q=local(p,x,z);return window(q.u-p.u,p.halfWidth,.22)*window(q.v-p.v,p.halfLength,.24);}
export function roadOffset(x,z){return depression(x,z)+PATCHES.reduce((n,p)=>n+p.rise*patchAmount(p,x,z),0);}
export function roadSlope(x,z){return {x:(roadOffset(x+.02,z)-roadOffset(x-.02,z))/.04,z:(roadOffset(x,z+.02)-roadOffset(x,z-.02))/.04};}
export function rampHeight(x,z){const q=local(RAMP,x,z);if(Math.abs(q.u)>RAMP.width/2||Math.abs(q.v)>RAMP.length/2)return null;return .003+(q.v/RAMP.length+.5)*RAMP.rise;}
// A gentle, compact bypass on the right of the depression only. The rest of the
// original car path is returned byte-for-byte; patches receive no avoidance.
export function carPath(s){const p=sample(s),q=local(DIVOT,p.x,p.z);if(Math.abs(q.v)>15||Math.abs(q.u)>7)return p;const offset=1.8*Math.cos(q.v/15*Math.PI/2)**4;return at(DIVOT,q.u+offset,q.v);}
export function carHeading(s){const p=sample(s),q=local(DIVOT,p.x,p.z);if(Math.abs(q.v)>16||Math.abs(q.u)>7)return heading(s);const a=carPath(s-.25),b=carPath(s+.25);return Math.atan2(b.z-a.z,b.x-a.x);}
export function station(f){let best=Infinity,s=0;for(let i=0;i<LENGTH;i+=.25){const p=sample(i),d=Math.hypot(p.x-f.x,p.z-f.z);if(d<best){best=d;s=i;}}return s;}
function event(sim,kind,strength,detail){sim.hazards?.event(sim,kind,strength,detail);}
export function rideRoadDetails(sim,old,dt){const r=sim.rider;if(!['riding','coasting'].includes(sim.phase))return;const speed=Math.hypot(r.vx,r.vz),feel=BOARD_FEEL[sim.options.board];
 // Small surface feedback is independent of jump-button permissions.
 if(r.height<=.01){for(const p of PATCHES){const a=patchAmount(p,old.x,old.z),b=patchAmount(p,r.x,r.z);if((a<.05)!==(b<.05)){
   const entering=b>=.05;
   // Preserve the approved board impulse. Departure adds a body contact cue,
   // not another physical kick, steering disturbance or jump.
   if(entering){r.bumpVelocity=(r.bumpVelocity??0)+Math.min(.18,speed*.020)*feel.bump;r.wobble+=Math.min(.025,speed*.002)*feel.bump;}
   event(sim,'PATCH',.34,{edge:entering?'entry':'exit',patch:p.id});
  }}}
 const a=local(DIVOT,old.x,old.z),b=local(DIVOT,r.x,r.z),d=depression(r.x,r.z);
 if(r.height<=.01&&d<-.065)r.divotLoaded=true;
 if(r.divotLoaded&&Math.abs(b.v)>=DIVOT.halfLength*.88){r.divotLoaded=false;if(r.height<=.01&&Math.abs(b.u-DIVOT.u)<DIVOT.halfWidth-.35&&Math.abs(a.v)<DIVOT.halfLength){const forward=Math.abs(r.vx*DIVOT.co+r.vz*DIVOT.si);if(forward>2.2){r.up=Math.min(2.35,forward*.24);r.height=.008;r.trick=null;event(sim,'DIVOT_POP',r.up);}}}
 const ra=local(RAMP,old.x,old.z),rb=local(RAMP,r.x,r.z),edge=RAMP.length/2;
 r.rampApproach=r.height<=.01&&Math.abs(rb.u)<RAMP.width/2&&rb.v>=-edge-.3&&rb.v<=edge&&r.vx*RAMP.co+r.vz*RAMP.si>.5?clamp((rb.v+edge+.3)/(RAMP.length+.3),0,1):null;
 if(ra.v<edge&&rb.v>=edge&&Math.abs(rb.u)<RAMP.width/2+.015&&r.height<=.035){const forward=r.vx*RAMP.co+r.vz*RAMP.si;if(forward>.5){r.height=RAMP.rise+.003;r.up=Math.min(3.2,forward*RAMP.rise/RAMP.length);r.trick=null;r.rampDeparture={time:sim.time,up:r.up,height:r.height};event(sim,'RAMP_LAUNCH',r.up);}}
}

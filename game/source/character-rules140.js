import {secondHandProtected} from './second-hand-rules167.mjs';
import {boardContactSize,sweepCircle,sweepBox} from './hazards.js';
import {depression,PATCHES,patchAmount,RAMP} from './road-details.js';
import {roadDistance} from './world.js';

// Boss's first grounded wheel contact is enough: riding slowly or choosing a
// forgiving board does not turn a road defect into a safe surface for him.
export function bossSurfaceContact(sim,old){
 const r=sim.rider;if(secondHandProtected(sim)||sim.options.rider!=='BOSS'||!['riding','coasting'].includes(sim.phase)||r.height>.025||r.up>0)return false;
 const wheels=p=>boardContactSize[sim.options.board].wheels.map(([x,z])=>({x:p.x-Math.cos(p.heading)*z-Math.sin(p.heading)*x,z:p.z-Math.sin(p.heading)*z+Math.cos(p.heading)*x}));
 const a=wheels(old),b=wheels(r),haz=sim.hazards,near=haz?.nearby?.(old,r)??[];
 let first=null;const hit=(t,reason)=>{if(!first||t<first.t)first={t,reason};};
 for(let i=0;i<a.length;i++){
  const ramp=sweepBox(a[i],b[i],{x:RAMP.x,z:RAMP.z,yaw:RAMP.h-Math.PI/2,hx:RAMP.width/2,hz:RAMP.length/2});if(ramp)hit(ramp.t,'RAMP');
  for(const o of near)if(o.type==='covers'){const contact=sweepCircle(a[i],b[i],o,0);if(contact)hit(contact.t,'MANHOLE');}
  const n=Math.max(1,Math.ceil(Math.hypot(b[i].x-a[i].x,b[i].z-a[i].z)/.025));
  for(let j=0;j<=n;j++){const t=j/n,x=a[i].x+(b[i].x-a[i].x)*t,z=a[i].z+(b[i].z-a[i].z)*t;
   if(haz?.curb?.(x,z)!==undefined)hit(t,'CURB');
   else if(!(haz?.asphalt?.(x,z)??roadDistance(x,z)<=0))hit(t,'DIRT');
   if(depression(x,z)<-.001)hit(t,'DIVOT');
   if(PATCHES.some(p=>patchAmount(p,x,z)>.005))hit(t,'PATCH');
  }
 }
 if(!first)return false;
 r.x=old.x+(r.x-old.x)*first.t;r.z=old.z+(r.z-old.z)*first.t;
 sim.crash(first.reason);haz?.event?.(sim,first.reason,1,{character:'BOSS'});return true;
}

export const DOG_WOBBLE=Object.freeze({speed:6.3,grace:.85,carve:.22,growth:.30,recovery:1.35,frequency:3.8});
// This state is driven only by real steering input. Its oscillation cannot
// count as a corrective carve or rescue itself by pointing the board sideways.
export function riderSpeedWobble(sim,steer,speed,dt){
 const r=sim.rider,boss=sim.options.rider==='BOSS';if(!boss&&sim.options.rider!=='DOG')return;
 // Separate the visual strength from the failure clock: Boss shakes half as
 // far, but gets three times Dog's grace AND buildup duration at the same speed.
 const duration=boss?3:1,strength=boss?.5:1;
 // Immunity clears the instability debt, so its expiry cannot cause an instant bail.
 if(secondHandProtected(sim)){
  r.heading-=r.speedWobbleOffset??0;
  r.straightFastTime=r.speedWobble=r.speedWobbleOffset=r.speedWobbleLean=0;
  return;
 }
 const grounded=r.height<=.025&&r.up<=0,carving=Math.abs(steer)>=DOG_WOBBLE.carve;
 r.straightFastTime=grounded&&speed>=DOG_WOBBLE.speed&&!carving?(r.straightFastTime??0)+dt:0;
 const growing=r.straightFastTime>DOG_WOBBLE.grace*duration;
 r.speedWobble=Math.max(0,Math.min(1.05,(r.speedWobble??0)+(growing?DOG_WOBBLE.growth/duration*Math.min(1.7,speed/DOG_WOBBLE.speed):-(carving?DOG_WOBBLE.recovery:1))*dt));
 r.speedWobblePhase=(r.speedWobblePhase??0)+dt*Math.PI*2*DOG_WOBBLE.frequency;
 const offset=grounded?Math.sin(r.speedWobblePhase)*r.speedWobble*.15*strength:0;
 r.heading+=offset-(r.speedWobbleOffset??0);r.speedWobbleOffset=offset;
 r.speedWobbleLean=offset*.7;
 if(r.speedWobble>=1)sim.crash('WOBBLE');
}

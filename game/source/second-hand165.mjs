import {height} from './world.js';
import {seatedFit} from './crew129/seated-fit.mjs';

import {SECOND_HAND_HITS,SECOND_HAND_SECONDS,SECOND_HAND_FADE} from './second-hand-rules167.mjs';
export {SECOND_HAND_HITS,SECOND_HAND_SECONDS,SECOND_HAND_FADE};
export const SMOKE_LIFETIME=4.5;
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
const fit=seatedFit('SPRAD');
export function secondHandStrength(sim,menu=false){
 if(menu||sim.secondHandAt==null)return 0;
 const age=sim.time-sim.secondHandAt;
 return smooth(0,1.3,age)*(1-smooth(SECOND_HAND_SECONDS,SECOND_HAND_SECONDS+SECOND_HAND_FADE,age));
}
export function smokePosition(p,time){return{x:p.x,y:p.y+Math.max(0,time-p.born)*.065,z:p.z};}
// Mirrors Sprad's authored seated mouth/neck transform in car-local space.
// These same simulation positions render the puffs and determine pickups.
export function smokeMouth(sim){
 const c=sim.car,phase=sim.time%26,turn=-1.08*smooth(4,6,phase)*(1-smooth(10,12,phase));
 const lx=.39-Math.sin(turn)*.11*fit.scale,lz=.18-(.035+Math.cos(turn)*.11)*fit.scale;
 const ground=sim.hazards?.skateHeight?.(c.x,c.z)??height(c.x,c.z);
 return{x:c.x-Math.sin(c.heading)*lx-Math.cos(c.heading)*lz,y:ground+fit.y+1.56*fit.scale,z:c.z+Math.cos(c.heading)*lx-Math.sin(c.heading)*lz};
}
function distanceToSegment(p,a,b){
 const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,length=dx*dx+dy*dy+dz*dz;
 const t=length?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy+(p.z-a.z)*dz)/length)):0;
 return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy,p.z-a.z-t*dz);
}
export function stepSecondHand(sim){
 const state=sim.spradSmoke??={puffs:[],serial:0,next:7,count:0,lastHead:null};
 const t=sim.time;
 state.puffs=state.puffs.filter(p=>t-p.born<SMOKE_LIFETIME);
 const riding=['riding','coasting'].includes(sim.phase)&&!sim.gateExit;
 if(t>=state.next){
  // Six distinct puffs during the existing exhale, every 26 seconds. No
  // catch-up burst after a time jump, menu, or ended run.
  const cycle=Math.floor(t/26),phase=t-cycle*26;
  if(riding&&phase>=7&&phase<=8.21)state.puffs.push({...smokeMouth(sim),born:t,id:++state.serial,collected:false});
  state.next=phase<7?cycle*26+7:phase<8.2?cycle*26+7+(Math.floor((phase-7)/.24+1e-6)+1)*.24:(cycle+1)*26+7;
 }
 const r=sim.rider,ground=sim.hazards?.skateHeight?.(r.x,r.z)??height(r.x,r.z);
 const head={x:r.x,y:ground+(r.height??0)+1.35,z:r.z},previous=state.lastHead??head;
 state.lastHead=head;
 if(sim.options.rider!=='BOSS'){state.count=0;return false;}
 if(!riding)return false; // Keep earned hits through the wipeout and retry screen.
 if((sim.secretSpliffUntil??0)>t||(sim.secondHandUntil??0)>t)return false;
 for(const p of state.puffs){
  const age=t-p.born;if(p.collected||age<.15||age>SMOKE_LIFETIME-.35)continue;
  if(distanceToSegment(smokePosition(p,t),previous,head)>.88)continue;
  p.collected=true;state.count++;
  if(state.count>=SECOND_HAND_HITS){
   state.count=0;sim.secondHandAt=t;sim.secondHandUntil=t+SECOND_HAND_SECONDS+SECOND_HAND_FADE;
   // Preserve rope, motion, gravity and pose; crash immunity uses the same 60s clock.
   return true;
  }
 }
 return false;
}

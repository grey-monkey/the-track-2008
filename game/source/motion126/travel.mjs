// Fixed-step animation observation. Never changes forces or the board trajectory.
const clamp=v=>Math.max(0,Math.min(1,v));
export function observeTravel(sim,dt){
 const r=sim.rider,c=sim.car;
 const grounded=['riding','coasting'].includes(sim.phase)&&r.height<=.01&&r.up<=0&&!r.dirt;
 const distance=Math.hypot(c.hx-r.x,c.hz-r.z),slack=sim.rope-distance;
 const taut=clamp((r.tension-.08)/1.3);
 const load=grounded&&r.holding?taut*clamp(.22+Math.max(0,c.accel)*.9):0;
 const braking=grounded&&r.holding?clamp((-c.accel-.16)/1.15)*clamp((slack+.02)/.18)*clamp(Math.hypot(r.vx,r.vz)/2):0;
 const blend=(old,target,rate)=>old+(target-old)*(1-Math.exp(-dt*rate));
 r.motionLoad=blend(r.motionLoad??0,load,load>(r.motionLoad??0)?4:6);
 r.motionBrake=blend(r.motionBrake??0,braking,braking>(r.motionBrake??0)?4:5);

 // Release is an event with a bounded settle, not a permanent hand wave.
 const active=['riding','coasting'].includes(sim.phase);
 if(r.motionHolding==null||!active){r.motionReleaseAge=r.holding?0:.65;r.motionRelease=r.holding?0:1;}
 else if(r.motionHolding&&!r.holding){r.motionReleaseAge=0;r.motionReleaseStart=r.motionRelease??0;}
 r.motionHolding=!!r.holding;
 if(active){
  r.motionReleaseAge=r.holding?0:Math.min(.65,(r.motionReleaseAge??.65)+dt);
  const p=clamp(r.motionReleaseAge/.65);
  r.motionRelease=r.holding?blend(r.motionRelease??0,0,12):(r.motionReleaseStart??0)+(1-(r.motionReleaseStart??0))*p*p*(3-2*p);
 }
 const speed=Math.hypot(r.vx,r.vz);
 const fast=clamp((speed-4)/7); // 9--25 mph: quiet, progressively lower stance.
 r.motionSpeed=blend(r.motionSpeed??0,grounded?fast*fast*(3-2*fast):0,grounded?2.2:8);
}

// Read-only, event-timed rider absorption. Values are authored animation gains,
// not changes to physical suspension, jump height, acceleration or steering.
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
export function impactEnvelope(age,attack,hold,recover){
 if(age<0||age>=attack+hold+recover)return 0;
 if(age<attack)return smooth(age/attack);
 if(age<attack+hold)return 1;
 return 1-smooth((age-attack-hold)/recover);
}
export function sampleRideResponse(sim,out={},menu=false){
 out.compression=0;out.kind='steady';out.impact=0;out.enabled=false;out.slide=0;out.grip=0;out.yank=0;out.load=0;out.brake=0;out.flight=0;out.rampAir=null;
 if(menu||!['riding','coasting'].includes(sim.phase))return out;
 out.enabled=true;
 const r=sim.rider,t=sim.time;
 // Max, not sum: four wheels crossing a seam must not create four full squats.
 for(const e of sim.hazardEvents??[]){
  const patch=e.kind==='PATCH';
  const scale=patch?.43:e.kind==='SEAM'?.28:e.kind==='MANHOLE'?.24:e.kind==='BUMP'?.14:0;
  if(!scale)continue;
  const amount=scale*clamp(e.strength/.5,.3,patch?1.3:1.25)*impactEnvelope(t-e.time,.065,.025,.30);
  if(amount>out.compression){out.compression=amount;out.kind=patch&&e.edge==='exit'?'PATCH_EXIT':e.kind;}
 }
 // A small fallback follows existing physical suspension on contacts without
 // named events. No procedural road noise or response just because of speed.
 const suspension=Math.min(.14,Math.max(0,Math.abs(r.bump??0)*9+Math.max(0,r.bumpVelocity??0)*.18));
 if(suspension>out.compression){out.compression=suspension;out.kind='BUMP';}
 const landing=r.rideLanding;
 if(landing&&landing.speed>.35){
  const weight=clamp(.30+landing.speed*.19,.35,.95);
  const amount=weight*impactEnvelope(t-landing.time,.085,.065,.55);
  if(amount>out.compression){out.compression=amount;out.kind='LANDING';out.impact=landing.speed;}
 }
 const catchEvent=r.gripCatchEvent;
 if(catchEvent){out.grip=catchEvent.strength*impactEnvelope(t-catchEvent.time,.060,.035,.40);out.compression=Math.max(out.compression,out.grip);if(out.grip>.02)out.kind='GRIP_CATCH';}
 out.slide=Math.max(-1,Math.min(1,r.motionSlide??0));
 if(Math.abs(out.slide)>.08&&out.grip<.02)out.kind='SLIDE';
 const tow=r.towCatchEvent;
 if(r.holding&&tow){out.yank=tow.strength*impactEnvelope(t-tow.time,.095,.055,.50);if(out.yank>.02)out.kind='ROPE_TAKEUP';}
 // Grounded impact/slide/tow layers yield to air; ramp-specific flight is handled below.
 if(r.height>.01||r.up>0){out.compression=0;out.slide=0;out.grip=0;out.yank=0;out.kind='AIR';}
 // Ramp preparation extends out of a shallow compression at the plywood lip.
 // Departure comes from the physical ramp event; tricks retain their own animation.
 const departure=r.rampDeparture,age=departure?t-departure.time:Infinity;
 if(!r.trick&&r.height<=.01&&r.up<=0&&r.rampApproach!=null){
  const p=r.rampApproach;
  const prepare=.32*smooth(p/.40)*(1-smooth((p-.48)/.52));
  out.compression=Math.max(out.compression,prepare);
  if(prepare>.03)out.kind='RAMP_PREPARE';
 }
 if(!r.trick&&age>=0&&age<2&&(r.height>.01||r.up>0)){
  const remaining=(r.up+Math.sqrt(r.up*r.up+19.62*Math.max(0,r.height)))/9.81;
  // Extend at departure, gather over the board in flight, open for the landing.
  out.rampAir=0; // Ramp flight uses the ankle-locked compression, not the loose-foot trick pose.
  out.compression=.54*smooth(age/.14)*(.55+.45*smooth(remaining/.20));
  out.flight=.85*smooth(age/.10)*smooth(remaining/.18);
  out.kind=age<.10?'RAMP_EXTENSION':r.up>0?'AIR_BALANCE':'LANDING_PREPARE';
 }
 if(!r.trick&&departure&&r.rideLanding&&r.rideLanding.time>=departure.time&&t-r.rideLanding.time<.10){
  out.compression=Math.max(out.compression,.297*(1-smooth((t-r.rideLanding.time)/.10)));
 }
 const available=clamp(1-Math.abs(out.slide)*.9-out.yank*.85-out.compression*.65);
 if(r.height<=.01&&r.up<=0){
  out.load=clamp(r.motionLoad??0)*available;
  out.brake=clamp(r.motionBrake??0)*available;
  if(out.kind==='steady'&&(out.load>.10||out.brake>.10))out.kind=out.brake>out.load?'BRAKING_SETTLE':'TOW_LOAD';
 }
 out.compression=clamp(out.compression,0,.95);
 return out;
}

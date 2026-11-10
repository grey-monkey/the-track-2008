import {flightTimeRemaining} from '../secret-spliff149.mjs';
import {Locomotion142} from './locomotion142.mjs';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
// Original QB dispatch is recorded in authoring/THPS4-motion144-evidence.txt.
// Sustained Pintail sliding is a Track adaptation of the pre-switch source pose.
export class Locomotion144 extends Locomotion142{
 reset(){super.reset();this.pushAt=null;this.pushNumber=-1;this.brakeAt=null;this.airTurnKey='';this.airTurnAt=0;this.slideSide=1;}
 sample(sim,h={}){
  const selected=super.sample(sim,h);if(!selected)return null;
  const r=sim.rider,t=sim.time,speed=Math.hypot(r.vx??0,r.vz??0),flip=h.stance==='REGULAR'?-1:1;
  if(['grind','grind-exit','manual','land'].includes(selected.kind))return selected;
  if(selected.kind==='air'){
   const age=t-(r.trickStart??t),left=flightTimeRemaining(sim);
   if(r.trick==='secret-backflip'){
    if(age<r.trickDuration)return {...selected,clip:'StalefishBackFlip',time:clamp(age/r.trickDuration,0,1)*this.duration('StalefishBackFlip'),kind:'secret-backflip',blend:.12,orbitBoard:true};
   }
   // Active flips keep their authored foot clearance and board spin.
   if(r.trick&&r.trick!=='ollie'&&r.trick!=='secret-backflip')return selected;
   if(r.trick==='ollie'&&age<.20)return {...selected,time:Math.min(this.duration('Ollie')*.42,age*1.6)};
   if(r.up<0&&left<.20)return {...selected,clip:'StretchLegsInit',time:clamp((.20-left)/.20,0,1)*this.duration('StretchLegsInit'),kind:'prepare-land',blend:.09};
   if(!r.trick&&t-(r.airStarted??t)<.14){const clip=(h.crouch??0)>.4?'Crouch2InAir':'Idle2InAir';return {...selected,clip,time:t-(r.airStarted??t),blend:.10};}
   if(Math.abs(r.steer??0)>.16){const clip=(r.steer??0)*flip<0?'AirTurnLeft':'AirTurnRight';if(clip!==this.airTurnKey){this.airTurnKey=clip;this.airTurnAt=t;}return {...selected,clip,time:Math.min(t-this.airTurnAt,this.duration(clip)),blend:.18};}
   this.airTurnKey='';return {...selected,clip:'AirIdle',time:t%this.duration('AirIdle'),blend:.14};
  }
  this.airTurnKey='';
  if(sim.options?.rider!=='BOSS'&&(r.slide??0)>.08&&speed>1.2&&!r.dirt){
   const slip=speed>.1?angle(r.heading-Math.atan2(r.vz,r.vx)):0;
   if(Math.abs(slip)>.025)this.slideSide=Math.sign(-slip*flip);
   return {clip:this.slideSide>0?'FSPowerslide':'BSPowerslide',time:0,kind:'powerslide',blend:.15,
    sourceYaw:this.slideSide*clamp(Math.abs(slip),.015,r.pintailDrift?1.51:.78),neutralizeYaw:true,baseClip:'CrouchIdle',weight:clamp((r.slide-.05)/.42,0,1)};
  }
  if(r.braking&&speed>.15){
   if(this.brakeAt==null)this.brakeAt=t;
   return {clip:'SlowDownBrake',time:Math.min(t-this.brakeAt,this.duration('SlowDownBrake')),kind:'brake',blend:.18};
  }
  this.brakeAt=null;
  if(selected.kind==='push'){
   if(r.pushStart!==this.pushAt){this.pushAt=r.pushStart;this.pushNumber++;}
   const variants=['PushCycle','PushCycleArms3','PushCycleArms1','PushCycleArms2','PushCycleArms4','PushCycleArms5'];
   const clip=variants[this.pushNumber%variants.length];
   return {...selected,clip,time:clamp((t-r.pushStart)/.9,0,1)*this.duration(clip),blend:.16};
  }
  return selected;
 }
}

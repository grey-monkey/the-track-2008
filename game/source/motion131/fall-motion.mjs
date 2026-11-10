import {fallProfile} from '../motion134/fall-profile.mjs';

const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(v,a,b)=>{v=clamp((v-a)/(b-a));return v*v*v*(v*(v*6-15)+10);};
const mix=(a,b,t)=>a+(b-a)*t;
const blend=(a,b,t)=>a.map((w,i)=>mix(w,b[i],t));

// Existing authored crash morphs: brace / hip / gather / rest. Convex weights
// keep the contact solver and visible mesh in agreement. Timings are authored
// for The Track, informed by staged THPS4 scripts, not recovered THPS4 poses.
export function fallMotion(sim){
 const r=sim.rider,t=Math.max(0,sim.phaseTime??0),c=r.crashMotion??{};
 const {family,variant,severity,side,duration,rollTime}=fallProfile(c,r,sim.stats?.crashReason);
 const hasContact=Number.isFinite(r.groundContactAt)&&r.groundContactAt>=0&&t>=r.groundContactAt;
 const impact=hasContact?t-r.groundContactAt:0;
 const entry=smooth(t,0,.19),tip=smooth(t,.025,.38);
 const hit=smooth(impact,0,.12),rebound=smooth(impact,.12,.31);
 // Ground rotation begins after actual contact. One bounded shoulder roll
// replaces the previous one/two full sideways revolutions for every trip.
 const roll=smooth(impact,.08,rollTime);
 const rest=smooth(impact,duration-.6,duration);
 const release=smooth(impact,rollTime*.7,rollTime+.45);
 const heading=c.travelHeading??c.heading??r.heading??0;
 let pitch=0,bank=0,twist=0,weights;
 const incoming=[.82*entry,0,.08*entry,0];
 if(variant==='HIP_SLIDE'){
  weights=blend([.38*entry,.55*entry,0,0],[.08,.84,.08,0],hit);
  weights=blend(weights,[0,.26,.04,.70],release);
  weights=blend(weights,[0,0,0,1],rest);
  pitch=-.12*tip-.18*hit+.14*rebound;
  bank=side*(1.30*tip+.22*hit-.09*rebound);
  twist=side*(.12*hit+.16*release);
 }else if(variant==='BACK_RECOIL'){
  // Body impact: recoil backwards, rather than inventing a forward cartwheel.
  weights=blend(incoming,[.15,.28,.57,0],hit);
  weights=blend(weights,[.05,.10,.20,.65],release);
  weights=blend(weights,[0,0,0,1],rest);
  // The baked rest has arms spread on local Z. Lay onto a side while
  // sliding; leaving a quarter X turn would balance the whole body on a hand.
  pitch=(1.14*tip+.43*hit-.08*rebound)*(1-release);
  bank=side*mix(.16*tip+.23*hit,1.50,release);
  twist=side*(.15*hit+.10*release);
 }else if(variant==='SHOULDER_ROLL'){
  // Local X is the forward-fall axis of this -heading-PI/2 rig. The old
  // local-Z rotations were sideways barrel rolls, even for wheel catches.
  weights=blend(incoming,[.06,.08,.86,0],hit);
  weights=blend(weights,[.08,.30,.52,.10],release);
  weights=blend(weights,[0,0,0,1],rest);
  // Half forward turn rolls across the shoulder onto the opposite side.
  // The final X=PI / Z=PI/2 orientation keeps the authored arms near ground.
  pitch=-1.05*tip-(Math.PI-1.05)*roll;
  bank=side*mix(.14*tip+.40*hit,1.50,roll);
  twist=side*(.23*roll+.10*rest);
 }else{
  // Slow trip: reach, fold, slide. No somersault at walking speed.
  weights=blend(incoming,[.48,.04,.48,0],hit);
  weights=blend(weights,[.13,.12,.25,.50],release);
  weights=blend(weights,[0,0,0,1],rest);
  pitch=(-1.08*tip-.47*hit+.10*rebound)*(1-release);
  bank=side*mix(.12*tip+.25*hit,1.50,release);
  twist=side*.16*release;
 }
 const phase=!hasContact?'FALLING':impact<.12?'IMPACT':impact<rollTime?
  (variant==='SHOULDER_ROLL'?'ROLLING':'SLIDING'):impact<duration?'SETTLING':'REST';
 const contactTurn=clamp(r.impactTurn??0,-1.2,1.2);
 return {family,variant,severity,duration,phase,grounded:hasContact,impactTime:impact,
  totalDuration:hasContact?r.groundContactAt+duration:null,
  weights,pitch,roll:bank,yaw:-heading-Math.PI/2+contactTurn+twist,
  recoveryReady:hasContact&&impact>=duration,
  // Contact phase exported for physics; not a copy of THPS friction units.
  dragPhase:!hasContact?'AIR':impact<.05?'CONTACT':impact<rollTime?'SLIDE':'REST'};
}

import {HazardWorld,sweepBox} from '../hazards.js';
import {CANOPY,TRIGGER,ENTRY,entryLocal,entryPoint,CHAIR_CENTERS,canopyWalls} from './layout.mjs';
export const REVEAL_SECONDS=9.4;
const tau=Math.PI*2,angle=a=>Math.atan2(Math.sin(a),Math.cos(a));
export class CircleDiscovery{
 reset(){this.last=null;this.progress=0;this.travel=0;this.centerTime=0;}
 constructor(){this.reset();}
 get fraction(){return Math.min(1,Math.abs(this.progress)/(tau-.06));}
 step(r,dt){
  const x=r.x-CANOPY.x,z=r.z-CANOPY.z,rad=Math.hypot(x,z);
  // Use the full rideable room. Pausing, a small hop or touching the outer edge
  // must not erase a genuine circuit. Crossing through the furniture does.
  if(rad<1.9){this.centerTime+=dt;this.last=null;if(this.centerTime>.20)this.reset();return false;}
  this.centerTime=0;
  if(rad>CANOPY.radius+.1||r.height>.20){this.last=null;return false;}
  const a=Math.atan2(z,x);
  if(this.last!=null){const d=angle(a-this.last);
   if(Math.abs(d)>.20){this.last=a;return false;}
   this.progress+=d;this.travel+=Math.abs(d)*rad;
  }
  this.last=a;return Math.abs(this.progress)>=tau-.06&&this.travel>12;
 }
}
export class CanopyRoute{
 constructor(trackHazards,callbacks={}){
  this.trackHazards=trackHazards;this.callbacks=callbacks;this.state='locked';this.age=0;this.circle=new CircleDiscovery();this.rewardAge=99;this.deployment=0;this.found=!!callbacks.found;
  const solids=[...canopyWalls(),{kind:'BISTRO_TABLE',x:600,z:600,hx:.56,hz:.56,bottom:0,top:.79,yaw:0},...CHAIR_CENTERS.map(c=>({kind:'BISTRO_CHAIR',...c,hx:.33,hz:.33,bottom:0,top:.9,yaw:0}))];
  this.canopyHazards=new HazardWorld({covers:[],drains:[],solids},{surface:()=>0});
  this.canopyHazards.skateHeight=()=>0;
  this.canopyHazards.rideable=this.canopyHazards.asphalt=(x,z)=>Math.hypot(x-600,z-600)<CANOPY.radius||(Math.abs(x-600)<1.7&&z>=607&&z<615);
 }
 get busy(){return this.state==='reaction'||!!this.transition;}
 attach(sim){sim.area='track';sim.canopyRoute=this;this.deployment=0;return sim;}
 afterStep(sim,old,dt){
  const r=sim.rider;if(!['riding','coasting'].includes(sim.phase)){this.circle.reset();return;}
  if(this.busy||r.holding)return;
  if(sim.area==='canopy'){
   if(!this.found&&this.circle.step(r,dt)){this.found=true;this.rewardAge=0;this.callbacks.onReward?.(sim);}
   if(r.z>612.6&&old.z<=612.6&&Math.abs(r.x-600)<1.6&&r.vz>0)this.beginTransition('track',sim);
  }else{
   if(this.state==='locked'&&this.deployment>.96&&r.height<.08&&r.up<=0&&sweepBox(old,r,TRIGGER,.12)&&Math.hypot(r.vx,r.vz)>.35){
    // This low, flush plank is a safe trigger for EVERY rider, including Boss.
    // It is not registered as a ramp, trick obstacle or solid collision.
    this.state='reaction';this.age=0;this.events=new Set();this.callbacks.onEvent?.('plank');return;
   }
   const q=entryLocal(r.x,r.z),a=entryLocal(old.x,old.z);
   if(this.state==='open'&&Math.abs(q.u)<1.25&&a.v<3.8&&q.v>=3.8&&q.v<=ENTRY.length&&this.inTunnel(r,q))this.beginTransition('canopy',sim);
  }
 }
 beginTransition(to,sim){this.transition={to,age:0,speed:Math.min(5,Math.max(.5,Math.hypot(sim.rider.vx,sim.rider.vz))),swapped:false};this.callbacks.onEvent?.('tunnel');}
 advance(dt,sim){
  this.rewardAge+=dt;
  const deployed=this.state==='reaction'||sim.area==='track'&&!sim.rider.holding&&['riding','coasting'].includes(sim.phase);
  this.deployment=Math.max(0,Math.min(1,this.deployment+(deployed?1:-1)*dt/ .85));
  if(this.state==='reaction'){
   this.age+=dt;for(const [at,key]of [[.7,'can'],[2.1,'lumber'],[3.3,'starter'],[4.8,'barrier']])if(this.age>=at&&!this.events.has(key)){this.events.add(key);this.callbacks.onEvent?.(key);}
   if(this.age>=REVEAL_SECONDS){this.state='open';this.callbacks.onOpen?.();this.callbacks.onSwap?.();}
  }
  if(this.transition){const t=this.transition;t.age+=dt;
   if(t.age>=.45&&!t.swapped){t.swapped=true;this.place(sim,t.to,t.speed);}
   if(t.swapped&&t.to==='canopy'){
    // The curved arrival carries the rider tangent to the courtyard, never at the furniture.
    const speed=Math.max(2.5,Math.min(3.4,t.speed)),a=Math.PI/2-Math.min(1.2,Math.max(0,t.age-.45))*speed/7.8,h=a-Math.PI/2;
    Object.assign(sim.rider,{x:600+Math.cos(a)*7.8,z:600+Math.sin(a)*7.8,heading:h,vx:Math.cos(h)*speed,vz:Math.sin(h)*speed});
   }
   if(t.age>=1.65){this.transition=null;this.callbacks.onSwap?.();}
  }
 }
 place(sim,area,speed=0){
  const r=sim.rider;sim.area=area;sim.phase='coasting';sim.phaseTime=0;
  const p=area==='canopy'?{x:600,z:607.8}:entryPoint(0,-2),h=area==='canopy'?0:-Math.PI/2-ENTRY.yaw;
  (area==='canopy'?this.canopyHazards:this.trackHazards).attach(sim);
  Object.assign(r,p,{heading:h,vx:Math.cos(h)*speed,vz:Math.sin(h)*speed,holding:false,tension:0,height:0,up:0,airY:null,groundY:area==='canopy'?0:ENTRY.y,lean:0,wobble:0,speedWobble:0,speedWobbleOffset:0,speedWobbleLean:0,straightFastTime:0,grind:null,powerslide:null,pushStart:null,trick:null});
  sim.board=undefined;sim.gateExit=null;this.circle.reset();this.callbacks.onSwap?.();this.callbacks.onEnter?.(area);
 }
 leave(){if(this.state==='reaction'){this.state='open';this.callbacks.onOpen?.();}this.transition=null;this.circle.reset();}
 inTunnel(r,q=entryLocal(r.x,r.z)){
  const ground=r.groundY??ENTRY.y,feet=r.airY??ground+(r.height??0);
  return Math.abs(q.u)<1.4&&q.v>0&&q.v<=ENTRY.length&&feet<ENTRY.y-.22;
 }
 fade(sim){
  if(this.transition){const a=this.transition.age;return a<.45?.85+.15*Math.min(1,a/.25):Math.max(0,1-(a-.7)/.95);}
  if(sim.area==='canopy')return Math.abs(sim.rider.x-600)<1.4?Math.max(0,Math.min(.85,(sim.rider.z-610.2)/2.7)):0;
  const q=entryLocal(sim.rider.x,sim.rider.z);return this.state==='open'&&!sim.rider.holding&&this.inTunnel(sim.rider,q)?Math.max(0,Math.min(.85,(q.v-1)/3.3)):0;
 }
}

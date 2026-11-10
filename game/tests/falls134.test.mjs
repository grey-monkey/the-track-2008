import assert from 'node:assert/strict';
import {fallMotion} from '../source/motion131/fall-motion.mjs';
const make=(reason,speed=8,side=1,contact=.42)=>({phaseTime:0,stats:{},rider:{heading:0,vx:speed,vz:0,groundContactAt:contact,crashMotion:{reason,speed,side,heading:0,impactSpeed:reason==='CAR'?6:0}}});
let checks=0,maxAngleStep=0;
for(const reason of ['WOBBLE','SLIDE','DIRT','GRATE','CAR','CURB','WIPEOUT REVIEW']){
 for(const speed of [0,2,5,7.19,7.21,10,16])for(const side of [-1,1]){
  const sim=make(reason,speed,side),frames=[];
  for(let frame=0;frame<=1200;frame++){
   sim.phaseTime=frame/120;
   const m=fallMotion(sim);frames.push(m);
   for(const v of [...m.weights,m.pitch,m.roll,m.yaw,m.duration])assert(Number.isFinite(v));
   assert(m.weights.every(v=>v>=-1e-12&&v<=1+1e-12));
   assert(m.weights.reduce((a,b)=>a+b,0)<=1+1e-12,'convex support bound');
   assert(Math.abs(m.pitch)<Math.PI*2&&Math.abs(m.roll)<Math.PI,'bounded body rotation');
   if(frame){const previous=frames.at(-2);const step=Math.max(...['pitch','roll','yaw'].map(k=>Math.abs(previous[k]-m[k])));maxAngleStep=Math.max(maxAngleStep,step);assert(step<.12,'no frame discontinuity');}
   if(sim.phaseTime<.42)assert.equal(m.phase,'FALLING');
  }
  const final=frames.at(-1),prior=frames.at(-121);
  assert.equal(final.phase,'REST');assert(final.recoveryReady);
  assert.deepEqual(final.weights,[0,0,0,1]);
  for(const k of ['pitch','roll','yaw'])assert.equal(final[k],prior[k],'no endless spinning after rest');
  // Family remains stable despite energy loss in the sliding simulation.
  sim.rider.vx=0;assert.equal(fallMotion(sim).variant,final.variant);
  checks++;
 }
}
// Actual late contact, including stepping exactly onto the event, must not pop.
for(const reason of ['WOBBLE','GRATE','CAR']){
 const sim=make(reason,12,1,null);sim.phaseTime=3;
 const before=fallMotion(sim);assert.equal(before.phase,'FALLING');assert(!before.recoveryReady);
 sim.rider.groundContactAt=3;
 const at=fallMotion(sim);
 assert.deepEqual(at.weights,before.weights);
 for(const k of ['pitch','roll','yaw'])assert.equal(at[k],before[k]);
 sim.phaseTime=3.000001;
 const after=fallMotion(sim);
 for(const k of ['pitch','roll','yaw'])assert(Math.abs(after[k]-at[k])<1e-7);
 checks++;
}
assert.equal(fallMotion(make('GRATE',3)).variant,'FORWARD_TRIP');
assert.equal(fallMotion(make('GRATE',11)).variant,'SHOULDER_ROLL');
assert.equal(fallMotion(make('WOBBLE',11)).variant,'HIP_SLIDE');
assert.equal(fallMotion(make('CAR',11)).variant,'BACK_RECOIL');
const wall=make('BARRIER',10);wall.rider.crashMotion.impactSpeed=6;
assert.equal(fallMotion(wall).variant,'BACK_RECOIL');
wall.rider.throwForward=true;
assert.equal(fallMotion(wall).variant,'SHOULDER_ROLL');
// At zero heading, negative X pitch tips the rider toward positive world X.
const sim=make('GRATE',11);sim.phaseTime=.3;const m=fallMotion(sim);
assert(-Math.sin(m.pitch)>0,'forward tip must use local X, not lateral Z');
console.log(JSON.stringify({passed:checks+7,profiles:98,framesPerProfile:1201,maxAngleStepRadiansAt120Hz:maxAngleStep,lateContactContinuous:true,authoredMorphCount:4},null,2));

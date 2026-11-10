import assert from 'node:assert/strict';
import {Ride} from '../source/physics.js';
import {collectSecretSpliff,riderGravity,flightTimeRemaining,secretGlow} from '../source/secret-spliff149.mjs';
import {stepFlight} from '../source/skating139/surface.js';
import {RIDERS,BOARDS} from '../source/world.js';
const target={x:0,z:0,y:0};let count=0;
for(const rider of Object.keys(RIDERS).filter(r=>r!=='BOSS'))for(const board of Object.keys(BOARDS)){
 const s=new Ride({rider,board,start:500});s.release();s.hazards={skateHeight:()=>0};Object.assign(s.rider,{x:0,z:0,vx:2,vz:0,heading:0});
 assert(collectSecretSpliff(s,target));assert.equal(riderGravity(s),0);assert.equal(s.rider.ollieMustBail,false);assert.equal(s.rider.trick,'secret-backflip');assert(s.rider.up>0);assert(Math.abs(s.rider.vx-4.5)<1e-9);assert(Math.abs(s.rider.vz)<1e-9);assert(!collectSecretSpliff(s,target));
 assert(Number.isFinite(flightTimeRemaining(s)));assert(flightTimeRemaining(s)>7&&flightTimeRemaining(s)<7.3);assert(!s.performTrick("kickflip"));
 let apex=0,landed=false;for(let i=0;i<1200;i++){s.time+=1/120;const hit=stepFlight(s,{x:0,z:0},1/120);apex=Math.max(apex,s.rider.height);if(hit){landed=true;break;}}
 assert(apex>7.5&&apex<7.9);assert(landed);assert.equal(s.score,0);
 s.time=30;assert.equal(riderGravity(s),9.81);assert(!collectSecretSpliff(s,target));count++;
}
const denied=new Ride();denied.rider.x=20;denied.rider.z=0;assert(!collectSecretSpliff(denied,target));denied.rider.x=0;denied.phase='crashed';assert(!collectSecretSpliff(denied,target));denied.phase='coasting';denied.rider.height=4;assert(!collectSecretSpliff(denied,target));
console.log(`PASS ${count} rider/board pickup launches, zero-to-normal gravity flight, exact 30s expiry, no repeat pickup and distance/height/phase gates.`);

for(const age of [0,1,15,29.999,30,31]){const sim={time:age,secretSpliffAt:0,secretSpliffUntil:30,rider:{height:1,up:0}};assert(Math.abs(riderGravity(sim)-9.81*Math.min(age/30,1))<1e-9);assert(Number.isFinite(flightTimeRemaining(sim)));}

// Predict flight across the gravity ramp and its exact normal-gravity boundary.
for(const age of [0,12,29.8,30,31]){
 const s={time:age,secretSpliffAt:0,secretSpliffUntil:30,rider:{x:0,z:0,height:.5,airY:.5,up:2},hazards:{skateHeight:()=>0}};
 const prediction=flightTimeRemaining(s);let elapsed=0;
 while(elapsed<10){const dt=1/600;s.time+=dt;elapsed+=dt;if(stepFlight(s,{x:0,z:0},dt))break;}
 assert(Math.abs(elapsed-prediction)<.015,`flight prediction at ${age}s`);
}

const glow={time:0,secretSpliffAt:0,secretSpliffUntil:30};
assert.equal(secretGlow(glow),0);glow.time=1.1;assert(secretGlow(glow)>.95);assert.equal(secretGlow(glow,true),0);glow.time=15;assert(secretGlow(glow)>.5&&secretGlow(glow)<.65);glow.time=30;assert.equal(secretGlow(glow),0);
for(const speed of [0,2,6,12]){const s=new Ride({rider:'SALLY',board:'STREET'});s.release();s.hazards={skateHeight:()=>0};Object.assign(s.rider,{x:0,z:0,vx:0,vz:speed,heading:Math.PI/2});collectSecretSpliff(s,target);assert(s.rider.vz>=4.5);assert(Math.abs(s.rider.vx)<1e-8);assert(s.rider.up>=2.8&&s.rider.up<=4.2);}

// Wheel drag and ground wobble must not depend on terrain beneath a flying rider.
const airStates=[];
for(const dirt of [false,true]){
 const s=new Ride({rider:'SALLY',board:'STREET',start:500});s.release();
 s.hazards={skateHeight:()=>0,rideable:()=>!dirt,tick(){},riding(){}};
 Object.assign(s.rider,{x:0,z:0,vx:5,vz:0,heading:0,height:10,airY:10,up:0,dirt,wobble:.2});
 s.step();airStates.push(s.rider);
}
assert(Math.abs(airStates[0].vx-airStates[1].vx)<1e-10);
assert(Math.abs(airStates[0].wobble-airStates[1].wobble)<1e-10);

// Boss alone is excluded from Secret Spliff, even at the exact pickup location.
for(const board of Object.keys(BOARDS))for(const phase of ['riding','coasting']){
 const s=new Ride({rider:'BOSS',board,start:0});s.phase=phase;s.hazards={skateHeight:()=>0};
 Object.assign(s.rider,{x:0,z:0,height:0,vx:3,vz:0});const before=structuredClone(s.rider);
 assert(!collectSecretSpliff(s,target));assert(!s.secretSpliffCollected);assert.equal(s.secretSpliffUntil,undefined);
 assert.equal(riderGravity(s),9.81);assert.deepEqual(s.rider,before);
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {Ride,STEP} from '../source/physics.js';
import {HazardWorld} from '../source/hazards.js';
import {riderSpeedWobble} from '../source/character-rules140.js';
const boards=['LONGBOARD','HANDMEDOWN','STREET','CRUISER'];
const make=(rider,board='LONGBOARD',holding=true)=>{
 const sim=new Ride({rider,board});if(!holding)sim.release();return sim;
};
test('Boss has half the yaw/lean amplitude and three times the straight-run failure time on every board',()=>{
 for(const board of boards)for(const holding of [true,false])for(const speed of [6.3,8,12]){
  const times=[];
  for(const rider of ['DOG','BOSS']){
   const sim=make(rider,board,holding);let steps=0;
   while(sim.phase!=='crashed'&&steps<3000){riderSpeedWobble(sim,0,speed,STEP);steps++;}
   assert.equal(sim.stats.crashReason,'WOBBLE');times.push(steps*STEP);
  }
  assert(Math.abs(times[1]-3*times[0])<=4*STEP,`${board} ${speed}: ${times}`);
  const dog=make('DOG',board,holding),boss=make('BOSS',board,holding);
  for(const sim of [dog,boss])Object.assign(sim.rider,{speedWobble:.8,speedWobblePhase:Math.PI/2});
  riderSpeedWobble(dog,0,speed,0);riderSpeedWobble(boss,0,speed,0);
  assert.equal(boss.rider.speedWobbleOffset,dog.rider.speedWobbleOffset*.5);
  assert.equal(boss.rider.speedWobbleLean,dog.rider.speedWobbleLean*.5);
 }
});
test('Boss can recover by carving; slow travel and flight do not build speed wobble',()=>{
 for(const board of boards){
  const sim=make('BOSS',board);
  for(let i=0;i<850;i++)riderSpeedWobble(sim,0,8,STEP);
  assert(sim.rider.speedWobble>.5);assert.equal(sim.phase,'riding');
  for(let i=0;i<240;i++)riderSpeedWobble(sim,.4,8,STEP);
  assert.equal(sim.rider.speedWobble,0);
  for(let i=0;i<2400;i++)riderSpeedWobble(sim,0,5,STEP);
  assert.equal(sim.rider.speedWobble,0);
  sim.rider.height=1;
  for(let i=0;i<2400;i++)riderSpeedWobble(sim,0,12,STEP);
  assert.equal(sim.rider.speedWobble,0);
 }
});
test('Secondhand smoke protects Boss for its whole minute without storing a delayed wobble crash',()=>{
 const sim=make('BOSS');sim.secondHandAt=0;
 Object.assign(sim.rider,{speedWobble:.99,speedWobbleOffset:.07,straightFastTime:10});
 for(let i=0;i<7200;i++){sim.time=i*STEP;riderSpeedWobble(sim,0,12,STEP);}
 assert.equal(sim.phase,'riding');assert(sim.rider.holding);assert.equal(sim.rider.speedWobble,0);
 sim.time=60;riderSpeedWobble(sim,0,12,STEP);
 assert.equal(sim.phase,'riding');assert.equal(sim.rider.speedWobble,0);
 for(let i=0;i<1500&&sim.phase==='riding';i++)riderSpeedWobble(sim,0,12,STEP);
 assert.equal(sim.stats.crashReason,'WOBBLE');
});
test('Full physics reaches the Boss wobble threshold without generic instability causing an early bail',()=>{
 for(const board of boards){
  const sim=make('BOSS',board,false);
  // A flat, obstacle-free test lane; enforce steady speed to measure the failure clock.
  new HazardWorld({covers:[],drains:[],solids:[]}).attach(sim);
  Object.assign(sim.hazards,{asphalt:()=>true,rideable:()=>true,skateHeight:()=>0,nearby:()=>[],curb:()=>undefined});
  Object.assign(sim.rider,{x:1000,z:1000,heading:0,vx:8,vz:0});
  while(sim.phase==='coasting'&&sim.time<15){sim.rider.vx=8;sim.rider.vz=0;sim.step();}
  assert.equal(sim.stats.crashReason,'WOBBLE');
  assert(sim.rider.speedWobble>=1,`premature generic bail on ${board} at ${sim.time}`);
  assert(Math.abs(sim.time-10.425)<.05,`${board}: ${sim.time}`);
 }
});

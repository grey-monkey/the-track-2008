import assert from 'node:assert/strict';
import {Ride,STEP} from '../source/physics.js';
import {chooseFall} from '../source/motion135/sequences.mjs';
const tick=(s,seconds,input={})=>{for(let i=0;i<Math.ceil(seconds/STEP);i++)s.step(input,STEP)};
const fresh=(rider='SALLY',board='STREET')=>{const s=new Ride({start:40,rider,board});s.hazards={tick(){},riding(){},crashed(){},event(){},rideable(){return true}};return s;};
for(const rider of ['SALLY','BLACK'])for(const board of ['CRUISER','STREET'])for(const kind of (rider==='BLACK'?['ollie','kickflip']:['ollie'])){
 const s=fresh(rider,board);s.release();assert(kind==='ollie'?s.ollie():s.performTrick(kind));let high=0;for(let i=0;i<180;i++){s.step();high=Math.max(high,s.rider.height);assert(Number.isFinite(s.rider.x)&&Number.isFinite(s.rider.heading));}assert(high>.20&&high<.40);assert.equal(s.rider.height,0);assert.equal(s.phase,'coasting');assert(s.score>0);}
for(const [reason,speed,variant]of [['WOBBLE',6,'HIP_SLIDE'],['CAR',6,'BACK_RECOIL'],['GRATE',8,'SHOULDER_ROLL'],['TRIP',2,'FORWARD_TRIP']]){
 const s=fresh();s.rider.vx=speed*Math.cos(s.rider.heading);s.rider.vz=speed*Math.sin(s.rider.heading);s.crash(reason);assert.equal(chooseFall(s).variant,variant);const car=s.car.s;for(let i=0;i<1000&&s.phase==='crashed';i++)s.step();assert.equal(s.phase,'ended');assert.equal(s.rider.holding,false);assert(s.board);assert(s.car.s>car);const pos=[s.rider.x,s.rider.z];tick(s,.9,{push:true});assert.deepEqual([s.rider.x,s.rider.z],pos);}
{const s=fresh();s.release();s.rider.vx=3*Math.cos(s.rider.heading);s.rider.vz=3*Math.sin(s.rider.heading);tick(s,.1,{manual:true});assert.equal(s.rider.manual,false);assert.equal(s.combo,null);tick(s,.8);assert.equal(s.score,0);}
{const s=fresh('BLACK');assert.equal(s.performTrick('kickflip'),false);assert.equal(s.rider.holding,true);s.release();assert(s.performTrick('kickflip'));s.crash('TRIP');assert.equal(s.combo,null);assert(s.lastCombo.failed);assert.equal(s.score,0);}
console.log('PASS 6 eligible rider/board/trick launches and landings, four completed runs, no skating after a fall, disabled manual input and lost combos on bail.');

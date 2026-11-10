import assert from 'node:assert/strict';
import {Ride,STEP} from '../source/physics.js';
import {chooseFall} from '../source/motion135/sequences.mjs';
import {forestClusters147} from '../source/boundary.js';
for(const rider of ['SALLY','BLACK','DOG','BOSS'])for(const board of ['STREET','CRUISER','LONGBOARD','HANDMEDOWN'])for(const reason of ['TRIP','SLIDE','CAR'])for(const speed of [3,9,15])for(const dirt of [false,true]){
 const s=new Ride({rider,board});Object.assign(s.rider,{x:1000,z:1000,vx:speed,vz:0,heading:0,height:0,up:0});
 s.hazards={tick(){},crashed(){},rideable:()=>!dirt};s.crash(reason,speed);
 const initial=chooseFall(s);let frames=0,sawRecovery=false;
 while(s.phase==='crashed'&&frames++<2400){s.step();sawRecovery||=s.rider.recoverStart!=null;assert.equal(chooseFall(s).fall,initial.fall,'contact must not change the running fall clip');}
 assert.equal(s.phase,'ended');assert.equal(s.rider.holding,false);
 if(dirt){assert.equal(s.rider.crashMotion.landedDirt,true);assert.equal(chooseFall(s).hard,false);if(speed>=9||reason==='SLIDE'||reason==='CAR')assert(sawRecovery,'dirt plays the get-up clip');}
 else if(initial.hard){assert.equal(sawRecovery,false);assert.equal(chooseFall(s).hard,true);}
}
// Crossing dirt while airborne does not change outcome; sliding onto it does.
const s=new Ride();Object.assign(s.rider,{x:1000,z:1000,vx:10,vz:0,heading:0,height:2,up:2});let dirt=true;
s.hazards={tick(){},crashed(){},rideable:()=>!dirt};s.crash('TRIP',10);s.step();assert.equal(s.rider.crashMotion.landedDirt,undefined);assert(chooseFall(s).hard);dirt=false;
while(s.rider.fallLift>0)s.step();assert(chooseFall(s).hard);dirt=true;s.step();assert.equal(chooseFall(s).hard,false);assert.equal(chooseFall(s).fall,'Shoulders');assert.equal(chooseFall(s).getup,'GetUpForwards');
const trees=forestClusters147();assert.deepEqual(trees,forestClusters147());assert(Math.max(...trees.map(t=>t.h))-Math.min(...trees.map(t=>t.h))>18);assert(new Set(trees.map(t=>t.crop.toFixed(3))).size>70);assert(new Set(trees.map(t=>t.tint.map(x=>x.toFixed(2)).join(','))).size>70);assert(trees.some(t=>t.flip<0)&&trees.some(t=>t.flip>0));
console.log('PASS 288 dirt/pavement crash cases, all riders and boards, stable fall clips, air/ground transition and varied deterministic woodland.');

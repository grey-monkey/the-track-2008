import assert from 'node:assert/strict';
import {Ride,STEP} from '../source/physics.js';
import {HazardWorld} from '../source/hazards.js';
import {bossSurfaceContact,riderSpeedWobble} from '../source/character-rules140.js';
import {RAMP,DIVOT,PATCHES,at} from '../source/road-details.js';
const boards=['LONGBOARD','HANDMEDOWN','STREET','CRUISER'];
const make=(rider,board)=>{const s=new Ride({rider,board,start:40});new HazardWorld({covers:[],drains:[],solids:[]}).attach(s);s.hazards.asphalt=()=>true;s.hazards.rideable=()=>true;s.hazards.skateHeight=()=>0;s.release();return s;};
for(const board of boards){
 for(const [reason,point]of [['RAMP',at(RAMP,0,0)],['DIVOT',at(DIVOT,DIVOT.u,0)],...PATCHES.map(p=>['PATCH',at(p,p.u,p.v)])]){
  const s=make('BOSS',board);Object.assign(s.rider,point,{heading:0,vx:2,vz:0});assert(bossSurfaceContact(s,{...s.rider}));assert.equal(s.stats.crashReason,reason);assert.equal(s.score,0);
 }
 for(const reason of ['MANHOLE','CURB','DIRT']){
  const s=make('BOSS',board);Object.assign(s.rider,{x:0,z:0,heading:0,vx:1,vz:0});
  const wheel=s.hazards.wheels(s.rider,board)[0];
  if(reason==='MANHOLE'){new HazardWorld({covers:[{...wheel,radius:.04}],drains:[],solids:[]}).attach(s);s.hazards.asphalt=()=>true;}
  if(reason==='CURB')s.hazards.curb=(x,z)=>Math.hypot(x-wheel.x,z-wheel.z)<.02?0:undefined;
  if(reason==='DIRT')s.hazards.asphalt=(x,z)=>Math.hypot(x-wheel.x,z-wheel.z)>=.02;
  assert(bossSurfaceContact(s,{...s.rider}));assert.equal(s.stats.crashReason,reason,'one tire contact on '+board);
 }
 // A very short obstacle cannot be stepped over by a long simulation movement.
 {const s=make('BOSS',board);Object.assign(s.rider,at(RAMP,0,2),{heading:RAMP.h});assert(bossSurfaceContact(s,{...at(RAMP,0,-2),heading:RAMP.h}));assert.equal(s.stats.crashReason,'RAMP');}
 // Dog must wobble on every board, in either rope state. Real carving recovers.
 for(const holding of [true,false]){
  const s=make('DOG',board);s.rider.holding=holding;
  let peak=0,signs=new Set();for(let i=0;i<750&&s.phase!=='crashed';i++){riderSpeedWobble(s,0,10,STEP);peak=Math.max(peak,s.rider.speedWobble);if(peak>.4)signs.add(Math.sign(s.rider.speedWobbleOffset));}
  assert.equal(s.stats.crashReason,'WOBBLE');assert(peak>=1);assert(signs.has(1)&&signs.has(-1));
  const recovery=make('DOG',board);for(let i=0;i<400;i++)riderSpeedWobble(recovery,0,10,STEP);assert(recovery.rider.speedWobble>.5);
  for(let i=0;i<240;i++)riderSpeedWobble(recovery,.4,10,STEP);assert.equal(recovery.rider.speedWobble,0);assert.equal(recovery.phase,'coasting');
  for(let i=0;i<1200;i++)riderSpeedWobble(recovery,.4*Math.sin(i/90)>0?.4:-.4,10,STEP);assert.equal(recovery.rider.speedWobble,0);
 }
 for(const rider of ['SALLY','BLACK']){const s=make(rider,board);for(let i=0;i<1000;i++)riderSpeedWobble(s,0,10,STEP);assert.equal(s.rider.speedWobble,undefined);}
 {const s=make('DOG',board);for(let i=0;i<1000;i++)riderSpeedWobble(s,0,5,STEP);assert.equal(s.rider.speedWobble,0);s.rider.height=1;for(let i=0;i<1000;i++)riderSpeedWobble(s,0,9,STEP);assert.equal(s.rider.speedWobble,0);}
 // Integrated physics: a fast straight run actually develops alternating yaw.
 {const s=make('DOG',board);s.rider.vx=14*Math.cos(s.rider.heading);s.rider.vz=14*Math.sin(s.rider.heading);for(let i=0;i<1100&&s.phase==='coasting';i++)s.step();assert.equal(s.stats.crashReason,'WOBBLE');}
}
console.log('PASS Boss wheel-level hazards and swept ramp contacts; Dog all-board wobble, both rope states, carving recovery, low-speed/air immunity and integrated straight-run bails.');

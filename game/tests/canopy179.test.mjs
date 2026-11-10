import {installIslandContact} from '../source/canopy179/contact.mjs';
import {lineSample} from '../source/driving138/driver.js';
import {LENGTH} from '../source/world.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {CanopyRoute,CircleDiscovery,REVEAL_SECONDS} from '../source/canopy179/route.mjs';
import {TRIGGER,ENTRY,entryPoint,entryLocal,tunnelFloor,ISLAND,CANOPY} from '../source/canopy179/layout.mjs';
import {Ride,STEP} from '../source/physics.js';
import {HazardWorld} from '../source/hazards.js';
const track=()=>{const h=new HazardWorld({solids:[],drains:[],covers:[]});h.skateHeight=()=>0;h.rideable=h.asphalt=()=>true;return h;};
function fixture(rider='BOSS',board='LONGBOARD'){const h=track(),route=new CanopyRoute(h),sim=route.attach(h.attach(new Ride({rider,board})));sim.release();route.advance(1,sim);return{route,sim};}
test('Every rider/board can activate the plank without a trick; tow, air and stationary contact do not activate it',()=>{
 for(const rider of ['BOSS','DOG','BLACK','SALLY'])for(const board of ['LONGBOARD','HANDMEDOWN','STREET','CRUISER']){
  const {route,sim}=fixture(rider,board);Object.assign(sim.rider,{x:TRIGGER.x,z:TRIGGER.z,vx:2,vz:0});route.afterStep(sim,{x:TRIGGER.x-2,z:TRIGGER.z},STEP);assert.equal(route.state,'reaction');assert.equal(sim.phase,'coasting');assert.equal(sim.rider.trick,undefined);
  route.advance(REVEAL_SECONDS,sim);assert.equal(route.state,'open');route.afterStep(sim,sim.rider,STEP);assert.equal(route.state,'open');
 }
 for(const change of [{holding:true},{height:1},{vx:0,vz:0}]){const{route,sim}=fixture();Object.assign(sim.rider,{x:TRIGGER.x,z:TRIGGER.z,vx:2,vz:0},change);route.afterStep(sim,sim.rider,STEP);assert.equal(route.state,'locked');}
});
test('Circle discovery requires a continuous full revolution in either direction, not rocking, cutting across or teleporting',()=>{
 const point=a=>({x:600+4*Math.cos(a),z:600+4*Math.sin(a),height:0,up:0});
 for(const direction of [1,-1]){const c=new CircleDiscovery();let found=false;for(let i=0;i<=360;i++){const done=c.step(point(direction*i*Math.PI/180),STEP);if(i<357)assert(!done);found||=done;}assert(found);}
 const rocking=new CircleDiscovery();for(let i=0;i<3000;i++)assert(!rocking.step(point(Math.sin(i/50)*.7),STEP));
 const cut=new CircleDiscovery();for(let i=0;i<180;i++)cut.step(point(i*Math.PI/180),STEP);cut.step({x:600,z:600,height:0,up:0},.3);for(let i=180;i<=360;i++)assert(!cut.step(point(i*Math.PI/180),STEP));
 const jump=new CircleDiscovery();jump.step(point(0),STEP);assert(!jump.step(point(Math.PI),STEP));assert.equal(jump.progress,0);
});
test('Tunnel transition keeps character, board, score and car; return preserves the open route',()=>{
 const{route,sim}=fixture('SALLY','STREET');route.state='open';sim.score=325;const car=structuredClone(sim.car);
 Object.assign(sim.rider,entryPoint(0,4),{vx:1,vz:4,groundY:ENTRY.y-1.8});route.afterStep(sim,entryPoint(0,3.7),STEP);assert(route.busy);
 route.advance(.5,sim);assert.equal(sim.area,'canopy');assert.equal(sim.score,325);assert.equal(sim.options.rider,'SALLY');assert.equal(sim.options.board,'STREET');assert.deepEqual(sim.car,car);assert(!sim.rider.holding);assert.equal(sim.hazards,route.canopyHazards);
 route.advance(2,sim);assert(!route.busy);Object.assign(sim.rider,{x:600,z:612.8,vz:3});route.afterStep(sim,{x:600,z:612.5},STEP);route.advance(.5,sim);assert.equal(sim.area,'track');assert.equal(route.state,'open');assert.equal(sim.hazards,route.trackHazards);assert.equal(sim.score,325);
 const p=entryPoint(0,4);assert(Math.abs(tunnelFloor(p.x,p.z)-(ENTRY.y-1.8))<1e-10);
});
test('The Canopy uses real free-ride physics: Boss can ride concrete but still cannot ollie; furniture still causes a crash',()=>{
 for(const rider of ['BOSS','DOG','SALLY','BLACK']){
  const{route,sim}=fixture(rider,'STREET');route.place(sim,'canopy',2);sim.rider.x=604;sim.rider.z=605;sim.rider.heading=-Math.PI/2;sim.rider.vx=0;sim.rider.vz=-2;
  for(let i=0;i<120;i++)sim.step();assert.equal(sim.phase,'coasting',rider);assert(sim.rider.z<604);assert.equal(sim.rider.height,0);
  if(rider==='BOSS'||rider==='DOG'){assert(!sim.ollie());assert(!sim.performTrick('kickflip'));}
  Object.assign(sim.rider,{x:600,z:602.3,heading:-Math.PI/2,vx:0,vz:-4});
  for(let i=0;i<100&&sim.phase==='coasting';i++)sim.step();assert.equal(sim.phase,'crashed');assert.match(sim.stats.crashReason,/BISTRO/);
 }
});
test('Discovery callback occurs once, survives rider changes, and cannot be farmed',()=>{
 const{route,sim}=fixture();route.place(sim,'canopy',0);let count=0;route.callbacks.onReward=()=>count++;
 for(let i=0;i<=720;i++){Object.assign(sim.rider,{x:600+4*Math.cos(i*Math.PI/180),z:600+4*Math.sin(i*Math.PI/180)});route.afterStep(sim,sim.rider,STEP);}
 assert.equal(count,1);assert(route.found);const next=route.attach(track().attach(new Ride({rider:'SALLY'})));route.place(next,'canopy',0);assert(route.found);assert.equal(count,1);
});

test('All sixteen rider/board combinations can earn the CD through actual steering and pushing physics',()=>{
 for(const rider of ['BOSS','DOG','SALLY','BLACK'])for(const board of ['LONGBOARD','HANDMEDOWN','STREET','CRUISER'])for(const radius of [4,8.5]){
  const {route,sim}=fixture(rider,board);route.place(sim,'canopy',2);
  Object.assign(sim.rider,{x:600+radius,z:600,heading:Math.PI/2,vx:0,vz:2});
  for(let n=0;n<120*45&&!route.found&&sim.phase==='coasting';n++){
   const r=sim.rider,rad=Math.hypot(r.x-600,r.z-600),theta=Math.atan2(r.z-600,r.x-600);
   const desired=theta+Math.PI/2+Math.max(-.6,Math.min(.6,(rad-radius)*.5)),err=Math.atan2(Math.sin(desired-r.heading),Math.cos(desired-r.heading)),old={x:r.x,z:r.z};
   sim.step({steer:Math.max(-.7,Math.min(.7,err*1.7)),push:Math.hypot(r.vx,r.vz)<2.1});route.afterStep(sim,old,STEP);
  }
  assert(route.found,rider+' / '+board);assert.equal(sim.phase,'coasting');assert.equal(sim.rider.height,0);
 }
});

test('All six driving lines clear the open tunnel, including the car body footprint',()=>{
 for(let line=0;line<6;line++)for(let s=0;s<LENGTH;s+=.25){
  const p=lineSample(s,line);
  for(const f of [-2.4,0,2.4])for(const side of [-1,0,1]){
   const q=entryLocal(p.x+Math.cos(p.heading)*f-Math.sin(p.heading)*side,p.z+Math.sin(p.heading)*f+Math.cos(p.heading)*side);
   const clearance=Math.hypot(Math.max(0,Math.abs(q.u)-1.62),Math.max(0,-q.v,q.v-6.6));
   assert(Math.hypot(p.x+Math.cos(p.heading)*f-Math.sin(p.heading)*side-ISLAND.x,p.z+Math.sin(p.heading)*f+Math.cos(p.heading)*side-ISLAND.z)>ISLAND.radius+.5);
   assert(clearance>1.5,'line '+line+' at '+s+' must clear the descent and walls');
  }
 }
});

test('The circuit accepts wide, imperfect real-world laps and retains progress through pauses',()=>{
 for(const direction of [1,-1]){const c=new CircleDiscovery();let found=false;for(let i=0;i<=360;i++){const a=direction*i*Math.PI/180,rad=8.5+1.1*Math.sin(a*3);const r={x:600+rad*Math.cos(a),z:600+rad*Math.sin(a),height:0,up:0};found||=c.step(r,STEP);if(i===150)for(let j=0;j<300;j++)c.step(r,STEP);}assert(found);}
});
test('The activation board deploys only after release and retracts on returning to the car',()=>{
 const h=track(),route=new CanopyRoute(h),sim=route.attach(h.attach(new Ride({rider:'BOSS'})));route.advance(2,sim);assert.equal(route.deployment,0);sim.release();route.advance(.4,sim);assert(route.deployment<.96);route.advance(.5,sim);assert.equal(route.deployment,1);route.attach(h.attach(new Ride({rider:'BOSS'})));assert.equal(route.deployment,0);route.state='open';const next=route.attach(h.attach(new Ride({rider:'BOSS'})));route.advance(2,next);assert.equal(route.deployment,0);
});
test('The 9cm island is rideable for Sally, Black and Dog but trips Boss; the opened ramp remains safe for Boss',()=>{
 for(const rider of ['BOSS','DOG','SALLY','BLACK']){
  const {route,sim}=fixture(rider,'LONGBOARD');installIslandContact(sim.hazards,route);
  Object.assign(sim.rider,{x:ISLAND.x-5,z:ISLAND.z+2,heading:0,vx:3,vz:0});
  for(let i=0;i<100&&sim.phase==='coasting';i++)sim.step({push:true});
  assert.equal(sim.phase,rider==='BOSS'?'crashed':'coasting',rider);if(rider==='BOSS')assert.equal(sim.stats.crashReason,'CURB');else assert(sim.rider.groundY>0);
 }
 const {route,sim}=fixture('BOSS');installIslandContact(sim.hazards,route);route.state='open';Object.assign(sim.rider,entryPoint(0,-.2),{heading:0,vx:3,vz:0});for(let i=0;i<120&&sim.phase==='coasting';i++)sim.step();assert.equal(sim.phase,'coasting');
});
test('The Canopy wall contains riders and leaves a usable, obvious return passage',()=>{
 const {route,sim}=fixture('BOSS');route.place(sim,'canopy',0);Object.assign(sim.rider,{x:609,z:600,heading:0,vx:3,vz:0});for(let i=0;i<120&&sim.phase==='coasting';i++)sim.step();assert.equal(sim.phase,'crashed');assert(sim.rider.x<611);assert.match(sim.stats.crashReason,/CANOPY_WALL/);
 route.place(sim,'canopy',0);Object.assign(sim.rider,{x:600,z:609.5,heading:Math.PI/2,vx:0,vz:3});for(let i=0;i<200&&!route.transition&&sim.phase==='coasting';i++){const old={...sim.rider};sim.step({push:true});route.afterStep(sim,old,STEP);}assert(route.transition);assert.equal(route.transition.to,'track');
});

test('Tunnel darkness never reaches riders on the surface or beyond the passage',()=>{
 const {route,sim}=fixture();route.state='open';
 for(const v of [1,3,4,6,7,10,30,90])for(const u of [-1,0,1]){
  Object.assign(sim.rider,entryPoint(u,v),{groundY:ENTRY.y,height:0,airY:null});assert.equal(route.fade(sim),0);
  route.afterStep(sim,entryPoint(u,v-.1),STEP);assert(!route.transition);
 }
 Object.assign(sim.rider,entryPoint(0,3),{groundY:ENTRY.y-1.35,height:0,airY:null});assert(route.fade(sim)>.4);
 Object.assign(sim.rider,entryPoint(0,30),{groundY:ENTRY.y-1.35});assert.equal(route.fade(sim),0);
});
test('Arrival launches every rider beside the table without a forced collision',()=>{
 for(const rider of ['BOSS','DOG','SALLY','BLACK'])for(const board of ['LONGBOARD','HANDMEDOWN','STREET','CRUISER']){
  const {route,sim}=fixture(rider,board);route.beginTransition('canopy',sim);route.transition.speed=5;
  for(let i=0;i<200;i++)route.advance(STEP,sim);
  assert.equal(sim.area,'canopy');assert(!route.busy);assert(sim.rider.x>603);assert(Math.abs(sim.rider.heading)<.6);
  for(let i=0;i<180;i++){const old={...sim.rider};sim.step();route.afterStep(sim,old,STEP);}
  assert.equal(sim.phase,'coasting',rider+' / '+board);assert(Math.hypot(sim.rider.x-600,sim.rider.z-600)>6);
 }
});
test('Reaction events remain ordered and allow a clear generator beat before the reveal',()=>{
 const {route,sim}=fixture();const events=[];route.callbacks.onEvent=k=>events.push([k,route.age]);Object.assign(sim.rider,{x:TRIGGER.x,z:TRIGGER.z,vx:2,vz:0});route.afterStep(sim,sim.rider,STEP);
 for(let i=0;i<940;i++)route.advance(.01,sim);
 assert.deepEqual(events.map(e=>e[0]),['plank','can','lumber','starter','barrier']);assert(events[4][1]-events[3][1]>1.4);route.advance(.01,sim);assert.equal(route.state,'open');
});

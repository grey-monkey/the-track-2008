import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Ride} from '../source/physics.js';
import {stepPintailDrift} from '../source/pintail-drift169.mjs';
function fresh(rider='SALLY',board='HANDMEDOWN',speed=8){
 const s=new Ride({rider,board,start:40,seed:52});s.release();
 s.hazards={tick(){},riding(){},crashed(){},rideable(){return true},skateHeight(){return 0}};
 s.rider.vx=speed*Math.cos(s.rider.heading);s.rider.vz=speed*Math.sin(s.rider.heading);return s;
}
const slip=r=>Math.atan2(Math.sin(r.heading-Math.atan2(r.vz,r.vx)),Math.cos(r.heading-Math.atan2(r.vz,r.vx)));

test('speed and deliberate steering govern entry and achievable slide angle',()=>{
 for(const rider of ['SALLY','BLACK','DOG'])for(const sign of [-1,1]){
  const peaks=[];
  for(const speed of [4,6,8,11,14]){
   const s=fresh(rider,'HANDMEDOWN',speed);let peak=0,maxStep=0,entered=false;
   for(let i=0;i<600;i++){
    const h=s.rider.heading;s.step({steer:i<240?sign*.7:0});
    entered ||= !!s.rider.slideActive;peak=Math.max(peak,Math.abs(slip(s.rider)));
    maxStep=Math.max(maxStep,Math.abs(s.rider.heading-h));
   }
   assert.equal(s.phase,'coasting',JSON.stringify({rider,speed,reason:s.stats.crashReason}));
   assert(maxStep<.035,'continuous rotation');
   if(speed<=6){assert(!entered);assert.equal(s.score,0);assert(peak<.3);}
   else{assert(entered);assert(s.score>0&&s.score<=40);peaks.push(peak);}
  }
  assert(peaks[0]<.65);assert(peaks[1]>peaks[0]+.25);assert(peaks[2]>peaks[1]+.2&&peaks[2]>1.3);
  const carve=fresh(rider,'HANDMEDOWN',11);for(let i=0;i<240;i++)carve.step({steer:sign*.55});
  assert(!carve.rider.slideActive);assert.equal(carve.score,0);assert.equal(carve.phase,'coasting');
 }
});
test('slowing while steering is held narrows the drift and restores grip',()=>{
 const s=fresh('SALLY','HANDMEDOWN',14),r=s.rider;
 for(let i=0;i<180;i++)s.step({steer:.7});assert(r.slideActive);
 const wide=Math.abs(slip(r)),gripLoss=r.slide;assert(wide>1.2);
 for(let i=0;i<240;i++){
  const v=Math.atan2(r.vz,r.vx);r.vx=6.3*Math.cos(v);r.vz=6.3*Math.sin(v);s.step({steer:.7});
 }
 assert(Math.abs(slip(r))<wide*.5);assert(r.slide<gripLoss*.7);
 for(let i=0;i<120;i++){
  const v=Math.atan2(r.vz,r.vx);r.vx=4.2*Math.cos(v);r.vz=4.2*Math.sin(v);s.step({steer:.7});
 }
 assert(!r.slideActive);assert(r.slide<.05);
});
test('countersteering unwinds before starting an opposite drift; taps and backwards motion cannot enter',()=>{
 const s=fresh('SALLY','HANDMEDOWN',12);for(let i=0;i<180;i++)s.step({steer:.7});
 const previous=slip(s.rider);assert(previous>.7);s.step({steer:-.7});assert(!s.rider.slideActive);
 assert(slip(s.rider)>0,'no immediate opposite-side snap');
 for(let i=0;i<60;i++)s.step({steer:-.7});assert(Math.abs(slip(s.rider))<previous);
 const tap=fresh('SALLY','HANDMEDOWN',12);for(let i=0;i<18;i++)tap.step({steer:1});assert(!tap.rider.slideActive);
 const backwards=fresh();backwards.rider.heading+=Math.PI;for(let i=0;i<60;i++)stepPintailDrift(backwards,1,8,1/120);assert(!backwards.rider.slideActive);
});
test('impacts, airtime and dirt remain real limits; Boss and other boards stay excluded',()=>{
 const s=fresh('SALLY','HANDMEDOWN',12);for(let i=0;i<180;i++)s.step({steer:.7});assert(s.rider.powerslide);
 s.crash('CAR',8);assert.equal(s.phase,'crashed');assert.equal(s.rider.powerslide,null);assert.equal(s.score,0);
 for(const field of ['dirt','height']){const a=fresh();a.rider[field]=field==='dirt'?true:1;for(let i=0;i<60;i++)stepPintailDrift(a,1,8,1/120);assert(!a.rider.slideActive);assert.equal(a.rider.slide,0);}
 for(const rider of ['SALLY','BLACK','DOG','BOSS'])for(const board of ['LONGBOARD','HANDMEDOWN','CRUISER','STREET']){
  if(board==='HANDMEDOWN'&&rider!=='BOSS')continue;
  const a=fresh(rider,board);assert.equal(stepPintailDrift(a,1,8,1/120),null);assert.equal(a.rider.pintailDrift,undefined);
 }
});

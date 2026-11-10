import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Ride} from '../source/physics.js';
import {BOARDS} from '../source/world.js';
import {stepSecondHand} from '../source/second-hand165.mjs';
import {carrySecondHandHits} from '../source/second-hand-rules167.mjs';
function ride(rider='BOSS',board='LONGBOARD'){
 const s=new Ride({rider,board,start:0,seed:52});s.time=1;
 s.hazards={skateHeight:()=>0};Object.assign(s.rider,{x:0,z:0,height:0});
 s.spradSmoke={puffs:[],serial:0,next:999,count:0,lastHead:null};return s;
}
function hit(s){s.spradSmoke.puffs.push({id:++s.spradSmoke.serial,x:0,z:0,y:1.3,born:s.time-.3,collected:false});return stepSecondHand(s);}
test('30 hits across three attempts on every board; retry carries only progress',()=>{
 for(const board of Object.keys(BOARDS)){
  let s=ride('BOSS',board);
  for(let attempt=0;attempt<3;attempt++){
   for(let i=0;i<10;i++)assert.equal(hit(s),attempt===2&&i===9);
   if(attempt<2){
    const earned=s.spradSmoke.count;s.crash('CURB',12);
    for(const phase of ['crashed','ended','regroup']){s.phase=phase;assert(!hit(s));assert.equal(s.spradSmoke.count,earned);}
    const next=ride('BOSS',board);carrySecondHandHits(s,next);
    assert.equal(next.spradSmoke.count,earned);assert.deepEqual(next.spradSmoke.puffs,[]);
    assert.equal(next.spradSmoke.lastHead,null);assert.equal(next.secondHandAt,undefined);s=next;
   }
  }
  assert.equal(s.spradSmoke.count,0);assert.equal(s.secondHandAt,1);assert(s.rider.holding);
  const next=ride('BOSS',board);carrySecondHandHits(s,next);
  assert.equal(next.spradSmoke.count,0);assert.equal(next.secondHandAt,undefined);
 }
});
test('fresh selection clears progress and other riders cannot inherit it',()=>{
 const old=ride();old.spradSmoke.count=29;
 assert.equal(ride().spradSmoke.count,0);
 for(const rider of ['SALLY','BLACK','DOG']){
  const next=ride(rider);carrySecondHandHits(old,next);assert.equal(next.spradSmoke.count,0);
  next.spradSmoke.count=29;const boss=ride();carrySecondHandHits(next,boss);assert.equal(boss.spradSmoke.count,0);
 }
});

import assert from 'node:assert/strict';
import {Ride} from '../source/physics.js';
import {BOARDS} from '../source/world.js';
import {stepSecondHand,secondHandStrength,smokePosition} from '../source/second-hand165.mjs';
import {riderGravity,secretGlow,collectSecretSpliff} from '../source/secret-spliff149.mjs';

function fixture(rider='BOSS',board='LONGBOARD'){
 const s=new Ride({rider,board,start:0,seed:52});
 s.time=1;s.hazards={skateHeight:()=>0};
 Object.assign(s.rider,{x:0,z:0,height:0,vx:5,vz:0});
 s.spradSmoke={puffs:[],serial:0,next:99,count:0,lastHead:null};
 return s;
}
function puff(s,x=0){s.spradSmoke.puffs.push({id:++s.spradSmoke.serial,x,z:0,y:1.3,born:s.time-.3,collected:false});}
for(const board of Object.keys(BOARDS)){
 const s=fixture('BOSS',board);puff(s);assert(!stepSecondHand(s));assert.equal(s.spradSmoke.count,1);
 for(let i=0;i<10;i++)stepSecondHand(s);
 assert.equal(s.spradSmoke.count,1,'the same puff cannot be counted twice');
 puff(s);assert(!stepSecondHand(s));assert.equal(s.spradSmoke.count,2);
 for(let i=3;i<=29;i++){puff(s);assert(!stepSecondHand(s));assert.equal(s.spradSmoke.count,i);}
 const before=structuredClone(s.rider);puff(s);assert(stepSecondHand(s));assert.equal(s.spradSmoke.count,0);
 assert.deepEqual(s.rider,before,'pickup must not alter rider motion, pose, rope or gravity');
 assert.equal(s.secretEffect,undefined);assert.equal(s.secretSpliffAt,undefined);assert.equal(s.secretSpliffUntil,undefined);
 assert.equal(s.rider.holding,true);assert.equal(s.phase,'riding');assert.equal(riderGravity(s),9.81);
 assert(!s.secretSpliffCollected,'smoke must not collect the sidewalk pickup');
 const started=s.secondHandAt,until=s.secondHandUntil;
 for(const age of [0,1,30,59,60,63,66]){
  s.time=started+age;assert.equal(riderGravity(s),9.81);
  assert.equal(secretGlow(s),0,'rainbow reward must not add gold lighting');
  assert.equal(secondHandStrength(s,true),0,'selection screen must remain normal');
 }
 s.time=started+2;assert.equal(secondHandStrength(s),1);
 s.time=started+60;assert.equal(secondHandStrength(s),1);
 s.time=started+63;assert.equal(secondHandStrength(s),.5);
 s.time=started+66;assert.equal(secondHandStrength(s),0);
 s.time=started+2;for(let i=0;i<3;i++)puff(s);stepSecondHand(s);
 assert.equal(s.secondHandUntil,until,'active reward must not stack or restart');
}
for(const rider of ['DOG','SALLY','BLACK']){
 const s=fixture(rider);for(let i=0;i<3;i++)puff(s);assert(!stepSecondHand(s));
 assert.equal(s.spradSmoke.count,0);assert.equal(s.secondHandAt,undefined);
}
for(const phase of ['crashed','stage','menu']){
 const s=fixture();s.phase=phase;for(let i=0;i<3;i++)puff(s);assert(!stepSecondHand(s));assert.equal(s.spradSmoke.count,0);
}
const exit=fixture();exit.gateExit={};puff(exit);stepSecondHand(exit);assert.equal(exit.spradSmoke.count,0);
const far=fixture();puff(far,3);stepSecondHand(far);assert.equal(far.spradSmoke.count,0);
const old=fixture();puff(old);old.spradSmoke.puffs[0].born=-10;stepSecondHand(old);assert.equal(old.spradSmoke.puffs.length,0);
const sweep=fixture();puff(sweep);sweep.rider.x=3;sweep.spradSmoke.lastHead={x:-3,y:1.35,z:0};stepSecondHand(sweep);assert.equal(sweep.spradSmoke.count,1,'fast crossing must not miss a puff');
const fresh=fixture();assert.equal(fresh.spradSmoke.count,0);assert.equal(secondHandStrength(fresh),0);
assert(smokePosition({x:0,y:1,z:0,born:0},2).y>1,'smoke should drift gently upward');
// Exercise real car/rope physics: Boss can collect the trail without reaching the sidewalk.
for(const rope of [0,.45]){
 const s=new Ride({rider:'BOSS',board:'LONGBOARD',rope,start:0,seed:52});
 s.spradSmoke={puffs:[],serial:0,next:7,count:27,lastHead:null};
 for(let i=0;i<2400&&!s.secondHandAt&&s.phase!=='crashed';i++)s.step({},1/120);
 assert(s.secondHandAt>7&&s.secondHandAt<12,`natural trail pickup, rope ${rope}`);
 assert.equal(s.spradSmoke.puffs.filter(p=>p.collected).length,3);
 assert.equal(s.phase,'riding');assert.equal(s.rider.holding,true);assert(!s.rider.trick);assert.equal(s.rider.height,0);
}
const spliff=fixture('SALLY','STREET');assert(collectSecretSpliff(spliff,{x:0,z:0,y:0}));spliff.time+=2;
assert.equal(spliff.secretEffect,'spliff');assert(secretGlow(spliff)>0);assert.equal(secondHandStrength(spliff),0);
console.log('PASS Boss-only 30 unique smoke pickups, all boards, swept collisions, phase/distance/expiry gates, natural rope collection, unchanged rider/rope/gravity, 60s sky and 6s rainbow fade, reset and original Spliff.');

// Match a normal Boss run until pickup. Immunity now intentionally clears Boss's
// speed wobble; the reward must still never launch him or release the rope.
const rewarded=new Ride({rider:'BOSS',start:0,seed:52}),control=new Ride({rider:'BOSS',start:0,seed:52});
control.secondHandUntil=Infinity;
rewarded.spradSmoke={puffs:[],serial:0,next:7,count:27,lastHead:null};
for(let i=0;i<1440;i++){
 rewarded.step();control.step();assert.deepEqual(rewarded.car,control.car);
 if(!rewarded.secondHandAt){assert.deepEqual(rewarded.rider,control.rider);assert.equal(rewarded.phase,control.phase);}
 else{assert.equal(rewarded.phase,'riding');assert.equal(rewarded.rider.holding,true);assert.equal(rewarded.rider.height,0);assert(!rewarded.rider.trick);assert.equal(riderGravity(rewarded),9.81);assert.equal(rewarded.rider.speedWobble,0);}
}
assert(rewarded.secondHandAt>0);assert.equal(rewarded.rider.holding,true);

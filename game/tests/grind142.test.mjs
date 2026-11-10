import test from 'node:test';
import assert from 'node:assert/strict';
import {tryGrind,stepGrind,exitGrind} from '../source/spot142/grind.mjs';

const DT=1/120;
function setup({rider='SALLY',board='STREET',direction=1,streetSide=-1,y=.18,ground=0}={}){
 return {time:1,phase:'coasting',options:{rider,board},score:0,combo:null,
 rider:{x:4,z:.10,vx:direction*5,vz:0,heading:direction<0?Math.PI:0,height:y+.03-ground,airY:y+.03,up:-1,holding:false},
 hazards:{skateHeight:()=>ground,grindRails:[{id:'curb',points:[{x:0,y,z:0,s:0},{x:20,y,z:0,s:20}],length:20,streetSide}]},
 addTrick(kind){this.combo={names:[kind],base:kind==='boardslide'?200:100,multiplier:1,landedAt:null};},
 crash(reason){this.phase='crashed';this.reason=reason;this.combo=null;}};
}
function capture(sim,input={grind:true}){return tryGrind(sim,{...sim.rider},input,DT);}
function tick(sim,input={grind:true},dt=DT){sim.time+=dt;return stepGrind(sim,input,dt);}

test('capture enforces every rider/board combination and rope-first phase',()=>{
 for(const rider of ['SALLY','BLACK','DOG','BOSS'])for(const board of ['STREET','CRUISER','LONGBOARD','HANDMEDOWN']){
  const sim=setup({rider,board}),eligible=rider==='SALLY'&&['STREET','CRUISER'].includes(board);
  assert.equal(capture(sim),eligible,`${rider}/${board}`);
 }
 for(const phase of ['riding','crashed','ended','regroup']){const s=setup();s.phase=phase;assert.equal(capture(s),false);}
 const held=setup();held.rider.holding=true;assert.equal(capture(held),false);
});

test('requires deliberate intent, actual airborne descent, safe speed and vertical encounter',()=>{
 assert.equal(capture(setup(),{}),false);
 const ground=setup({y:0});Object.assign(ground.rider,{height:0,airY:0,up:0});assert.equal(capture(ground),false);
 for(const edit of [{up:1},{airY:1,height:1},{airY:.08,height:.08},{vx:.2},{ollieMustBail:true}]){
  const s=setup();Object.assign(s.rider,edit);assert.equal(capture(s),false,JSON.stringify(edit));
 }
 // A downstep crossing is allowed beyond the near-height tolerance.
 const crossing=setup();Object.assign(crossing.rider,{airY:.29,height:.29,up:-8});assert.equal(tryGrind(crossing,{...crossing.rider},{grind:true},.02),true);
});

test('rejects sideways motion and distant approaches without a warp',()=>{
 for(const theta of [36,60,90]){const s=setup(),a=theta*Math.PI/180;s.rider.vx=5*Math.cos(a);s.rider.vz=5*Math.sin(a);assert.equal(capture(s),false);}
 const s=setup();s.rider.z=.301;const x=s.rider.x,z=s.rider.z;assert.equal(capture(s),false);assert.equal(s.rider.x,x);assert.equal(s.rider.z,z);
 const edge=setup();edge.rider.z=.299;assert(capture(edge));assert(Math.hypot(edge.rider.x-4,edge.rider.z-.299)<=.30);
});

test('mirrored direction preserves momentum, chooses relative side and accumulates distance',()=>{
 for(const direction of [-1,1]){
  const s=setup({direction});assert(capture(s));assert.equal(s.rider.grind.direction,direction);assert.equal(s.rider.grind.side,direction);
  const start=s.rider.x;for(let i=0;i<60;i++)tick(s,{grind:true,steer:-direction*.17});
  assert(s.rider.grind);assert(Math.sign(s.rider.x-start)===direction);assert(Math.hypot(s.rider.vx,s.rider.vz)<5);assert(s.rider.grind.distance>2);
  assert(s.combo.base>100);assert.equal(s.combo.multiplier,1);assert.equal(s.score,0);assert.equal(s.combo.landedAt,null);
 }
});

test('boardslide entry counts once; scoring follows distance, not stationary time',()=>{
 const s=setup();assert(capture(s,{grind:true,boardslide:true}));assert.equal(s.rider.grind.kind,'boardslide');assert.equal(s.combo.base,200);
 tick(s);assert(Math.abs(s.combo.base-200-s.rider.grind.distance*24)<1e-10);assert.equal(s.combo.names.length,1);
 s.rider.grind.speed=0;const score=s.combo.base;tick(s);assert.equal(s.combo.base,score);assert.equal(s.rider.grind,null);assert.equal(s.score,0);
});

test('unattended balance eventually bails while opposite steering corrects it',()=>{
 const fall=setup();capture(fall);fall.hazards.grindRails[0].length=500;fall.hazards.grindRails[0].points[1].x=fall.hazards.grindRails[0].points[1].s=500;
 for(let i=0;i<1200&&fall.phase==='coasting';i++)tick(fall);
 assert.equal(fall.reason,'GRIND');assert.equal(fall.rider.grind,null);assert.equal(fall.combo,null);
 for(const direction of [-1,1]){
  const s=setup({direction});capture(s);s.rider.grind.balance=direction*.4;const before=Math.abs(s.rider.grind.balance);
  for(let i=0;i<24;i++)tick(s,{grind:true,steer:-direction*.7});
  assert(Math.abs(s.rider.grind.balance)<before);
 }
});

test('release grace period, street-side drop and cooldown preserve an unbanked combo',()=>{
 const s=setup();capture(s);tick(s,{grind:false});assert(s.rider.grind);
 s.time+=.2;const before={...s.rider},speed=s.rider.grind.speed;assert(stepGrind(s,{},DT));assert.equal(s.rider.grind,null);
 assert(s.rider.vz<0);assert.equal(s.rider.up,0);assert(s.rider.airY>.18);assert(s.rider.height>0);assert.equal(s.rider.grindExit.kind,'fiftyfifty');
 assert(Math.abs(Math.hypot(s.rider.vx,s.rider.vz)-speed)<1e-12);assert(Math.hypot(s.rider.x-before.x,s.rider.z-before.z)<=.061);
 assert(s.rider.grindCooldownUntil-s.time>=.5);assert.equal(capture(s),false);assert.equal(s.score,0);assert.equal(s.combo.landedAt,null);
 s.time=s.rider.grindCooldownUntil+.01;Object.assign(s.rider,{airY:.20,height:.20,up:-1,z:.10});assert(capture(s));
});

test('pop exit has bounded upward impulse, safe lateral component and source side metadata',()=>{
 const s=setup({direction:-1,streetSide:1});capture(s,{grind:true,boardslide:true});const speed=s.rider.grind.speed;assert(exitGrind(s,{pop:true}));
 assert(s.rider.up>2&&s.rider.up<2.75);assert(s.rider.vz>0);assert(s.rider.vx<0);assert(Math.abs(Math.hypot(s.rider.vx,s.rider.vz)-speed)<1e-12);
 assert.deepEqual(s.rider.grindExit,{kind:'boardslide',time:s.time,side:-1,direction:-1,pop:true});assert.equal(exitGrind(s),false);
});

test('endpoints exit in either direction, and absent rails safely release',()=>{
 for(const direction of [-1,1]){const s=setup({direction});s.rider.x=direction>0?19.99:.01;capture(s);tick(s);assert.equal(s.rider.grind,null);assert(s.rider.grindExit);}
 const missing=setup();capture(missing);missing.hazards.grindRails=[];assert(tick(missing));assert.equal(missing.rider.grind,null);assert(Number.isFinite(missing.rider.airY));
 assert.equal(stepGrind(setup(),{},DT),false);
});

test('curved graded rail respects height and finite state with gravity, without flat speed boost',()=>{
 const s=setup(),points=[{x:0,y:.18,z:0,s:0}];let distance=0;
 for(let i=1;i<=50;i++){const a=points.at(-1),x=i*.4,z=.002*i*i;distance+=Math.hypot(x-a.x,z-a.z);points.push({x,y:.18-i*.002,z,s:distance});}
 s.hazards.grindRails=[{id:'curve',points,length:distance,streetSide:-1}];Object.assign(s.rider,{x:.8,z:.06,airY:.20,height:.2});assert(capture(s));
 for(let i=0;i<240&&s.rider.grind;i++){
  tick(s,{grind:true,steer:-.18});
  for(const key of ['x','z','vx','vz','heading','height','up','airY'])assert(Number.isFinite(s.rider[key]),key);
  if(s.rider.grind)assert(s.rider.grind.speed<5.3,'only small gravity gain is possible on this slope');
 }
 assert.equal(s.phase,'coasting');
});

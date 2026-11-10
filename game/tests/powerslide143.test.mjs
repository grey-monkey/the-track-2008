import assert from 'node:assert/strict';
import {Ride} from '../source/physics.js';
import {scorePowerslide,powerslidePoints} from '../source/powerslide143.mjs';
const dt=1/120;
function fresh(rider='SALLY',board='HANDMEDOWN',holding=false){
 const s=new Ride({rider,board,start:40});
 s.hazards={tick(){},riding(){},crashed(){},rideable(){return true},skateHeight(){return 0}};
 if(!holding)s.release();return s;
}
function slide(s,n=60){Object.assign(s.rider,{vx:5,vz:1,heading:0,slide:.6,slideActive:true,slideSign:1,steer:.9});for(let i=0;i<n;i++){s.time+=dt;scorePowerslide(s,dt);}}
function recover(s){Object.assign(s.rider,{vx:4,vz:0,slide:0,slideActive:false,steer:0});for(let i=0;i<90;i++){s.time+=dt;scorePowerslide(s,dt);}}
// Board/rider permissions apply in both towing and free skating.
for(const holding of [false,true])for(const rider of ['SALLY','BLACK','DOG','BOSS'])for(const board of ['HANDMEDOWN','LONGBOARD','STREET','CRUISER']){
 const s=fresh(rider,board,holding);slide(s);assert.equal(s.score,0);assert.equal(s.combo,null);recover(s);
 assert.equal(!!s.combo,board==='HANDMEDOWN'&&['SALLY','BLACK','DOG'].includes(rider));
 if(s.combo){assert.deepEqual(s.combo.names,['powerslide']);assert.equal(s.combo.base,10);assert.equal(s.combo.multiplier,1);recover(s);assert.equal(s.combo.multiplier,1);}
}
for(const fault of ['brief','air','dirt','crash','stationary','no-slip','reverse']){
 const s=fresh();slide(s,fault==='brief'?10:60);
 if(fault==='air')s.rider.height=.2;
 if(fault==='dirt')s.rider.dirt=true;
 if(fault==='crash')s.crash('TRIP');
 if(fault==='stationary')s.rider.vx=s.rider.vz=0;
 if(fault==='no-slip'){s.rider.powerslide=null;s.rider.vz=0;for(let i=0;i<120;i++){s.time+=dt;scorePowerslide(s,dt);}}
 if(fault==='reverse')s.rider.slideSign=-1;
 s.time+=dt;scorePowerslide(s,dt);recover(s);assert.equal(s.combo,null,fault);assert.equal(s.score,0,fault);
}
// Time earns points gradually, with no initial 100-point jump or 250 cap.
for(const seconds of [1,5,10,20]){
 const s=fresh();slide(s,seconds*120);assert.equal(powerslidePoints(s.rider.powerslide),seconds*20);
 recover(s);assert.equal(s.combo.base,seconds*20);assert.equal(s.combo.multiplier,1);
 s.crash('TRIP');assert.equal(s.score,0);assert.equal(s.combo,null);assert(s.lastCombo.failed);assert.equal(s.rider.powerslide,null);
}
// Equal slide time at different update rates produces equal points.
for(const hz of [30,60,120]){
 const s=fresh();Object.assign(s.rider,{vx:10,vz:6,heading:0,slide:.6,slideActive:true,slideSign:1,steer:.9});
 for(let i=0;i<hz*3;i++){s.time+=1/hz;scorePowerslide(s,1/hz);}
 assert.equal(powerslidePoints(s.rider.powerslide),60);recover(s);assert.equal(s.combo.base,60);
}
// Countersteer and time spent aligning cannot manufacture extra awards.
{const s=fresh();s.rider.pintailDrift={};slide(s,120);s.rider.slideSign=-1;
 for(let i=0;i<120;i++){s.time+=dt;scorePowerslide(s,dt);}
 assert.equal(powerslidePoints(s.rider.powerslide),40);
 Object.assign(s.rider,{slideActive:false,slide:.3});
 for(let i=0;i<120;i++){s.time+=dt;scorePowerslide(s,dt);}
 assert.equal(powerslidePoints(s.rider.powerslide),40);recover(s);assert.equal(s.combo.base,40);assert.equal(s.combo.multiplier,1);
}
// A slide adds only its earned points to a pre-existing combo.
{const s=fresh();s.addTrick('ollie');slide(s,120);recover(s);assert.equal(s.combo.base,70);assert.equal(s.combo.multiplier,2);}
// End-to-end real traction, yaw and recovery: no authored slide flags or scores.
for(const rider of ['SALLY','BLACK','DOG'])for(const sign of [-1,1]){
 const s=fresh(rider),r=s.rider;r.vx=10*Math.cos(r.heading);r.vz=10*Math.sin(r.heading);
 for(let i=0;i<480;i++){s.step({steer:i<150?sign*.9:0},dt);if(i===149){assert.equal(s.score,0);assert.equal(s.combo,null);}}
 assert.equal(s.phase,'coasting');assert(s.score>0&&s.score<40);assert.deepEqual(s.lastCombo.names,['powerslide']);
 const banked=s.score;for(let i=0;i<240;i++)s.step({},dt);assert.equal(s.score,banked);
}
console.log('PASS Pintail permissions, gradual uncapped time scoring, frame-rate independence, countersteer continuity, recovery freeze, bail loss, combo preservation and six integrated left/right slides.');

import assert from 'node:assert/strict';
import {Ride} from '../source/physics.js';
import {secondHandProtected,SECOND_HAND_SECONDS,SECOND_HAND_HITS} from '../source/second-hand-rules167.mjs';
import {HazardWorld} from '../source/hazards.js';
import {bossSurfaceContact} from '../source/character-rules140.js';
import {RAMP,DIVOT,PATCHES,at,rideRoadDetails} from '../source/road-details.js';
import {carCollision} from '../source/car-collision.js';
import {stepFlight} from '../source/skating139/surface.js';
assert.equal(SECOND_HAND_SECONDS,60);assert.equal(SECOND_HAND_HITS,30);
function make(rider='BOSS',board='LONGBOARD',protectedNow=true){const s=new Ride({rider,board,start:40});s.time=10;if(protectedNow)s.secondHandAt=10;new HazardWorld({covers:[],drains:[],solids:[]}).attach(s);s.hazards.asphalt=()=>true;s.hazards.rideable=()=>true;s.hazards.skateHeight=()=>0;return s;}
for(const age of [-.001,0,30,59.999,60,63,66]){const s=make();s.time=10+age;assert.equal(secondHandProtected(s),age>=0&&age<60);}
const reasons=['CAR','RAMP','DIRT','CURB','DIVOT','PATCH','MANHOLE','GRATE','TRIP','WOBBLE','GRIND','HYDRANT'];
for(const board of ['LONGBOARD','HANDMEDOWN','STREET','CRUISER']){
 for(const reason of reasons){const s=make('BOSS',board),before=structuredClone(s.rider);s.addTrick('ollie');const combo=structuredClone(s.combo);s.crash(reason,15);assert.equal(s.phase,'riding');assert.deepEqual(s.rider,before);assert.deepEqual(s.combo,combo);assert.equal(s.board,undefined);assert.equal(s.stats.crashReason,null);s.time=70;s.crash(reason,15);assert.equal(s.phase,'crashed');assert.equal(s.stats.crashReason,reason);}
 // Boss's strict road-contact rule must not stop him in place during immunity.
 for(const point of [at(RAMP,0,0),at(DIVOT,DIVOT.u,0),...PATCHES.map(p=>at(p,p.u,p.v))]){const s=make('BOSS',board);Object.assign(s.rider,point,{heading:0,vx:4,vz:0});const before=structuredClone(s.rider);assert(!bossSurfaceContact(s,{...s.rider,x:s.rider.x-.2}));assert.deepEqual(s.rider,before);}
 const dirt=make('BOSS',board);dirt.hazards.asphalt=()=>false;assert(!bossSurfaceContact(dirt,{...dirt.rider}));dirt.time=70;assert(bossSurfaceContact(dirt,{...dirt.rider}));assert.equal(dirt.stats.crashReason,'DIRT');
 // Actual grate and solid response must not access a nonexistent fallen board.
 for(const protectedNow of [true,false]){
  const s=make('BOSS',board,protectedNow);new HazardWorld({covers:[],drains:[{x:0,z:0,hx:.2,hz:1,yaw:0}],solids:[]}).attach(s);Object.assign(s.rider,{x:1,z:0,heading:0,vx:5,vz:0});s.hazards.riding(s,{x:-1,z:0,heading:0},1/120);assert.equal(s.phase,protectedNow?'riding':'crashed');if(protectedNow)assert.equal(s.board,undefined);
  const wall=make('BOSS',board,protectedNow);new HazardWorld({covers:[],drains:[],solids:[{x:0,z:0,hx:.2,hz:2,yaw:0,bottom:-.1,top:2,kind:'BARRIER'}]}).attach(wall);Object.assign(wall.rider,{x:1,z:0,heading:0,vx:5,vz:0});wall.hazards.riding(wall,{x:-1,z:0,heading:0},1/120);assert.equal(wall.phase,protectedNow?'riding':'crashed');assert(Number.isFinite(wall.rider.x));if(protectedNow){assert.equal(wall.board,undefined);assert(wall.rider.x<0,'barrier remains physically solid');}
  const car=make('BOSS',board,protectedNow);car.car={x:0,z:0,heading:0};Object.assign(car.rider,{x:-1,z:0,heading:0,vx:8,vz:0});assert(carCollision(car,car.rider,{x:-4,z:0,heading:0},car.car,false,1/120));assert.equal(car.phase,protectedNow?'riding':'crashed');if(protectedNow)assert.equal(car.rider.fallUp,undefined);
 }
 const ramp=make('BOSS',board);Object.assign(ramp.rider,at(RAMP,0,RAMP.length/2+.01),{heading:RAMP.h,vx:RAMP.co*5,vz:RAMP.si*5});rideRoadDetails(ramp,at(RAMP,0,RAMP.length/2-.01),1/120);assert.equal(ramp.phase,'riding');assert(!ramp.rider.trick);
 const edge=make('BOSS',board);edge.rider.x=1;edge.rider.z=0;edge.hazards.skateHeight=x=>x>0?1:0;stepFlight(edge,{x:-1,z:0},1/120);assert.equal(edge.phase,'riding');
}
for(const rider of ['DOG','SALLY','BLACK']){const s=make(rider);assert(!secondHandProtected(s));s.crash('CAR');assert.equal(s.phase,'crashed');}
// Integrated deck/car collision also retains the rider's board and rope.
const drive=make();drive.time=10;drive.secondHandAt=9;const c=drive.car;Object.assign(drive.rider,{x:c.x-Math.cos(c.heading)*2.7,z:c.z-Math.sin(c.heading)*2.7,vx:Math.cos(c.heading)*12,vz:Math.sin(c.heading)*12});for(let i=0;i<120;i++)drive.step();assert.equal(drive.phase,'riding');assert.equal(drive.rider.holding,true);assert.equal(drive.board,undefined);
console.log('PASS exact 60s Boss-only immunity, all crash causes/boards, normal expiry, protected road contacts, solid barriers, grates, ramp edges and car impacts without fallen-board errors.');

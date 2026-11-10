import assert from 'node:assert/strict';
import {Ride,STEP} from '../source/physics.js';
import {canTrick,ollieOutcome} from '../source/trick-rules.js';
import {RAMP,at,rideRoadDetails} from '../source/road-details.js';
const fresh=(rider,board)=>{const s=new Ride({start:40,rider,board});s.hazards={tick(){},riding(){},crashed(){},event(){},rideable(){return true}};return s;};
const tick=(s,n,input={})=>{for(let i=0;i<n;i++)s.step(input,STEP)};
let combinations=0;
for(const rider of ['SALLY','BLACK','DOG','BOSS'])for(const board of ['STREET','CRUISER','LONGBOARD','HANDMEDOWN']){
 const skilled=['SALLY','BLACK'].includes(rider)&&['STREET','CRUISER'].includes(board);
 assert.equal(canTrick(rider,board),skilled);
 for(const kind of ['kickflip','shoveit']){const s=fresh(rider,board);s.release();const allowed=skilled&&rider==='BLACK'&&kind==='kickflip';assert.equal(s.performTrick(kind),allowed);tick(s,170);assert.equal(s.phase,'coasting');assert.equal(s.score>0,allowed);}
 {const s=fresh(rider,board);s.release();assert.equal(s.ollie(),skilled);tick(s,160);assert.equal(s.phase,'coasting');assert.equal(s.score>0,skilled);}
 {const s=fresh(rider,board);s.release();s.rider.vx=3*Math.cos(s.rider.heading);s.rider.vz=3*Math.sin(s.rider.heading);tick(s,10,{manual:true});assert.equal(s.rider.manual,false);assert.equal(!!s.combo,false);}
 // Boss bails on the ramp; the other riders launch and land with no trick award.
 {const s=fresh(rider,board);s.release();const old=at(RAMP,0,RAMP.length/2-.02);Object.assign(s.rider,at(RAMP,0,RAMP.length/2+.02),{heading:RAMP.h,vx:3*RAMP.co,vz:3*RAMP.si});rideRoadDetails(s,old,STEP);if(rider==='BOSS'){assert.equal(s.phase,'crashed');assert.equal(s.stats.crashReason,'RAMP');assert.equal(s.score,0);}else{assert(s.rider.up>0&&s.rider.height>0);assert.equal(s.rider.airSource,'ramp');assert.equal(s.rider.ollieMustBail,false);assert.equal(s.rider.trick,null);tick(s,130);assert.equal(s.phase,'coasting');assert.equal(s.rider.height,0);assert.equal(s.score,0);}}
 combinations++;
}
// Buffered landing inputs are allowed only in the last 120ms, and cancelled by a bail.
{const s=fresh('SALLY','STREET');s.release();s.ollie();assert.equal(s.ollie(),false);while(!(s.rider.up<0&&s.rider.height<.08))s.step();assert(s.ollie());while(s.rider.height>0)s.step();s.step();assert(s.rider.up>0);assert.equal(s.combo.multiplier,2);s.crash('TRIP');assert.equal(s.rider.bufferedTrick,null);}
{const s=fresh('DOG','STREET');s.release();assert.equal(s.ollie(),false);tick(s,60);assert.equal(s.phase,'coasting');assert.equal(s.score,0);}
{const s=fresh('BLACK','CRUISER');assert.equal(s.performTrick('kickflip'),false);assert(s.rider.holding);assert.equal(s.ollie('invented'),false);}
console.log(`PASS all ${combinations} rider/board combinations: trick permissions, novice trick controls blocked, manual gating, character-specific ramp launches/landings and buffered inputs.`);


{const s=fresh('BLACK','STREET');s.release();s.rider.vx=3*Math.cos(s.rider.heading);s.rider.vz=3*Math.sin(s.rider.heading);s.ollie();s.step({manual:true});assert.equal(s.rider.manual,false);assert.deepEqual(s.combo.names,['ollie']);}

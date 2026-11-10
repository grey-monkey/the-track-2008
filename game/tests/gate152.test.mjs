import assert from 'node:assert/strict';
import {EXIT_GATE,detectGateExit,gateExitFade,stepGateExit} from '../source/gate-exit152.mjs';
const g=EXIT_GATE,point=(along,across)=>({x:g.x+g.tx*along+g.tz*across,z:g.z+g.tz*along-g.tx*across});
function setup(phase='coasting',holding=false,across=2.5,direction=1){return{time:1,phase,score:0,car:{s:100},rider:{...point(direction>0?2:0,across),height:0,holding,vx:g.tx*4*direction,vz:g.tz*4*direction},hazards:{skateHeight:()=>0}};}
for(const across of [-2.5,2.5]){const s=setup('coasting',false,across);s.combo={base:150,multiplier:2};assert(detectGateExit(s,point(0,across)));assert.equal(s.score,300);assert.equal(gateExitFade(s),0);s.time+=1.6;assert(Math.abs(gateExitFade(s)-.5)<1e-9);assert.equal(gateExitFade(s,true),0);const x=s.rider.x;stepGateExit(s,1/60);assert(s.rider.x!==x);s.time=s.gateExit.at+3.21;stepGateExit(s,1/60);assert.equal(s.phase,'regroup');assert.equal(gateExitFade(s),1);assert.equal(s.rider.vx,0);assert(!detectGateExit(s,point(0,across)));}
for(const [phase,holding]of [['riding',true],['coasting',true],['crashed',false],['ended',false]]){const s=setup(phase,holding);assert(!detectGateExit(s,point(0,2.5)));}
for(const across of [0,.5,5.5,12])assert(!detectGateExit(setup('coasting',false,across),point(0,across)));
assert(!detectGateExit(setup('coasting',false,2.5,-1),point(2,2.5)));
const outside=setup();assert(!detectGateExit(outside,point(1.8,2.5)));assert.equal(gateExitFade(outside),0);
console.log('PASS both gate lanes, outgoing free-ride-only crossing, no side/inbound/towed activation, smooth fade, score banking and restart stage.');

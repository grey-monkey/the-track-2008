import test from 'node:test';
import assert from 'node:assert/strict';
import {tryGrind,stepGrind,exitGrind} from '../source/spot142/grind.mjs';
function setup({offset=.4,angle=45,direction=1,board='STREET',rider='SALLY'}={}){
 const a=angle*Math.PI/180;
 return {time:1,phase:'coasting',options:{rider,board},score:0,rider:{x:2,z:offset,vx:direction*5*Math.cos(a),vz:5*Math.sin(a),heading:0,height:.29,airY:.29,up:-1,holding:false},hazards:{skateHeight:()=>0,grindRails:[{id:'lumber',length:30,streetSide:-1,entryAssist:{radius:.42,angle:50},points:[{x:0,y:.262,z:0,s:0},{x:30,y:.262,z:0,s:30}]}]},addTrick(kind){this.combo={names:[kind],base:100,multiplier:1,landedAt:null}},crash(){this.phase='crashed'}};
}
const catchRail=s=>tryGrind(s,{...s.rider},{grind:true});
test('lumber catch accepts off-center angled approaches in both directions without relaxing permissions',()=>{
 for(const direction of [-1,1])for(const offset of [-.4,.4])for(const board of ['STREET','CRUISER']){const s=setup({direction,offset,board});assert(catchRail(s));assert.equal(s.rider.grind.direction,direction);assert(Math.abs(s.rider.grind.balance)<=.06);}
 for(const args of [{offset:.43},{angle:51},{board:'LONGBOARD'},{board:'HANDMEDOWN'},{rider:'DOG'},{rider:'BLACK'},{rider:'BOSS'}])assert.equal(catchRail(setup(args)),false,JSON.stringify(args));
 for(const state of [{height:0,airY:0,up:0},{up:1},{airY:.1,height:.1}]){const s=setup();Object.assign(s.rider,state);assert.equal(catchRail(s),false)}
 const s=setup();assert.equal(tryGrind(s,{...s.rider},{}),false);
});
test('lumber release clears toward asphalt with a small hop, conserving horizontal speed and awaiting landing',()=>{
 for(const direction of [-1,1]){const s=setup({direction});assert(catchRail(s));const speed=s.rider.grind.speed;assert(exitGrind(s));assert.equal(s.rider.up,.65);assert.equal(s.rider.z,-.12);assert(s.rider.vz<0);assert(Math.abs(Math.hypot(s.rider.vx,s.rider.vz)-speed)<1e-10);assert.equal(s.score,0);assert.equal(s.combo.landedAt,null);assert(s.rider.grindCooldownUntil>s.time);}
});
test('lumber balancing remains an active challenge after a gentle catch',()=>{
 const s=setup({angle:0});catchRail(s);let peak=0;for(let i=0;i<1200&&s.rider.grind;i++){s.time+=1/120;stepGrind(s,{grind:true});peak=Math.max(peak,Math.abs(s.rider.grind?.balance??0))}assert.equal(s.phase,'crashed');assert(peak>.9);
 const controlled=setup({angle:0});catchRail(controlled);for(let i=0;i<180;i++){controlled.time+=1/120;stepGrind(controlled,{grind:true,steer:-controlled.rider.grind.balance*.8-.16});}assert(controlled.rider.grind);assert(Math.abs(controlled.rider.grind.balance)<.15);
});

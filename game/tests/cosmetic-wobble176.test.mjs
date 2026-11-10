import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../source/vendor/three.module.js';
import {Ride} from '../source/physics.js';
import {cosmeticWobble,applyCosmeticWobble} from '../source/cosmetic-wobble176.mjs';
test('Boss low-speed wobble is one eighth strength, cosmetic only, and follows the paused simulation clock',()=>{
 for(const board of ['STREET','CRUISER','LONGBOARD','HANDMEDOWN'])for(const holding of [true,false]){
  const sim=new Ride({rider:'BOSS',board});if(!holding)sim.release();sim.rider.vx=3;sim.rider.vz=0;
  sim.time=1/(4*2.4);assert.equal(cosmeticWobble(sim),.15/8);
  const before=structuredClone(sim.rider),score=sim.score;
  const view={board:new T.Object3D(),rider:new T.Object3D()};view.board.position.set(1,0,2);view.rider.position.set(1,.1,2);
  applyCosmeticWobble(view,sim);assert(Math.abs(view.board.rotation.y-.15/8)<1e-12);assert.equal(view.rider.rotation.y,view.board.rotation.y);
  assert.deepEqual(sim.rider,before);assert.equal(sim.score,score);assert.notEqual(sim.phase,'crashed');
  assert.equal(cosmeticWobble(sim),cosmeticWobble(sim));
  sim.time+=1/(2*2.4);assert(Math.abs(cosmeticWobble(sim)+.15/8)<1e-12);
 }
});
test('Cosmetic wobble fades at speed boundaries and is absent at rest, in menus, falls, air and other riders',()=>{
 const sim=new Ride({rider:'BOSS'});sim.time=1/(4*2.4);sim.rider.vz=0;
 for(const speed of [0,.35,6.3,9]){sim.rider.vx=speed;assert.equal(cosmeticWobble(sim),0);}
 for(const speed of [.36,6.29]){sim.rider.vx=speed;assert(Math.abs(cosmeticWobble(sim))<.0001);}
 sim.rider.vx=3;assert.equal(cosmeticWobble(sim,true),0);
 for(const rider of ['SALLY','BLACK','DOG']){sim.options.rider=rider;assert.equal(cosmeticWobble(sim),0);}
 sim.options.rider='BOSS';for(const phase of ['crashed','ended','regroup']){sim.phase=phase;assert.equal(cosmeticWobble(sim),0);}
 sim.phase='coasting';sim.rider.height=1;assert.equal(cosmeticWobble(sim),0);
 sim.rider.height=0;sim.rider.pushActive=true;assert.equal(cosmeticWobble(sim),0);
});

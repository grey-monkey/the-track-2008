import test from 'node:test';
import assert from 'node:assert/strict';
import {Gestures} from '../source/input.js';
const make=(holding=true)=>{const events=[];const state={holding};const g=new Gestures({isHolding:()=>state.holding,release:()=>{state.holding=false;events.push('release')},ollie:()=>events.push('ollie'),trick:k=>events.push(k)});return{g,events,state};};

test('a flick up lets go even at the end of a long held carve',()=>{
 const {g,events}=make();g.down(1,200,500,0);
 for(let t=16;t<=2000;t+=16)g.move(1,200+Math.min(70,t/10),500,t); // two seconds of held carve
 assert(g.state.steer>.6);assert.deepEqual(events,[]);
 g.move(1,270,470,2032);g.move(1,270,440,2064);assert.deepEqual(events,['release']);
});
test('the same thumb steers again straight after the flick, without lifting',()=>{
 const {g,events}=make();g.down(1,200,500,0);g.move(1,200,440,90);assert.deepEqual(events,['release']);
 g.move(1,260,440,300);assert(g.state.steer>.5,'re-anchored steering');
 g.move(1,140,440,500);assert(g.state.steer<-.5);
});
test('starting a carve on a diagonal does not let go of the rope',()=>{
 const {g,events}=make();g.down(1,200,500,0);g.move(1,260,455,90);assert.deepEqual(events,[]);assert(g.state.steer>.5);
});
test('a held carve is not a crouch, so lifting from it never pops an ollie',()=>{
 const {g,events}=make(false);g.down(1,200,500,0);g.move(1,260,500,100);g.tick(900);assert(!g.state.crouch);g.up(1,950);assert.deepEqual(events,[]);
 g.down(1,200,500,1000);g.tick(1400);assert(g.state.crouch);g.up(1,1450);assert.deepEqual(events,['ollie']);
});
test('dragging down never cancels steering on the rope; it brakes only when free',()=>{
 const towed=make(true);towed.g.down(1,200,500,0);towed.g.move(1,230,560,400);assert(!towed.g.state.brake);assert(towed.g.state.steer>.2);
 const free=make(false);free.g.down(1,200,500,0);free.g.move(1,205,560,400);assert(free.g.state.brake);assert.equal(free.g.state.steer,0);
});
test('the stick floats: overshooting full lock still reverses immediately',()=>{
 const {g}=make();g.down(1,200,500,0);g.move(1,400,500,200);assert.equal(g.state.steer,1);
 g.move(1,354,500,260);assert(g.state.steer<.55&&g.state.steer>.4,String(g.state.steer));g.move(1,300,500,320);assert(g.state.steer<0);
});
test('small slop around the anchor is ignored',()=>{const {g}=make();g.down(1,200,500,0);g.move(1,203,500,50);assert.equal(g.state.steer,0);});

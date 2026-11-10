import test from 'node:test';
import assert from 'node:assert/strict';
import {EveningScores} from '../source/evening-scores174.mjs';
import {Ride} from '../source/physics.js';
const ride=(scores,rider,board='STREET')=>scores.bind(new Ride({rider,board,start:40,seed:52}));
test('Sally 250 / Dog 500 remain independent through rider, board and menu changes',()=>{
 const scores=new EveningScores();let s=ride(scores,'SALLY');s.score+=250;
 let d=ride(scores,'DOG','HANDMEDOWN');d.score+=500;
 for(let i=0;i<10;i++){assert.equal(ride(scores,'SALLY').score,250);assert.equal(ride(scores,'DOG').score,500);}
 s=ride(scores,'SALLY','CRUISER');s.score+=75;d=ride(scores,'DOG');d.score+=20;
 assert.equal(ride(scores,'SALLY').score,325);assert.equal(ride(scores,'DOG').score,520);
 assert.equal(ride(scores,'BLACK').score,0);assert.equal(ride(scores,'BOSS').score,0);
});
test('existing bank and bail logic preserves earned totals, loses only unfinished combo',()=>{
 const scores=new EveningScores(),s=ride(scores,'SALLY');s.score=250;
 s.addTrick('ollie');s.combo.landedAt=0;s.time=.6;s.step({});assert.equal(s.score,300);
 const retry=ride(scores,'SALLY');assert.equal(retry.score,300);assert.equal(retry.combo,null);
 retry.addTrick('ollie');retry.crash('TRIP',4);assert.equal(retry.score,300);assert.equal(retry.combo,null);
 assert.equal(ride(scores,'SALLY').score,300);assert.equal(ride(scores,'DOG').score,0);
});
test('new evening resets every rider without touching another open evening',()=>{
 const first=new EveningScores();for(const name of ['SALLY','DOG','BLACK','BOSS'])ride(first,name).score=100;
 const reopened=new EveningScores();for(const name of ['SALLY','DOG','BLACK','BOSS']){assert.equal(ride(reopened,name).score,0);assert.equal(ride(first,name).score,100);}
});

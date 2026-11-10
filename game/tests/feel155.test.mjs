import assert from 'node:assert/strict';
import {cameraElevation,landingCameraDip,deckCarveBank} from '../source/ride-feel155.mjs';
import * as T from '../source/vendor/three.module.js';
import {BoardContact} from '../source/board-contact.js';
// Display rate must not change the spring response to a fixed surface step.
const samples=[];for(const hz of [30,60,120]){const state={y:0,velocity:0};for(let i=0;i<hz;i++)cameraElevation(state,.2,1/hz);samples.push(state.y);assert(state.y>0&&state.y<=.2);}assert(Math.max(...samples)-Math.min(...samples)<1e-10);
const noise={y:0,velocity:0};let raw=0,filtered=0;for(let i=0;i<600;i++){const target=.012*Math.sin(i*2.1);const y=cameraElevation(noise,target,1/60);raw+=target*target;filtered+=y*y;}assert(filtered<raw*.05,'seam chatter is attenuated');
assert.equal(cameraElevation(noise,8,0,true),8);assert.equal(noise.velocity,0);
for(const phase of ['riding','coasting']){const sim={phase,time:10,rider:{rideLanding:{time:10,speed:4}}};assert.equal(landingCameraDip(sim),0);sim.time=10.075;assert(Math.abs(landingCameraDip(sim)-.072)<1e-8);sim.time=10.42;assert.equal(landingCameraDip(sim),0);assert.equal(landingCameraDip(sim,true),0);}
assert.equal(deckCarveBank({vx:0,vz:0,lean:.6}),0);assert(deckCarveBank({vx:5,vz:0,lean:.5})>0);assert(Math.abs(deckCarveBank({vx:9,vz:0,lean:-9}))<.09);
// The rigid deck banks while independent wheel support stays on a sloped plane.
let worst=0;for(const slope of [0,.12,-.12])for(const lean of [-.6,0,.6]){
 const board=new T.Group();const deck=new T.Mesh(new T.BoxGeometry(.23,.025,.85));deck.position.y=.08;board.add(deck);
 for(const x of [-.10,.10])for(const z of [-.28,.28]){const wheel=new T.Mesh(new T.BoxGeometry(.035,.06,.06));wheel.position.set(x,.03,z);wheel.userData.boardWheel=true;board.add(wheel);}
 const floor=(x,z)=>x*slope+z*.04,contact=new BoardContact(board,{height:floor});contact.surface=floor;contact.update({phase:'coasting',rider:{height:0,vx:5,vz:0,lean}});board.updateMatrixWorld(true);
 for(const part of contact.parts.filter(p=>p.wheel)){const p=part.mesh.geometry.attributes.position;let min=Infinity;for(let i=0;i<p.count;i++){const v=new T.Vector3().fromBufferAttribute(p,i).applyMatrix4(part.mesh.matrixWorld);min=Math.min(min,v.y-floor(v.x,v.z));}worst=Math.max(worst,Math.abs(min-.002));assert(Math.abs(min-.002)<.0002,'banked wheels remain supported');}
}
console.log({cameraStepAtOneSecond:samples[0],seamRmsRatio:Math.sqrt(filtered/raw),wheelContactError:worst});

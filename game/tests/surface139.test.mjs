import assert from 'node:assert/strict';
import * as T from '../source/vendor/three.module.js';
import {stepFlight,skateSlope} from '../source/skating139/surface.js';
import {BoardContact} from '../source/board-contact.js';
import {updateFreeView,angle} from '../source/freeride128/view-state.mjs';

const sim=surface=>({time:0,phase:'coasting',rider:{x:0,z:0,height:0,up:2.75,airY:null,vx:4,vz:0,heading:0},hazards:{skateHeight:surface},crash(reason){this.phase='crashed';this.reason=reason}});
// The same launch must have the same world-space arc over a flat floor and a dip.
const flat=sim(()=>1),dip=sim(x=>x>.1?.3:1);
for(let i=0;i<35;i++)for(const s of [flat,dip]){const old={...s.rider};s.time+=1/120;s.rider.x+=4/120;stepFlight(s,old,1/120);}
assert(Math.abs(flat.rider.airY-dip.rider.airY)<1e-10);assert(Math.abs(dip.rider.height-flat.rider.height-.7)<1e-10);
let flatLanding=null,dipLanding=null;for(let i=0;i<180;i++)for(const [s,key]of [[flat,'flat'],[dip,'dip']]){if(key==='flat'&&flatLanding||key==='dip'&&dipLanding)continue;const old={...s.rider};s.time+=1/120;s.rider.x+=4/120;const landed=stepFlight(s,old,1/120);if(landed){if(key==='flat')flatLanding=s.time;else dipLanding=s.time;}}
assert(dipLanding>flatLanding+.15,'lower run-out extends flight, without bending the arc');
const incline=sim(x=>x*.2);const slope=skateSlope(incline,1,0);assert(Math.abs(slope.x-.2/1.04)<1e-10);assert.equal(slope.z,0);
// Touch down on the elevated surface at its actual height.
const raised=sim(x=>x>.3?.25:0);raised.rider.airY=.8;raised.rider.height=.8;raised.rider.up=-1;let landed=false;
for(let i=0;i<120&&!landed;i++){const old={...raised.rider};raised.rider.x+=4/120;landed=!!stepFlight(raised,old,1/120);}assert(landed);assert.equal(raised.rider.groundY,.25);assert.equal(raised.rider.height,0);assert.equal(raised.rider.airY,null);
// Rolling off a raised edge drops naturally; approaching its exposed high side bails.
const drop=sim(x=>x<0?.20:0);Object.assign(drop.rider,{x:.01,up:0});stepFlight(drop,{x:-.01,z:0},1/120);assert.equal(drop.rider.airY,.2);assert.equal(drop.rider.up,0);assert.equal(drop.rider.airSource,'surface');
const edge=sim(x=>x<0?0:.25);Object.assign(edge.rider,{x:.01,up:0});stepFlight(edge,{x:-.01,z:0},1/120);assert.equal(edge.phase,'crashed');
// Rendered airborne support must use world-space flight, not add terrain height twice.
for(const terrain of [-.4,0,.8]){const board=new T.Group();board.add(new T.Mesh(new T.BoxGeometry(.2,.1,.8)));const contact=new BoardContact(board,{height:()=>terrain});contact.surface=()=>terrain;contact.update({phase:'coasting',rider:{height:1.2-terrain,airY:1.2}});assert(Math.abs(board.position.y-1.252)<.00001);}
// Free camera follows the shortest angular path across +/- PI and settles at rest.
const camera={time:0,blend:1,heading:Math.PI-.01},ride={time:1,phase:'coasting',rider:{holding:false,vx:-4,vz:-.1,heading:-Math.PI+.01}};
const old=camera.heading;updateFreeView(camera,ride,1/60);assert(Math.abs(angle(camera.heading-old))<.04);assert(camera.lookAhead>=1.8&&camera.lookAhead<=4.8);
console.log('PASS world-space flight across terrain, elevated landings, natural edge drops, exposed-edge collision, airborne mesh support and free-camera wrap.');

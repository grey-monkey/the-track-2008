import {sweepBox,boardContactSize} from './hazards.js';
// Metres, car-local X forward / Z across. W124: 4.74 m body,
// 2.8 m wheelbase, 1.496 m track. The low board can occupy tire lanes,
// but the central chassis stays solid. Humans collide with both.
export const CAR_SHAPES=Object.freeze({
 body:{x:0,z:0,hx:2.37,hz:.86},
 chassis:{x:0,z:0,hx:2.28,hz:.51},
 wheels:[-1.4,1.4].flatMap(x=>[-.748,.748].map(z=>({x,z,hx:.31,hz:.14})))
});
const local=(p,c)=>{const x=p.x-c.x,z=p.z-c.z,co=Math.cos(c.heading),si=Math.sin(c.heading);return{x:x*co+z*si,z:-x*si+z*co};};
const world=(p,c)=>({x:c.x+p.x*Math.cos(c.heading)-p.z*Math.sin(c.heading),z:c.z+p.x*Math.sin(c.heading)+p.z*Math.cos(c.heading)});
export function carCollision(sim,body,old,previousCar,isBoard,dt){
 const c=sim.car,a=local(old,previousCar),b=local(body,c),radius=isBoard?.105:.27;
 if(Math.min(a.x,b.x)>3.5||Math.max(a.x,b.x)<-3.5||Math.min(a.z,b.z)>2||Math.max(a.z,b.z)<-2)return false;
 const deck=boardContactSize[sim.options.board],span=isBoard?deck.length*.38:sim.phase==='crashed'?.48:0;
 const offset=body.heading-c.heading,oldOffset=(old.heading??body.heading)-previousCar.heading;
 const shapes=isBoard?[CAR_SHAPES.chassis]:[CAR_SHAPES.body,...CAR_SHAPES.wheels];
 // High airborne boards also strike the outer panels; low boards clear the tires.
 if(isBoard){const t=sim.phase==='crashed'?(sim.phaseTime??0):0,u=Math.max(0,Math.min(1,(t-2.4)/1.8)),settle=u*u*(3-2*u),roll=7.5*(1-Math.exp(-t/1.25))*(1-settle)+Math.PI*2*settle,pitch=Math.sin(t*5)*.38*Math.exp(-t*1.25)*(1-settle);const top=(body.height??0)+.15+Math.abs(Math.sin(roll))*.23+Math.abs(Math.sin(pitch))*deck.length*.5;if(top>.30)shapes.push(CAR_SHAPES.body);}
 let hit=null;
 for(const d of [-span,0,span])for(const shape of shapes){const start={x:a.x+Math.cos(oldOffset)*d,z:a.z+Math.sin(oldOffset)*d},end={x:b.x+Math.cos(offset)*d,z:b.z+Math.sin(offset)*d};const h=sweepBox(start,end,{...shape,yaw:0},radius);if(h&&(!hit||h.t<hit.t||h.t===hit.t&&h.depth>hit.depth))hit=h;}
 if(!hit)return false;
 const co=Math.cos(c.heading),si=Math.sin(c.heading),nx=hit.nx*co-hit.nz*si,nz=hit.nx*si+hit.nz*co;
 const resolved=world({x:a.x+(b.x-a.x)*hit.t+hit.nx*(hit.depth+.012),z:a.z+(b.z-a.z)*hit.t+hit.nz*(hit.depth+.012)},c);
 body.x=resolved.x;body.z=resolved.z;
 const yaw=Math.atan2(Math.sin(c.heading-previousCar.heading),Math.cos(c.heading-previousCar.heading))/dt;
 const cvx=(c.x-previousCar.x)/dt-yaw*(body.z-c.z),cvz=(c.z-previousCar.z)/dt+yaw*(body.x-c.x);
 const incoming=(body.vx-cvx)*nx+(body.vz-cvz)*nz;
 // Audio notification only: existing collision response below is unchanged.
 const audioKey=isBoard?'board':'body';sim.carAudioContacts??={};
 if(incoming<-.35&&sim.time-(sim.carAudioContacts[audioKey]??-Infinity)>.25){sim.carAudioContacts[audioKey]=sim.time;sim.hazards?.event(sim,'CAR_IMPACT',Math.min(1.5,Math.max(.3,-incoming/5)),{part:audioKey});}
 if(incoming<0){const restitution=isBoard?.28:.18;body.vx-=(1+restitution)*incoming*nx;body.vz-=(1+restitution)*incoming*nz;body.impactFlex=Math.min(1,-incoming/5);body.impactTurn=Math.max(-1.2,Math.min(1.2,(body.impactTurn??0)+(nx*Math.sin(body.heading)-nz*Math.cos(body.heading))*(-incoming)*.05));}
 if(!isBoard&&sim.phase!=='crashed'&&sim.phase!=='ended'){sim.crash('CAR',Math.max(0,-incoming));if(sim.phase==='crashed'){body.fallLift=Math.max(.01,body.height??0);body.fallUp=Math.min(1,Math.max(0,-incoming)*.10);}}
 if(isBoard&&body.pinned&&incoming<-.1){body.pinned=false;delete body.catchId;}
 return true;
}


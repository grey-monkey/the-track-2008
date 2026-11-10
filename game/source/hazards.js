import {secondHandProtected} from './second-hand-rules167.mjs';
import {rampHeight} from './road-details.js';
import {fallMotion} from './motion131/fall-motion.mjs';
import {BOARD_FEEL} from './board-personalities.js';
// Fixed-step, swept contacts. Layout is supplied by the rendered environment.
// No asset geometry or renderer dependency in the simulation.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// Wheel-center bounds measured from the approved, adapted meshes (local X/Z).
export const boardContactSize={LONGBOARD:{length:1.05,wheels:[[-.13503,-.41115],[-.13503,.41115],[.13503,-.41115],[.13503,.41115]]},HANDMEDOWN:{length:.98,wheels:[[-.08854,-.35328],[-.08854,.25767],[.08777,-.35328],[.08777,.25767]]},CRUISER:{length:.80,wheels:[[-.07109,-.22890],[-.07152,.21061],[.07108,-.22891],[.07066,.21060]]},STREET:{length:.79,wheels:[[-.05389,-.21487],[-.05389,.21487],[.05454,-.21487],[.05454,.21487]]}};
export function fallAngles(sim){return fallMotion(sim);}
export function sweepCircle(a,b,c,r){
 const x=a.x-c.x,z=a.z-c.z,dx=b.x-a.x,dz=b.z-a.z,R=r+(c.radius??0),cc=x*x+z*z-R*R;
 if(cc<=0){const l=Math.hypot(x,z)||1;return{t:0,nx:x/l||1,nz:z/l,depth:R-Math.hypot(x,z)};}
 const aa=dx*dx+dz*dz,bb=x*dx+z*dz,disc=bb*bb-aa*cc;if(aa<1e-12||disc<0)return null;
 const t=(-bb-Math.sqrt(disc))/aa;if(t<0||t>1)return null;
 return{t,nx:(x+dx*t)/R,nz:(z+dz*t)/R,depth:0};
}
export function sweepBox(a,b,c,r=0){
 const co=Math.cos(c.yaw??0),si=Math.sin(c.yaw??0),local=p=>({x:(p.x-c.x)*co+(p.z-c.z)*si,z:-(p.x-c.x)*si+(p.z-c.z)*co});
 const p=local(a),q=local(b),dx=q.x-p.x,dz=q.z-p.z,hx=c.hx+r,hz=c.hz+r;
 let t0=0,t1=1,nx=0,nz=0,depth=0;
 if(Math.abs(p.x)<=hx&&Math.abs(p.z)<=hz){const xx=hx-Math.abs(p.x),zz=hz-Math.abs(p.z);if(xx<zz){nx=Math.sign(p.x)||1;depth=xx;}else{nz=Math.sign(p.z)||1;depth=zz;}}
 else for(const [v,d,h,axis] of [[p.x,dx,hx,0],[p.z,dz,hz,1]]){if(Math.abs(d)<1e-12){if(Math.abs(v)>h)return null;continue;}let near=(-h-v)/d,far=(h-v)/d,n=-1;if(near>far){[near,far]=[far,near];n=1;}if(near>t0){t0=near;nx=axis===0?n:0;nz=axis===1?n:0;}t1=Math.min(t1,far);if(t0>t1)return null;}
 if(t0<0||t0>1)return null;return{t:t0,nx:nx*co-nz*si,nz:nx*si+nz*co,depth};
}
export class HazardWorld{
 constructor(layout,{surface=()=>0,curb=()=>undefined}={}){this.layout=layout;this.surface=surface;this.curb=curb;this.cells=new Map();
  for(const [type,items]of Object.entries(layout))for(const [i,o]of items.entries()){o.type=type;o.id=type+i;const d=o.radius??Math.hypot(o.hx,o.hz);for(let x=Math.floor((o.x-d)/8);x<=Math.floor((o.x+d)/8);x++)for(let z=Math.floor((o.z-d)/8);z<=Math.floor((o.z+d)/8);z++){const key=x+','+z,a=this.cells.get(key)??[];a.push(o);this.cells.set(key,a);}}
 }
 nearby(a,b,pad=1.2){const out=new Set();for(let x=Math.floor((Math.min(a.x,b.x)-pad)/8);x<=Math.floor((Math.max(a.x,b.x)+pad)/8);x++)for(let z=Math.floor((Math.min(a.z,b.z)-pad)/8);z<=Math.floor((Math.max(a.z,b.z)+pad)/8);z++)for(const o of this.cells.get(x+','+z)??[])out.add(o);return [...out];}
 attach(sim){sim.hazards=this;sim.hazardEvents=[];sim.hazardSerial=0;sim.hazardCooldown=new Map();sim.rider.bump=0;sim.rider.bumpVelocity=0;sim.rider.bumpRoll=0;sim.rider.bumpPitch=0;return sim;}
 event(sim,kind,strength=1,detail={}){sim.hazardEvents.push({serial:++sim.hazardSerial,time:sim.time,kind,strength,...detail});if(sim.hazardEvents.length>24)sim.hazardEvents.shift();}
 tick(sim,dt){const r=sim.rider;r.bumpVelocity+=(-r.bump*240-r.bumpVelocity*18)*dt;r.bump+=r.bumpVelocity*dt;r.bumpRoll*=Math.exp(-dt*12);r.bumpPitch*=Math.exp(-dt*12);if(sim.phase==='crashed'){r.impactFlex=Math.max(0,(r.impactFlex??0)-dt*2.5);}}
 bump(sim,kind,speed,side,front,id){const r=sim.rider;if((sim.hazardCooldown.get(id)??-1)>sim.time)return;sim.hazardCooldown.set(id,sim.time+.16);
  const metal=kind==='MANHOLE',force=clamp(speed/7,.12,1.8)*BOARD_FEEL[sim.options.board].bump,kick=(metal?.115:.025)*force;
  r.bumpVelocity=Math.min(1.1,r.bumpVelocity+(metal?.30:.105)*force);r.bumpRoll+=side*(metal?.032:.010)*force;r.bumpPitch+=front*(metal?.025:.009)*force;
  // A struck wheel yaws the board away from the contact and disturbs momentum.
  const direction=side||1;r.heading+=direction*kick;r.vx+=-Math.sin(r.heading)*direction*kick*.65;r.vz+=Math.cos(r.heading)*direction*kick*.65;r.wobble=clamp(r.wobble+(metal?.11:.018)*force,0,1.3);
  this.event(sim,kind,force,{id});
 }
 wheels(p,key){const b=boardContactSize[key]??boardContactSize.LONGBOARD,co=Math.cos(p.heading),si=Math.sin(p.heading);return b.wheels.map(([x,z])=>({x:p.x-co*z-si*x,z:p.z-si*z+co*x,side:Math.sign(x),front:-Math.sign(z)}));}
 riding(sim,old,dt){const r=sim.rider,now={x:r.x,z:r.z,heading:r.heading},speed=Math.hypot(r.vx,r.vz),wa=this.wheels(old,sim.options.board),wb=this.wheels(now,sim.options.board),near=this.nearby(old,now);
  if(r.height<.035){
   // Earliest wheel contact wins. The entire grate is a catch area by design.
   let catchHit=null;
   for(const o of near)if(o.type==='drains')for(let i=0;i<4;i++){const hit=sweepBox(wa[i],wb[i],o,.015);if(hit&&(!catchHit||hit.t<catchHit.t))catchHit={...hit,o};}
   if(catchHit&&!secondHandProtected(sim)){const hit=catchHit,x=old.x+(r.x-old.x)*hit.t,z=old.z+(r.z-old.z)*hit.t;sim.crash('GRATE');sim.board.x=x;sim.board.z=z;sim.board.vx=sim.board.vz=0;sim.board.pinned=true;sim.board.catchId=hit.o.id;sim.board.pinYaw=sim.board.heading;sim.rider.fallLift=Math.max(.02,r.height);sim.rider.fallUp=clamp(speed*.18,.15,1.8);sim.rider.throwForward=true;this.event(sim,'GRATE',clamp(speed/7,.2,2));return;}
   for(let i=0;i<4;i++){
    const a=wa[i],b=wb[i];
    for(const o of near)if(o.type==='covers'){
     const before=Math.hypot(a.x-o.x,a.z-o.z)<o.radius,after=Math.hypot(b.x-o.x,b.z-o.z)<o.radius;
     if(before!==after||(!before&&sweepCircle(a,b,o,0)))this.bump(sim,'MANHOLE',speed,a.side,a.front,o.id+'-'+i+(after?'in':'out'));
    }
    const ca=this.curb(a.x,a.z),cb=this.curb(b.x,b.z);
    if((ca===undefined)!==(cb===undefined))this.bump(sim,'SEAM',speed,a.side,a.front,'seam-'+i);
   }
  }
  const rolling={x:r.x,z:r.z,heading:r.heading,vx:r.vx,vz:r.vz,height:r.height};
  const boardHit=this.solids(sim,rolling,old,true,false,dt);
  if(boardHit){sim.crash(boardHit.o.kind);if(sim.phase==='crashed'){Object.assign(sim.board,{x:rolling.x,z:rolling.z,vx:rolling.vx,vz:rolling.vz,heading:rolling.heading});r.fallLift=Math.max(.01,r.height);r.fallUp=clamp(speed*.12,.1,1.3);r.throwForward=true;return;}for(const key of ['x','z','vx','vz','heading'])r[key]=rolling[key];}
  this.solids(sim,r,old,false,false,dt);
 }
 solids(sim,body,old,isBoard,crashed,dt){if(isBoard&&body.pinned)return;const near=this.nearby(old,body,1.6).filter(o=>o.type==='solids'&&(crashed||sim.options.rider==='BOSS'||!o.rideOverBoards?.includes(sim.options.board)));if(!near.length)return;
  const ground=this.surface(body.x,body.z),lift=isBoard?(body.height??0):crashed?(body.fallLift??0):body.height;
  // Several contact volumes cover the deck or the extended tumbling body.
  const b=boardContactSize[sim.options.board]??boardContactSize.LONGBOARD,heading=body.heading,co=Math.cos(heading),si=Math.sin(heading);
  const probes=isBoard?[-b.length*.40,0,b.length*.40].map(d=>({dx:co*d,dz:si*d,r:.12,lo:ground+lift+.015,hi:ground+lift+.20})):
   crashed?this.bodyProbes(sim,ground,lift):
   [{dx:0,dz:0,r:.25,lo:ground+lift+.1,hi:ground+lift+1.75}];
  // Plywood is the exposed riding surface. Its support-block volumes end
  // beneath that skin; they remain solid from the sides and during falls.
  let first=null;
  for(const o of near)for(const p of probes){const a={x:old.x+p.dx,z:old.z+p.dz},end={x:body.x+p.dx,z:body.z+p.dz};const hit=o.radius?sweepCircle(a,end,o,p.r):sweepBox(a,end,o,p.r);if(!hit)continue;const cx=old.x+(body.x-old.x)*hit.t,cz=old.z+(body.z-old.z)*hit.t;const supported=!crashed&&o.rampSupport&&this.skateHeight&&rampHeight(cx+p.dx,cz+p.dz)!=null;const contactGround=supported?this.skateHeight(cx+p.dx,cz+p.dz):this.surface(cx,cz),dy=contactGround-ground;const top=supported?Math.min(o.top,contactGround-.013):o.top;if(p.hi+dy<o.bottom||p.lo+dy>top)continue;if(!first||hit.t<first.t)first={...hit,o};}
  if(!first)return;const h=first,dx=body.x-old.x,dz=body.z-old.z,normalVelocity=body.vx*h.nx+body.vz*h.nz;
  body.x=old.x+dx*h.t+h.nx*(h.depth+.008);body.z=old.z+dz*h.t+h.nz*(h.depth+.008);
  if(normalVelocity>=0)return;
  const impact=-normalVelocity,restitution=isBoard?.28:.12;
  body.vx-=(1+restitution)*normalVelocity*h.nx;body.vz-=(1+restitution)*normalVelocity*h.nz;
  const tangent=body.vx*(-h.nz)+body.vz*h.nx;body.vx+=h.nz*tangent*.20;body.vz-=h.nx*tangent*.20;
  if(!crashed&&!isBoard){const vx=body.vx,vz=body.vz;sim.crash(h.o.kind,impact);if(sim.phase==='crashed'){sim.board.vx=vx*.7;sim.board.vz=vz*.7;body.fallUp=Math.min(1,impact*.12);body.fallLift=.01;}}
  body.impactFlex=Math.min(1,impact/5);body.impactTurn=clamp((body.impactTurn??0)+(h.nx*si-h.nz*co)*impact*.10,-1.2,1.2);body.heading+=clamp((h.nx*si-h.nz*co)*impact*.045,-.35,.35);
  const id=h.o.id+(isBoard?'board':'body');if((sim.hazardCooldown.get(id)??-1)<sim.time){this.event(sim,isBoard?'BOARD_IMPACT':'BODY_IMPACT',clamp(impact/6,.1,2),{obstacle:h.o.kind});sim.hazardCooldown.set(id,sim.time+.18);}return h;
 }
 bodyProbes(sim,ground,lift){const a=fallAngles(sim),cy=Math.cos(a.yaw),sy=Math.sin(a.yaw),cr=Math.cos(a.roll),sr=Math.sin(a.roll),cp=Math.cos(a.pitch),sp=Math.sin(a.pitch);
  const probes=[[-.60,.22],[-.24,.28],[.16,.30],[.62,.20]].map(([d,r])=>{const x=-sr*d,y=cr*d*cp,z=cr*d*sp;return{dx:cy*x+sy*z,dz:-sy*x+cy*z,y,r};}),bottom=Math.min(...probes.map(p=>p.y-p.r));
  return probes.map(p=>({...p,lo:ground+lift+p.y-bottom-p.r,hi:ground+lift+p.y-bottom+p.r}));
 }
 crashed(sim,oldR,oldB,dt){this.solids(sim,sim.rider,oldR,false,true,dt);this.solids(sim,sim.board,oldB,true,true,dt);const b=sim.board;
  if(!b.pinned)for(const o of this.nearby(oldB,b))if(o.type==='drains'){const hit=sweepBox(oldB,b,o,.08);if(hit){b.x=oldB.x+(b.x-oldB.x)*hit.t;b.z=oldB.z+(b.z-oldB.z)*hit.t;b.vx=b.vz=0;b.pinned=true;b.catchId=o.id;this.event(sim,'GRATE',.5);break;}}
 }
}

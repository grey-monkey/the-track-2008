import {canTrick} from '../trick-rules.js';

// THPS4's inspected Grind/OffRail scripts establish entry -> balance range ->
// airborne exit, distinct grind/slide scoring, and an extreme-balance bail.
// Capture geometry and these SI-unit dynamics are Track adaptations: the native
// rail detector and Wobble update law have not been recovered.
const G=9.81, CAPTURE=.30, MIN_SPEED=.8, COOLDOWN=.55;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const floor=(sim,x,z)=>{const y=sim.hazards?.skateHeight?.(x,z);return Number.isFinite(y)?y:0;};
const railFor=(sim,id)=>sim.hazards?.grindRails?.find(r=>r.id===id);

function segment(a,b){
 const dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),span=b.s-a.s;
 if(!(len>1e-6&&span>1e-6))return null;
 return {a,b,len,span,tx:dx/len,tz:dz/len};
}
function point(seg,t){return {x:seg.a.x+(seg.b.x-seg.a.x)*t,y:seg.a.y+(seg.b.y-seg.a.y)*t,z:seg.a.z+(seg.b.z-seg.a.z)*t,tx:seg.tx,tz:seg.tz,s:seg.a.s+seg.span*t};}
function sample(rail,s){
 for(let i=1;i<rail.points.length;i++){
  const seg=segment(rail.points[i-1],rail.points[i]);if(!seg)continue;
  if(s<=seg.b.s||i===rail.points.length-1)return point(seg,clamp((s-seg.a.s)/seg.span,0,1));
 }
 return null;
}
function support(sim,p){
 const r=sim.rider;r.x=p.x;r.z=p.z;r.groundY=floor(sim,p.x,p.z);
 r.airY=p.y;r.height=Math.max(0,p.y-r.groundY);r.up=0;r.dirt=false;
}

/** Call after horizontal integration and before stepFlight/collision landing.
 * old is the pre-step rider snapshot (x,z,airY,height,up); dt is seconds.
 * Only the current horizontal position can snap, within the authored capture radius (30 cm on curbs, 42 cm on the lumber ledge). */
export function tryGrind(sim,old={},input={},dt=1/120){
 const r=sim.rider;
 if(r.grind||sim.phase!=='coasting'||r.holding||!input.grind||!canTrick(sim.options.rider,sim.options.board,'grind')||r.ollieMustBail||sim.time<(r.grindCooldownUntil??0))return false;
 if(!(dt>0&&Number.isFinite(dt))||!Number.isFinite(r.up)||r.up>0)return false;
 const ground=floor(sim,r.x,r.z),y=Number.isFinite(r.airY)?r.airY:floor(sim,old.x??r.x,old.z??r.z)+Math.max(0,r.height||0);
 // A finite airY can survive a state change. Actual clearance is required;
 // simply rolling beside or over the curb never creates an automatic grind.
 if(!(r.height>.012||old.height>.012||y-ground>.012))return false;
 const speed=Math.hypot(r.vx,r.vz);if(!(speed>=MIN_SPEED))return false;
 const previous=Number.isFinite(old.airY)?old.airY:y;
 const nextY=y+(r.up-G*dt)*dt;let best=null;
 for(const rail of sim.hazards?.grindRails??[]){
  if(!Number.isFinite(rail.length)||rail.length<=0)continue;
  for(let i=1;i<rail.points.length;i++){
   const seg=segment(rail.points[i-1],rail.points[i]);if(!seg)continue;
   const t=clamp(((r.x-seg.a.x)*seg.tx+(r.z-seg.a.z)*seg.tz)/seg.len,0,1),p=point(seg,t);
   const dx=r.x-p.x,dz=r.z-p.z,distance=Math.hypot(dx,dz);if(distance>(rail.entryAssist?.radius??CAPTURE))continue;
   const along=r.vx*p.tx+r.vz*p.tz,direction=Math.sign(along);
   if(Math.abs(along)/speed<Math.cos((rail.entryAssist?.angle??35)*Math.PI/180))continue;
   // Cross the support height from above, or arrive within a small tolerance.
   // Do not capture while passing underneath, or falling from far above it.
   const crossed=Math.max(previous,y)>=p.y-.025&&nextY<=p.y+.025;
   const close=Math.abs(y-p.y)<=.065&&previous>=p.y-.025;
   if(!(crossed||close)||y<p.y-.065||Math.abs(y-p.y)>.30)continue;
   if(best&&best.distance<=distance)continue;
   best={rail,p,direction,distance,along,offset:(-p.tz*dx+p.tx*dz)*direction};
  }
 }
 if(!best)return false;
 const {rail,p,direction,along,offset}=best;
 const side=Math.sign(offset)||Math.sign(rail.streetSide||1)*direction;
 const kind=input.boardslide?'boardslide':'fiftyfifty';
 r.grind={railId:rail.id,s:p.s,railY:p.y,direction,speed:Math.abs(along),balance:clamp(offset/(rail.entryAssist?.radius??CAPTURE)*(rail.entryAssist ? .06 : .12),-.12,.12),started:sim.time,kind,side,distance:0,balanceRate:0};
 support(sim,p);r.vx=p.tx*along;r.vz=p.tz*along;r.heading=Math.atan2(r.vz,r.vx);
 r.manual=false;r.pushStart=null;r.pushActive=false;r.trick=null;r.bufferedTrick=null;r.rideLanding=null;r.airSource='grind';r.tension=0;
 sim.addTrick(kind);if(sim.combo)sim.combo.landedAt=null;
 return true;
}

/** Returns true whenever this tick began on a rail, including exits/bails.
 * Balance is rider-relative: positive steer moves balance positive, so steer
 * against the visible lean. Reversing travel mirrors entry offset and bias. */
export function stepGrind(sim,input={},dt=1/120){
 const r=sim.rider,g=r.grind;if(!g)return false;
 if(sim.phase!=='coasting'||r.holding||!canTrick(sim.options.rider,sim.options.board,'grind')){r.grind=null;return false;}
 const rail=railFor(sim,g.railId);if(!rail){exitGrind(sim);return true;}
 if(!(dt>0&&Number.isFinite(dt)))return true;
 const before=sample(rail,g.s);if(!before){exitGrind(sim);return true;}
 if(!input.grind&&sim.time-g.started>=.15){exitGrind(sim);return true;}
 if(g.speed<MIN_SPEED){exitGrind(sim);return true;}
 const next=clamp(g.s+g.direction*g.speed*dt,0,rail.length),p=sample(rail,next);
 if(!p){exitGrind(sim);return true;}
 const distance=Math.abs(next-g.s),dy=p.y-before.y;
 // Tangential momentum loses energy to friction, gains it only from descent.
 g.speed=Math.max(0,Math.sqrt(Math.max(0,g.speed*g.speed-2*G*dy))-(g.kind==='boardslide'?.44:.30)*dt);
 g.s=next;g.railY=p.y;g.distance+=distance;
 const steer=clamp(Number.isFinite(input.steer)?input.steer:0,-1,1),age=Math.max(0,sim.time-g.started);
 const settle=rail.entryAssist?clamp(age/.35,0,1):1;
 const drift=g.side*(.16+Math.min(.16,age*.018))*(.35+.65*settle);
 g.balanceRate=drift+g.balance*.40+steer*1.12;
 g.balance+=g.balanceRate*dt;
 support(sim,p);r.vx=p.tx*g.direction*g.speed;r.vz=p.tz*g.direction*g.speed;r.heading=Math.atan2(r.vz,r.vx);r.steer=steer;r.lean=clamp(g.balance,-1,1)*.43;
 if(sim.combo){sim.combo.base+=distance*(g.kind==='boardslide'?24:18);sim.combo.landedAt=null;}
 if(Math.abs(g.balance)>=1){
  r.grind=null;r.grindCooldownUntil=sim.time+COOLDOWN;sim.crash('GRIND',g.speed);return true;
 }
 if(next<=0||next>=rail.length||g.speed<MIN_SPEED)exitGrind(sim);
 return true;
}

/** Release to world-space flight. side is an optional rail-normal direction;
 * zero chooses the authored street side. Horizontal speed is conserved,
 * dividing it into tangential carry and a bounded lateral exit component.
 * Pop supplies a modest vertical impulse; banking belongs to normal landing. */
export function exitGrind(sim,{pop=false,side=0}={}){
 const r=sim.rider,g=r.grind;if(!g)return false;
 const rail=railFor(sim,g.railId),p=rail&&sample(rail,g.s);
 const tx=p?.tx??Math.cos(r.heading)*g.direction,tz=p?.tz??Math.sin(r.heading)*g.direction;
 const outSide=Math.sign(side)||Math.sign(rail?.streetSide||1),speed=Math.max(0,g.speed);
 const lateral=Math.min(pop?1.35:1.15,speed*.28),along=Math.sqrt(Math.max(0,speed*speed-lateral*lateral));
 // The lumber edge gets a small step-out and release hop to clear its supports.
 const clearance=rail?.entryAssist ? .12 : .06;
 r.x+=(-tz)*outSide*clearance;r.z+=tx*outSide*clearance;
 r.vx=tx*g.direction*along-tz*outSide*lateral;r.vz=tz*g.direction*along+tx*outSide*lateral;
 const worldY=p?.y??(Number.isFinite(r.airY)?r.airY:floor(sim,r.x,r.z)+Math.max(0,r.height||0));
 r.groundY=floor(sim,r.x,r.z);r.airY=worldY+.012;r.height=Math.max(.012,r.airY-r.groundY);r.up=pop?2.35:(rail?.entryAssist ? .65 : 0);
 r.heading=Math.atan2(r.vz,r.vx);r.grind=null;r.grindCooldownUntil=sim.time+COOLDOWN;
 r.grindExit={kind:g.kind,time:sim.time,side:g.side,direction:g.direction,pop:!!pop};
 r.airStarted=sim.time;r.airSource='grind';r.lean=0;r.manual=false;r.trick=null;r.bufferedTrick=null;
 if(sim.combo)sim.combo.landedAt=null;
 return true;
}

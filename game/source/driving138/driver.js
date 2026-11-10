import {LENGTH,clamp,bulb} from '../world.js';
import {carPath} from '../road-details.js';

// Six authored lines. Seed shuffles their order; geometry never jitters per frame.
export const DRIVING_LINES=Object.freeze([
 {name:'Easy sweep',offset:-.32,wave:.13,phase:0,cruise:.96,corner:.96,throttle:.65,exit:3},
 {name:'Early roll-on',offset:.20,wave:.21,phase:1,cruise:1.02,corner:1.02,throttle:.80,exit:-2},
 {name:'Wide and patient',offset:-.36,wave:.10,phase:2,cruise:.98,corner:.98,throttle:.69,exit:5},
 {name:'Tidy line',offset:.04,wave:.15,phase:3,cruise:1,corner:1,throttle:.74,exit:0},
 {name:'Inside sweep',offset:.44,wave:.12,phase:4,cruise:.97,corner:.97,throttle:.72,exit:2},
 {name:'Brisk exit',offset:-.12,wave:.27,phase:5,cruise:1.04,corner:1.03,throttle:.86,exit:-1}
]);
// The driver gets on the gas like a teenager with friends on a rope, not a chauffeur.
export const PEDAL=Object.freeze({gas:2.3,slew:2.4,bulbCarry:1.0});
const N=Math.ceil(LENGTH/.5),DS=LENGTH/N,wrap=s=>(s%LENGTH+LENGTH)%LENGTH;
const smooth=t=>{t=clamp(t,0,1);return t*t*t*(10+t*(-15+6*t));};
// Gaussian convolution removes tangent discontinuities at the old Bezier joins.
// The original road, cul-de-sac loop, gate and divot avoidance remain the reference.
function smoothPoint(s){let x=0,z=0,total=0;for(let d=-12;d<=12;d+=.5){const w=Math.exp(-.5*(d/3.5)**2),p=carPath(wrap(s+d));x+=p.x*w;z+=p.z*w;total+=w;}return{x:x/total,z:z/total};}
const reference=Array.from({length:N},(_,i)=>smoothPoint(i*DS));
const displacement=reference.map(p=>{const dx=p.x-bulb.x,dz=p.z-bulb.z,r=Math.hypot(dx,dz),extra=r<13&&r>1?2.4*(1-smooth((r-5)/8)):0;return{x:dx/Math.max(1,r)*extra,z:dz/Math.max(1,r)*extra};});
// Smooth the avoidance displacement along travelled distance, so entering the
// island clearance line never adds a sudden steering flick.
const base=reference.map((p,i)=>{let x=0,z=0,total=0;for(let j=-36;j<=36;j++){const w=Math.exp(-.5*(j*DS/6)**2),d=displacement[(i+j+N)%N];x+=d.x*w;z+=d.z*w;total+=w;}return{x:p.x+x/total,z:p.z+z/total};});

const point=(a,i)=>a[(i%N+N)%N];
const paths=DRIVING_LINES.map(profile=>base.map((p,i)=>{
 const before=point(base,i-1),after=point(base,i+1),h=Math.atan2(after.z-before.z,after.x-before.x),s=i*DS;
 // All lines meet with zero lateral velocity and acceleration at the lap seam.
 const seam=smooth(Math.min(s,LENGTH-s)/28),offset=seam*(profile.offset+profile.wave*Math.sin(s/LENGTH*Math.PI*6+profile.phase));
 return{x:p.x-Math.sin(h)*offset,z:p.z+Math.cos(h)*offset};
}));
function curve(points,s){
 const f=wrap(s)/DS,i=Math.floor(f),t=f-i,p0=point(points,i-1),p1=point(points,i),p2=point(points,i+1),p3=point(points,i+2),out={};
 // Uniform cubic B-spline: continuous position, tangent AND curvature at every cell.
 for(const axis of ['x','z']){const a=(p0[axis]+4*p1[axis]+p2[axis])/6,b=(-p0[axis]+p2[axis])/2,c=(p0[axis]-2*p1[axis]+p2[axis])/2,d=(-p0[axis]+3*p1[axis]-3*p2[axis]+p3[axis])/6;out[axis]=a+t*(b+t*(c+t*d));out['d'+axis]=(b+t*(2*c+3*t*d))/DS;out['dd'+axis]=(2*c+6*t*d)/(DS*DS);}

 out.metric=Math.hypot(out.dx,out.dz);out.heading=Math.atan2(out.dz,out.dx);out.curvature=(out.dx*out.ddz-out.dz*out.ddx)/out.metric**3;return out;
}
export function lineSample(s,index=0){
 if(s>=0)return curve(paths[index],s);
 // Blend the one-time entrance into the shared lap seam, with continuous derivatives.
 const position=q=>{const p=carPath(q),b=curve(paths[index],q),t=smooth((q+24)/20);return{x:p.x+(b.x-p.x)*t,z:p.z+(b.z-p.z)*t};};
 const p=position(s),a=position(s-.05),b=position(s+.05),dx=(b.x-a.x)/.1,dz=(b.z-a.z)/.1,ddx=(b.x-2*p.x+a.x)/.0025,ddz=(b.z-2*p.z+a.z)/.0025,metric=Math.hypot(dx,dz);
 return{...p,heading:Math.atan2(dz,dx),metric,curvature:(dx*ddz-dz*ddx)/metric**3};
}
function shuffled(seed,cycle){let state=((seed|0)^Math.imul(cycle+1,0x9e3779b9))>>>0;const a=[0,1,2,3,4,5];for(let i=5;i>0;i--){state=(Math.imul(state,1664525)+1013904223)>>>0;const j=state%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export function lineForLap(seed,lap){lap=Math.max(0,lap);const cycle=Math.floor(lap/6),a=shuffled(seed,cycle);if(cycle){const previous=shuffled(seed,cycle-1);if(a[0]===previous[5])[a[0],a[1]]=[a[1],a[0]];}return a[lap%6];}
export class Driver {
 constructor(seed,sally,speedFactor,turnFactor,trail=0){this.seed=seed;this.sally=sally;this.speedFactor=speedFactor;this.turnFactor=turnFactor;this.trail=trail;this.plans=new Map();}
 index(s){return lineForLap(this.seed,Math.floor(s/LENGTH));}
 sample(s){return lineSample(s,this.index(s));}
 plan(index){if(this.plans.has(index))return this.plans.get(index);
  const profile=DRIVING_LINES[index],cruise=(this.sally?7.4:6.6)*this.speedFactor,corner=(this.sally?2.15:1.75)*this.turnFactor**2*profile.corner;
  const geometry=Array.from({length:N},(_,i)=>curve(paths[index],i*DS));
  // The cul-de-sac carries momentum: 15% higher tight-bend speed than Build146.
  // Keep curvature limits, continuous pedals and one progressive exit.
  const speeds=geometry.map((p,i)=>{const s=i*DS,seam=smooth(Math.min(s,LENGTH-s)/45);return Math.min(cruise*(1+(profile.cruise-1)*seam),Math.sqrt(corner*(1+PEDAL.bulbCarry*smooth((s-225)/30)*(1-smooth((s-410)/35)))/Math.max(.0001,Math.abs(p.curvature))));});
  // The driver holds a bend's speed until the skater on the rope has cleared it too,
  // instead of rolling on the moment the car itself straightens out.
  if(this.trail>0){const span=Math.ceil(this.trail/DS),copy=speeds.slice();for(let i=0;i<N;i++){let v=copy[i];for(let j=1;j<=span;j++)v=Math.min(v,copy[(i-j+N)%N]);speeds[i]=v;}}
  // Treat the entry, circle and diagonal exit as one maneuver. No throttle burst
  // between its bends and therefore no second brake tap in the circle or at exit.
  const first=Math.floor(275/DS),last=Math.ceil((395+profile.exit)/DS);let maneuver=Infinity;
  // Only roll on as the remaining bends open up. This allows a progressive exit,
  // without speeding up into a bend that would immediately demand the brakes.
  for(let i=last;i>=first;i--){maneuver=Math.min(maneuver,speeds[i]);speeds[i]=maneuver;}
  if(profile.exit>0){const copy=speeds.slice();for(let i=first;i<=last;i++)speeds[i]=copy[Math.max(first,i-Math.round(profile.exit/DS))];}
  // Distance-based braking and acceleration envelopes; anticipate the corner.
  // Two passes cover the periodic boundary, independent of render frame rate.
  for(let pass=0;pass<2;pass++){
   for(let j=N-1;j>=0;j--){const next=(j+1)%N,d=DS*(geometry[j].metric+geometry[next].metric)/2;speeds[j]=Math.min(speeds[j],Math.sqrt(speeds[next]**2+2*1.05*d));}
   for(let j=0;j<N;j++){const prev=(j+N-1)%N,d=DS*(geometry[j].metric+geometry[prev].metric)/2;speeds[j]=Math.min(speeds[j],Math.sqrt(speeds[prev]**2+2*profile.throttle*PEDAL.gas*.85*d));}
  }
  this.plans.set(index,speeds);return speeds;
 }
 target(s){const v=this.plan(this.index(s)),f=wrap(s)/DS,i=Math.floor(f);return v[i]+(v[(i+1)%N]-v[i])*(f-i);}
 advance(c,dt){const index=this.index(c.s),profile=DRIVING_LINES[index],p=this.sample(c.s);
  // Preview by reaction distance, then ease both pedal pressure and steering.
  const target=this.target(c.s+Math.max(1,c.speed*.65)),desired=clamp((target-c.speed)*1.4,-1.5,profile.throttle*PEDAL.gas);
  c.accel+=clamp(desired-c.accel,-PEDAL.slew*dt,PEDAL.slew*dt);c.speed=Math.max(0,c.speed+c.accel*dt);
  c.brake=c.brake?c.accel<-.08:c.accel<-.24;
  c.s+=c.speed*dt/Math.max(.5,p.metric);c.distance=(c.distance??0)+c.speed*dt;
  c.line=index;
 }
}

// Fixed-step observation only. These values never feed back into riding forces.
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export function observeRideDynamics(sim,dt,lat,traction){
 const r=sim.rider,c=sim.car,t=sim.time;
 const s=sim.rideAnimationState??=( {slide:0,armedGrip:false,peak:0,slackTime:0,armedTow:false,lastTow:-10} );
 const grounded=['riding','coasting'].includes(sim.phase)&&r.height<=.01&&r.up<=0&&!r.dirt;
 if(!grounded){s.slide=0;s.armedGrip=false;s.peak=0;s.slackTime=0;s.armedTow=false;r.motionSlide=0;r.gripCatchEvent=null;r.towCatchEvent=null;return;}
 const speed=Math.hypot(r.vx,r.vz),slip=Math.abs(lat);
 const saturation=9*slip/Math.max(.1,traction);
 const amount=clamp((slip-.28)/1.0)*clamp((saturation-.65)/.6)*clamp((speed-1)/3);
 const target=Math.sign(lat)*amount;
 s.slide+=(target-s.slide)*(1-Math.exp(-dt*(amount>.1?8:10)));
 r.motionSlide=s.slide;
 if(amount>.25){s.armedGrip=true;s.peak=Math.max(s.peak,amount);s.sign=Math.sign(lat);}
 if(s.armedGrip&&amount<.10&&slip<.40){
  r.gripCatchEvent={time:t,strength:clamp(.22+s.peak*.38,.22,.60),sign:s.sign};
  s.armedGrip=false;s.peak=0;
 }
 if(!r.holding){s.slackTime=0;s.armedTow=false;r.towCatchEvent=null;return;}
 const distance=Math.hypot(c.hx-r.x,c.hz-r.z),slack=sim.rope-distance;
 if(slack>.06){s.slackTime+=dt;if(s.slackTime>=.04)s.armedTow=true;}else s.slackTime=0;
 if(s.armedTow&&r.tension>.35&&t-s.lastTow>.65){
  const dx=(c.hx-r.x)/Math.max(.001,distance),dz=(c.hz-r.z)/Math.max(.001,distance);
  const closing=Math.max(0,((c.hvx??0)-r.vx)*dx+((c.hvz??0)-r.vz)*dz);
  r.towCatchEvent={time:t,strength:clamp(.42+r.tension*.08+closing*.10,.42,.90)};
  s.armedTow=false;s.lastTow=t;
 }
}

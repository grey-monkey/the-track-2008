// Presentation-only response. Physics remains the authoritative surface/flight state.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
export function deckCarveBank(r){
 const speed=Math.hypot(r.vx??0,r.vz??0);
 return clamp(r.lean??0,-.65,.65)*.13*smooth((speed-.25)/1.25);
}
export function landingCameraDip(sim,menu=false){
 const e=sim.rider.rideLanding;
 if(menu||!e||!['riding','coasting'].includes(sim.phase))return 0;
 const age=sim.time-e.time;if(age<0||age>=.42)return 0;
 const amplitude=clamp((e.speed??0)*.018,0,.10);
 return amplitude*(age<.075?smooth(age/.075):age<.12?1:1-smooth((age-.12)/.30));
}
// Critically damped vertical anchor: stable on seams, still follows elevated flight.
// Analytic integration gives the same settled result at different display rates.
export function cameraElevation(state,target,dt,reset=false,airborne=false){
 if(reset||!Number.isFinite(state.y)){state.y=target;state.velocity=0;return target;}
 const step=clamp(dt,0,.1),w=airborne?13:10,d=state.y-target,c=(state.velocity??0)+w*d,e=Math.exp(-w*step);
 state.y=target+(d+c*step)*e;state.velocity=((state.velocity??0)-w*c*step)*e;
 return state.y;
}

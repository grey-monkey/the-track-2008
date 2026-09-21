const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
export function updateFreeView(state,sim,dt,menu=false){
 const r=sim.rider,active=!menu&&!r.holding&&['coasting','crashed','ended','regroup'].includes(sim.phase),speed=Math.hypot(r.vx,r.vz);
 const reset=state.time==null||sim.time<state.time||menu;
 if(reset){state.blend=0;state.heading=r.heading;}
 state.time=sim.time;
 const step=clamp(dt,0,.1);
 state.blend+=(Number(active)-state.blend)*(1-Math.exp(-step*3.4));
 // Velocity, not deck yaw: powerslides must not whip the view sideways.
 if(active&&sim.phase==='coasting'&&speed>.65){const target=Math.atan2(r.vz,r.vx),delta=angle(target-state.heading);state.heading+=clamp(delta*(1-Math.exp(-step*4)),-step*1.5,step*1.5);}
 else if(!active)state.heading=r.heading;
 return state;
}

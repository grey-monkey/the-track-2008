import {riderGravity} from '../secret-spliff149.mjs';
import {height} from '../world.js';

// Heights are wheel-contact levels in world space. The render installation
// supplies the actual road/curb/path/ramp triangles, excluding decorative solids.
export function skateHeight(sim,x,z){return sim.hazards?.skateHeight?.(x,z)??height(x,z);}
export function skateSlope(sim,x,z){
 if(!sim.hazards?.skateHeight)return null;
 const dx=skateHeight(sim,x+.05,z)-skateHeight(sim,x-.05,z),dz=skateHeight(sim,x,z+.05)-skateHeight(sim,x,z-.05);
 // Exposed walls are handled by contact, not an arbitrarily large slope force.
 const gx=Math.abs(dx)>.12?0:dx/.1,gz=Math.abs(dz)>.12?0:dz/.1,projection=1+gx*gx+gz*gz;
 return{x:gx/projection,z:gz/projection};
}
export function stepFlight(sim,old,dt){
 const r=sim.rider,before=skateHeight(sim,old.x,old.z),ground=skateHeight(sim,r.x,r.z);r.groundY=ground;
 if(r.height>0||r.up>0||Number.isFinite(r.airY)){
  if(!Number.isFinite(r.airY))r.airY=before+Math.max(0,r.height);
  r.up-=riderGravity(sim)*dt;r.airY+=r.up*dt;r.height=Math.max(0,r.airY-ground);
  if(r.airY<=ground){const landing={speed:Math.max(0,-r.up)};r.airY=null;r.height=0;r.up=0;return landing;}
 }else if(before-ground>.045){
  // Ride off a curb or the side of the plywood: fall from its real height,
  // without a bonus jump or an instant snap to the lower surface.
  r.airY=before;r.height=before-ground;r.up=0;r.airSource='surface';r.airStarted=sim.time;
 }else if(ground-before>.11){
  // A high exposed edge is a collision, not a teleport onto the obstacle.
  sim.crash('TRIP',Math.hypot(r.vx,r.vz));
 }
 return null;
}

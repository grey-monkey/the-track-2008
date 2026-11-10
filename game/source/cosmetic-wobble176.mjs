import * as T from './vendor/three.module.js';
import {DOG_WOBBLE} from './character-rules140.js';
const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
export function cosmeticWobble(sim,menu=false){
 const r=sim.rider;
 if(menu||sim.options.rider!=='BOSS'||!['riding','coasting'].includes(sim.phase)||sim.gateExit||r.height>.025||r.up>0||r.grind||r.pushActive||r.braking)return 0;
 const speed=Math.hypot(r.vx,r.vz);
 // One eighth of Dog's full yaw. Fade out before real high-speed instability.
 const strength=smooth(.35,1.3,speed)*(1-smooth(4.5,DOG_WOBBLE.speed,speed));
 return Math.sin(sim.time*Math.PI*2*2.4)*(.15/8)*strength;
}
export function applyCosmeticWobble(view,sim,menu=false){
 const yaw=cosmeticWobble(sim,menu);if(!yaw)return;
 // Render transforms only: never touch heading, traction, velocity, score or bail state.
 // Turn the rider and deck together around the same pivot to keep feet planted.
 const q=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),yaw),pivot=view.board.position;
 view.rider.position.sub(pivot).applyQuaternion(q).add(pivot);
 view.rider.quaternion.premultiply(q);view.board.quaternion.premultiply(q);
}

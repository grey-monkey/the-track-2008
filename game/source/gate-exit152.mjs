import {entrancePoints} from './world.js';
const c=entrancePoints[58],a=entrancePoints[56],b=entrancePoints[60],length=Math.hypot(b.x-a.x,b.z-a.z);
export const EXIT_GATE={x:c.x,z:c.z,tx:(b.x-a.x)/length,tz:(b.z-a.z)/length,plane:1.2,duration:3.2};
export function gateLocal(p){const g=EXIT_GATE,x=p.x-g.x,z=p.z-g.z;return{along:x*g.tx+z*g.tz,across:x*g.tz-z*g.tx};}
export function detectGateExit(sim,old){
 if(sim.gateExit||sim.phase!=='coasting'||sim.rider.holding)return false;
 const r=sim.rider,p=gateLocal(old),q=gateLocal(r),g=EXIT_GATE;
 if(p.along>=g.plane||q.along<g.plane||q.along<=p.along)return false;
 const t=(g.plane-p.along)/(q.along-p.along),cross=p.across+(q.across-p.across)*t;
 if(Math.abs(cross)<1.12||Math.abs(cross)>5.25)return false;
 if(r.vx*g.tx+r.vz*g.tz<=0)return false;
 sim.gateExit={at:sim.time,fromHeight:r.height??0};sim.restartS=sim.car.s;
 r.grind=null;r.manual=false;r.pushStart=null;r.trick=null;r.bufferedTrick=null;
 // Bank a successfully carried combo before leaving the world.
 if(sim.combo){sim.score+=Math.round(sim.combo.base)*sim.combo.multiplier;sim.combo=null;}
 return true;
}
export function gateExitFade(sim,menu=false){
 if(menu||!sim.gateExit)return 0;
 const t=Math.max(0,Math.min(1,(sim.time-sim.gateExit.at)/EXIT_GATE.duration));return t*t*(3-2*t);
}
export function stepGateExit(sim,dt){
 if(!sim.gateExit||sim.phase!=='coasting')return false;
 const r=sim.rider;r.x+=r.vx*dt;r.z+=r.vz*dt;
 r.groundY=sim.hazards?.skateHeight?.(r.x,r.z)??r.groundY;
 if(sim.time-sim.gateExit.at>=EXIT_GATE.duration){r.vx=r.vz=0;sim.phase='regroup';sim.phaseTime=0;}
 return true;
}

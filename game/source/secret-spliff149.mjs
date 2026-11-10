export const SECRET_SPLIFF_SECONDS=30;
export function secretGlow(sim,menu=false){
 if(menu||sim.secretEffect==='second-hand'||!(sim.secretSpliffUntil>sim.time))return 0;
 const age=Math.max(0,sim.time-sim.secretSpliffAt),fadeIn=Math.min(1,age/1.1);
 return fadeIn*fadeIn*(3-2*fadeIn)*Math.pow(Math.max(0,1-age/SECRET_SPLIFF_SECONDS),.75);
}
export function riderGravity(sim,time=sim.time){
 return sim.secretSpliffUntil>time?9.81*Math.max(0,Math.min(1,(time-sim.secretSpliffAt)/SECRET_SPLIFF_SECONDS)):9.81;
}
// Integrate the linear gravity recovery, including a flight crossing expiry.
// This avoids dividing by zero when a rider jumps at the start of the effect.
export function flightTimeRemaining(sim,height=sim.rider.height??0,up=sim.rider.up??0){
 const remaining=Math.max(0,(sim.secretSpliffUntil??0)-sim.time),g=riderGravity(sim),slope=remaining>0?9.81/SECRET_SPLIFF_SECONDS:0;
 const altitude=t=>{const a=Math.min(t,remaining),b=t-a;
  const y=height+up*a-g*a*a/2-slope*a*a*a/6,v=up-g*a-slope*a*a/2;
  return y+v*b-9.81*b*b/2;
 };
 if(height<=0&&up<=0)return 0;
 let lo=0,hi=1;while(altitude(hi)>0&&hi<64)hi*=2;
 for(let i=0;i<32;i++){const mid=(lo+hi)/2;if(altitude(mid)>0)lo=mid;else hi=mid;}
 return (lo+hi)/2;
}
export function collectSecretSpliff(sim,target=sim.hazards?.secretSpliff){
 if(sim.options?.rider==='BOSS'||!target||sim.secretSpliffCollected||!['riding','coasting'].includes(sim.phase))return false;
 const r=sim.rider,ground=sim.hazards?.skateHeight?.(r.x,r.z)??target.y;
 if(Math.hypot(r.x-target.x,r.z-target.z)>.95||Math.abs(ground+(r.height??0)+1.45-(target.y+1.45))>1)return false;
 sim.secretSpliffCollected=true;launchSecret(sim,ground,'spliff');return true;
}
export function launchSecret(sim,ground,kind='spliff'){
 const r=sim.rider;sim.secretEffect=kind;sim.secretSpliffAt=sim.time;sim.secretSpliffUntil=sim.time+SECRET_SPLIFF_SECONDS;
 // A pickup launch is an explicit exception for eligible characters on every board; it does
 // not grant access to normal trick inputs or schedule a novice landing bail.
 // Preserve approach direction, adding a gentle forward lift like a ramp exit.
 const speed=Math.hypot(r.vx,r.vz),launchSpeed=Math.max(4.5,speed+1.2),travel=speed>.2?Math.atan2(r.vz,r.vx):r.heading;
 r.vx=Math.cos(travel)*launchSpeed;r.vz=Math.sin(travel)*launchSpeed;
 r.airY=ground+Math.max(0,r.height??0);r.up=Math.max(2.8,Math.min(4.2,launchSpeed*.32),r.up??0);r.trick='secret-backflip';r.trickStart=sim.time;r.trickDuration=1.85;r.manual=false;r.pushStart=null;r.airStarted=sim.time;r.airSource='secret-spliff';r.ollieMustBail=false;r.bufferedTrick=null;r.grind=null;r.grindExit=null;
 return true;
}

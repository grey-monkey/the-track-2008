const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
// Arcade assistance depends on momentum and a loaded carve, not steering alone.
export const PINTAIL_DRIFT=Object.freeze({entrySpeed:6.2,holdSpeed:4.6,fullSpeed:10.8,entryInput:.64,holdInput:.25,entryTime:.18,grace:.14,maxYaw:Math.PI*.48});
export function stepPintailDrift(sim,steer,speed,dt){
 if(sim.options.board!=='HANDMEDOWN'||sim.options.rider==='BOSS')return null;
 const r=sim.rider,g=PINTAIL_DRIFT,d=r.pintailDrift??={amount:0,yaw:0,hold:0,quiet:0,active:false,sign:0};
 const grounded=!r.dirt&&r.height<=.025&&r.up<=0&&!r.grind;
 const input=Math.abs(steer),sign=Math.sign(steer);
 const travel=Math.atan2(r.vz,r.vx),slip=angle(r.heading-travel);
 // Load the wheels in the requested direction before breaking traction.
 // Backwards motion and an opposite turn cannot instantly start a new drift.
 const loaded=Math.sign(slip)===sign&&Math.abs(slip)>.012&&Math.cos(slip)>.55;
 const reversing=d.active&&input>=g.holdInput&&sign!==d.sign;
 if(reversing){d.active=false;d.hold=0;}
 const entering=grounded&&speed>=g.entrySpeed&&input>=g.entryInput&&loaded&&!reversing;
 d.hold=entering?d.hold+dt:0;
 if(!d.active&&d.hold>=g.entryTime){d.active=true;d.sign=sign;}
 d.quiet=input<g.holdInput?d.quiet+dt:0;
 if(!grounded||speed<g.holdSpeed||d.quiet>g.grace)d.active=false;
 // Slowing down restores grip and narrows the slide, even with steering held.
 const momentum=clamp((speed-g.holdSpeed)/(g.fullSpeed-g.holdSpeed),0,1);
 d.carveLimit=.48/(1+speed*.07);
 d.angleLimit=g.maxYaw*Math.pow(momentum,.75);
 const target=d.active ? .90*Math.pow(momentum,.45) : 0;
 d.amount+=(target-d.amount)*(1-Math.exp(-dt*(target>d.amount?4.6:3.5)));
 const commitment=.55+.45*clamp((input-g.holdInput)/(.7-g.holdInput),0,1);
 const desired=d.active?d.sign*d.angleLimit*commitment:0;
 d.yaw+=(desired-d.yaw)*(1-Math.exp(-dt*(d.active?3.8:3.0)));
 if(!grounded){d.amount=0;d.yaw=0;d.hold=0;}
 r.slide=d.amount;r.slideActive=d.active;r.slideSign=d.sign;
 return d;
}
export function driftSteering(d,ordinary){return clamp(ordinary,-d.carveLimit,d.carveLimit)*(1-d.amount/.90)+d.yaw*d.amount/.90;}
export function driftTraction(d,slip){
 // Recover toward the actual travel line before letting the wheels catch.
 const catching=!d.active||Math.abs(slip)>Math.abs(d.yaw)+.15;
 const release=d.amount>.01&&catching?clamp(Math.abs(slip)/.5,0,1):0;
 return 1-.86*Math.max(d.amount/.90,release);
}
export function driftSlipAllowance(d,speed,slip){return d?Math.max(speed*.22,Math.max(0,speed)*Math.sin(Math.min(Math.PI/2,Math.abs(d.yaw)))*clamp(d.amount/.65,0,1)+.6*d.amount,slip*clamp(d.amount/.18,0,1)):0;}


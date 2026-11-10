// Pintail scoring uses the board-specific slide physics. It never changes
// traction or steering. A slide must actually travel sideways, then recover.
export const POWERSLIDE_POINTS_PER_SECOND=20;
export function powerslidePoints(run){
 if(!run||run.seconds<.25||run.distance<1)return 0;
 // Count only qualifying slide time. The tiny epsilon prevents a completed
 // second landing one point short through floating-point accumulation.
 return Math.floor(run.seconds*POWERSLIDE_POINTS_PER_SECOND+1e-7);
}
export function scorePowerslide(sim,dt){
 const r=sim.rider,speed=Math.hypot(r.vx,r.vz);
 const allowed=sim.options.board==='HANDMEDOWN'&&['SALLY','BLACK','DOG'].includes(sim.options.rider);
 if(!allowed||!['riding','coasting'].includes(sim.phase)||r.dirt||r.height>0||r.up>0||r.grind){r.powerslide=null;return;}
 const lateral=Math.abs(-Math.sin(r.heading)*r.vx+Math.cos(r.heading)*r.vz);
 const sliding=r.slideActive&&r.slide>=.20&&speed>=(r.pintailDrift?2.5:3.8)&&lateral>=.40;
 let run=r.powerslide;
 if(sliding){
  if(!run||(!r.pintailDrift&&run.sign!==r.slideSign))run=r.powerslide={sign:r.slideSign,seconds:0,distance:0,settled:0,lastSlide:sim.time};
  run.sign=r.slideSign;run.seconds+=dt;run.distance+=speed*dt;run.lastSlide=sim.time;run.settled=0;
  return;
 }
 if(!run)return;
 if(sim.time-run.lastSlide>4||speed<(r.pintailDrift?.15:1.2)||(!r.pintailDrift&&r.slideActive&&r.slideSign!==run.sign)){r.powerslide=null;return;}
 const aligned=r.pintailDrift?lateral/Math.max(.1,speed)<.18:lateral<.30;
 const recovered=!r.slideActive&&(r.slide??0)<.14&&aligned&&Math.abs(r.steer??0)<.35;
 run.settled=recovered?run.settled+dt:0;
 if(run.settled<.25)return;
 r.powerslide=null;
 const points=powerslidePoints(run);if(!points)return;
 const priorBase=sim.combo?.base??0;
 sim.addTrick('powerslide');
 // One award per recovered slide. Replace the generic trick award with
 // the earned total: no upfront bonus, distance burst, or per-slide cap.
 sim.combo.base=priorBase+points;
 sim.combo.landedAt=sim.time;
}

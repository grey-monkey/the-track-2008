import {STEP} from './physics.js';
import {angle} from './world.js';

// Display the interval between the last two completed physics steps. The live
// simulation, input, collisions and sound never consume this visual snapshot.
export class MotionFrame {
 constructor(){this.previous={car:{},rider:{},board:{}};this.output={car:{},rider:{},board:{}};this.turn=0;this.previousTurn=0;}
 reset(sim){if(this.source!==sim)this.output=Object.assign(Object.create(Object.getPrototypeOf(sim)),{car:{},rider:{},board:{}});this.source=sim;this.turn=this.previousTurn=0;this.capture(sim);}
 capture(sim){this.previous.phase=sim.phase;this.previous.time=sim.time;this.previous.phaseTime=sim.phaseTime;for(const key of ['car','rider','board'])this.previous[key]=sim[key]?{...sim[key]}:null;}
 step(sim,input){if(this.source!==sim)this.reset(sim);this.capture(sim);this.previousTurn=this.turn;const h=sim.rider.heading;sim.step(input);this.turn=angle(sim.rider.heading-h)/STEP;if(sim.phase!==this.previous.phase){this.capture(sim);this.previousTurn=this.turn=0;}}
 sample(sim,alpha=1){if(this.source!==sim||this.previous.phase!==sim.phase)this.reset(sim);const a=Math.max(0,Math.min(1,alpha)),p=this.previous,out=this.output;
  // Preserve non-positional state and replace only the visual actor records.
  const car=out.car??{},rider=out.rider??{},board=out.board??{};Object.assign(out,sim);out.car=car;out.rider=rider;out.board=sim.board?board:undefined;
  for(const key of ['car','rider','board']){if(!sim[key])continue;const from=p[key],to=sim[key],target=out[key];for(const k of Object.keys(target))if(!(k in to))delete target[k];Object.assign(target,to);if(from)for(const k of Object.keys(to))if(typeof to[k]==='number'&&typeof from[k]==='number')target[k]=from[k]+(k==='heading'?angle(to[k]-from[k]):to[k]-from[k])*a;}
  out.time=p.time+(sim.time-p.time)*a;out.phaseTime=p.phaseTime+(sim.phaseTime-p.phaseTime)*a;out.visualTurnRate=this.previousTurn+(this.turn-this.previousTurn)*a;return out;
 }
}

import {musicLevel} from './audio-model.js';
// A single streamed album source, heard only through the Mercedes speaker path.
const tracks=['./assets/car-radio/01.mp3','./assets/car-radio/02.mp3','./assets/car-radio/03.mp3','./assets/car-radio/04.mp3','./assets/car-radio/05.mp3','./assets/car-radio/06.mp3'];
export class MercedesStereo {
 constructor(ctx,destination){
  this.ctx=ctx;this.index=0;this.engaged=false;this.wanted=false;this.failures=0;
  this.media=new Audio();this.media.preload='none';this.media.src=tracks[this.index];
  this.source=ctx.createMediaElementSource(this.media);
  this.high=ctx.createBiquadFilter();this.high.type='highpass';this.high.frequency.value=240;this.high.Q.value=.5;
  this.low=ctx.createBiquadFilter();this.low.type='lowpass';this.low.frequency.value=2400;this.low.Q.value=.5;
  // Small worn speakers: nasal cabinet resonance and gentle, level-safe breakup.
  this.box=ctx.createBiquadFilter();this.box.type='peaking';this.box.frequency.value=720;this.box.Q.value=.85;this.box.gain.value=2.5;
  this.grit=ctx.createWaveShaper();this.grit.curve=Float32Array.from({length:2049},(_,i)=>Math.tanh(2*(i/1024-1))/2);
  // A second low-pass removes the crisp highs that would not escape the cabin.
  this.window=ctx.createBiquadFilter();this.window.type='lowpass';this.window.frequency.value=2800;this.window.Q.value=.5;
  this.gain=ctx.createGain();this.gain.gain.value=0;
  this.panner=ctx.createPanner();this.panner.panningModel='HRTF';this.panner.distanceModel='inverse';this.panner.refDistance=4;this.panner.rolloffFactor=0;this.panner.maxDistance=90;
  this.otherWindow=ctx.createPanner();this.otherWindow.panningModel='HRTF';this.otherWindow.rolloffFactor=0;
  this.leftWindowGain=ctx.createGain();this.rightWindowGain=ctx.createGain();
  this.leftWindowGain.gain.value=.5;this.rightWindowGain.gain.value=.5;
  this.gain.connect(this.leftWindowGain).connect(this.panner).connect(destination);
  this.gain.connect(this.rightWindowGain).connect(this.otherWindow).connect(destination);
  this.source.connect(this.high).connect(this.box).connect(this.grit).connect(this.low).connect(this.window).connect(this.gain);
  this.media.addEventListener('ended',()=>this.next());
  this.media.addEventListener('playing',()=>{this.failures=0;this.error=null;this.retryCount=0;});
  this.media.addEventListener('error',()=>{this.error='Track unavailable';this.needsReload=true;});
 }
 next(){this.index=(this.index+1)%tracks.length;this.media.src=tracks[this.index];if(this.wanted)this.play();}
 play(gesture=false){if(this.pending||!this.media.paused||!this.wanted)return;
  const now=performance.now();if(gesture){this.retryCount=0;this.nextRetry=0;}else if(this.error==='NotAllowedError'||(this.retryCount??0)>=3||now<(this.nextRetry??0))return;
  this.retryCount=(this.retryCount??0)+1;this.nextRetry=now+Math.min(5000,750*2**(this.retryCount-1));
  if(this.needsReload){this.needsReload=false;this.media.load();}
  this.pending=true;
  try{const request=this.media.play();Promise.resolve(request).catch(e=>{this.error=e.name;}).finally(()=>{this.pending=false;if(!this.wanted)this.media.pause();});}catch(e){this.pending=false;this.error=e.name;}
 }
 sync(on,gesture=false){const changed=on!==this.wanted;this.wanted=on;if(!on){if(changed)this.media.pause();return;}if(changed){this.retryCount=0;this.nextRetry=0;}this.play(gesture);}

 update(sim,on,view,selection=false){
  this.sync(on);if(!view?.camera)return;
  const t=this.ctx.currentTime,set=(p,v)=>p.setTargetAtTime(v,t,.08);
  const c=view.car?.position??sim.car,r=selection?view.camera.position:(view.rider?.position??sim.rider);
  const y=(r.y||0)+(selection?0:1.3),cy=(c.y||0)+1.05;
  const matrix=view.car?.matrixWorld?.elements;
  const heading=selection&&matrix?Math.atan2(-matrix[10],-matrix[8]):(sim.car.heading||0),fx=Math.cos(heading),fz=Math.sin(heading);
  const cabinX=c.x+fx*.45,cabinZ=c.z+fz*.45;
  const distance=Math.hypot(cabinX-r.x,cy-y,cabinZ-r.z);
  const behind=Math.max(0,-((r.x-c.x)*fx+(r.z-c.z)*fz));
  const u=Math.min(1,Math.max(0,(behind-.8)/3.2)),occlusion=u*u*(3-2*u);
  const containment=1-.35*occlusion;
  this.containment=containment;this.targetGain=on?musicLevel(distance)*containment*1.12:0;
  // One authored distance curve; the panner provides direction only.
  set(this.gain.gain,this.targetGain);
  set(this.low.frequency,(900+2100*Math.exp(-distance/11))*(1-.20*occlusion));
  const l=this.ctx.listener,m=view.camera.matrixWorld.elements;
  if(l.positionX){set(l.positionX,r.x);set(l.positionY,y);set(l.positionZ,r.z);set(l.forwardX,-m[8]);set(l.forwardY,-m[9]);set(l.forwardZ,-m[10]);set(l.upX,m[4]);set(l.upY,m[5]);set(l.upZ,m[6]);}
  else{l.setPosition(r.x,y,r.z);l.setOrientation(-m[8],-m[9],-m[10],m[4],m[5],m[6]);}
  // Two actual side-window emitters; no rear-facing or listener-attached radio source.
  const side=((r.x-cabinX)*(-fz)+(r.z-cabinZ)*fx)/Math.max(1,distance);
  const leftWeight=.5+.48*Math.max(-1,Math.min(1,side));
  set(this.leftWindowGain.gain,leftWeight);set(this.rightWindowGain.gain,1-leftWeight);
  const windows=[{p:this.panner,sign:1},{p:this.otherWindow,sign:-1}];
  for(const {p,sign} of windows){const x=cabinX-fz*.72*sign,z=cabinZ+fx*.72*sign;
   if(p.positionX){set(p.positionX,x);set(p.positionY,cy);set(p.positionZ,z);}else p.setPosition(x,cy,z);
  }

  this.distance=distance;
 }
}

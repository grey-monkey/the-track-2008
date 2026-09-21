import {SceneAudio} from './scene-audio.js';
import {MercedesStereo} from './car-music.js';
import {SAMPLES} from './sample-bank.js';
import {soundState,carLevel,clamp,brakeLevel} from './audio-model.js';
import {roadDistance} from './world.js';
// Recorded-only soundscape. Sources and editorial operations: CREDITS.md / edits.json.
export class MemorySound{
 constructor(){this.enabled=true;this.ctx=null;this.previous=null;this.buffers={};this.loops={};this.voices=new Set();this.errors=[];this.serial=0;this.counter=0;this.nextCicada=24;this.nextChatter=0;this.on=false;this.events=[];this.bodyLanded=false;this.bodyAt=-Infinity;}
 async start(ride=false,gesture=true){if(!this.enabled||document.hidden)return;try{
  if(!this.ctx)this.build(new(window.AudioContext||window.webkitAudioContext)());
  this.radio.engaged=true;
  // Both unlock requests must begin inside the actual tap, before any await.
  const resume=this.ctx.resume();
  this.radio.sync(true,gesture);
  if(!this.loading&&!this.loaded&&performance.now()>=(this.nextLoadAttempt??0)){
   this.loading=this.load().finally(()=>{this.loading=null;this.nextLoadAttempt=performance.now()+1500;});
  }
  await resume;
 }catch(e){this.errors.push(String(e));}}

 build(a){this.ctx=a;this.master=a.createGain();this.master.gain.value=0;this.guard=a.createDynamicsCompressor();this.guard.threshold.value=-9;this.guard.knee.value=6;this.guard.ratio.value=3;this.guard.attack.value=.004;this.guard.release.value=.18;this.master.connect(this.guard).connect(a.destination);this.scene=new SceneAudio(this);this.radio=new MercedesStereo(a,this.master);
  this.hidden=()=>{if(document.hidden){this.on=false;this.master.gain.cancelScheduledValues(a.currentTime);this.master.gain.setValueAtTime(0,a.currentTime);this.radio.sync(false);this.clearVoices();}};document.addEventListener('visibilitychange',this.hidden);
 }
 async load(){const entries=Object.entries(SAMPLES).filter(([key])=>!this.buffers[key]);let next=0;
  const worker=async()=>{while(next<entries.length){const [key,url]=entries[next++];for(let attempt=0;attempt<2;attempt++){try{
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);let bytes;
   try{const response=await fetch(url,{signal:controller.signal});if(!response.ok)throw Error(key+': '+response.status);bytes=await response.arrayBuffer();}finally{clearTimeout(timer);}
   this.buffers[key]=await this.ctx.decodeAudioData(bytes);
   if(['idle','load','exhaust','tires','roll','slide','brake','wind','night'].includes(key)&&!this.loops[key])this.makeLoop(key);
   break;
  }catch(e){if(attempt===1)this.errors.push(String(e));else await new Promise(resolve=>setTimeout(resolve,400));}}}};
  await Promise.all([worker(),worker()]);this.loaded=Object.keys(this.buffers).length===Object.keys(SAMPLES).length;
 }

 makeLoop(key){const a=this.ctx,source=a.createBufferSource(),filter=a.createBiquadFilter(),gain=a.createGain(),pan=['wind','night'].includes(key)?a.createPanner():a.createStereoPanner();if(!pan.pan){pan.panningModel='HRTF';pan.rolloffFactor=0;}source.buffer=this.buffers[key];source.loop=true;
  // Android Chrome can emit invalid samples at this clip's exact 4.9s wrap.
  // End on a complete 128-frame audio quantum (1.33ms earlier at 48kHz).
  // Keep the recording, filtering and speed-dependent playback unchanged.
  if(key==='tires')source.loopEnd=Math.floor(source.buffer.length/128)*128/source.buffer.sampleRate;
  filter.type='lowpass';filter.Q.value=.5;filter.frequency.value=8000;gain.gain.value=0;source.connect(filter).connect(gain).connect(pan).connect(this.master);source.start();this.loops[key]={source,filter,gain,pan};}
 set(p,value,lag=.09){p.setTargetAtTime(Number.isFinite(value)?value:0,this.ctx.currentTime,lag);}
 loop(key,volume,rate=1,hz=8000,pan=0){const v=this.loops[key];if(!v)return;this.set(v.gain.gain,this.on?volume*(this.ctx.currentTime<(this.contactUntil??0)&&['roll','exhaust','load','tires'].includes(key)?.60:1):0);this.set(v.source.playbackRate,rate,.20);this.set(v.filter.frequency,hz,.16);this.set(v.pan.pan,clamp(pan,-.85,.85));}
 spatialLoop(key,volume,point,hz){const v=this.loops[key];if(!v)return;this.set(v.gain.gain,this.on?volume:0,1.2);this.set(v.filter.frequency,hz,.6);if(point.x!=null){this.set(v.pan.positionX,point.x,1);this.set(v.pan.positionY,point.y??1,1);this.set(v.pan.positionZ,point.z,1);}}
 clearVoices(){for(const v of this.voices){try{v.source.stop();}catch{}v.source.disconnect();v.filter.disconnect();v.gain.disconnect();v.pan.disconnect();}this.voices.clear();this.cicadaVoice=null;}
 shot(key,volume=.1,rate=1,pan=0,priority=0,point=null){if(!this.on||!this.buffers[key])return;const ambience=['cicada','dog'].includes(key),effects=[...this.voices].filter(v=>!v.ambience);if(ambience&&this.cicadaVoice)return;if(!ambience&&effects.length>=4){const low=effects.find(v=>v.priority<priority);if(!low)return;try{low.source.stop();}catch{}this.voices.delete(low);}
  if(priority>=1)this.contactUntil=this.ctx.currentTime+.20;const a=this.ctx,source=a.createBufferSource(),filter=a.createBiquadFilter(),gain=a.createGain(),p=point?a.createPanner():a.createStereoPanner();if(point){p.panningModel='HRTF';p.rolloffFactor=0;p.positionX.value=point.x;p.positionY.value=point.y??1;p.positionZ.value=point.z;}source.buffer=this.buffers[key];source.playbackRate.value=rate;filter.type='lowpass';filter.frequency.value=key==='dog'?1800:ambience?4200:6500;gain.gain.value=volume;if(p.pan)p.pan.value=clamp(pan,-.8,.8);source.connect(filter).connect(gain).connect(p).connect(this.master);const v={source,filter,gain,pan:p,ambience,priority};this.voices.add(v);if(ambience)this.cicadaVoice=v;source.onended=()=>{this.voices.delete(v);if(this.cicadaVoice===v)this.cicadaVoice=null;source.disconnect();filter.disconnect();gain.disconnect();p.disconnect();};source.start();this.events.push({key,time:this.ctx.currentTime,volume});if(this.events.length>32)this.events.shift();return v;
 }
 impact(strength=.5,pan=0,dirt=false){this.shot('impact'+(1+(this.counter++%3)),.19*clamp(strength,0,1.5)*(dirt?.58:1),.94+(this.counter%3)*.04,pan,1);}
 bodyImpact(dirt,strength=1){if(this.ctx.currentTime-this.bodyAt<.23)return;this.bodyAt=this.ctx.currentTime;this.shot(dirt?'bodyDirt':'bodyHard',.38*clamp(strength,.35,1.15),.97+(this.counter++%3)*.025,0,2);}

 insects(t,view){if(t>this.nextCicada){const night=clamp((view?.evening?.seconds??0)/600);const pan=Math.sin(this.counter++*2.399)*.65;this.shot('cicada',.048*(1-night*(this.scene.enabled?.90:.45)),1,pan);this.nextCicada=t+52+((this.counter*29)%31)+night*15;}}

 update(sim,playing,view,selection=false){if(!this.ctx||!sim)return;const a=this.ctx,t=a.currentTime,r=sim.rider,c=sim.car,state=soundState(sim),on=this.enabled&&!document.hidden;this.on=on;this.radio.update(sim,on,view,selection);this.set(this.master.gain,on?.46:0,.07);
  if(!on){if(this.voices.size)this.clearVoices();this.previous=null;return;}
  if(selection||!playing||!state.live){
   for(const key of ['load','tires','roll','slide','brake'])this.loop(key,0);
   // Preserve ongoing ambience and its schedule across menus and run boundaries.
   this.inSelection=true;
   const rp=view?.rider?.position??r,cp=view?.car?.position??c;
   const menu={...sim,time:t,phase:selection?'selection':sim.phase,rider:{...r,x:rp.x,z:rp.z,vx:0,vz:0},car:{...c,x:cp.x,z:cp.z,speed:0}};
   // The viewer is standing outside the parked car. Use its displayed transform,
   // not the hidden riding avatar or simulation heading, for bonnet/tail positions.
   const camera=view?.camera,listener=selection?(camera?.position??rp):rp,m=view?.car?.matrixWorld?.elements,right=camera?.matrixWorld?.elements;
   const source=(z)=>{const x=m?m[12]+m[8]*z:cp.x,sz=m?m[14]+m[10]*z:cp.z,dx=x-listener.x,dz=sz-listener.z,distance=Math.hypot(dx,dz);return {distance,gain:carLevel(distance),pan:right?(dx*right[0]+dz*right[2])/Math.max(2,distance):0};};
   const bonnet=source(-1.5),tail=source(1.9);
   this.loop('idle',bonnet.gain*.17,.94,1400,bonnet.pan);
   this.loop('exhaust',tail.gain*.085,.94,750,tail.pan);
   this.selectionAudit={bonnet,tail,idleLevel:bonnet.gain*.17,exhaustLevel:tail.gain*.085,radio:true};
   this.scene.update(menu,{...state,speed:0,carSpeed:0,ground:false,slide:0},view);this.insects(t,view);this.previous=null;return;
  }
  if(this.inSelection){this.inSelection=false;this.sim=null;}
  if(this.sim!==sim){this.sim=sim;this.serial=sim.hazardSerial??0;this.previous=null;this.nextChatter=t+1;this.bodyLanded=false;this.bodyAt=-Infinity;this.surfaceAt=-Infinity;this.crashActive=false;this.scene.mask=null;this.scene.onRamp=false;this.scene.wasDirt=undefined;}
  const previous=this.previous,crashed=sim.phase==='crashed',b=sim.board;
  const bp=b??r,dx=bp.x-r.x,dz=bp.z-r.z,bd=Math.hypot(dx,dz),mRight=view?.camera?.matrixWorld?.elements;
  const boardPan=mRight?(dx*mRight[0]+dz*mRight[2])/Math.max(2,bd):0,boardGain=1/(1+(bd/5)**1.5),boardSpeed=b?Math.hypot(b.vx,b.vz):0;
  if(crashed&&t-(this.surfaceAt??-Infinity)>.1){this.boardDirt=b?!(sim.hazards?.rideable?.(b.x,b.z)??roadDistance(b.x,b.z)<=0):r.dirt;this.surfaceAt=t;}
  if(!crashed){this.crashActive=false;this.bodyLanded=false;this.crashSpeed=state.speed;}
  if(crashed&&!this.crashActive){
   this.crashActive=true;
   this.bodyLanded=false;this.bodyTravel=0;this.boardTravel=0;this.bodySteps=0;this.boardSteps=0;this.tumbleTime=sim.time;
   if(!(sim.hazardEvents??[]).some(e=>e.serial>this.serial&&e.kind==='BOARD_IMPACT'&&sim.time-e.time<.18))this.impact(.8*state.board.click,boardPan,this.boardDirt);
  }
  if(crashed&&!this.bodyLanded&&r.groundContactAt!=null){this.bodyLanded=true;this.bodyImpact(r.dirt,.65+clamp((this.crashSpeed??state.speed)/10)*.5);this.nextSettle=t+.31;this.scene.riderEvent('fall',state);}
  // Travel-driven recorded contacts: separate loose deck and rider, no fixed walk rhythm.
  if(crashed){
   const dt=clamp(sim.time-(this.tumbleTime??sim.time),0,.1);this.tumbleTime=sim.time;
   this.boardTravel+=boardSpeed*dt;this.bodyTravel+=this.bodyLanded?state.speed*dt:0;
   const gaps=[1.05,.66,1.38,.82,1.61,.95];
   if(!b?.pinned&&boardSpeed>.3&&this.boardSteps<6&&this.boardTravel>gaps[this.boardSteps]){
    this.boardTravel=0;this.boardSteps++;
    const energy=clamp(boardSpeed/6,.12,1)*boardGain;
    this.shot('impact'+(1+this.boardSteps%3),.095*energy*(this.boardDirt?.58:1),.88+this.boardSteps%3*.065,boardPan,1);
    if(this.boardSteps%2===0)this.shot(this.boardDirt?'dirtScuff':'scrape',.07*energy,.91,boardPan);
   }
   if(this.bodyLanded&&state.speed>.18&&this.bodySteps<5&&this.bodyTravel>gaps[(this.bodySteps+2)%6]*.65){
    this.bodyTravel=0;this.bodySteps++;
    const energy=clamp(state.speed/5,.16,1);
    this.shot(r.dirt?'dirtScuff':'clothGround',.14*energy,.91+this.bodySteps%3*.06,0,1);
    if(this.bodySteps===1||this.bodySteps===3)this.shot(r.dirt?'bodyDirt':'bodyHard',.075*energy,.88+this.bodySteps*.02,0,1);
   }
  }

  if(previous&&sim.time>previous.time&&sim.time-previous.time<.4){if(previous.airborne&&state.ground&&state.speed>.5){this.impact(.65*state.board.click,0,this.scene.enabled&&r.dirt);this.scene.riderEvent('land',state);if(this.scene.enabled&&r.dirt)this.shot('dirtScuff',.06,.95);}if(r.trickStart!==previous.trickStart&&r.up>0){this.impact(.22*state.board.click);this.scene.riderEvent('jump',state);}}
  for(const e of sim.hazardEvents??[]){if(e.serial<=this.serial)continue;this.serial=e.serial;if(sim.time-e.time>.18)continue;if(this.scene.material(e,state,sim))continue;const power=clamp(e.strength,.1,1.5)*state.board.click;if(e.kind==='CAR_IMPACT'){this.shot('metal',.28*power,.74,boardPan,3);this.impact(.9*power,boardPan);}else if(e.kind==='SEAM')this.impact(.28*power);else if(e.kind==='BODY_IMPACT')this.bodyImpact(false,.65*power);else if(e.kind==='BOARD_IMPACT'){this.impact(.65*power*boardGain,boardPan,false);if(['CURB','CINDER_BLOCK'].includes(e.obstacle))this.shot('scrape',.055*power*boardGain,.95,boardPan);}else this.impact(.45*power);}
  if(state.ground&&state.speed>2&&(state.slide>.15||r.dirt||r.wobble>.35)&&t>this.nextChatter){this.shot('chatter',(.014+state.slide*.0175)*state.board.chatter,.9+clamp(state.speed/15)*.2);this.nextChatter=t+.16+((this.counter++*37)%13)/100;}
  this.insects(t,view);
  this.scene.update(sim,state,view);
  this.previous={time:sim.time,airborne:r.height>.04,phase:sim.phase,trickStart:r.trickStart};
  // Smooth continuous parameters at 30 Hz; no geometry scans or physics writes.
  if(t-(this.lastMix??-1)<1/30)return;this.lastMix=t;
  const cp=view?.car?.position??c,rp=view?.rider?.position??r,m=view?.camera?.matrixWorld?.elements;const spatial=(offset)=>{const x=cp.x+Math.cos(c.heading)*offset,z=cp.z+Math.sin(c.heading)*offset,dx=x-rp.x,dz=z-rp.z,d=Math.hypot(dx,dz);return {gain:carLevel(d),pan:m?(dx*m[0]+dz*m[2])/Math.max(2,d):0};};const front=spatial(1.5),rear=spatial(-1.9),center=spatial(0),move=clamp(state.carSpeed/8),load=state.load,braking=brakeLevel(c);
  this.loop('idle',front.gain*(.17-.08*move),.94+move*.12,1400,front.pan);
  this.loop('load',front.gain*(.035+move*.075+load*.045)*(1-braking*.35),.91+move*.18+load*.06,1700,front.pan);
  this.loop('exhaust',rear.gain*(.085+move*.046+load*.058),.94+move*.12,750,rear.pan);
  this.loop('tires',center.gain*.12*Math.pow(move,.85),.86+move*.25,3600,center.pan);
  this.loop('brake',center.gain*braking*.085,.88+move*.12,2000,center.pan);
  const rollSpeed=crashed?boardSpeed:state.speed,rollDirt=crashed?this.boardDirt:r.dirt,rollGain=crashed?(b?.pinned?0:clamp(boardSpeed/7.5)*state.board.roll*boardGain*.7):state.roll;
  this.loop('roll',rollGain*.27*(rollDirt?.55:1)*(1-state.slide*.25),state.board.pitch*(.78+.30*clamp(rollSpeed/10)),rollDirt?1800:state.board.lowpass,crashed?boardPan:0);
  this.loop('slide',state.slide*.16,state.board.pitch*.94,4800,0);
  this.audit={loaded:Object.keys(this.buffers).length,loops:Object.keys(this.loops).length,voices:this.voices.size,pcmBytes:Object.values(this.buffers).reduce((s,b)=>s+b.length*b.numberOfChannels*4,0),scene:this.scene.audit,state,braking,bodyLanded:this.bodyLanded,boardDirt:this.boardDirt,boardSpeed,carDistance:Math.hypot(cp.x-rp.x,cp.z-rp.z),errors:this.errors};
 }
}

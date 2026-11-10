import {gateExitFade} from '../gate-exit152.mjs';
import {powerslidePoints} from '../powerslide143.mjs';
import {riderGravity} from '../secret-spliff149.mjs';
// Marker lettering shares the menu title font. Fonts are bundled for offline use.
const reducedMotion=()=>globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
function numberPaint(canvas,text,center=false){
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.clearRect(0,0,w,h);
 const size=h*.74;c.font=`${size}px TrackMarker`;c.textBaseline='middle';c.lineJoin='round';
 const width=c.measureText(text).width,scale=Math.min(1,(w-22)/width);c.save();c.translate(center?w/2:11,h*.48);c.scale(scale,1);c.textAlign=center?'center':'left';
 c.fillStyle='#ffffff';c.fillText(text,0,0);c.restore();

}
import {SECOND_HAND_HITS,SECOND_HAND_SECONDS} from '../second-hand-rules167.mjs';
const names={ollie:'Ollie',kickflip:'Kickflip',shoveit:'Pop shove-it',manual:'Manual',fiftyfifty:'50-50',boardslide:'Boardslide',powerslide:'Powerslide'};
const boardNames={STREET:'ELEMENT',CRUISER:'DOGTOWN',LONGBOARD:'LONGBOARD',HANDMEDOWN:'PINTAIL'};
export function createScoreHud(root){
 const scoreHud=document.createElement('div');scoreHud.id='scoreHud';scoreHud.hidden=true;scoreHud.setAttribute('role','button');scoreHud.tabIndex=0;scoreHud.setAttribute('aria-label','Score. Tap to pause');
 scoreHud.innerHTML='<span class="score-label">SCORE</span><canvas id="scoreReadout" width="200" height="54" aria-hidden="true"></canvas><strong id="scoreValue" class="hud-readable">0</strong><span id="scoreRider"></span><span id="secretSpliffHud" hidden aria-live="polite"><b>Secret Spliff</b><small></small></span>';root.append(scoreHud);
 const trickHud=document.createElement('div');trickHud.id='trickHud';trickHud.hidden=true;trickHud.innerHTML='<canvas id="comboReadout" width="360" height="70" aria-hidden="true"></canvas><strong class="combo-readable hud-readable"></strong><b class="bail-stamp">BAIL</b><span class="trick-names"></span>';root.append(trickHud);
 const balance=document.createElement('div');balance.id='grindBalance';balance.hidden=true;balance.setAttribute('role','meter');balance.setAttribute('aria-label','Grind balance');balance.setAttribute('aria-valuemin','-100');balance.setAttribute('aria-valuemax','100');balance.innerHTML='<span></span><b></b><i></i>';root.append(balance);
 const scoreCanvas=scoreHud.querySelector('canvas'),scoreText=scoreHud.querySelector('#scoreValue'),riderText=scoreHud.querySelector('#scoreRider'),comboCanvas=trickHud.querySelector('canvas'),comboText=trickHud.querySelector('.combo-readable'),trickNames=trickHud.querySelector('.trick-names');let previousScore=-1,previousKey='',previousRider='';
 document.fonts.load('32px TrackMarker').then(()=>{previousScore=-1;previousKey='';});
 return {scoreHud,update(sim,active,selection){
  const secret=scoreHud.querySelector('#secretSpliffHud'),secondRemaining=Math.max(0,(sim.secondHandUntil??0)-sim.time),gravityRemaining=Math.max(0,(sim.secretSpliffUntil??0)-sim.time),puffs=sim.options.rider==='BOSS'&&['riding','coasting'].includes(sim.phase)?sim.spradSmoke?.count??0:0;
  const secondActive=Math.max(0,SECOND_HAND_SECONDS-(sim.time-(sim.secondHandAt??-Infinity)));
  const second=secondRemaining>0||puffs>0;secret.hidden=!active||(!second&&gravityRemaining<=0);secret.querySelector('b').textContent=second?'Second-Hand Smoke':'Secret Spliff';
  scoreHud.style.opacity=String(1-gateExitFade(sim,!active));scoreHud.style.pointerEvents=sim.gateExit?'none':'';scoreHud.classList.toggle('has-secret',!secret.hidden);scoreHud.classList.toggle('has-second-hand',second&&!secret.hidden);
  secret.querySelector('small').textContent=second?(secondRemaining>0?(secondActive>0?`${Math.ceil(secondActive)}s`:'FADING'):`${puffs} / ${SECOND_HAND_HITS}`):gravityRemaining>0?`${Math.round(riderGravity(sim)/9.81*100)}% GRAVITY / ${Math.ceil(gravityRemaining)}s`:'';

  balance.hidden=!active||!sim.rider.grind;if(sim.rider.grind){const b=sim.rider.grind.balance;balance.style.setProperty('--balance',String((b+1)/2));balance.setAttribute('aria-valuenow',String(Math.round(b*100)));balance.setAttribute('aria-valuetext',Math.abs(b)<.15?'Centered':b>0?'Leaning right':'Leaning left');balance.dataset.risk=Math.abs(b)>.7?'high':'low';}scoreHud.hidden=!active;const rider=selection.rider+' / '+boardNames[selection.board];if(rider!==previousRider){riderText.textContent=rider;previousRider=rider;}
  if(sim.score!==previousScore){scoreText.textContent=String(sim.score);numberPaint(scoreCanvas,sim.score.toLocaleString('en-US'));scoreHud.setAttribute('aria-label',`${sim.score} points. Tap to pause`);if(sim.score>previousScore&&previousScore>=0&&!reducedMotion())scoreCanvas.animate([{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:200});previousScore=sim.score;}
  const pending=sim.rider.powerslide;
  const slidePoints=powerslidePoints(pending);
  const preview=slidePoints?{names:['powerslide'],base:slidePoints,multiplier:1}:null;
  const run=sim.combo??preview??(sim.lastCombo&&sim.time-sim.lastCombo.time<2.2?sim.lastCombo:null);trickHud.hidden=!active||!run;
  if(!run){previousKey='';return;}
  const state=run.failed?'bailed':run.value?'banked':'active',text=run.value?String(run.value):`${Math.round(run.base)} × ${run.multiplier}`,label=run.names.map(n=>names[n]??n).join(' + '),key=state+text+label;
  if(key===previousKey)return;const changed=state+label!==trickHud.dataset.event;trickHud.dataset.event=state+label;trickHud.dataset.state=state;trickHud.classList.toggle('bailed',!!run.failed);comboCanvas.hidden=!!run.failed;comboText.textContent=run.failed?'BAIL':text;trickNames.textContent=label;
  if(!run.failed)numberPaint(comboCanvas,text,true);
  if(changed&&!reducedMotion())trickHud.animate([{opacity:.5,translate:'0 5px'},{opacity:1,translate:'0 0'}],{duration:140});previousKey=key;
 }};
}

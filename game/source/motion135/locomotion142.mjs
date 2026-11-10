// Selection follows the shipped THPS4 tricks.qb dispatch; timing/contact are
// adapted to the Track physics. No rendering or asset fetches in this module.
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function landingClip(airtime,crouched=false,variant=0){
 if(airtime<.2)return crouched?'CrouchBumpDown':'IdleBump';
 if(airtime<.5)return 'CrouchBumpDown';
 const n=1+(Math.abs(variant)%3);
 return airtime<.75?`CrouchedLand${n}_small`:`CrouchedLand${n}`;
}
export function grindClips(kind,side=1,stance='REGULAR'){
 if(kind!=='boardslide')return {entry:'Init_FiftyFifty',range:'FiftyFifty_Range',exit:'Init_FiftyFifty',reverseExit:true};
 // side is relative to rail travel; stance mirrors source front/back choice.
 const prefix=side*(stance==='REGULAR'?-1:1)>0?'FSBoardSlide':'BSBoardSlide';
 return {entry:'Init_'+prefix,range:prefix+'_Range',exit:prefix+'_Out',reverseExit:false};
}
export class Locomotion142{
 constructor(clips){this.clips=clips;this.reset();}
 reset(){this.lastTime=-Infinity;this.turnKey='';this.turnAt=0;this.crouched=false;this.crouchAt=-Infinity;this.landingAt=null;this.landingCancelled=false;this.landingVariant=-1;this.exitAt=null;this.exitCancelled=false;}
 duration(name){return this.clips[name]?.duration??this.clips.Idle.duration;}
 sample(sim,h={}){
  const t=sim.time,r=sim.rider;
  if(t<this.lastTime||t-this.lastTime>.75)this.reset();
  const crouched=(h.crouch??0)>.4,changedCrouch=crouched!==this.crouched;
  if(changedCrouch){this.crouchAt=t;this.crouched=crouched;}
  this.lastTime=t;
  const result=(clip,time,kind,extra={})=>({clip,time:clamp(time,0,this.duration(clip)),kind,blend:kind==='air'?.065:kind==='land'?.10:.14,...extra});
  if(r.holding){this.reset();return null;}
  if(r.grind){
   this.turnKey='';this.landingCancelled=true;
   const g=r.grind,bank=grindClips(g.kind,g.side,h.stance),age=Math.max(0,t-g.started),entering=age<this.duration(bank.entry);
   // Target-rig adaptation: the original extreme boardslide arm poses stretch
   // Sally's sweatshirt. Physics keeps its full range; visual pose uses 20-80%.
   const limit=g.kind==='boardslide'?.6:.96;
   const balance=clamp((g.balance??0)*(h.stance==='REGULAR'?-1:1),-limit,limit);
   return result(entering?bank.entry:bank.range,entering?age:(balance+1)*.5*this.duration(bank.range),'grind',{
    blend:entering?.085:.08,grindPhase:entering?'entry':'balance',sourceBalance:balance,grindKind:g.kind,side:g.side,rotateBoard:true
   });
  }
  const exit=r.grindExit,exitAge=exit?t-exit.time:Infinity;
  if(exit&&exit.time!==this.exitAt){this.exitAt=exit.time;this.exitCancelled=false;}
  // A jump/trick, actual touchdown or deliberate ground action supersedes exit.
  const exitInterrupted=(r.trick&&r.trickStart>=exit?.time)||(r.rideLanding&&r.rideLanding.time>=exit?.time)||r.manual||r.pushStart!=null;
  if(exitInterrupted)this.exitCancelled=true;
  if(exit&&exitAge>=0&&exitAge<.4&&!this.exitCancelled){
   this.turnKey='';this.landingCancelled=true;
   const bank=grindClips(exit.kind,exit.side,h.stance),f=exitAge/.4;
   return result(bank.exit,(bank.reverseExit?1-f:f)*this.duration(bank.exit),'grind-exit',{blend:.10,grindPhase:'exit',grindKind:exit.kind,side:exit.side,rotateBoard:true});
  }
  if(r.height>0||r.up>0){
   this.turnKey='';this.landingCancelled=true;
   const clip={kickflip:'KickFlip',shoveit:'PopShoveIt',ollie:'Ollie'}[r.trick]??'AirIdle';
   return result(clip,r.trick?(t-r.trickStart)/Math.max(.01,r.trickDuration)*this.duration(clip):t%this.duration(clip),'air');
  }
  if(r.rideLanding&&r.rideLanding.time!==this.landingAt){
   this.landingAt=r.rideLanding.time;this.landingCancelled=false;this.landingVariant++;
   this.landClip=landingClip(r.rideLanding.airtime??0,crouched,this.landingVariant);
  }
  const landAge=t-(this.landingAt??-Infinity),steer=r.steer??0;
  // Preserve initial absorption, then allow deliberate skating actions to exit.
  if(landAge>=.10&&(r.manual||r.pushStart!=null||Math.abs(steer)>.22||changedCrouch))this.landingCancelled=true;
  if(!this.landingCancelled&&landAge>=0&&landAge<this.duration(this.landClip??'Land')){
   this.turnKey='';return result(this.landClip,landAge,'land');
  }
  if(r.manual){this.turnKey='';return result('Manual_range',.667+clamp(r.lean??0,-.4,.4),'manual');}
  if(r.pushStart!=null){
   this.turnKey='';return result('PushCycle',(t-r.pushStart)/.9*this.duration('PushCycle'),'push');
  }
  // Direction is swapped with stance, just as Flipped swaps source left/right.
  const directional=steer*(h.stance==='REGULAR'?-1:1),magnitude=Math.abs(directional);
  const side=directional<0?'Left':'Right',turnKey=(crouched?'Crouch':'')+'Turn'+side;
  if(magnitude>(this.turnKey===turnKey?.10:.16)){
   if(this.turnKey!==turnKey){this.turnKey=turnKey;this.turnAt=t;}
   const age=t-this.turnAt,entryDuration=this.duration(turnKey),clip=age<entryDuration?turnKey:turnKey+'Idle';
   return result(clip,age<entryDuration?age:(age-entryDuration)%this.duration(clip),'turn',{
    baseClip:crouched?'CrouchIdle':'Idle',weight:clamp((magnitude-.08)/.57,0,1),crouched
   });
  }
  this.turnKey='';
  const age=t-this.crouchAt;
  if(age>=0&&age<this.duration('Crouch'))return result('Crouch',crouched?age:this.duration('Crouch')-age,'crouch');
  const clip=crouched?'CrouchIdle':'Idle';return result(clip,t%this.duration(clip),'idle',{crouched});
 }
}

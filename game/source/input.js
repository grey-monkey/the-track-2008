import {clamp} from './world.js';

// One thumb does everything:
//   drag sideways        carve (a floating stick: the anchor follows a thumb that overshoots)
//   flick up             let go of the rope (on the rope) / ollie or flip (free riding)
//   rest still, centred  crouch; lifting from a crouch pops an ollie
//   drag down            foot brake (free riding only)
//   quick tap            push (free riding only)
//   second finger        grind / manual modifier
export const TOUCH=Object.freeze({
 range:92,          // px of sideways travel for full lock
 deadZone:4,        // px of slop around the anchor
 flickWindow:140,   // ms of recent motion judged for a flick
 flickRise:36,      // px the thumb must rise within that window
 flickSpeed:.30,    // px/ms upward
 flickLock:320,     // ms before another flick can register
 brakeDrop:38,      // px downward for the foot brake
 crouchSteer:.35    // a crouch needs the thumb near centre, so a held carve is never a crouch
});

export class Gestures{
 constructor(actions){this.actions=actions;this.state={steer:0,crouch:false,push:false,brake:false,manual:false};this.pointer=null;this.secondary=null;this.pushUntil=0;}

 down(id,x,y,t){
  if(this.pointer){
   if(this.secondary==null){this.secondary=id;this.pointer.suppressPop=true;this.state.crouch=false;this.state.manual=true;}
   return;
  }
  this.pointer={id,x,y,lastX:x,lastY:y,lastMove:t,t,moved:0,suppressPop:false,flickLock:0,trail:[{x,y,t}]};
 }

 move(id,x,y,t){
  const p=this.pointer;if(!p||id!==p.id)return;
  p.moved=Math.max(p.moved,Math.hypot(x-p.x,y-p.y));
  p.trail.push({x,y,t});while(p.trail.length>2&&t-p.trail[0].t>TOUCH.flickWindow)p.trail.shift();

  // A flick is judged on the last moments of motion, not on the whole touch, so it
  // works just as well at the end of a long held carve as from a fresh touch.
  const from=p.trail[0],rise=from.y-y,across=x-from.x,speed=rise/Math.max(16,t-from.t),holding=this.actions.isHolding();
  // On the rope the flick must be clearly vertical, so starting a carve on a diagonal never lets go.
  const vertical=Math.abs(across)*(holding?1.1:.65);
  if(this.secondary==null&&t>=p.flickLock&&rise>TOUCH.flickRise&&speed>TOUCH.flickSpeed&&rise>vertical){
   p.suppressPop=true;p.flickLock=t+TOUCH.flickLock;
   if(holding)this.actions.release();else if(Math.abs(across)>36)this.actions.trick(across>0?'kickflip':'shoveit');else this.actions.ollie();
   // Re-anchor where the flick ended: the same thumb goes straight back to steering.
   p.x=x;p.y=y;p.lastX=x;p.lastY=y;p.lastMove=t;p.trail=[{x,y,t}];
   this.state.steer=0;this.state.crouch=false;this.state.brake=false;return;
  }

  if(Math.hypot(x-p.lastX,y-p.lastY)>2)p.lastMove=t;p.lastX=x;p.lastY=y;
  // Floating stick: a thumb that travels past full lock drags the anchor with it,
  // so reversing the carve answers immediately instead of after a long return.
  let dx=x-p.x;if(Math.abs(dx)>TOUCH.range){p.x=x-Math.sign(dx)*TOUCH.range;dx=x-p.x;}
  const dy=y-p.y;
  this.state.brake=!holding&&dy>TOUCH.brakeDrop&&dy>Math.abs(dx)*1.2;
  const reach=Math.abs(dx)-TOUCH.deadZone;
  this.state.steer=this.state.brake||reach<=0?0:clamp(Math.sign(dx)*reach/(TOUCH.range-TOUCH.deadZone),-1,1);
  if(this.state.brake){p.suppressPop=true;this.state.crouch=false;}
 }

 tick(t){
  const p=this.pointer;this.state.push=t<this.pushUntil;
  if(p)this.state.crouch=!p.suppressPop&&this.secondary==null&&!this.state.brake&&t-p.t>180&&t-p.lastMove>130&&Math.abs(this.state.steer)<TOUCH.crouchSteer;
 }

 up(id,t){
  if(id===this.secondary){this.secondary=null;this.state.manual=false;return;}
  const p=this.pointer;if(!p||p.id!==id)return;
  if(this.state.crouch&&!p.suppressPop)this.actions.ollie();
  else if(!p.suppressPop&&p.moved<14&&t-p.t<230&&!this.actions.isHolding())this.pushUntil=t+180;
  this.pointer=null;this.secondary=null;this.state.steer=0;this.state.crouch=false;this.state.brake=false;this.state.manual=false;
 }

 cancel(id){if(this.pointer?.id===id||this.secondary===id)this.reset();}
 reset(){this.pointer=null;this.secondary=null;this.pushUntil=0;for(const key of Object.keys(this.state))this.state[key]=key==='steer'?0:false;}
}

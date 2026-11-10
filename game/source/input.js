import {clamp} from './world.js';
export class Gestures{
 constructor(actions){this.actions=actions;this.state={steer:0,crouch:false,push:false,brake:false,manual:false};this.pointer=null;this.secondary=null;this.pushUntil=0;}
 down(id,x,y,t){if(this.pointer){if(this.secondary==null){this.secondary=id;if(this.pointer.stroke){this.pointer.x=this.pointer.lastX;this.pointer.y=this.pointer.lastY;this.pointer.stroke=false;}this.pointer.suppressPop=true;this.state.crouch=false;this.state.manual=true;}return;}this.pointer={id,x,y,lastX:x,lastY:y,lastMove:t,t,moved:0,suppressPop:false,stroke:false};}
 move(id,x,y,t){const p=this.pointer;if(!p||id!==p.id)return;const dx=x-p.x,dy=y-p.y,elapsed=Math.max(1,t-p.t);p.moved=Math.max(p.moved,Math.hypot(dx,dy));
  if(this.secondary==null&&!p.stroke&&dy<-42&&-dy/elapsed>.30&&Math.abs(dy)>Math.abs(dx)*.65){
   p.stroke=true;p.suppressPop=true;p.lastX=x;p.lastY=y;
   if(this.actions.isHolding())this.actions.release();else if(Math.abs(dx)>36)this.actions.trick(dx>0?'kickflip':'shoveit');else this.actions.ollie();
   this.state.steer=0;this.state.crouch=false;return;
  }
  if(p.stroke)return;
  if(Math.hypot(x-p.lastX,y-p.lastY)>2)p.lastMove=t;p.lastX=x;p.lastY=y;
  this.state.brake=dy>38&&dy>Math.abs(dx)*1.2;this.state.steer=this.state.brake?0:clamp(dx/95,-1,1);if(this.state.brake){p.suppressPop=true;this.state.crouch=false;}
 }
 tick(t){const p=this.pointer;this.state.push=t<this.pushUntil;if(p)this.state.crouch=!p.suppressPop&&this.secondary==null&&!this.state.brake&&t-p.t>180&&t-p.lastMove>130;}
 up(id,t){if(id===this.secondary){this.secondary=null;this.state.manual=false;return;}const p=this.pointer;if(!p||p.id!==id)return;
  if(this.state.crouch&&!p.suppressPop)this.actions.ollie();else if(!p.suppressPop&&p.moved<14&&t-p.t<230&&!this.actions.isHolding())this.pushUntil=t+180;
  this.pointer=null;this.secondary=null;this.state.steer=0;this.state.crouch=false;this.state.brake=false;this.state.manual=false;
 }
 cancel(id){if(this.pointer?.id===id||this.secondary===id)this.reset();}
 reset(){this.pointer=null;this.secondary=null;this.pushUntil=0;for(const key of Object.keys(this.state))this.state[key]=key==='steer'?0:false;}
}

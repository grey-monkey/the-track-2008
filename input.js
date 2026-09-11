import {clamp} from './world.js';
export class Gestures {
 constructor(actions){this.actions=actions;this.state={steer:0,crouch:false};this.pointer=null;this.space=false;}
 down(id,x,y,t){if(this.pointer)return;this.pointer={id,x,y,lastX:x,lastY:y,lastMove:t,t,samples:[{x,y,t}],released:false};}
 move(id,x,y,t){const p=this.pointer;if(!p||id!==p.id)return;const dx=x-p.x;p.samples.push({x,y,t});p.samples=p.samples.filter(s=>t-s.t<=160);const first=p.samples[0],dy=y-first.y,sx=x-first.x,elapsed=Math.max(1,t-first.t);
  if(!p.released&&dy<-42&&Math.abs(dy)>Math.abs(sx)*1.25&&-dy/elapsed>.38){p.released=true;this.actions.release();this.reset();return;}
  if(Math.hypot(x-p.lastX,y-p.lastY)>2)p.lastMove=t;p.lastX=x;p.lastY=y;this.state.steer=clamp(dx/95,-1,1);
 }
 tick(t){if(this.pointer)this.state.crouch=t-this.pointer.t>180&&t-this.pointer.lastMove>130;}
 up(id,t){if(this.pointer?.id!==id)return;if(this.state.crouch&&!this.pointer.released)this.actions.ollie();this.reset();}
 cancel(id){if(this.pointer?.id===id)this.reset();}
 reset(){this.pointer=null;this.state.steer=0;this.state.crouch=false;this.space=false;}
}

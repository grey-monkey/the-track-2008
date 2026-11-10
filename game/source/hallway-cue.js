// Two quiet events per page session: first return, then first new pass at full night.
export class HallwayCue {
 constructor(){this.state='waiting';this.elapsed=0;this.level=0;this.wasVisible=false;this.nightReached=false;this.nightPlayed=false;this.blockedNightPass=null;}
 update(dt,{active,returned,visible,fullNight=false,pass=0}){
  if(!active)return this.level;
  const entered=visible&&!this.wasVisible;this.wasVisible=visible;
  if(fullNight&&!this.nightReached){this.nightReached=true;if(visible&&!entered)this.blockedNightPass=pass;}
  const first=this.state==='waiting'&&returned&&visible;
  const repeat=this.state==='done'&&returned&&fullNight&&!this.nightPlayed&&entered&&pass!==this.blockedNightPass;
  if(first||repeat){this.state='delay';this.elapsed=0;if(fullNight)this.nightPlayed=true;return this.level=0;}
  if(this.state==='waiting'||this.state==='done')return this.level=0;
  this.elapsed+=Math.max(0,Math.min(dt,.1));
  if(this.state==='delay'&&this.elapsed>=1.5){this.elapsed-=1.5;this.state='lit';}
  if(this.state==='lit'){
   if(this.elapsed>=2){this.state='done';return this.level=0;}
   this.level=Math.min(1,this.elapsed/.10,(2-this.elapsed)/.12);
  }
  return this.level;
 }
}


import * as T from './vendor/three.module.js';
import {secretGlow} from './secret-spliff149.mjs';
// Sparse world-space glints; depth-tested so they cannot shine through a rider
// or obstacle. The warm grade lives in the existing scene-only finish pass.
export function installSecretGold(view){
 const root=new T.Group();root.name='Secret golden glints';view.scene.add(root);
 const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const ctx=canvas.getContext('2d');
 const halo=ctx.createRadialGradient(32,32,0,32,32,27);halo.addColorStop(0,'rgba(255,244,199,.9)');halo.addColorStop(.16,'rgba(255,226,153,.45)');halo.addColorStop(1,'rgba(255,216,131,0)');ctx.fillStyle=halo;ctx.fillRect(0,0,64,64);
 ctx.fillStyle='rgba(255,246,214,.8)';ctx.beginPath();ctx.moveTo(32,13);ctx.lineTo(34,30);ctx.lineTo(45,32);ctx.lineTo(34,34);ctx.lineTo(32,51);ctx.lineTo(30,34);ctx.lineTo(19,32);ctx.lineTo(30,30);ctx.closePath();ctx.fill();
 const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;
 for(let i=0;i<18;i++){
  const mat=new T.SpriteMaterial({map,color:0xffe5a3,transparent:true,opacity:0,depthWrite:false,depthTest:true,blending:T.AdditiveBlending});
  const sprite=new T.Sprite(mat);sprite.scale.setScalar(.09+(i%4)*.018);root.add(sprite);
 }
 const draw=view.draw;view.draw=function(sim,...args){
  const strength=secretGlow(sim,args[2]);root.visible=strength>0;
  if(root.visible){const r=sim.rider,age=sim.time-sim.secretSpliffAt,y=(r.groundY??this.hazards.skateHeight(r.x,r.z))+(r.height??0);
   root.position.set(r.x,y,r.z);
   root.children.forEach((s,i)=>{const angle=i*2.399963,rad=1.6+(i%5)*.65;
    s.position.set(Math.cos(angle+age*.025)*rad,.3+(i*.71+age*.12)%3.8,Math.sin(angle+age*.025)*rad);
    const pulse=Math.pow(Math.max(0,Math.sin(age*1.5+i*1.73)),6);s.material.opacity=strength*(.025+.24*pulse);
   });
  }
  return draw.call(this,sim,...args);
 };
 view.secretGoldenGlints=root;
}

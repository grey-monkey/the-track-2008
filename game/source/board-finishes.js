import * as T from './vendor/three.module.js';
// Small code-authored deck prints, referenced against Element Section and Dogtown Cross.
const prints=new Map();
export function deckPrint(key){
 if(prints.has(key))return prints.get(key);
 const canvas=document.createElement('canvas');canvas.width=256;canvas.height=1024;
 const c=canvas.getContext('2d');c.fillStyle=key==='CRUISER'?'#b37743':'#161719';c.fillRect(0,0,256,1024);
 if(key==='LONGBOARD'){
  c.fillStyle='#b98c50';c.fillRect(0,0,256,1024);
  // Narrow laminated bamboo strips and fine longitudinal fibers.
  for(let x=0,i=0;x<256;x+=11,i++){
   c.fillStyle=['#bc9258','#b68a4d','#c1985e','#b98e52','#be9559'][i%5];c.fillRect(x,0,11,1024);
   c.fillStyle='rgba(87,56,24,.19)';c.fillRect(x,0,1,1024);
   for(let f=2;f<11;f+=2){c.strokeStyle=`rgba(91,58,25,${.05+((i+f)%3)*.025})`;c.lineWidth=.65;c.beginPath();c.moveTo(x+f,0);c.bezierCurveTo(x+f+.7,310,x+f-.6,700,x+f,1024);c.stroke();}
   const joint=180+(i*173)%640;c.fillStyle='rgba(87,56,24,.10)';c.fillRect(x+1,joint,9,1);
  }
 }else if(key==='STREET'){
  c.fillStyle='#bb100b';c.fillRect(0,0,256,350);
  c.save();c.translate(128,205);c.strokeStyle='#f5eedf';c.lineWidth=10;
  c.beginPath();c.arc(0,0,71,0,Math.PI*2);c.stroke();
  c.lineWidth=13;for(let i=0;i<4;i++){c.beginPath();c.arc(0,0,92,i*Math.PI/2+.09,(i+1)*Math.PI/2-.09);c.stroke();}
  c.fillStyle='#f5eedf';c.beginPath();c.moveTo(0,-57);c.lineTo(-34,-14);c.lineTo(-18,-14);c.lineTo(-47,20);c.lineTo(-20,20);c.lineTo(-55,45);c.lineTo(-9,45);c.lineTo(-9,60);c.lineTo(9,60);c.lineTo(9,45);c.lineTo(55,45);c.lineTo(20,20);c.lineTo(47,20);c.lineTo(18,-14);c.lineTo(34,-14);c.closePath();c.fill();c.restore();
  c.save();c.translate(178,365);c.rotate(Math.PI/2);c.fillStyle='#f5eedf';c.font='bold 104px Georgia,serif';c.fillText('Element',0,0,565);c.restore();
  c.save();c.fillStyle='#d1c7af';c.fillRect(0,350,64,674);c.translate(24,375);c.rotate(Math.PI/2);c.fillStyle='#a31826';c.font='24px Georgia,serif';c.fillText('wind · water · fire · earth',0,0,530);c.restore();
 }else if(key==='CRUISER'){
  // Stained wood remains visible around the vintage cross and fan rays.
  c.strokeStyle='rgba(62,32,15,.12)';c.lineWidth=1;
  for(let x=5;x<256;x+=9){c.beginPath();c.moveTo(x,0);c.bezierCurveTo(x+9,340,x-8,640,x+3,1024);c.stroke();}
  for(let i=0;i<16;i++){const angle=i*Math.PI/8;c.save();c.translate(128,510);c.rotate(angle);c.fillStyle=i%2?'#bc2931':'#25283e';c.beginPath();c.moveTo(-5,0);c.lineTo(-14,230);c.lineTo(14,230);c.lineTo(5,0);c.fill();c.restore();}
  const cross=new Path2D('M80 295 L176 295 L174 444 L248 430 L248 555 L174 544 L186 746 L70 746 L82 544 L8 555 L8 430 L82 444 Z');
  c.strokeStyle='#202333';c.lineWidth=28;c.stroke(cross);c.strokeStyle='#eee1c4';c.lineWidth=15;c.stroke(cross);c.fillStyle='#b6202c';c.fill(cross);
  c.fillStyle='#f6ead2';c.textAlign='center';c.textBaseline='middle';c.font='bold 69px "Old English Text MT",Georgia,serif';
  c.fillText('T',128,377);c.fillText('DOG',128,490,225);c.fillText('W',128,586);c.fillText('N',128,681);
 }
 const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;prints.set(key,map);return map;
}

import * as T from './vendor/three.module.js';
import {paintedMaterial} from './pigment.js';
export function installSecretSpliff(view){
 const rows=view.pathRows149,half=rows.at(-1).s/2;let i=rows.findIndex(r=>r.s>=half),a=rows[i-1],b=rows[i],t=(half-a.s)/(b.s-a.s),x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t,y=view.hazards.skateHeight(x,z);
 view.hazards.secretSpliff={x,y,z,station:half};
 const root=new T.Group();root.name='Secret Spliff pickup';view.scene.add(root);const roll=new T.Group();roll.rotation.z=-Math.PI*.32;root.add(roll);
 const paper=paintedMaterial(0xe6dfc8),seam=paintedMaterial(0xbdb29a),tip=paintedMaterial(0xd1bc91);
 const sheet=document.createElement('canvas');sheet.width=128;sheet.height=512;const ink=sheet.getContext('2d');ink.fillStyle='#e6dfcd';ink.fillRect(0,0,128,512);
 let seed=150;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<2300;i++){ink.fillStyle=`rgba(110,91,60,${.015+random()*.06})`;ink.fillRect(random()*128,random()*512,1,1+random()*4);}
 for(let i=0;i<28;i++){const x=random()*128,y=random()*512;ink.strokeStyle='rgba(121,104,77,.12)';ink.lineWidth=.6+random();ink.beginPath();ink.moveTo(x,y);ink.lineTo(x+5+random()*13,y+13+random()*24);ink.stroke();}
 ink.fillStyle='rgba(140,118,83,.17)';ink.fillRect(1,0,4,512);paper.map=new T.CanvasTexture(sheet);paper.map.colorSpace=T.SRGBColorSpace;
 function piece(geo,mat,yy){const m=new T.Mesh(geo,mat);m.position.y=yy;roll.add(m);return m;}
 // A lumpy tapered paper roll with a crimped, twisted closed end. Unlit.
 const rings=[[-.87,.071],[-.72,.084],[-.52,.105],[-.29,.121],[-.04,.143],[.18,.158],[.41,.169],[.61,.153],[.73,.111],[.82,.038],[.94,.013]],vertices=[],indices=[];
 const ringPoint=(j,k)=>{const [yy,radius]=rings[j],a=k/12*Math.PI*2+j*.09,wrinkle=1+.065*Math.sin(k*2.3+j*1.7)+.04*Math.cos(k*4-j*2);return [Math.cos(a)*radius*wrinkle+.013*Math.sin(j*.7),yy,Math.sin(a)*radius*wrinkle+.008*Math.cos(j*1.2)];};
 for(let j=0;j<rings.length;j++)for(let k=0;k<12;k++)vertices.push(...ringPoint(j,k));
 for(let j=0;j<rings.length-1;j++)for(let k=0;k<12;k++){const a=j*12+k,b=j*12+(k+1)%12,c=a+12,d=b+12;indices.push(a,c,b,b,c,d);}
 for(let k=1;k<11;k++)indices.push(0,k+1,k,(rings.length-1)*12,(rings.length-1)*12+k,(rings.length-1)*12+k+1);
 const uv=[];for(let j=0;j<rings.length;j++)for(let k=0;k<12;k++)uv.push(k/12,j/(rings.length-1));
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();piece(geo,paper,0).name='creased hand-rolled paper';
 const overlap=[];for(let j=0;j<rings.length;j++){const p=new T.Vector3(...ringPoint(j,3));p.x*=1.015;p.z*=1.015;overlap.push(p);}
 piece(new T.TubeGeometry(new T.CatmullRomCurve3(overlap),28,.003,3,false),seam,0).name='paper overlap';
 const crutch=piece(new T.CylinderGeometry(.070,.067,.15,10),tip,-.89);crutch.name='rolled paper crutch';
 const opening=piece(new T.RingGeometry(.039,.061,10),seam,-.969);opening.rotation.x=Math.PI/2;
 const motes=new T.Group();root.add(motes);for(let k=0;k<3;k++){const m=new T.Mesh(new T.OctahedronGeometry(.035),new T.MeshBasicMaterial({color:0xd6be80,transparent:true,opacity:.5}));m.position.set(Math.cos(k*2.094)*.5,.25+k*.16,Math.sin(k*2.094)*.5);motes.add(m);}
 const draw=view.draw;view.draw=function(sim,...args){const menu=args[2];root.visible=!menu&&!sim.secretSpliffCollected&&['riding','coasting'].includes(sim.phase);root.position.set(x,y+1.45+Math.sin(sim.time*1.8)*.10,z);root.rotation.y=sim.time*.85;motes.rotation.y=-sim.time*.7;return draw.call(this,sim,...args);};
 view.secretSpliffMesh=root;
}

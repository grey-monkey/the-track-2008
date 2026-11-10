import * as T from '../vendor/three.module.js';
import {paintedMaterial} from '../pigment.js';
import {height} from '../world.js';
export function plateMaterial(){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=256;const c=canvas.getContext('2d');
 c.fillStyle='#adaf9d';c.fillRect(0,0,512,256);const sky=c.createLinearGradient(0,0,0,256);sky.addColorStop(0,'#8faaba');sky.addColorStop(.62,'#c0c4b7');sky.addColorStop(1,'#aaa58c');c.fillStyle=sky;c.fillRect(8,8,496,240);
 c.strokeStyle='#7f887f';c.lineWidth=3;c.strokeRect(8,8,496,240);
 // Small, quiet Wright Flyer silhouette, drawn as part of the plate print.
 c.save();c.translate(342,82);c.rotate(-.08);c.strokeStyle='#7999ab';c.lineWidth=4;for(const y of [-10,10]){c.beginPath();c.moveTo(-105,y);c.lineTo(100,y);c.stroke();}for(const x of [-75,-35,5,45,85]){c.beginPath();c.moveTo(x,-10);c.lineTo(x+7,10);c.stroke();}c.beginPath();c.moveTo(-105,10);c.lineTo(-126,24);c.lineTo(-82,24);c.moveTo(-20,10);c.lineTo(80,25);c.stroke();c.restore();
 c.textAlign='center';c.fillStyle='#092c57';c.font='italic 27px Georgia';c.fillText('First in Flight',256,42);c.font='bold 83px Arial';c.fillText('5330-LRD',256,167,465);c.font='bold 29px Arial';c.fillText('NORTH CAROLINA',256,224);
 c.fillStyle='#aaa579';c.fillRect(29,49,46,24);c.fillStyle='#41443d';c.font='bold 17px Arial';c.fillText('08',52,67);
 for(const x of [100,412])for(const y of [20,235]){c.fillStyle='#596168';c.beginPath();c.ellipse(x,y,5,3,0,0,7);c.fill();}
 const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=2;
 const material=paintedMaterial(0xaeb6b6);material.map=texture;material.name='NC First in Flight 5330-LRD';return material;
}
function ropeMaterial(){const canvas=document.createElement('canvas');canvas.width=64;canvas.height=64;const c=canvas.getContext('2d');c.fillStyle='#c0baa8';c.fillRect(0,0,64,64);for(let i=-64;i<128;i+=12){c.strokeStyle='#ded6c1';c.lineWidth=4;c.beginPath();c.moveTo(i,0);c.lineTo(i+64,64);c.stroke();c.strokeStyle='#aaa18c';c.lineWidth=2;c.beginPath();c.moveTo(i+6,0);c.lineTo(i-58,64);c.stroke();}const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;const m=paintedMaterial(0xf0eadc);m.map=map;m.name='Weathered braided tow rope';return m;}
export function updateRope(view){
 if(!view.towTube){const n=33,sides=6,g=new T.BufferGeometry(),pos=new Float32Array(n*sides*3),normal=new Float32Array(pos.length),uv=new Float32Array(n*sides*2),index=[];for(let i=0;i<n;i++)for(let j=0;j<sides;j++){uv[(i*sides+j)*2]=i*.7;uv[(i*sides+j)*2+1]=j/sides;if(i<n-1){const a=i*sides+j,b=i*sides+(j+1)%sides;index.push(a,b,a+sides,b,b+sides,a+sides);}}g.setIndex(index);g.setAttribute('position',new T.BufferAttribute(pos,3).setUsage(T.DynamicDrawUsage));g.setAttribute('normal',new T.BufferAttribute(normal,3).setUsage(T.DynamicDrawUsage));g.setAttribute('uv',new T.BufferAttribute(uv,2));view.towTube=new T.Mesh(g,ropeMaterial());view.towTube.frustumCulled=false;view.towTube.userData.memoryCaster=false;view.scene.add(view.towTube);
 const sg=new T.BufferGeometry(),sp=new Float32Array(33*6),colors=new Float32Array(33*8),si=[];for(let i=0;i<32;i++)si.push(i*2,i*2+1,i*2+2,i*2+1,i*2+3,i*2+2);sg.setIndex(si);sg.setAttribute('position',new T.BufferAttribute(sp,3));sg.setAttribute('color',new T.BufferAttribute(colors,4));view.towShade=new T.Mesh(sg,new T.MeshBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1}));view.towShade.frustumCulled=false;view.scene.add(view.towShade);
 }
 if(view.coil&&view.coil.material!==view.towTube.material){view.coil.material=view.towTube.material;}
 const visible=view.rope.visible;view.rope.visible=false;view.towTube.visible=view.towShade.visible=visible;if(!visible)return;
 const p=view.ropePositions,g=view.towTube.geometry,a=g.attributes.position.array,n=g.attributes.normal.array,sp=view.towShade.geometry.attributes.position.array,col=view.towShade.geometry.attributes.color.array;
 for(let i=0;i<33;i++){const before=Math.max(0,i-1)*3,after=Math.min(32,i+1)*3,dx=p[after]-p[before],dy=p[after+1]-p[before+1],dz=p[after+2]-p[before+2],len=Math.hypot(dx,dy,dz)||1,tx=dx/len,ty=dy/len,tz=dz/len,side=Math.hypot(tx,tz)||1,nx=-tz/side,nz=tx/side,bx=ty*nz,by=tz*nx-tx*nz,bz=-ty*nx;
  for(let j=0;j<6;j++){const angle=j*Math.PI/3,co=Math.cos(angle),sn=Math.sin(angle),x=nx*co+bx*sn,y=by*sn,z=nz*co+bz*sn,k=(i*6+j)*3;a[k]=p[i*3]+x*.006;a[k+1]=p[i*3+1]+y*.006;a[k+2]=p[i*3+2]+z*.006;n[k]=x;n[k+1]=y;n[k+2]=z;}
  const ground=view.surfaceGround?.(p[i*3],p[i*3+2])??height(p[i*3],p[i*3+2]),lift=Math.max(0,p[i*3+1]-ground),opacity=.16*Math.exp(-lift*3);for(let j=0;j<2;j++){const k=(i*2+j)*3,sign=j?1:-1;sp[k]=p[i*3]+nx*.025*sign;sp[k+1]=ground+.012;sp[k+2]=p[i*3+2]+nz*.025*sign;col[(i*2+j)*4]=.12;col[(i*2+j)*4+1]=.10;col[(i*2+j)*4+2]=.16;col[(i*2+j)*4+3]=opacity;}
 }g.attributes.position.needsUpdate=g.attributes.normal.needsUpdate=true;view.towShade.geometry.attributes.position.needsUpdate=view.towShade.geometry.attributes.color.needsUpdate=true;
}

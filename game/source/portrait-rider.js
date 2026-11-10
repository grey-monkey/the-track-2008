import {hideCoveredCalves} from './clothing70.js';
import {hairSheenFunctions,hairSheenLighting} from './hair-sheen.js?rev=72';
import * as T from './vendor/three.module.js';
import {StandingRider} from './standing-rider.js?rev=59d';
import {portraits} from './portrait-head-data.js?rev=59d';
import {beanie} from './beanie-study-data.js';
const knitMap=await new T.TextureLoader().loadAsync('./assets/sprad-knit-source.png');knitMap.colorSpace=T.SRGBColorSpace;
import {paintedMaterial} from './pigment.js';
export class PortraitRider extends StandingRider{
 constructor(name){super(name);const d=portraits[name];this.smoothEyeAmount={value:0};this.smoothCheeks=[];
  for(const mesh of this.bodyMeshes){
   const role=mesh.geometry===this.bodyMeshes[0].geometry?'skin':mesh===this.bodyMeshes[1]?'eyes':null;
   if(!role)continue;
   const g=mesh.geometry.clone();g.setAttribute('faceCoord',g.attributes.position.clone());g.setAttribute('position',new T.Float32BufferAttribute(d.positions[role],3));if(name==='DOG'&&role==='skin'){const a=g.attributes.position,f=g.attributes.faceCoord;for(let i=0;i<a.count;i++)a.setX(i,a.getX(i)*(1+.035*T.MathUtils.smoothstep(f.getY(i),1.620,1.675)));}g.computeVertexNormals();g.computeBoundingSphere();mesh.geometry=g;
   if(role==='eyes'){mesh.visible=false;continue;}hideCoveredCalves(g,name,g.attributes.faceCoord.array);
   const m=mesh.material,prior=m.onBeforeCompile,key=m.customProgramCacheKey;
   m.customProgramCacheKey=()=>key()+'portrait-original-skin58-clean14-'+name;
   m.onBeforeCompile=s=>{prior(s);s.uniforms.smoothEyeAmount=this.smoothEyeAmount;s.uniforms.smoothCheekLeft={value:this.smoothCheeks[0]};s.uniforms.smoothCheekRight={value:this.smoothCheeks[1]};s.vertexShader='attribute vec3 faceCoord;varying vec3 faceLocal;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nfaceLocal=faceCoord;');s.fragmentShader='uniform float smoothEyeAmount;uniform vec2 smoothCheekLeft;uniform vec2 smoothCheekRight;varying vec3 faceLocal;\n'+s.fragmentShader;
    s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
    float orbitalRadius=length(vec2((abs(faceLocal.x)-.029)/.028,(faceLocal.y-1.619)/.026));float eyeBlend=(1.-smoothstep(.85,1.3,orbitalRadius))*smoothstep(.085,.105,faceLocal.z)*smoothEyeAmount;
    diffuseColor.rgb=mix(diffuseColor.rgb,texture2D(map,faceLocal.x<0.?smoothCheekLeft:smoothCheekRight).rgb,eyeBlend);
    float socketShade=pow(max(0.,1.-length(vec2((abs(faceLocal.x)-.029)/.024,(faceLocal.y-1.619)/.020))),2.);diffuseColor.rgb*=1.-.16*socketShade*smoothEyeAmount;
    diffuseColor.rgb*=mix(1.,${name==='DOG'?'.97':name==='SPRAD'?'1.015':'1.'},smoothstep(1.43,1.48,faceLocal.y));
    ${name==='SPRAD'?`float hairEdge=mix(1.620,1.663,smoothstep(.075,.135,faceLocal.z));float earField=pow((faceLocal.y-1.597)/.032,2.)+pow((faceLocal.z-.045)/.021,2.);float earMask=(1.-smoothstep(.85,1.06,earField))*smoothstep(.060,.072,abs(faceLocal.x));float hairBacking=smoothstep(hairEdge-.003,hairEdge+.003,faceLocal.y)*(1.-earMask);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.307,.223,.119),hairBacking);`:''}
    ${name==='DOG'?`float cropFront=smoothstep(.025,.13,faceLocal.z);float nape=1.544+.017*pow(clamp(abs(faceLocal.x)/.065,0.,1.),1.5);float cropEdge=mix(nape,1.681,cropFront);float edgeSoftness=mix(.004,.002,cropFront);float cropped=smoothstep(cropEdge-edgeSoftness,cropEdge+edgeSoftness,faceLocal.y);float earField=pow((faceLocal.y-1.597)/.032,2.)+pow((faceLocal.z-.045)/.021,2.);float earMask=(1.-smoothstep(.85,1.06,earField))*smoothstep(.060,.072,abs(faceLocal.x));cropped*=1.-earMask;diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.023,.015,.009)*(1.+.14*sin(faceLocal.x*2300.)*sin(faceLocal.y*1900.)*sin(faceLocal.z*1700.)),cropped);`:''}
    `);
   };
  }
  // Shallow concave skin patches behind the eyelid openings; no eye spheres or eye texture.
  for(const sign of [-1,1]){
   const original=this.bodyMeshes[0].geometry.attributes.faceCoord,uv=this.bodyMeshes[0].geometry.attributes.uv;
   let near=0,dist=Infinity;for(let i=0;i<original.count;i++){const q=(original.getX(i)-sign*.045)**2+(original.getY(i)-1.593)**2+(original.getZ(i)-.14)**2;if(q<dist){dist=q;near=i;}}
   this.smoothCheeks.push(new T.Vector2(uv.getX(near),uv.getY(near)));const ep=d.positions.eyes;let lo=Infinity,hi=-Infinity,yl=Infinity,yh=-Infinity,zmax=-Infinity;for(let i=0;i<ep.length;i+=3)if(ep[i]*sign>0){lo=Math.min(lo,ep[i]);hi=Math.max(hi,ep[i]);yl=Math.min(yl,ep[i+1]);yh=Math.max(yh,ep[i+1]);zmax=Math.max(zmax,ep[i+2]);}
   const cx=(lo+hi)/2,cy=(yl+yh)/2,rx=(hi-lo)*.56,ry=(yh-yl)*.57,positions=[],uvs=[],indices=[];
   for(let j=0;j<=8;j++)for(let i=0;i<=40;i++){const r=j/8,t=i/40*Math.PI*2;positions.push(cx+rx*r*Math.cos(t),cy+ry*r*Math.sin(t),zmax-.014+.004*r*r-.018*T.MathUtils.smoothstep(Math.abs(cx+rx*r*Math.cos(t)),.031,.050));uvs.push(uv.getX(near)+.004*r*Math.cos(t),uv.getY(near)+.004*r*Math.sin(t));}
   for(let j=0;j<8;j++)for(let i=0;i<40;i++){const k=j*41+i;indices.push(k,k+41,k+1,k+1,k+41,k+42);}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('faceCoord',g.attributes.position.clone());g.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();const cavity=new T.Mesh(g,this.bodyMeshes[0].material);cavity.name='skin socket';this.add(cavity);
  }
  // Fitted, decimated cloth scan replaces the sphere/cylinder placeholder.
  if(name==='SPRAD'){
   const old=this.children.find(x=>x.isMesh&&!this.bodyMeshes.includes(x)&&x.name!=='skin socket');if(old)this.remove(old);
   const g=new T.BufferGeometry();for(const k of ['position','normal','uv'])g.setAttribute(k,new T.Float32BufferAttribute(beanie[k],k==='uv'?2:3));
   const m=this.accessoryMaterial(0xffffff);m.map=knitMap;const prior=m.onBeforeCompile;
   m.customProgramCacheKey=()=> 'sprad-scanned-purple-knit-11';m.onBeforeCompile=sh=>{prior(sh);sh.fragmentShader=sh.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
   float yarn=dot(diffuseColor.rgb,vec3(.299,.587,.114));diffuseColor.rgb=vec3(.135,.065,.175)*clamp(pow(max(yarn,.0001),.45)*4.,.30,1.75);
   `);};// Tilt backward around the opening, exposing forehead and fringe.
   g.translate(0,-1.675,-.045);g.rotateY(-Math.PI/2);g.scale(.185/.231*1.020,1.005,.231/.185*1.020);g.rotateX(-.30);g.translate(0,1.679,.035);g.computeBoundingSphere();
   const hat=new T.Mesh(g,m);hat.name='scanned purple beanie';hat.userData.memoryCaster=true;this.add(hat);
  }
  for(const source of d.extra){if(name==='DOG'&&source.role==='hair')continue;let part=source;if(name==='SPRAD'&&part.role==='hair'){part={...source,position:source.position.slice()};for(let i=0;i<part.position.length;i+=3){const y=part.position[i+1];if(y>1.679){const t=T.MathUtils.smoothstep(y,1.679,1.692);part.position[i]*=1-.28*t;part.position[i+1]=1.679+(y-1.679)*.12;part.position[i+2]=.045+(part.position[i+2]-.045)*(1-.28*t);}}}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(part.position,3));g.setAttribute('normal',new T.Float32BufferAttribute(part.normal,3));const colors=[];for(let i=0;i<part.color.length;i+=3){const c=new T.Color().setRGB(...part.color.slice(i,i+3),T.SRGBColorSpace);colors.push(c.r,c.g,c.b);}g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.computeBoundingSphere();const m=this.accessoryMaterial(0xffffff,part.role==='hair');m.vertexColors=true;const hair=new T.Mesh(g,m);hair.name=part.role;hair.userData.memoryCaster=true;this.add(hair);}
  if(name==='SPRAD'){
   for(const child of this.children)if(child.name==='glasses')child.position.y-=.003;
   const hat=this.children.find(x=>x.name==='scanned purple beanie'),h=hat.geometry.attributes.position,bins=new Array(72).fill(Infinity);
   const bin=(x,z)=>Math.floor(((Math.atan2(x,z-.045)+Math.PI)/(Math.PI*2))*72)%72;
   for(let i=0;i<h.count;i++)if(Math.hypot(h.getX(i),h.getZ(i)-.045)>.058){const k=bin(h.getX(i),h.getZ(i));bins[k]=Math.min(bins[k],h.getY(i));}
   for(const child of this.children)if(child.name==='hair'){const a=child.geometry.attributes.position;for(let i=0;i<a.count;i++){const x=a.getX(i),y=a.getY(i),z=a.getZ(i),k=bin(x,z),edge=Math.min(bins[k],bins[(k+71)%72],bins[(k+1)%72]);if(y>edge+.006){const tuck=T.MathUtils.smoothstep(y,edge+.006,edge+.025);a.setXYZ(i,x*(1-.06*tuck),y,.045+(z-.045)*(1-.06*tuck));}}a.needsUpdate=true;child.geometry.computeBoundingSphere();}
  }

 }
 setSmoothEyes(data=null){
  const mesh=this.bodyMeshes[0];if(!this.socketGeometry)this.socketGeometry=mesh.geometry;
  if(data&&!this.smoothGeometry){const g=new T.BufferGeometry();for(const k of ['position','normal','uv','faceCoord'])g.setAttribute(k,new T.Float32BufferAttribute(data[k],k==='uv'?2:3));g.computeBoundingSphere();this.smoothGeometry=g;}
  mesh.geometry=data?this.smoothGeometry:this.socketGeometry;this.smoothEyeAmount.value=data?1:0;for(const child of this.children)if(child.name==='skin socket')child.visible=!data;
 }
 accessoryMaterial(color,hairTexture=false){const m=paintedMaterial(color,{human:true}),before=m.onBeforeCompile,glow=this.selectionGlow,lamp=this.selectionLamp;m.customProgramCacheKey=()=> 'portrait-accessory78-'+hairTexture+'-'+this.name;m.onBeforeCompile=s=>{before(s);s.uniforms.selectedWarmth=glow;s.uniforms.selectionLamp=lamp;if(hairTexture)s.fragmentShader=hairSheenFunctions+s.fragmentShader;s.fragmentShader='uniform float selectedWarmth;uniform vec3 selectionLamp;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\nvec3 accessoryBase=diffuseColor.rgb;');s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>',`
 ${hairTexture?`float strandAngle=atan(pl.x,pl.z-.045);float strandPhase=strandAngle*310.+9.*sin(pl.y*39.+strandAngle*3.)+3.*sin(pl.y*91.-strandAngle*11.);strandPhase+=${this.name==='SALLY'?'18.':this.name==='BLACK'?'4.':'0.'}*sin(pl.y*85.+strandAngle*5.);float aa=1.-smoothstep(.8,2.8,fwidth(strandPhase));float strands=sin(strandPhase)*.055*aa+sin(strandAngle*83.+pl.y*49.)*.055;float locks=pnoise(vec2(strandAngle*17.+sin(pl.y*26.)*.7,pl.y*46.));float hairRelief=.0014*locks+.00016*sin(strandPhase)*aa;accessoryBase*=(.85+strands+.26*locks);`:''}
 vec3 n=normalize(pn);${hairTexture?'n=fiberSurfaceNormal(n,pw,hairRelief);':''}float sunlight=max(0.,dot(n,normalize(eveningSun)));float fill=max(0.,dot(n,normalize(cameraPosition-pw)));vec3 keyDelta=selectionLamp-pw;float keyFace=max(0.,dot(n,normalize(keyDelta)));
 outgoingLight=accessoryBase*surfaceLight160(n,eveningSun,eveningDirect);
 outgoingLight*=mix(vec3(1.),vec3(.035,.045,.067),eveningNight);
 outgoingLight+=accessoryBase*mix(vec3(.45,.31,.17)*keyFace,vec3(.90,.76,.59)*(.20+.80*keyFace),eveningNight)*selectedWarmth;
 outgoingLight+=humanHeadlight;
 ${hairTexture?hairSheenLighting.replace('sunVisible*fiberVariation','sunVisible*fiberVariation*.45'):''}
 #include <opaque_fragment>`);};return m;}
}








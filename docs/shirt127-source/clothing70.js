import * as T from './vendor/three.module.js';
import {outfits} from './clothing70-data.js';
export {outfits};
const logo=await new T.TextureLoader().loadAsync('./assets/311-logo.svg');
const dogLogo=await new T.TextureLoader().loadAsync('./assets/dog-c-logo-transparent.png');dogLogo.colorSpace=T.SRGBColorSpace;
const decode=s=>{const b=Uint8Array.from(atob(s),c=>c.charCodeAt(0));return Float32Array.from(new Int16Array(b.buffer),x=>x/10000);};
const cache=new Map();
export function easeShortSleeves(g,name,rest){
 if(!['DOG','BLACK','BOSS'].includes(name))return;
 const p=g.attributes.position.array,n=g.attributes.normal.array,base=p.slice(),poses=g.morphAttributes.position??[],normals=g.morphAttributes.normal??[];
 for(let i=0;i<p.length/3;i++){
  const x=Math.abs(rest[i*3]),y=rest[i*3+1];const mask=T.MathUtils.smoothstep(x,.125,.175)*(1-T.MathUtils.smoothstep(x,.29,.34))*T.MathUtils.smoothstep(y,1.255,1.295)*(1-T.MathUtils.smoothstep(y,1.43,1.48));const gap=.008*mask;
  if(!gap)continue;
  for(let k=0;k<3;k++){const j=i*3+k;p[j]+=n[j]*gap;poses.forEach((a,q)=>{a.array[j]=base[j]+a.array[j]+(n[j]+(normals[q]?.array[j]??0))*gap-p[j];});}
 }
 g.computeBoundingSphere();
}
export function hideCoveredCalves(g,name,coords){
 if(!['BOSS','SPRAD'].includes(name))return;
 const a=g.index.array,keep=[];const covered=i=>coords[i*3+1]>.175&&coords[i*3+1]<.73;
 for(let i=0;i<a.length;i+=3)if(![a[i],a[i+1],a[i+2]].every(covered))keep.push(a[i],a[i+1],a[i+2]);g.setIndex(keep);
}
export function clothingZone(g,p){
 const roots=Array.from({length:p.position.length/3},(_,i)=>i),find=i=>roots[i]===i?i:roots[i]=find(roots[i]),join=(a,b)=>roots[find(a)]=find(b),keys=new Map();
 p.keys?.forEach((k,i)=>{const v=k[0];if(keys.has(v))join(i,keys.get(v));else keys.set(v,i);});
 for(let i=0;i<p.index.length;i+=3){join(p.index[i],p.index[i+1]);join(p.index[i],p.index[i+2]);}
 const tops=new Map();roots.forEach((_,i)=>tops.set(find(i),Math.max(tops.get(find(i))??-10,p.position[i*3+1])));
 g.setAttribute('outfitZone',new T.Float32BufferAttribute(roots.map((_,i)=>tops.get(find(i))>1.15?1:0),1));
}
export function outfitGeometry(name,native=false){
 const outfit=outfits[name];if(!outfit)return null;
 const key=name+native;if(cache.has(key))return cache.get(key);
 const p=outfit[native?'native':'standing'],g=new T.BufferGeometry();
 for(const k of ['position','normal','uv'])g.setAttribute(k,new T.Float32BufferAttribute(native?decode(p[k]):p[k],k==='uv'?2:3));g.setIndex(p.index);g.morphTargetsRelative=true;
 if(native){for(const k of ['position','normal'])g.morphAttributes[k]=Object.values(p.poses).map(q=>new T.Float32BufferAttribute(decode(q[k]),3));for(const k of ['armWeight','headWeight'])g.setAttribute(k,new T.Float32BufferAttribute(p[k],1));}
 else{const q=outfit.smoking,lookup=new Map(q.keys.map((k,i)=>[JSON.stringify(k),i])),order=p.keys.map(k=>lookup.get(JSON.stringify(k)));if(order.includes(undefined))throw Error('Clothing pose mapping failed');for(const k of ['position','normal'])g.morphAttributes[k]=[new T.Float32BufferAttribute(p[k].map((v,i)=>q[k][order[Math.floor(i/3)]*3+i%3]-v),3)];}
 const coord=native?{...p,position:p.standingPosition}:outfit.standing;g.setAttribute('outfitCoord',new T.Float32BufferAttribute(coord.position,3));clothingZone(g,coord);g.computeBoundingSphere();cache.set(key,g);return g;
}
export function dressMaterial(m,name){

 const before=m.onBeforeCompile,key=m.customProgramCacheKey;
 m.customProgramCacheKey=()=>key()+'clothing127-'+name;
 m.onBeforeCompile=s=>{before(s);s.uniforms.teeLogo={value:name==='DOG'?dogLogo:logo};s.vertexShader='attribute vec3 outfitCoord;varying vec3 garmentCoord;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ngarmentCoord=outfitCoord;');s.fragmentShader='uniform sampler2D teeLogo;varying vec3 garmentCoord;\n'+s.fragmentShader;
 s.vertexShader='attribute float outfitZone;varying float garmentZone;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('garmentCoord=outfitCoord;','garmentCoord=outfitCoord;garmentZone=outfitZone;');s.fragmentShader='varying float garmentZone;\n'+s.fragmentShader;
 s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
 vec3 gc=garmentCoord;float fabric=.98+.02*sin(gc.y*480.+gc.x*35.)*sin(gc.x*360.);float top=garmentZone;
 ${name==='DOG'?`if(top>.5){diffuseColor.rgb=vec3(.035,.038,.042)*fabric;vec2 printUV=vec2(gc.x/.162+.5,(gc.y-1.2475)/.18);if(gc.z>.09&&all(greaterThan(printUV,vec2(0.)))&&all(lessThan(printUV,vec2(1.)))){vec4 logoInk=texture2D(teeLogo,printUV);diffuseColor.rgb=mix(diffuseColor.rgb,logoInk.rgb*fabric,logoInk.a);}}`:''}
 ${name==='BOSS'?`if(top>.5)diffuseColor.rgb=vec3(.82,.81,.77)*fabric;`:''}
 ${name==='BLACK'?`if(top>.5){diffuseColor.rgb=vec3(.090,.012,.022)*fabric;vec2 printUV=vec2(gc.x/.255+.5,(gc.y-1.285)/.105);if(gc.z>.09&&all(greaterThan(printUV,vec2(0.)))&&all(lessThan(printUV,vec2(1.)))){vec4 logoInk=texture2D(teeLogo,printUV);float ink=logoInk.a*(1.-logoInk.r);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.76,.72,.60)*fabric,ink);}}else{float denim=dot(diffuseColor.rgb,vec3(.299,.587,.114));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(denim),.60)*3.0*vec3(.98,.96,1.06)+vec3(.10,.115,.15);}`:''}
 ${name==='SALLY'?`if(top>.5){diffuseColor.rgb=vec3(.019,.020,.024)*fabric;float front=step(.095,gc.z);float zip=(1.-smoothstep(.0018,.0038,abs(gc.x)))*front*step(gc.y,1.43);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.22)*(.6+.4*step(.5,fract(gc.y*260.))),zip);float hem=1.-smoothstep(.015,.027,abs(gc.y-1.005));diffuseColor.rgb*=1.-.25*hem;if(vMapUv.x>1.5)diffuseColor.rgb=vec3(.82,.81,.77)*fabric;}`:''}
 ${name==='SPRAD'?`if(top>.5){float cx=step(.5,fract(gc.x*15.)),cy=step(.5,fract(gc.y*15.));vec3 plaid=mix(vec3(.018,.014,.018),vec3(.34,.028,.019),(cx+cy)*.5);float opening=1.-smoothstep(.035,.050,abs(gc.x));if(gc.z>.075)plaid=mix(plaid,vec3(.021,.022,.026),opening);diffuseColor.rgb=plaid*fabric;}`:''}
 `);};
}






import {landcover162} from './landcover162.js';
import {roadDistance} from './world.js';
import * as T from './vendor/three.module.js';
// Shading approach inferred from source scene vertex colors. These are Track
// art-direction values, not claimed native THPS4 light or fog coefficients.
export const art159Uniforms={trackShade159:{value:null},trackCover162:{value:null},trackBounds159:{value:new T.Vector4(-600,-400,1200,1200)}};
export const art159GLSL=`
uniform sampler2D trackShade159;uniform sampler2D trackCover162;uniform vec4 trackBounds159;
vec3 trackGround159(vec2 xz){
 vec2 uv=(xz-trackBounds159.xy)/trackBounds159.zw;
 vec3 field=texture2D(trackShade159,uv).rgb;
 return mix(vec3(.42,.48,.56),vec3(1.),field.r);
}
`;
export function installWorldArt159(view){
 // A world-space diffuse shade field follows the actual woodland and work areas.
 // It is built once and sampled only by soil; riding geometry stays unchanged.
 const stands=view.boundaryStudy?.clusters??[],sites=view.consoleSiteDetails?.clusters??[];
 const bounds=new T.Box3();for(const s of stands)bounds.expandByPoint(new T.Vector3(s.x,0,s.z));bounds.expandByScalar(90);
 const size=bounds.getSize(new T.Vector3()),N=512,field=new Float32Array(N*N).fill(1),bytes=new Uint8Array(N*N*4),cover=new Uint8Array(N*N*4),work=new Float32Array(N*N),wood=new Float32Array(N*N),hill=new Float32Array(N*N);
 function shade(x,z,rx,rz,strength,channel=null){
  const cx=(x-bounds.min.x)/size.x*N,cz=(z-bounds.min.z)/size.z*N,ax=rx/size.x*N,az=rz/size.z*N;
  for(let j=Math.max(0,Math.floor(cz-az*2));j<Math.min(N,cz+az*2);j++)for(let i=Math.max(0,Math.floor(cx-ax*2));i<Math.min(N,cx+ax*2);i++){
   const r=((i+.5-cx)/ax)**2+((j+.5-cz)/az)**2,w=Math.exp(-r*1.35)*strength;
   if(channel)channel[j*N+i]=Math.max(channel[j*N+i],w);else field[j*N+i]=Math.min(field[j*N+i],1-w);
  }
 }
 for(const s of stands){shade(s.x,s.z,s.w*.42,6+s.layer*2,.70);shade(s.x,s.z,s.w*.62,9+s.layer*2,.9,wood);}

 for(const s of sites){shade(s.x,s.z,4.2,3.6,.45);shade(s.x,s.z,14,10,1,work);}
 for(const s of view.environment157?.audit??[])shade(s.x,s.z,2.8,2.8,.50);
 let minimum=1;for(let i=0;i<N*N;i++){minimum=Math.min(minimum,field[i]);bytes[i*4]=Math.round(field[i]*255);bytes[i*4+1]=Math.round(work[i]*255);bytes[i*4+2]=Math.round(wood[i]*255);const x=bounds.min.x+(i%N+.5)/N*size.x,z=bounds.min.z+(Math.floor(i/N)+.5)/N*size.z;
 const distance=roadDistance(x,z),roadClear=Math.min(1,Math.max(0,(distance-3)/10)),zone=landcover162(x,z,distance);
 cover[i*4]=Math.round(zone.grass*255);cover[i*4+1]=Math.round(zone.dirt*255);cover[i*4+2]=Math.round(zone.clay*255);cover[i*4+3]=255;
 bytes[i*4+3]=Math.round(hill[i]*roadClear*255);}
 const texture=new T.DataTexture(bytes,N,N,T.RGBAFormat);texture.minFilter=texture.magFilter=T.LinearFilter;texture.needsUpdate=true;
 const coverTexture=new T.DataTexture(cover,N,N,T.RGBAFormat);coverTexture.minFilter=coverTexture.magFilter=T.LinearFilter;coverTexture.needsUpdate=true;
 art159Uniforms.trackCover162.value=coverTexture;art159Uniforms.trackShade159.value=texture;art159Uniforms.trackBounds159.value.set(bounds.min.x,bounds.min.z,size.x,size.z);
 view.worldArt159={shadeBytes:bytes.length,shadeMinimum:minimum,stands:stands.length,sites:sites.length,physicsChanged:false,landcoverPlan:162,landcoverBytes:cover.length,grassSpine:"walking path",zones:["clay road belts","uneven dirt shoulders","central grass","woodland grass"]};
 view.consoleWorldLook.refresh();
}

import {materialUniforms160,materialGLSL160} from './materials160.js';
import * as T from './vendor/three.module.js';
import {paintedMaterial} from './pigment.js';
import {houseParts} from './house-parts-data.js';
const geometries={};
for(const [role,parts]of Object.entries(houseParts))geometries[role]=Object.entries(parts).map(([name,p])=>{const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p.position,3));g.setAttribute('normal',new T.Float32BufferAttribute(p.normal,3));return {name,g};});
export function facadePart(parent,role,x,y,z,w,h,mats){const group=new T.Group();group.position.set(x,y,z);parent.add(group);for(const {name,g}of geometries[role]){const geo=g.clone();geo.scale(w,h,1);geo.computeVertexNormals();let mat=name==='Trim'?mats.trim:name==='Window'?mats.glass:role==='door'?mats.door:mats.concrete;if(name==='Window')mat=recessedPane(mat,geo);group.add(new T.Mesh(geo,mat));}return group;}
// Source diffuse masonry and shingles; local metric UVs survive house batching.
function architectureShader160(s){
 Object.assign(s.uniforms,materialUniforms160);
 s.vertexShader='attribute vec2 architectureUV160;varying vec2 facadeUV160;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nfacadeUV160=architectureUV160;');
 s.fragmentShader=materialGLSL160+'varying vec2 facadeUV160;\n'+s.fragmentShader;
}
export function houseWall(color,base,sidingColor,eave=6.3){
 const m=paintedMaterial(color,{architecture:true}),old=m.onBeforeCompile,key=m.customProgramCacheKey,tint=new T.Color(sidingColor);
 m.customProgramCacheKey=()=>key()+'-masonry164-'+base+color;
 m.onBeforeCompile=s=>{old(s);architectureShader160(s);s.uniforms.sidingTint={value:tint};
  s.fragmentShader='uniform vec3 sidingTint;\n'+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   float wy=pw.y-${base.toFixed(4)};
   vec3 masonry160=tileColor160(tile160_brick,facadeUV160/vec2(2.05,1.08));
   masonry160=mix(vec3(dot(masonry160,vec3(.299,.587,.114))),masonry160,.82);
   masonry160*=.94+.10*pnoise(facadeUV160*.23+vec2(11.,7.));
   masonry160*=mix(vec3(1.),diffuseColor.rgb*2.7,.36);
   vec3 sidingTile160=tileColor160(tile160_siding,facadeUV160.yx/vec2(2.16,3.20));
   float sidingCourse160=fract(facadeUV160.y/.18);
   float sidingSeam160=(1.-smoothstep(.025,.12,sidingCourse160))*(1.-smoothstep(.65,1.4,fwidth(facadeUV160.y/.18)));
   vec3 siding160=mix(vec3(.58),sidingTile160,.40)*sidingTint*1.50*(1.-sidingSeam160*.18);
   diffuseColor.rgb=mix(masonry160,siding160,smoothstep(2.87,2.90,wy));
   float eaveShade=smoothstep(${(eave-.65).toFixed(3)},${eave.toFixed(3)},wy);
   diffuseColor.rgb*=mix(vec3(1.),vec3(.55,.61,.70),eaveShade*.80);
   diffuseColor.rgb*=1.-.17*(1.-smoothstep(.10,.55,wy));
  `);
 };return m;
}
export function roofDetail(m){
 const old=m.onBeforeCompile,key=m.customProgramCacheKey;m.customProgramCacheKey=()=>key()+'-shingle164';
 m.onBeforeCompile=s=>{old(s);architectureShader160(s);
  s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   vec3 roofTile160=tileColor160(tile160_roof,facadeUV160/vec2(3.30,1.84));
   roofTile160=mix(vec3(.095),roofTile160,.72)*(.94+.10*pnoise(facadeUV160*.19));
   diffuseColor.rgb=roofTile160*mix(vec3(.66,.70,.76),diffuseColor.rgb*4.,.25);
  `);
 };return m;
}



function recessedPane(source,geometry){
 geometry.computeBoundingBox();const b=geometry.boundingBox,p=geometry.attributes.position,uv=[];
 for(let i=0;i<p.count;i++)uv.push((p.getX(i)-b.min.x)/Math.max(.001,b.max.x-b.min.x),(p.getY(i)-b.min.y)/Math.max(.001,b.max.y-b.min.y));
 geometry.setAttribute('paneUV',new T.Float32BufferAttribute(uv,2));return windowMaterial158(source);
}

const windows158=new WeakMap();
export function windowMaterial158(source){
 if(windows158.has(source))return windows158.get(source);
 const m=source.clone(),prior=source.onBeforeCompile,key=source.customProgramCacheKey.bind(source);
 m.customProgramCacheKey=()=>key()+'-recessed-glass158';
 m.onBeforeCompile=shader=>{prior(shader);
  shader.vertexShader='attribute vec2 paneUV;varying vec2 windowUV158;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nwindowUV158=paneUV;');
  shader.fragmentShader='varying vec2 windowUV158;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   vec2 p=windowUV158;float paneRim158=1.-smoothstep(.015,.14,min(min(p.x,1.-p.x),min(p.y,1.-p.y)));
   float interior=.34+.34*smoothstep(.15,.85,p.y);float curtain=.065*(sin(p.x*33.)*.5+.5);
   diffuseColor.rgb*=interior+curtain;
   diffuseColor.rgb+=vec3(.025,.035,.044)*smoothstep(.20,.85,p.y)*(1.-paneRim158);
   diffuseColor.rgb*=1.-paneRim158*.48;
  `);
 };windows158.set(source,m);return m;
}

import * as T from './vendor/three.module.js';
export const FITTED_IRIS_X=.0315;
export function installEyeComparison(p){
 const skin=p.bodyMeshes[0],eyes=p.bodyMeshes[1],original=skin.geometry;
 const cup=original.clone(),a=cup.attributes.position,base=cup.attributes.faceCoord;
 // Only soften the narrow native opening. Never sculpt an enlarged orbital ring.
 for(let i=0;i<a.count;i++){
  const x=base.getX(i),y=base.getY(i),z=base.getZ(i),r=Math.hypot((Math.abs(x)-.029)/.019,(y-1.619)/.010);
  if(z>.137&&r<1.4){const w=(1-T.MathUtils.smoothstep(r,.65,1.4))*.85;const target=.141-.004*Math.pow(Math.max(0,1-r*r),2);a.setZ(i,a.getZ(i)+(target-z)*w);}
 }
 const kept=[];const idx=cup.index.array;for(let i=0;i<idx.length;i+=3){let x=0,y=0,z=0;for(let j=0;j<3;j++){x+=base.getX(idx[i+j])/3;y+=base.getY(idx[i+j])/3;z+=base.getZ(idx[i+j])/3;}const r=Math.hypot((Math.abs(x)-.029)/.0185,(y-1.619)/.010);if(!(z>.105&&r<1.02))kept.push(idx[i],idx[i+1],idx[i+2]);}cup.setIndex(kept);
 cup.computeVertexNormals();cup.computeBoundingSphere();
 const cups=p.children.filter(c=>c.name==='skin socket');
 for(const mesh of cups){mesh.userData.previousSocketGeometry=mesh.geometry;mesh.userData.previousSocketMaterial=mesh.material;mesh.geometry=mesh.geometry.clone();const pos=mesh.geometry.attributes.position;let lo=Infinity,hi=-Infinity,yl=Infinity,yh=-Infinity;for(let i=0;i<pos.count;i++){lo=Math.min(lo,pos.getX(i));hi=Math.max(hi,pos.getX(i));yl=Math.min(yl,pos.getY(i));yh=Math.max(yh,pos.getY(i));}const cx=(lo+hi)/2,cy=(yl+yh)/2;
 for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i),r=Math.min(1,Math.hypot((x-cx)/((hi-lo)/2),(y-cy)/((yh-yl)/2)));pos.setXYZ(i,cx+(x-cx)*1.12,cy+(y-cy)*.70,.134+.007*r*r-.010*T.MathUtils.smoothstep(Math.abs(x),.032,.051));}
 mesh.geometry.computeVertexNormals();const m=mesh.material.clone();m.onBeforeCompile=mesh.material.onBeforeCompile;m.customProgramCacheKey=()=> 'small-cup-skin-34-'+p.name;m.color.set('#c7b5a3');mesh.material=m;mesh.userData.cupGeometry=mesh.geometry;mesh.userData.cupMaterial=m;}
 // Procedural irises are centered slightly outward within the original eye openings.
 // Keep sclera warm and subdued under the same scene illumination as skin.
 eyes.material.color.set('#ffffff');const before=eyes.material.onBeforeCompile;
 eyes.material.customProgramCacheKey=()=> 'portrait-fitted-iris-49-'+p.name;
 eyes.material.onBeforeCompile=shader=>{before(shader);shader.vertexShader='attribute vec3 faceCoord;varying vec3 eyeLocal;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\neyeLocal=faceCoord;');shader.fragmentShader='varying vec3 eyeLocal;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`
 vec2 eyeDelta=vec2(abs(eyeLocal.x)-${FITTED_IRIS_X.toFixed(4)},eyeLocal.y-1.619);float radius=length(eyeDelta);float ang=atan(eyeDelta.y,eyeDelta.x);float iris=1.-smoothstep(.0050,.0055,radius);float pupil=1.-smoothstep(.0020,.0023,radius);float fibers=.85+.15*sin(ang*43.+radius*4100.);vec3 irisColor=vec3(.075,.038,.015)*fibers;irisColor*=.75+.25*(1.-smoothstep(.0042,.0053,radius));diffuseColor.rgb=mix(vec3(.52,.48,.42),irisColor,iris);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.003),pupil);float glint=1.-smoothstep(.0002,.0007,length(eyeDelta-vec2(-.0015,.002)));diffuseColor.rgb+=vec3(.22)*glint*iris;
 `);};
 p.setEyeComparison=mode=>{skin.geometry=mode==='cup'?cup:original;p.smoothEyeAmount.value=0;eyes.visible=mode==='eyes';cups.forEach(c=>{c.visible=mode!=='eyes';c.geometry=mode==='cup'?c.userData.cupGeometry:c.userData.previousSocketGeometry;c.material=mode==='cup'?c.userData.cupMaterial:c.userData.previousSocketMaterial;});};
 p.setEyeComparison('cup');
}

import {roadDistance} from './world.js';
export function installGround(view){
 const roadCache=new Map();
 const mound=view.scene.getObjectByName('Construction spoil pile 3');
 const earth=[];view.scene.traverse(o=>{if(o.isMesh&&!Array.isArray(o.material)){let key=o.material.customProgramCacheKey();if(key.includes('"earth":true'))earth.push(o);}});
 const center=view.camera.position.clone().set(-168.2225,0,252.2002);if(mound){mound.geometry.computeBoundingBox();mound.geometry.boundingBox.getCenter(center);}
 const pads=view.site.children.filter(o=>o.isMesh&&o.material?.color?.getHex()===0xb3a596);let shadowBackup=null,shadowTexture=null;
 const originals=[...earth,...pads].map(o=>({o,g:o.geometry,m:o.material}));
 function prepareRoadMask(){for(const {o,g,m}of originals){if(pads.includes(o)||o.material===m)continue;if(o.geometry===g)o.geometry=g.clone();const geo=o.geometry;if(geo.attributes.studyRoadDistance)continue;const p=geo.attributes.position,values=new Float32Array(p.count);for(let i=0;i<p.count;i++){const x=Math.round(p.getX(i)/2)*2,z=Math.round(p.getZ(i)/2)*2,key=x+','+z;if(!roadCache.has(key))roadCache.set(key,Math.max(0,roadDistance(x,z)));values[i]=roadCache.get(key);}geo.setAttribute('studyRoadDistance',new p.constructor(values,1));}}
 function fixFootings(uniforms){if(shadowBackup)return;const tex=uniforms.roadShadowData?.value;if(!tex)return;shadowTexture=tex;shadowBackup=tex.image.data.slice();const data=tex.image.data,count=tex.image.height,cs=view.contactAudit.cabinets;for(let j=0;j<cs.length;j++){const pad=cs[j];let bottom=Infinity;for(const mesh of pads){const p=mesh.geometry.attributes.position;for(let i=0;i<p.count;i++)if(Math.abs(p.getX(i)-pad.x)<=.601&&Math.abs(p.getZ(i)-pad.z)<=.361&&p.getY(i)<=pad.padTop+.001)bottom=Math.min(bottom,p.getY(i));}if(!Number.isFinite(bottom))continue;const k=(count-cs.length+j)*24,half=(pad.padTop-bottom)/2,cy=(pad.padTop+bottom)/2;data[k+1]=cy;data[k+3]=Math.hypot(.6,half,.36);data[k+11]=-cy;data[k+17]=-half;data[k+21]=half;}tex.needsUpdate=true;}
 function shaderMode(mode){for(const {o,m}of originals){const c=m.clone(),before=m.onBeforeCompile,key=m.customProgramCacheKey.bind(m);c.customProgramCacheKey=()=>key()+'ground96'+mode;c.onBeforeCompile=s=>{before(s);if(mode===1||mode===3){fixFootings(s.uniforms);if(pads.includes(o)){s.fragmentShader=s.fragmentShader.replace('diffuseColor.rgb*=mix(vec3(1.),vec3(.026,.041,.067),eveningNight);','diffuseColor.rgb*=mix(vec3(1.),vec3(.50,.57,.73),roadOcclusion(pw,normalize(eveningSun),40.)*eveningDirect);diffuseColor.rgb*=mix(vec3(1.),vec3(.026,.041,.067),eveningNight);');return;}
 s.vertexShader='attribute float studyRoadDistance;varying float vergeDistance;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvergeDistance=studyRoadDistance;');s.fragmentShader='varying float vergeDistance;\n'+s.fragmentShader;
 s.fragmentShader=s.fragmentShader.replace('float detail=1.-smoothstep(12.,90.,dist);','float nearRoad=1.-smoothstep(5.,23.,vergeDistance);float slowFade=1.-.28*smoothstep(12.,36.,dist);float farFade=1.-smoothstep(mix(28.,48.,nearRoad),mix(43.,68.,nearRoad),dist);float groundRead=slowFade*farFade;float detail=groundRead;');
const start=s.fragmentShader.indexOf('vec2 drift='),end=s.fragmentShader.indexOf('float plane=',start);if(start>=0&&end>=0)s.fragmentShader=s.fragmentShader.slice(0,end)+`
 float soilPatch=pigment(pw.xz*.055);
 float basin=(1.-smoothstep(.80,.99,normalize(pn).y));
 vec3 soilColor=mix(vec3(.25,.15,.09),vec3(.43,.29,.18),smoothstep(.25,.75,soilPatch));
 soilColor*=1.-basin*.12;
 float nearDetail=groundRead;
 float grainNear=1.-smoothstep(4.,22.,dist);
 float fineScale=32.;float fineAA=1.-smoothstep(.3,1.2,length(fwidth(pw.xz*fineScale)));
 float soilGrain=pnoise(pw.xz*fineScale);
 float soilClods=pigment(pw.xz*5.);
 diffuseColor.rgb=mix(diffuseColor.rgb,soilColor,mix(.98,.10,nearDetail));
 diffuseColor.rgb*=1.+((soilClods-.5)*.22+(soilGrain-.5)*.18*fineAA)*grainNear-.065*nearDetail;

 // Two placed, broad scrape passes; not a repeated texture over the lot.
 vec2 gradeQ=mat2(.8,-.6,.6,.8)*(pw.xz-vec2(${center.x.toFixed(4)},${center.z.toFixed(4)}));
 float gradeArea=(1.-smoothstep(4.,7.,abs(gradeQ.x)))*(1.-smoothstep(.75,.97,1.-abs(normalize(pn).y)));
 float scrapeA=exp(-pow((gradeQ.y-3.8-.055*gradeQ.x*gradeQ.x)/.42,2.));
 float scrapeB=exp(-pow((gradeQ.y-4.65-.055*gradeQ.x*gradeQ.x)/.55,2.));
 diffuseColor.rgb*=1.+gradeArea*((scrapeA*.12-scrapeB*.18)*nearDetail);
 float runoff=exp(-pow((gradeQ.x-.25*gradeQ.y)/.22,2.))*(1.-smoothstep(2.,4.4,abs(gradeQ.y)));
 diffuseColor.rgb*=1.-runoff*.16*nearDetail;
 ${o===mound?`float dryCrest=smoothstep(${(view.surfaceGround(center.x,center.z)+.25).toFixed(4)},${(view.surfaceGround(center.x,center.z)+.85).toFixed(4)},pw.y);diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(1.20,1.13,1.04),dryCrest*.55);`:''}
 `+s.fragmentShader.slice(end);s.fragmentShader=s.fragmentShader.replace('(brush-.5)*.62','(brush-.5)*.62').replace('(scumble-.5)*.18','(scumble-.5)*.18');}
 if(mode===2||mode===3)s.fragmentShader=s.fragmentShader.replace('smoothstep(.32,.62,facing+(brush-.5)*.7)','smoothstep(.08,.92,facing+(brush-.5)*.18)');};o.material=c;}}
 function smoothNormals(g){g.computeVertexNormals();if(g.index)return;const p=g.attributes.position,n=g.attributes.normal,sums=new Map();for(let i=0;i<p.count;i++){const k=[p.getX(i),p.getY(i),p.getZ(i)].map(v=>v.toFixed(4)).join(',');let a=sums.get(k);if(!a)sums.set(k,a=[0,0,0,[]]);a[0]+=n.getX(i);a[1]+=n.getY(i);a[2]+=n.getZ(i);a[3].push(i);}for(const [x,y,z,ids]of sums.values()){const l=Math.hypot(x,y,z)||1;for(const i of ids)n.setXYZ(i,x/l,y/l,z/l);}n.needsUpdate=true;}
 function reshape(){ mound.geometry=mound.geometry.clone();const p=mound.geometry.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),dx=x-center.x,dz=z-center.z,base=view.surfaceGround(x,z)+.016,h=Math.max(0,p.getY(i)-base);const taper=Math.min(1,h/.2),crest=1+.28*Math.tanh(dx*.7)-.14*Math.tanh(dz);const channel=.12*Math.exp(-Math.pow((dz-.40*dx+.2)*3,2))*taper;p.setY(i,base+Math.max(0,h*crest-channel));}p.needsUpdate=true;mound.geometry.computeVertexNormals();mound.geometry.computeBoundingSphere();}

 shaderMode(3);if(mound)reshape();for(const {o,g}of originals){if(pads.includes(o))continue;if(o!==mound)o.geometry=g.clone();smoothNormals(o.geometry);}prepareRoadMask();return {earth,mound};
}

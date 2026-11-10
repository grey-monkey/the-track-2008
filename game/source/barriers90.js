import * as T from './vendor/three.module.js';
import {paintedMaterial} from './pigment.js';
import {bulb} from './world.js';
import data from './barrier90-data.js';
// Local prop lighting: retain sunset palette, tint artificial light by the actual material.
export function siteMaterial(color){
 const m=paintedMaterial(color,{architecture:true}),paint=m.onBeforeCompile;
 m.onBeforeCompile=s=>{paint(s);
  s.fragmentShader=s.fragmentShader.replace('*(.70+brush*.30)*eveningLamp','*(.70+brush*.30)*mix(vec3(.48),sqrt(max(paintedAlbedo,vec3(0.))),.52)*eveningLamp');
  s.fragmentShader=s.fragmentShader.replace('*(.25+.75*max(0.,lightNormal.y))','*mix(vec3(.48),sqrt(max(paintedAlbedo,vec3(0.))),.52)*(.30+.70*max(0.,dot(lightNormal,normalize(eveningCar+vec3(0.,.55,0.)-pw))))');
  s.fragmentShader=s.fragmentShader.replace('*tailPool*surfaceResponse*eveningNight','*tailPool*surfaceResponse*mix(vec3(.48),sqrt(max(paintedAlbedo,vec3(0.))),.52)*(.30+.70*max(0.,dot(lightNormal,normalize(eveningCar+vec3(0.,.55,0.)-pw))))*eveningNight');
  s.fragmentShader=s.fragmentShader.replace('float lampFace=max(0.,dot(lightNormal,normalize(delta)));','float lampFace=.15+.85*max(0.,dot(lightNormal,normalize(delta)));');
  m.userData.siteShader=s;
 };m.customProgramCacheKey=()=> 'site90-material-light-v1';return m;
}
// Downloaded Quaternius mesh, CC0. Uniform molded-polyethylene finish.
function plasticMaterial(color){
 const mat=siteMaterial(color),paint=mat.onBeforeCompile;
 mat.onBeforeCompile=s=>{paint(s);
  // Remove authored atlas marks and the generic architectural scumble locally.
  s.fragmentShader=s.fragmentShader.replace('float surfaceResponse=1.;','float surfaceResponse=1.; broad=.5;brush=.5;scumble=.5;grain=.5;');
  s.fragmentShader=s.fragmentShader.replace('vec3 paintedAlbedo=diffuseColor.rgb;',`vec3 paintedAlbedo=diffuseColor.rgb;
   // Dirt gathers at the feet; rubbed, elongated marks follow handling rather than UV islands.
   float dirtNoise=pnoise(pl.xz*5.+pl.y*.8);
   float footDirt=(1.-smoothstep(.03,.36,pl.y+(dirtNoise-.5)*.17));
   float smears=smoothstep(.53,.77,pnoise(vec2(pl.x*2.2+pl.z*3.,pl.y*12.)))*.16;
   float rubs=smoothstep(.72,.85,pnoise(vec2(pl.x*19.+pl.z*13.,pl.y*105.)))*(1.-smoothstep(7.,22.,distance(cameraPosition,pw)));
   diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.16,.115,.072),footDirt*(.24+dirtNoise*.23)+smears);
   diffuseColor.rgb=mix(diffuseColor.rgb,paintedAlbedo*.68+vec3(.17,.15,.12),rubs*.11);
   diffuseColor.rgb*=.96+.04*pnoise(pl.xz*3.+pl.y);
  `);
  s.fragmentShader=s.fragmentShader.replace('diffuseColor.rgb*=.71;' ,'diffuseColor.rgb*=.94;');
  s.fragmentShader=s.fragmentShader.replace('diffuseColor.rgb*=mix(vec3(1.),vec3(.026,.041,.067),eveningNight);',`
   vec3 plasticN=normalize(lightNormal),plasticL=normalize(eveningSun),plasticV=normalize(cameraPosition-pw);
   float plasticSheen=pow(max(0.,dot(plasticN,normalize(plasticL+plasticV))),12.);
   float plasticWrap=pow(max(0.,dot(-plasticN,plasticL)),2.);
   diffuseColor.rgb+=(vec3(.028,.024,.018)*plasticSheen+paintedAlbedo*.045*plasticWrap)*eveningDirect;
   diffuseColor.rgb*=mix(vec3(1.),vec3(.026,.041,.067),eveningNight);`);
 };
 mat.customProgramCacheKey=()=> 'barrier90-weathered-polyethylene-v3';
 return mat;
}
export function addBarriers(view,root,supports){
 const debris=[];view.scene.traverse(o=>{if(o.name==='Cul-de-sac center debris')debris.push(o);});for(const o of debris){o.removeFromParent();o.geometry.dispose();o.material.dispose();}
 const base=new T.BufferGeometry();for(const [name,size] of [['position',3],['normal',3],['uv',2]])base.setAttribute(name,new T.Float32BufferAttribute(data[name],size));base.setIndex(data.index);
 const materials=[plasticMaterial(0xd96625)];
 for(const [i,x,z,yaw,tip] of [[0,-1.2,-.5,.32,0]]){
  const geo=base.clone();
  // Broad shallow dents: shared vertex positions deform identically, preserving seams.
  const gp=geo.attributes.position;for(let v=0;v<gp.count;v++){const x=gp.getX(v),y=gp.getY(v),z=gp.getZ(v);const dent=Math.exp(-((x-.43)*(x-.43)*20+(y-.67)*(y-.67)*30));gp.setZ(v,z-Math.sign(z)*.028*dent);}
  geo.rotateX(tip);geo.computeBoundingBox();geo.translate(0,-geo.boundingBox.min.y,0);geo.computeBoundingBox();const localBox=geo.boundingBox.clone(),m=new T.Mesh(geo,materials[i]);m.name=i?'Fallen plastic barrier':'Upright plastic barrier';m.position.set(bulb.x+x,view.surfaceGround(bulb.x+x,bulb.z+z)+.008,bulb.z+z);m.rotation.y=yaw;m.castShadow=m.receiveShadow=true;root.add(m);m.updateMatrixWorld(true);
  const center=localBox.getCenter(new T.Vector3()).applyMatrix4(m.matrixWorld),size=localBox.getSize(new T.Vector3());view.detailSolids.push({kind:'PLASTIC_BARRIER',x:center.x,z:center.z,hx:size.x/2,hz:size.z/2,yaw:-yaw,bottom:m.position.y,top:m.position.y+size.y});
  // Exact transformed triangles support the detached board and fallen rider.
  const pos=geo.attributes.position,idx=geo.index;for(let k=0;k<idx.count;k++){const v=new T.Vector3().fromBufferAttribute(pos,idx.getX(k)).applyMatrix4(m.matrixWorld);supports.push(v.x,v.y,v.z);}
 }
 // Restrained ground contact, independent of the moving actor shadow capture.
 for(const o of view.detailSolids.filter(o=>o.kind==='PLASTIC_BARRIER')){const shadow=new T.Mesh(new T.PlaneGeometry(o.hx*2,o.hz*2),new T.MeshBasicMaterial({color:0x172035,transparent:true,opacity:.24,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));shadow.rotation.set(-Math.PI/2,0,-o.yaw);shadow.position.set(o.x,o.bottom-.004,o.z);shadow.name='Barrier ground contact';root.add(shadow);}
 addSiteDebris(view,root,supports);base.dispose();view.detailTargets.barriers=new T.Vector3(bulb.x,view.surfaceGround(bulb.x,bulb.z)+.6,bulb.z);
}

function addSiteDebris(view,root,supports){
 const ground=(x,z)=>view.surfaceGround(x,z);
 const addSupport=m=>{m.updateMatrixWorld(true);const g=m.geometry,p=g.attributes.position,idx=g.index;for(let k=0;k<(idx?idx.count:p.count);k++){const v=new T.Vector3().fromBufferAttribute(p,idx?idx.getX(k):k).applyMatrix4(m.matrixWorld);supports.push(v.x,v.y,v.z);}};
 // Thin irregular apron of swept grit, rising into a low accumulated heap between the barriers.
 const cx=bulb.x-.05,cz=bulb.z+.25,verts=[];
 function point(r,a){const edge=1+.10*Math.sin(a*5)+.06*Math.sin(a*9+1),x=cx+Math.cos(a)*r*1.6*edge,z=cz+Math.sin(a)*r*.95*edge;return [x,ground(x,z)+.007+.19*Math.pow(1-r*r,2)*(1+.12*Math.sin(a*3)*r),z];}
 for(let ring=0;ring<7;ring++)for(let k=0;k<36;k++){const a=k/36*Math.PI*2,b=(k+1)/36*Math.PI*2,r=ring/7,t=(ring+1)/7,ps=[point(r,a),point(t,a),point(t,b),point(r,b)];for(const i of [0,2,1,0,3,2])verts.push(...ps[i]);}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.computeVertexNormals();
 const soil=siteMaterial(0x79634c),soilPaint=soil.onBeforeCompile;
 soil.transparent=true;soil.depthWrite=false;soil.onBeforeCompile=s=>{soilPaint(s);s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
 vec2 gritDelta=(pw.xz-vec2(${cx.toFixed(6)},${cz.toFixed(6)}))/vec2(1.6,.95);float gritAngle=atan(gritDelta.y,gritDelta.x);float gritEdge=1.+.10*sin(gritAngle*5.)+.06*sin(gritAngle*9.+1.);float gritRadius=length(gritDelta)/gritEdge;diffuseColor.a*=1.-smoothstep(.70,1.,gritRadius);`);};soil.customProgramCacheKey=()=> 'barrier90-grit-edge';
 const mound=new T.Mesh(geo,soil);mound.name='Accumulated construction grit';mound.receiveShadow=true;root.add(mound);addSupport(mound);
 // Nominal 2x4: actual dressed section 38.1 x 88.9mm, six-foot offcut.
 const wood=siteMaterial(0xc9aa79),original=wood.onBeforeCompile;
 wood.onBeforeCompile=s=>{original(s);
  s.fragmentShader=s.fragmentShader.replace('float surfaceResponse=1.;','float surfaceResponse=1.; broad=.5;brush=.5;scumble=.5;grain=.5;');
  s.fragmentShader=s.fragmentShader.replace('vec3 paintedAlbedo=diffuseColor.rgb;',`vec3 paintedAlbedo=diffuseColor.rgb;
   // Growth rings continue along the board and across both sawn ends.
   vec2 pineCross=vec2(pl.z+.061,(pl.y+.082)*1.12);
   float pineRadius=length(pineCross);
   float pineWarp=.0007*sin(pl.x*7.)+.0005*pnoise(vec2(pl.x*3.,pl.z*45.));
   float knotMask=0.;float knotRing=0.;
   for(int ki=0;ki<2;ki++){
    vec2 kp=vec2(pl.x-(ki==0?-.43:.38),pl.z-(ki==0?.008:-.024));
    float kr=length(kp/vec2(.035,.012));
    pineWarp+=.004*exp(-abs(kp.x)*8.)*exp(-abs(kp.y)*21.);
    knotMask=max(knotMask,1.-smoothstep(.55,1.4,kr));
    knotRing+=sin(kr*15.)*exp(-kr*1.2)*.035;
   }
   float ringPhase=(pineRadius+pineWarp)*1900.;
   float ringAA=max(.06,fwidth(ringPhase));
   float latewood=(1.-smoothstep(.08,.08+ringAA,abs(sin(ringPhase))))*.24;
   float fibers=pnoise(vec2(pl.x*5.,pl.z*2300.+pl.y*370.));
   vec3 pine=mix(vec3(1.04,.99,.88),vec3(.60,.43,.25),latewood);
   pine*=.94+fibers*.06+knotRing;
   pine=mix(pine,vec3(.47,.32,.18),knotMask*.64);
   if(abs(pl.x)>.919){float endRing=sin(pineRadius*1900.);pine*=.88+.05*endRing;}
   float split=(1.-smoothstep(.0004,.0012,abs(pl.z-.017-sin(pl.x*23.)*.0006)))*smoothstep(.68,.92,abs(pl.x));
   diffuseColor.rgb*=pine*(1.-split*.34);
  `);
 };wood.customProgramCacheKey=()=> 'barrier90-pine-six-foot-v1';
 const plank=new T.Mesh(new T.BoxGeometry(1.84,.0381,.0889),wood);plank.name='Discarded two-by-four offcut';plank.position.set(bulb.x-1.32,0,bulb.z+.90);plank.rotation.set(.035,-.64,.012);
 // Seat the longer board against the pavement, accounting for its small tilt.
 plank.updateMatrixWorld(true);let seat=-Infinity;const pp=plank.geometry.attributes.position;for(let k=0;k<pp.count;k++){const v=new T.Vector3().fromBufferAttribute(pp,k).applyMatrix4(plank.matrixWorld);seat=Math.max(seat,ground(v.x,v.z)-v.y);}plank.position.y=seat+.003;root.add(plank);addSupport(plank);const timberBox=new T.Box3().setFromObject(plank),timberCenter=timberBox.getCenter(new T.Vector3());view.detailSolids.push({kind:'TIMBER',rideOverBoards:['LONGBOARD','HANDMEDOWN','CRUISER'],x:timberCenter.x,z:timberCenter.z,hx:.92,hz:.04445,yaw:-plank.rotation.y,bottom:timberBox.min.y,top:timberBox.max.y});
 const pebbleGeo=new T.IcosahedronGeometry(1,0),stone=siteMaterial(0x8c8272);for(let i=0;i<9;i++){const a=i*2.399,r=.8+(i%3)*.21,x=cx+Math.cos(a)*r*1.25,z=cz+Math.sin(a)*r*.8,m=new T.Mesh(pebbleGeo,stone);m.scale.set(.025+(i%3)*.012,.014,.023);m.position.set(x,ground(x,z)+.014,z);m.rotation.y=a;root.add(m);}
}

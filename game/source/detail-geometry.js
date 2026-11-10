import {surfaces} from './spot142/materials.js';
import {buildPathReturns} from './path-returns.js';
import {addBarriers,siteMaterial} from './barriers90.js';
import * as T from './vendor/three.module.js';
import {paintedMaterial} from './pigment.js';
import {PavementContact} from './car-contact.js';
import {height,FOOTPATH,roadPoints,ROAD_HALF,roadDistance,aerialPoint} from './world.js';
import {DIVOT,PATCHES,RAMP,at,local,roadOffset,rampHeight} from './road-details.js';
export function sculptRoad(mesh){
 const original=mesh.geometry.attributes.position,positions=[],normals=[];
 const near=(a,b,c)=>[DIVOT,...PATCHES].some(f=>{const xs=[a[0],b[0],c[0]],zs=[a[2],b[2],c[2]];return f.x>=Math.min(...xs)-7&&f.x<=Math.max(...xs)+7&&f.z>=Math.min(...zs)-7&&f.z<=Math.max(...zs)+7;});
 const mid=(a,b)=>a.map((v,i)=>(v+b[i])/2);
 function tri(a,b,c,level=0){if(level<12&&near(a,b,c)&&Math.max(Math.hypot(a[0]-b[0],a[2]-b[2]),Math.hypot(a[0]-c[0],a[2]-c[2]),Math.hypot(b[0]-c[0],b[2]-c[2]))>.20){const ab=mid(a,b),bc=mid(b,c),ca=mid(c,a);tri(a,ab,ca,level+1);tri(ab,b,bc,level+1);tri(ca,bc,c,level+1);tri(ab,bc,ca,level+1);return;}for(const p of [a,b,c]){positions.push(p[0],p[1]+roadOffset(p[0],p[2]),p[2]);const x=p[0],z=p[2],n=new T.Vector3(-(height(x+.02,z)+roadOffset(x+.02,z)-height(x-.02,z)-roadOffset(x-.02,z))/.04,1,-(height(x,z+.02)+roadOffset(x,z+.02)-height(x,z-.02)-roadOffset(x,z-.02))/.04).normalize();normals.push(...n.toArray());}}
 for(let i=0;i<original.count;i+=3)tri([original.getX(i),original.getY(i),original.getZ(i)],[original.getX(i+1),original.getY(i+1),original.getZ(i+1)],[original.getX(i+2),original.getY(i+2),original.getZ(i+2)]);
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));g.computeBoundingSphere();mesh.geometry.dispose();mesh.geometry=g;mesh.userData.detailRoad=true;mesh.name='Asphalt with settled utility trench and repairs';
}
export function repairMaterial(mat){const old=mat.onBeforeCompile,key=mat.customProgramCacheKey.bind(mat);mat.customProgramCacheKey=()=>key()+'repairs85';mat.onBeforeCompile=s=>{old(s);let glsl='';const d=DIVOT;glsl+=`{vec2 delta=pw.xz-vec2(${d.x},${d.z});float u=dot(delta,vec2(${-d.si},${d.co}))-(${d.u});float v=dot(delta,vec2(${d.co},${d.si}));float across=1.-smoothstep(${d.halfWidth-.40},${d.halfWidth},abs(u));float bowl=pow(cos(clamp(v/${d.halfLength},-1.,1.)*1.5707963),2.)*across;float facingLip=sin(clamp(v/${d.halfLength},-1.,1.)*3.1415926)*across;diffuseColor.rgb*=1.-bowl*.48+facingLip*.27;}`;for(const p of PATCHES)glsl+=`{vec2 d=pw.xz-vec2(${p.x.toFixed(5)},${p.z.toFixed(5)});vec2 q=vec2(dot(d,vec2(${(-p.si).toFixed(6)},${p.co.toFixed(6)}))-(${p.u.toFixed(5)}),dot(d,vec2(${p.co.toFixed(6)},${p.si.toFixed(6)}))-(${p.v.toFixed(5)}));vec2 edge=vec2(${p.halfWidth},${p.halfLength})-abs(q);float repairMask=smoothstep(0.,.035,min(edge.x,edge.y));float rim=1.-smoothstep(.04,.12,min(edge.x,edge.y));diffuseColor.rgb*=mix(1.,.68-rim*.08,repairMask);}`;s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n'+glsl);};}
function surfaceMesh(points,material,name,root){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(points,3));g.computeVertexNormals();g.computeBoundingSphere();material.side=T.DoubleSide;const mesh=new T.Mesh(g,material);mesh.name=name;mesh.castShadow=mesh.receiveShadow=true;root.add(mesh);return mesh;}
function supportUnion(view,triangles){const extra=new PavementContact(new Float32Array(triangles)),base=view.surfaceGround;
 const wrap=(original,contact)=>{const f=(x,z)=>Math.max(original(x,z),contact.height(x,z)??-Infinity);f.upperBound=(...a)=>Math.max(original.upperBound?.(...a)??Infinity,contact.upperBound(...a));f.planeBound=(...a)=>Math.max(original.planeBound?.(...a)??Infinity,contact.planeBound(...a));f.prepare=(...a)=>wrap(original.prepare?.(...a)??original,contact.prepare(...a));return f;};view.surfaceGround=wrap(base,extra);view.detailContact=extra;
}
export const TREE_CLUSTERS=[[765,309,4],[790,285,3],[763,365,3],[839,255,4],[867,286,3]].map(([x,y,count],i)=>({...aerialPoint(x,y),count,id:'T'+(i+1)}));
export function buildRoadDetails(view){const root=new T.Group();root.name='Road memories 85';view.scene.add(root);const supports=[];view.detailSolids=[];view.detailTargets={divot:new T.Vector3(...Object.values({x:at(DIVOT,DIVOT.u,0).x,y:height(DIVOT.x,DIVOT.z),z:at(DIVOT,DIVOT.u,0).z})),patch:new T.Vector3(PATCHES[0].x,height(PATCHES[0].x,PATCHES[0].z),PATCHES[0].z),ramp:new T.Vector3(RAMP.x,height(RAMP.x,RAMP.z)+.12,RAMP.z)};
 // Rotary-cut construction plywood: continuous veneer face and alternating edge plies.
 const wood=siteMaterial(0xc5a16e),grain=wood.onBeforeCompile;
 wood.onBeforeCompile=s=>{grain(s);s.uniforms.originalPlywood={value:surfaces.plywood};s.fragmentShader='uniform sampler2D originalPlywood;\n'+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('float surfaceResponse=1.;','float surfaceResponse=1.;broad=.5;brush=.5;scumble=.5;grain=.5;');
  s.fragmentShader=s.fragmentShader.replace('vec3 paintedAlbedo=diffuseColor.rgb;',`vec3 paintedAlbedo=diffuseColor.rgb;
   vec3 plyNormal=abs(normalize(cross(dFdx(pl),dFdy(pl))));
   if(plyNormal.y>.5){
    vec2 veneer=vec2(pl.x+.17,pl.z*.34);
    float crown=length(veneer)+.006*pnoise(vec2(pl.x*17.,pl.z*2.5));
    float knotRadius=length(vec2((pl.x-.11)/.020,(pl.z+.19)/.045));
    crown+=.013*exp(-knotRadius*.55);
    float phase=crown*390.+pnoise(vec2(pl.x*21.,pl.z*2.))*2.;
    float aa=max(.07,fwidth(phase));
    float ring=1.-smoothstep(.12,.12+aa,abs(sin(phase)));
    float fibers=pnoise(vec2(pl.x*1200.+sin(pl.z*12.)*4.,pl.z*6.));
    float fiberFade=1.-smoothstep(.5,2.,length(fwidth(vec2(pl.x*1200.,pl.z*6.))));
    float colorDrift=pnoise(vec2(pl.x*7.,pl.z*1.8));
    vec3 face=mix(vec3(1.02,.99,.91),vec3(.69,.51,.32),ring*.44);
    face*=.94+.10*colorDrift+(fibers-.5)*.09*fiberFade;
    face=mix(face,vec3(.44,.31,.19),(1.-smoothstep(.55,1.4,knotRadius))*.72);
    float edgeDistance=min(.3048-abs(pl.x),.6188-abs(pl.z));
    face=mix(face,vec3(.84,.77,.64),(1.-smoothstep(.001,.007,edgeDistance))*.25);
    float groundWear=(1.-smoothstep(-.61,-.42,pl.z))*.12*(.5+.5*pnoise(pl.xz*27.));
    // Sample one veneer panel from the source atlas, not the full multi-panel tile.
    // Rotate its long axis along the ramp and keep the seam/nail borders outside the sample.
    vec2 sheet=clamp(vec2(pl.x/${RAMP.width.toFixed(6)}+.5,pl.z/${Math.hypot(RAMP.length,RAMP.rise).toFixed(6)}+.5),0.,1.);
    vec2 sheetUV=vec2(.03,.54)+vec2(sheet.y,1.-sheet.x)*vec2(.94,.43);
    vec3 originalVeneer=texture2D(originalPlywood,sheetUV).rgb;
    diffuseColor.rgb=mix(paintedAlbedo*.72,pow(originalVeneer,vec3(2.2)),.82)*(1.-groundWear);
    float plyEdge=min(.3048-abs(pl.x),.6188-abs(pl.z));
    diffuseColor.rgb*=.60+.40*smoothstep(.001,.024,plyEdge);
   }else{
    float ply=(pl.y+.0065)/.013*5.;float line=abs(sin(ply*3.14159265));
    float plyAA=max(.08,fwidth(ply)*3.14159265);
    float glue=1.-smoothstep(.10,.10+plyAA,line);
    float alternate=.5+.5*sin(ply*3.14159265);
    diffuseColor.rgb*=mix(vec3(.30,.24,.19),vec3(.65,.52,.36),alternate)*(1.-glue*.35);
   }
  `);
 };wood.customProgramCacheKey=()=> 'site174-ramp-single-sheet';
 const ramp=new T.Group();ramp.name='Quarter-sheet plywood on hollow blocks';ramp.position.set(RAMP.x,view.surfaceGround(RAMP.x,RAMP.z),RAMP.z);ramp.rotation.y=-RAMP.h+Math.PI/2;root.add(ramp);
 const plank=new T.Mesh(new T.BoxGeometry(RAMP.width,RAMP.thickness,Math.hypot(RAMP.length,RAMP.rise)),wood);plank.name='Single-sheet plywood ramp surface';plank.rotation.x=-Math.atan(RAMP.rise/RAMP.length);plank.position.y=RAMP.rise/2+.003-RAMP.thickness/2;plank.castShadow=plank.receiveShadow=true;ramp.add(plank);
 const concrete=siteMaterial(0xa19e94),pores=concrete.onBeforeCompile;
 concrete.onBeforeCompile=s=>{pores(s);
  s.uniforms.cinderGround={value:ramp.position.y};
  s.fragmentShader='uniform float cinderGround;\n'+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('float surfaceResponse=1.;','float surfaceResponse=.90;broad=.5;brush=.5;scumble=.5;grain=.5;');
  s.fragmentShader=s.fragmentShader.replace('vec3 paintedAlbedo=diffuseColor.rgb;',`vec3 paintedAlbedo=diffuseColor.rgb;
   // Local volumetric grain avoids stripes or stretched pores on the hole walls.
   vec3 cpos=pl*380.;
   float aggregate=(pnoise(cpos.xy+pl.z*19.)+pnoise(cpos.yz+pl.x*23.)+pnoise(cpos.zx+pl.y*17.))/3.;
   float gritFade=1.-smoothstep(.45,1.8,length(fwidth(cpos)));
   float pit=1.-smoothstep(.27,.37,aggregate);
   float fleck=smoothstep(.61,.73,aggregate);
   float mottling=(pnoise(pl.xy*28.+pl.z*11.)+pnoise(pl.yz*31.+pl.x*13.))*.5;
   diffuseColor.rgb*=.91+(mottling-.5)*.14+((aggregate-.5)*.36-pit*.18+fleck*.07)*gritFade;
   float wallDepth=smoothstep(.004,.045,pl.z)*(1.-smoothstep(.145,.186,pl.z));
   float innerWall=(1.-smoothstep(.157,.176,abs(pl.x)))*(1.-smoothstep(.060,.080,abs(pl.y)));
   diffuseColor.rgb*=1.-wallDepth*innerWall*.22;
   float dirt=(1.-smoothstep(.01,.13,pw.y-cinderGround+(mottling-.5)*.045))*(.17+mottling*.16);
   diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(.66,.57,.44),dirt);
  `);
 };concrete.customProgramCacheKey=()=> 'site90-cinder-porous-concrete-v2';
 const blockShape=new T.Shape();blockShape.moveTo(-.19,-.0925);blockShape.lineTo(.19,-.0925);blockShape.lineTo(.19,.0925);blockShape.lineTo(-.19,.0925);blockShape.closePath();for(const x of [-.095,.095]){const hole=new T.Path();hole.moveTo(x-.061,-.055);hole.lineTo(x-.061,.055);hole.lineTo(x+.061,.055);hole.lineTo(x+.061,-.055);hole.closePath();blockShape.holes.push(hole);}const blockGeo=new T.ExtrudeGeometry(blockShape,{depth:.19,bevelEnabled:true,bevelThickness:.002,bevelSize:.002,bevelSegments:1,steps:1});const block=new T.Mesh(blockGeo,concrete);block.name='Tucked ramp support block';block.position.set(0,.0955,RAMP.length/2-RAMP.supportLip-.192);block.castShadow=block.receiveShadow=true;ramp.add(block);
 // Matching block stood on its short end, cores facing the approaching rider.
 const upright=new T.Mesh(blockGeo,concrete);upright.name='Upright approach cinder block';upright.rotation.z=Math.PI/2;
 // Negative ramp local X points toward the curb; local Z is direction of travel.
 const uprightOffset=local(RAMP,RAMP.uprightAnchor.x,RAMP.uprightAnchor.z);
 upright.position.set(-RAMP.width/2-.20-uprightOffset.u,0,-RAMP.length/2-.26+uprightOffset.v);ramp.add(upright);ramp.updateMatrixWorld(true);
 const ub=new T.Box3().setFromObject(upright),uc=ub.getCenter(new T.Vector3());upright.position.y+=view.surfaceGround(uc.x,uc.z)-ub.min.y+.004;ramp.updateMatrixWorld(true);
 const ug=upright.geometry,up=ug.attributes.position,ui=ug.index;for(let k=0;k<(ui?ui.count:up.count);k++){const v=new T.Vector3().fromBufferAttribute(up,ui?ui.getX(k):k).applyMatrix4(upright.matrixWorld);supports.push(v.x,v.y,v.z);}
 // Solid frame strips keep the two actual core openings clear.
 const addBlockStrip=(x,y,hx,hy)=>{const c=new T.Vector3(x,y,.095).applyMatrix4(upright.matrixWorld);view.detailSolids.push({kind:'CINDER_BLOCK',x:c.x,z:c.z,hx:hy,hz:.095,yaw:-ramp.rotation.y,bottom:c.y-hx,top:c.y+hx});};
 for(const x of [-.173,0,.173])addBlockStrip(x,0,x===0?.034:.017,.0925);
 for(const y of [-.07375,.07375])addBlockStrip(0,y,.19,.01875);
 upright.castShadow=upright.receiveShadow=true;
 // The supporting block also has solid frame strips, below the rideable plywood surface.
 const underStrip=(x,y,hx,hy)=>{const c=new T.Vector3(x,y,.095).applyMatrix4(block.matrixWorld);view.detailSolids.push({rampSupport:true,kind:'CINDER_BLOCK',x:c.x,z:c.z,hx,hz:.095,yaw:-ramp.rotation.y,bottom:c.y-hy,top:c.y+hy});};
 // The plywood owns the covered top/center approach; exposed side walls and lower sill stay solid.
 for(const x of [-.173,.173])underStrip(x,0,.017,.0925);
 underStrip(0,-.07375,.19,.01875);

 // Identical top sampling in rendered support and the passive launch rule.
 const quad=[];for(const [u,v]of [[-RAMP.width/2,-RAMP.length/2],[RAMP.width/2,-RAMP.length/2],[RAMP.width/2,RAMP.length/2],[-RAMP.width/2,RAMP.length/2]]){const p=at(RAMP,u,v);quad.push([p.x,ramp.position.y+.003+(v/RAMP.length+.5)*RAMP.rise,p.z]);}for(const i of [0,1,2,0,2,3])supports.push(...quad[i]);
 // Large circular returns replace the former narrow chamfered connectors.
 buildPathReturns(view,root,supports,surfaceMesh);

 addBarriers(view,root,supports);supportUnion(view,supports);view.detailRoot=root;
}
function addYoungTrees(view,root){const bark=paintedMaterial(0x625e57,{architecture:true}),leafColors=[0x788578,0x879180,0x6c807b,0x818a78];let seed=85;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const branch=(group,a,b,r)=>{const d=b.clone().sub(a),m=new T.Mesh(new T.CylinderGeometry(r*.52,r,d.length(),7),bark);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());m.castShadow=true;group.add(m);};
 for(const [ci,c] of TREE_CLUSTERS.entries())for(let t=0;t<c.count;t++){const ang=rnd()*6.28,rad=t?2+rnd()*3.8:0,x=c.x+Math.cos(ang)*rad,z=c.z+Math.sin(ang)*rad;if(roadDistance(x,z)<3||FOOTPATH.slice(1).some((b,i)=>{const a=FOOTPATH[i],dx=b.x-a.x,dz=b.z-a.z,t=T.MathUtils.clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz),0,1);return Math.hypot(x-a.x-t*dx,z-a.z-t*dz)<2.5;}))continue;const h=3.4+rnd()*2.3,g=new T.Group();g.name=c.id+' young broadleaf '+t;g.position.set(x,view.surfaceGround(x,z),z);root.add(g);branch(g,new T.Vector3(),new T.Vector3(.10,h*.36,-.035),.075);branch(g,new T.Vector3(.10,h*.36,-.035),new T.Vector3(.25,h*.77,.03),.053);view.detailSolids.push({kind:'YOUNG_TREE',x,z,radius:.08,bottom:g.position.y,top:g.position.y+h*.8});
  for(let k=0;k<3;k++){const y=h*(.62+k*.14),w=(1.55+rnd()*.60)*(k===0?.8:1),cx=(k===1?-.55:k===2?.40:0),cz=(rnd()-.5)*.7;branch(g,new T.Vector3(.05,y*.64,0),new T.Vector3(cx,y,cz),.033);const geo=new T.SphereGeometry(1,24,16),pos=geo.attributes.position;for(let j=0;j<pos.count;j++){const px=pos.getX(j),py=pos.getY(j),pz=pos.getZ(j),a=Math.atan2(pz,px),r=1+.08*Math.sin(a*5+ci)*Math.pow(1-py*py,2)+.06*Math.sin(py*8+k);pos.setXYZ(j,px*w*r,py*w*.72,pz*w*.76*r);}geo.computeVertexNormals();const mat=paintedMaterial(leafColors[(ci+k)%leafColors.length]),old=mat.onBeforeCompile;mat.onBeforeCompile=s=>{old(s);s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n diffuseColor.rgb*=.91+.09*pnoise(pw.xz*.8+pw.y*.33);');};const m=new T.Mesh(geo,mat);m.position.set(cx,y,cz);m.rotation.y=ci*.57+t*.31;m.castShadow=m.receiveShadow=true;g.add(m);}
 }
 const c=TREE_CLUSTERS[0];view.detailTargets.trees=new T.Vector3(c.x,view.surfaceGround(c.x,c.z)+2.7,c.z);
}

export function installRoadDetailsSurface(view){const mesh=view.detailAsphalt;sculptRoad(mesh);const apron=view.scene.getObjectByName('Continuous shared gate apron').geometry.attributes.position.array;view.roadContact=new PavementContact(new Float32Array([...apron,...mesh.geometry.attributes.position.array]));}

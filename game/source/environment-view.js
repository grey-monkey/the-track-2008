import {preparePathMouths} from './path-returns.js';
import {siteMaterial} from './barriers90.js';
import {installRoadShadows} from './road-shadows.js';
import {buildRoadDetails,installRoadDetailsSurface} from './detail-geometry.js';
import {installHazards} from './environment-hazards.js';
import {addStreetlights} from './streetlights.js';
import {junctionEdges,bulbEdges} from './junction-shape.js';
import {finishJunction} from './junction-curb.js';
import * as T from './vendor/three.module.js';
import {View as NativeView} from './native-painted.js';
import {buildEntryApron} from './entry-apron.js';
import {buildMemoryGate} from './memory-gate.js';
import {circuitCovers,circuitDrains,circuitHydrants} from './site-layout.js';
import {finishCircuitCurbs} from './circuit-curb.js';
import {installSurfaceSampler} from './surface-ground.js';
import {props} from './environment-props-data.js';
import {textures} from './environment-textures.js';
import {paintedMaterial} from './pigment.js';
import {entrancePoints,roadPoints,bulb,ENTRANCE_HOUSES,height,terrainHeight} from './world.js';
const maps={};for(const [n,p] of Object.entries(props)){maps[n]=await new T.TextureLoader().loadAsync(p.texture);maps[n].colorSpace=T.SRGBColorSpace;maps[n].anisotropy=4;}
const surfaces={};for(const [n,url]of Object.entries(textures)){const t=await new T.TextureLoader().loadAsync(url);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;surfaces[n]=t;}
function texturedWorld(mat,texture,scale,amount){const old=mat.onBeforeCompile,key=mat.customProgramCacheKey;mat.customProgramCacheKey=()=>key()+'site29'+scale+amount;mat.onBeforeCompile=s=>{old(s);s.uniforms.siteTexture={value:texture};s.fragmentShader='uniform sampler2D siteTexture;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>\nvec2 siteUV=abs(pn.y)>.65?pw.xz:${scale===.55?'vec2(pw.x*.66-pw.z*.75,pw.y)':'vec2(pw.x+pw.z,pw.y)'};vec3 siteColor=texture2D(siteTexture,siteUV*${scale.toFixed(3)}).rgb;float siteTone=dot(siteColor,vec3(.299,.587,.114));diffuseColor.rgb*=mix(1.,.45+siteTone*1.6,${amount.toFixed(3)});`);};mat.needsUpdate=true;}
export class View extends NativeView{
 lamp(){} // Replace all legacy procedural streetlights after the ground has been fitted.
 constructor(canvas){super(canvas);buildEntryApron(this);finishCircuitCurbs(this);finishJunction(this);installRoadDetailsSurface(this);installSurfaceSampler(this);preparePathMouths(this);installSurfaceSampler(this);this.addSite();addStreetlights(this);if(this.entranceGate)this.entranceGate.visible=false;this.memoryGate=buildMemoryGate(this);const center=this.memoryGate.position;this.scene.traverse(o=>{if(o.name!=='Entrance woodland stand')return;o.geometry.computeBoundingBox();const c=o.geometry.boundingBox.getCenter(new T.Vector3()),dx=c.x-center.x,dz=c.z-center.z,d=Math.hypot(dx,dz);if(d<30){o.position.x+=dx/d*(30-d);o.position.z+=dz/d*(30-d);}});let forestMap;this.scene.traverse(o=>{if(o.name==='Entrance woodland stand')forestMap=o.material.map;});this.scene.updateMatrixWorld(true);const inv=this.memoryGate.matrixWorld.clone().invert();this.scene.traverse(o=>{if(!forestMap||o.material?.map!==forestMap)return;const geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry,attrs=geo.attributes,keep=[];const size=o.name==='Entrance woodland stand'?72:geo.parameters?.width?geo.attributes.position.count:18;for(let start=0;start<attrs.position.count;start+=size){let near=false;for(let j=start;j<Math.min(start+size,attrs.position.count);j++){const q=new T.Vector3().fromBufferAttribute(attrs.position,j).applyMatrix4(o.matrixWorld).applyMatrix4(inv);if(q.x>-22&&q.x<24&&q.z>-9&&q.z<23)near=true;}if(!near)for(let j=start;j<Math.min(start+size,attrs.position.count);j++)keep.push(j);}if(keep.length===attrs.position.count)return;const clean=new T.BufferGeometry();for(const [name,a]of Object.entries(attrs))clean.setAttribute(name,new T.Float32BufferAttribute(keep.flatMap(i=>Array.from(a.array.slice(i*a.itemSize,(i+1)*a.itemSize))),a.itemSize));clean.computeBoundingSphere();o.geometry=clean;});this.siteTargets.junction=new T.Vector3(entrancePoints[0].x,height(entrancePoints[0].x,entrancePoints[0].z),entrancePoints[0].z);this.siteTargets.gate=this.memoryGate.position.clone().add(new T.Vector3(0,1.3,0));buildRoadDetails(this);installHazards(this);installRoadShadows(this);}
 addSite(){const root=new T.Group();root.name='Environment asset trial';this.scene.add(root);this.site=root;const batch=new Map();
 const concrete=paintedMaterial(0xb3a596,{architecture:true}),iron=siteMaterial(0x393b3d),dark=siteMaterial(0x171e26),clay=paintedMaterial(0xa47456,{ground:true,earth:true});texturedWorld(concrete,surfaces.rough_concrete,1.1,.65);
 const ground=(x,z)=>this.surfaceGround(x,z);this.contactAudit={cabinets:[],covers:[],drains:[]};
 const at=(i,side=0)=>{const p=entrancePoints[i],a=entrancePoints[i-1],b=entrancePoints[i+1],yaw=Math.atan2(b.z-a.z,b.x-a.x);return{x:p.x-Math.sin(yaw)*side,z:p.z+Math.cos(yaw)*side,yaw};};
 const roadAt=(i,side=0)=>{const n=roadPoints.length,k=(i+n)%n,p=roadPoints[k],a=roadPoints[(k+n-1)%n],b=roadPoints[(k+1)%n],yaw=Math.atan2(b.z-a.z,b.x-a.x);return{x:p.x-Math.sin(yaw)*side,z:p.z+Math.cos(yaw)*side,yaw};};
 const box=(w,h,d,mat,x,y,z,rot=0)=>{const g=new T.BoxGeometry(w,h,d).toNonIndexed();g.applyMatrix4(new T.Matrix4().compose(new T.Vector3(x,y,z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),rot),new T.Vector3(1,1,1)));const gs=batch.get(mat)??[];gs.push(g);batch.set(mat,gs);};
 const asset=(name,p,scale=1,rotation=0)=>{const group=new T.Group();group.name=name;group.userData.assetKind=name;group.position.set(p.x,ground(p.x,p.z),p.z);group.rotation.y=rotation;group.scale.setScalar(scale);const mat=siteMaterial(name==='utility_box_02'?0x9da693:0xffffff);mat.map=maps[name];for(const part of props[name].parts){const geo=new T.BufferGeometry();for(const k of ['position','normal','uv'])geo.setAttribute(k,new T.Float32BufferAttribute(part[k],k==='uv'?2:3));geo.computeBoundingSphere();const m=new T.Mesh(geo,mat);m.castShadow=true;m.receiveShadow=true;group.add(m);}root.add(group);return group;};
 const placeCabinet=(p,scale,rotation)=>{const c=Math.cos(rotation),s=Math.sin(rotation),samples=[];for(let ix=-2;ix<=2;ix++)for(let iz=-2;iz<=2;iz++){const x=ix*.30,z=iz*.18;samples.push(ground(p.x+c*x+s*z,p.z-s*x+c*z));}const low=Math.min(...samples),top=Math.max(...samples)+.085,bottom=low-.055;box(1.2,top-bottom,.72,concrete,p.x,(top+bottom)/2,p.z,rotation);const m=asset('utility_box_02',p,scale,rotation);m.position.y=top+.002;this.contactAudit.cabinets.push({x:p.x,z:p.z,padTop:top,base:m.position.y,minPadExposure:top-Math.max(...samples)});return m;};
 this.siteTargets={};
 const hydrant=at(47,-5.6),hydrantMesh=asset('fire_hydrant',hydrant,1.12,-hydrant.yaw);hydrantMesh.position.y=Math.max(...Array.from({length:9},(_,i)=>ground(hydrant.x+Math.cos(i*Math.PI/4)*.13,hydrant.z+Math.sin(i*Math.PI/4)*.13)))+.008;this.siteTargets.hydrant=hydrantMesh.position.clone();
 const covers=[];this.drainHazards=[];
 const manhole=(p,kind)=>{const cover=asset('water_manhole_cover',p,1,-p.yaw);cover.name=kind+' access cover';const gx=(ground(p.x+.4,p.z)-ground(p.x-.4,p.z))/.8,gz=(ground(p.x,p.z+.4)-ground(p.x,p.z-.4))/.8;const align=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),new T.Vector3(-gx,1,-gz).normalize());cover.quaternion.premultiply(align);cover.position.y+=.028;cover.updateMatrixWorld(true);let lift=-Infinity;const rim=[];for(const m of cover.children){const a=m.geometry.attributes.position;for(let i=0;i<a.count;i++){if(a.getY(i)<-.006)continue;const v=new T.Vector3().fromBufferAttribute(a,i).applyMatrix4(m.matrixWorld);rim.push(v);lift=Math.max(lift,(this.roadContact.height(v.x,v.z)??ground(v.x,v.z))+.018-v.y);}}cover.position.y+=lift;this.contactAudit.covers.push({x:p.x,z:p.z,minLip:Math.min(...rim.map(v=>v.y+lift-(this.roadContact.height(v.x,v.z)??ground(v.x,v.z))))});const recess=new T.Mesh(new T.CircleGeometry(.346,48),dark);recess.rotation.x=-Math.PI/2;recess.quaternion.premultiply(align);recess.position.set(p.x,ground(p.x,p.z)+.002,p.z);root.add(recess);covers.push({kind,x:p.x,z:p.z,radius:.346});return cover.position.clone();};
 const mh=at(44,-1.25);this.siteTargets.manhole=manhole(mh,'water');this.siteTargets.sewer=manhole(at(36,1.25),'sewer');manhole(at(17,-1.25),'water');manhole(at(23,1.25),'sewer');
 // Two independent utility alignments; station spacing is deliberately staggered.
 for(const spec of circuitCovers)manhole(roadAt(spec.index,spec.side),spec.kind);
 this.utilityCovers=covers;
 const utility=at(34,-8.1),cabinet=placeCabinet(utility,1,-utility.yaw+Math.PI/2);this.siteTargets.utility=cabinet.position.clone();
 // A fitted storm grate: framed metal bars with actual openings and a dark sump.
 // Follow the actual tapered gutter edge, including its local road grade.
 const gutterAt=i=>{const t=Math.max(0,Math.min(1,(i-32)/24)),w=4.25+1.0625*t*t*(3-2*t);return at(i,-(w-.29));};
 const makeDrain=(drain,da,db,pad=false)=>{const roadGround=(x,z)=>this.roadContact.height(x,z)??height(x,z)+.035;const y=ground(drain.x,drain.z)+.055;
 const xAxis=new T.Vector3(db.x-da.x,(this.roadContact.height(db.x,db.z)??ground(db.x,db.z))-(this.roadContact.height(da.x,da.z)??ground(da.x,da.z)),db.z-da.z).normalize();
 const across=new T.Vector3().crossVectors(xAxis,new T.Vector3(0,1,0)).normalize();across.y=(roadGround(drain.x+across.x*.25,drain.z+across.z*.25)-roadGround(drain.x-across.x*.25,drain.z-across.z*.25))/.5;const up=new T.Vector3().crossVectors(across,xAxis).normalize(),zAxis=new T.Vector3().crossVectors(xAxis,up).normalize(),drainFrame=new T.Matrix4().makeBasis(xAxis,up,zAxis);drainFrame.setPosition(drain.x,0,drain.z);let support=-Infinity;const checks=[];for(const xx of [-.51,-.255,0,.255,.51])for(const zz of [-.28,-.14,0,.14,.28]){const v=new T.Vector3(xx,.0072,zz).applyMatrix4(drainFrame);checks.push(v);support=Math.max(support,ground(v.x,v.z)+.020-v.y);}drainFrame.setPosition(drain.x,support,drain.z);this.drainHazards.push({x:drain.x,z:drain.z,y:support+.0072,yaw:Math.atan2(xAxis.z,xAxis.x),hx:.485,hz:.275,gx:-up.x/up.y,gz:-up.z/up.y});this.contactAudit.drains.push({x:drain.x,z:drain.z,yaw:Math.atan2(xAxis.z,xAxis.x),minLip:Math.min(...checks.map(v=>v.y+support-ground(v.x,v.z)))});
 const piece=(w,h,d,mat,x,z,lift=0)=>{const g=new T.BoxGeometry(w,h*.32,d).toNonIndexed();g.translate(x,lift*.32,z);g.applyMatrix4(drainFrame);const gs=batch.get(mat)??[];gs.push(g);batch.set(mat,gs);};piece(.97,.015,.54,dark,0,0,-.025);for(const s of [-1,1]){piece(.97,.045,.045,iron,0,s*.255);piece(.045,.045,.55,iron,s*.485,0);}for(let i=0;i<9;i++)piece(.045,.035,.46,iron,-.40+i*.10,0);if(pad){piece(1.35,.05,.68,concrete,0,0,-.056);}return new T.Vector3(drain.x,y,drain.z);};
 this.siteTargets.drain=makeDrain(gutterAt(41),gutterAt(40),gutterAt(42));
 const fitDrain=spec=>{let p=roadAt(spec.index,spec.side*3.96),a=roadAt(spec.index-1,spec.side*3.96),b=roadAt(spec.index+1,spec.side*3.96),best=null;
 for(const edge of [...junctionEdges,...bulbEdges])for(let i=0;i<edge.length-1;i++){const u=edge[i],v=edge[i+1],dx=v[0]-u[0],dz=v[1]-u[1],ll=dx*dx+dz*dz,t=Math.max(0,Math.min(1,((p.x-u[0])*dx+(p.z-u[1])*dz)/ll)),x=u[0]+dx*t,z=u[1]+dz*t,d=Math.hypot(p.x-x,p.z-z);if(d<2&&(!best||d<best.d))best={x,z,d,tx:dx/Math.sqrt(ll),tz:dz/Math.sqrt(ll)};}
 if(best){const q=best;p={x:q.x-q.tz*.29,z:q.z+q.tx*.29};a={x:p.x-q.tx*.6,z:p.z-q.tz*.6};b={x:p.x+q.tx*.6,z:p.z+q.tz*.6};}return{p,a,b};};
 this.circuitDrainPositions=circuitDrains.map(spec=>{const {p,a,b}=fitDrain(spec),pos=makeDrain(p,a,b,true);return{...spec,x:pos.x,y:pos.y,z:pos.z};});
 for(const spec of circuitHydrants){const p=roadAt(spec.index,spec.side),m=asset('fire_hydrant',p,1.12,-p.yaw);m.position.y=Math.max(...Array.from({length:8},(_,i)=>ground(p.x+Math.cos(i*Math.PI/4)*.13,p.z+Math.sin(i*Math.PI/4)*.13)))+.008;}
 for(const h of ENTRANCE_HOUSES.slice(1)){const p={x:h.x+(h.drive.x-h.x)*.70,z:h.z+(h.drive.z-h.z)*.70},m=placeCabinet(p,1,h.rotation);}
 this.siteTargets.westDrain=new T.Vector3(...['x','y','z'].map(k=>this.circuitDrainPositions[1][k]));this.siteTargets.eastDrain=new T.Vector3(...['x','y','z'].map(k=>this.circuitDrainPositions[5][k]));
 this.siteTargets.southCover=new T.Vector3(roadAt(226,1.25).x,ground(roadAt(226,1.25).x,roadAt(226,1.25).z),roadAt(226,1.25).z);

 // User-confirmed sold but undeveloped lots around the open cul-de-sac.
 // Fixed irregular placement: believable variation that stays put between visits.
 const lots=[{a:1.04,setback:3.8,turn:.06},{a:1.93,setback:2.7,turn:-.09},{a:3.01,setback:4.2,turn:.035},{a:3.94,setback:3.2,turn:.10},{a:5.01,setback:2.9,turn:-.055}];

 for(let li=0;li<lots.length;li++){const {a,setback,turn}=lots[li],radius=bulb.r+setback,p={x:bulb.x+Math.cos(a)*radius,z:bulb.z+Math.sin(a)*radius},cab=placeCabinet(p,.9,-a+Math.PI/2+turn);cab.name='Cul-de-sac lot utility '+(li+1);
 if(li===1)this.siteTargets.culdesac=new T.Vector3(p.x,ground(p.x,p.z)+.8,p.z);

 }
 for(const [mat,gs]of batch){const g=new T.BufferGeometry();for(const k of ['position','normal'])g.setAttribute(k,new T.Float32BufferAttribute(gs.flatMap(v=>Array.from(v.attributes[k].array)),3));g.computeBoundingSphere();root.add(new T.Mesh(g,mat));gs.forEach(g=>g.dispose());}
 // Material study on the mapped architecture; preserve its actual footprint.
 this.scene.traverse(m=>{if(!m.isMesh||!m.material?.color||m.material.map)return;const hex=m.material.color.getHex();if([0xa4a097,0xa69887,0x9c8876].includes(hex)){texturedWorld(m.material,surfaces.brown_brick_02,.55,.55);const ix=[0xa4a097,0xa69887,0x9c8876].indexOf(hex),hh=ENTRANCE_HOUSES[ix],base=height(hh.x,hh.z)+.32,old=m.material.onBeforeCompile;m.material.onBeforeCompile=s=>{old(s);s.fragmentShader=s.fragmentShader.replace('float siteTone=', 'float siteTone=');s.fragmentShader=s.fragmentShader.replace('diffuseColor.rgb*=mix(1.,.45+siteTone*1.6,0.550);',`float upper=smoothstep(${(base+2.8).toFixed(3)},${(base+2.86).toFixed(3)},pw.y);float course=1.-smoothstep(.025,.07,fract((pw.y-${base.toFixed(3)})*6.));diffuseColor.rgb*=mix(mix(1.,.45+siteTone*1.6,.55),.96-course*.11,upper);`);};}});
 this.siteTargets.overview=new T.Vector3(mh.x,ground(mh.x,mh.z)+1,mh.z);this.siteTargets.house=new T.Vector3(ENTRANCE_HOUSES[0].x,height(ENTRANCE_HOUSES[0].x,ENTRANCE_HOUSES[0].z)+3,ENTRANCE_HOUSES[0].z);
 this.siteStats={assetTriangles:Object.values(props).reduce((n,p)=>n+p.parts.reduce((a,m)=>a+m.position.length/9,0),0),importedAssets:3};
 }
}




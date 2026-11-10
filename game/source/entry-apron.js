import {rolledProfile,pouredGeometry} from './curb-profile.js';
import * as T from './vendor/three.module.js';
import {entrancePoints,terrainHeight} from './world.js';
import {paintedMaterial} from './pigment.js';
import {PavementContact} from './car-contact.js';
export function buildEntryApron(view){
 const ps=entrancePoints,old=view.roadContact,N=ps.length;
 const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
 const width=i=>4.25+1.0625*smooth((i-32)/24);
 const frame=i=>{const p=ps[i],a=ps[Math.max(0,i-1)],b=ps[Math.min(N-1,i+1)],l=Math.hypot(b.x-a.x,b.z-a.z);return{p,nx:-(b.z-a.z)/l,nz:(b.x-a.x)/l};};
 const coord=(i,u)=>{const f=frame(i);return{x:f.p.x+f.nx*u,z:f.p.z+f.nz*u};};
 const y=(i,u)=>{const p=coord(i,u),ref=coord(i,Math.max(-4.1,Math.min(4.1,u)));return(old.height(p.x,p.z)??old.height(ref.x,ref.z)??terrainHeight(p.x,p.z))+.009;};
 const nearest=(x,z)=>{let best={d:Infinity,i:0};for(let i=0;i<N-1;i++){const a=ps[i],b=ps[i+1],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz))),d=Math.hypot(x-a.x-t*dx,z-a.z-t*dz);if(d<best.d)best={d,i:i+t};}return best;};
 // Delete the legacy flat entrance curb, retaining the rest of the circuit.
 const mesh=view.baseCurbMesh;if(mesh){const g=mesh.geometry,p=g.attributes.position,a=[];for(let i=0;i<p.count;i+=3){let x=0,z=0;for(let k=0;k<3;k++){x+=p.getX(i+k)/3;z+=p.getZ(i+k)/3;}const n=nearest(x,z);if(n.d<4.8&&n.d>3.7&&n.i>1)continue;for(let k=0;k<3;k++)a.push(p.getX(i+k),p.getY(i+k),p.getZ(i+k));}const gg=new T.BufferGeometry();gg.setAttribute('position',new T.Float32BufferAttribute(a,3));gg.computeVertexNormals();mesh.geometry=gg;g.dispose();}
 // Grade earth under the shared apron. The shoulder below reconnects to raw lots.
 let earthContact;view.scene.traverse(o=>{if(!o.isMesh||o.geometry.parameters?.width!==700)return;const p=o.geometry.attributes.position;for(let i=0;i<p.count;i++){const n=nearest(p.getX(i),p.getZ(i));if(n.i<2||n.i>N-2)continue;const w=width(n.i),d=n.d;if(d<w+6){const yy=y(Math.round(n.i),0)-.08;const blend=1-smooth((d-w-3)/3);p.setY(i,Math.min(p.getY(i),p.getY(i)+(yy-p.getY(i))*blend));}}p.needsUpdate=true;o.geometry.computeVertexNormals();const tri=o.geometry.toNonIndexed(),pa=tri.attributes.position,out=[];for(let j=0;j<pa.count;j+=3){const n=nearest(pa.getX(j),pa.getZ(j));if(n.d<width(n.i)+9&&n.i>0)for(let k=0;k<3;k++)out.push(pa.getX(j+k),pa.getY(j+k),pa.getZ(j+k));}earthContact=new PavementContact(new Float32Array(out));tri.dispose();});
 const road=[],curb=[],earth=[],edgeJoint=[];
 const quad=(out,v)=>{for(const k of [0,1,2,0,2,3])out.push(...v[k]);};
 const profile=rolledProfile;
 for(let i=2;i<N-1;i++){
  // Shared transverse grid avoids separate sheets fighting at the former edge.
  for(let j=0;j<16;j++){const u=j/16*2-1,v=(j+1)/16*2-1;quad(road,[[i,u],[i+1,u],[i+1,v],[i,v]].map(([k,t])=>{const p=coord(k,width(k)*t);return[p.x,y(k,width(k)*t),p.z];}));}
  for(const side of [-1,1]){
   // Narrow dark isolation joint follows the same stations as the poured edge.
   quad(edgeJoint,[[i,-.565],[i+1,-.565],[i+1,-.53],[i,-.53]].map(([k,u])=>{const p=coord(k,side*(width(k)+u));return[p.x,Math.max(y(k,side*(width(k)+u)),y(k,side*4.1))+.005,p.z];}));
   // Rounded concrete starts nearly flush with the asphalt isolation seam.
   for(let j=0;j<profile.length-1;j++)quad(curb,[[i,j],[i+1,j],[i+1,j+1],[i,j+1]].map(([k,l])=>{const [u,h]=profile[l],p=coord(k,side*(width(k)+u));return[p.x,y(k,side*(width(k)+u))+h,p.z];}));
   for(let j=0;j<5;j++)quad(earth,[[i,j],[i+1,j],[i+1,j+1],[i,j+1]].map(([k,l])=>{const t=l/5,p=coord(k,side*(width(k)+.4+t*2.6)),base=y(k,side*4.1)+.08,yy=base*(1-t)+((earthContact?.height(p.x,p.z)??terrainHeight(p.x,p.z))+.012)*t;return[p.x,yy,p.z];}));
  }
 }
 const add=(pos,mat,name)=>{const g=name==='Tapered rolled curb'?pouredGeometry(pos):new T.BufferGeometry();if(!g.attributes.position){g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.computeVertexNormals();}const m=new T.Mesh(g,mat);m.name=name;view.scene.add(m);return m;};
 const asphalt=paintedMaterial(0x344266,{ground:true,road:true});asphalt.polygonOffset=true;asphalt.polygonOffsetFactor=0;asphalt.polygonOffsetUnits=-2;
 add(road,asphalt,'Continuous shared gate apron');add(edgeJoint,paintedMaterial(0x22282a,{architecture:true}),'Asphalt concrete isolation joint');const concrete=paintedMaterial(0xb3afa2,{architecture:true,concrete:true}),oldCompile=concrete.onBeforeCompile;concrete.customProgramCacheKey=()=> 'poured-concrete-55-9';concrete.onBeforeCompile=s=>{oldCompile(s);s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
float curbPores=step(.97,phash(floor(pw.xz*160.)));float trowel=sin(pw.x*37.+pw.z*31.)*sin(pw.z*2.3);diffuseColor.rgb*=1.-curbPores*.12+trowel*.016;`);};add(curb,concrete,'Tapered rolled curb');
 const cuts=[];let station=0,last=0;for(let i=3;i<N-1;i++){station+=Math.hypot(ps[i].x-ps[i-1].x,ps[i].z-ps[i-1].z);if(station-last<3)continue;last=station;const f=frame(i),tx=f.nz,tz=-f.nx;for(const side of [-1,1])for(let j=0;j<profile.length-1;j++){const a=profile[j],b=profile[j+1],v=[];for(const [pr,sign]of [[a,-1],[a,1],[b,1],[b,-1]]){const p=coord(i,side*(width(i)+pr[0]));v.push([p.x+tx*.006*sign,y(i,side*(width(i)+pr[0]))+pr[1]+.002,p.z+tz*.006*sign]);}quad(cuts,v);}}add(cuts,paintedMaterial(0x646664,{architecture:true}),'Concrete contraction joints');add(earth,paintedMaterial(0xae754e,{ground:true,earth:true}),'Graded unfinished shoulders');
 const prior=old.triangles.flatMap(t=>t.p);view.roadContact=new PavementContact(new Float32Array([...road,...prior]));const shoulderContact=new PavementContact(new Float32Array(earth)),curbContact=new PavementContact(new Float32Array(curb));view.entranceGround=(x,z)=>{const levels=[view.roadContact.height(x,z),shoulderContact.height(x,z),curbContact.height(x,z),earthContact?.height(x,z)].filter(Number.isFinite);return levels.length?Math.max(...levels):terrainHeight(x,z);};view.entryApron={gateWidth:10.625,roadWidth:8.5,median:false};
}

import {rolledProfile,pouredGeometry} from './curb-profile.js';
import {PavementContact} from './car-contact.js';
import * as T from './vendor/three.module.js';
import {roadPoints,roadDistance,terrainHeight,height} from './world.js';
import {paintedMaterial} from './pigment.js';
export function finishCircuitCurbs(view){const ps=roadPoints,N=ps.length,cp=[],seam=[],soil=[],cuts=[];
const point=(i,u)=>{const p=ps[(i+N)%N],a=ps[(i+N-1)%N],b=ps[(i+1)%N],l=Math.hypot(b.x-a.x,b.z-a.z);return{x:p.x-(b.z-a.z)/l*u,z:p.z+(b.x-a.x)/l*u};};
const base=(i,side,u=3.8)=>{const p=point(i,side*u);return view.roadContact.height(p.x,p.z)??height(p.x,p.z)+.035;};
const profile=rolledProfile;
const quad=(out,v)=>{for(const k of [0,1,2,0,2,3])out.push(...v[k]);};let dist=0,last=0;
for(let i=0;i<N;i++){const j=(i+1)%N;dist+=Math.hypot(ps[j].x-ps[i].x,ps[j].z-ps[i].z);const joint=dist-last>3;if(joint)last=dist;
for(const side of [-1,1]){const e=point(i,side*4.3),ee=point(j,side*4.3);if(roadDistance(e.x,e.z)<-.1||roadDistance(ee.x,ee.z)<-.1)continue;
for(let k=0;k<profile.length-1;k++)quad(cp,[[i,k],[j,k],[j,k+1],[i,k+1]].map(([n,l])=>{const [u,h]=profile[l],p=point(n,side*(4.25+u));return[p.x,base(n,side,4.25+u)+h,p.z];}));
quad(seam,[[i,3.685],[j,3.685],[j,3.72],[i,3.72]].map(([n,u])=>{const p=point(n,side*u);return[p.x,Math.max(base(n,side),view.roadContact.height(p.x,p.z)??base(n,side))+.008,p.z];}));
for(let k=0;k<8;k++)quad(soil,[[i,k],[j,k],[j,k+1],[i,k+1]].map(([n,l])=>{const t=l/8,p=point(n,side*(4.65+t*3)),v=(base(n,side)+.08)*(1-t)+(terrainHeight(p.x,p.z)+.025)*t;return[p.x,Math.max(v,terrainHeight(p.x,p.z)+.016),p.z];}));
if(joint){const f=point(i,side*4.25),g=point(j,side*4.25),len=Math.hypot(g.x-f.x,g.z-f.z),tx=(g.x-f.x)/len,tz=(g.z-f.z)/len;for(let k=0;k<profile.length-1;k++)quad(cuts,[[k,-1],[k,1],[k+1,1],[k+1,-1]].map(([l,s])=>{const p=point(i,side*(4.25+profile[l][0]));return[p.x+tx*s*.006,base(i,side,4.25+profile[l][0])+profile[l][1]+.003,p.z+tz*s*.006];}));}
}}
const mesh=view.baseCurbMesh;if(mesh){const p=mesh.geometry.attributes.position,keep=[];for(let i=0;i<p.count;i+=3){const x=(p.getX(i)+p.getX(i+1)+p.getX(i+2))/3,z=(p.getZ(i)+p.getZ(i+1)+p.getZ(i+2))/3;let near=false;for(let j=0;j<N&&!near;j++)for(const side of [-1,1]){const e=point(j,side*4.25);if(Math.hypot(e.x-x,e.z-z)<2.2)near=true;}if(!near)for(let k=0;k<3;k++)keep.push(p.getX(i+k),p.getY(i+k),p.getZ(i+k));}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(keep,3));g.computeVertexNormals();mesh.geometry=g;}
const add=(p,m,name)=>{const g=name==='Circuit poured curb'?pouredGeometry(p):new T.BufferGeometry();if(!g.attributes.position){g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.computeVertexNormals();}const o=new T.Mesh(g,m);o.name=name;view.scene.add(o);};add(cp,view.scene.getObjectByName('Tapered rolled curb').material,'Circuit poured curb');add(seam,paintedMaterial(0x22282a,{architecture:true}),'Circuit asphalt joints');add(cuts,paintedMaterial(0x646664,{architecture:true}),'Circuit concrete joints');add(soil,paintedMaterial(0xae754e,{ground:true,earth:true}),'Circuit earth shoulders');const contact=new PavementContact(new Float32Array([...cp,...soil])),prior=view.entranceGround;view.entranceGround=(x,z)=>Math.max(prior(x,z),contact.height(x,z)??-Infinity);
}

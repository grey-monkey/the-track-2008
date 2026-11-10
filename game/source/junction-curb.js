import {rolledProfile,pouredGeometry} from './curb-profile.js';
import {PavementContact} from './car-contact.js';
import {pavement} from './road-mesh.js';
import * as T from './vendor/three.module.js';
import {junctionEdges,junctionBounds,bulbEdges,bulbBounds} from './junction-shape.js';
import {height,terrainHeight} from './world.js';
import {paintedMaterial} from './pigment.js';
// Exact rectangular clipping shares endpoints between existing pours and the new returns.
let planes;
function split(poly,fn){const yes=[],no=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],fa=fn(a),fb=fn(b);(fa>=0?yes:no).push(a);if((fa<0)!==(fb<0)){const t=fa/(fa-fb),p=a.map((v,k)=>v+(b[k]-v)*t);yes.push(p);no.push(p);}}return[yes,no];}
function emit(out,p){for(let i=1;i<p.length-1;i++)for(const v of [p[0],p[i],p[i+1]])out.push(...v);}
function clip(values,inside){const out=[];for(let i=0;i<values.length;i+=9){let p=[values.slice(i,i+3),values.slice(i+3,i+6),values.slice(i+6,i+9)];for(const fn of planes){if(!p.length)break;const [yes,no]=split(p,fn);if(!inside)emit(out,no);p=yes;}if(inside)emit(out,p);}return out;}
const geo=pos=>{const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g;};
export function finishJunction(view){finishRegion(view,junctionEdges,junctionBounds,'Junction');finishRegion(view,bulbEdges,bulbBounds,'Bulb');}
function finishRegion(view,edges,bounds,prefix){
 const [x0,z0,x1,z1]=bounds;planes=[p=>p[0]-x0,p=>x1-p[0],p=>p[2]-z0,p=>z1-p[2]];
 const concrete=view.scene.getObjectByName('Tapered rolled curb').material;
 const names=new Set(['Tapered rolled curb','Circuit poured curb','Circuit asphalt joints','Circuit concrete joints','Circuit earth shoulders','Asphalt concrete isolation joint','Concrete contraction joints','Graded unfinished shoulders','Continuous shared gate apron']);
 view.scene.traverse(o=>{if(o!==view.baseCurbMesh&&!names.has(o.name))return;const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry;const p=clip(Array.from(g.attributes.position.array),false);o.geometry=geo(p);});
 // Rebuild contact from the same clipped apron and unified asphalt used on screen.
 const road=[];for(let i=0;i<pavement.road.length;i+=2){const x=pavement.road[i],z=pavement.road[i+1];road.push(x,height(x,z)+.035,z);}
 const apron=view.scene.getObjectByName('Continuous shared gate apron').geometry.attributes.position.array;
 const contact=[];for(const n of apron)contact.push(n);for(const n of road)contact.push(n);
 view.roadContact=new PavementContact(new Float32Array(contact));
 const curb=[],seam=[],cuts=[],soil=[];
 const profile=rolledProfile;
 const quad=(out,v)=>{for(const k of [0,1,2,0,2,3])out.push(...v[k]);};
 let station=0,last=0;
 for(const edge of edges)for(let i=0;i<edge.length-1;i++){
  const a=edge[i],b=edge[i+1],len=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=(b[1]-a[1])/len,nz=-(b[0]-a[0])/len;
  // Exterior CCW / holes CW both leave the pavement to their right.
  const point=(p,u,h)=>{const k=p===a?i:i+1,prev=edge[Math.max(0,k-1)],next=edge[Math.min(edge.length-1,k+1)],dl=Math.hypot(next[0]-prev[0],next[1]-prev[1]),vx=(next[1]-prev[1])/dl,vz=-(next[0]-prev[0])/dl,miter=Math.max(.8,vx*nx+vz*nz);const x=p[0]+vx*u/miter,z=p[1]+vz*u/miter;return[x,(view.roadContact.height(x,z)??height(x,z)+.035)+h,z];};
  for(let k=0;k<profile.length-1;k++)quad(curb,[[a,k],[b,k],[b,k+1],[a,k+1]].map(([p,j])=>point(p,...profile[j])));
  quad(seam,[point(a,-.565,.006),point(b,-.565,.006),point(b,-.53,.006),point(a,-.53,.006)]);
  for(let j=0;j<10;j++)quad(soil,[[a,j],[b,j],[b,j+1],[a,j+1]].map(([p,k])=>{const t=k/10,q=point(p,.4+3*t,.08);q[1]=Math.max(q[1]*(1-t)+(terrainHeight(q[0],q[2])+.025)*t,terrainHeight(q[0],q[2])+.016);return q;}));
  station+=len;if(station-last>=3){last=station;for(let k=0;k<profile.length-1;k++)quad(cuts,[[k,-1],[k,1],[k+1,1],[k+1,-1]].map(([j,s])=>{const q=point(a,...profile[j]);q[0]+=(b[0]-a[0])/len*s*.006;q[2]+=(b[1]-a[1])/len*s*.006;q[1]+=.002;return q;}));}
 }
 const add=(p,m,name)=>{const o=new T.Mesh(name.endsWith('poured curb')?pouredGeometry(clip(p,true)):geo(clip(p,true)),m);o.name=name;view.scene.add(o);};
 add(curb,concrete,prefix+' poured curb');add(seam,paintedMaterial(0x22282a,{architecture:true}),prefix+' asphalt seam');add(cuts,paintedMaterial(0x646664,{architecture:true}),prefix+' concrete joints');add(soil,paintedMaterial(0xae754e,{ground:true,earth:true}),prefix+' earth shoulders');
}

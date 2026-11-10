import * as T from './vendor/three.module.js';
import {PavementContact} from './car-contact.js';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
// Cut only the walking corridor; the surrounding berm retains its original shape.
export function gradePathCorridors(view,layout,grid){
 const {rows,length}=layout,columns=grid[0].length-1,endLength=18,flat=4;
 const original=grid.map(row=>row.map(p=>p.slice()));
 for(const reverse of [false,true]){
  const ids=rows.map((r,i)=>i).filter(i=>(reverse?length-rows[i].s:rows[i].s)<=endLength+.01);if(reverse)ids.reverse();
  const start=ids[0],last=ids.at(-1),neighbor=last+(reverse?-1:1);
  for(let j=0;j<=columns;j++){
   const p=original[start][j],road=view.roadContact.height(p[0],p[2])??view.surfaceGround(p[0],p[2]),y0=road+.018,y1=original[last][j][1];
   const slope=clamp((original[neighbor][j][1]-y1)/Math.abs(rows[neighbor].s-rows[last].s),-.10,.10);
   for(const i of ids){const d=reverse?length-rows[i].s:rows[i].s,t=clamp((d-flat)/(endLength-flat)),h=endLength-flat;
    grid[i][j][1]=d<=flat?y0:(2*t**3-3*t*t+1)*y0+(-2*t**3+3*t*t)*y1+(t**3-t*t)*h*slope;
   }
  }
 }
 const segments=[];for(let i=1;i<rows.length;i++)if(rows[i-1].s<endLength||rows[i].s>length-endLength)segments.push(i);
 const boxes=[rows.filter(r=>r.s<=endLength+.4),rows.filter(r=>r.s>=length-endLength-.4)].map(rs=>({xmin:Math.min(...rs.map(r=>r.x))-4,xmax:Math.max(...rs.map(r=>r.x))+4,zmin:Math.min(...rs.map(r=>r.z))-4,zmax:Math.max(...rs.map(r=>r.z))+4}));
 const near=(a,b,c)=>{if(!boxes.some(q=>Math.min(a[0],b[0],c[0])<=q.xmax&&Math.max(a[0],b[0],c[0])>=q.xmin&&Math.min(a[2],b[2],c[2])<=q.zmax&&Math.max(a[2],b[2],c[2])>=q.zmin))return false;
  const x=(a[0]+b[0]+c[0])/3,z=(a[2]+b[2]+c[2])/3,radius=Math.max(...[a,b,c].map(p=>Math.hypot(p[0]-x,p[2]-z)));
  return segments.some(i=>{const a=rows[i-1],b=rows[i],dx=b.x-a.x,dz=b.z-a.z,t=clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz));return Math.hypot(x-a.x-dx*t,z-a.z-dz*t)<=radius+Math.max(a.w,b.w)+.3;});};
 function cut(x,z,y){let best=null;for(const i of segments){const a=rows[i-1],b=rows[i],dx=b.x-a.x,dz=b.z-a.z,l2=dx*dx+dz*dz,t=clamp(((x-a.x)*dx+(z-a.z)*dz)/l2),px=a.x+dx*t,pz=a.z+dz*t,d=Math.hypot(x-px,z-pz);if(!best||d<best.d)best={i,t,d,u:((x-px)*(-dz)+(z-pz)*dx)/Math.sqrt(l2)};}
  const {i,t,d,u}=best,a=rows[i-1],b=rows[i],w=a.w+(b.w-a.w)*t,s=a.s+(b.s-a.s)*t;if(d>w+.28||Math.min(s,length-s)>endLength+.001)return y;
  const side=clamp((u/w+1)/2)*columns,k=Math.min(columns-1,Math.floor(side)),v=side-k;
  const ya=grid[i-1][k][1]*(1-v)+grid[i-1][k+1][1]*v,yb=grid[i][k][1]*(1-v)+grid[i][k+1][1]*v,target=ya*(1-t)+yb*t-.028,blend=clamp((w+.28-d)/.25);
  return y+(Math.min(y,target)-y)*blend;
 }
 let changed=0,maxCut=0;function lower(p){const y=cut(p[0],p[2],p[1]);if(y<p[1]-1e-6){changed++;maxCut=Math.max(maxCut,p[1]-y);}p[1]=y;}
 function split(a,b,c,out,depth=0){if(near(a,b,c)&&depth<6&&Math.max(Math.hypot(a[0]-b[0],a[2]-b[2]),Math.hypot(a[0]-c[0],a[2]-c[2]),Math.hypot(b[0]-c[0],b[2]-c[2]))>.22){const mid=(a,b)=>a.map((v,i)=>(v+b[i])/2),ab=mid(a,b),bc=mid(b,c),ca=mid(c,a);split(a,ab,ca,out,depth+1);split(ab,b,bc,out,depth+1);split(ca,bc,c,out,depth+1);split(ab,bc,ca,out,depth+1);return;}for(const p of [a,b,c]){const q=p.slice();if(near(a,b,c))lower(q);out.push(q);}}
 function geometry(vertices,attrs){const g=new T.BufferGeometry();let offset=0;for(const [name,size]of attrs){const data=vertices.flatMap(v=>v.slice(offset,offset+size));g.setAttribute(name,new T.Float32BufferAttribute(data,size));offset+=size;}g.computeVertexNormals();g.computeBoundingSphere();return g;}
 let terrain;view.scene.traverse(o=>{if(o.isMesh&&o.geometry.parameters?.width===700)terrain=o;});const tg=terrain.geometry,pa=tg.attributes.position,idx=tg.index,keep=[],patch=[],cells=new Set(),n=tg.parameters.widthSegments;
 const attrs=Object.entries(tg.attributes).map(([name,a])=>[name,a.itemSize]),vertex=i=>attrs.flatMap(([name,size])=>Array.from(tg.attributes[name].array.slice(i*size,(i+1)*size)));
 for(let i=0;i<idx.count;i+=6){const ids=Array.from({length:6},(_,j)=>idx.getX(i+j)),v=ids.map(vertex);if(near(v[0],v[1],v[2])||near(v[3],v[4],v[5])){cells.add(Math.floor(i/6));split(...v.slice(0,3),patch);split(...v.slice(3),patch);}else keep.push(...ids);}
 tg.setIndex(keep);const pg=geometry(patch,attrs),pm=new T.Mesh(pg,terrain.material);pm.name='Walking path local terrain cuts';view.scene.add(pm);view.terrainCutCells149=cells;view.terrainCutContact149=new PavementContact(pg.attributes.position.array);
 for(const name of ['Tapered rolled curb','Graded unfinished shoulders','Circuit poured curb','Circuit earth shoulders','Circuit concrete joints','Junction poured curb','Junction earth shoulders','Bulb poured curb','Bulb earth shoulders']){const mesh=view.scene.getObjectByName(name);if(!mesh)continue;const old=mesh.geometry,g=old.index?old.toNonIndexed():old,p=g.attributes.position,out=[];for(let i=0;i<p.count;i+=3){const v=[0,1,2].map(j=>[p.getX(i+j),p.getY(i+j),p.getZ(i+j)]);split(...v,out);}mesh.geometry=geometry(out,[['position',3]]);if(g!==old)g.dispose();old.dispose();}
 view.pathGradeAudit149={flatEntryMeters:flat,transitionMeters:endLength,changedVertices:changed,maxEarthCut:maxCut,terrainCells:cells.size,localTerrainTriangles:patch.length/3};
}

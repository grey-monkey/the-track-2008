import * as T from './vendor/three.module.js';
import {FOOTPATH,roadPoints,ROAD_HALF,height} from './world.js';
import {gradePathCorridors} from './path-grading149.js';
import {eveningUniforms} from './evening-light.js';
const smooth=t=>{t=T.MathUtils.clamp(t,0,1);return t*t*(3-2*t);};
export function pathLayout149(){
 const frames=[0,FOOTPATH.length-1].map(end=>{const p=FOOTPATH[end];let best;
  for(let i=0;i<roadPoints.length;i++){const a=roadPoints[i],b=roadPoints[(i+1)%roadPoints.length],dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz),t=T.MathUtils.clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(l*l),0,1);for(const sign of [-1,1]){const nx=-dz/l*sign,nz=dx/l*sign,x=a.x+dx*t+nx*ROAD_HALF,z=a.z+dz*t+nz*ROAD_HALF,d=Math.hypot(x-p.x,z-p.z);if(!best||d<best.d)best={x,z,nx,nz,tx:dx/l,tz:dz/l,d,end};}}
  return best;
 });
 const at=(f,d)=>new T.Vector3(f.x+f.nx*d,0,f.z+f.nz*d),[a,b]=frames;
 // The cul-de-sac-side endpoint previously lay beyond the road-facing tangent.
 // Skip those superseded points and approach directly on the road normal.
 const controls=[at(a,-.53),at(a,4),...FOOTPATH.slice(1,-2).map(p=>new T.Vector3(p.x,0,p.z)),at(b,9),at(b,4),at(b,-.53)];
 const curve=new T.CatmullRomCurve3(controls,false,'centripetal');curve.arcLengthDivisions=2048;
 const length=curve.getLength(),count=Math.ceil(length/.35),stations=new Set(Array.from({length:count+1},(_,i)=>length*i/count));
 for(const d of [1,3.2,4.2,9,18]){stations.add(d);stations.add(length-d);}
 const rows=[...stations].sort((a,b)=>a-b).map(s=>{const p=curve.getPointAt(s/length),v=curve.getTangentAt(s/length).normalize(),edge=Math.min(s,length-s),f=s<length/2?a:b;
  if(edge<9){const blend=smooth((edge-4.2)/4.8),x=f.x+f.nx*(edge-.53),z=f.z+f.nz*(edge-.53);p.x=T.MathUtils.lerp(x,p.x,blend);p.z=T.MathUtils.lerp(z,p.z,blend);}
  return{x:p.x,z:p.z,dx:v.x,dz:v.z,s,w:edge<=1?2.15:edge<3.2?2.15-(edge-1)*1.1/2.2:1.05};});
 for(let i=0;i<rows.length;i++){const a=rows[Math.max(0,i-1)],b=rows[Math.min(rows.length-1,i+1)],l=Math.hypot(b.x-a.x,b.z-a.z);rows[i].dx=(b.x-a.x)/l;rows[i].dz=(b.z-a.z)/l;}
 return {frames,rows,length};
}
export function preparePathMouths(view){
 const layout=pathLayout149(),grid=pathGrid(view.surfaceGround,layout.rows);
 gradePathCorridors(view,layout,grid);view.pathDesign149={layout,grid};
}
function pathGrid(base,rows){const columns=6;
 const grid=rows.map(r=>Array.from({length:columns+1},(_,j)=>{const u=(j/columns*2-1)*r.w,x=r.x-r.dz*u,z=r.z+r.dx*u;return [x,base(x,z)+.018,z];}));
 // Clear the complete ground triangles, including ridges between grid vertices.
 // Vertex samples alone can leave a narrow strip of soil poking through the walk.
 const clearanceLifts=new Map();
 for(let i=1;i<grid.length;i++)for(let j=0;j<columns;j++){
  const q=[grid[i-1][j],grid[i][j],grid[i][j+1],grid[i-1][j+1]];
  for(const [a,b,c]of [[q[0],q[1],q[2]],[q[0],q[2],q[3]]]){
   const dx=b[0]-a[0],dz=b[2]-a[2],ex=c[0]-a[0],ez=c[2]-a[2],den=dx*ez-ex*dz;
   const gx=((b[1]-a[1])*ez-(c[1]-a[1])*dz)/den,gz=(dx*(c[1]-a[1])-ex*(b[1]-a[1]))/den;
   const bound=base.planeBound(Math.min(a[0],b[0],c[0]),Math.max(a[0],b[0],c[0]),Math.min(a[2],b[2],c[2]),Math.max(a[2],b[2],c[2]),gx,gz);
   const lift=Math.max(0,bound-(a[1]-gx*a[0]-gz*a[2])+.012);if(Number.isFinite(lift))for(const p of [a,b,c])clearanceLifts.set(p,Math.max(clearanceLifts.get(p)??0,lift));
  }
 }
 for(const [p,lift]of clearanceLifts)p[1]+=lift;
 // An upper envelope eases existing curb crowns into the walk without burying
 // pavement or introducing a collision-only ledge. Endpoints meet the asphalt.
 for(let pass=0;pass<2;pass++)for(const dir of [1,-1])for(let k=dir>0?1:grid.length-2;dir>0?k<grid.length:k>=0;k+=dir){const previous=k-dir,ds=rows[Math.max(k,previous)].s-rows[Math.min(k,previous)].s;for(let j=0;j<=columns;j++)grid[k][j][1]=Math.max(grid[k][j][1],grid[previous][j][1]-.24*ds);}
 return grid;
}
export function buildPathReturns(view,root,supports,surfaceMesh){
 const {layout,grid}=view.pathDesign149,{rows,length,frames}=layout,columns=6;
 const points=[];for(let i=1;i<grid.length;i++)for(let j=0;j<columns;j++)for(const p of [grid[i-1][j],grid[i][j],grid[i][j+1],grid[i-1][j],grid[i][j+1],grid[i-1][j+1]])points.push(...p);
 const old=view.detailPathMesh.geometry,g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(points,3));g.computeVertexNormals();g.computeBoundingSphere();view.detailPathMesh.geometry=g;view.detailPathMesh.name='Continuous concrete walking path';old.dispose();supports.push(...points);
 const edges=[],joints=[];
 function strip(out,a,b,width){const dx=b[0]-a[0],dz=b[2]-a[2],l=Math.hypot(dx,dz),nx=-dz/l*width/2,nz=dx/l*width/2;const q=[[a[0]+nx,a[1]+.020,a[2]+nz],[a[0]-nx,a[1]+.020,a[2]-nz],[b[0]-nx,b[1]+.020,b[2]-nz],[b[0]+nx,b[1]+.020,b[2]+nz]];for(const i of [0,1,2,0,2,3])out.push(...q[i]);}
 for(let i=1;i<grid.length;i++)if(rows[i].s>1.8&&rows[i].s<length-1.8)for(const j of [0,columns])strip(edges,grid[i-1][j],grid[i][j],.030);
 let nextJoint=3;for(let i=1;i<grid.length;i++)if(rows[i].s>=nextJoint){for(let j=0;j<columns;j++)strip(joints,grid[i][j],grid[i][j+1],.16);nextJoint+=2.1;}
 function mark(data,name,opacity){const mat=new T.MeshBasicMaterial({color:0x15191e,transparent:true,opacity,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2,side:T.DoubleSide});mat.onBeforeCompile=s=>{s.uniforms.pathNight=eveningUniforms.eveningNight;s.fragmentShader='uniform float pathNight;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>','outgoingLight*=1.-pathNight*.94;\n#include <opaque_fragment>');};const m=surfaceMesh(data,mat,name,root);
  if(name==='Walking path contraction joints'){
   const side=new Float32Array(data.length/3);for(let i=0;i<side.length;i++)side[i]=[1,-1,-1,1,-1,1][i%6]*.08;
   m.geometry.setAttribute('jointAcross',new T.BufferAttribute(side,1));const previous=mat.onBeforeCompile;
   mat.onBeforeCompile=s=>{previous(s);s.vertexShader='attribute float jointAcross;varying float jointDistance;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\njointDistance=jointAcross;');s.fragmentShader='varying float jointDistance;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>','float jointAA=max(.001,fwidth(jointDistance));diffuseColor.a*=1.-smoothstep(.014-jointAA,.014+jointAA,abs(jointDistance));\n#include <opaque_fragment>');};
  }
  m.userData.surfaceMark=true;m.castShadow=false;m.renderOrder=3;}
 mark(edges,'Walking path dark soil edge',.68);mark(joints,'Walking path contraction joints',.53);
 view.pathRows149=rows.map((r,i)=>({...r,y:grid[i][3][1]}));view.pathAudit149={grading:view.pathGradeAudit149,length,width:2.1,halfMouth:2.15,jointSpacing:2.1,jointCount:Math.floor((nextJoint-3)/2.1),triangles:points.length/9};
 view.pathReturns=frames.map(f=>{view.detailTargets['path'+f.end]=new T.Vector3(f.x,height(f.x,f.z)+.2,f.z);return {end:f.end,frame:f,radius:0,halfMouth:2.15,neck:{x:f.x+f.nx*4,z:f.z+f.nz*4},join:{x:f.x+f.nx*9,z:f.z+f.nz*9}};});
}

import * as T from './vendor/three.module.js';
// Static road-prop shadows, spatially indexed; no additional scene render or shadow target.
export const roadShadowUniforms={roadShadowData:{value:null},roadShadowGrid:{value:null},roadShadowGridInfo:{value:new T.Vector4()},roadShadowTextureSize:{value:new T.Vector4()},roadShadowsReady:{value:0}};
export function installRoadShadows(view){
 const records=[],audit=[];view.scene.updateMatrixWorld(true);
 function add(matrix,lo,hi,type,name,softHeight=0){const bounds=new T.Box3(lo.clone(),hi.clone()).applyMatrix4(matrix),inv=matrix.clone().invert(),center=bounds.getCenter(new T.Vector3());records.push({matrix,inv,lo,hi,type,bounds,center,name,softHeight});audit.push(name);}
 function meshBox(m,type=0){m.geometry.computeBoundingBox();const b=m.geometry.boundingBox;add(m.matrixWorld,b.min,b.max,type,m.name||m.geometry.type);let o=m;while(o){if(o.name==='Upright plastic barrier'||o.name==='Accumulated construction grit'){records.at(-1).movingMesh=m;break;}o=o.parent;}}
 function worldBox(c,size,yaw,name,type=0){const matrix=new T.Matrix4().compose(c,new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),yaw),new T.Vector3(1,1,1));add(matrix,size.clone().multiplyScalar(-.5),size.clone().multiplyScalar(.5),type,name);}
 // Downloaded street fixtures: short stacked silhouettes for the hydrants, boxes for cabinets.
 for(const group of view.site.children){const kind=group.userData.assetKind;if(!kind)continue;const box=new T.Box3().setFromObject(group),c=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3());
  // These covers and storm grates sit almost flush: keep their recessed/material shading only.
  if(kind==='water_manhole_cover')continue;
  if(kind==='fire_hydrant'){
   const points=[];group.traverse(m=>{if(!m.isMesh)return;const a=m.geometry.attributes.position;for(let i=0;i<a.count;i++)points.push(new T.Vector3().fromBufferAttribute(a,i));});
   const local=new T.Box3().setFromPoints(points),height=local.max.y-local.min.y;
   // Clip actual triangles into eight horizontal bands. Include edge intersections so
   // long stem triangles do not leave gaps, and retain the model's local orientation.
   for(let slice=0;slice<8;slice++){const bottom=local.min.y+height*slice/8,top=bottom+height/8,band=new T.Box3();
    for(let i=0;i<points.length;i+=3)for(let j=0;j<3;j++){const a=points[i+j],b=points[i+(j+1)%3];if(a.y>=bottom&&a.y<=top)band.expandByPoint(a);for(const y of [bottom,top])if((a.y-y)*(b.y-y)<0)band.expandByPoint(a.clone().lerp(b,(y-a.y)/(b.y-a.y)));}
    if(!band.isEmpty()){band.min.y=bottom;band.max.y=top;add(group.matrixWorld,band.min,band.max,1,'Hydrant fitted band',height*group.scale.y);}
   }continue;
  }
  if(kind==='utility_box_02'){const local=new T.Box3();group.traverse(m=>{if(!m.isMesh)return;m.geometry.computeBoundingBox();local.union(m.geometry.boundingBox);});add(group.matrixWorld,local.min,local.max,0,'Utility cabinet');}
 }
 // Cast metal poles/base; the luminous lantern and glass must not block their own emitter.
 for(const p of view.streetlights??[]){worldBox(p.position.clone().add(new T.Vector3(0,2.1,0)),new T.Vector3(.16,4.2,.16),0,'Lamp post',1);worldBox(p.position.clone().add(new T.Vector3(0,.12,0)),new T.Vector3(.44,.24,.44),0,'Lamp base',1);}
 view.detailRoot.traverse(m=>{if(!m.isMesh||m.userData.surfaceMark||m.name==='Barrier ground contact')return;
  if(m.geometry.type==='ExtrudeGeometry'){meshBox(m,3);return;}
  if(m.name.startsWith('Chamfered'))return;
  if(m.geometry.type==='SphereGeometry'||m.geometry.type==='IcosahedronGeometry'){meshBox(m,2);return;}
  if(m.geometry.type==='CylinderGeometry'){meshBox(m,1);return;}
  if(m.name==='Accumulated construction grit'){meshBox(m,2);return;}
  meshBox(m);
 });
 // The entrance architecture casts fitted body and pitched-roof silhouettes.
 for(const v of view.architectureShadowVolumes??[])add(v.matrix,v.lo,v.hi,v.type,'House body/roof',v.ridge);
 // Verge spoil heaps and utility footings are batched; include fitted pad bounds individually.
 for(const m of view.site.children)if(m.name.startsWith('Construction spoil pile'))meshBox(m,2);
 for(const p of view.contactAudit?.cabinets??[])worldBox(new T.Vector3(p.x,p.padTop-.055,p.z),new T.Vector3(1.2,.11,.72),0,'Utility footing');
 const cell=16,bounds=new T.Box3();for(const r of records)bounds.union(r.bounds);bounds.expandByScalar(42);const xmin=Math.floor(bounds.min.x/cell)*cell,zmin=Math.floor(bounds.min.z/cell)*cell,nx=Math.ceil((bounds.max.x-xmin)/cell),nz=Math.ceil((bounds.max.z-zmin)/cell),cells=Array.from({length:nx*nz},()=>[]);
 records.forEach((r,id)=>{const extent=Math.min(40,Math.max(r.movingMesh?5:2,(r.bounds.max.y-r.bounds.min.y)*28));const x0=Math.max(0,Math.floor((r.bounds.min.x-extent-xmin)/cell)),x1=Math.min(nx-1,Math.floor((r.bounds.max.x+extent-xmin)/cell)),z0=Math.max(0,Math.floor((r.bounds.min.z-extent-zmin)/cell)),z1=Math.min(nz-1,Math.floor((r.bounds.max.z+extent-zmin)/cell));for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)cells[z*nx+x].push(id);});
 const max=Math.max(...cells.map(c=>c.length));if(max>192)throw Error('Road shadow spatial cell exceeds budget');
 const grid=new Float32Array((max+1)*cells.length*4);cells.forEach((c,row)=>{grid[row*(max+1)*4]=c.length;c.forEach((id,i)=>grid[(row*(max+1)+i+1)*4]=id);});const data=new Float32Array(records.length*6*4);
 records.forEach((r,id)=>{const i=id*24,e=r.inv.elements;data.set([r.center.x,r.center.y,r.center.z,r.bounds.getSize(new T.Vector3()).length()/2],i);data.set([e[0],e[4],e[8],e[12]],i+4);data.set([e[1],e[5],e[9],e[13]],i+8);data.set([e[2],e[6],e[10],e[14]],i+12);data.set([...r.lo.toArray(),r.type],i+16);data.set([...r.hi.toArray(),r.softHeight],i+20);});
 function texture(a,w,h){const t=new T.DataTexture(a,w,h,T.RGBAFormat,T.FloatType);t.needsUpdate=true;return t;}
 roadShadowUniforms.roadShadowData.value?.dispose();roadShadowUniforms.roadShadowGrid.value?.dispose();roadShadowUniforms.roadShadowData.value=texture(data,6,records.length);roadShadowUniforms.roadShadowGrid.value=texture(grid,max+1,cells.length);roadShadowUniforms.roadShadowGridInfo.value.set(xmin,zmin,nx,nz);roadShadowUniforms.roadShadowTextureSize.value.set(max+1,cells.length,records.length,cell);roadShadowUniforms.roadShadowsReady.value=1;
 // Moving hatch scenery updates only its existing texture rows; no texture rebuild per frame.
 const moving=records.map((r,id)=>({r,id})).filter(({r})=>r.movingMesh);
 view.updateMovingRoadShadows=()=>{for(const {r,id} of moving){const m=r.movingMesh;m.updateWorldMatrix(true,false);const bounds=new T.Box3(r.lo.clone(),r.hi.clone()).applyMatrix4(m.matrixWorld),center=bounds.getCenter(new T.Vector3()),e=m.matrixWorld.clone().invert().elements,i=id*24;data.set([center.x,center.y,center.z,bounds.getSize(new T.Vector3()).length()/2],i);data.set([e[0],e[4],e[8],e[12]],i+4);data.set([e[1],e[5],e[9],e[13]],i+8);data.set([e[2],e[6],e[10],e[14]],i+12);}if(moving.length)roadShadowUniforms.roadShadowData.value.needsUpdate=true;};
 view.roadShadowAudit={primitives:records.length,maxCellCandidates:max,textureBytes:data.byteLength+grid.byteLength,types:audit.reduce((a,n)=>(a[n]=(a[n]||0)+1,a),{})};
}
export const roadShadowGLSL=`
uniform sampler2D roadShadowData;uniform sampler2D roadShadowGrid;uniform vec4 roadShadowGridInfo;uniform vec4 roadShadowTextureSize;uniform float roadShadowsReady;
vec4 roadData(float id,float col){return texture2D(roadShadowData,vec2((col+.5)/6.,(id+.5)/roadShadowTextureSize.z));}
bool roadBox(vec3 o,vec3 d,vec3 lo,vec3 hi,float reach){vec3 sd=mix(vec3(-1.),vec3(1.),step(vec3(0.),d))*max(abs(d),vec3(.00001));vec3 a=(lo-o)/sd,b=(hi-o)/sd,mn=min(a,b),mx=max(a,b);float entry=max(max(mn.x,mn.y),mn.z),leave=min(min(mx.x,mx.y),mx.z);return leave>max(.009,entry)&&entry<reach;}
bool roofClip158(float distance,float slope,inout float enter,inout float leave){if(abs(slope)<.000001)return distance<=0.;float t=-distance/slope;if(slope>0.)leave=min(leave,t);else enter=max(enter,t);return leave>enter;}
bool roofHit158(vec3 o,vec3 d,vec3 lo,vec3 hi,float ridge,float type,float reach){
 vec3 radius=(hi-lo)*.5,q=(o-(lo+hi)*.5)/radius,v=d/radius;float enter=.009,leave=reach;
 for(int axis=0;axis<3;axis++){if(!roofClip158(q[axis]-1.,v[axis],enter,leave)||!roofClip158(-q[axis]-1.,-v[axis],enter,leave))return false;}
 if(!roofClip158(q.y+2.*q.z-1.,v.y+2.*v.z,enter,leave)||!roofClip158(q.y-2.*q.z-1.,v.y-2.*v.z,enter,leave))return false;
 if(type>5.5){float endRun=max(.001,radius.x-ridge);float slope=2.*radius.x/endRun,limit=1.+2.*ridge/endRun;if(!roofClip158(q.y+slope*q.x-limit,v.y+slope*v.x,enter,leave)||!roofClip158(q.y-slope*q.x-limit,v.y-slope*v.x,enter,leave))return false;}
 return leave>enter;
}
float roadOcclusion(vec3 p,vec3 direction,float reach){
 if(roadShadowsReady<.5)return 0.;vec2 cell=floor((p.xz-roadShadowGridInfo.xy)/roadShadowTextureSize.w);if(min(cell.x,cell.y)<0.||cell.x>=roadShadowGridInfo.z||cell.y>=roadShadowGridInfo.w)return 0.;float row=cell.y*roadShadowGridInfo.z+cell.x;float count=texture2D(roadShadowGrid,vec2(.5/roadShadowTextureSize.x,(row+.5)/roadShadowTextureSize.y)).r;
 for(int i=0;i<192;i++){if(float(i)>=count)break;float id=texture2D(roadShadowGrid,vec2((float(i)+1.5)/roadShadowTextureSize.x,(row+.5)/roadShadowTextureSize.y)).r;vec4 bound=roadData(id,0.);vec3 delta=bound.xyz-p;float along=dot(delta,direction);if(along< -bound.w||along>reach+bound.w||dot(delta,delta)-along*along>bound.w*bound.w+.01)continue;
 vec4 r0=roadData(id,1.),r1=roadData(id,2.),r2=roadData(id,3.),low=roadData(id,4.),high=roadData(id,5.);vec4 origin=vec4(p+vec3(0.,.004,0.)+direction*.003,1.);vec3 o=vec3(dot(r0,origin),dot(r1,origin),dot(r2,origin)),d=vec3(dot(r0.xyz,direction),dot(r1.xyz,direction),dot(r2.xyz,direction));
 if(!roadBox(o,d,low.xyz,high.xyz,reach))continue;
 if(low.w>4.5){if(roofHit158(o,d,low.xyz,high.xyz,high.w,low.w,reach))return 1.;continue;}
 if(low.w>2.5){if(roadBox(o,d,vec3(-.192,-.095,0.),vec3(-.156,.095,.192),reach)||roadBox(o,d,vec3(-.034,-.095,0.),vec3(.034,.095,.192),reach)||roadBox(o,d,vec3(.156,-.095,0.),vec3(.192,.095,.192),reach)||roadBox(o,d,vec3(-.192,-.095,0.),vec3(.192,-.055,.192),reach)||roadBox(o,d,vec3(-.192,.055,0.),vec3(.192,.095,.192),reach))return 1.;continue;}
 if(low.w>.5){vec3 center=(low.xyz+high.xyz)*.5,radius=max((high.xyz-low.xyz)*.5,vec3(.001)),q=(o-center)/radius,v=d/radius;
 if(low.w<1.5){float aa=dot(v.xz,v.xz),bb=dot(q.xz,v.xz),cc=dot(q.xz,q.xz)-1.;float enter=-1e6,leave=1e6;if(aa<.000001){if(cc>0.)continue;}else{float disc=bb*bb-aa*cc;if(disc<0.)continue;enter=(-bb-sqrt(disc))/aa;leave=(-bb+sqrt(disc))/aa;}if(abs(v.y)<.000001){if(abs(q.y)>1.)continue;}else{float t0=(-1.-q.y)/v.y,t1=(1.-q.y)/v.y;enter=max(enter,min(t0,t1));leave=min(leave,max(t0,t1));}if(leave<=max(.009,enter)||enter>=reach)continue;
 }else{float aa=dot(v,v),bb=dot(q,v),cc=dot(q,q)-1.,disc=bb*bb-aa*cc;if(disc<0.)continue;float t=(-bb-sqrt(disc))/max(aa,.00001);if(t<.004)t=(-bb+sqrt(disc))/max(aa,.00001);if(t<.004||t>reach)continue;}}

 // Keep contact anchored; distant hydrant projections lose contrast instead of a solid black cutout.
 return high.w>0.?.65*(1.-smoothstep(high.w*.5,high.w*3.,length(p.xz-bound.xz))):1.;
 }return 0.;
}
`;

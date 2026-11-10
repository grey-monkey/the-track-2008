import * as T from './vendor/three.module.js';
import {eveningUniforms} from './evening-light.js';
import {visual85} from './visual85/state.js';
import {atmosphereGLSL} from './atmosphere.js';
import {terrainHeight,roadDistance,ENTRANCE_HOUSES} from './world.js';
// Newly authored Piedmont-style trunks and clustered broadleaf crowns.
// Generic source leaf/bark tiles retain the console material vocabulary;
// texture provenance is recorded in authoring/landscape161-reference.json.
const urls={'a466144c':'./assets/leaf161-eea061a0.png','e0c21f48':'./assets/leaf161-3c84b540.png','37cfca08':'./assets/tree159-37cfca08.png'},textures={};
await Promise.all(Object.entries(urls).map(async([id,url])=>{const t=await new T.TextureLoader().loadAsync(url);t.colorSpace=T.SRGBColorSpace;t.flipY=false;t.wrapS=t.wrapT=T.RepeatWrapping;t.minFilter=T.LinearMipmapLinearFilter;t.magFilter=T.LinearFilter;t.anisotropy=4;textures[id]=t;}));
export function installWoodland159(view){
 const mats={};for(const [id,map]of Object.entries(textures)){const m=new T.MeshBasicMaterial({color:id==='37cfca08'?0xb4aa95:0xb8bc9e,map,vertexColors:true,side:T.DoubleSide,alphaTest:id==='37cfca08'?0:.38});
 m.customProgramCacheKey=()=>id+'-piedmont161-clusters';m.onBeforeCompile=shader=>{
 Object.assign(shader.uniforms,eveningUniforms,visual85);
 shader.vertexShader='varying vec3 canopyWorld159;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ncanopyWorld159=(modelMatrix*vec4(position,1.)).xyz;');
 shader.fragmentShader='uniform float eveningNight;varying vec3 canopyWorld159;\n'+atmosphereGLSL+shader.fragmentShader;
 shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=mix(vec3(1.),vec3(.026,.041,.067),eveningNight);');
 shader.fragmentShader=shader.fragmentShader.replace('#include <fog_fragment>','float fd159=distance(cameraPosition,canopyWorld159);gl_FragColor.rgb=mix(gl_FragColor.rgb,memoryAirColor(fogColor,fd159),memoryAirAmount(fd159)*.83);');
 };mats[id]=m;}
 const batches=new Map(Object.values(mats).map(m=>[m,[]])),trees=[],stands=(view.boundaryStudy?.clusters??[]).filter(s=>s.layer===0);
 for(let i=0;i<stands.length;i++){
  const s=stands[i],model={height:[16,17,15][i%3],width:[18,18,17][i%3]},h=s.h*(.88+.24*(.5+.5*Math.sin(i*2.39))),scale=h/model.height,widthFactor=[.39,.46,.34][i%3],radius=h*.32;
  const toward=new T.Vector2(-5-s.x,105-s.z).normalize(),x=s.x+toward.x*3,z=s.z+toward.y*3;
  if(roadDistance(x,z)<radius+12||ENTRANCE_HOUSES.some(q=>Math.hypot(x-q.x,z-q.z)<radius+20))continue;
  const y=view.terrainSurface?.(x,z)??terrainHeight(x,z),rotation=i*2.399,matrix=new T.Matrix4().compose(new T.Vector3(x,y-.08,z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),rotation),new T.Vector3(scale,scale,scale));
  // Interlocking broadleaf clusters replace the hanging source canopy entirely.
  // A tall, forked trunk carries irregular foliage masses at several heights.
  const crownH=model.height,clusterCenters=[];
  clusterCenters.push([0,.86*crownH,0,.13*crownH,.17*crownH]);
  clusterCenters.push([.025*crownH,.73*crownH,-.02*crownH,.18*crownH,.19*crownH]);
  for(let j=0;j<5;j++){const angle=j*2.399+i*.37,reach=crownH*(.11+.025*Math.sin(i+j));clusterCenters.push([Math.cos(angle)*reach,crownH*(.65+.075*Math.sin(j*1.7+i)),Math.sin(angle)*reach,crownH*(.115+.015*Math.cos(j+i)),crownH*(.14+.02*Math.sin(j*2+i))]);}
  for(let j=0;j<clusterCenters.length;j++){
   const [cx,cy,cz,rx,ry]=clusterCenters[j],positions=[],uv=[],colors=[];
   for(let k=0;k<4;k++){
    const angle=k*Math.PI/4+i*.73+j*.39,dx=Math.cos(angle)*rx,dz=Math.sin(angle)*rx,tilt=.25*Math.sin(j*2+k);
    const verts=[[cx-dx,cy-ry,cz-dz],[cx+dx,cy-ry,cz+dz],[cx+dx+tilt,cy+ry,cz+dz],[cx-dx+tilt,cy+ry,cz-dz]];
    for(const n of [0,1,2,0,2,3]){positions.push(...verts[n]);uv.push(...[[0,0],[1,0],[1,1],[0,1]][n]);const shade=(n<2?.55:.94)*(.88+.12*Math.sin(i*1.7+j));colors.push(shade,shade*(.97+.06*Math.sin(i*.9)),shade*.78);}
   }
   const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.computeVertexNormals();g.applyMatrix4(matrix);
   batches.get(mats[j%3===0?'e0c21f48':'a466144c']).push(g);
  }
  const trunkMat=mats['37cfca08'];
  function limb(a,b,r0,r1){
   const axis=new T.Vector3().subVectors(b,a),length=axis.length(),g=new T.CylinderGeometry(r1,r0,length,7,1,true).toNonIndexed();
   g.applyQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),axis.normalize()));g.translate((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);
   const n=g.attributes.normal,colors=[];for(let j=0;j<n.count;j++){const shade=.50+.42*Math.max(0,n.getX(j)*.6+n.getY(j)*.6-n.getZ(j)*.5);colors.push(shade,shade*.97,shade*.90);}
   g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.applyMatrix4(matrix);batches.get(trunkMat).push(g);
  }
  const H=model.height,lean=.12*Math.sin(i*2.1),trunkTop=new T.Vector3(lean,H*.79,.08);
  limb(new T.Vector3(0,0,0),trunkTop,.21,.045);
  for(let j=0;j<5;j++){
   const angle=j*2.399+i*.91,start=new T.Vector3(lean*.5,H*(.43+j*.047),0),reach=model.width*widthFactor*(.17+.03*Math.sin(j+i));
   const end=new T.Vector3(Math.cos(angle)*reach,H*(.69+.026*j),Math.sin(angle)*reach);
   limb(start,end,.095-j*.008,.015);
  }

  trees.push({x,z,radius,height:h,crown:'upright-piedmont-broadleaf-clusters',widthFactor,roadClearance:roadDistance(x,z)-radius});
 }
 let triangles=0;const root=new T.Group();root.name='Piedmont woodland foreground';
 for(const [material,parts]of batches){const g=new T.BufferGeometry();for(const name of ['position','normal','uv','color']){const itemSize=name==='uv'?2:3,out=new Float32Array(parts.reduce((sum,g)=>sum+g.attributes[name].array.length,0));let offset=0;for(const part of parts){out.set(part.attributes[name].array,offset);offset+=part.attributes[name].array.length;}g.setAttribute(name,new T.BufferAttribute(out,itemSize));}g.computeBoundingSphere();triangles+=g.attributes.position.count/3;const mesh=new T.Mesh(g,material);mesh.name='Piedmont woodland '+Object.keys(mats).find(k=>mats[k]===material);root.add(mesh);parts.forEach(g=>g.dispose());}
 view.scene.add(root);view.woodland159={trees,triangles,batches:root.children.length};view.consoleWorldLook.refresh();return root;
}

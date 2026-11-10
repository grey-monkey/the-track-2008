import * as T from './vendor/three.module.js';
import {aerialPoint,terrainHeight,roadDistance,ENTRANCE_HOUSES} from './world.js';
// Canopy edge traced from supplied 1366x768 current aerial. Register to the
// southwest bulb and road junctions; 2008 interior clearing follows the memory.
const trace=[[724,199],[691,222],[670,270],[641,310],[617,351],[592,394],[561,454],[530,505],[505,563],[504,621],[526,674],[582,659],[643,627],[704,602],[759,580],[814,544],[841,503],[842,440],[823,375],[800,315],[773,273],[774,235]];
export const forestBoundary=trace.map(([x,y])=>aerialPoint(443+(x-550)*1.75,786+(y-590)*1.75));
// Stable landscape variation: grouped color/height fields, irregular gaps and
// separate depth rows. Per-stand crops avoid repeating one panorama everywhere.
const random=n=>{let a=Math.imul(n^0x51ed270b,0x45d9f3b);a=Math.imul(a^(a>>>16),0x45d9f3b);return ((a^(a>>>16))>>>0)/4294967296;};
export function forestClusters147(){
 const result=[],center={x:-5,z:105};
 const palette=[[.73,.85,.67],[.96,1.02,.75],[1.08,.96,.73],[.68,.85,.88],[.84,.96,.80]];
 for(let layer=0;layer<3;layer++)for(let i=0;i<forestBoundary.length;i++){
  const a=forestBoundary[i],b=forestBoundary[(i+1)%forestBoundary.length],len=Math.hypot(b.x-a.x,b.z-a.z),n=Math.ceil(len/[13,15,17][layer]);
  for(let j=0;j<n;j++){
   const id=layer*100003+i*997+j*31,r=k=>random(id+k*193),t=(j+.15+r(1)*.70)/n;
   let x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;
   const cluster=(Math.sin(x*.047+z*.029)+Math.sin(x*.021-z*.061))*.25+.5;
   if(layer===0&&r(2)<.17+cluster*.18||layer===1&&r(2)<.09)continue;
   const ox=x-center.x,oz=z-center.z,d=Math.hypot(ox,oz),depth=[0,18,39][layer]+r(3)*11;
   x+=ox/d*depth;z+=oz/d*depth;
   const h=8+layer*5+cluster*8+r(4)*7,w=h*(1.12+r(5)*.50);
   const angle=Math.atan2(-(b.z-a.z),b.x-a.x)+(r(6)-.5)*.23;
   if([-w/2,0,w/2].some(q=>roadDistance(x+q*Math.cos(angle),z-q*Math.sin(angle))<12))continue;
   if(ENTRANCE_HOUSES.some(h=>Math.hypot(x-h.x,z-h.z)<27))continue;
   const hue=(Math.sin(x*.036+z*.017)+Math.sin(z*.033-x*.013))*.25+.5,index=Math.min(4,Math.floor(hue*5));
   const tint=palette[index].map(v=>v*(.91+r(7)*.16)*(1+layer*.035));
   const crop=Math.min(.91,w/h/3),offset=r(8)*(1-crop),flip=r(9)<.5?-1:1;
   result.push({x,z,h,w,angle,layer,tint,crop,offset,flip});
  }
 }
 return result;
}
export function addBoundaryWoods(view,material){
 const stands=forestClusters147();let minRoad=Infinity;
 for(let layer=0;layer<3;layer++){
  const positions=[],uvs=[],tiles=[],tints=[],mat=material([0x4e6278,0x687b92,0x8793ab][layer]);
  for(const stand of stands.filter(s=>s.layer===layer)){
   const {x,z,w,h,angle,crop,offset,flip,tint}=stand;
   const geo=new T.PlaneGeometry(w,h,3,1).toNonIndexed(),p=geo.attributes.position;
   for(let k=0;k<p.count;k++){
    const lx=p.getX(k),wx=x+lx*Math.cos(angle),wz=z-lx*Math.sin(angle);
    p.setXYZ(k,wx,terrainHeight(wx,wz)+p.getY(k)+h/2-.65,wz);
    tiles.push(crop,offset,flip);tints.push(...tint);
   }
   positions.push(...p.array);uvs.push(...geo.attributes.uv.array);geo.dispose();minRoad=Math.min(minRoad,roadDistance(x,z));
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));g.setAttribute('forestTile147',new T.Float32BufferAttribute(tiles,3));g.setAttribute('forestTint147',new T.Float32BufferAttribute(tints,3));g.computeVertexNormals();
  const mesh=new T.Mesh(g,mat);mesh.name='Clustered woodland layer '+layer;view.scene.add(mesh);
 }
 view.boundaryStudy={stands:stands.length,minRoad,vertices:forestBoundary.length,source:'registered canopy boundary; varied 2008 woodland clusters',clusters:stands};
}

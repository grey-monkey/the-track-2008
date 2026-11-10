import * as T from './vendor/three.module.js';
// Exact attribute sharing only: keep every triangle, normal, UV and material.
// Run after collision/shadow setup; those systems may read triangle-list inputs.
export function shareStaticVertices(view){
 const objects=[...(view.houseOccluders??[])];
 for(const root of view.streetlights??[])root.traverse(o=>{if(o.isMesh)objects.push(o);});
 const cache=new Map();let before=0,after=0,triangles=0;
 for(const o of objects){const old=o.geometry;if(cache.has(old)){o.geometry=cache.get(old);continue;}if(old.index)continue;
  const attrs=Object.entries(old.attributes),n=old.attributes.position.count,map=new Map(),ids=[],values=Object.fromEntries(attrs.map(([k])=>[k,[]]));
  for(let i=0;i<n;i++){const key=attrs.map(([,a])=>Array.from(a.array.subarray(i*a.itemSize,(i+1)*a.itemSize)).join(',')).join('|');let id=map.get(key);if(id===undefined){id=map.size;map.set(key,id);for(const [k,a]of attrs)for(let j=0;j<a.itemSize;j++)values[k].push(a.array[i*a.itemSize+j]);}ids.push(id);}
  const g=new T.BufferGeometry();for(const [k,a]of attrs)g.setAttribute(k,new T.BufferAttribute(new a.array.constructor(values[k]),a.itemSize,a.normalized));g.setIndex(ids);g.computeBoundingBox();g.computeBoundingSphere();
  before+=attrs.reduce((n,[,a])=>n+a.array.byteLength,0);after+=Object.values(g.attributes).reduce((n,a)=>n+a.array.byteLength,0)+g.index.array.byteLength;triangles+=n/3;
  cache.set(old,g);o.geometry=g;
 }
 for(const old of cache.keys())old.dispose();
 view.staticMemory={before,after,saved:before-after,geometries:cache.size,triangles};
}

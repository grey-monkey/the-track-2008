import * as T from './vendor/three.module.js';
// Tangent circular S-roll: 300mm radii; rounded outer crown, no asphalt-facing step.
const R=.30,A=Math.acos(.75),p=[[-.53,.025],[-.22,.025]];
for(let i=1;i<=4;i++){const t=A*i/4;p.push([-.22+R*Math.sin(t),.025+R*(1-Math.cos(t))]);}
const mx=p.at(-1)[0],my=p.at(-1)[1];
for(let i=1;i<=4;i++){const t=A*(1-i/4);p.push([mx+R*(Math.sin(A)-Math.sin(t)),my+R*(Math.cos(t)-Math.cos(A))]);}
p.push([.28,.175]);const radius=(.12*.12+.074*.074)/(2*.074),angle=Math.asin(.12/radius);
for(let i=1;i<=3;i++){const t=angle*i/3;p.push([.28+radius*Math.sin(t),.175-radius*(1-Math.cos(t))]);}
export const rolledProfile=p;
// Share vertices and smooth normals on the continuous pour, with fewer GPU vertices.
export function pouredGeometry(pos,indexed=false){const map=new Map(),vertices=[],indices=[];for(let i=0;i<pos.length;i+=3){const key=[pos[i],pos[i+1],pos[i+2]].map(x=>Math.round(x*100000)).join(',');let id=map.get(key);if(id===undefined){id=vertices.length/3;map.set(key,id);vertices.push(pos[i],pos[i+1],pos[i+2]);}indices.push(id);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();g.computeBoundingSphere();if(indexed)return g;const flat=g.toNonIndexed();g.dispose();return flat;}

export function finishPavement(view){const concrete=view.scene.getObjectByName('Circuit poured curb')?.material;if(concrete)view.scene.traverse(o=>{if(o===view.detailPathMesh||o.name.startsWith('Radiused footpath connection ')){o.material=concrete;o.userData.walkingSurface='concrete';}});let before=0,after=0;for(const name of ['Tapered rolled curb','Circuit poured curb','Junction poured curb','Bulb poured curb']){const mesh=view.scene.getObjectByName(name);if(!mesh)continue;const old=mesh.geometry;before+=old.attributes.position.array.byteLength+old.attributes.normal.array.byteLength;mesh.geometry=pouredGeometry(old.attributes.position.array,true);after+=mesh.geometry.attributes.position.array.byteLength+mesh.geometry.attributes.normal.array.byteLength+mesh.geometry.index.array.byteLength;mesh.material.flatShading=false;mesh.material.needsUpdate=true;old.dispose();}view.pavementMemory={before,after,saved:before-after};}

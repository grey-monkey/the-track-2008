import * as T from '../vendor/three.module.js';
import {PortraitRider} from '../portrait-rider.js';
import {installEyeComparison} from '../eye-comparison.js';
// Retain approved portrait/outfit materials, but upload only the visible seated upper body.
export function upperBody(g){
 const a=g.attributes.position,ids=g.index?.array??Array.from({length:a.count},(_,i)=>i),kept=[];
 for(let i=0;i<ids.length;i+=3)if([ids[i],ids[i+1],ids[i+2]].every(k=>a.getY(k)>1.30))kept.push(ids[i],ids[i+1],ids[i+2]);
 const vertices=[...new Set(kept)],remap=new Map(vertices.map((v,i)=>[v,i])),out=new T.BufferGeometry();
 const compact=attr=>{const data=new attr.array.constructor(vertices.length*attr.itemSize);vertices.forEach((v,i)=>{for(let k=0;k<attr.itemSize;k++)data[i*attr.itemSize+k]=attr.array[v*attr.itemSize+k];});return new T.BufferAttribute(data,attr.itemSize,attr.normalized);};
 for(const [key,attr]of Object.entries(g.attributes))out.setAttribute(key,compact(attr));
 for(const [key,attrs]of Object.entries(g.morphAttributes))out.morphAttributes[key]=attrs.map(compact);
 out.morphTargetsRelative=g.morphTargetsRelative;out.setIndex(kept.map(v=>remap.get(v)));out.computeBoundingSphere();return out;
}
export class SeatedPortrait extends PortraitRider{
 constructor(name){super(name);installEyeComparison(this);this.setEyeComparison('eyes');this.rotation.y=Math.PI;this.surfaces={};
 for(const mesh of this.bodyMeshes){const prior=mesh.geometry;mesh.geometry=upperBody(prior);prior.dispose();}
 this.idle(0,false);this.rotation.z=0;this.cigarette.visible=false;
 }
 social(){this.rotation.z=0;this.cigarette.visible=false;}
 select(){}
}

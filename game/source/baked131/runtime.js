import * as T from '../vendor/three.module.js';
import {loadBinary} from './binary.js';
import {contactClusters} from '../motion131/contact-clusters.mjs';
// Each rider's baked motion is several megabytes. Only the rider about to be
// shown is fetched before the first frame; the rest arrive in the background.
const sources={DOG:'./assets/rider-dog-133.bin.gz',SALLY:'./assets/rider-sally-133.bin.gz',BOSS:'./assets/rider-boss-133.bin.gz',BLACK:'./assets/rider-black-133.bin.gz'};
const packed={},pending=new Map(),decoded=new Map();
export const riderLoaded=name=>!!packed[name];
export function ensureRider(name){
 if(packed[name])return Promise.resolve();
 if(!pending.has(name))pending.set(name,loadBinary(sources[name]).then(data=>{packed[name]=data;pending.delete(name);},error=>{pending.delete(name);throw error;}));
 return pending.get(name);
}
let boot='DOG';
export function bootRider(name){if(name)boot=name;return boot;}
function unpack(p,binary){const out=new Float32Array(p.length);if(p.scale){const v=new DataView(binary.buffer,binary.offset+p.offset,p.length*2);for(let i=0;i<out.length;i++)out[i]=v.getInt16(i*2,true)*p.scale;}return out;}
function indices(p,binary){return p?new Uint32Array(binary.buffer,binary.offset+p.offset,p.length):null;}
function geometry(p,ride,binary){const g=new T.BufferGeometry();if(ride){for(const [key,a]of Object.entries(ride.attributes))g.setAttribute(key,a);g.setIndex(ride.index);}else{for(const [key,a]of Object.entries(p.attributes))g.setAttribute(key,new T.BufferAttribute(unpack(a.packed,binary),a.itemSize));g.setIndex(p.index?new T.BufferAttribute(indices(p.index,binary),1):null);}g.morphTargetsRelative=true;for(const [key,arrays]of Object.entries(p.morph))g.morphAttributes[key]=arrays.map(a=>new T.BufferAttribute(unpack(a,binary),3));g.userData.supportIndices=indices(p.support,binary);g.computeBoundingSphere();return g;}
export function cachedSurfaces(name,material){if(!decoded.has(name)){const parts={};for(const [role,p]of Object.entries(packed[name].parts)){const ride=geometry(p.ride,null,packed[name].binary),crash=geometry(p.crash,ride,packed[name].binary);contactClusters(crash);parts[role]={ride,crash,name:p.name,carveStart:p.carveStart};}decoded.set(name,parts);}
 const result={};for(const [role,p]of Object.entries(decoded.get(name))){const mesh=new T.Mesh(p.ride,material(role));mesh.name=p.name;mesh.frustumCulled=false;mesh.castShadow=mesh.receiveShadow=true;Object.assign(mesh.userData,{memoryCaster:true,rideGeometry:p.ride,crashGeometry:p.crash,carveStart:p.carveStart});result[role]=mesh;}return result;}

export function releaseDecodedRider(name){const parts=decoded.get(name);if(!parts)return;for(const p of Object.values(parts)){p.ride.dispose();p.crash.dispose();}decoded.delete(name);}

export function priorRest(name,role){const p=packed[name];return Object.fromEntries(Object.entries(p.parts[role].priorRest).map(([k,v])=>[k,new T.BufferAttribute(unpack(v,p.binary),3)]));}

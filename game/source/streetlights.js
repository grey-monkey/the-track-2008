import * as T from './vendor/three.module.js';
import {lampAsset} from './streetlamp-data.js';
import {paintedMaterial} from './pigment.js';
import {roadPoints,entrancePoints,bulb,roadDistance} from './world.js';
// Aerial-informed verge / frontage stations, reconstructed where foliage hides poles.
export const streetlightLayout=[
 {road:'entry',index:18,side:1,setback:6.1},{road:'entry',index:46,side:1,setback:6.55},
 {index:26,side:-1,setback:5.65},{index:72,side:-1,setback:5.8},{index:118,side:1,setback:5.7},
 {index:226,side:-1,setback:5.8},{index:278,side:1,setback:5.75},{index:331,side:1,setback:5.85},
 {index:383,side:-1,setback:5.75},{index:430,side:-1,setback:6.1}
];
const texture=await new T.TextureLoader().loadAsync(lampAsset.texture);texture.colorSpace=T.SRGBColorSpace;texture.flipY=false;texture.anisotropy=4;
const parts=lampAsset.parts.map(p=>{const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p.position,3));g.setAttribute('normal',new T.Float32BufferAttribute(p.normal,3));g.setAttribute('uv',new T.Float32BufferAttribute(p.uv,2));let m;
 if(p.name.includes('bulb'))m=new T.MeshBasicMaterial({color:0xffd29a});
 else if(p.name.includes('glass'))m=new T.MeshBasicMaterial({color:0xe1b984,transparent:true,opacity:.22,depthWrite:false,side:T.DoubleSide});
 else{m=paintedMaterial(0x69747d,{architecture:true});m.map=texture;}return{g,m};});
const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d'),r=ctx.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,'rgba(255,208,137,.50)');r.addColorStop(.2,'rgba(255,178,85,.16)');r.addColorStop(1,'rgba(255,168,70,0)');ctx.fillStyle=r;ctx.fillRect(0,0,64,64);const haloMap=new T.CanvasTexture(c);
export function addStreetlights(view){view.memoryLamps=[];view.streetlights=[];view.contactAudit.streetlights=[];
 for(const spec of streetlightLayout){const ps=spec.road==='entry'?entrancePoints:roadPoints,p=ps[spec.index],a=ps[spec.index-1],b=ps[spec.index+1],h=Math.atan2(b.z-a.z,b.x-a.x),x=p.x-Math.sin(h)*spec.setback*spec.side,z=p.z+Math.cos(h)*spec.setback*spec.side;
 // No poles in or around the end of the cul-de-sac.
 if(Math.hypot(x-bulb.x,z-bulb.z)<bulb.r+18)continue;
 if(roadDistance(x,z)<.75)throw new Error('Streetlight position overlaps pavement');
 const root=new T.Group();root.name='Residential lantern streetlight';root.rotation.y=-h;const ys=Array.from({length:12},(_,i)=>view.surfaceGround(x+Math.cos(i*Math.PI/6)*.22,z+Math.sin(i*Math.PI/6)*.22));const y=Math.max(...ys)+.006;root.position.set(x,y,z);
 for(const {g,m}of parts)root.add(new T.Mesh(g,m));
 // A small footing closes gaps beneath the cast base on unfinished sloping verges.
 const low=Math.min(...ys)-.06,pad=new T.Mesh(new T.CylinderGeometry(.22,.24,y-low,12),paintedMaterial(0x817b6c,{architecture:true}));pad.position.y=-(y-low)/2;root.add(pad);
 const glow=new T.Sprite(new T.SpriteMaterial({map:haloMap,transparent:true,depthWrite:false,blending:T.AdditiveBlending}));glow.position.fromArray(lampAsset.emitter);glow.scale.set(2.6,2.6,1);root.add(glow);view.scene.add(root);root.updateMatrixWorld(true);view.memoryLamps.push(root.localToWorld(new T.Vector3(...lampAsset.emitter)));view.streetlights.push(root);view.contactAudit.streetlights.push({x,z,height:lampAsset.height,minBaseClearance:y-Math.max(...ys),roadClearance:roadDistance(x,z)});
 }
 view.siteTargets.streetlight=view.streetlights[1].position.clone().add(new T.Vector3(0,2.3,0));view.siteTargets.lantern=view.streetlights[1].localToWorld(new T.Vector3(...lampAsset.emitter));
}

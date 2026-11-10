import * as T from '../vendor/three.module.js';
import {roadPoints} from '../world.js';
import {eveningUniforms} from '../evening-light.js';
// The grind line follows the existing poured curb crown. Its height is sampled
// from the same triangle index as wheel contact, never a floating visual rail.
export function installGrindRails(view){
 const points=[];let length=0;
 for(let index=271;index<=281;index+=.25){const i=Math.floor(index),f=index-i,a=roadPoints[i],b=roadPoints[i+1],prev=roadPoints[i-1];
  const dx=b.x-prev.x,dz=b.z-prev.z,l=Math.hypot(dx,dz),x=a.x+(b.x-a.x)*f-dz/l*4.49,z=a.z+(b.z-a.z)*f+dx/l*4.49,y=view.hazards.curb(x,z);
  if(y===undefined)continue;const last=points.at(-1);if(last)length+=Math.hypot(x-last.x,z-last.z);points.push({x,y,z,s:length});
 }
 if(points.length<3)throw Error('The existing curb did not provide a continuous grind line');
 const rail={id:'plywood-curb',points,length,streetSide:-1};view.hazards.grindRails=[rail];
 const positions=[];
 for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz),nx=-dz/l*.045,nz=dx/l*.045;
  const quad=[[a.x-nx,a.y+.004,a.z-nz],[a.x+nx,a.y+.004,a.z+nz],[b.x+nx,b.y+.004,b.z+nz],[b.x-nx,b.y+.004,b.z-nz]];for(const j of [0,1,2,0,2,3])positions.push(...quad[j]);
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.computeBoundingSphere();
 const m=new T.MeshBasicMaterial({color:0x807d73,transparent:true,opacity:.65,side:T.DoubleSide,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});
 m.onBeforeCompile=s=>{s.uniforms.railNight=eveningUniforms.eveningNight;s.fragmentShader='uniform float railNight;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>','outgoingLight*=1.-railNight*.94;\n#include <opaque_fragment>');};
 const mesh=new T.Mesh(g,m);mesh.name='Waxed and scraped existing curb edge';view.scene.add(mesh);view.grindRails142={rail,mesh};return rail;
}

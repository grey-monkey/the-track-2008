import * as T from './vendor/three.module.js';
import {boardAssets} from './board-assets-data.js';
import {deckPrint} from './board-finishes.js';
import {paintedMaterial} from './pigment.js';
const cached=new Map();

function material(role,key){
 const palette={grip:0x242623,wood:key==='CRUISER'?0x9a503b:key==='HANDMEDOWN'?0x89643e:0xb79760,metal:0x92968f,wheel:key==='LONGBOARD'?0xe87524:0xe6ddc4,rubber:0x31312a,design:0xffffff};
 const m=paintedMaterial(palette[role]);const printed=(role==='wood'||role==='design')&&key!=='HANDMEDOWN';
 const before=m.onBeforeCompile;m.customProgramCacheKey=()=>`board57-${role}-${key}`;
 m.onBeforeCompile=s=>{before(s);if(printed){s.uniforms.deckInk={value:deckPrint(key)};s.vertexShader="varying float deckFacing;\n"+s.vertexShader;s.vertexShader=s.vertexShader.replace("#include <begin_vertex>","#include <begin_vertex>\ndeckFacing=normal.y;");s.fragmentShader="uniform sampler2D deckInk;varying float deckFacing;\n"+s.fragmentShader;}s.fragmentShader=s.fragmentShader.replace('(broad-.5)*.33','(broad-.5)*.08').replace('(brush-.5)*.68','(brush-.5)*.12').replace('(scumble-.5)*.18','(scumble-.5)*.05');s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
 ${role==='grip'?`float grit=phash(floor(pl.xz*1250.));diffuseColor.rgb*=.86+grit*.24;float wear=smoothstep(.55,.8,pigment(pl.xz*34.));diffuseColor.rgb+=vec3(.003)*wear*${key==='HANDMEDOWN'?'1.8':'.65'};`:''}
 ${role==='wood'?`float grainBoard=pnoise(vec2(pl.x*100.,pl.z*5.));diffuseColor.rgb*=.85+grainBoard*.28;float ply=step(.5,fract(pl.y*950.));diffuseColor.rgb*=.9+.1*ply;`:''}
 `);if(printed){const width={LONGBOARD:.24242,CRUISER:.258028,STREET:.18369}[key],length=boardAssets[key].length;s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>\nvec2 inkUV=vec2(.5+pl.x/${width.toFixed(6)},.5+pl.z/${length.toFixed(6)});vec3 ink=texture2D(deckInk,inkUV).rgb;diffuseColor.rgb=mix(diffuseColor.rgb,ink,${role==="design"?"1.":"smoothstep(.25,.65,-deckFacing)"});`);} };return m;
}
export function buildAssetBoard(key){
 const data=boardAssets[key];const board=new T.Group();board.name=key;board.userData.deckHeight={LONGBOARD:.0657,HANDMEDOWN:.0888,CRUISER:.087,STREET:.08129}[key];board.userData.length=data.length;
 if(!cached.has(key)){
  const parts=[];
  for(const [role,part] of Object.entries(data.parts)){
   const groups={};
   for(let t=0;t<part.position.length;t+=9){const x=(part.position[t]+part.position[t+3]+part.position[t+6])/3,z=(part.position[t+2]+part.position[t+5]+part.position[t+8])/3;const name=role==='wheel'?`${x>0?1:0}-${z>0?1:0}`:'all';const g=groups[name]??={p:[],n:[],uv:[]};g.p.push(...part.position.slice(t,t+9));g.n.push(...part.normal.slice(t,t+9));if(part.uv)g.uv.push(...part.uv.slice(t/3*2,t/3*2+6));}
   for(const [id,p] of Object.entries(groups)){
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(p.p,3));geo.setAttribute('normal',new T.Float32BufferAttribute(p.n,3));if(p.uv.length)geo.setAttribute('uv',new T.Float32BufferAttribute(p.uv,2));geo.computeBoundingBox();const center=role==='wheel'?geo.boundingBox.getCenter(new T.Vector3()):new T.Vector3();geo.translate(-center.x,-center.y,-center.z);if(role==='wheel'){const radius=(geo.boundingBox.max.y-geo.boundingBox.min.y)/2,target={LONGBOARD:.033,HANDMEDOWN:.0325,CRUISER:.031,STREET:.026}[key];const factor=target/radius;geo.scale(factor,factor,factor);}geo.computeBoundingSphere();parts.push({geo,mat:material(role,key),center,role,id});
   }
  }cached.set(key,parts);
 }
 for(const p of cached.get(key)){const mesh=new T.Mesh(p.geo,p.mat);mesh.name=p.role+'-'+p.id;mesh.position.copy(p.center);mesh.userData.boardWheel=p.role==='wheel';board.add(mesh);}
 return board;
}


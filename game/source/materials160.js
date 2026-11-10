import * as T from './vendor/three.module.js';
const urls={brick:'./assets/art160-brick.png',roof:'./assets/art160-roof.png',siding:'./assets/art160-siding.png',gravel:'./assets/art160-gravel.png',soil:'./assets/art160-soil.png',grass:'./assets/grass161.png'};
export const materialTiles160={};
await Promise.all(Object.entries(urls).map(async([name,url])=>{const texture=await new T.TextureLoader().loadAsync(url);texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.colorSpace=T.NoColorSpace;texture.minFilter=T.LinearMipmapLinearFilter;texture.magFilter=T.LinearFilter;texture.anisotropy=4;materialTiles160[name]=texture;}));
export const materialUniforms160=Object.fromEntries(Object.entries(materialTiles160).map(([name,t])=>['tile160_'+name,{value:t}]));
export const materialGLSL160=`
uniform sampler2D tile160_brick;uniform sampler2D tile160_roof;uniform sampler2D tile160_siding;uniform sampler2D tile160_gravel;uniform sampler2D tile160_soil;uniform sampler2D tile160_grass;
vec3 tileColor160(sampler2D map160,vec2 uv160){return pow(texture2D(map160,uv160).rgb,vec3(2.2));}
`;

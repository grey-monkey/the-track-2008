import * as T from '../vendor/three.module.js';
import {siteMaterial} from '../barriers90.js';
// Decoded from the user's THPS4 disc. Exact texture IDs and archive hashes are
// recorded in authoring/THPS4-surfaces142-provenance.json. Mipmapped diffuse;
// retain source diffuse color and use broad face shading for depth.
const loader=new T.TextureLoader();
const urls={asphalt:'./assets/spot142/asphalt.png',concrete:'./assets/spot142/concrete.png',worn:'./assets/spot142/worn-concrete.png',plywood:'./assets/spot142/plywood.png',wood:'./assets/spot142/wood.png',soil:'./assets/spot142/soil.png'};
export const surfaces={};
await Promise.all(Object.entries(urls).map(async([key,url])=>{const t=await loader.loadAsync(url);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.NoColorSpace;t.minFilter=T.LinearMipmapLinearFilter;t.magFilter=T.LinearFilter;t.anisotropy=4;surfaces[key]=t;}));
export function spotMaterial(color,kind='wood'){
 const m=siteMaterial(color),before=m.onBeforeCompile;
 m.customProgramCacheKey=()=>`spot146-color-${kind}-${color}`;
 m.onBeforeCompile=s=>{before(s);s.uniforms.spotDiffuse={value:surfaces[kind]};s.fragmentShader='uniform sampler2D spotDiffuse;\n'+s.fragmentShader;
 s.fragmentShader=s.fragmentShader.replace('vec3 paintedAlbedo=diffuseColor.rgb;',`vec3 paintedAlbedo=diffuseColor.rgb;
 vec3 spotN=abs(normalize(pn));vec2 spotUV=spotN.y>.55?pw.xz:spotN.x>.55?pw.zy:pw.xy;
 vec3 spotTex=texture2D(spotDiffuse,spotUV*${kind==='wood'?'.45':'.65'}).rgb;
 // Source tiles are stored without hardware color conversion because other
 // legacy uses still sample them as data. Decode this color sample explicitly.
 vec3 spotLinear=pow(spotTex,vec3(2.2));
 // Preserve deliberately dark underside/cut-edge materials, rather than
 // multiplying every tile into the same brown paint.
 float spotValue=clamp(dot(diffuseColor.rgb,vec3(.2126,.7152,.0722))/.34,.12,1.35);
 vec3 spotTint=diffuseColor.rgb/max(vec3(.025),vec3(dot(diffuseColor.rgb,vec3(.2126,.7152,.0722))));
 diffuseColor.rgb=spotLinear*spotValue*mix(vec3(1.),spotTint,.16);
 paintedAlbedo=diffuseColor.rgb;`);
 };return m;
}

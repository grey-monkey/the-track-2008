// Reuse adjacent unmarked skin in the small upper-arm UV island.
// No geometry changes or flat-color overlay: original pores and lighting remain.
export function removeArmTattoo(material){
 const before=material.onBeforeCompile,key=material.customProgramCacheKey;
 material.customProgramCacheKey=()=>key()+'clean-arm-53';
 material.onBeforeCompile=shader=>{before(shader);shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`\n#include <map_fragment>\n#ifdef USE_MAP
 float inkRegion=length((vMapUv-vec2(.145,.830))/vec2(.043,.047));
 float cleanBlend=1.-smoothstep(.78,1.10,inkRegion);
 vec4 originalSkin=texture2D(map,vMapUv);
 vec4 cleanSkin=texture2D(map,vMapUv+vec2(.085,0.));
 diffuseColor.rgb*=mix(vec3(1.),cleanSkin.rgb/max(originalSkin.rgb,vec3(.0001)),cleanBlend);
#endif
 `);};
}


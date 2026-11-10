// Color, rather than blur, separates the remembered landscape into depth bands.
export const atmosphereGLSL=`
uniform float illustrationExperiment;uniform float illustrationNight;
vec3 memoryAirColor(vec3 base,float d){
 return base*mix(vec3(.76,.85,1.05),vec3(.88,.94,1.10),smoothstep(55.,330.,d));
}
float memoryAirAmount(float d){
 float haze=min(.76,1.-exp(-pow(max(d-24.,0.)*.0042,1.65)));
 return haze;
}
`;

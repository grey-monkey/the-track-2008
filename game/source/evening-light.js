import {visual85} from './visual85/state.js';
import * as T from './vendor/three.module.js';
import {sunDirection,memoryLight} from './memory-light.js';
export const eveningUniforms={eveningCloudTime:{value:0},eveningNight:{value:0},eveningSun:{value:sunDirection},eveningDirect:{value:1},eveningLamp:{value:.3},eveningCar:{value:new T.Vector3()},eveningForward:{value:new T.Vector3()}};
const smooth=(a,b,x)=>{const t=T.MathUtils.clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
export function applyEvening(view,clock){
 if(!view.rope.material.userData.eveningRope){
  const m=view.rope.material;m.userData.eveningRope=true;m.customProgramCacheKey=()=> 'evening-rope-7';
  m.onBeforeCompile=shader=>{
   Object.assign(shader.uniforms,eveningUniforms,memoryLight);
   shader.vertexShader='varying vec3 ropeWorld;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n ropeWorld=(modelMatrix*vec4(position,1.)).xyz;');
   shader.fragmentShader='varying vec3 ropeWorld;uniform float eveningNight;uniform vec3 lampPositions[4];\n'+shader.fragmentShader;
   shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
    float ropeLamp=0.;for(int i=0;i<4;i++){float d=distance(ropeWorld,lampPositions[i]);ropeLamp=max(ropeLamp,.40*(1.-smoothstep(2.,9.,d)));}
    diffuseColor.rgb*=mix(vec3(1.),vec3(.095,.11,.14)+vec3(1.,.76,.44)*ropeLamp,eveningNight);
   `);
  };m.needsUpdate=true;
 }
 eveningUniforms.eveningCloudTime.value=clock.seconds;
 const s=clock.sun;
 const night=smooth(2,17,-s.altitude);visual85.illustrationNight.value=night;visual85.illustrationSun.value=sunDirection;
 eveningUniforms.eveningNight.value=night;
 eveningUniforms.eveningDirect.value=1-smooth(-1,3,-s.altitude);
 eveningUniforms.eveningLamp.value=.3+.7*smooth(-2,7,-s.altitude);
 sunDirection.set(s.x,s.y,s.z);
 eveningUniforms.eveningCar.value.copy(view.car.position);
 eveningUniforms.eveningForward.value.set(0,0,-1).applyQuaternion(view.car.quaternion);
 for(const root of view.streetlights??[])root.traverse(o=>{if(o.isSprite)o.material.opacity=.35+.65*eveningUniforms.eveningLamp.value;});
 Object.assign(view.sky.material.uniforms,visual85);view.sky.material.uniforms.eveningSun=eveningUniforms.eveningSun;
 view.sky.material.uniforms.eveningNight=eveningUniforms.eveningNight;
 const gold=smooth(0,6,s.altitude),blue=smooth(2,7,-s.altitude)*(1-smooth(10,18,-s.altitude));
 view.scene.fog.color.set('#937d94').lerp(new T.Color('#a08b71'),gold*.55).lerp(new T.Color('#435d91'),blue*.65).lerp(new T.Color('#080e18'),night);
 if(view.memoryAir)view.memoryAir.value.copy(view.scene.fog.color);
}
// Reuse the painted cloud composition as a tonal mask, independently relit.
// World directions remain fixed as the camera turns; east never mirrors west.
export const eveningSkyGLSL=`uniform float illustrationExperiment;uniform float eveningCloudTime;uniform sampler2D paintedSky;uniform vec3 eveningSun;uniform float eveningNight;varying vec3 vWorld;
float skyHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float skyNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(skyHash(i),skyHash(i+vec2(1,0)),f.x),mix(skyHash(i+vec2(0,1)),skyHash(i+vec2(1,1)),f.x),f.y);}
void main(){
 vec3 v=normalize(vWorld);float u=abs(atan(v.z,v.x))/3.14159265;
 vec3 paint=texture2D(paintedSky,vec2(u,clamp(v.y*1.8+.10,0.,1.))).rgb;
 float clouds=1.-smoothstep(.17,.53,dot(paint,vec3(.299,.587,.114)));
 float horizon=pow(1.-clamp(v.y,0.,1.),3.);
 float west=pow(max(0.,dot(normalize(v.xz),normalize(eveningSun.xz))),5.);
 float afterglow=1.-smoothstep(.025,.19,-eveningSun.y);
 vec3 top=mix(vec3(.19,.24,.40),vec3(.0007,.0013,.0025),eveningNight);
 vec3 base=mix(vec3(.39,.36,.49),vec3(.002,.0035,.006),eveningNight);
 vec3 c=mix(top,base,horizon);
 c=mix(c,vec3(.94,.36,.13),horizon*west*afterglow*.86);
 float pink=exp(-pow((v.y-.09)*14.,2.))*(1.-west)*afterglow;
 c+=vec3(.10,.025,.035)*pink;
 vec3 cloud=mix(vec3(.16,.17,.27),vec3(.00015,.0003,.0007),eveningNight);
 cloud+=vec3(.28,.085,.032)*west*horizon*afterglow;
 c=mix(c,cloud,clouds*.88);
 // Keep the original painted color variation, not only its flattened luminance mask.
 float sunward=smoothstep(-.65,.8,dot(normalize(v.xz),normalize(eveningSun.xz)));
 vec3 original=paint*mix(vec3(.58,.66,1.08),vec3(1.13,.95,.90),sunward);
 float originalLuma=dot(original,vec3(.299,.587,.114));
 original=max(vec3(0.),mix(vec3(originalLuma),original,1.19));
 c=mix(c,original,afterglow*(1.-eveningNight)*.88);

 // Sparse higher cloud veil sits behind the painted low cloud masses.
 vec2 highUV=vec2(v.x*8.+v.z*3.,v.y*27.+v.z*4.)+vec2(eveningCloudTime*.0007,0.);
 float highNoise=.7*skyNoise(highUV)+.3*skyNoise(highUV*2.1);
 float wisps=smoothstep(.56,.75,highNoise)*smoothstep(.07,.35,v.y);
 vec3 highTint=mix(vec3(.32,.37,.52),vec3(.75,.47,.32),sunward*afterglow);
 c=mix(c,highTint,wisps*(1.-clouds)*.17*(1.-eveningNight));
 float distanceVeil=exp(-max(0.,v.y)*17.)*(.3+.7*west)*afterglow;
 c=mix(c,vec3(.73,.43,.32),distanceVeil*.065*(1.-clouds*.7));
 c*=1.-clouds*.025*(1.-eveningNight);
 // Relight existing cloud masses, retaining their authored edges and color detail.
 vec3 duskCloud=c*mix(vec3(.91,.97,1.08),vec3(1.055,1.025,.98),sunward*(1.-clouds*.5));
 c=mix(c,duskCloud,illustrationExperiment*(1.-eveningNight));
 // Smooth overlapping color phases tied to the physical sun elevation.
 float gold=smoothstep(0.,.105,eveningSun.y);
 float rose=(1.-gold)*(1.-smoothstep(.06,.15,-eveningSun.y));
 float blue=smoothstep(.035,.12,-eveningSun.y)*(1.-smoothstep(.20,.31,-eveningSun.y));
 c*=mix(vec3(1.),vec3(1.09,1.21,.76),gold);
 c*=mix(vec3(1.),vec3(1.10,.88,1.12),rose*.7);
 c*=mix(vec3(1.),vec3(.73,.92,1.28),blue*.8);
 float sun=1.-smoothstep(.006,.013,distance(v,normalize(eveningSun)));
 c+=vec3(1.,.57,.22)*sun*smoothstep(-.012,.012,eveningSun.y)*(1.-clouds);
 gl_FragColor=vec4(c,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`;

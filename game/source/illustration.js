import {visual85} from './visual85/state.js';
import {eveningUniforms} from './evening-light.js';
import {graphics} from './graphics-profile.js';
import * as T from './vendor/three.module.js';
import {noiseGLSL} from './pigment.js';
// A restrained edge-aware finish. UI is outside the canvas and stays crisp.
// Five or nine samples per pixel, no frame history and no animated noise.
export class IllustrationFinish{
 constructor(renderer){
  this.target=new T.WebGLRenderTarget(1,1,{depthBuffer:true});
  this.target.texture.colorSpace=T.LinearSRGBColorSpace;
  this.scene=new T.Scene();this.camera=new T.OrthographicCamera(-1,1,1,-1,0,1);
  this.material=new T.ShaderMaterial({depthTest:false,depthWrite:false,uniforms:{...visual85,eveningNight:eveningUniforms.eveningNight,picture:{value:this.target.texture},pixel:{value:new T.Vector2()},amount:{value:1},secretGold:{value:0},exitFade:{value:0}},vertexShader:'varying vec2 uvp;void main(){uvp=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`
  uniform float illustrationExperiment;uniform float eveningNight;uniform sampler2D picture;uniform vec2 pixel;uniform float amount;uniform float secretGold;uniform float exitFade;varying vec2 uvp;
  ${noiseGLSL}
  void main(){
   vec2 paper=uvp/pixel;
   float mark=pnoise(paper*vec2(.17,.055));
   vec2 bend=vec2(mark-.5,pnoise(paper*.083)-.5)*pixel*.85;
   vec2 center=clamp(uvp+bend*(1.-illustrationExperiment),vec2(0),vec2(1));
   vec3 c=texture2D(picture,center).rgb,sum=c*2.;float total=2.;
   // Approved integration sets this blend to zero. Skip unused neighbor reads.
   if(illustrationExperiment<1. && amount>0.){
   for(int i=0;i<${graphics.paintSamples};i++){
    float a=float(i)*${(Math.PI*2/graphics.paintSamples).toFixed(8)};vec2 delta=vec2(cos(a),sin(a))*pixel*(1.15+mark*1.0);
    vec3 n=texture2D(picture,clamp(center+delta,vec2(0),vec2(1))).rgb;
    float weight=exp(-dot(n-c,n-c)*95.);sum+=n*weight;total+=weight;
   }
   c=mix(c,sum/total,.52*amount*(1.-illustrationExperiment));
   }
   float tooth=phash(floor(paper*.8))-.5;
   // Small pigment variation, with lifted blue-violet shadow color.
   c*=1.+tooth*.038*amount*(1.-illustrationExperiment*.65);
   float dark=1.-smoothstep(.015,.16,dot(c,vec3(.2126,.7152,.0722)));
   c+=vec3(.005,.004,.012)*dark*amount*(1.-eveningNight);
   // Night has true dark intervals. Retain bright lamp/lens values instead of
   // lowering exposure globally and dimming the lights along with the landscape.
   float luminance=dot(c,vec3(.2126,.7152,.0722));
   c*=mix(1.,mix(.38,1.,smoothstep(.025,.19,luminance)),eveningNight);
   // A subtle warm exposure lift, strongest on lit surfaces; preserve deep
   // shadows and the existing time of day. HUD is outside this render pass.
   float goldLit=smoothstep(.015,.42,dot(c,vec3(.2126,.7152,.0722)));
   vec3 gold=c*vec3(1.14,1.055,.955)+vec3(.014,.007,.001)*goldLit;
   c=mix(c,gold,secretGold);
   // Darkness closes in from the edges as the rider leaves the gate.
   float tunnelRadius=length((uvp-vec2(.5,.48))*vec2(1.,.82));
   float tunnel=smoothstep(max(0.,.78-exitFade*.9),max(.03,1.-exitFade*.9),tunnelRadius);
   c*=pow(1.-exitFade,1.25)*(1.-tunnel*min(1.,exitFade*2.));
   gl_FragColor=vec4(c,1.);
   #include <colorspace_fragment>
  }`});
  this.scene.add(new T.Mesh(new T.PlaneGeometry(2,2),this.material));this.size=new T.Vector2();
 }
 render(renderer,scene,camera){
  renderer.getDrawingBufferSize(this.size);const {x:w,y:h}=this.size;
  if(this.target.width!==w||this.target.height!==h){this.target.setSize(w,h);this.material.uniforms.pixel.value.set(1/w,1/h);}
  renderer.info.autoReset=false;
  renderer.setRenderTarget(this.target);renderer.render(scene,camera);
  renderer.setRenderTarget(null);renderer.render(this.scene,this.camera);
 }
}

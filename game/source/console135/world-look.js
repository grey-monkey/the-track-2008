import {art159Uniforms,art159GLSL} from '../world-art159.js';
import {materialUniforms160,materialGLSL160} from '../materials160.js';
import {surfaces} from '../spot142/materials.js';
// Source evidence: THPS4-surfaces142-provenance.json / reference142-art.txt.
// The source worlds use colored diffuse tiles plus authored vertex shading.
// This is a Track lighting adaptation; native light/fog curves were not recovered.
export function installWorldLook(view){
 if(view.consoleWorldLook)return view.consoleWorldLook;
 const amount={value:1},seen=new WeakSet(),state={amount,materials:0,refresh};
 const light=`
   vec3 consoleN=normalize(pn);
   float consoleSun=max(0.,dot(consoleN,normalize(eveningSun)));
   // Broad face values, like the reference's diffuse/vertex-color hierarchy.
   // Restore the broad directional fill used before146. Keep actual material RGB.
   consoleSurface*=surfaceLight160(consoleN,eveningSun,eveningDirect);
   diffuseColor.rgb=mix(diffuseColor.rgb,consoleSurface,consoleLook);
 `;
 function adapt(material){
  if(!material||seen.has(material))return;
  seen.add(material);
  const previous=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material),originalKey=key();
  material.customProgramCacheKey=()=>originalKey+'-world163-sage-v1';
  material.onBeforeCompile=function(shader,renderer){
   previous.call(this,shader,renderer);
   let f=shader.fragmentShader;
   if(f.includes('uniform float consoleLook;')){shader.uniforms.consoleLook=amount;return;}
   const painted=f.includes('vec3 paintedAlbedo=diffuseColor.rgb;');
   if(!painted&&!f.includes('float memoryAirAmount'))return;
   shader.uniforms.consoleLook=amount;
   Object.assign(shader.uniforms,art159Uniforms,materialUniforms160);
   Object.assign(shader.uniforms,{originalAsphalt:{value:surfaces.asphalt},originalConcrete:{value:surfaces.concrete},originalWorn:{value:surfaces.worn},originalSoil:{value:surfaces.soil}});
   f=art159GLSL+(f.includes('uniform sampler2D tile160_brick;')?'':materialGLSL160)+'uniform sampler2D originalAsphalt;uniform sampler2D originalConcrete;uniform sampler2D originalWorn;uniform sampler2D originalSoil;uniform float consoleLook;\n'+f;
   f=f.replace('return mix(original,layered,illustrationExperiment*(1.-illustrationNight));}',
    'return mix(original,layered,illustrationExperiment*(1.-illustrationNight))*(1.-consoleLook*.46); }');
   if(painted){
    // Detect the source code as custom material cache keys can hide flags.
    const road=f.includes('float aggregate='),earth=f.includes('vec2 drift='),concrete=f.includes('float chalk=');
    const subject=f.includes('humanHeadlight')||f.includes('enamelBase')||f.includes('vec3 reflected=');
    f=f.replace('float facing=smoothstep','vec3 consoleAlbedo=diffuseColor.rgb;\nfloat facing=smoothstep');
    let detail=`vec3 consoleSurface=consoleAlbedo;`;
    if(road)detail=`
     // Keep patch/divot modulation authored before paintedAlbedo, while replacing
     // the former blue road pigment with the source aggregate's actual color.
     vec3 repairValue=clamp(consoleAlbedo/max(diffuse,vec3(.001)),vec3(.15),vec3(1.45));
     vec3 asphalt=pow(texture2D(originalAsphalt,pw.xz*.48).rgb,vec3(2.2));
     vec3 consoleSurface=asphalt*vec3(.91,.96,1.04)*repairValue*.40;
     float broadWear=pnoise(pw.xz*.16+vec2(12.,7.));
     consoleSurface*=.93+(broadWear-.5)*.20;
    `;
    if(concrete)detail=`
     vec3 cn=abs(normalize(pn));vec2 cuv=cn.y>.55?pw.xz:cn.x>.55?pw.zy:pw.xy;
     vec3 ct=pow(texture2D(originalConcrete,cuv*.62).rgb,vec3(2.2));
     vec3 worn=pow(texture2D(originalWorn,cuv*.33).rgb,vec3(2.2));
     vec3 localValue=clamp(consoleAlbedo/max(diffuse,vec3(.001)),vec3(.25),vec3(1.35));
     vec3 consoleSurface=mix(ct,worn,.24)*vec3(1.04,1.02,.97)*localValue;
     // The rolled crown catches sun; vertical and underside faces remain heavy.
     consoleSurface*=.79+.21*abs(normalize(pn).y);
    `;
    if(earth)detail=`
     vec2 fieldUV160=(pw.xz-trackBounds159.xy)/trackBounds159.zw;
     vec4 field160=texture2D(trackShade159,fieldUV160);
     float work160=field160.g,wood160=field160.b;
     float spread160=smoothstep(.27,.72,pnoise(pw.xz*.10));
     vec3 soil160=mix(tileColor160(tile160_soil,pw.xz*.52),tileColor160(tile160_soil,mat2(.6,-.8,.8,.6)*pw.xz*.31+vec2(.27,.41)),spread160*.65);
     vec3 gravel160=tileColor160(tile160_gravel,pw.xz*.73);
     float patch160=pnoise(pw.xz*.083+vec2(3.,17.));
     float curb160=${f.includes('varying float vergeDistance;')?'1.-smoothstep(.35,3.8,vergeDistance)':'0.'};
     float gravelMix160=clamp(curb160*.72+work160*.36+smoothstep(.55,.72,patch160)*.26,0.,.83);
     vec3 consoleSurface=mix(soil160*vec3(1.14,1.01,.88),gravel160*vec3(1.62,1.39,1.15),gravelMix160);
     float compact160=1.-smoothstep(.34,.62,pnoise(pw.xz*.037+vec2(17.,2.)));
     vec3 mineral160=mix(vec3(.71,.68,.66),vec3(1.20,1.12,1.01),smoothstep(.25,.75,patch160));
     consoleSurface*=mineral160;
     consoleSurface=mix(consoleSurface,consoleSurface*vec3(1.18,1.10,.93),work160*.30);
     consoleSurface=mix(consoleSurface,consoleSurface*vec3(.65,.70,.76),compact160*.42+wood160*.18);
     vec2 grade160=mat2(.8,-.6,.6,.8)*pw.xz;
     float track160=pow(.5+.5*sin(grade160.y*2.8+pnoise(pw.xz*.14)*2.),10.);
     consoleSurface*=1.-track160*work160*.14;
     // Exposed Piedmont clay, with dirt and stony patches retained in disturbed areas.
     float soilValue161=dot(soil160,vec3(.299,.587,.114));
     vec3 clay161=vec3(.29,.108,.050)*clamp(.62+soilValue161*2.7,.65,1.25);
     clay161*=mix(vec3(.72,.71,.76),vec3(1.18,1.12,1.02),patch160);
     vec3 land162=texture2D(trackCover162,fieldUV160).rgb;
     float clayCover161=land162.b*(.80+.18*smoothstep(.28,.68,pnoise(pw.xz*.045+vec2(12.,9.))));
     consoleSurface=mix(consoleSurface,clay161,clayCover161*(1.-curb160*.30));
     float grassField161=land162.r;
     float grassBreak161=(pnoise(pw.xz*.085)-.5)*.38+(pnoise(pw.xz*.53)-.5)*.13;
     float grassCover161=smoothstep(.10,.90,grassField161+grassBreak161*4.*grassField161*(1.-grassField161))*(1.-work160*.65)*(1.-curb160*.85);
     vec3 grass161=mix(tileColor160(tile160_grass,pw.xz*.55),tileColor160(tile160_grass,mat2(.8,-.6,.6,.8)*pw.xz*.29),spread160*.45);
     grass161*=mix(vec3(.80,1.08,.65),vec3(1.14,1.12,.67),smoothstep(.34,.70,patch160));
     float grassDry161=smoothstep(.48,.72,pnoise(pw.xz*.16+vec2(12.,8.)));
     grass161=mix(grass161,grass161*vec3(1.18,.91,.70),grassDry161*.55);
     // Muted sage pigment keeps the grass lively without the bright green cast.
     float grassValue163=dot(grass161,vec3(.299,.587,.114));
     grass161=mix(grass161,grassValue163*vec3(.83,1.04,.78),.65)*.94;
     float grassThin161=smoothstep(.54,.76,pnoise(pw.xz*.26));
     consoleSurface=mix(consoleSurface,grass161,grassCover161*(.96-grassThin161*.23));
     consoleSurface*=trackGround159(pw.xz);
    `;
    if(earth){
     // Remove the older distance-to-flat-pink soil replacement as a whole.
     const a=f.indexOf('vec2 drift='),b=f.indexOf('float plane=',a);
     if(a>=0&&b>a)f=f.slice(0,a)+f.slice(b);
    }
    if(!subject){
     // Replace only the broad painterly stage. Later authored seams, eave shade,
     // neighborhood wear, ground contact, lamps and headlight receivers survive.
     const brushStage=/diffuseColor\.rgb\*=\.76\+facing\*\.24\+\(broad-\.5\)\*[0-9.]+\+\(brush-\.5\)\*[0-9.]+\*\(\.35\+\.65\*detail\)\+\(scumble-\.5\)\*\.18\*detail\+\(grain-\.5\)\*\.07\*detail;/;
     const surfaceLight=(road||earth||concrete)?light.replace('vec3 consoleN=normalize(pn);','vec3 consoleN=normalize(pn);if(consoleN.y<0.)consoleN=-consoleN;'):light;
     f=f.replace(brushStage,detail+((!road&&!earth&&!concrete)?surfaceLight.replace('.70+.30*consoleSun','.56+.44*consoleSun'):surfaceLight));
     f=f.replace('diffuseColor.rgb*=mix(vec3(1.),planeTint,','planeTint=mix(planeTint,vec3(1.),consoleLook);\ndiffuseColor.rgb*=mix(vec3(1.),planeTint,');
     f=f.replace('diffuseColor.rgb+=vec3(.018,.014,.032)*(1.-plane);','diffuseColor.rgb+=vec3(.018,.014,.032)*(1.-plane)*(1.-consoleLook);');
     f=f.replace('diffuseColor.rgb*=.71;','diffuseColor.rgb*=mix(.71,1.,consoleLook);');
     f=f.replace('vec3(.052,.021,.008)*rim*plane','vec3(.052,.021,.008)*(1.-consoleLook*.8)*rim*plane');
    }
    f=f.replace('wash*=mix(1.,.35,illustrationExperiment*(1.-eveningNight));','wash*=mix(1.,.35,illustrationExperiment*(1.-eveningNight))*(1.-consoleLook*.85);');
    f=f.replace('air,distant*.42)','air,distant*.42*(1.-consoleLook*.70))');
   }
   shader.fragmentShader=f;
  };
  material.needsUpdate=true;state.materials++;
 }
 function refresh(){
  view.scene.traverse(o=>{if(o.isMesh)(Array.isArray(o.material)?o.material:[o.material]).forEach(adapt);});
  if(view.finish?.material?.uniforms?.amount)view.finish.material.uniforms.amount.value=0;
 }
 view.consoleWorldLook=state;refresh();return state;
}

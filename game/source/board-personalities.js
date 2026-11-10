// Local 88: keep easy rolling; refine cornering support and intuitive Pintail slides.
// Restrained adjustments around approved Study 47; the shared yaw ceiling stays intact.
export const BOARD_FEEL=Object.freeze({
 LONGBOARD: Object.freeze({cornerGrip:1.035,response:.984,turn:.992,rolling:(.075/.108),bump:.72,recovery:1,fastLoad:0,ollieImpulse:0,slideGrip:1}),
 HANDMEDOWN:Object.freeze({cornerGrip:1,response:1.016,turn:1.012,rolling:(.100/.108),bump:.93,recovery:1,fastLoad:.04,ollieImpulse:0,slideGrip:.60}),
 CRUISER:   Object.freeze({cornerGrip:1.08,response:1.064,turn:1.020,rolling:(.125/.108),bump:1.02,recovery:1.08,fastLoad:.07,ollieImpulse:2.15,slideGrip:1}),
 STREET:   Object.freeze({cornerGrip:1.03,response:1.112,turn:1.008,rolling:(.150/.108),bump:1.18,recovery:.96,fastLoad:.12,ollieImpulse:2.75,slideGrip:1})
});
// Hard-carve entry, gentler hold threshold: no extra swipe, no existing skid required.
// Entry must persist; easing off or reversing input releases the slide progressively.
export const SLIDE_INTENT=Object.freeze({minimumSpeed:5,minimumInput:.70,holdSpeed:3.8,holdInput:.48,holdSeconds:.14,maximumAmount:.70,engageRate:4,releaseRate:4.5,controlledSlipAllowance:1.4});
export function personalitySlide(r,p,steer,speed,lat,dt){
 const g=SLIDE_INTENT,sign=Math.sign(steer),eligible=p.slideGrip<1&&!r.dirt&&r.height<=0;
 const same=sign===(r.slideSign??sign);
 if(!same){r.slideActive=false;r.slideHold=0;}
 if(!eligible||speed<g.holdSpeed||Math.abs(steer)<g.holdInput)r.slideActive=false;
 const pushing=eligible&&speed>=g.minimumSpeed&&Math.abs(steer)>=g.minimumInput;
 r.slideHold=pushing&&same?(r.slideHold??0)+dt:0;
 if(r.slideHold>=g.holdSeconds)r.slideActive=true;
 r.slideSign=sign;
 const target=r.slideActive?g.maximumAmount:0;
 r.slide=(r.slide??0)+(target-(r.slide??0))*(1-Math.exp(-dt*(target?g.engageRate:g.releaseRate)));
 return 1-r.slide*(1-p.slideGrip);
}

// Only 6.4 percent of carving loss is retained (Study 45 retained ninety).
export const TOW_FEEL=Object.freeze({carveRetention:.064,springFrequency:32,dampingRatio:.684});
export function carryCarveMomentum(r,before){
 if(r.dirt||r.height>0)return;
 const after=Math.hypot(r.vx,r.vz);
 if(after>.001&&after<before){const retained=after+(before-after)*TOW_FEEL.carveRetention*(1-(r.slide??0));r.vx*=retained/after;r.vz*=retained/after;}
}


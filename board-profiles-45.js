// User-authored normalized starting values. No aggregate quality score.
export const BOARD_PROFILES = Object.freeze(Object.fromEntries(Object.entries({
 luxuryLongboard: {steeringAuthority:.46,steeringResponse:.33,steeringDamping:.97,rotationalInertia:.94,lateralGrip:.91,rollingEfficiency:1,surfaceCompliance:.95,highSpeedStability:1,wobbleThreshold:.96,recovery:.94,wheelGrip:.96,slideBreakaway:.18,slideControl:.32,slideRecovery:.92,olliePower:0,landingForgiveness:0,crouchStabilityBonus:.90},
 handMeDownPintail: {steeringAuthority:.62,steeringResponse:.50,steeringDamping:.58,rotationalInertia:.75,lateralGrip:.63,rollingEfficiency:.87,surfaceCompliance:.73,highSpeedStability:.63,wobbleThreshold:.65,recovery:.60,wheelGrip:.56,slideBreakaway:.94,slideControl:.98,slideRecovery:.84,olliePower:0,landingForgiveness:0,crouchStabilityBonus:.76},
 bowlCruiser: {steeringAuthority:1,steeringResponse:.88,steeringDamping:.73,rotationalInertia:.34,lateralGrip:.98,rollingEfficiency:.69,surfaceCompliance:.64,highSpeedStability:.57,wobbleThreshold:.61,recovery:.88,wheelGrip:.92,slideBreakaway:.40,slideControl:.61,slideRecovery:.89,olliePower:.52,landingForgiveness:.86,crouchStabilityBonus:.68},
 elementStreetDeck: {steeringAuthority:.83,steeringResponse:1,steeringDamping:.33,rotationalInertia:.18,lateralGrip:.82,rollingEfficiency:.47,surfaceCompliance:.28,highSpeedStability:.26,wobbleThreshold:.43,recovery:.53,wheelGrip:.79,slideBreakaway:.57,slideControl:.48,slideRecovery:.66,olliePower:1,landingForgiveness:.64,crouchStabilityBonus:.58}
}).map(([key,value])=>[key,Object.freeze(value)])));
export const BOARD_PROFILE_KEYS = Object.freeze({LONGBOARD:'luxuryLongboard',HANDMEDOWN:'handMeDownPintail',CRUISER:'bowlCruiser',STREET:'elementStreetDeck'});
export function boardProfile(key){return BOARD_PROFILES[BOARD_PROFILE_KEYS[key]??key]??BOARD_PROFILES.luxuryLongboard;}

// Shared conversion from normalized design space to metres, seconds and radians.
// Tune these globally; board personalities live exclusively in BOARD_PROFILES.
export const HANDLING = Object.freeze({
 speedReference:12, steeringAngleMin:.20,steeringAngleRange:.95,
 responseMin:2,responseRange:18,headingRate:3.2,headingResponseRange:1.8,
 yawFollowRate:30,yawDampingWeight:.25,inertiaWeight:5,maxYawMin:1.1,maxYawRange:3.3,
 tractionMin:3,tractionRange:11,lateralRate:9,
 slideDemandStart:4.6,slideDemandEase:3.4,slideDemandWidth:.8,
 slideEnterMin:1.2,slideEnterRange:5,slideExitMin:.65,slideExitRange:3,
 slideGripLoss:.76,slideYawRange:.68,slideScrub:1.6,rollingContactRetention:.9,
 rollDragMin:.045,rollDragRange:.65,aeroDrag:.007,
 recoveryMin:.32,recoveryRange:1.9,wobbleYaw:.17,
 ollieMin:1.4,ollieRange:2.5,gravity:9.81,
 landingToleranceMin:.22,landingToleranceRange:.62
});







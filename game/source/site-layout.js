// Placement evidence is deliberately distinct from utility type and 2008 status.
// Google Maps close aerial inspected 2026-09-11. No imagery is bundled.
export const circuitCovers=[
 {index:26,side:-1.25,kind:'water'},{index:52,side:1.25,kind:'sewer'},
 {index:90,side:-1.25,kind:'water'},{index:125,side:1.25,kind:'sewer'},
 {index:204,side:-1.25,kind:'water'},{index:226,side:1.25,kind:'sewer'},
 {index:275,side:-1.25,kind:'water'},{index:307,side:1.25,kind:'sewer'},
 {index:350,side:-1.25,kind:'water'},{index:386,side:1.25,kind:'sewer'},
 {index:423,side:-1.25,kind:'water'},{index:452,side:1.25,kind:'sewer'}
].map(p=>({...p,evidence:'reconstructed',note:'Utility run inferred; cover not positively resolved in aerial.'}));
export const circuitDrains=[
 {index:38,side:-1,evidence:'aerial-candidate',note:'Western frontage rectangular curb fixtures; approximate station.'},
 {index:72,side:-1,evidence:'aerial-candidate',note:'Western frontage rectangular curb fixtures; approximate station.'},
 {index:104,side:-1,evidence:'aerial-candidate',note:'Western frontage rectangular curb fixtures; approximate station.'},
 {index:143,side:1,evidence:'reconstructed',note:'Southern approach catchment, based on reconstructed terrain.'},
 {index:244,side:1,evidence:'reconstructed',note:'Southern connector before the eastern turn.'},
 {index:317,side:1,evidence:'aerial-candidate',note:'Copperleaf eastern curb dark rectangular fixture; approximate station.'},
 {index:366,side:1,evidence:'aerial-candidate',note:'Copperleaf eastern frontage curb fixture; approximate station.'},
 {index:431,side:-1,evidence:'reconstructed',note:'Northern approach before the junction; keep junction pavement clear.'}
];
export const circuitHydrants=[{index:132,side:5.6},{index:395,side:5.6}];

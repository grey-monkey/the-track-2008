// User anchors: Dog 5 ft 3 in; Black 5 ft 9–10 in (midpoint chosen).
// Sally 5 ft 4 in; Sprad raised half an inch; Boss fixed at revision55 height.
// Measure floor to scalp, excluding hairstyle/beanie volume. Assets use metres.
const INCH=.0254;
const dogInches=63,blackInches=69.5,sallyInches=64;
const previousSpradInches=dogInches+(blackInches-dogInches)*(.055/.09);
const spradInches=previousSpradInches+.5;
const bossInches=(64.5+previousSpradInches)/2; // Preserve revision55 height.
export const RIDER_HEIGHT_METRES=Object.freeze({
 DOG:dogInches*INCH,
 SALLY:sallyInches*INCH,
 BOSS:bossInches*INCH,
 BLACK:blackInches*INCH,
 SPRAD:spradInches*INCH
});
const scalpHeight={DOG:1.7388002769829938,BLACK:1.7241996422101744,SALLY:1.7221942985655974,SPRAD:1.7278002769829939,BOSS:1.754062958038063};
export const RIDER_BODY_SCALE=Object.freeze(Object.fromEntries(Object.entries(RIDER_HEIGHT_METRES).map(([name,height])=>[name,height/scalpHeight[name]])));

// October 15, 2008, Greenbriar / Copperleaf, Charlotte. North is world -Z.
// Solar coordinates: low-order solar ephemeris, geometric elevation (no refraction).
export function solarPosition(utc){
 const rad=Math.PI/180,d=utc/86400000+2440587.5-2451545;
 const g=(357.529+.98560028*d)*rad,q=(280.459+.98564736*d)*rad;
 const l=q+(1.915*Math.sin(g)+.020*Math.sin(2*g))*rad,e=(23.439-.00000036*d)*rad;
 const ra=Math.atan2(Math.cos(e)*Math.sin(l),Math.cos(l)),dec=Math.asin(Math.sin(e)*Math.sin(l));
 const h=(280.46061837+360.98564736629*d-80.79695)*rad-ra,lat=35.08745*rad;
 const altitude=Math.asin(Math.sin(lat)*Math.sin(dec)+Math.cos(lat)*Math.cos(dec)*Math.cos(h));
 const azimuth=(Math.atan2(Math.sin(h),Math.cos(h)*Math.sin(lat)-Math.tan(dec)*Math.cos(lat))/rad+180+360)%360;
 return {altitude:altitude/rad,azimuth,x:Math.sin(azimuth*rad)*Math.cos(altitude),y:Math.sin(altitude),z:-Math.cos(azimuth*rad)*Math.cos(altitude)};
}
export const EVENING_START=Date.parse('2008-10-15T22:13:00Z'),EVENING_END=Date.parse('2008-10-16T00:12:00Z');
// Retiming only: linger in the low-sun/shadow and pink-sky portion of the
// same October ephemeris, then move faster through blue hour. Continuous,
// monotonic, with no lighting jumps or changes to the approved palette.
export const EVENING_TIME_EASING=2.5;
export const eveningSolarProgress=progress=>Math.pow(Math.max(0,Math.min(1,progress)),EVENING_TIME_EASING);
export class EveningClock{
 constructor(){this.seconds=0;}
 advance(dt,playing){if(playing&&Number.isFinite(dt))this.seconds=Math.min(600,this.seconds+Math.max(0,dt));}
 get progress(){return this.seconds/600;}
 get sun(){return solarPosition(EVENING_START+(EVENING_END-EVENING_START)*eveningSolarProgress(this.progress));}
}

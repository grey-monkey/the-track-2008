> Current Build141 rules supersede this original handoff: Boss bails on road hazards, curbs, non-asphalt surfaces, ramps and trick obstacles. Dog develops high-speed straight-line wobble on every board; carving recovers it. See README.md and BUILD141-NOTES.txt for the active skill matrix and controls.

# Game intention and current direction

## The feeling

A personal memory of friends skating behind a Mercedes in an unfinished Charlotte, North Carolina neighborhood in 2008. Dreamy, melodic, intimate and a little dangerous. The pleasure is carving, the pull of the rope, pavement passing underneath, and being there with the crew. Preserve the quiet screen and the sense of a specific evening rather than adding conventional HUD clutter.

## Play

Choose rider, board, regular/goofy stance, rope length and driving speed. Ride behind the car, carve and negotiate pavement details, ramps and hazards. Drag sideways to carve; hold still to crouch and release to attempt an ollie where the board permits; swipe upward to release the rope. Board types are longboard, hand-me-down, cruiser and street, with different handling and trick capabilities.

Releasing the rope enters free ride: retain momentum, steer independently, use paved paths and downhill slopes, and let the camera follow travel direction while the car continues its route. The low-speed ending threshold was requested at 0.5 mph for 0.5 seconds. Asphalt, curb surfaces and the walking path should be rideable; entering dirt causes a wipeout. Preserve existing controls unless a deliberate change is agreed.

High speed belongs on straights; the car slows for turns, with a stronger turning allowance in the cul-de-sac. The latest route cuts inward, loops around the center barrier and exits diagonally. Build133 includes the revised line, but final user acceptance of that revision has not been recorded.

## The people

These are the owner's named friends/characters; do not invent new biographies or replace their identities.

| Character | Role and defining details |
|---|---|
| Dog | Playable. 5 ft 3 in. Dark charcoal shirt with the supplied blue C logo and its inner white outline, centered below the collar. |
| Sally | Playable. 5 ft 4 in. Hoodie silhouette; preserve the established portrait and clothing. |
| Black | Playable. About 5 ft 9–10 in. Established 311 shirt graphic and portrait. |
| Boss | Playable. Preserve the existing portrait, clothing and intermediate height defined in rider-proportions.js. |
| Sprad | Car passenger; not currently enabled as a playable rider. Fixed front passenger in the current seating logic. |

All five belong in the scene: one rider outside and four occupants in the car. Dog normally drives unless Dog is riding, in which case Sally drives. Sprad is front passenger; the other two fill the rear seats. Seated heights should reflect standing proportions, and backs should align with seatbacks. Preserve the approved character likenesses and proportion differences.

## Look

An illustrated, deliberately painted world: dirty peach clay, lavender/indigo shadows, muted olive woodland, and a rich sunset sky. Stronger ground definition close to the road; broad calm value areas farther away. Marks should suggest real grading, drainage and compacted clay, not evenly distributed dirt noise. Long, soft-edged sunset cast shadows are part of the atmosphere and should attach convincingly to their objects.

The perimeter treeline stays. Standalone young trees, shrubs, bushes and grass were removed because they harmed phone performance. Do not restore them casually. Keep roadside objects purposeful: houses with grounded foundations, lamps, utility boxes, hydrants, road hazards and ramp supports. No random scenery blocks or prop clutter. Curbs use rounded plan-view turns and raised, rideable profiles without overlap or distance popping.

The Mercedes is a dark W124 sedan, with a North Carolina First in Flight plate, 5330-LRD. The rope is a thin warm off-white braid. Both should belong to the painted world rather than appear emissive or artificially crisp.

## Sound

Music is The Lo and Beholds' album Lo and Behold!, starting with Four Mile Scar. It is car audio, not a global soundtrack: strongest through the side windows, occluded behind the trunk, and fading with distance. Music and ambient sound are intended to continue across selection, riding and the end screen, subject to browser gesture/audio-unlock restrictions. The selection screen includes the idling car and outdoor ambience.

Recorded engine, exhaust, tires, skateboard wheels, carving, impacts, scrapes and falls create the physical scene. Pavement hum should dominate irritating wheel click-clack. Ramp/gutter/car impacts should be audible and meaningful. Sparse quiet cicadas, wind through trees and occasional distant life support the mood. No ambient chime soundtrack. Prefer real recordings over generated sound effects.

## Animation and the next priority

Carve, braking, grip recovery, powerslide, rope-tension yank, takeoff and landing responses have been developed. The trailing hand is a natural counterbalance, and both hands must follow the whole-body motion. Feet stay planted for divots and surface response, with noticeable but cohesive compression/recovery at patches and curbs.

**Wipeouts remain unresolved.** Build133 is the latest release, not an approved finish. The owner rejected its relaxed resting poses as unnatural. Stop guessing at limb arrangements. Await the promised screenshots and example videos, then author contact, momentum, tumble and final rest from those references. Keep the rider down at the finish; avoid a standing-looking pose, rigid starfish, cocked joints or an abrupt loss of travel. Show a reviewable slow-motion study and gameplay-speed result before replacing the live animation again.

## Performance and development boundaries

Phone playability is the priority. Build131 onward was reported much smoother; Build132/133 kept a modest mobile resolution improvement. Current mobile pixel ratio is 1.15. Preserve the gain rather than increasing detail broadly. Keep expensive static scenery combined/baked and character deformation precomputed where practical. Retain source backups before further baking.

Test cold start, first ride, the houses coming into view, the cul-de-sac, audio unlock/reload, all riders and stances, free ride, crashes and restart. Use a real phone for performance conclusions; desktop checks and numerical contact tests are not substitutes. Keep nonstandard debug/query controls out of normal gameplay.

## Asset rights

Existing provenance records are in credits/. They include inherited source filenames and historical notes; they are retained for attribution, not as a current implementation guide. The Mercedes source is recorded as CC BY-NC-SA 3.0, so this is not a cleared commercial asset bundle. The owner supplied the band's album and described a personal connection; written distribution permission is not included here. Confirm rights before a commercial release. Preserve third-party notices and verify remaining assets during any release audit.

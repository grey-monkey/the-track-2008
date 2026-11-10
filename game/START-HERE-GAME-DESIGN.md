> Current Build141 rules supersede this original handoff: Boss bails on road hazards, curbs, non-asphalt surfaces, ramps and trick obstacles. Dog develops high-speed straight-line wobble on every board; carving recovers it. See README.md and BUILD141-NOTES.txt for the active skill matrix and controls.

# The Track: 2008
## Creative and game design brief for a redevelopment

**Read this first.** Recreate the experience described here; the included Build133 is a playable reference, not a requirement to retain its code or every current behavior. Prepared October 15, 2026 from the owner's direction and the active game. Approved intentions, implementation details and unresolved work are distinguished below.

## 1. What are we making, and why?

The Track: 2008 is a personal, playable memory of friends skating behind a Mercedes through an unfinished neighborhood in Charlotte, North Carolina. The owner describes it as **“a very dreamy, melodic memory of a good time skate game.”** That is the central brief.

The player should feel the pleasure and slight danger of being pulled along on a board with friends: carving into the rope's tension, hearing the wheels change over pavement, catching a turn, and releasing into a downhill glide as the car and its music move away. It is the feeling of being there together in the last light. Familiar people, a familiar car, a specific place, and the album they listened to give that movement personal meaning.

The purpose is to make this memory inhabitable. Smooth, responsive skating is the means of inhabiting it. A beautiful static scene would not be enough; nor would a technically accomplished skate controller without the friends, place, music and evening atmosphere.

A useful test for any change: **Does this make the ride feel more physical, the place more remembered, or the company more present, while staying enjoyable on a phone?** If it does none of those things, it is probably not a priority.

## 2. Story and emotional structure

The established story is a shared activity, not a scripted plot. It is 2008. A small crew is spending time in a partly built neighborhood, using the roads and a car to skate. The landscape is unfinished: houses, bare graded lots, curbs, utilities, a makeshift ramp and woodland at the perimeter. The evening and the music carry the mood.

The player begins with the crew gathered around the running Mercedes. Choosing a rider and board feels like deciding whose turn it is. A run begins with taking the tow. Straightaways offer acceleration and flow; corners bring anticipation and a risky swing. Surface changes and obstacles give the rider something physical to react to. Letting go changes the experience into an independent glide. A wipeout breaks that flow with a consequential, sometimes chaotic physical event. The invitation to ride again returns naturally to the same evening; music and ambience should not make it feel like the world has been switched off and restarted.

This gives each run a small story: **choose → take the pull → find a rhythm → manage risk → hold on or let go → recover the desire for another run.** This is a synthesis of the established design, not a mandate for cutscenes, dialogue or a scripted sequence of crashes.

There is no established campaign plot, antagonist, competition narrative or character dialogue in this handoff. Do not invent personal histories or personalities for the owner's friends. Additional stories should come from the owner.

## 3. The people and their personal signatures

The crew is Dog, Sally, Black, Boss and Sprad. Preserve their names, portraits, recognizable clothing and relative proportions. They are specific people, not interchangeable generic skateboard avatars. Use the included models/build as visual references; the text alone is not a likeness specification.

| Character | Personal identity to retain | Current gameplay distinction |
|---|---|---|
| Dog | Shortest established rider, 5 ft 3 in. Dark charcoal T-shirt with the supplied blue C emblem, its white inner outline retained and the large white background removed. Emblem sits on the chest, below the collar. | Playable; no intentional ollie in the current rules. Usually drives when someone else rides. |
| Sally | 5 ft 4 in; established hoodie, hair and face. | Playable; comparatively forgiving control/grip. Can ollie with the cruiser or street board. Drives when Dog rides. |
| Black | About 5 ft 9–10 in; established 311 shirt graphic, hair and portrait. | Playable. Ollies on the cruiser; kickflips on the street deck. |
| Boss | Preserve the established face, clothing and intermediate height. Do not equalize everyone to the same body size. | Playable; no intentional ollie in the current rules, with different control/grip from Sally and Black. |
| Sprad | Preserve the established portrait and proportions; seated height must reflect standing height. | Front passenger, not a selectable playable rider in the current version. |

When one person is skating, the other four belong in the car. The current seating pattern puts Sprad in the front passenger seat, Dog or Sally driving as above, and the remaining two in back. Backs should meet the seatbacks, occupants should not sit against the dash, and seated heights should remain visibly different. On the selection screen the crew is outside waiting; do not duplicate the same person both outside and visibly seated.

Character skill differences above are existing design to carry forward for review, not claims about the real people's biographies. Facial likenesses, exact clothing and additional personal anecdotes should be confirmed with the owner if a new asset pipeline replaces them.

## 4. Place, track shape and landmarks

The setting is an unfinished Charlotte neighborhood in autumn, with Piedmont clay and a wooded boundary. The existing lighting setup identifies **Greenbriar / Copperleaf, Charlotte**, and uses **October 15, 2008** as its evening reference. Treat that exact date as the current scene reference, not a newly established biographical fact. The map is based on aerial references and interpreted terrain, not a surveyed reconstruction.

The track is a stretched, irregular road loop, not a perfect oval. There is an entrance approach and a three-way junction near three houses at the upper/northern end. One long side bends down toward a cul-de-sac attached near the lower/southwestern part of the loop. The opposite side returns through several bends. A walking path winds through the interior, where grading and a hill create opportunities to leave the tow and glide downhill. Woodland encloses the larger clearing; existing and future house lots establish an unfinished neighborhood rather than an empty race course.

See **TRACK-MAP.svg** for the current road footprint, car line, walking path and selected landmarks. Its shape comes from the active build. It is a layout reference, not proof that every part of the current line is approved.

Distinguish the **road** from the **car's driving line**. The car should use the open asphalt deliberately rather than simply trace the curb. At the cul-de-sac the owner's arrows request an inward approach, a turn around the center obstacle and a diagonal departure through the throat. It should not follow a perfect outer circle or make an awkward last-second exit. Build133 attempts that correction; acceptance has not yet been recorded. The original supplied sketch is included as **references/cul-de-sac-owner-sketch.jpg** when available and takes precedence over an implementation that misses it.

Keep the landmarks that make this place recognizable: the entrance houses, solid foundations, lamps, electrical cabinets, hydrants, continuous raised curbs, road repairs, the depression/divot, the plywood ramp and its support blocks, the cul-de-sac barrier and the interior footpath. Preserve the specified upstairs two-room-and-hallway space if simplifying house assets; other interiors do not need expensive unseen detail. This interior is an established preservation request, not a new gameplay objective.

## 5. What the player does

At selection, choose a rider, board, regular/goofy stance, rope length and driving speed. The interface is restrained, with the established title treatment, “Ride” and a question-mark help control. Keep the world visible and alive behind it.

During the tow, steer across the lane and carve behind the car. The rope transmits pull and slack; it is not a rigid bar or a cosmetic tether. Short and long rope settings should materially change the distance, timing and space available for carving. The current range is approximately 8–25 feet; retain the feel rather than blindly copying constants into a new engine.

Touch controls are drag sideways to carve, hold relatively still to crouch, release the crouch to attempt an allowed trick, and swipe up to release the rope. Keep touch input legible and responsive, with a usable desktop test alternative. Do not assume every board and rider can ollie or kickflip.

On release, keep momentum and enter free ride. The rider looks toward travel, and the camera smoothly follows that direction rather than staying attached to the car. The Mercedes keeps driving its own route. The player should be able to catch the paved walking path and descend where the grade allows. This is not an immediate run-ending “coast” state. The requested low-speed end condition is below 0.5 mph for 0.5 seconds; a crash can end the ride separately.

Top speed is for the straight stretches. The upper speed setting was increased by 30%, while ordinary corner speeds were to remain controlled. The cul-de-sac needs enough speed to create a slightly dangerous whipping sensation without turning into an uncontrolled or geometrically impossible car turn. Acceleration, braking, line choice and rope pull must work together.

## 6. Board feel and rider dynamics

These are four different ride choices, not four skins on the same physics. Preserve their relative feel through a rewrite; the exact solver and coefficients may change.

| Board | Intended/current relative feel | Tricks and risks |
|---|---|---|
| Luxury Longboard | Longest deck, smoothest rolling and most forgiving over small bumps; calm, broad carving and strong momentum. | No intentional ollie. The stable baseline for enjoying the tow. |
| Hand-Me-Down Pintail | Nearly as long, less polished/forgiving than the luxury board, with a distinct loose slide character. | Sustained hard carving at speed can enter a powerslide. Ease off or reverse the input to regain grip progressively. No intentional ollie. |
| Bowl Cruiser | Shorter, more responsive and lively; stronger cornering support, more noticeable road feedback than the longboard. | Allows ollies for Sally and Black. Must still feel grounded and weighty. |
| Element Street Deck | Short, quick response, more rolling resistance and greater sensitivity to bumps and fast riding. | Sally can ollie; Black can kickflip. The more technical choice, not simply the fastest/easiest board. |

Rope tension, rolling resistance, steering, side slip, speed wobble, crouch stability, terrain slope, takeoff and landing need to feel like one physical system. Preserve useful momentum through a carve. Do not make each turn feel like an unexplained brake. Powerslide and grip recovery should be progressive and readable rather than an instantaneous yaw snap.

Crouching and body response communicate load. Slack taking up should give the rider a noticeable yank through the arm, shoulder and torso. Car braking should create an appropriate body adjustment. Carving needs to read from the actual gameplay camera, not only in a close-up animation viewer. The free arm is a counterbalance in every movement; the rope arm must remain believable and connected to the handhold.

## 7. Surfaces, obstacles and consequences

| Feature | Experience to preserve |
|---|---|
| Asphalt and curb tops/banks | Rideable. A curb or asphalt seam is not automatically a crash. Smooth plan-view radiuses and continuous height matter for both feel and readability. |
| Walking path and its road connection | Rideable alternate line after release. The requested broad return into the curb was roughly a 10-foot radius, giving the rider a practical path to catch. |
| Dirt beyond pavement | A loss-of-ride/crash boundary. Distinguish leaving the curb into dirt from riding along the curb itself. |
| Divot / depression | Board follows the depression with feet planted and body compression/recovery. It may produce a small physical departure; do not substitute the old intentional ollie animation. |
| Raised repair patches | Noticeable but light response at both entry and exit, with matching sound. Curbs may be harsher, but the response language should remain cohesive. |
| Plywood ramp | Visible approach loading, planted feet, takeoff and landing response. Support block tucked underneath so plywood overhangs the departure edge. Preserve the makeshift construction logic. |
| Manhole covers and seams | Wheel contact, clunks, small disturbance and appropriate body response; not every surface difference should stop the run. |
| Drain grates | In the existing design, a wheel catch can stop/pin the board and throw the rider forward. Communicate the cause. |
| Mercedes, center barrier, hydrants, cabinets and posts | Real collision obstacles with audible impact and a situation-appropriate fall. Rendered placement and collision boundaries must agree. |

Road hazards should invite a line choice, a well-timed movement or an instructive mistake. Avoid invisible collision boxes, floating objects, popping curbs and overlap that makes a safe line look unsafe. Cinder blocks belong to the ramp area; the random scenery blocks were removed. Do not fill the world with props simply because assets are available.

## 8. Animation and wipeout direction

Riding should have coordinated hips, knees, shoulders, head and hands. Feet must stay on the deck where the action calls for contact. Compression and recovery should be noticeable at speed: Tony Hawk Pro Skater was cited for readable body mechanics, with less exaggeration desired here. It is a reference for clarity, not a request to copy all of its tricks, interface or scoring systems.

Falls need separate causes: a sideways loss of grip, a stopped-board forward tumble, and a harder uncontrolled collision. Momentum must continue through slide/roll/tumble, then dissipate. A fall should not freeze too early or finish looking like a standing model turned sideways. The owner wants believable amateur wipeouts, not exclusively skilled, controlled falls. Finish in a plausible collapsed position, with natural joints and body contact, rather than a symmetrical starfish or awkwardly cocked limbs.

**Current status: Build133's relaxed wipeout poses were explicitly rejected.** They are reference for what needs replacing, not the desired outcome. The next step is the owner's promised screenshots and example videos. Recreate the timing, contact and final rest from those references; review slowly and at gameplay speed before publishing. The remainder of the riding animation was more positively received and should not be casually discarded.

## 9. Art, atmosphere and sound

Make the world feel deliberately painted. The sunset sky is the quality benchmark: broad composed color and values, not a universal noise/filter treatment. Ground is dirty peach clay with lavender/indigo shadow, warm scraped areas, cooler compacted pads and subtle drainage. Fine marks are strongest near the road and the player, fade slowly at first, then disappear quickly beyond the useful sightline. Distant land should stay calm without becoming a featureless peach sheet.

Keep long cinematic sunset shadows, grounded at their sources with softer edges and sensible fading. The owner liked their mood; removing them entirely was the wrong response to detached projections. The evening should move coherently toward dusk/night, with lamps and headlights belonging to the same material world. The existing ten-minute lighting progression lingers in sunset; that timing is an implementation reference, not an inviolable story duration.

Use the enclosed woodland, grounded houses and essential road fixtures to compose the scene. Standalone young trees, grass, shrubs and bushes were removed for phone performance despite art improvements. Keep that decision unless a replacement is demonstrably affordable. Retain material differences: chalky concrete, fibrous plywood, scuffed plastic, smoother compacted clay and loose spoil.

The Mercedes and soundtrack are personal anchors. Preserve the dark W124, North Carolina First in Flight plate **5330-LRD**, and thin warm off-white braided rope. Music is The Lo and Beholds' **Lo and Behold!**, beginning with **Four Mile Scar**, in album order. The owner supplied it because it is what they listened to at the time and is their friend's band.

Music comes from the car's side windows. Near those windows it should sound fairly loud, imperfect and filtered by old speakers/partly open windows. Behind the trunk and farther away, music recedes while skateboard wheels and exhaust take priority. It must not become a globally audible soundtrack. No rider-controlled song selection is requested. Music and outdoor ambience should continue through selection, riding and the end/retry screen, with browser audio-unlock handled gracefully.

Use real recordings for engine, exhaust, car tires, skateboard wheels, scraping, carving, chatter, grinding/sliding where appropriate, braking and collisions. Match wheel sound to board character. Prefer the pavement hum over constant annoying tapping. Falls need the whole event: initial strike, board clatter, body impacts, sliding/tumbling tail and a natural finish. Quiet intermittent cicadas, tree wind and distant neighborhood sounds such as a dog make the setting alive. Remove the unrelated ambient chime bed. Headphones should reveal the scene's space without making every layer loud.

## 10. Priorities for a new developer

1. Establish the recognizable crew, Mercedes, track and sunset atmosphere in a playable mobile slice.
2. Match the feel of tow, carve, braking, rope release and free ride before expanding content.
3. Preserve board/rider differences and coherent surface responses.
4. Rebuild the unresolved wipeouts from supplied references, with a review stage.
5. Integrate spatial car music and recorded physical/environmental sounds as part of gameplay.
6. Validate on a real phone throughout, particularly cold start, first ride, houses coming into view, the cul-de-sac, falls and restart.

Choose the engine, code architecture and asset pipeline that best serve those outcomes. The current implementation is replaceable. Keep source/authoring backups before baking or simplifying, but do not let unseen model detail consume the phone's frame budget.

## 11. What counts as a successful redevelopment?

- The owner recognizes the people, place, car and music as this memory.
- A run feels immediately good on a phone, with responsive input and consistent frame pacing.
- The road and useful hazards read clearly; background detail supports rather than competes.
- Board choices produce meaningful differences, and outcomes have understandable causes.
- Rope release feels like freedom, with a smooth camera transition and usable path/downhill riding.
- Hands and feet belong to the motion; impacts are visible and audible; falls settle believably.
- The audio continues the same outdoor scene across menus and play, and the album stays inside the moving car.
- A developer can explain which details are personal requirements and which are still open decisions.

## 12. Open decisions — do not silently invent answers

The owner has not supplied the new fall reference clips yet. Build133's latest cul-de-sac revision and plate/rope adjustments have no recorded final approval. Additional friend biographies, exact likeness specifications for replacement models, dialogue, missions, scoring/progression and monetization are not defined here. Discuss those before introducing them. Do not treat the absence of a feature as a request to add it.

This brief preserves established direction without claiming a complete biographical record. The included source and playable build provide reference behavior; the owner remains the authority on personal history and whether the experience feels right.

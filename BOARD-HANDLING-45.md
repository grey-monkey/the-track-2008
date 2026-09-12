# Study 45 — four ways to ride

[Play the handling build](https://grey-monkey.github.io/the-track-2008/handling.html?v=45). This separate preview leaves the Study 44 hazard build available at painted.html.

The four profiles use the user's exact 17 normalized starting values, published in [board-profiles-45.js](./board-profiles-45.js). There is no overall quality score or board-specific physics branch. The profile table and shared dimensional tuning feed the same steering, traction, coast, wobble, surface and landing functions.

## What changes

- Luxury Longboard: slow-loading, damped carves; strongest momentum and pavement isolation; no ollie.
- Hand-Me-Down Pintail: deliberate, progressive slide at speed under strong steering. Yaw remains controllable, speed scrubs and easing the input restores traction. Slide friction has its own audible scrub. No ollie.
- Bowl Cruiser: greatest carving authority, quick transitions and a moderate hop; most forgiving imperfect landing.
- Element Street Deck: quickest response and highest ollie, with much greater surface disturbance and progressively stronger speed wobble.

Steering response filters input; rotational inertia governs yaw acceleration and rate limits; damping settles unwanted yaw. Grip and breakaway are separate. A slide is a continuous 0–1 state, not an automatic crash. Crouch reduces each board's remaining instability, so it preserves the stability hierarchy. Smooth time-based oscillators replace any need for per-frame noise.

Existing manhole and seam contacts feed compliance-scaled impulses that consider speed, carve, slide, crouch and existing instability; manhole approach angle also affects the impulse. All grate catches and roadside collision rules remain active throughout the map. A soft-wheel thump remains audible even when the physical kick is small.

Both longboards always reject ollies. Cruiser/Element ollies are available to all riders through the existing crouch/release control; the old DOG-specific ollie prohibition is superseded by the board-based rule. Other rider multipliers, driving speed, rope mechanics and controls are retained. No new controls or play-screen HUD.

Landing evaluation considers heading relative to travel, speed, yaw rate, lean, board tilt and impact speed. It disturbs a poor landing progressively; only a sufficiently bad landing forces a fall. This is a game handling model, not a rigid-body skateboard simulator.

## Comparison results

Same flat test course, input and initial speed; figures describe the deterministic tests, not a claim about human perception.

| Board | Time to 0.1 rad heading response | Flat ollie peak | Relative seam impulse at 7 m/s |
|---|---:|---:|---:|
| Luxury | 0.350 s | Disabled | 0.05 |
| Pintail | 0.242 s | Disabled | 0.27 |
| Cruiser | 0.125 s | 0.372 m | 0.36 |
| Element | 0.100 s | 0.775 m | 0.72 |

In the shared hard-carve/coast test starting at 9 m/s, the pintail reaches an approximately 86-degree sideways angle, then restores traction after steering is eased. It scrubs more speed than the other three. In a tow, the rope can continue supplying energy; sliding does not impose a speed cap or stop the car.

## Validation

- 13 handling acceptance checks: response order, carve authority, coasting order, no ordinary spontaneous sliding, controlled slide/recovery/speed scrub, continuous wobble and crouch hierarchy, compliance order, ollies, landing forgiveness, disturbance recovery and dissipative contact.
- 13 core regression checks, including complete laps for all 48 rider/board/rope combinations, release/regroup, controls and identical results at 30/60/120 display rates. The test driver anticipates relative motion by 0.35 seconds and damps its steering corrections to account for the newly introduced inertia; this assistance exists only in the tests.
- 14 hazard regression checks, including all four boards captured by grates, preserved rider momentum, airborne clearance, bumps, solid impacts and post-crash collisions.
- Browser inspection of the actual tow scene, pintail slide and Element ollie; no browser errors in the comparison scene.

The 3–5 second recognition goal, enjoyment, extreme-speed difficulty and phone performance still need human playtesting. Profiles are deliberately asymmetric starting values, not claimed final balance. Existing art/assets and their credits remain in the game.

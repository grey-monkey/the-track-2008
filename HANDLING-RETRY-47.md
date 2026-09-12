# Study 47 — Build 44 handling restored

This replaces the Study 45 physics experiment with the Study 44 steering and momentum model. The performance work from Study 46 remains: separate content-hashed models/textures/code, conservative exact-contact pruning, contact allocation reuse, unchanged-pose caching and opt-in phone reports.

What is restored
- The original momentum-following steering target, steering authority values and 1.3 rad/s yaw ceiling.
- Original lateral-force equation, braking assistance, gravity, unilateral rope spring, collision impulses and fall behavior.
- Original sound behavior. Removed the Study 45 steering/inertia solver, yaw oscillators, sideways heading targets, traction replacement, speed-preserving carve assistance and landing-failure system from the active game.

Small personality adjustments only
- Luxury: identical ordinary-riding trajectory to 44; smaller pavement kicks; no ollie.
- Pintail: original longboard steering; slightly more rolling loss and high-speed load. A sustained, near-full-input, overloaded carve above 6.5 m/s can smoothly reduce traction by at most about 17%. No extra sideways yaw or powered rotation. Easing input restores grip. No ollie.
- Cruiser: original carve authority; 4% quicker heading response within the original yaw ceiling, quick recovery and approximately 23 cm hop.
- Element: original carve authority; 8% quicker heading response within the original yaw ceiling, stronger pavement feedback and approximately 37 cm ollie.
- Tuning is centralized in board-personalities.js in the source workspace. The old 17-parameter replacement model is not used by this build.

Curb correction
The old road-edge crash check was skipped whenever the detailed hazard registry was attached. It now remains active with that registry: fast curb strikes cause falls, while the small seam and slow crossings still produce feedback. Existing grate catches and post/hydrant/cabinet collisions remain active throughout the map.

Validation
- Direct comparison to a preserved copy of 44: Luxury ordinary riding matches position, velocity, heading, wobble and rope tension exactly over 30 seconds.
- Same 15-second normal-carving input: other boards stay within 3.5 degrees of the 44 heading; no slide-assist activation. Original yaw ceiling retained.
- Every board crashes before completing an on-road full circle under sustained bad steering.
- All four boards crash on fast strikes across a real map curb with detailed hazards attached.
- Slide intent gates, grip recovery, bump hierarchy and hop heights verified.
- 16 dedicated regression/personality tests, 14 hazard tests, and 13 general physics/input tests pass. The latter includes 48 rider/board/rope combinations completing an actively steered lap.
- Browser study: same section at 8 m/s; ordinary Luxury weave remained riding without slide assist. Deliberate pintail carve engaged a short, recoverable slide while remaining attached and riding.

This remains a playtest. Automated comparisons establish that the former physics model and its limits are back; the feel should be judged against 44 on the phone. Study 44, rejected Study 45, and the earlier performance preview remain available for comparison. Use handling-retry.html for this combined build, optionally with ?profile=1 for a device-local performance report.

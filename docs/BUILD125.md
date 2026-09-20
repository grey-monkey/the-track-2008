# Build125 — ramp balance, sustained pull and braking

Authoritative source: `outputs/painted-prototype/motion125`. Build124's playable motion is the accepted baseline. Head/shoulder turn-following remains excluded.

## What changed

- Ramp: shallow preparation on the plywood releases toward the lip, followed by a restrained flight gather, balancing trailing arm, and preparation for the existing landing compression. Actual departure and vertical motion drive timing. Ramp flight now uses ankle-locked leg compression instead of the older loose-foot airborne pose. There is no extra physical jump impulse.
- Sustained pull: filtered actual rope tension and car acceleration settle hips and torso into the load. The free shoulder, elbow and wrist accompany that shift. The initial yank retains priority.
- Braking: actual car deceleration plus rope slack relax the towing posture and bring the body back over the board. Release, air and crashes suppress sustained towing layers.
- Blending: slides, traction recovery and impacts have priority; poses share a bounded displacement budget. Flight opens into landing without a one-frame straight-legged reset.
- Both hands: the trailing wrist follows the bent forearm and shoulder rather than waving independently. Rope-hand shoulder/elbow/grip metadata receives the same deformation as visible geometry, then the existing tracking solver keeps it facing the hitch. No new head-turn behavior.
- Startup: temporary normal generation no longer clones all existing morph targets for every new pose. Selected riding meshes are prepared while loading; previously the selection stage hid them during compilation. Scene updates pause while preparing a changed selection to prevent concurrent material disposal during asynchronous compilation.

## Preservation and checks

All approved rider meshes, faces, clothing, graphics and textures are retained. The original Blender rig authors only three additional deformation fields. Existing seven fields and transfer bindings are unchanged. Maximum authored ankle displacement is 0.000000182 m; rendered sole vertices remain fixed in these added deformations.

`node work/playtest125/check.mjs` verifies identical old/new rider and car trajectories on all four boards, including ramp launch and landing, plus original slide/patch responses, field preservation, phase suppression and trick ownership. Sampling costs about 0.3 microseconds on desktop Node; this is not a frame-rate measurement.

The comparison uses identical recorded 120 Hz gameplay states. Its isolated recordings omit unrelated scenery collisions, clearly distinguished from the actual playable checks. The contact sheet renders actual runtime meshes. Inspected Sally, Dog and Boss in goofy stance, plus Black and Boss in regular/crouched views. Reviewed ramp, flight, landing, sustained pull, braking, yank and slide/catch silhouettes. The existing carve and impact fields remain identical. These are representative visual checks, not proof that every possible combined gesture is intersection-free.

## Android test

Connected Samsung A17 / SM-A176U1, Mali-G68, Chrome153. CSS viewport 384×692, rendering buffer 576×1038, same reference settings for comparisons.

Actual phone scenario captures in this folder show:
- Ramp lands without wrecking, 78% absorption at 1.14 s.
- Sustained pull reaches TOW_LOAD at 5.53 s.
- Braking reaches BRAKING_SETTLE at 1.80 s.
- Slide recovers into GRIP_CATCH at 1.47 s.
- Patch departure produces PATCH_EXIT at 1.03 s.
- No lost graphics context in these checks.

The initial timing sample was invalid: it retained only one frame with a 25-second interval during first-use preparation; Chrome also left the foreground during subsequent reload testing. It must not be described as steady-state performance. One completed 10-second Build125 run recorded 301 draw samples: median frame interval 32.5 ms (approximately 31 fps), 95th percentile 64 ms, longest 127 ms. Median CPU draw submission was 13.6 ms, 95th percentile 41.3 ms. No graphics-context loss or reported audio errors occurred. This is playable but still has slower frames; it is not a locked 60 fps result. Initial preparation took 57.6 seconds over the local wireless test connection.

A Build124 comparison recorded median 108.1 ms and 95th percentile 386 ms intervals, but repeat Build125 reload/debugging checks timed out. Multiple test tabs and foreground changes complicate that comparison. No reliable speedup claim is made from this pair. Full-route endurance, repeated cold starts, and iPhone/Safari/PWA testing remain outstanding.

## Review and packaging

`response125-study/` is the Before/After comparison, with replay and an optional hand contact sheet. `playtest125/playtest125.html` is the normal playable build. Diagnostic buttons only appear with explicit review query parameters.

Three extra morph targets add 72 bytes per rider vertex in CPU position/normal arrays, plus implementation-dependent GPU storage; no new models, materials or draw calls. Bundle size and handset timing results are recorded separately. Sources and authoring checks accompany the release documentation; the local editable project remains authoritative.

Release package: 83,939,413 bytes, 23,758 bytes larger than Build124. All 73 packaged model, image, music, sound and CSS assets compared byte-identically.

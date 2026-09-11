# Design and research record

## User decisions, September 10, 2026

- Follow gentle bends naturally without input; the player steers for deliberate carving and recovery.
- Normally rideable speeds. SALLY drives faster; DOG sometimes speeds up on straights.
- A safe release preserves the coast, then the crew regroups for another tow.
- Keep riding across laps until a wipeout. Every new run starts at the line.
- Enter the southwest cul-de-sac from the western straight, turn clockwise once, exit toward the lower connector.
- Primary Android tester: Samsung A17. A newer iPhone will be tested remotely; its model is not yet known.

## Engineering choices

The world uses metres. The aerial scale bar yields an estimated 804 m driven lap, 7.3 m road width and 29 m open bulb diameter. These are screenshot-based estimates; the earlier handoff's unconfirmed 150 ft bulb diameter is not used. The supplied current aerial defines road shape, while the 2008 environment excludes its modern houses and landscaped island. A separate route-review image compares the reconstruction to the reference.

Road membership is the union of a road ribbon, a flared bulb throat and an open disk. It never depends on the nearest point of the car's driving route. Car corners are tested against this surface. The car takes a tangent-continuous path through the bulb and previews curvature for braking. Forward planning uses a lateral-acceleration speed bound and braking-distance envelope; this is a deliberately simplified version of curvature-aware planning, not an autonomous-driving system. [Carnegie Mellon motion-planning research](https://www.ri.cmu.edu/pub_files/pub4/urmson_christopher_2006_1/urmson_christopher_2006_1.pdf).

The rider has independent velocity. A unilateral implicit spring/damper pulls only when the rope becomes taut. There is no forward rider motor, positional recentering, tow-cone force or road-attraction force. The spring formulation is informed by [Erin Catto's Soft Constraints](https://box2d.org/files/ErinCatto_SoftConstraints_GDC2011.pdf); this code does not embed Box2D or claim to simulate real skateboard biomechanics.

Directional wheel grip and board heading determine carving. Neutral steering gently aligns the rider with the pull. Dissipative speed assistance checks the rider's speed when the rope slackens under braking. On release, initial momentum and heading are unchanged. After a short free coast, gentle automatic braking eases the rider toward a stop; the driver stays ahead while stopping. These are intentional playability assists, not a strict physical recreation. Poor or late releases can still crash.

A 120 Hz fixed simulation step decouples the physics from rendering. Accumulated simulation time is paused on backgrounding; long frame stalls are bounded rather than causing a giant simulation jump. This follows the principles in [Fix Your Timestep](https://gafferongames.com/post/fix_your_timestep/).

The camera follows the rider with independently damped orientation and translation. A small lateral offset reveals the rope; it does not snap to rider velocity. The 3D presentation uses [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html), capped rendering resolution and instanced vegetation to limit phone rendering cost. Real-device performance is still unmeasured.

## Mobile interaction and offline design

Pointer capture, a single active pointer, cancellation handling, and `touch-action: none` on the play canvas prevent ordinary browser scrolling from consuming the ride gesture. Crouch/lift and a fast upward release are separate gesture states. These follow [MDN Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events).

Audio is unlocked by the start button. Backgrounding pauses the ride and silences the sound. Safe-area offsets keep the toolbar and setup controls away from system areas. The PWA uses relative URLs and bundles all runtime assets. Its service worker precaches the game and uses network-first responses with offline fallbacks, following [MDN Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers). Hosted authentication and actual iPhone Home Screen behavior still need device testing.

## Deferred refinements

Rider silhouettes and clothing need a visual pass. Manholes and central debris are currently visual cues, not full obstacle mechanics. Crashes preserve independent board/body motion but use simple animation. The prototype has no rare wheel-hook event, board tangles, reward system, police events or copyrighted soundtrack. No claim is made that subjective tow feel or fun is solved until Grey plays it.

# Study 52 — rendering smoothness comparison

Entry: smoothness.html?profile=1&quality=balanced.

Build51 contact optimization and approved handling/car collisions are retained. Mobile balanced defaults to DPR cap1.25 (previous1.5) and5 paint-filter texture samples (previous9). Scene colors/models/shadow pass stay intact. At DPR>=1.5 this lowers scene pixel count by30.6%; total GPU speedup must be measured on the phone. DesktopDPR1 does not exercise this resolution reduction.

Rendering presets: quality=reference uses1.5/9samples; resolution uses1.25/9; paint uses1.5/5; balanced uses1.25/5. No automatic quality oscillation. Power hint stays low-power unless power=default explicitly requested. Desktop ordinary default reference, mobile ordinary default balanced. Use explicit quality for reproducible tests.

Settled board poses reuse exact support across unchanged ended-state transforms/surface revisions. Active movement/tumbles still calculate contact normally.100 tests across4boards verify exact support and invalidation after movement, rotation and surface revision; original720pose comparison stays exact. Car11/hazard14/recorder retention tests pass. GPU timer fake-device checks cover asynchronous availability, disjoint rejection and unsupported fallback.

Recorder adds bounded frame-stall events with location/speed/drawcounts, render submission CPU (already included in drawCpu), actual drawing buffer dimensions, graphics preset and bounded Long Animation Frame entries. Optional WebGL2 GPU timing polls results asynchronously every12frames with max3pending; invalid/disjoint samples are discarded. GPU intervals can include idle gaps, and do not measure final presentation. No automatic uploads. Filename includes build and preset.

Startup records module readiness, scene construction, preview preparation and first preview timestamp. Shaders are prepared with compileAsync where supported; first preview also initializes shadow/finish resources. This does not guarantee elimination of every future shader/texture stall or faster loading. It can move work earlier; measured startup stages make that visible.

Optional replay=1 automatically rides SALLY/LONGBOARD, rope0.26,pace1.2,seed52 from the entrance, steering a fixed function of simulation time and ending after its crash. It is a diagnostic ride, not an AI course-completion test. Compare same replay with reference and balanced; keep device refresh setting unchanged. Free-play links omit replay. Replay input is sampled at fixed physics ticks. Existing default controls and physics are unchanged outside replay.

Local browser balanced replay finished without game error; painting and board/rider tumble visible. Desktop measurements are not a phone FPS claim. Requested next step: A17 at90Hz, same conditions as previous reports, reference/balanced exports and subjective smoothness feedback.

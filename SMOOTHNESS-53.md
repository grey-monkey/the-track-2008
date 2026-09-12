# Build 53 — exact map query acceleration

Entry: smoothness53.html?profile=1&quality=reference. Append &replay=1 for the same SALLY/LONGBOARD/rope0.26/pace1.2/seed52 automatic diagnostic used in Build52.

Changes: static map polylines now use a bounding-volume hierarchy for exact nearest-segment and polygon queries. No road/terrain resampling. 174,325 comparisons against Build52 height/distance functions have maximum difference 1.14e-13 metres. Desktop terrain-query batch: 616ms before, 91ms after; not a phone FPS measurement.

Shadow preparation updates only car/rider/board world transforms instead of forcibly traversing all scenery. 300 animated nested actor-transform comparisons match full-scene results exactly. The normal renderer still updates the scene normally. Model geometry, painting, lights, hazards, rope, controls and handling are unchanged. Reference graphics is now the default on mobile too: Build52 phone runs did not establish a benefit from reducing resolution/paint samples.

An experimental finer board-support bound was rejected after its real-map slow-case timings worsened. Final board-contact code is byte-identical to Build52, retaining its exact settled-state cache. Local contact diagnostic checks 640 poses and 11,025 surface queries. Existing car11, hazard14, handling15 and static100 checks pass. Optional GPU diagnostics continue to report unavailable on the A17 browser rather than invent timings.

Local packaged replay and crash completed with matching art direction. Initial local scene construction about3.1seconds versus about11seconds previously, but these are uncontrolled desktop observations. Final phone timing and subjective smoothness remain to be measured. Run the reference-quality replay and export once, then free-play to assess motion. No automated upload.

Research: Three.js optimization guidance https://threejs.org/manual/en/optimize-lots-of-objects.html and Chrome long-frame attribution https://developer.chrome.com/docs/web-platform/long-animation-frames . Measurements favored exact CPU query acceleration and narrower actor updates before asset/quality reductions.

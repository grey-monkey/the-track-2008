# Build 131 — fuller falls and mobile performance

Local review candidate, 21 September 2026. Build 130 remains the live release.

## Review

- Play: http://127.0.0.1:4197/playtest131/playtest131.html?v=131
- Before/after: http://127.0.0.1:4197/falls131-study/
- Editable Build 130 backup: `build130-editable.zip` in this directory. Original character and baked-pose authoring assets remain available. Nothing was destructively flattened over the source assets.

## Changes

Three fall families now respond to the cause and severity of the crash: a sideways grip-loss slide, a forward shoulder tumble, and a more uncontrolled hard-impact tumble. The severe fall uses asymmetric pose changes, two rotations, and a longer recovery into the final resting pose. Speed and impact determine severity; a slow slip does not trigger the severe fall.

Road slides retain momentum longer. In the 11 m/s comparison, body travel increased from 12.16 m to 16.98 m. Dirt still slows the rider more strongly. All 18 simulated momentum/end-state cases finish. Additional recorded body/board contacts accompany the extended fall.

Complete rider poses are baked into compact binary assets rather than rebuilding all portrait morphs during startup. Only the selected riding character keeps decoded geometry. Obsolete character meshes/textures were removed from the startup dependency chain, and the selection screen no longer builds a duplicate set of people before replacing them.

Crash-ground contact uses conservative spatial bounds before checking the remaining vertices exactly. Pavement contact data uses packed arrays instead of many small objects. Terrain bounds clip the actual triangles to the contact footprint, with a fast path for footprints entirely inside one triangle. These preserve the surface height results rather than simplifying the rideable shape.

Phones now use the intended mobile rendering budget by default (pixel ratio capped at 1 instead of 1.5). The approved palette, long shadows, street layout, controls, divot response and normal riding physics are retained.

## Actual phone results

Samsung SM-A176U1, Chrome, wireless debugging. Local files served over the existing reverse connection. These are repeated diagnostic captures, not a laboratory benchmark: caching and thermal throttling varied. An intermediate memory-heavy candidate crashed its tab; it was replaced before the final measurements below. Do not present every intermediate measurement as the final build.

| Measurement | Build 130 capture | Final Build 131 capture |
|---|---:|---:|
| Time until ready | 44.7 s | 25.4 s |
| Riding frame interval, median | 77.7 ms | 22.2 ms |
| Riding frame interval, 95th percentile | 155.6 ms | 44.5 ms |
| Fall frame interval, median | 89.0 ms | 22.2 ms |
| Fall frame interval, 95th percentile | 288.9 ms | 33.3 ms |
| Fall body-contact CPU, 95th percentile | 87.0 ms | 1.8 ms |

The final replay completed its ride, fall and end screen without WebGL context loss or a browser crash. It recorded 457 riding frames and 342 fall frames. The slowest riding frame was still 211 ms. An earlier warm-device capture of this candidate was materially slower (44 ms median riding interval), so stable 45 or 60 FPS is **not** established. GPU timing was unavailable. A subsequent ordinary-page reload reached the selection screen successfully in 38.6 seconds, confirming that startup still varies substantially; the phone was left there for user review.

A separate 40-second controlled house-approach sweep covered the houses coming into view and the intersection turn: 2,214 rendered samples, median draw CPU 12.0 ms, 95th percentile 20.2 ms; median frame interval 18.8 ms, 95th percentile 31.1 ms. No context loss. This was a rendering sweep with physics paused, not a substitute for a full manual lap.

The CPU profile still identifies surface queries, scene matrix traversal and renderer/program/uniform submission as meaningful costs. Audio was not the dominant sampled CPU cost. Memory remains substantial; this is an improvement, not a claim that the game is finished optimizing.

## Verification

- 1,000 normal riding steps per board match Build 130 exactly across all four boards.
- Planted divot flight retained across all four boards.
- 40 fall configurations have finite, bounded pose weights and clean settling.
- 288 exact crash-contact oracle comparisons across riders, stances and uneven surfaces: zero discrepancy; approximately 77.5% fewer vertex evaluations.
- 47,142 pavement height queries match the original implementation.
- 2,000 triangle-bound tests / 13,435 interior samples preserve conservative contact bounds.
- 979,602 baked-data checks; maximum sampled base-position quantization error 0.00002432 m.
- Desktop selection switches through Sally, Black, Boss and Dog complete without console errors. Black's trick-review mode still renders correctly. The fall comparison exposes all riders, stances, speeds and three fall families.

## Next priorities

1. Longer manual phone laps and repeated-run soak testing, especially when warm. Keep the present live release until the candidate is approved.
2. Reduce repeated terrain/boundary queries with exact, bounded caching only after measuring reuse; do not round rider coordinates or compromise curb contact.
3. Reduce scene traversal and material submissions for truly static scenery while preserving sunset/night lighting. Inspect lamp/house draw groups before changing their geometry further.
4. Reduce decoded/GPU morph residency further and load unselected riders on demand. Current binary baking cuts rebuild cost but does not eliminate the asset memory footprint.

Raw evidence: `phone-130-reference.json`, `phone-131-mobile-final.json`, `phone-houses-131.json`, `phone-final.cpuprofile`, and the `*-check.json` / `check-results.json` files in this directory.

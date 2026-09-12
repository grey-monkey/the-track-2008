# Entrance asset study - 11 September 2026

Preview: http://127.0.0.1:4197/environment-study.html?v=4
Ride-through: http://127.0.0.1:4197/environment-game.html?v=4

## Selection

| Asset | Source | Assessment |
| --- | --- | --- |
| Fire hydrant | https://polyhaven.com/a/fire_hydrant | Strong close-up geometry: caps, bolts, flange and chain. Kept for trial; subdued red under existing sunset treatment. |
| Water manhole cover | https://polyhaven.com/a/water_manhole_cover | Strong readable cast relief and separate rim. Fits road detail role; terrain-aligned, with recessed backing. |
| Utility cabinet | https://polyhaven.com/a/utility_box_02 | Convincing door, enclosure and weathering. Appropriate visual service prop; exact local utility type is not verified. |
| Brown brick 02 | https://polyhaven.com/a/brown_brick_02 | Surface trial only; applied subtly to existing mapped house shells. Not a replacement architectural model. |
| Rough concrete | https://polyhaven.com/a/rough_concrete | Surface variation on fitted curb, gutter and cabinet base. |

Poly Haven assets are CC0: https://polyhaven.com/license
Creators: fire hydrant - Goncalo Felicio; water cover - Raunox; utility cabinet - James Ray Cock. Original source files and API metadata are retained under work/environment29.

Clean asphalt was downloaded for evaluation but is not applied in this trial.

## Fit and conversion

Imported assets converted from GLTF through Blender. Baked transforms, normalized ground origin, converted Z-up to Y-up, retained UVs and 1K diffuse maps, reduced geometry to 13,237 triangles across all three props. Existing painterly shading and atmosphere unify them with the car and rider. Hydrant approximately 0.90 m tall, cover approximately 0.69 m diameter, cabinet approximately 1.12 m tall before plinth.

Props follow existing entrance road samples and house frontage, rather than arbitrary world positions. Utility cabinet is behind the curb, hydrant on the verge, manhole within pavement, drain along the gutter. This is plausible placement, not a surveyed utility reconstruction.

Curbs, gutter and drain frame/bars are fitted custom geometry. The drain is a visual prototype, not an imported certified street fixture. Existing house footprints, gate geometry and dirt materials remain. Trial geometric soil clumps were rejected after visual inspection.

## Rejected architecture candidates

BlendSwap Suburban Street (12669): missing textures.
BlendSwap Suburban House (13420): missing rear geometry and externally sourced textures not included. Neither is a suitable complete replacement for this memory's house set.

## Validation and limits

Standalone bundles built successfully. Browser inspected overview, hydrant, manhole, drain, cabinet and running ride-through. Fixed manhole pavement intersection, gutter segment placement and drain backing visibility. Browser error logs empty on ride start.

This is a separate local environment test. Main Study 28 is not overwritten. Hazards do not yet cause crashes, shocks or body collisions. House shapes remain provisional. No claim of phone performance benchmarking; asset triangle count reduced, but actual mobile profiling remains necessary before expanding the set.

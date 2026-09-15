# Build112 — raised curbs, plan-view radii, grounded houses

Based on the published stripped-down Build111. Keep its no-fluff scenery scope, gameplay, audio and character assets.

- Rolled curb toe raised from 4 mm to 25 mm above its road reference; crown from 154 mm to 175 mm. Shared profile drives geometry, joints and contact. No broad handling changes.
- Rounded nine abrupt cul-de-sac/throat outline corners with tangent circular arcs (radii limited by neighboring segments, up to 3.048 m). Removed sub-centimetre outline spikes through conservative simplification inside the two junction regions. Existing broad entrance radii retained. Asphalt and curb outlines are generated together; the route centerline is unchanged. Total changed pavement footprint about 1.51 square metres across both regions.
- Continuous concrete foundations under each house's main mass, garage, front bay and porch. Bases extend at least 19 cm below the sampled rendered ground. House positions, floors and architectural proportions are unchanged.
- Exact attribute indexing on house and streetlight meshes shares duplicate vertices, preserving every triangle, normal, UV and material. Saves 3,512,082 bytes (about 3.35 MiB) of geometry buffers. This is a memory reduction, not a measured FPS claim.

Source overrides are in finishes112; inherited source remains transitions111 and its prior routing. Package with work/playtest112/package.cjs. Offline plan generator: work/playtest112/round-plan.py, with Shapely as a development-only dependency. No new runtime dependencies. Rebuild contact before late geometry indexing.

## Verification

23,102 curb triangle-centroid samples overlapping pavement: none buried; minimum clearance 18.7 mm. Twelve foundation footprints sampled against the rendered terrain: none floating. Eight entrance/board crossings and all four ramp launches passed. No additional crash shader programs (245 before and after crash). Sunset, nighttime and overhead images inspected.

The phone was no longer connected for this pass. Build112 has desktop functional/visual validation; no fresh Android FPS or iPhone/PWA claim. Prior Build111 phone report remains useful context, not a measurement of this revision.

# Build 111 — rounded pavement and performance review

Build110 is the implementation baseline; Build108 was the last published release before this work. Packaging: `work/playtest111/package.cjs` from the workspace root. Only this packager's manifest belongs in the release, not the entire output directory.

- Includes Build109's reduced repeating wheel chatter/seam tapping and paved-surface rideability. Asphalt, poured curbs and the footpath are rideable; landing on dirt still crashes. Solid obstacles, drains and car collisions remain active.
- Includes Build110's tucked ramp support and three-inch plywood departure lip. The slightly steeper visible plank and launch surface use the same RAMP definition. The upright approach block stays put.
- `curb-profile.js` supplies one tangent circular rolled profile to entry, circuit, junction and bulb curbs. The asphalt-facing toe is nearly flush. Existing longitudinal contraction/isolation joints remain.
- `path-returns.js` adds 3.048 m (10 ft) circular returns at both footpath mouths, then curves into the original path. Superseded path ends are clipped at their joins. The rendered connector triangles also supply contact and rideability.
- `finishPavement()` shares curb vertices and smooths their normals only AFTER all existing triangle-list contact indices are built. Do not move it earlier: the contact builders expect non-indexed triangles. It saves 3,054,096 bytes of curb position/normal/index buffers.
- `crash-limbs.js` precompiles crash materials against the actual scene's lighting, closing the first-crash shader variant gap. The authored crash motion and exact body-ground support are unchanged. A pose-cache experiment did not demonstrate a reliable gain and was removed.

`illustration.js` skips unused neighbor sampling when the approved finish blend is zero; an independent rendered test matched pixels in both modes.

The approved artwork, foliage-free environment, car, character likenesses, audio assets and handling tuning are preserved. Tests and measurements are under `work/playtest111`; see PERFORMANCE_REVIEW.md for limits and phone follow-up.

## Final scenery scope requested by Grey

The active `environment-view.js` omits off-road spoil-pile creation. The entry calls `ground.js` directly, retaining the approved terrain distance fade and cabinet-footing correction, without installing site98 props or neighborhood additions. No loose cabinet-front/spare blocks, extra pile supports, or their shadow casters are built. All standalone foliage stays excluded. Houses, sky/perimeter woods, terrain, utilities, road obstacles and both ramp-area blocks remain. The eight CINDER_BLOCK collision strips belong to the two hollow ramp blocks; they are not eight loose objects.

The clean package is 77 files, 83,154,861 bytes. Actual Galaxy A17 tests completed; results and limitations are in PERFORMANCE_REVIEW.md.

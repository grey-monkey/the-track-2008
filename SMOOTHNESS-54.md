# Build 54 — steady display motion and lighter boards

This is a phone-test preview at `smoothness54.html?profile=1&quality=reference`. Earlier builds remain available.

## Changes

- Render car, rider, board and rope from one interpolated snapshot between completed 120 Hz physics steps. Balance reads the physics-step turning rate. The display delay is one physics step (8.33 ms); the live simulation, inputs, collision response and sound retain their original timing.
- Reset visual history at new rides and phase transitions. Preserve prototype methods needed by acceleration exhaust effects.
- Simplify the approved board assets offline in Blender, retaining their materials, graphics, wheel locations and characteristic deck shapes. The original animated skater's skateboard was inspected as a construction reference: 5,892 triangles, including deck, two trucks, four wheels and simple bearing faces. Its geometry was not substituted into the game.
- Apply the same role-based detail budgets and geometric-error checks to all four current boards. Luxury: 20,058 to 8,805 triangles; pintail: 11,070 to 5,248; cruiser: 12,424 to 5,670; Element: 8,594 to 5,936. Retain the Element artwork/deck data. Source-vertex distance to the simplified surface stayed under 0.2 mm for changed decks, under 0.8 mm for wheels, and under 1.3 mm for hardware. These are geometric sample measurements, not a proof of a global surface-distance bound.
- Retain actual simplified-mesh board support, including top, underside, edges and four wheels. Tilted conservative bounds reject impossible candidates on slopes; near raised fixtures the existing bound path remains in use, because the extra plane calculation did not improve that benchmark.
- Weld only identical base-position AND morph trajectories for falling-rider support, and prepare local surface candidates once. The full deformed silhouette remains supported.

## Validation

- Constant-speed/turn display tests at 30/45/60/90/120 Hz, crash/reset and angle-wrap checks.
- 3,600 fixed physics steps match a separately advanced live simulation exactly; sampling does not mutate simulation state.
- 1,440 four-board contact poses across the full constructed road/curb/terrain map: exact agreement between the optimized and prior solver for the new geometry. 640 additional raised-cover poses agree exactly.
- 1,018,395 falling-body vertex clearances, 63 poses: identical support and at least 6 mm clearance before added bounce.
- Car collision and hazard regression checks pass. Exact settled-board caching checks pass.
- Browser comparison of all four boards, including cruiser side profile and Element underside. Packaged ride/crash replay completed.

Desktop measurements do not establish phone smoothness. GPU time was unavailable in the supplied phone report. The recording workload and manual route differed from the earlier automatic test, so those reports are not treated as a controlled regression measurement.

## Phone check

Play a normal ride with the same board, rider, rope and pace used for Build 53. Check steady-road foot/board movement, carving, curb contact and a crash. Save the performance report after stopping. Prefer the first timing run without screen recording; record a separate short clip only if jitter remains.

The fixed-input comparison is available by adding `&replay=1`.

## Reference

Fixed-step rendering/interpolation: https://gafferongames.com/post/fix_your_timestep/
Existing board asset authors and licenses remain credited in the game's How to ride panel and earlier board release notes. These are adaptations of the same approved assets.

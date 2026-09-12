# Study 41 — crash performance and house facades

Rider and board contact now use the spatially indexed rendered terrain, pavement and curb surfaces instead of repeatedly evaluating the road-distance terrain formula. The full 16,165-vertex rider support calculation and tumble poses are retained.

Desktop comparison at the same off-road crash location: median contact calculation 75.9 ms before, 4.62 ms after (16.4 times faster); p95 150.9 ms before, 7.16 ms after. These are CPU contact timings, not whole-game or phone frame rates. 872,910 vertex checks across 54 location/pose combinations retained at least 6 mm clearance.

The original three house footprints are retained. New imported facade components, recessed openings, garage panels, brick lower walls, siding upper walls/gables, roof courses, gutters and downpipes improve their construction. Gable faces and one dormer are corrected to clear the roof. Distance atmosphere and the established color treatment remain shared with the scene.

Facade geometry adapted from **Garage Suburban Classic Textured** by **miguelromeroh**, https://blendswap.com/blend/20447, under **CC BY 4.0** (https://creativecommons.org/licenses/by/4.0/). Changes: extracted window/door/garage components, normalized dimensions, reduced bevels, replacement materials and composition. Bundled third-party textures are not used. The CC0 Family House Collection by tastyfish was inspected but not included.

Phone crash performance and house appearance should be compared with Study 40 in a physical-device ride-through. No new hazard behavior or driving rules were added.

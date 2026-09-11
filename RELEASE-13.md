# Study 13 — construction soil and wild planting

This pass removes the three flat lawn rectangles and adds wild planting around the center hill/walking path and entrance. The original illustration remains the color and mood reference.

## Firewatch research applied

In [Jane Ng's interview](https://mcvuk.com/development-news/the-art-and-soul-of-visual-design/), she describes prioritizing shapes and colors, limiting visual noise, and making custom foliage and shaders to suit the art direction. I also inspected [this official Firewatch screenshot](https://www.firewatchgame.com/screenshots/firewatch-e3-2.jpg): dense tufts, branching shrubs, bare-ground gaps and warm/cool plant groupings informed this pass. Those observations are the basis for our adaptation; this is not a reproduction of Firewatch's proprietary foliage system or assets.

## Changes

- Removed rectangular green foundation lawn patches. Driveways, houses, path and road geometry retain their placement.
- Added 2,200 tapered grass tufts and 367 broadleaf brush clumps, in irregular patches around the walking hill and gate area. Colors group into muted living greens and dry straw/ochre. A small shader-driven breeze moves the upper foliage while keeping the roots planted.
- Grass centers stay more than 4.1 m beyond the road edge and 1.8 m from the walking-path centerline; planting also excludes house footprints. These are placement clearances, not new gameplay collisions.
- Added seven near-gate woodland stands using existing painted tree artwork. The nearest groups have multiple intersecting views, combined into one mesh per stand, with bottom vertices following terrain. This corrects the first draft's thin side-on appearance.
- Clay shading gains light dusty deposits, darker soil and selective grading marks. Earth treatment is separated from pavement and curb materials.
- Existing sky, colored distance, soft actor shadows, sound, riders, car and tow mechanics carry forward.

## Checks

Inspected entrance, walking-path and hill views, including portrait rendering. The final standalone build entered play with no browser errors. Desktop preview frame intervals: median 7.0 ms / p95 8.5 ms over 180 samples; full frame 108 draws and 563,821 triangles. Vegetation is instanced to limit draw calls; physical Samsung A17/iPhone performance still needs user review. Final file size: 23,560,600 bytes, no new external asset fetches.

The first thin grass draft was refined into fuller clumps after the user's Firewatch note. The development-only planting review page is not included in the public game.

[Play Study 13](https://grey-monkey.github.io/the-track-2008/painted.html?v=13)

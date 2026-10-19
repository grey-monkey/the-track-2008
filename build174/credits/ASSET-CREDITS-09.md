# Painted Entrance 09 — asset provenance

## Mercedes-Benz W124 sedan

Source: [3D model Mercedes-Benz W124](https://blendswap.com/blend/11083), by **w124zbyszek**. Included license: [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/).

Changes from the original include mesh simplification, painted black/charcoal materials, sky reflections, segmented rear lamps, dimension correction, independent wheel assemblies, opened front windows, partially lowered rear panes, open sunroof, and a simple interior. The adapted car geometry and car-specific material treatment remain CC BY-NC-SA 3.0. This is a personal noncommercial game.

Study 09 uses 4.740 m length, 1.740 m body width excluding mirrors, 1.428 m roof height, 2.800 m wheelbase, 1.501/1.491 m front/rear track, and 195/65 R15 tire proportions. Reference: [period Mercedes dimensional brochure](https://www.w124.org/sitepublic/doc/mb/200_400E.pdf). Main dimensions are calibrated; the community model is not exact factory CAD.

Game geometry is embedded in `painted.html`. The editable local derivative is `assets/Mercedes-sedan-09.blend`. The inspected Sketchfab coupe is not used.

## Riders

[MakeHuman standard assets](https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html), CC0, fitted and posed in Blender with MPFB. SALLY uses the male_casualsuit01 hoodie. Study 09 expands garments slightly in their rest shape, raises the resting stance, aligns the free hand with the forearm, and uses skeleton-authored carving/crouching poses. Character height and hair differences are retained. Pose blending responds to rider steering and changes in heading; gameplay physics are unchanged.

## Validation and remaining work

13 gameplay/gesture regression checks passed. Four neutral wheel assemblies checked for roundness, ground contact and wheelbase. Wheel rolling and stopping checked in the rendered scene. All 24 non-base rider poses retain foot contact within 0.2 mm. All four riders and roof/interior inspected in-browser; portrait home and play views checked at 393 × 740. No browser rendering errors observed. Actual Samsung A17 performance remains a user-device check.

Smoke puffs from the sunroof are reserved for a later atmosphere pass. Cargo pockets and small period trim details remain refinements.

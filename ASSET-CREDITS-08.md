# Painted Entrance 08 — asset provenance

## Four-door W124 sedan
**3D model Mercedes-Benz W124**, by **w124zbyszek**.
Source: https://blendswap.com/blend/11083
Downloaded 11 September 2026 as `3D model Mercedes-Benz W124.zip`.
The included license is **Creative Commons Attribution-NonCommercial-ShareAlike 3.0**: https://creativecommons.org/licenses/by-nc-sa/3.0/

Changes: removed construction backups and hidden lamp internals; reduced mesh density; normalized dimensions; assigned black/charcoal painted materials and reflected sky; segmented lamp colors in the game shader; removed the source's engine-variant badge. This modified car geometry and car-specific material adaptation are offered under the same CC BY-NC-SA 3.0 license. The game is a personal noncommercial project. Attribution is accessible from How to ride and retained in the standalone page's source. This is an adapted W124 sedan, not a claim of exact factory CAD accuracy.

Editable derivative: `assets/Mercedes-sedan-08.blend`. Game geometry: `assets/mercedes-painted.json`, also embedded in `painted.html`. Original license retained with the downloaded archive in the working files.

The inspected OverLord Sketchfab download was a coupe and is **not included in this release**.

## Riders
MakeHuman standard assets, CC0: https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html
SALLY now uses male_casualsuit01's authored zip-hoodie geometry and ambient-occlusion texture, fitted with MPFB and posed in Blender. Shorts are adapted from the same outfit. Other riders retain their approved 07 anatomy and clothing. Shoe shading corrected; unused alternative trouser/short meshes removed from each character's payload. No skeleton, physics, camera or route changes.

## Remaining refinements
SALLY's shorts need authored cargo pockets; the current garment is a fitted shorts adaptation. The sedan needs further period-detail review and its small badges. Real Samsung A17 performance still needs user testing.

## Verification
All 13 physics/gesture regression checks passed. All four character selections load in the standalone build. All 24 exported non-base poses passed stationary-foot checks (maximum 0.2 mm). Browser play showed no rendering errors and no visible play-screen controls. Desktop 180-frame menu sample: median 6.9 ms, p95 8.3 ms, 75 draw calls; not a Samsung performance claim. Standalone download: 23,454,335 bytes.

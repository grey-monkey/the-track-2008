# Revision 07 — free-asset workflow and crew differences

The Track is a personal, noncommercial memory project shared with friends. Prefer existing free assets whose terms permit adaptation and sharing; retain provenance and satisfy their attribution/share-alike requirements. The gameplay illustration remains the visual reference, not a generic asset-library style.

## Human assets used

MakeHuman CC0 human foundation, male_casualsuit06, shoes05 and low-poly eyes, as documented in ASSET-CREDITS-06.md. Additional hair assets short01 (DOG/SALLY) and short03 (BLACK), alongside short02 (BOSS), come from the same CC0 standard asset pack: https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html

Each rider now has a separately generated proportioned human and separately solved carving/crouching poses. Height/build macro settings were chosen from the handoff's relative ordering and labeled photos; they are art estimates, not measured heights. DOG is shortest, SALLY slightly taller, BOSS average, BLACK tallest and slimmer. Hair color and silhouette differ. BOSS's precise likeness remains provisional. SALLY's full hoodie/cargo wardrobe remains unfinished.

Clothing surfaces have a gentle post-pose smoothing pass. Jeans use complete trousers, replacing the split upper/lower geometry that exposed a seam during crouching. Shoe soles remain anchored through each rider's six pose variations. The runtime uses only the selected rider's geometry, disposing it on selection changes. Existing camera, physics, sky, scenery and car are preserved.

Editable, texture-packed sources: assets/Rider-DOG.blend, Rider-SALLY.blend, Rider-BLACK.blend, Rider-BOSS.blend. Pose geometry is packed in rider-data.js. The packed coordinates include a per-rider vertical correction to align soles with the shared board surface.

## Car acquisition status

The detailed Blend Swap 17113 W124 page now returns 404, and the creator's previously linked Google Drive file reports that it no longer exists. The indexed search result was stale. It was not downloaded.

The creator's earlier W124 body/wheels model remains at https://blendswap.com/blend/11083, labeled CC-BY-NC-SA. Its download page requires sign-in. A sign-in request was presented to the user. No model from this listing has been downloaded, imported or redistributed in revision 07. Asset quality will be assessed after authorized download; it is not yet a validated replacement for the current car.

## Validation

Exported mesh indices and pose-array lengths validated for all four riders. All 24 rider/pose combinations retain sole vertices within 0.2 mm of their base positions at export precision. BLACK's full crouch and DOG's lean were visually checked in the painted browser scene without rendering errors. Real Samsung/iPhone frame pacing remains subject to device review.

The bundled portrait preview reported median 6.9 ms and p95 8.0 ms across 180 desktop menu frames, with 76 draw calls and 348,288 triangles for BOSS. This is a short desktop observation, not a phone performance guarantee. The single-file build is about 22.36 MB before HTTP compression because it includes all four authored pose sets; only one set is uploaded to the GPU at a time.

# Study 26 — Native skater and grounded tumbles

This release replaces the active rider with the selected Skater with animation model, keeping its original body proportions, skating stance, trailing hand and ollie poses. Playable selections currently share that appearance with modest height differences; individual likenesses are still future work. Existing seated passengers are retained.

- Feet centered across the deck. Head tracks the rear plate; rope hand follows the tow hitch. Black handle and off-white rope.
- Falls blend loose and tucked native poses into a slowing tumble and settle onto the side. This is pose-driven animation with surface contact, not a full joint-by-joint physics ragdoll.
- Deformed body, clothes and shoes are supported against pavement/terrain. The board's wheels, deck faces and edges also stay above the surface while tumbling.
- Black Mercedes paint with more concentrated sunset reflections, raised rear plate, corrected lamp treatment, 300 E badge, black upper trim, lower chrome strip and twin black exhaust tips.
- Small exhaust puffs occur on acceleration onset. Home-screen pace and rope controls remain; gameplay has no visible HUD.

## Asset attribution

Active rider: **Skater with animation**, by **SpatialNeglect / jeandiz**. Source: https://sketchfab.com/3d-models/skater-with-animation-8e2e5783b3e14cce858a023f4ee7c567 . Licensed **CC BY-NC 4.0**, https://creativecommons.org/licenses/by-nc/4.0/ . Adaptations include rope-arm posing, pose blending, head/arm tracking, scale, materials and falling animation. Native source animation is retained as the basis of the skating/ollie poses. Geometry and textures are incorporated in the playable game; this personal project is noncommercial.

Car: **3D model Mercedes-Benz W124**, by **w124zbyszek**, https://blendswap.com/blend/11083 . **CC BY-NC-SA 3.0**, https://creativecommons.org/licenses/by-nc-sa/3.0/ . Adapted car geometry and car-specific materials remain under that license. Changes include simplification, scale, separate wheels, windows/sunroof, painted materials, trim, rear lighting, plate and exhaust. See ASSET-CREDITS-09.md for dimensional references.

Seated passengers: **Otaku**, by **Richie Kirui**, incorporated as adapted game characters under the **BlendKit Royalty Free license**: https://www.blendkit.com/docs/licenses/ . Sprad and additional passenger accessories use **MakeHuman CC0** assets. Original standalone commercial-library source assets are not distributed.

## Validation

Checked 1,632,665 deformed body vertices across 101 tumble poses on sloped/uneven ground; minimum clearance 6 mm. Checked 17,776 wheel/deck contacts including 101 board tumble poses; minimum clearance about 2 mm. Static fall and skating poses inspected in browser. Mobile performance and feel still benefit from review on the actual phone.

# Study 16 — the friends and their clearing

## In this build
- Replaced the three circular horizon rings with a 22-point canopy trace registered to the supplied aerial road landmarks. Three overlapping woodland depths and low painted undergrowth enclose the lots. Road geometry, the cleared central hill, and the three-house limit remain intact.
- Reworked the four riders' garment volume, hair treatment, clothing marks and balance response. Added authored hood and cargo-pocket details for SALLY. Added SPRAD as a passenger with a broader build, blond hair, glasses and plaid clothing; he is not a selectable skater.
- Exported standing, offering, checking, seated, looking-back and walking poses from Blender. The existing skinning and rider contact poses remain the animation foundation.
- Added a short rope handoff and return to the car before each tow. Visible driver and passengers look back. After a fall or coast to a stop, a friend comes over; the camera reframes the check-in and a smaller end menu leaves the scene visible.
- The car must actually finish braking before the fall sequence ends. The previous fixed timer could leave it frozen with residual speed.

## Reference basis
Original project crew brief, labeled prom-era photographs and world canon. Track clothes follow the brief rather than prom outfits. BOSS has no confirmed photo likeness in the supplied set; his appearance remains an interpretation. New tee prints are illustrative motifs, not claims about the exact original shirts.

Boundary registration uses the supplied current aerial's 200-foot scale and road landmarks, cross-checked against [Google Maps](https://www.google.com/maps/@35.0879,-80.7970,17z/data=!3m1!1e3). This reconstructs the remembered 2008 clearing; it is not a surveyed or historically verified 2008 canopy line. The eastern buffer and western woods are deliberately different shapes.

Animation research: [Mariel Cartwright, Powerful and Effective Animation](https://media.gdcvault.com/gdcchina14/presentations/833784_MarielCartwright_PowerfulAndEffective_EN.pdf), focusing on readable poses and silhouettes; [Animation Bootcamp: Establishing an Ecology for NPCs](https://gdcvault.com/play/1020036/Animation-Bootcamp-Establishing-an-Ecology), focusing on character purpose and personality. No game assets were copied from these references.

## Verification
- Inspected all four riders plus SPRAD, handoff, seating, walking and check-in poses; entrance, hillside, overhead boundary and car views.
- Complete start-to-crash/regroup flow reaches the end menu; no browser rendering errors observed.
- Stopping tests at 3, 6, 9 and 12 m/s finish with car speed below 0.12 m/s and rider speed below 0.15 m/s.
- 5,988 wheel-contact cases pass across entrance and circuit; wheel clearance remains approximately 1.45–5.19 mm.
- Standalone build: 24,425,967 bytes. Compressed model data is decoded on load; requires a modern browser with DecompressionStream support.
- Actual Android/iPhone performance has not been measured in this pass. This is a review build, with further likeness and animation polish still possible.

## Asset provenance
Human, clothing and hair foundations: MakeHuman standard CC0 assets. Custom rig poses, volume changes, prints, hood, pockets, glasses, material treatment and crew interactions created for this project. W124 adaptation and existing credits/licenses remain in the game's How to ride panel and embedded source.


# Build 132 — sprawled finishes, rope, plate and cul-de-sac

## Changes

- Replaced the standing-heavy final crash morph with an authored, asymmetric spread of arms and legs. Final body pitch relaxes flat. Existing tumble timing and extended momentum remain intact; the end screen keeps the crash geometry.
- Re-baked all four riders. Editable pose source: `export-rest.py` and `sprawled-rest.blend`. Build 131 assets remain unchanged. The comparison restores the actual prior resting morph on the left.
- Replaced the bright line used for the moving tow rope with a six-sided, 18 mm diameter tube. Reuses 198 vertices, with braided canvas texture, muted flax/olive color, scene shading and a restrained ground-contact shadow. The laid rope on the selection screen uses the same material. Tow mechanics remain unchanged.
- Added a 512 × 256 painted North Carolina First in Flight plate, 5330-LRD, on the existing rear plate geometry. Uses scene lighting, restrained white/blue, a small Flyer motif, fasteners and a period-style registration mark. Reference: [NCDMV standard plate designs](https://www.ncdot.gov/dmv/title-registration/license-plates/Pages/default.aspx). This is an original simplified in-game drawing, not a photographic reproduction.
- Expanded the cul-de-sac loop from 10.8 m to 11.6 m radius, adjusted entry/exit points and made the departure more diagonal. Matched curve tangents at the loop joins. Pavement, obstacles and house layout stay fixed.
- Raised available lateral acceleration by up to 55% locally at the cul-de-sac, easing back to the existing limit outside it. This allows approximately 24% higher steady speed on an equal-radius turn, subject to approach braking and the selected driver. The faster test driver's steady loop target is approximately 6.5 m/s (14.5 mph). Other corners retain their prior limits.
- Phone rendering cap is 1.15 rather than 1.0: 32% more pixels than Build 131, still about 41% fewer than the old 1.5 cap. Desktop reference resolution is unchanged.

## Checks

- 609 samples around the new cul-de-sac section, checking the car center and a 1.9 × 5.0 m footprint against the road boundary: minimum sampled clearance approximately 0.72 m. This is a sampled geometry check, not a continuous swept-volume proof.
- Peak sampled cul-de-sac curvature decreased from 0.193 to 0.174 /m; the largest heading change over 10 cm decreased from 0.0336 to 0.0251 radians.
- 288 exact body support comparisons using the new packed rider data: zero discrepancy against the full-vertex oracle. Existing contact acceleration still skips approximately 77% of vertices.
- Desktop actual gameplay replay reaches the end screen with a sprawled rider; no page errors observed. Sally, Dog and Boss resting poses inspected; both stances covered. All four riders participate in the numerical contact checks.
- Plate and rope inspected on the Mercedes in the actual scene; no separate high-cost physical rope simulation or large new texture dependencies.
- Actual Samsung A17 Chrome replay completes ride, crash and end screen with no context loss. Build 132: ready 30.2 s; riding median interval 22.3 ms / 95th percentile 55.6 ms; fall median 44.4 ms / 95th percentile 88.9 ms. A subsequent Build 131 comparison was slower (55.6 ms median riding, 77.8 ms median fall). Timing is variable; this does not establish a speed improvement or a clean isolated resolution comparison. Occasional long frames remain.

Raw measurements: `phone-132-mobile-final.json`, `phone-131-mobile-final.json`, `contact-check.json`, `route-check.json`. Phone renderer budget is intentionally still below the older high-resolution setting.

## Local reviews

- http://127.0.0.1:4197/playtest132/playtest132.html?v=132
- http://127.0.0.1:4197/falls132-study/
- http://127.0.0.1:4197/route132-study/

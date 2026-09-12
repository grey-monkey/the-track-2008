# Map-wide environment pass 35

Review: http://127.0.0.1:4197/environment-study.html?v=35b
Ride: http://127.0.0.1:4197/environment-game.html?study=35b

## Evidence and uncertainty

Inspected Google Maps satellite overview and two close views on September 11, 2026:
- Western Greenbriar Hills Plantation frontage: https://www.google.com/maps/@35.0874,-80.7987,95m/data=!3m1!1e3
- Eastern Copperleaf Commons frontage: https://www.google.com/maps/@35.08745,-80.79695,105m/data=!3m1!1e3

Dark rectangular curb features are consistent with drainage inlets in these close views. The game stations are approximate matches to the reconstructed road, not individually surveyed coordinates. Five new drain placements are marked aerial-candidate; three are reconstructed near approach/turn catchments. No definite round-cover identification or water/sewer service classification was possible from the inspected imagery. All cover service assignments remain reconstructed. Flat aerial imagery does not prove elevations or 2008 presence.

User directly confirmed the cul-de-sac lots were sold and had utilities and dirt piles in 2008. The exact number, station, and pile shapes are reconstruction choices.

## Implemented

- 12 new irregularly stationed circuit covers, replacing uniform test spacing; plus four entrance covers. Separate water/sewer runs.
- Eight circuit storm drains plus approved entrance drain. Local tangent and road grade alignment, concrete surrounds.
- Three total hydrants; three cabinets by remembered entrance house lots.
- Five cul-de-sac lot cabinets and five elongated irregular dirt piles, beyond the pavement. No new houses or modern driveways added.
- Rounded poured curb, concrete joints, asphalt separation seam and unfinished shoulders along the main circuit. Existing special bulb/junction curb remains where the standard road ribbon does not apply.
- Inspection views for western drainage, eastern drainage, southern cover, and cul-de-sac lots.

Assets reused from the approved Poly Haven CC0 set. Piles and fitted curbs are custom terrain geometry, not downloaded models. No Google imagery is included as a game asset.

## Checks

Validated all 20 new circuit cover/drain stations and pavement placement in code. Browser inspected western/eastern drainage, southern cover and cul-de-sac lots; no scene errors. Standalone preview and ride bundles build successfully. Mobile performance has not been benchmarked. New fixtures are visual staging; impact/shock/hazard behavior is not enabled. Main public Study 28 remains unchanged; review is local.

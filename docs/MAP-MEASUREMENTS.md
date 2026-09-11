# Aerial measurement update — v0.3.2

Reference: user-selected Google Maps satellite view of Greenbriar Hills Plantation Road / Copperleaf Commons Court, inspected September 10, 2026. The URL pin metadata is 35.0872, -80.787914, while its displayed camera center is 35.0873812, -80.7980265. Those differ, so the pin was not used as a surveyed coordinate origin. The visible named road loop matches the supplied handoff aerial and is the geometry traced here.

[Open the reference](https://www.google.com/maps/place/35%C2%B005'13.9%22N+80%C2%B047'16.5%22W/@35.0873812,-80.7980265,528m/data=!3m1!1e3!4m4!3m3!8m2!3d35.0872!4d-80.787914)

## Calibration and estimates

- North-up, flat aerial viewport: 1400 × 1000 CSS pixels, device pixel ratio 1.
- Scale bar: 200 feet over 114 pixels = 0.53474 metres per pixel. Closer inspection: 100 feet over 113 pixels, about twice the magnification.
- Road curb-to-curb width: approximately 8.5 m, based on clear straight sections; sidewalks excluded. A constant representative width is used, except for the flared throat and bulb.
- Open bulb diameter: approximately 30 m, based on a 56-pixel outer diameter. The modern center island is omitted for the remembered 2008 setting.
- Driving lap: approximately 883 m, including the clockwise bulb circuit; road width, steering line and entrance choice affect this number.
- Overall paved layout is roughly 250 m east-west by 308 m north-south, before the ribbon's outer edge at the eastern/northern extremes.

The trace is stored as measured aerial pixel control points in world.js, converted to metres once. It refines the western approach, flared entrance, lower connector, eastern reverse bends and upper junction. The central footpath is traced where visible and interpolated beneath vegetation.

These are aerial estimates, not survey measurements. Allow roughly 0.5–1 m uncertainty in visible curb edges and several metres under shadows or trees. Elevation remains the prior approximate hill profile: a flat aerial cannot establish a reliable vertical survey. The upper off-route street, individual lot boundaries, houses and modern landscaping are not a complete reconstruction. No Google imagery is bundled with the game.

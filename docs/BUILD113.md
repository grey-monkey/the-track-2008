# Build113 — stable curb visibility and parked-car idle

Based on Build112. Curbs and road geometry, foundations, gameplay, models and foliage exclusions are unchanged.

The main asphalt and shared gate apron previously used slope-scaled polygon offsets of -1 and -2. At shallow camera angles that depth bias can pull road triangles over the physically higher curb, creating apparent pop-in. Both slope factors are now zero. Small constant depth-unit offsets remain for existing layered road surfaces; no geometry lift, camera change or curb LOD was introduced.

The selection screen now plays the existing idle and exhaust loops at the zero-speed riding reference levels (.17 and .085 before distance attenuation and the .46 master). Source positions use the displayed car transform: bonnet local Z=-1.5, rear local Z=1.9. The listener is the selection camera. Filters remain 1400 Hz and 750 Hz with .94 playback rate, matching the existing idle character. Moving-car load, tires, board roll/slide and braking remain silent in selection. Radio still starts only on Ride. Browser gesture unlock, mute and hidden-page behavior are preserved. No additional audio clips or loop nodes.

Source overrides: curb-audio113/{painted,entry-apron,memory-sound}.js. Inherited routing: finishes112 and transitions111. Package with work/playtest113/package.cjs. Tests/evidence: work/playtest113/check.cjs and check.json, fixed-camera before/after captures. Actual Android/PWA behavior and subjective headphone levels require phone review; desktop gain/state checks cannot substitute for that.

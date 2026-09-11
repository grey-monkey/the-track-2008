# Study 11 — light, ground and evening sound

This pass ties the existing entrance artwork together through shared sunset lighting, moving cast shadows and a quieter ground treatment. It preserves the tow simulation, camera, car geometry, rider poses and Study 10 tire contact.

## Play

[Open Study 11](https://grey-monkey.github.io/the-track-2008/painted.html?v=11). The selection screen says STUDY 11. Sound can be switched off in How to ride; active play has no visible buttons or labels.

## Changes

- Shared sunset direction for painted surface shading and the rider's warm edge light.
- Soft projected car, board and posed-rider shadows on asphalt and earth. The 512-square silhouette pass uses the main car shell and tires, excluding small trim and interior details to reduce rendering cost. Hair cutouts respect their transparency.
- Finite amber lamp pools; nearest four lamps affect nearby painted surfaces. Sixteen lamp locations are retained in the scene.
- Reduced ground texture contrast, broad muted clay/grass color variation and woodland tonal masses. Curbs now use the painted surface treatment.
- Original synthesized sound: engine harmonics respond to speed/load/distance, rolling noise responds to board and ground contact, with distant insects. Short impacts accompany landing, dirt-boundary crossings and a wipeout. No new music or purchased/downloaded audio.

## Checks

- Standalone bundle loaded at a 393 × 740 portrait viewport; sound toggle works in the instruction panel; play screen remains clear; no browser errors observed.
- Four rider selections produced populated moving shadow masks and finite projection matrices. Entrance and sloped-road visual checks completed.
- Existing full-route tire-contact test: 5,988 states, no missing contacts, 1.45 mm minimum clearance and 5.19 mm maximum gap.
- Four-second offline audio render: finite samples, sampled peak 0.046, road RMS 0.0132, muted RMS 0.0000385. Road, airborne, dirt and mute states tested. This is a signal-level check, not a listening review on phone speakers.
- Packaged local preview timing: 6.9 ms median / 8.0 ms p95 between frames over 180 samples on this desktop browser. 101 draw calls / 449,533 triangles including the shadow and finish passes. This is not a Samsung A17 or iPhone performance measurement.
- Final standalone file: 23,554,595 bytes. No external runtime downloads.

The result is another step toward the concept illustration, not a claim of a finished illustration match. Real-phone sound balance and frame rate still need the user's review. Evening progression and the full crew regroup scene remain future work.

## Research informing the pass

- [Harry Alisavakis — Firewatch-style multicolored fog](https://halisavakis.com/my-take-on-shaders-firewatch-multi-colored-fog/): distance can guide a controlled color treatment rather than relying on blur. Used as rendering reference, without copying tutorial code.
- [MDN — Web Audio best practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices): initialize/resume audio from user interaction and retain a user sound control.
- [GDC — Making the World of Firewatch](https://www.gdcvault.com/play/1023191/Making-the-World-of): session synopsis reviewed for art-production context; the full talk/slides were not reviewed this pass.

Existing car and character credits remain in ASSET-CREDITS-09.md and the game's instructions. No new third-party art assets were added.

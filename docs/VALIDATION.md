# Prototype 0.3 validation

## Automated simulation and input checks: 12/12 passed

1. All sampled car footprint corners fit within the independent paved surface.
2. Car heading is continuous through the bulb throat and loop boundary.
3. All 16 combinations of four riders and four boards survive one lap without input at medium rope length.
4. Both drivers with short, medium and long ropes survive two neutral-input laps on the nice longboard.
5. SALLY's pace exceeds DOG's calm pace, and DOG's straight-speed bursts vary by seed.
6. Releasing the rope preserves position, heading and velocity at the instant of release; subsequent tow force is zero.
7. An early straight release coasts to a safe regroup.
8. Sustained aggressive steering with a long rope/street deck can cause a continuous physical failure; motion continues after impact.
9. A conservative cul-de-sac setup survives while a deliberately aggressive speed setup can crash.
10. Ollie permissions cover every rider/board pairing.
11. The same 20-second input sequence gives identical fixed-step states at 30, 60 and 120 display frames per second.
12. Gesture tests distinguish horizontal drag, crouch/lift, upward flick, cancellation and an ignored second pointer.

The neutral runs intentionally prove the baseline is rideable. They do not prove the game is enjoyable or that every possible input is stable. The aggressive speed multiplier is a developer test setting, not a normal player control.

## Offline/packaging checks

- All 13 core URLs exist and can be precached.
- HTML, JS modules, renderer modules and icons resolve from cache when the simulated network is unavailable.
- Old Track caches are removed while unrelated caches remain untouched.
- The manifest uses relative URLs, standalone display and existing icons.
- JavaScript syntax checks pass.

## Browser checks completed

- Game loads and renders with no observed browser error/warning logs during the checked session.
- Start, rider/board controls, saved rope choice and reload behavior work.
- A neutral ride progressed into a second lap in the browser.
- Pause shows a stable resume menu.
- Keyboard release removes the tow and reaches the safe-regroup menu.
- Portrait layouts checked at 390 x 844 and 375 x 667; start controls remain in view, with no horizontal overflow.
- The service worker reports control of the page after loading.
- The optional read-only WebMCP tool returns current game state and rejects unexpected arguments.

## Still to test on devices

- Samsung A17 frame pacing and touch gesture feel.
- Actual iPhone Safari and Add to Home Screen: safe areas, swipe disambiguation, audio, interruptions and offline relaunch.
- Whether the tow feels pleasant and physically dependent on the car.
- Whether the route, camera, road width and cul-de-sac evoke the remembered place.

## Five useful first-play checks

1. Start with DOG and the nice longboard at medium rope length. Leave the screen alone briefly and feel the gentle launch.
2. Make small left/right drags on a straight. The rope should visibly change angle as the rider carves.
3. Hold still to crouch approaching the cul-de-sac. Check whether its entry, clockwise turn and exit make spatial sense.
4. Flick upward on a straight with room ahead. The rider should coast while the car stays ahead and stops for a regroup.
5. Compare SALLY riding (DOG driving) with DOG riding (SALLY driving), then try a longer rope.

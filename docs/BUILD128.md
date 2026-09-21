# Build 128: free ride and continuous car audio

Releasing the rope now transitions the camera and rider gaze toward actual travel. The camera eases into a closer forward view, limits turn rate, and holds its bearing near a stop or crash. The Mercedes follows its normal route and turn-speed limits independently of rider speed. Existing momentum, slope gravity, board rolling resistance, steering, grip and paved-path support remain in use; no automatic propulsion was added.

The grounded rider finishes free ride after staying below 0.5 mph (0.22352 m/s) for 0.5 seconds. Accelerating above the threshold or leaving the ground resets that timer. The finish view retains the free-ride bearing.

Music attempts to start when selection is ready, unlocking on the first tap when browser autoplay rules require it. The same album stream continues through riding, free ride, regroup, wipeout results, and return to selection. Environmental loops and their occasional-event schedules persist across those screens. The radio remains spatially located at the Mercedes side windows, including the displayed selection-stage car transform. Distance attenuation remains intact. Explicit sound mute and background-tab muting are preserved. The first track remains Four Mile Scar.

Includes the approved charcoal Dog shirt and transparent blue C logo from Build127, with regular-stance print orientation corrected.

## Validation

- Deterministic comparison: 600 simulation steps per board, all four boards' towed rider/car physics unchanged from Build126.
- Released car motion identical for two different rider speeds.
- Camera velocity alignment, bounded yaw, stable low-speed/crash/regroup bearing, and selection reset passed.
- 0.5-second grounded finish, interruption/reset, and airborne exclusion passed.
- Audio mixer checks passed for selection, riding, coasting, regroup, ended, and crew return; mute/background behavior preserved.
- Actual browser: Dog selection and regular-stance paved-footpath free ride rendered correctly; path contact reported paved. Continuing straight past the path bend eventually entered dirt and finished normally.
- Actual browser: radio advanced from selection (32.7 seconds) to free ride (64.8), ended (96.7), crew return (114.7), and low-speed regroup (210.1), with running context and nonzero wind. No captured runtime errors or warnings. Fresh autoplay was blocked as expected and the first tap unlocked it.
- Package: 78 files, 84,800,144 bytes. No new meshes, audio recordings, or deformation fields in Build128. Dog logo is the prior Build127 addition.

This was a desktop browser and deterministic simulation check, not a new measured Android FPS/audio-hardware test. Physical phone testing remains the final listening and handling check.

## Reproduction

Source overlay: docs/freeride128-source/ on top of the existing authoritative project, Build126 motion modules, and shirt127 overrides. Build with work/playtest128/package.cjs. Local diagnostic controls: playtest128/playtest128.html?v=128&freeride-review=1. Normal live entry has no review controls.

# Build126 — Release, coasting and speed posture

Completes the two approved everyday riding motions using the existing pose fields. No added meshes, textures, deformation targets, materials or draw calls.

- Rope release settles shoulder/arm/body over 0.65 seconds using a smooth bounded transition. A rapid release/regrab/release starts from the current arm blend instead of snapping back.
- Free coasting uses a restrained whole-arm balance from the existing braking field; no independent wrist waving.
- Speed-dependent posture smoothly lowers the stance between approximately 9 and 25 mph. It is capped at 20% of the established compression pose and reduced by manual crouching and stronger actions.
- Slides, grip recovery, rope yank, impacts, ramp flight, tricks, menu and crash ownership remain protected. No new wipeout animation is included.

## Validation

`node work/playtest126/check.mjs` passed unchanged physical trajectories on all four boards; identical ramp launch and landing trajectories; preservation of all ten existing authored fields and point bindings; slide/grip/yank response regressions; ramp preparation/extension/air/landing presence; release and rapid-regrab continuity; speed bounds; suppression outside active riding and during tricks; seam, bump, manhole and patch attack/recovery. Existing authored ankle error remains below 0.0000002 m. Models, clothing, faces, graphics and audio assets are unchanged.

The A/B study includes actual recorded release, speed, ramp, pull, braking, powerslide in both directions, grip recovery, rope yank, patch entry and patch exit. A 14-pose hand contact sheet supports visual comparison. Representative rider/stance and crouch checks accompany actual playable release and speed checks. Visual inspection is not a guarantee against every possible pose intersection.

73 runtime asset files are byte-identical to Build125. The game package is 83,940,761 bytes, 1,348 bytes larger than Build125. There are no additional morph buffers. Desktop response sampling remains sub-microsecond in the source test; this is not an FPS measurement.

The previously paired Android phone was not connected during this pass. No new handset FPS claim is made. Android, iPhone/PWA and extended whole-route endurance should still be checked on the live build. Build125's earlier phone timings do not certify this revision.

## Source and review

Authoritative editable source: `outputs/painted-prototype/motion126/`; authoring/validation scripts: `work/playtest126/`. Published source files are an overlay snapshot, not a standalone complete project.

Playable: `build126/playtest126.html?v=126`. Comparison: `response126-study/`. Normal gameplay has no review controls; diagnostics require `dynamics-review=1`.

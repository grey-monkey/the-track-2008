# Prototype 0.3.1 validation

The September 2026 feel update reduces automatic board-to-rope alignment from 85% to 12%, lowers rope spring damping from 0.95 to 0.70 of critical damping, and increases planned car speeds by 5%. Launch acceleration and route geometry are unchanged. The rope still only pulls; there are no position snaps, random shove forces or inactivity timers.

## Automated checks

Run npm test and node tests/offline.test.mjs.

- All 48 rider, board and short/medium/long rope combinations complete a lap with continuous active carving and crouching, establishing a controllability envelope.
- The default setup also completes a lap with coarse carving alone: five steering corrections per second, rounded to tenths, without crouching or route lookahead.
- Both drivers at all three rope lengths launch safely with no input, then physically wipe out at the first tight turn. This intentionally replaces v0.3's neutral-input lap requirement.
- Excessive speed can still defeat active steering in the cul-de-sac.
- Car road clearance, heading continuity, driver speed differences, release momentum, safe straight regroup, physical crashes, ollie permissions, gesture discrimination and fixed-step consistency remain covered.
- Offline checks cover 13 core assets, GitHub Pages subpaths, legacy upgrades and cache isolation. Cache version advances to v031-whip-1.

These simulation checks demonstrate controllability, not human playability. Samsung A17 and iPhone touch feel still need player feedback. The prior v0.3 browser layout checks remain relevant; this update changes physics and instruction text, not layout.

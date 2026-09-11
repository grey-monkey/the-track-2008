# Study 27 — Tow-arm shoulder and elbow orientation

Repose the rope arm so its elbow bends downward and toward the ribs, instead of outward toward the chest. Shoulder tracking now corrects the arm's roll around the tow direction, keeping that elbow bend plane as the car moves left/right. The grip and visible arm use the same shoulder transform.

The trailing hand, torso, legs, head tracking, riding physics and native ollie body poses remain unchanged. The rope arm has the corrected orientation in riding, crouching and airborne poses. Study 26 fall support remains.

Validation: 363 shoulder directions across the three holding poses preserve arm lengths and align the elbow bend downward/inward. Deformed-body fall contact regression passes across 101 poses. Close-up left/right and airborne views inspected without browser errors.

Asset credits and licenses remain as documented in RELEASE-26.md and the in-game help. Active skater: SpatialNeglect / jeandiz, Skater with animation, CC BY-NC 4.0. This update changes the adapted rope-arm pose and shoulder tracking.

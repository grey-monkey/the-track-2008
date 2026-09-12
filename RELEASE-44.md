# Study 44 — whole-map hazard reactions

## Behavior
- All 16 water/sewer covers disturb individual wheels: a spring-damped bump, yaw impulse and increased wobble. Offset impacts alter the line. Crossing the asphalt/concrete seam creates a smaller bump. Repeated stationary overlap does not retrigger impacts.
- All 9 storm grates catch rolling wheel contact. The board stops at the swept contact location and remains pinned; the rope releases and the rider retains forward momentum with a short forward launch into the tumble. Airborne clearance skips a grate. A loose board can also catch after a fall.
- All 3 hydrants, 8 utility cabinets and 10 streetlights are solid for rider/board contacts. Cabinet foundations and post bases also collide. Swept contacts prevent a fast object from skipping through a fixture; normal impulse, friction and impact-driven turn/flex redirect the tumble.
- Raised covers/grates are included in visual ground support. Rider and board stop independently; the run waits for both to settle. Added distinct procedural seam, metal and solid impact sounds.
- The approved board assets, riding poses, car and environment appearance are retained. Character-specific hazard sensitivity is deferred as requested.

## Construction and research
Collision positions come from the fitted rendered assets, not a duplicate manually placed map. The registry has 16 covers, 9 grates and 39 solid volumes (21 props plus 18 foundations/bases). Wheel centers were measured from all four actual board meshes. Curb contact uses the clipped rendered concrete triangles across entrance, circuit, junction and cul-de-sac.

Swept collision and normal/tangential response are informed by [Box2D's simulation documentation](https://box2d.org/documentation/md_simulation.html) and [Erin Catto's continuous collision presentation](https://box2d.org/files/ErinCatto_ContinuousCollision_GDC2013.pdf). This implementation does not embed Box2D. Grate capture is an intentionally decisive game rule matching the requested experience, not a claim that every real-world grate catches every wheel.

## Verification and limits
14 simulation checks pass: swept collisions, rotated shapes, all four boards caught while rider momentum continues, airborne clearance, recoverable cover impact, seam debouncing, all requested solid families, post-crash body/board response and vertical clearance.

191 in-world checks pass across every mapped fixture, including 3 approach angles for each board at each grate. They initially found two cabinet-footing gaps, now corrected. Browser checks inspected a pinned board/forward throw, a body and board striking a post, rider fit and ordinary gameplay. No browser errors in the final build. Full-mesh board tumble support retains at least 2 mm clearance on the regression slope.

In the browser contact benchmark, full-body support median was 13.3 ms with nearby fixture surfaces versus 11.6 ms with the prior ground-only sampler. The renderer uses the ground-only path whenever metal fixtures are out of reach. These are desktop contact timings, not total frame times or phone measurements; the user's phone ride-through remains necessary.

The body retains its authored pose-driven tumble, with reactive flex/turn and approximate body contact volumes; this is not a full independently simulated joint ragdoll. Proxy collision shapes approximate the props, and unusual grazing contacts may still need visual tuning.

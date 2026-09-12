# Study 50: moving-car crash collisions

Play car-collision.html. Study49 handling and prior previews are preserved.

The car previously triggered a crash but was absent from post-crash contact resolution. Add lightweight swept car-local body and wheel volumes, evaluated against the car's previous/current transform. Bounce uses velocity relative to the moving car; steering rotation contributes contact velocity. Collisions stay active throughout the tumble. The riding board is also checked before initiating a car crash.

Humans collide with body and tires. Low boards can pass along the tire tracks, allowing the car to run over them; the central chassis blocks the board. Elevated boards collide with the outer body too. This is a gameplay collision approximation, not deformable sheet metal or tire crushing simulation. Pinned boards dislodge if struck by the car body.

Validation: 11 focused tests cover rear/side contacts, fast crossing, rotation, penetration recovery, moving car into a stationary object, tire clearance for boards versus humans, elevated boards, and same-step crash response. Existing board and hazard suites pass. Fresh browser rear-impact inspection shows the rider and board rebounding and staying behind the car, without errors. The first browser check reused cached old physics; a cache-busted check confirmed the fix. Published files are hashed to prevent that stale-module problem.

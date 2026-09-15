# Build 103

Removes standalone young trees, shrubs, bushes, wild grass, perimeter underbrush and house foundation plants. Retains the painted perimeter woodland, finished ground and distance fade, worked lots, piles, blocks, road objects, characters, controls and Mercedes audio.

Foliage construction/loading, its contact/cast shadows and young-tree collision obstacles are excluded. Source is environment103 in the authoritative painted-prototype folder; packaging is work/playtest103/package.cjs. Build 102 remains available as a fallback. Physical phone testing remains outstanding.

Validation: desktop Chromium rendered sunset and night views with no browser errors; 100 controlled cul-de-sac draw samples had median 3.2 ms and maximum 14.4 ms, with no new shader programs during the sweep. This measures desktop draw-call CPU time, not phone frame rate. Scene audit: zero young-tree hazards, zero standalone foliage names, 364 retained boundary woodland stands.

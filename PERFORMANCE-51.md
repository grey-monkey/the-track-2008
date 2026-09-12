# Study 51: phone-driven board contact optimization

Play mobile-performance.html?profile=1 to record a phone performance report. Save after a crash or regroup, without refreshing. Normal entry omits the recorder.

The user's Build 50 phone report measured 7.8 ms median / 20.8 ms p95 / 40.2 ms p99 board contact CPU while riding, with 22.2 ms median observed frame spacing. This pass targets contact computation without changing board models, steering, rope physics, hazards, or car collision response.

Changes:
- Shared per-geometry vertex hierarchy skips branches that provably cannot affect support. Original support vertices remain available, including deck faces, sides and wheels.
- Previous winning support vertex seeds the next search at the new pose; it is reevaluated, not used as a stale height.
- Reuse identical support queries for independent wheel corrections within one update.
- Prepare local road/curb triangle candidates for each board footprint while retaining original triangle ordering and raised cover/grate support.
- Tighter conservative triangle height bounds reduce unnecessary exact ground queries.
- Performance reports include selected rider/board/rope/pace and a build-numbered download filename.

Validation includes exact pose comparisons of all four board meshes, riding/airborne/pinned/tumbling states, raised surfaces, map pavement and terrain. No geometry decimation or physics tuning is included. Benchmark results are desktop contact-only measurements, not phone FPS or GPU timings. The requested next phone report is needed to quantify improvement on the actual device.

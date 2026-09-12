# Study 46 — modular delivery and contact performance

This is a separate performance preview of Study 45. The published painted.html and handling.html test versions are preserved. Board handling values, controls, art, hazard rules and authored geometry have not changed.

Delivery
- performance.html is about 6 KB rather than a 26 MB embedded game.
- 34 separately requested files: HTML, stylesheet, three JavaScript modules/chunks, compressed models and images. Total uncompressed-on-disk resource payload is about 23.47 MB; actual network transfer depends on HTTP compression and cache state.
- Asset filenames include content hashes, so unchanged artwork keeps its URL across code updates. Models are fetched as compressed binary resources instead of embedded base64 JavaScript. Embedded image strings were extracted from model payloads as well.
- This is HTTP-cacheable delivery, not an offline PWA implementation. No service worker or cache eviction policy is installed by this preview. Initial model decode and GPU texture memory still exist; separate downloads do not eliminate those costs.

Contact optimization
- Full-body contact only runs during crashed/ended states, not ordinary riding.
- A conservative local surface ceiling rejects vertices that cannot possibly improve support. Remaining candidates use the same exact surface queries. All original vertices, morph poses, fixture tops and wheel/deck geometry remain.
- Unchanged fall poses reuse their exact support result. Board calculations reuse working vectors rather than allocating a new vector for every vertex.
- 63 fall poses, 1,018,395 vertex clearance checks: zero difference from the old support calculation; minimum clearance 6 mm.
- 720 poses using all four actual board models: zero difference in board height and wheel offsets. Additional slope/tumble checks: minimum clearance approximately 2 mm.
- Desktop Node contact-only comparison: body median 5.17 ms before / 1.03 ms after; p95 7.20 / 3.09 ms. This controlled harness is not directly comparable to the old Study 44 run, a whole-frame benchmark, or a phone measurement.
- All 13 handling acceptance tests and 14 hazard behavior tests pass.

Real-phone check
1. Open performance.html?profile=1 on an actual Android phone in Chrome or an iPhone in Safari. Close other running game tabs.
2. Ride for roughly a minute. Cross a cover, approach a grate, and include a fall. Repeat on the same board, pace and section when comparing versions. Also test a fresh load and a repeat visit separately.
3. At the end-of-run menu, tap Save performance report. Send the JSON file back with the phone model. The report stays on your device until you share it; nothing is uploaded automatically.
4. The report separates riding, crashes and the stopped end state. It includes frame-interval p50/p95/p99, intervals exceeding 33/50 ms, main-thread frame/scene/contact/audio timings, browser/viewport data and resource timing.
5. Draw CPU time excludes asynchronous GPU work. Animation-frame spacing captures visible scheduling delays but is not a GPU timer. Zero resource transfer bytes are not automatically labeled a cache hit. No Android/iPhone performance result has been established by desktop testing.

Implementation remains in outputs/painted-prototype. Rebuild with node work/performance46/package.cjs. Only copy filenames listed in work/performance46/package-results.json to a release; the local output folder may contain old hashed files from earlier builds. Preserve existing asset credits and licenses in the repository.

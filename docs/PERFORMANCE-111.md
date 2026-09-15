# The Track: 2008 — Build111 performance review

## Assessment

Rendering is the largest measured recurring CPU cost. The largest single scene mesh is the 245,000-triangle terrain. Detailed scenery and the full-screen finish are the leading GPU optimization targets; these desktop measurements cannot establish which one dominates an Android GPU. Wipeouts add significant body-ground support work. Audio mixing updates are comparatively small.

The original baseline below is a desktop diagnostic pass at phone-sized resolution; a subsequent real-phone trial is reported separately. The test browser reports ANGLE SwiftShader (software Vulkan). No physical phone was connected for those desktop measurements. Browser frame submission time is not presented frame time, and it must not be inverted into a claimed FPS.

## Changes included

- Shared circular rolled-curb profile with a nearly flush asphalt toe. Ten-foot circular returns at both footpath entrances; visible concrete and rideable contact agree. Old overlapping path ends trimmed.
- Ramp support tucked beneath a three-inch plywood lip; all four boards launch in the automated approach test. Upright obstacle remains solid and unmoved.
- Includes the quieter repeating wheel chatter and seam tapping from Build109, and its rideable curbs/footpath. Dirt contact still crashes; airborne dirt crossing remains possible.
- Curb vertex sharing reduces those position/normal/index buffers from **4,182,912 to 1,128,816 bytes**, saving **3,054,096 bytes (73%)** without changing their contact surface.
- Crash materials are precompiled with the actual scene lighting. The controlled first-wipeout test previously created six shader programs; it now creates none. More programs are prepared during loading instead.
- The full-screen finish skips eight neighboring texture samples when the approved mode gives their blur blend zero weight. The color treatment remains in place. An independent 256×256 diagnostic texture test matched every output byte in both visual modes (65,536 pixels per mode), with a live WebGL context.
- A crash-pose cache experiment did not show a reliable improvement and was removed. Exact contact and approved crash motion remain unchanged.

## Final stripped-scene Galaxy A17 measurement — September 15

Samsung SM-A176U1, Android 16, Mali-G68, Chrome152. Portrait viewport 384×692 CSS pixels; actual drawing buffer 576×1038. Approximately 3.5 GiB OS RAM. Charging; final battery temperature 35.2°C. GPU timer queries unavailable. Wireless Chrome debugging adds some overhead.

The final candidate removes all three off-road spoil piles and the cabinet-front/spare loose blocks, plus their extra contact and cast-shadow processing. Standalone vegetation remains absent. Terrain with its road-distance detail fade, perimeter woods, houses, utilities, road obstacles and ramp blocks remain. The package contains 77 files / 83,154,861 bytes.

An earlier test with an old Build94 game tab open had only about 40 MB available and severe stalls. After closing duplicate tabs, a fresh scene was tested. Do not treat the earlier pressured run or the interrupted Build110 attempt as a controlled A/B comparison. Final available RAM after testing was about 357 MiB, with 1.89 GiB swap free. No measured claim of a general FPS improvement is made.

Final cul-de-sac gameplay and ensuing dirt wipeout:

| Category | Riding median / p95 | Wipeout median / p95 |
|---|---:|---:|
| Animation-frame interval | 33.4 / 66.7 ms | 33.4 / 66.6 ms |
| Total measured CPU | 14.4 / 46.3 ms | 24.1 / 48.8 ms |
| Draw CPU, including contact | 12.7 / 42.9 ms | 22.0 / 48.2 ms |
| Rider-ground contact | 0.0 / 0.1 ms | 13.7 / 36.2 ms |
| Audio update | 0.2 / 1.3 ms | 0.3 / 0.8 ms |

259 riding frames and 108 crash frames. Typical cadence is approximately 30 Hz, with slower frames; this is not a stable 60 FPS build. The uncontrolled rider eventually left pavement and ended normally with DIRT, not a browser crash. No WebGL context loss occurred. One riding interval reached 333 ms; the test includes a scripted reposition into the cul-de-sac, so this is not a clean uninterrupted lap.

A separate **40-second render-only sweep** followed the last 135 m of the route into the house corner and past it. Rider/car positions and camera followed the route, while physics was paused to prevent an unattended dirt crash. It recorded 1,438 draws without context loss. In successive ten-second sections, median draw CPU was 12.9, 10.3, 10.2 and 10.2 ms; p95 was 29.3, 23.4, 13.9 and 13.9 ms. Submitted geometry peaked at about 1.10 million triangles. Program count stayed at 245 throughout: there was no new shader compilation burst at the houses. Draw-to-draw intervals are diagnostic, not a full-game FPS result. Initial route/camera reset is included. A second sweep captured house-approach images; screenshot readback makes that second sweep unsuitable for timing.

The build survived these short phone tests, but stutter remains. Exact body-ground support is the clearest measured wipeout cost. Terrain, house batches and streetlights are still substantial rendering loads. A full manually ridden circuit, extended thermal test, iPhone/PWA test and headphone mix approval remain outstanding.

## Earlier desktop CPU comparison (before scenery removal)

Same Chromium executable, 430×850 CSS viewport, 645×1275 drawing buffer, same board/rider, fixed camera setup and time per scene. Each row contains 45 samples after ten warmup draws. Draw includes rendering submission and contact work; those categories must not be added together. Audio is measured separately.

The Build111 column was captured after geometry and shader-warmup changes, before the final unused-sample shader branch. It is a comparable CPU baseline, not a claim about that branch's GPU improvement.

| Scene | Build110 draw median / p95 | Build111 draw median / p95 | Build111 audio median / p95 |
|---|---:|---:|---:|
| Straight, sunset | 4.7 / 5.6 ms | 4.9 / 6.3 ms | 0.1 / 0.2 ms |
| Cul-de-sac, sunset | 3.7 / 4.8 ms | 4.0 / 4.8 ms | 0.1 / 0.2 ms |
| Cul-de-sac, night | 4.0 / 5.3 ms | 3.8 / 4.8 ms | 0.1 / 0.2 ms |
| Wipeout | 6.2 / 8.4 ms | 6.4 / 8.4 ms | 0.1 / 0.4 ms |

There is **no demonstrated broad recurring CPU speedup** in these short runs. Most differences are small and mixed. The concrete gains are memory reduction and moving shader creation out of the first crash. Wipeout body support alone measures 2.9 ms median / 4.7 ms p95 in this test, making it the clearest remaining action-specific CPU target.

Cold local readiness was approximately 97 seconds in both runs on the software renderer. This is not a phone loading estimate or an internet download benchmark. Shader warmup and software rendering make this environment unsuitable for predicting those times.

## Where the rendering work goes

| Item | Observed size / cost | Interpretation |
|---|---:|---|
| Entire ground mesh | 245,000 triangles | Largest individual mesh; broad bounds prevent useful per-lot frustum culling. A future render-only tiling/LOD pass deserves testing. Preserve the contact surface. |
| Large combined house-area mesh | 109,813 triangles | A large distant scenery batch. Splitting by house or distance could improve culling; verify visual/shadow equivalence first. |
| Ten streetlight main meshes | 19,624 triangles each | Approximately 196,240 triangles before glass and other parts. They share geometry storage, but every visible instance still requires rendering. Good candidates for distant LODs. |
| Asphalt with repairs | 53,592 triangles | Preserve localized divot/patch geometry and physical response. Avoid uniformly increasing subdivision. |
| Sampled complete views | 157–232 draw calls; roughly 796k–936k submitted triangles | Includes renderer passes, not simply unique world triangles. Geometry remains substantial for a phone. |
| Full-screen illustrated finish | One center plus eight neighbor reads in the prior shader | Approved mode does not use the neighbor blend; the final branch avoids those redundant reads. Other finish work remains. |

In the earlier pre-strip inventory, scene geometry attributes/index storage fell from about **64.0 MB to 60.4 MB**. This inventory excludes morph arrays, textures, JavaScript objects, driver overhead and render targets; it is not total application memory. Renderer counters show around 1,004 geometries and 111 textures, but texture count is not texture memory.

Recorded audio uses the existing 25 decoded samples / nine loops and about 13.4 MB of decoded sample storage, plus streamed music and browser overhead. No new recordings or loops were added. Music remains emitted from the car's side windows.

The earlier pre-strip package was about **83.3 MB across 81 files**, including the album. Package size is not startup transfer: later songs are not all fetched as part of initial scene construction. Several compressed models are 2.6–6.5 MB each, so downloads/decompression and shader warmup still deserve cold-load phone measurement.

## Validation and next measurement

The desktop scene benchmarks completed without browser exceptions. Functional checks cover rendered paved-point classification, both entrances, and all four ramp launches. Sunset/overhead/rider-height images were visually inspected. Final checks also passed all eight board/entrance crossings and 136 sampled paved points. Both entrances were inspected at sunset and night. Maximum centerline height change over each 4 cm sample was about 1 cm inside the returns. The separate finish test matched pixels in both modes; its timings were too small/noisy to support a GPU speedup claim.

For a connected Android phone, test a cold opening, selection, a full circuit including the cul-de-sac, ramp, rope release onto the path, and a wipeout/retry. Repeat after five minutes to expose heat-related slowdown. Use both short and long rope, and include Black/Element plus the longboard. Test landscape changes and a background/foreground return separately.

Open the live build with `?v=111&profile=1` to collect the existing opt-in recorder. After the run ends, **Save performance report** exports frame intervals, CPU categories, stalls, resource timings and GPU timings where supported. A normal play link has no profiler overlay. Sustained thermal behavior, phone audio/headphone balance and iPhone/PWA behavior remain unverified. The short Android trial above does not establish full-circuit or sustained performance.

Highest-value next work: compare terrain culling and streetlight LOD independently on the phone, then investigate exact wipeout support cost. Keep the accepted artwork and handling stable while measuring one change at a time.

Final phone evidence: `phone-111-reference.json`, `phone-houses-111-clean.json`, and `scenery-audit.json` under `docs/performance111` in the release. Earlier desktop evidence: `work/playtest111/performance-110.json`, `performance-111.json`, `check.json`, `finish-check.json`, CDP profiles and path screenshots in the same directory. Full source routing is documented in `transitions111/NOTES.md`.

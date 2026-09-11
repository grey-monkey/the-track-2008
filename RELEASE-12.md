# Study 12 — layered woodland and colored distance

A Firewatch-inspired refinement of the illustrated memory: three irregular woodland horizons, blue-to-violet-to-muted-rose atmospheric depth, and slightly quieter ochre clay. The painted sky, soft moving shadows, sound, controls and tow mechanics are retained.

The houses and ground now share a distance-color function. Nearby surfaces retain cool contrast, while distant forms move toward warmer violet air. Roof-edge wash remains selective rather than applying depth-of-field blur. The forest receives restrained low mist and retains more of its silhouette color instead of disappearing into a single gray band.

The three far woodland layers are each merged into one draw, reusing the existing painted tree asset. This is scenic background treatment; road geometry, walking-path geometry and the three-house placement were not changed.

Research reference: [Harry Alisavakis's Firewatch-style multicolored fog implementation](https://halisavakis.com/my-take-on-shaders-firewatch-multi-colored-fog/). It illustrates how depth can drive both color and opacity. This implementation uses its own analytic color progression and existing artwork, not copied Firewatch assets or tutorial code.

Validation: final standalone preview loaded and entered play without browser errors. Entrance, hill-facing woodland and sloped-road/house views were inspected, including 393 × 740 portrait views. Local packaged desktop benchmark: 7.0 ms median / 8.9 ms p95 over 180 frame intervals; this is not a physical-phone measurement. The bundle is 23,555,773 bytes. No additional art download is needed.

An initial woodland shader compilation issue was corrected before these final checks. No simulation or sound changes were made in this pass. Physical phone smoothness and visual preference remain for user review.

[Play Study 12](https://grey-monkey.github.io/the-track-2008/painted.html?v=12)

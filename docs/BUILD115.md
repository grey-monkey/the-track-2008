# Build115 — Android tire-loop stability

Source: audio-loop115/memory-sound.js, inheriting Build114 audio recovery and all approved visual/gameplay behavior. Package: work/playtest115/package.cjs.

## Observed failure on Grey's Galaxy A17
Chrome played selection audio, then the final mix produced NaN samples with AudioContext still running, all 25 recordings loaded, master gain active, and no JavaScript exception. Per-node probes isolated the contamination to the car-tire loop/filter path. Decoded PCM is finite and bounded (peak 0.6501). Fresh isolated tire sources through stationary or automated filters failed around the first 4.9-second loop boundary. Explicitly using the entire clip duration also failed. Removing 128 frames or ending on a complete 128-frame boundary remained finite through repeated wraps. This establishes a device/browser loop-boundary failure; the internal Chromium defect is not identified.

## Change
Set only the car-tire source's loopEnd to floor(buffer.length / 128) * 128 / sampleRate. On the tested phone this trims 64 decoded frames (1.333ms) from the loop endpoint. Preserve the recorded file, filter, gain, panning and speed-dependent playback rate. Other loops and the album are unchanged. No polling, duplicate nodes, new dependencies or per-frame workload.

## Validation
See work/playtest114/phone-selection.json, phone-isolation.json, phone-aligned-trials.json for failing baseline and controlled isolation. Build115 full-phone repeat/reload and desktop recovery results are recorded in work/playtest115. Physical phone output is measured from the final mix; this does not substitute for Grey's headphone listening approval.

## Additional phone observation
The second full reload encountered severe memory pressure (MemAvailable 20,548 kB). A duplicate older game tab was closed. The diagnostic target subsequently decoded all 25 samples and streamed the album beyond two minutes. This reload stall is separate from the reproducible invalid-audio loop defect; do not claim a general memory/performance fix.

Desktop failure injection still passes: rejected media start, two sample fetch failures, suspended context, and policy-denied play recover without duplicate loops.

Phone validation: first complete cycle passed 20 selection and 35 ride measurements, all finite, nine loops, no errors/context loss; radio advanced past 40 seconds. The second reload had stable selection output, later loaded all 25 samples and radio reached 154.36 seconds (running, unpaused, no errors). Wireless ADB disconnected before the second automated cycle could complete and persist its final signal checks. Therefore only the first cycle is recorded as a full automated pass. The interrupted second-cycle test process was stopped; the phone's power/volume settings were not changed.

# Build114 — recoverable mobile audio startup

Based on Build113; no visual, gameplay, sound-level or spatial-mix changes.

- AudioContext.resume and the requested music play begin synchronously inside a real gesture, without waiting for resume before calling media.play.
- Pointer/key gestures during a ride can resume an interrupted context and retry blocked playback; previously gesture recovery only ran on selection.
- A wanted-but-paused album retries transient play failures with a bounded backoff (three attempts). Autoplay-policy denial waits for a user gesture. A transient media error retries the same song rather than skipping the intended album opener.
- Missing effect recordings get one automatic retry, a 15-second fetch deadline, and a later gesture can retry only missing samples. A failed load is no longer permanently cached as complete. Existing decoded buffers and loop nodes are reused.
- Mute and hidden-page gating remain authoritative. Music remains off in selection; the parked engine/exhaust remain enabled there after unlock.

Source overrides audio-recovery114/{memory-sound,car-music,portrait-selection-app}.js. Package work/playtest114/package.cjs. Fault-injection browser test work/playtest114/recovery.cjs covers a rejected play, a sample download failing twice, resuming a suspended context during riding, policy-denial gesture recovery and duplicate-loop prevention. Physical Android interruption/network behavior still needs user validation; these tests cannot identify the exact failure on Grey's prior run.

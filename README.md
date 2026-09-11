# THE TRACK: 2008 — Physics Prototype 0.2

This is the second **feel prototype**, not an art prototype. It is intentionally simple. The goal is to answer one question before we invest in finished art: **is being towed behind the Mercedes fun and readable on a phone?**

## What is in this build

- Portrait-first responsive canvas game.
- Web/PWA architecture intended to behave the same on iPhone and Android.
- Rebuilt Track geometry based much more closely on the annotated aerial: long western side, real cul-de-sac detour, lower connector, slight downhill Copperleaf section, then uphill return.
- Slower Mercedes starts and much more deliberate speed reduction on curves / through the cul-de-sac.
- Hard rope-length tether plus stronger tow pull so the rider reads as being dragged by the Mercedes rather than racing it.
- Camera now frames the tow relationship (rider → rope → car) rather than simply following rider velocity.
- Rope physics with slack, tension and different hidden lengths selected by a SHORT ↔ LONG slider.
- Drag left/right to carve.
- Hold to crouch/stabilize.
- Release after a hold to ollie **only when both the rider and board can ollie**.
- Quick upward swipe to throw the tow handle.
- Basic wobble, curb, dirt and manhole interactions.
- Hidden rider/board differences, including DOG's speed-related loss of control and the nice longboard's high-speed stability.
- Two prototype starts: FULL LAP and CUL-DE-SAC, so the signature turn can be tested repeatedly without waiting through a lap.
- Placeholder procedural wheel/engine/tension audio. No copyrighted music or finished sound design.

## Rider / board rules currently encoded

The game itself does not show these stats. They exist only under the hood.

- DOG cannot ollie and progressively loses control authority as speed rises.
- NICE LONGBOARD cannot ollie and has the best high-speed stability.
- HAND-ME-DOWN longboard cannot ollie.
- CRUISER / SURFER can ollie.
- STREET DECK can ollie.

## Run locally

Any simple static web server works. For example, from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Opening `index.html` directly also runs the core prototype in most desktop browsers, but PWA/offline features require a web server (or GitHub Pages).

## GitHub Pages

1. Put the contents of this folder at the root of a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Set Pages to deploy from the main branch/root.
4. Open the generated HTTPS Pages address.

HTTPS is important for installable PWA behavior.

## iPhone test flow

1. Open the GitHub Pages URL in **Safari**.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. Launch **The Track** from its Home Screen icon.

The prototype includes Apple standalone/PWA metadata, safe-area-aware UI and a portrait manifest. Real iPhone testing is still required before we consider the experience validated.

## Android test flow

Open the same GitHub Pages URL in Chrome. The exact same core build should run there. Later, this same web game can be wrapped as an Android APK / Google Play app without creating a second game codebase.

## What Grey should judge first

Do **not** worry about how ugly it is. v0.2 specifically attacks the major v0.1 problems Grey found: weak tow feeling, inaccurate/over-curvy course geometry, excessive curve speed, impossible cul-de-sac, and a camera that did not frame the tow correctly. After several cul-de-sac attempts and at least one full lap, the useful questions are:

1. Does left/right carving feel connected to body weight, or does it feel like steering a car?
2. Can you read trouble early enough from the rope, car and rider motion?
3. When the curb starts coming, does the upward rope-release flick feel instinctive?
4. Does the long rope feel meaningfully different rather than merely harder?
5. Does crouching actually feel like a useful "hold this together" action?
6. Is the cul-de-sac tense/fun, or frustrating/unreadable?
7. Does the Mercedes feel human enough in its line, or annoyingly random?
8. Is the trailing portrait camera calm and atmospheric, or does it read like a cheap racing game?
9. Do DOG and the different boards feel different even though no stats are shown?
10. Most important: after crashing, do you immediately want to try it again?

## Debug mode

Add `?debug=1` to the URL to expose temporary developer readouts for speed, hidden rope length, tension, wobble and road position. These are for tuning only and are not part of the intended game interface.

Example:

`https://YOUR-NAME.github.io/YOUR-REPO/?debug=1`

## Prototype philosophy

We will tune the physics from real phone play before polishing the world. Finished characters, the actual Mercedes art, sunset/night lighting, the model house, crew scenes, Caribou, progression and memory events come after the tow loop proves itself.

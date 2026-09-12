# The Track: 2008 — Study 40

[Play the current game](https://grey-monkey.github.io/the-track-2008/painted.html?v=40).

The approved neighborhood environment is now integrated with the Mercedes and native skater. See [Release 40](RELEASE-40.md) for changes and validation; asset credits are retained in the game’s How to ride panel.

---

# The Track: 2008 — prototype 0.3.3

A new, dependency-light web/PWA prototype. The v0.1/v0.2 implementation is not reused.

## Play

Choose a rider, board and visual rope length. Drag sideways to carve; hold still to crouch; lift after a crouch to ollie when the rider and board permit it. Flick upward to throw the rope. The launch is gentle, but turns need active carving: momentum can swing the rider into a curb or the car. Car speed is 5% above v0.3.

Keyboard: Left/Right carve, Space crouch and release to ollie, Up throws the rope, Escape pauses.

SALLY drives when DOG rides. DOG drives for the other riders. SALLY is faster; DOG sometimes has a faster straight-line pace. A run continues across laps until a wipeout. A safe release leads to a regroup and a new tow from that location; a new run starts at the original line.

## Run locally

Play at https://grey-monkey.github.io/the-track-2008/ .

With Node.js installed, run `npm start` in this directory and open `http://127.0.0.1:4173`. No dependency installation is needed. GitHub Pages publishes the static files at the repository root. All runtime libraries are vendored; the game does not need a CDN.

The existing service-worker URL is retained so installed copies can upgrade from v0.1/v0.2. The upgrade replaces only Track caches and refreshes legacy pages after the new assets are cached. Earlier prototype source remains available in repository history; the old `game.js` and `styles.css` are no longer loaded by the new entrypoint.

## Validation

`npm test` runs 13 physics/gesture checks. `node tests/offline.test.mjs` checks offline asset coverage, cache isolation and the PWA manifest. Details are in `docs/VALIDATION.md`.

Append `?debug=1` to expose the top-down map, motion values and repeatable cul-de-sac tests. These are developer tools and are hidden from normal play.

## Scope

This is a feel prototype. The Mercedes, rider, landscape, crashes and sounds are simplified. It does not include the full crew gathering, Sprad's passenger scene, rare memory events, soundtrack, progression, APK packaging or finished character likenesses. Actual Samsung A17 and iPhone Safari/Home Screen validation remains necessary.

Three.js 0.180.0 is included under its MIT license in `vendor/LICENSE-three.txt`.

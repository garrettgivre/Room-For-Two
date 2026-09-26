# Room for Two — notes for Claude

A cozy shared 3D room + virtual pet for two people (the user, Garrett, and his boyfriend Beau). Mobile-first web app, installable as a PWA.

- Live: https://garrettgivre.github.io/Room-For-Two/ (GitHub Pages, deployed by `.github/workflows/pages.yml` on push)
- Work branch: `claude/room-for-two-github-migration-m7is0v` (it is also the repo's default branch; there is no `main`). Push there; Pages deploys from it.
- Origin: started as a claude.ai artifact, moved here.

## Files
- `index.html` — the whole app (~330 KB): CSS, a custom WebGL2 engine, game logic, UI. No build step, no framework.
- `firebase-config.js` — Firebase web config (public by design). Shared rooms sync through Firestore doc `rooms/<code>`; rules in `firestore.rules`. `null` config = solo mode.
- `vendor/` — Firebase compat SDK 10.14.1 (loaded only when a config exists).
- `sw.js` + `manifest.webmanifest` — offline cache (stale-while-revalidate) and install metadata. Debug menu "Refresh app" unregisters the SW and clears caches.
- `assets/` — logo, app icons (from the two-heads pet icon, never crop the logo's door), `r42-bubble.woff2` font, `icons/*.webp` (UI icons, set icons, emote bubbles + symbols).
- `tools/font/` — scripts that traced the user's bubble-letter specimen into the font.

## How index.html is organised (search for these)
- `WebGLRenderer` — custom three.js-like engine (`window.THREE`). Linear HDR, GGX, ceiling point light (`sun` with `userData.point`) with perspective shadows, lamps as point lights, SH ambient from the sky, room/contact AO, bloom + ACES. `scene.userData.lighting` = `LIT`.
- Lighting is locked to the Daydream look (`SKY_LIGHT.daydream`) and never changes with the sky.
- Sky: `SKY_TIMES` + `updateSky()` — backdrop follows **US Central time**, blending night → dawn → daydream → golden → twilight. No sky picker. Debug slider previews hours.
- Textures: `FLOOR_FN`, `WALL_FN`, `SKY_FN` (canvas-painted, generated on demand by `roomTexture`).
- Furniture: `CAT` (catalog), `BUILD` (models), `makePiece` (adds bevels + procedural surface detail), `renderThumb` (thumbnails; also used for props via `'toy:'+id`).
- Decorate menu: `renderDeco` (search `decoQ`, kind `decoFn`, set `decoSet`, `DECO_SORTS`), a scrolling grid whose thumbnails are queued by an IntersectionObserver (`queueThumbsFirst`) so it scales to a big catalog. `bindCard`: tap adds, hold (touch) or drag (mouse) picks up and places into the room. New catalog items only need a `CAT` entry + `BUILD` model; new kinds go in `FUNCS`, new sets in `SETS` (with a `set-*.webp` icon).
- Pet: `PET_PALS`, `PST` (8 stages: Egg, Baby, Toddler, Child, Teen, Young adult, Adult, Elder; `STAGE_XP`), `buildPet`, `updatePet`. Two-headed jelly creature: lime + blue heads, one big eye each, antenna tufts. Rig has attachment sockets `R.sock.*` (hatL/hatR, faceL/faceR, neck, back, waist, handL/handR, footL/footR) reserved for future clothing.
- Pet animation layer: `ACTS_ANIM` + `petAct(k)` (dance, stretch, nuzzle, curious, sit, tumble, sneeze, slump, shrug, doze, spinjump, and held poses hold/hug/wand/press/stroke/munch/scrub/brush/spritz/lather/soak). `idleAct` chooses by mood, stage and personality.
- Seats: seat items carry `seat:[cushion y, forward z, ...x spots]` in `CAT` (new seats need it). `goSit` walks the pet to the front of a seat, mode `perch` hops it up (`seatK`, `seatY`), sits with kicking legs, then hops off; `leaveSeatNow` handles being pulled away (toys, food, naps, the seat being stored or moved).
- Care system (from the user's old game "Phraipets"): `TIERS` (mood names), Affection (no timer), `spiritOf`, overfeeding to 120 (Bloated), `PERSONALITIES`, `ITEMS` (food/groom/toy), hearts economy, `checkDaily` gift per person.
- Props: `TOY_BUILD`, `FOOD_BUILD` (pieces in `userData.bites`, eaten one group at a time; drinks drain `userData.level`), `GROOM_BUILD`; scenes in `TOY_PLAY` / `GROOM_PLAY` / `TOY_PLAY.__food`, run by `startToyPlay(id)` / `updateToyPlay`.
- Emotes: `emote(ch)` maps an emoji key through `EMO` to a bubble (speech/thought/shout) + an icon from `assets/icons`.
- State: `defaultState`, `normalize` (migrates old saves — keep it backward compatible), `saveSoon`/`flush`, `connectShared`.

## Engine gotchas
- The mini engine is not full three.js: e.g. `Vector3` has no `lerp`; the name `skyTex` is already taken (porthole texture).
- Edits are usually done with Python string replacement asserting each target occurs exactly once.

## Testing (what has worked)
- Serve: `python3 -m http.server 8765` from the repo root (it dies between sessions; restart it).
- Playwright is global (`$(npm root -g)/playwright`); Chromium at /opt/pw-browsers. Launch with `--use-gl=swiftshader --enable-unsafe-swiftshader`.
- Route `**/firebase-config.js` to `window.R42_FIREBASE=null;` and abort `**/sw.js` so tests are solo and uncached. Set `localStorage.r42coach='1'` to skip the intro.
- For inspection, temporarily add `window.__T={pet,get state(){return state},...}` before `const clock=` and **remove it before committing** (check `grep -c __T index.html` is 0).
- Syntax check: `node -e` with `new Function()` over each `<script>` block.
- Software GL is slow: wait on simulated time (`toyPlay.t`) instead of fixed sleeps.

## The user's preferences
- Brand: the sticker logo; deep-purple outlines (#3B1273), white sticker edges, glossy jelly-candy look, speckles. Palette pink #FF3D9A, lime #A6E22E, cyan #3EC8F2, sun #FFD21F, orange #FF8A1C, grape #9B4DF2.
- The only font is R42 Bubble. No vanilla fonts.
- **Never use a four-point star/sparkle shape** (reads as an AI logo). Five-point stars are fine.
- Avoid emoji in the UI where art exists; the user generates art in ChatGPT from prompts Claude writes (glossy jelly style, transparent PNG), and Claude cuts it out, trims it and converts it to WebP.
- Refine rather than redesign when asked for polish. High-quality 3D models. Show screenshots of results.
- Cozy, not RPG: battles, weapons, crafting and multiple pets from Phraipets were intentionally left out.
- Commit messages end with the Co-Authored-By / Claude-Session lines from the system reminder; no model names in repo content.

## Possible next steps discussed
- Clothing/accessories using the rig sockets.
- Pet portrait art per stage for the pet card; item art; wall-art posters; backdrop paintings (prompts were written).
- Exploration as a future expansion.

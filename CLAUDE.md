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
- Tiles (Sims-style): floor = 8x8 tiles `state.tf`, walls = 4x8 full-height columns `state.tw` (normalize migrates old `floor`/`wall`). `TILESETS` via `tileset(kind,k,{n,span,mode,paint|img})`: modes `repeat` (span tiles, grid-aligned), `border` (floors, 3x3 source, edges/corners/inner corners by quadrant) and `run` (walls, 3-column source with end caps). Painters: `FLOOR_FN`/`WALL_FN` (the originals, span 4) + `TILE_PAINT`; image sets go in `TILE_ART` (made with `tools/tiles/make_tile.py`, guide + ChatGPT prompts in `tools/tiles/README.md`). `syncTiles` rebuilds merged per-set meshes (`buildFloorTiles`/`buildWallTiles`); the old floor/wall planes stay invisible for raycasts. Painting: `startBrush`, paint bar `#paintbar` (Tile/Area/Room, undo), strokes in `startStroke`/`moveStroke`/`endStroke`.
- Sky textures: `SKY_FN` (canvas-painted, generated on demand by `roomTexture`).
- Furniture: `CAT` (catalog), `BUILD` (models), `makePiece` (adds bevels + procedural surface detail), `renderThumb` (thumbnails; also used for props via `'toy:'+id`).
- Build vs live mode: furniture can only be selected/moved while the Decorate tab is open (`pointerdown` checks `openTab`). One undo history for all build changes: `beginBuild()`/`endBuild(U)` around an action, `undoBuild()` (Decorate header `#decoUndo`, paint bar `#pbUndo`); hearts are adjusted by the action's delta; cleared when a partner's change arrives (`adoptRemote`).
- Decorate menu: `renderDeco` (search `decoQ`, kind `decoFn`, set `decoSet`, `DECO_SORTS`), a scrolling grid whose thumbnails are queued by an IntersectionObserver (`queueThumbsFirst`) so it scales to a big catalog. `bindCard`: tap adds, hold (touch) or drag (mouse) picks up and places into the room. New catalog items only need a `CAT` entry + `BUILD` model; new kinds go in `FUNCS`, new sets in `SETS` (with a `set-*.webp` icon).
- Pet: `PET_PALS`, `PST` (8 stages: Egg, Baby, Toddler, Child, Teen, Young adult, Adult, Elder; `STAGE_XP`), `buildPet`, `updatePet`. Two-headed jelly creature: lime + blue heads, one big eye each, antenna tufts. Rig has attachment sockets `R.sock.*` (hatL/hatR, faceL/faceR, neck, back, waist, handL/handR, footL/footR) reserved for future clothing.
- Pet animation layer: `ACTS_ANIM` + `petAct(k)` (dance, stretch, nuzzle, curious, sit, tumble, sneeze, slump, shrug, doze, spinjump, and held poses hold/hug/wand/press/stroke/munch/scrub/brush/spritz/lather/soak). `idleAct` chooses by mood, stage and personality.
- Living in the room: `pickUse` (idle chooser, weighted by stats) picks from `USE_ITEM` (per item) / `USE_FN` (per catalog fn). Kinds: `perch` (seats, beds, rocking horse via `CAT.perch` {y,z,x,w,bz,fz,top,fe,side,se,foot,kind:'sit'|'bed'|'ride'}; `perchSpots` only returns spots the pet fits, from `PET_DIM` per stage), `nap` (pet beds), `stand` (walk up, face it, play a `u_*` anim from `ACTS_ANIM`), `wall`, `rug`. Use state: `pet.use`, `startUse`/`updUse`/`endUse` (lamp `flick`, `wob`, emotes, `then`). Beds: nap when tired, else bounce. Walking goes round furniture: `findPath` (A* on a 32x32 `navGrid`, string-pulled), `spotClear` keeps use spots off other furniture. All of it is cosmetic (no stat changes) so both devices can run their own pet AI safely.
- Town & shops: fixed door on the left wall (`DOOR`, `doorG`, `openDoor`) opens the map overlay (`#map`, pins `data-go`); `travelTo(dest,then,focus)` fades (`#travel`) and swaps location. `away` = current shop from `buildShop(key)` ({objs, items, extra blockers, keeper, tf, tw}); home stuff hidden via `itemRoot.visible`. Location-aware helpers: `roomObjs()`, `roomItem(id)`, `defOf(k)` (CATMAP or shop `FIX`), `curTF()/curTW()` — pet AI, nav, lighting and tiles all go through them. `SHOPS` (snack/salon/toys: tiles, `layout`, keeper, lines), `FIX` fixtures (shelfunit, counter, display, cooler, sign) with product `slots` stocked by `buildShop`, `KEEPERS` (baker, stylist, toymaker: procedural models with `upd(dt,t,act,p,talk)`), `keeperReact`/`keeperSay` (`#kbub`), products → `openProduct`/`buyItem` (`#shopcard`). Buying moved from the pet sheet to the shops (unowned items link to their shop via `SHOP_FOR`). Location isn't saved; each device starts at home.
- Ownership & build shops: furniture is owned stock (`state.fown`, bought at Cozy Nest `SHOPS.furn`, placed from Decorate; Store returns it to storage). Tile sets must be unlocked (`state.town`, `STARTER_TILES` free) at Hammer & Hue (`SHOPS.build`), which also sells door styles (`state.downs`, current `state.door` {s,w,u}; `buildDoorModel`), windows (dynamic CAT entries `win_<f|w>_<set>`, `buildWindowModel`, fn 'window', set 'build') and room size (`state.size` 8/10/12, `setRoomSize`, `growTiles`). Door/window styles take colours from `stylePal(key)` and patterns from `stylePat(key)` of their tile set. Offers: `openOffer(factory)` with `offerItem/offerFurn/offerTile/offerDoor/offerSize`; `goBuy(k)`/`goBuyTile(key)` travel to the right shop. Shop catalogs open as `openTab==='shopcat'` (furniture reuses `renderDeco` in `decoMode='buy'`, build uses `renderBuildCat`). Debug menu has +20 hearts.
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
- More shops (furniture, clothing), shop art for the map, prices/stock that change.
- Clothing/accessories using the rig sockets.
- Pet portrait art per stage for the pet card; item art; wall-art posters; backdrop paintings (prompts were written).
- Exploration as a future expansion.

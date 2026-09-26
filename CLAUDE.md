# Room for Two — notes for Claude

A cozy shared 3D room + virtual pet for two people (the user, Garrett, and his boyfriend Beau). Mobile-first web app, installable as a PWA.

- Live: https://garrettgivre.github.io/Room-For-Two/ (GitHub Pages, deployed by `.github/workflows/pages.yml` on push)
- Work branch: `claude/room-for-two-github-migration-m7is0v` (it is also the repo's default branch; there is no `main`). Push there; Pages deploys from it.
- Origin: started as a claude.ai artifact, moved here.

## Files
- `index.html` — the whole app (~460 KB): CSS, a custom WebGL2 engine, game logic, UI. No build step, no framework.
- `firebase-config.js` — Firebase web config (public by design). Shared rooms sync through Firestore doc `rooms/<code>`; rules in `firestore.rules`. `null` config = solo mode.
- `vendor/` — Firebase compat SDK 10.14.1 (loaded only when a config exists).
- `sw.js` + `manifest.webmanifest` — offline cache (stale-while-revalidate) and install metadata. Debug menu "Refresh app" unregisters the SW and clears caches.
- `assets/` — logo, app icons (from the two-heads pet icon, never crop the logo's door), `r42-bubble.woff2` font, `icons/*.webp` (UI icons, set icons, emote bubbles + symbols).
- `tools/font/` — scripts that traced the user's bubble-letter specimen into the font.
- `tools/tiles/` — `make_tile.py` (turns a ChatGPT image into tile art in `assets/tiles/`) + `README.md` (sizes, prompt templates, lessons learned).
- `tools/tiles/import_sets.py` + `art_fix.py` — batch importer for themed room sets (seam repair, rug rebuild for border mode, banner → run paneling). Room sets 01–10 (Bubblegum diner, Moon motel, Aquarium, Toybox, Cyber bedroom, Fruit punch, Cloud club, Indoor garden, Arcade carpet, Candy bathroom) came through it: 4 tile sets each (floor, `…rug` border floor, wallpaper, `…panel` full wall or `…run` paneling).
- `assets/tiles/` — image tile sets registered in `TILE_ART`.

## How index.html is organised (search for these)
- `WebGLRenderer` — custom three.js-like engine (`window.THREE`). Linear HDR, GGX, ceiling point light (`sun` with `userData.point`) with perspective shadows, lamps as point lights, SH ambient from the sky, room/contact AO, bloom + ACES. `scene.userData.lighting` = `LIT`.
- Lighting is locked to the Daydream look (`SKY_LIGHT.daydream`) and never changes with the sky.
- Sky: `SKY_TIMES` + `updateSky()` — backdrop follows **US Central time**, blending night → dawn → daydream → golden → twilight. No sky picker. Debug slider previews hours.
- Tiles (Sims-style): floor = N×N tiles `state.tf`, walls = 4×N full-height columns `state.tw` (N = `state.size`, 8/10/12; `GRID`/`HALF` are `let` and change with `setRoomSize`) (normalize migrates old `floor`/`wall`). `TILESETS` via `tileset(kind,k,{n,span,mode,paint|img})`: modes `repeat` (span tiles, grid-aligned), `border` (floors, 3x3 source, edges/corners/inner corners by quadrant) and `run` (walls, 3-column source with end caps). Painters: `FLOOR_FN`/`WALL_FN` (the originals, span 4) + `TILE_PAINT`; image sets go in `TILE_ART` (made with `tools/tiles/make_tile.py`, guide + ChatGPT prompts in `tools/tiles/README.md`). `syncTiles` rebuilds merged per-set meshes (`buildFloorTiles`/`buildWallTiles`); the old floor/wall planes stay invisible for raycasts. Painting: `startBrush`, paint bar `#paintbar` (Tile/Area/Room, undo), strokes in `startStroke`/`moveStroke`/`endStroke`.
- Sky textures: `SKY_FN` (canvas-painted, generated on demand by `roomTexture`).
- Furniture: `CAT` (catalog), `BUILD` (models), `makePiece` (adds bevels + procedural surface detail), `renderThumb` (thumbnails; also used for props via `'toy:'+id`).
- Build vs live mode: furniture can only be selected/moved while the Decorate tab is open (`pointerdown` checks `openTab`). One undo history for all build changes: `beginBuild()`/`endBuild(U)` around an action, `undoBuild()` (Decorate header `#decoUndo`, paint bar `#pbUndo`); snapshots hold items, tiles, `fown` and `door`; cleared when a partner's change arrives (`adoptRemote`).
- Decorate menu: `renderDeco` (search `decoQ`, kind `decoFn`, set `decoSet`, `DECO_SORTS`), a scrolling grid whose thumbnails are queued by an IntersectionObserver (`queueThumbsFirst`) so it scales to a big catalog. `decoMode` 'place' (Decorate: places from storage `state.fown`, owned first, unowned show a Shop tag → `goBuy`) or 'buy' (Cozy Nest catalog). `bindCard`: tap places, hold (touch) or drag (mouse) picks up and places into the room. New catalog items only need a `CAT` entry + `BUILD` model; new kinds go in `FUNCS`, new sets in `SETS` (with a `set-*.webp` icon).
- Pet: `PET_PALS`, `PST` (8 stages: Egg, Baby, Toddler, Child, Teen, Young adult, Adult, Elder; `STAGE_XP`), `buildPet`, `updatePet`. Two-headed jelly creature: lime + blue heads, one big eye each, antenna tufts. Rig has attachment sockets `R.sock.*` (hatL/hatR, faceL/faceR, neck, back, waist, handL/handR, footL/footR) reserved for future clothing.
- Pet animation layer: `ACTS_ANIM` + `petAct(k)` (dance, stretch, nuzzle, curious, sit, tumble, sneeze, slump, shrug, doze, spinjump, and held poses hold/hug/wand/press/stroke/munch/scrub/brush/spritz/lather/soak). `idleAct` chooses by mood, stage and personality.
- Living in the room: `pickUse` (idle chooser, weighted by stats) picks from `USE_ITEM` (per item) / `USE_FN` (per catalog fn). Kinds: `perch` (seats, beds, rocking horse via `CAT.perch` {y,z,x,w,bz,fz,top,fe,side,se,foot,kind:'sit'|'bed'|'ride'}; `perchSpots` only returns spots the pet fits, from `PET_DIM` per stage), `nap` (pet beds), `stand` (walk up, face it, play a `u_*` anim from `ACTS_ANIM`), `wall`, `rug`. Use state: `pet.use`, `startUse`/`updUse`/`endUse` (lamp `flick`, `wob`, emotes, `then`). Beds: nap when tired, else bounce. Walking goes round furniture: `findPath` (A* on a 32x32 `navGrid`, string-pulled), `spotClear` keeps use spots off other furniture. All of it is cosmetic (no stat changes) so both devices can run their own pet AI safely.
- Town & shops: the room's door (`state.door`, default left wall; shops use `DOOR`; `doorG`, `syncDoor`, `openDoor`) opens the map overlay (`#map`, pins `data-go`); `travelTo(dest,then,focus)` fades (`#travel`) and swaps location. `away` = current shop from `buildShop(key)` ({objs, items, extra blockers, keeper, tf, tw}); home stuff hidden via `itemRoot.visible`. Location-aware helpers: `roomObjs()`, `roomItem(id)`, `defOf(k)` (CATMAP or shop `FIX`), `curTF()/curTW()` — pet AI, nav, lighting and tiles all go through them. `SHOPS` (snack/salon/toys/furn/build: tiles, `layout` array or daily function, keeper, lines), `FIX` fixtures (shelfunit, counter, display, cooler, sign) with product `slots` stocked by `buildShop`, `KEEPERS` (baker, stylist, toymaker, cushion, builder: procedural models with `upd(dt,t,act,p,talk)`), `keeperReact`/`keeperSay` (`#kbub`), products → `openProduct`/`buyItem` (`#shopcard`). Buying moved from the pet sheet to the shops (unowned items link to their shop via `SHOP_FOR`). Location isn't saved; each device starts at home.
- Ownership & build shops: furniture is owned stock (`state.fown`, bought at Cozy Nest `SHOPS.furn`, placed from Decorate; Store returns it to storage). Tile sets must be unlocked (`state.town`, `STARTER_TILES` free) at Hammer & Hue (`SHOPS.build`), which also sells door styles (`state.downs`, current `state.door` {s,w,u}; `buildDoorModel`), windows (dynamic CAT entries `win_<f|w>_<set>`, `buildWindowModel`, fn 'window', set 'build') and room size (`state.size` 8/10/12, `setRoomSize`, `growTiles`). Door/window styles take colours from `stylePal(key)` and patterns from `stylePat(key)` of their tile set. Offers: `openOffer(factory)` with `offerItem/offerFurn/offerTile/offerDoor/offerSize`; `goBuy(k)`/`goBuyTile(key)` travel to the right shop. Shop catalogs open as `openTab==='shopcat'` (furniture reuses `renderDeco` in `decoMode='buy'`, build uses `renderBuildCat`). Debug menu has +20 hearts.
- Care system (from the user's old game "Phraipets"): `TIERS` (mood names), Affection (no timer), `spiritOf`, overfeeding to 120 (Bloated), `PERSONALITIES`, `ITEMS` (food/groom/toy), hearts economy, `checkDaily` gift per person.
- Props: `TOY_BUILD`, `FOOD_BUILD` (pieces in `userData.bites`, eaten one group at a time; drinks drain `userData.level`), `GROOM_BUILD`; scenes in `TOY_PLAY` / `GROOM_PLAY` / `TOY_PLAY.__food`, run by `startToyPlay(id)` / `updateToyPlay`.
- Emotes: `emote(ch)` maps an emoji key through `EMO` to a bubble (speech/thought/shout) + an icon from `assets/icons`.
- State: `defaultState`, `normalize` (migrates old saves — keep it backward compatible), `saveSoon`/`flush`, `connectShared`.

## Engine gotchas
- Textures are uploaded once: after redrawing a canvas texture call `renderer.disposeTexture(t)` so it re-uploads (`needsUpdate` alone does nothing).
- Top-level `const`/`let` order matters: anything run at load (e.g. registering catalog entries) must come after what it uses (`BUILD` is defined after the tiles block; window CAT entries are registered just before the TOWN block for that reason).
- Class names are global CSS: `.own` is the in-room count badge (a card class `own` broke layout once).
- Full-size tile sources are 1024² canvases (~4 MB); use `thumbTex(key)` (swatch) for many small things, and `stylePat` frees the source when the set isn't in use.
- The mini engine is not full three.js: e.g. `Vector3` has no `lerp`; the name `skyTex` is already taken (porthole texture).
- Edits are usually done with Python string replacement asserting each target occurs exactly once.

## Testing (what has worked)
- Serve: `python3 -m http.server 8765` from the repo root (it dies between sessions; restart it). On Garrett's Windows PC the repo is `C:/Users/Garrett/Documents/Room-For-Two`; Python with fontTools/Pillow/numpy is `~/anaconda3/python.exe`, and a small solo-mode server (serves `firebase-config.js` as null, 404s `sw.js`) was used with the in-app browser.
- Playwright is global (`$(npm root -g)/playwright`); Chromium at /opt/pw-browsers. Launch with `--use-gl=swiftshader --enable-unsafe-swiftshader`.
- Route `**/firebase-config.js` to `window.R42_FIREBASE=null;` and abort `**/sw.js` so tests are solo and uncached. Set `localStorage.r42coach='1'` to skip the intro.
- For inspection, temporarily add `window.__T={pet,get state(){return state},...}` before `const clock=` and **remove it before committing** (check `grep -c __T index.html` is 0).
- Syntax check: `node -e` with `new Function()` over each `<script>` block.
- Software GL is slow: wait on simulated time (`toyPlay.t`) instead of fixed sleeps.
- Background browser panes throttle `requestAnimationFrame`. For pet-AI tests add a stepper to the temporary hook (`step:(n,dt)=>{…updatePet(dt,tAcc)…renderer.render(scene,camera)}`) and drive the simulation directly.
- Taps on the canvas are easiest to test with synthetic `PointerEvent`s (`pointerType:'mouse'`) dispatched on `canvas`.
- Never test against the real Firebase room (it's Garrett and Beau's live data).

## The user's preferences
- Brand: the sticker logo; deep-purple outlines (#3B1273), white sticker edges, glossy jelly-candy look, speckles. Palette pink #FF3D9A, lime #A6E22E, cyan #3EC8F2, sun #FFD21F, orange #FF8A1C, grape #9B4DF2.
- The only font is R42 Bubble. No vanilla fonts.
- **Never use a four-point star/sparkle shape** (reads as an AI logo). Five-point stars are fine.
- Avoid emoji in the UI where art exists; the user generates art in ChatGPT from prompts Claude writes (glossy jelly style, transparent PNG), and Claude cuts it out, trims it and converts it to WebP.
- Refine rather than redesign when asked for polish. High-quality 3D models. Show screenshots of results.
- Cozy, not RPG: battles, weapons, crafting and multiple pets from Phraipets were intentionally left out.
- Commit messages end with the Co-Authored-By / Claude-Session lines from the system reminder; no model names in repo content.

## Where things stand (end of the Sept 2026 desktop session)
Done this session, in order (see `git log`): Windows font fix (CFF widths); camera frames the pet above the sheet;
Decorate rebuilt for a big catalog; heart price stickers; pet sits on seats; Sims-style tile floors/walls with
border/run sets + ChatGPT art pipeline; the pet uses almost every item (pathfinding, fit checks per stage); build vs
live mode + build undo; first ChatGPT tile art (10 sets); the town (door → map → Snack Shack, Bubble Salon, Toy Box
with shopkeepers); Cozy Nest (furniture) and Hammer & Hue (construction: tile unlocks, door styles, windows, room size).

Economy now: pet items, furniture, tile sets, door styles, windows and room size are all bought in shops. Furniture
and windows go to storage (`state.fown`) and are placed from Decorate; storing returns them (no refund).

Not yet verified by hand: moving the door by tapping a wall (Room tab → Move door), the 12×12 upgrade, storing
furniture back to storage, and scrolling door/window thumbnails on a phone (each renders its set's pattern, may stutter).

## Where we're going
- More shops on the map: clothing (outfits on the rig sockets `R.sock.*`) is the obvious next one; map art for the shop houses.
- More ChatGPT art: tile sets (follow `tools/tiles/README.md`), pet portraits per stage, item art, posters, backdrops.
- Shops could change stock/prices over time (the showroom and deals are already daily, seeded by date).
- Longer term: exploration.

## Other ideas discussed
- Pet portrait art per stage for the pet card; item art; wall-art posters; backdrop paintings (prompts were written).
- Exploration as a future expansion.

# Room for Two — notes for Claude

A cozy shared 3D room + virtual pet for two people (the user, Garrett, and his boyfriend Beau). Mobile-first web app, installable as a PWA.

- Live: https://garrettgivre.github.io/Room-For-Two/ (GitHub Pages, deployed by `.github/workflows/pages.yml` on push)
- Work branch: `claude/room-for-two-github-migration-m7is0v` (it is also the repo's default branch; there is no `main`). Push there; Pages deploys from it.
- Origin: started as a claude.ai artifact, moved here.

## Start here (handoff, Oct 2026: read this first)
This file is the only memory between sessions. Read this section, then search the sections below for whatever you touch.
Later sections are newer and win where they disagree with earlier ones (the bottom sections, v49 onward, describe the current town).

**Current build: v106** (`APP_V` in index.html next to `hardRefresh`, `CACHE='r42-v106'` in `sw.js`; bump both for anything
user-visible, then tell Garrett to tap **Refresh app** in the Menu on both phones). `SYNC_MIN_V` is 105 (older clients refresh
themselves instead of saving; bump it when you add or reshape shared state that old clients would strip or break).

**Who and how**
- Garrett (the user) plays on Android with his boyfriend Beau; they share one Firestore room. A push to
  `claude/room-for-two-github-migration-m7is0v` is a release (GitHub Pages, ~1 min). Commit and push when a feature is done
  and tested; no PRs, no other branches. Commit messages: short title, a few bullets, the Co-Authored-By line; no model names.
- He asks in plain language, often several things at once, likes a short plain summary, screenshots, refinement over redesign,
  cozy not RPG, never streaks or penalties. He said "it's turning Animal Crossing-esque" and wants that direction.
- Agents on Garrett's laptop: **at most 4 at once**. Every agent's preview runs a headless browser with software GL on the CPU,
  so 8 at once made each one several times slower (the 32 resident sets took well over an hour) and ran the laptop hot. For big
  batches suggest a cloud session (Claude Code on the web) so the work runs off his machine. He's on the $100 plan and usage
  is fine; speed and the laptop are the constraint now (17 agents in parallel once hit the usage limit on the old plan). Sonnet agents modelled all the townsfolk and houses from the briefs in
  `tools/dev/town/` and Claude reviewed every screenshot, sending fixes back.

**Lore: read `tools/writing/GAME_BIBLE.md` before any character, dialogue, holiday or story work.** It is canon (residents,
pronouns, households, relationships, the calendar and holidays, who does what on each holiday, established facts, open questions).
Add every new fact you invent to its Canon log; when sources disagree the bible wins, and index.html data wins over the bible for
anything the game uses. `tools/writing/holidays.md` is the holiday design doc.

**Working method**
- index.html is ~1.8 MB in one file: never rewrite it wholesale. Find things with grep, edit with small Python scripts that
  assert each target string occurs exactly once and write via a temp file + `os.replace` (on Garrett's PC: `~/anaconda3/python.exe`;
  scratch scripts go in `.claude/`, which is gitignored), or the Edit tool.
- After every edit: `node tools/dev/town/syn.js` (syntax-checks every script block).
- **Before every release, run the regression sweeps** (v79, after a crash slipped out in v76/v77): `node tools/dev/town/run.js
  tools/dev/town/sweep.js` (every event x hours: where everyone is, crews, cards; the map at every zoom and a pinch; inside every
  building with a keeper close-up; every menu page; conversations; `PART=12345` runs parts, the whole thing takes ~15 min, run parts 1-2
  and 4-5 together and 3 on its own) and `tools/dev/town/sweep2.js` (care, Decorate, Arrange paths/circles, every arcade game, gacha,
  wardrobe, studio). Both must end with `errors 0`. Then `persist.js` (save, reload, diff every field; must report 0 differences) and `merge.js` (two phones change
  everything at once; must report nothing lost) whenever a change touches saved state. Test every data shape a change touches (v76's bug only hit events held at houses).
- Test headless in solo mode with `tools/dev/town/run.js` (see its README; Playwright goes in `.claude/pw`). It injects a
  `__T` eval hook at serve time, so nothing test-only ever lands in index.html (still check `grep -c __T index.html` is 0).
  Never point tests at the real Firebase room. The tools use the laptop's RTX 3060 (ANGLE on D3D11) since Oct 5 2026: the app is ready in ~2.4 s. `R42_GL=soft` forces software GL (SwiftShader), which is many times slower and makes timings meaningless.
- Some features live between marker comments in index.html, e.g. `/* <townsfolk> */`, `/* <townsfolk-talk> */`,
  `/* <town-life> */`, `/* <town-walk> */`, `/* <house-plans> */`, `/* <house-models> */`. They were generated from files in
  the gitignored `.claude/town/` (integrate.py etc.), which a new session won't have: **edit the code in index.html directly now**.
- New state fields need a default + sanitizer (`defaultState`/`normalize`, old saves must load) and a `MERGE` rule if both phones
  change them (three-way merge against `syncBase`, per-key revisions `kr`).
- Top-level const order matters (TDZ): code that runs at load can only use what's defined above it.

**What the game is (Oct 2026; Garrett's framing: "Room for Two" = one body for two heads, one pet for two people)**
- The heart is the room, the two-headed pet and the two of you. One pet form (no egg, no life stages, v62); care builds an
  endless **bond level** (room themes every other level, and the town grows with it). Each person has a head that learns from
  how they care (v63); furniture remembers who placed it. Not too Animal Crossing: the town is the world outside your room.
- **The daily loop is one list** (v64): "Today with <pet>" on the pet page (the pet's wish + 3 things it wants, always one for
  the two of you), then a treat. Never add more daily systems or streaks; optional extras (finds, garden, jobs, events) stay off lists.
- **Beau's side**: decorating (Decorate, ~80 furniture sets, painted tiles, doors/windows) and room makeovers for residents (v65/v67).
- **The town** (v72-v79): 32 residents with schedules and friendship-level conversations, 23 houses, 8 shops, 5 civic places (Town
  Hall, Library, Post Office, Weather Station, Lamp Shed) that host events, the Sunday market, the park; a grid town with a round
  plaza, the Loop through the neighbourhoods, 8 path types with a walking hierarchy, circles as real shapes; night light pools;
  residents sit on benches, browse stalls, doors open. Lore lives in `tools/writing/GAME_BIBLE.md`.

**Note to the next session (written at the end of a very long one, v59 -> v79, Oct 4 2026)**
- Garrett is starting a fresh chat. Read this Start here section, then the bottom sections (v72 onward) for whatever you touch.
- Everything is pushed; the working tree is clean apart from an untracked `tools/art/shop-interiors.zip` (his, leave it).
- **Run `tools/dev/town/sweep.js`, `sweep2.js` and `sweep3.js` before every release** (sweep3 clicks through every dialogue card, the Bag, prizes, designs, photos, fishing, chats and conversations, and fails on buttons that are on screen but invisible). v76 shipped a crash that only hit events held at houses;
  the sweeps would have caught it. Test every data shape a change touches, not just the first one that comes to mind.
- Search-and-replace across index.html is dangerous: it once rewrote a helper's own definition. Assert counts, read the result.
- Judge performance by draw counts
  (`tm.R.drawn`) and JS time, compare versions with `R42_INDEX`, and ask Garrett how it feels on his phone.
- Garrett liked: the round plaza, Market Street up to the Town Hall, the grid paths with tidy corners ("less blobby"), the night glow.
  He asked for edge-hold scrolling on the map (done in v77; ask if he wants it in the room too).

**Open items / what to do next** (updated Oct 5 2026, end of the overnight session v89 -> v102)
1. Nothing from v72 onward is verified on a phone. Overnight Garrett was asleep and none of v89-v102 has been seen by him: seasons,
   sound, 11 theme sets, ~56 town decorations, designs, photo mode, fishing, bug catching, the museum, town projects, residents
   remembering, moments together, Swap-Face masks, the What's new card. Ask how the map, the sound and the bubbles feel on the phone.
2. Ideas still open: new neighbours moving into the empty lots (needs resident models), edge scrolling in the room camera, a custom
   pattern designer for clothes (designs exist for tiles/pictures/pet patterns), push notifications (needs Garrett's OK).
3. Known small things: the Town Hall sign is too small to read from the map; the snail and Scone's plaster are tiny; the plaza tiles
   read pale. Map far view draws ~1,490 meshes (v88 was ~1,360); watch it when adding map things.
4. `firestore.rules` requires `cv >= 44` on writes and must be published by hand in the Firebase console; ask Garrett before assuming.
5. Working setup: Garrett drives sessions from his phone via Remote Control on his PC (no cloud sessions: cost). Max 4 agents at once.
6. Every user-visible release: add a line to `WHATSNEW`, bump `APP_V` + `sw.js` CACHE, run the three sweeps, then push.

## Files
- `index.html` — the whole app (~565 KB): CSS, a custom WebGL2 engine, game logic, UI. No build step, no framework.
- `firebase-config.js` — Firebase web config (public by design). Shared rooms sync through Firestore doc `rooms/<code>`; rules in `firestore.rules`. `null` config = solo mode.
- `vendor/` — Firebase compat SDK 10.14.1 (loaded only when a config exists).
- `sw.js` + `manifest.webmanifest` — offline cache (the page is network-first with `cache:'no-cache'` and a 4 s fallback to the cache, so a deploy shows on the next open; other files stale-while-revalidate; registered with `updateViaCache:'none'`; bump `CACHE` when changing it) and install metadata. Debug menu "Refresh app" unregisters the SW and clears caches.
- `assets/` — logo, app icons (from the two-heads pet icon, never crop the logo's door), `r42-bubble.woff2` font, `icons/*.webp` (UI icons, set icons, emote bubbles + symbols).
- `tools/font/` — scripts that traced the user's bubble-letter specimen into the font.
- `tools/dev/` — `serve_solo.py` (solo test server, see Start here) and `pb_sim.js` (headless pinball bot: `node tools/dev/pb_sim.js 20 [pinball|pinball2]`).
- `tools/writing/keepers-bible.md` — the shopkeepers' character bible (personalities, voices, relationships, friendship rules); `KBIB` dialog is written from it, keep them in sync.
- `tools/art/interiors/` — shop interior screenshots + plans and exterior concept-art prompts (`PROMPTS.md`).
- `tools/art/WISHLIST.md` — images the app wants next, with ChatGPT prompts (shop icons, wardrobe/salon icons, keeper portraits).
- `tools/tiles/` — `make_tile.py` (turns a ChatGPT image into tile art in `assets/tiles/`) + `README.md` (sizes, prompt templates, lessons learned).
- `tools/tiles/import_sets.py` + `art_fix.py` — batch importer for themed room sets (seam repair, rug rebuild for border mode, banner → run paneling). Room sets 01–10 (Bubblegum diner, Moon motel, Aquarium, Toybox, Cyber bedroom, Fruit punch, Cloud club, Indoor garden, Arcade carpet, Candy bathroom) came through it: 4 tile sets each (floor, `…rug` border floor, wallpaper, `…panel` full wall or `…run` paneling).
- `assets/tiles/` — image tile sets registered in `TILE_ART`.

## How index.html is organised (search for these)
- `WebGLRenderer` — custom three.js-like engine (`window.THREE`). Linear HDR, GGX, ceiling point light (`sun` with `userData.point`) with perspective shadows, lamps as point lights, SH ambient from the sky, room/contact AO, bloom + ACES. `scene.userData.lighting` = `LIT`.
- Lighting is locked to the Daydream look (`SKY_LIGHT.daydream`) and never changes with the sky.
- Sky: `SKY_TIMES` + `updateSky()` — backdrop follows **US Central time**, blending night → dawn → daydream → golden → twilight. No sky picker. Debug slider previews hours.
- Tiles (Sims-style): floor = N×N tiles `state.tf`, walls = 4×N full-height columns `state.tw` (N = `state.size`, 8/10/12; `GRID`/`HALF` are `let` and change with `setRoomSize`) (normalize migrates old `floor`/`wall`). `TILESETS` via `tileset(kind,k,{n,span,mode,paint|img})`: modes `repeat` (span tiles, grid-aligned), `border` (floors, 3x3 source, edges/corners/inner corners by quadrant) and `run` (walls, 3-column source with end caps). Painters: `FLOOR_FN`/`WALL_FN` (the originals, span 4) + `TILE_PAINT`; image sets go in `TILE_ART` (made with `tools/tiles/make_tile.py`, guide + ChatGPT prompts in `tools/tiles/README.md`). `syncTiles` rebuilds merged per-set meshes (`buildFloorTiles`/`buildWallTiles`); the old floor/wall planes stay invisible for raycasts. Painting: pick a set in Decorate → Floors/Walls, `startBrush`, paint bar `#paintbar` (its swatch reopens that Decorate view) (Tile/Area/Room, undo), strokes in `startStroke`/`moveStroke`/`endStroke`.
- Doors & windows: `THEME_DW` has one bespoke door and window per theme (`classic`, the room-art themes: strawberry, jungle, diner, motel, aqua, cyber, punch, cloud, igarden, arcade, candybath; and every furniture set by its set key; `play` covers both Toybox themes). Each entry: `{n, wn, g (tile theme heading), door(), win()}`. Kit: `openPts(w,h,top)` outlines (rect/arch/dome/peak/gable/round/chamfer/soft/circle), `dBase(o)` (glow, frame via boxes or `dTrim` sweep, step, leaf in `D.hinge` with x 0..w, y 0..h, front at z .04; `signY` lifts the Town sign over tall toppers), `wBase(o)` (glass, frame, sill, `mull` cross/grid/vert; y0 = bottom of the glass), props `curtains`, `awning`, `blinds`, `shutters`, `planter`, `pot`, `bloom`, `leaf3`, `icicles`, `lumps`, `bulbs`, `fairy`, `bunting`, `crescent`, `star3`, `heart3`, `bone3`, `porthole`, `alongTop` (points round an opening). `buildDoorModel` bakes everything but the hinge. Old saves stored tile keys (`w:diner`, `win_w_diner`); `doorKeyFix`/`winKeyFix` in `normalize` map them to their theme (`THEME_OF_G`). A story-level theme gift also gives that theme's door. Shops use their own: `SHOPS[k].door` (read by `curDoor`, cached on `away.door`) and `win_<theme>` items on the left/back walls of each layout (snack candy/cafe, salon bath/candybath, toys play, furn fort, build calm/work, glam motel, wear diner, arcade arcade). Left wall (w 3) runs u = -z, so the door at u -2.6 is at the front.
- Set tiles: every furniture set has a painted floor and wall to match (`SET_TILES` [set, floor name, wall name] → tile sets `f:s_<set>` / `w:s_<set>`, theme heading = the set's name, `d.fs` = set key; painters in `SET_TILE_PAINT` f_<set>/w_<set>). Kit: `MOT` sticker motifs drawn at the origin (planet, moon phases, snowflake, shell, note, paw, bone, crown, ghost, pumpkin, bat, tulip, flower, dino foot, mushroom, teacup, lollipop, gift, holly, dice, d-pad, pixel heart, duck, sticky note...), `blob` (outline a union of shapes), `lattice` (staggered wrapping grid; `o.area` limits it to a band; wall motifs are drawn 1.5x), `scatter`, `tilesF`, `planksF`, `checkerF`, `carpetF`, `vstripes`, `panelLow`, `hh` (stable per-cell random so seams match). Floors are span 2x2 (512px), walls span 2 (512 x WPXH). They're sold at Hammer & Hue like any tile set, and a set page in Decorate links to them.
- Sky textures: `SKY_FN` (canvas-painted, generated on demand by `roomTexture`).
- Furniture: `CAT` (catalog), `BUILD` (models), `makePiece` (adds bevels + procedural surface detail), `renderThumb` (thumbnails; also used for props via `'toy:'+id`).
- Build vs live mode: furniture can only be selected/moved while the Decorate tab is open (`pointerdown` checks `openTab`). One undo history for all build changes: `beginBuild()`/`endBuild(U)` around an action, `undoBuild()` (Decorate header `#decoUndo`, paint bar `#pbUndo`); snapshots hold items, tiles, `fown` and `door`; cleared when a partner's change arrives (`adoptRemote`).
- Decorate menu (furniture view, `renderDeco`): a home page with shelves (`decoShelf`: In storage, Wishlist) and browse tiles by kind or by set (`decoBrowse`, `decoTile` with collected x of y); tapping a tile opens a page (`decoPage` 'fn:<k>' / 'set:<k>' / 'store:' / 'wish:') listing Yours (placeable, `bindCard`) then To collect (faded `.want` cards → `offerFurn` peek with a Wish toggle and where/when to get it). Search covers everything in the same layout. Grid rows are `max-content` (horizontal scrollers collapse otherwise). Thumbnails load through an IntersectionObserver on `.card` and `[data-q]` (`queueThumbsFirst`). `bindCard`: tap places, hold (touch) or drag (mouse) picks up and places into the room. New catalog items only need a `CAT` entry + `BUILD` model; new kinds go in `FUNCS`, new sets in `SETS` (with a set icon).
- Cozy Nest daily stock: `nestStock()` (cached per US Central day `nestDayN()`, follows the debug day shift): `nestSetsOn(t)` = 4 sets from a per-6-day-cycle shuffle (`nestOrder`, `NEST_CYC`; never the same set two days running) + seasonal sets in season (`SEASONS` MMDD ranges: spooky Oct, holiday Nov 20–Jan 6, spring Mar 15–May 31), plus 6 odd pieces; deals (first 3 of `dealKeys()`) come from the stock. Owned pieces can always be bought again. `nextStock(k)`/`whenLabel` say when a set is back; `nestLeft()` counts down to new stock. The catalog (`nestCatalog`) shows deals, wishlist, each set, odd pieces, buy again, and the next three days' sets. Wishlist: `state.fwish` {k: pid} (shared; `wished`, `toggleWish`, `wishesIn`), a banner in Decorate and the keeper's tip call it out.
- Pet: `PET_PALS`, `PST` (8 stages: Egg, Baby, Toddler, Child, Teen, Young adult, Adult, Elder; `STAGE_XP`), `buildPet`, `updatePet`. Two-headed jelly creature: lime + blue heads, one big eye each, antenna tufts. Body shape: from Child up the body is squat and gumdrop-shaped (`bodyGeo()`, a sphere widened towards the bottom by `BODY_TAPER`; `bodyTaper(yn)` is used for sockets, arms and the shine) and the heads sit a little apart, leaning out (`max(hs, hr*.96)`, tilt .17). This replaced a tall narrow capsule with overlapping heads, which read as phallic; keep bodies roughly as wide as they are tall and keep the heads visibly two.
- Pet look (for the fashion boutique): `state.pet.look` overrides the palette (`petLook()` fills defaults from `PET_PALS[state.pet.color]`, so old saves are unchanged): `{body, headL, headR, pat, pc:[pattern colours], hand:{s,c}, foot:{s,cL,cR}, ant:{s,cL,cR}, acc:{slot:id}}`. Patterns are painted textures (`PET_PATTERNS`, `petPatternTex`, sphere UV: front of a head is u=.25, face kept clear; `asp` keeps shapes round on the squashed body). Parts are style registries whose defaults are the original shapes: `HAND_STYLES` (mitten/glove/paw), `FOOT_STYLES` (nub/sneaker/boot; 'auto' = the stage's own, sneakers for young adults), `ANT_STYLES` (tip of the springy tuft: bobble/heart/star/curl). Accessories: `ACCS` {n, slot, build(r)} built at the size of their socket (`R.sockSize`), attached by `dressPet` on every rebuild (so they follow stage changes and show in the arcade). Sockets `R.sock.*`: hatL/hatR, faceL/faceR, neck (the collar under the heads), back, waist, handL/handR, footL/footR. `buildPet` only rebuilds when the stage or shape (`lookShape`: styles + accessories) changes; colours and patterns go through `tintPet` (shared `R.mats`), which is what a live preview should call. Pet materials use the shader's jelly mode (`jel()`, `detail=4`: wrap light, glassy top coat, glow-through, sugar speckles). Face details: `onSurface(parent,r,sy,sz,x,y)` places flat things on the squashed head/body facing out (mouths, `gloss` candy shines); eyes use `EYE_TEX` (shaded white with a little self-glow, pupil fading to purple); the mouth is a dimpled smile arc on the chin (`R.smiles` pivot flips to a frown, `R.mouths` open mouth sits in the same spot). `ACCS` entries are `{n, slot:'hat'|'face'|'neck'|'back'|'waist', p, d, build(r)}`; hats and eyewear can go on either head (`L.acc.hatL/hatR`, `faceL/faceR`). Every style and accessory has a price `p` (the originals are free).
- Looks are bought, not picked: the Pet tab's old colour swatches are gone (its Style row opens the Wardrobe or goes to Glow Up Studio). `lookDraft` (see `petLook(saved)`) previews an unsaved look on the pet: `previewLook(L)`, `endPreview()`, `setLook(L)` saves. Leaving the studio/wardrobe tab or closing a try-on card reverts the draft.
- Glow Up Studio (`SHOPS.glam`, two keepers): Pom (`KEEPERS.hair`) restyles antennae (`ANT_STYLES`, 11 tips) and dyes them; Blush (`KEEPERS.makeup`) does body/head colours, patterns and pattern colours (`DYES`, `PAT_MIXES`, signature looks = `PET_PALS`). These are appointments: `openService(k,style)` → `openTab==='studio'` (`renderStudio`, `studio={k,K,base,draft,...}`), you pay only for what changed when you book (`studioPrice`: style price, 3 per dye, 5 per pattern, makeover capped at 12). Fixtures: `vanity`, `bulbmirror`, `dryer`, `headstand` (tap = hair service with that style), `patboard` (tap = makeup). Things with `userData.svc` open a service when tapped.
- Jelly Threads (`SHOPS.wear`, Stitch = `KEEPERS.tailor`): hands (`HAND_STYLES`), shoes (`FOOT_STYLES`) and accessories are owned goods in `state.wear` (ids `h:<k>`, `f:<k>`, `a:<k>`; `WEAR_FREE`, `ownsWear`, `wearDef`, `wearIds`, `wearNext` cycles left head → right → both → off). Shelves/tables are stocked with `wearModel(id)` products (`offer {t:'wear'}`); tapping one tries it on (`openWearOffer`) and opens the buy card (`offerWear`). The Wardrobe (`openTab==='wardrobe'`, `renderWardrobe`) swaps owned things for free at home too (hand/shoe colours are free); in the shop it's the fitting room. Thumbnails: `renderThumb` handles `wear:<id>` and `ant:<style>`.
- The big wardrobe (Sept 2026, the user asked for ~50 of each): 50 hands, 50 shoes (+ 'Growing feet'), 50 antenna tips, and 50 accessories in every slot (hat, face, neck, back, waist). The new ones sit just before `dressPet`: a modelling kit (`wkJ`/`wkM` materials, `wkGold`, `wkMetal`, `wkDome`, `wkCyl`, `wkCone`, `wkStar`, `wkHeart`, `wkBall`, `wkRing`, `wkLathe`, `wkBrim` (double-sided lathe), `wkFlower`, `wkLeaf`, `wkLine`, `wkBand` (ear-to-ear band), `wkFaceZ`/`wkSticker` (cheek stickers on the head's surface), `wkLens`, `wkRim`, `wkShine`, `wkNeck`/`wkPend` (necklace path dipping at the front, pendant pivot), `wkCollar`, `wkStraps`, `wkWingPair` (scaled 1.55 so wings show from the front), `wkBelt`, `wkHip`, `wkSkirt` (open lathe; the engine's cylinders always have caps), `wkTail(g,r,side)` (side tails angle out so they peek past the body), `wkHand`/`wkCuff`/`wkHold` (held props), `wkSole`/`wkUpper`/`wkShaft`), then one `Object.assign` per slot. Most are themed on the furniture sets and room styles. Socket geometry to remember: hat r = head radius, the head centre is .8r below the socket (its top only .15r above), so side pieces (earmuffs, headphones) go at x ≈ 1.1r; face r = the eye radius (.68 of the head), socket just in front of the eye; neck/waist r = body ring radius, the body is ~.84 as deep as wide; back points -z; hand/foot details must sit outside the mitten sphere (radius S.hand) or they vanish (the original Paws' beans were buried, fixed). Main surfaces use the dyeable material (`m`) so free hand/shoe/antenna colours still work. Hand/shoe descriptions are in `WEAR_DESC`. The wardrobe lists what you own first, then 'At Jelly Threads' / 'Try these on' by price; Jelly Threads shelves restock daily from everything.
- Styling mode (`styling()`: studio, wardrobe, or a try-on card open, `wearPrev`): Create-a-Sim style, wherever the pet is. The pet stops what it's doing and stands still facing you (no acts, hops or wandering; `petAct` refuses), dragging turns it (`pet.styleYaw`), pinch/wheel zooms the close-up (`cam.sz`). The HUD fades (`body.styling`) and the sheet is capped so the pet fits above it. Unowned things can be tried on anywhere; away from Jelly Threads the card offers "Shop there" (`O.go`).
- Camera (`updCam`): room centre by default; tapping the pet follows it (`camFollow`, `setFollow`, the "Following" pill `#followPill`, closer zoom allowed via `camMin`) until you tap empty room. The close-up while styling blends in with `cam.sk` and is sized from the space above the sheet (`cam.shiftTo`) and the camera's fov.
- HUD (Sept 2026, after "Beau finds busy menus hard"; Nintendo-style: one obvious main action, big labelled buttons, one level deep, the same back button in the same corner): a small logo, the heart jar, and a shop-name chip (`#storebar.storechip`) when away. The dock has three buttons: **Pet** (`#dkPet`, left; a mood ring `#dkRing` round it, wiggles when a need is low, carries the wish bubble `#wishDot`) opens the pet wheel; **Explore** (`#dkExplore`, big, centre) opens the town map (the map shows a big "Go home" `#mapHome` when away; there is no separate Home button); **Menu** (`#dkMenu`, right; badge `#mailBadge` = unread mail + "!" for the two-do treat, nudged by `tdNudge`) opens `openTab==='menu'` (`renderMenu`, tiles `MENU_ITEMS`: Decorate, Two-dos, Mail, Wardrobe, Room, Debug) with a big lime **Refresh app** button (`#mnRefresh`, `hardRefresh`) at the top. The Debug page is an accordion (`.dbg-sec` details, one open at a time, remembered in `dbgOpen`); the Pet page goes rings, then action buttons, then spirit, personality and head names. Pages opened from the menu (`MENU_KIDS`) and the pet page get a back button `#sback` ("Menu" / "Pet"). The pet wheel (`#petwheel`, `openWheel`/`closeWheel`/`renderWheel`): the pet in the middle (tap = pet page; egg = warm it), its needs (`NEEDS`: key, label, colour, icon, action) as ring gauges (`ringSvg`) round it; tapping a need does it (feed/play/bath open the pet page's item list, nap naps, Love pats). The pet page shows the same rings. `body.sheet-open` shrinks Explore while a page is open. The old tab bar, pet card, two-do pill, bug button and store Home button are gone.
- Dismissing things: the sheet's handle (`.grab`) drags down or taps to close; `emptyTap()` (a tap on nothing) closes a product card, then an open menu (not Decorate), then stops following; Escape does the same on a keyboard. `fitSheet` also accounts for an open product card.
- Pet animation layer: `ACTS_ANIM` + `petAct(k)` (dance, stretch, nuzzle, curious, sit, tumble, sneeze, slump, shrug, doze, spinjump, and held poses hold/hug/wand/press/stroke/munch/scrub/brush/spritz/lather/soak). `idleAct` chooses by mood, stage and personality.
- Living in the room: `pickUse` (idle chooser, weighted by stats) picks from `USE_ITEM` (per item) / `USE_FN` (per catalog fn). Kinds: `perch` (seats, beds, rocking horse via `CAT.perch` {y,z,x,w,bz,fz,top,fe,side,se,foot,kind:'sit'|'bed'|'ride'}; `perchSpots` only returns spots the pet fits, from `PET_DIM` per stage), `nap` (pet beds), `stand` (walk up, face it, play a `u_*` anim from `ACTS_ANIM`), `wall`, `rug`. Use state: `pet.use`, `startUse`/`updUse`/`endUse` (lamp `flick`, `wob`, emotes, `then`). Beds: nap when tired, else bounce. Walking goes round furniture: `findPath` (A* on a 32x32 `navGrid`, string-pulled), `spotClear` keeps use spots off other furniture. Using furniture now also fills needs (see Autonomy below); everything else about it is cosmetic.
- Town map (3D, Sept 2026; the user wants a Dark Cloud georama feel, NOT an overworld to walk around): `showMap()` opens `#town3` (`tmOpen`, falls back to the old SVG `#map` if WebGL fails); its own renderer/scene (`tmInit`, `tmTick`, main loop paused while `tm.open`). A floating island grid `TM_W`x`TM_D` (1 unit cells). Buildings come from the shops' floor plans (`tmShop`: plan cells x `TM_PS`, storeys `TM_H0`/`TM_H1`, rooms merged into rectangles, staff rooms darker and lower, the biggest public top-floor block gets a gable `tmGable`, others flat unless `TM_FLAT`; the shop's real door model scaled down, a sign, the owner(s) as Capsule Pal figurines `tmFig` outside, and an owner roof piece `tmFlair[k]`). Home = `tmHome` (lime/blue roof for the two heads, the player's door style). HTML labels `.tml` are projected each frame; tapping opens `#tmCard` (owner, blurb `TM_INFO`, floors/rooms, today's Nest sets, pet wish) with Go. Arrange mode (`tmArrange`, tools Move/Paths/Decorate, Turn, Reset layout): layout is shared state `state.tmap` {b:{key:[gx,gz,rot]}, r:[[x,z]] paths, d:[[kind,x,z]] decorations `TM_DECOR`}, normalised lazily by `tmNorm` when the map opens (not in `normalize`, which runs before the town code loads). Buildings can't sit on paths; decorations can. Next ideas: requests from shopkeepers/the pet about where things go (the Dark Cloud part), more decorations, map art/labels themes.
- Town & shops: the room's door (`state.door`, default left wall; shops use `DOOR`; `doorG`, `syncDoor`, `openDoor`) opens the map overlay (`#map`, pins `data-go`; SVG town: Home at the bottom, main road to a fountain plaza, Treat Street on the left, Style Row on the right, Maker's Lane on top; pins are % positions matching the 300×420 viewBox, to be replaced by generated art later); `travelTo(dest,then,focus)` fades (`#travel`) and swaps location. `away` = current shop from `buildShop(key)` ({objs, items, extra blockers, keeper, tf, tw}); home stuff hidden via `itemRoot.visible`. Location-aware helpers: `roomObjs()`, `roomItem(id)`, `defOf(k)` (CATMAP or shop `FIX`), `curTF()/curTW()` — pet AI, nav, lighting and tiles all go through them. `SHOPS` (snack/salon/toys/furn/build/arcade/glam/wear: tiles, `layout` array or daily function, keeper, lines), `FIX` fixtures (shelfunit, counter, display, cooler, sign) with product `slots` stocked by `buildShop`, `KEEPERS` (baker, stylist, toymaker, cushion, builder, `joy` in the arcade, `hair`/`makeup`/`tailor` in the style shops; a shop can have several via `S.keepers:[{k,n,x,z,svc,lines}]` → `away.keepers`, `away.keeper` is the one talking; lines come from `away.keeper.lines`: procedural models with `upd(dt,t,act,p,talk)`; they stand on a step at y .5, scale 1.22, so the face must clear the counter top at ~1.0. Keeper kit: jelly skin `jel`, `gloss`, `kFace2(parent,{r,sy,sz,cx,cy,cz,ex,ey,er,my,mw,browC,cheekC})` puts glossy blinking/glancing eyes, brows, blush and a syllable-talking mouth on a squashed sphere and returns `F.update(dt,t,{talk,happy,surprise})`; `kArm2` noodle arms with a mitten hand and `userData.tip` for props; `kBreath`. Each keeper has an idle quirk on a timer (flour puffs, a comb through the hair, a big BOING, a self-fluff, straightening the hat, a gamepad win) that waits while talking. The register sits on screen right in every shop, so props go in the keeper's -x hand), `keeperReact`/`keeperSay` (`#kbub`), products → `openProduct`/`buyItem` (`#shopcard`). Buying moved from the pet sheet to the shops (unowned items link to their shop via `SHOP_FOR`). Location isn't saved; each device starts at home.
- Shop buildings (Sept 2026, second pass; exteriors come next): every shop is a real building from a floor plan, `S.plan={W,D,ext,base,door:[i,j,'w'|'n'],arrive:[[gx,gz] per level],levels:[{grid:[rows],rooms:{c:{n,f,w,lock}},doors:[[i,j,'e'|'s']],open:['ab'],rugs:[[i0,j0,i1,j1,fkey]]}]}` (grid letters are rooms, '.' outside, '#' a stairwell). `buildPlanLevel` makes floors (per-room tiles, rugs, border sets), the base, and walls on every edge between different rooms (merged runs; interior walls knee-high `IWH` with gaps at doors; outside walls in 4 classes by facing, tall on the far sides and cut to `SWH` on the camera side, switched by `updPlan` from `cam.yaw`; `rebuildPlan` reruns it when tile art loads). Rooms with `lock` are staff-only: greyed (`greyMat`/`greyObj`), not walkable (`planWalk` in `navGrid`/`inRoom`/`clampRoom`), taps say so (`staffTap`; the plan is a friendship unlock later). Upper floors: the current level's group sits at y=0 and lower ones drop by `LH` (`setLevel`, floor chip `#floorchip`), so the pet/camera/AI never see storeys; `stairs`/`elevator` fixtures switch floors when tapped. Layout items use `g:[gx,gz]` (cells), `lv`, and `wl:[gx,gz,'n'|'w']` for wall pieces on the back/left walls (hidden with their wall's cutaway via `it.cls`). Keepers take `kg`/`g`. The home room shell (walls, slab, trim, room AO) is hidden in plan shops. New pieces: stairs, elevator, staffsign, oven, prepcounter, sacks, workbench, lumber, sewing, fabric. The buildings: Snack Shack (bakery + café + staff kitchen and pantry), Bubble Salon (T-shaped spa: reception, bath hall, staff towel room and laundry), Toy Box (shop + staff workshop + play loft upstairs by stairs), Cozy Nest (showroom hall + living room and bedroom displays + staff stockroom), Hammer & Hue (hardware floor + staff lumber yard + paint gallery upstairs), Glow Up Studio (reception + Pom's hair studio + Blush's makeup studio + staff lounge), Jelly Threads (boutique + fitting rooms + staff sewing room), Jelly Arcade (main hall + retro room + staff room + party floor upstairs by lift). The older `S.arch` wall-block system below is still in the code but no shop uses it now.
- Shop layouts (redesigned Sept 2026, each with its own shape and feel): shops aren't square boxes any more. `S.arch` adds wall blocks (`{b:[x0,z0,x1,z1],h}`) and angled corners (`{tri:[...]}`), built by `buildArch` with the shop's wall tile (`S.archTile`, repeat sets only) plus the usual cap, baseboard and chrome trim; they're nav blockers, and `updArch` shrinks them to stubs when only cut-away walls hold them up (items on them carry `blk:<index>`). Layout items can use `at:[x,z,rot]` (wall pieces on a block face, or exact spots) and floor items can have `y` (a bonsai on a half wall). `clearKeepers` pushes any counter/vanity in front of a keeper forward until it clears the keeper and its step, so keepers never clip into counters. Shop items without `c` use their catalog colour. The shops: Snack Shack (L-shaped corner bakery: kitchen wall block with stove and cooler, counter under an `awning`, café corner), Bubble Salon (spa with a tiled centre bay for Fizz, claw tub and wash basin), Toy Box (stepped block back wall, ball pit), Cozy Nest (striped pier + half-height divider make an alcove for the day's sofa), Hammer & Hue (pegboard walls, storeroom block with a `rollerdoor`), Glow Up Studio (mirrored pillar between Pom's and Blush's bays), Jelly Threads (fitting room block with a `fitcurtain`, runway rug between two `mannequin`s, tailor-tape walls), Jelly Arcade (angled neon corner with the score board, `neonbar`s). New wall tiles `pegboard` and `tailor` (theme 'Workshop').
- Ownership & build shops: furniture is owned stock (`state.fown`, bought at Cozy Nest `SHOPS.furn`, placed from Decorate; Store returns it to storage). Tile sets must be unlocked (`state.town`, `STARTER_TILES` free) at Hammer & Hue (`SHOPS.build`), which also sells door styles and windows (one of each per theme, see below; `state.downs` = owned door theme keys, current `state.door` {s,w,u}; windows are CAT entries `win_<theme>`, fn 'window', set 'build') and room size (`state.size` 8/10/12, `setRoomSize`, `growTiles`). Offers: `openOffer(factory)` with `offerItem/offerFurn/offerTile/offerDoor/offerSize`; `goBuy(k)`/`goBuyTile(key)` travel to the right shop. Shop catalogs open as `openTab==='shopcat'` (furniture reuses `renderDeco` in `decoMode='buy'`, build uses `renderBuildCat`). Debug menu has +20 hearts.
- Capsule Corner (gacha): `state.tokens` (earned: +1 per two-do, +1 per granted wish, +1 per 3-star arcade round, +2 with the daily treat; or 12 hearts each; old saves start with 3). A `FIX.gacha` machine stands in Jelly Arcade and the Toy Box (`userData.gacha` → `openGacha`). The overlay `#gacha` has its own WebGLRenderer/scene (`gcInit`, `gc`; the main loop pauses while it's open): `buildGachaMachine` (body, coin slot, crank, chute + tray, glass globe of `capsuleMesh`es), `gcPhys` (capsules: gravity, the glass, each other, swirl while cranking), states idle → coin → crank (drag round, `crankA` ≥ 2π) → drop (the capsule matching the rolled rarity falls out the chute) → tray (tap) → open (twist open, star burst) → reveal (`gcShowPrize`, Keep it → `capGrant`, a new capsule drops into the globe). `capRoll`: 60% common (hearts, a snack, a lucky token), 32% uncommon (a Capsule Pal figurine `fig_<keeper>`: a little living keeper on a pedestal, set `gacha`, `gacha:1` so shops don't sell it), 8% rare (an accessory you don't own, else `fig_gold`). `state.capsdex` = figurines ever found (the Pals book). The engine's Vector3 has no lerp: use `vlerp`.
- Two minds (the user's request: the heads think separately and confer before asking). `headNames()` (`state.pet.heads`, editable in the Pet tab; default = the pet's name split, Mochi → Mo + Chi) and `petMinds()` (a temperament per head from `TEMPERS`: playful / cozy / foodie / curious, seeded from `state.pet.t` so renaming doesn't change it). From Young adult (`smartAge()`): `smartPick` has each head score every usable item (use weight × temperament `fn` affinity × novelty from `pet.recent` × a calm-down at night or with the ceiling light low); same choice = go (`goUse`), different = `startConfer` (pet.mode 'confer', `conferPose`: heads turn to each other with a thought bubble each via `emote('',{head,icon})`, then the winner nods and the other tilts), and the head that gave way (`pet.lastYield`) gets more say next time. Idle fidgets alternate heads' styles (`TEMPERS.acts`); each head looks at its own things (`pet.lookH`). Wishes are conferred too: each head proposes one (need × temperament), `state.wish.win/agree/alt` record who wanted what (shown in the toast and the Pet tab). Newly placed furniture gets inspected (`pet.seen`, `newThing`). All cosmetic and local.
- Pet wishes (`WISH_T`, `state.wish`): every 25–45 min (`wishTick`, run by the 15 s HUD interval) the hatched pet wishes for something picked from its stats (`wishPick`: snack, favourite food, bath, play, nap, pats, outfit change, a trip to a shop). Shown as a thought bubble on the pet card (`#wishDot`) and a row in the Pet tab (`wishRow`, Go → `wishGo`/`tdGo`). Granted through the two-do events (`td` → `wishHit`): +3 hearts, affection and fun, a celebration. Unanswered wishes expire after 4 hours with no penalty. Shared in the save, so either person can grant it.
- Direction chat (Sept 2026): Garrett leans Tamagotchi, Beau leans Happy Home Designer. The plan is to bridge them: a pet with opinions about its space (wishes now, room requests next), with more rooms held back for now (the name is "Room for Two"). Brainstormed next steps, in order: room requests from the pet, personality traits shaped by care, then more rooms / a yard.
- Ceiling light dimmer: `state.ceil` (0..1, shared, home only; Room tab chips `CEIL_LEVELS`). Applied every frame in `updLighting` (eased `LIT.ceil`): the ceiling light, ambient and sky fill fade; lamps and bloom get stronger.
- Idle animations: besides the originals, `yawn, lookaround, bicker (the heads argue), headbonk, hula, scratch, jiggle, clap, peekaboo, balance, twirl, sniffair, daydream, hiccup`, picked by mood in `idleAct`. Walking has a mood too (a bouncy skip when happy, a shuffle when low).
- Lying on beds: the feet go where the whole pet (`pet.head`, antennae included) fits in front of the headboard (`perch.hb`, default the bed model's back edge + .36) and the heads land near the pillows; heads tuck their chins so the tufts point up.
- Jelly physics (`pet.soft`, end of the pose code in `updatePet`): springs on `R.root` (pivot at the feet): a squash along world-up (`sq`) and a lean (`lx` pitch, `lz` roll). Velocity changes of `pet.group` kick them (landing/leaping squash, setting off leans back, stopping wobbles forward; teleports are ignored); a rest sag pulls the squash down (standing -.015, sitting -.07, lying -.17, so a lying pet spreads into the mattress) and vertical speed stretches it. Heads and arms add the lean with a lag (floppy follow-through). Tune with kS/dS/kL/dL and the kick factors. When lying on its back the feet droop into the bed (legs +.95). To test with the browser pane hidden, step `updatePet` by hand (rAF is paused).
- Lying down: on beds (`perch.kind==='bed'`) the pet lies on its back (`lieBack`: body rx -π/2 about the feet, lifted by its half-depth); the spot puts the heads on the pillows (`perch.pz`, pillow z; default bz-.28). Tired = nap, otherwise it lounges (kicks, arm behind a head, chats); bouncing is now rare. Sleeping anywhere else (pet beds via `pet.napBed`, the floor) curls up on its side (`lieSide`). `A.x` moves the body sideways in a pose.
- Furniture sets II (in progress): `SETS` has Fairy Garden (`garden`, 14 pieces: toadstool, petalchair, leafbed, stumptable, beehive, flowerlamp, sunflower, mossrug, birdbath, dandelion, acornbed, leafbowl, butterflyart, trellis). Bookworm Nook (`books`, 14 pieces, built with the keeper mesh kit: `bkBook` helper, painted textures `bkGlobeTex`/`bkStarTex`/`bkFaceTex`, lathe profiles bottom to top, cushionGeo, sweeps): bookcase, readchair, floorcush, writedesk, bankerlamp (floor lamp), globe (spins, u_spin), teacart (u_sip), pothos, braidrug, grandclock (pendulum), wallshelf, starmap, bookbed, teabowl; set icon `set-books.svg`. Bubble Bath (`bath`, 12: clawtub, sinkvanity, ducklamp, bathmat, towelrack, bubbleart, bathmirror, bamboo, laundry, bathstool, duckbed, soapbowl; `bcDuck` rubber duck helper; the tub's inner basin is a loft with its winding flipped so it faces inward) and Kitchen Café (`cafe`, 12: stove with steam, retrofridge, bistrotable, bistrochair, cakecounter, potrack, checkrug, herbcrate, cuplamp, breadshelf, donutbed, mixbowl). New use anims: u_stir (stove), u_splash (tub), u_wash (sink), u_dry (towel rack), u_nibble (cake counter, bread shelf). Also built: Snow Lodge (`snow`), Seaside Shack (`sea`), Music & Art Studio (`studio`), Stargazer (`stars`), Greenhouse Nook (`green`), Pillow Fort (`fort`), Game Den (`games`), Pet Palace (`petpal`), ~9-10 pieces each; helpers `s1Stripe`, `s1Plaid`, `s1Sling` (fabric slings: lofts can't make sagging sheets, they stack horizontal rings), `s1Star`, `s2Tex`, `s2Pot`. New use anims u_drum, u_water, u_game, u_swing (u_piano, u_paint, u_warm, u_scope now used). Then Date Night (`date`: loveseat for two, dinner table, candles...), Groovy '70s (`groovy`: lava lamp, disco ball, pit sofa...), Zen Tea Room (`zen`: shoji divider, sand garden, bamboo fountain...), Spooky Cute (`spooky`), Festive Holidays (`holiday`), Spring Picnic (`spring`), Dino Dig (`dino`, dino rocker = ride perch), Carnival (`carnival`, carousel horse = ride perch, ball pit), Work Nook for Two (`work`: double desk with two monitors), Pet Gym (`gym`: exercise wheel, trampoline, treadmill). Sets III (Sept 2026, to fill gaps: beds, seats for two, room-art themes without furniture, summer): Cloud Nine (`cloud9`), Jungle Treehouse (`tree`), Mermaid Lagoon (`lagoon`), Summer Fruit (`fruity`, seasonal Jun–Aug; not named Fruit Punch because tile headings must stay unique for `THEME_OF_G`), Road Trip Motel (`roadtrip`), Hatchery Nursery (`nursery`), Birthday Bash (`bday`), Backyard Campout (`camp`), Laundry Day (`washday`), Movie Night (`movie`), 10–11 pieces each with a floor, wall, door and window; kit at the top of their BUILD block (`nsPuffs`, `nsHalf`, `nsScallop`, `nsLine` rod between points, `nsBlob` for canvas `circ` shapes, `nsDrop`, `nsFace`, `nsPillows`). ExtrudeGeometry fans from the centroid, so `flat()` only suits outlines that are star-shaped round their middle. 46 sets in all; `NEST_CYC` is 8 so Cozy Nest still shows about 4 a day. More use anims: u_snuggle, u_dance, u_rake, u_unwrap, u_dig, u_dive, u_type, u_run, u_bounce. Ride-ons copy the rocking horse: `perch:{y:.84,...,kind:'ride'}` and USE_ITEM `{kind:'perch',w:1.1}`, model facing +z. Gotchas found: `Shape` has no absarc; `heartGeo()` is already ~1 unit wide; `latheGeo` takes [r,y] pairs; a concave crescent extrude fills in, use a torus arc; emissive adds flat white over a map (keep it ~.08 on textured screens); canvas textures on discs must be filled edge to edge (transparent = black). Model kit: `latheGeo`/`lathe(g,profile,m)` for turned shapes, `leafGeo`, `flatSpot`, canvas textures (`barkTex`, `ringTex`, `mossTex`, `scaleTex`, `seedTex`, `petalQuiltTex`). Items can react while used via `o.userData.use(t,p)` (called with -1 at the end), alongside the ambient `userData.anim(t)`. New anims: u_blow, u_paint, u_piano, u_read, u_spin, u_warm, u_sip, u_scope (the last few are ready for the planned sets). Set icons can be SVG (`ico()`).
- Engine note: Euler order is three.js XYZ (Rz applied first); positive rotation.x tips +y towards +z. There's no `rotateX`; nest pivots for combined tilts. Check a model's orientation with Box3 numbers rather than guessing from screenshots.
- Care system (from the user's old game "Phraipets"): `TIERS` (mood names), Affection (no timer), `spiritOf`, overfeeding to 120 (Bloated), `PERSONALITIES`, `ITEMS` (food/groom/toy), hearts economy, `checkDaily` gift per person.
- Props: `TOY_BUILD`, `FOOD_BUILD` (pieces in `userData.bites`, eaten one group at a time; drinks drain `userData.level`), `GROOM_BUILD`; scenes in `TOY_PLAY` / `GROOM_PLAY` / `TOY_PLAY.__food`, run by `startToyPlay(id)` / `updateToyPlay`.
- Emotes: `emote(ch)` maps an emoji key through `EMO` to a bubble (speech/thought/shout) + an icon from `assets/icons`.
- Build/buy: Decorate has four views (`decoView`: furn / f / w / door, `DECO_VIEWS`, `renderTileView`). Outside shops only owned things show (furniture in storage or placed; unlocked tile sets in `state.town`; door styles in `state.downs`); each view ends with a "Shop at …" button (`shopFor`). Tile sets carry a theme `g` (heading; `TILE_ORDER` is sorted by it) and a name that says what the piece is — never name a wall after the set ("Arcade carpet" wallpaper was the bug). Door/window names come from `styleName` (drops "wallpaper", wainscot → "panel"). The Room tab is sharing/settings only.
- Sandbox (debug menu, `setSandbox`): unlocks everything in memory; `flush` and `tryRemote` are paused, leaving restores the saved state. Use it to test content instead of editing ownership.
- Two-Do List (the game loop; `state.td`, sheet `openTab==='todo'`, `renderTodo`, HUD pill `#tdBtn`/`tdUI`): 3 two-dos a day from `TD_T` templates (slots: care / home-or-town / play-or-together), made by `tdMake(day)` seeded from room code + US Central day (`tdDay`, debug `tdDayShift`) so both devices agree. Game code reports events with `td(ev,amt,val)` (feed/bath/play/nap/care/feed:fav/warm/pat/place/move/tint/paint/note/buy/buy:<shop>/visit:<shop>/arcade/score:<game>); either person's progress counts (`T.prog[k][pid]`), together two-dos pay a team bonus. Rewards: hearts per two-do (`TD_CAT`), daily treat (`tdTreat`), weekly sticker card (`TD_WEEK` prizes at 4/8/12, resets Monday), story levels (`TD_LV`/`TD_LVN`, each unlocks a whole room-set theme via `tdThemeGift`), big moments (`TD_MS`, one-off, +2 stickers). Celebrations go through `showReward` (queued, waits for games to close). One swap a day each (`tdSwap`); `tdNudge` wiggles the pill once a day. No streaks or penalties by design — keep it that way. Debug menu has Finish list / Next day / +6 stickers / Reroll.
- Shopkeeper models: the mesh kit just before `KEEPERS` (`loftGeo` elliptical rings with their own centres + `mod` bulges/open arcs, `sweepGeo` tubes along a curve, `smoothProf`, `meshGeo` computes real normals; `kAim` points an arm at a target and stretches it so the hand lands there). Bunbun (`baker`) is the first rebuilt from the user's character sheet: the egg body's upper half is exactly the face ellipsoid so `kFace2` sits on it, `onBody` places things on the lower part, ears are sprung sweeps, the spoon hand is aimed each frame so props stay in the paw. Matte materials (detail 3/1), not `jel`. Boing (`toymaker`) is the second: one central eye (a painted eyeball texture that rotates to glance, under a lid hemisphere that rotates shut to blink, no `kFace2`), a bent extruded grin with teeth, a swept helical spring (scaled to stretch), jointed stick arms. Fizz (`stylist`) is third: a curved bean loft (ring centres follow a curve), placed on with `onLoft`; mismatched eyes via the shared eye kit (`eyeTex`, `kEye`, `kEyesUpd`: painted eyeball that turns + a lid that rotates shut), `kArm3` two-part noodle arms, a foam cloud (bumpy loft + a ring of puffs + a swept S-swirl), a bubble wand quirk. Fizz's body is dynamic: `bg.dyn=1` geometry (the renderer's `_geo` re-uploads positions/normals in place for `dyn` geometry instead of rebuilding; outline normals = normals) sheared along a moving centreline each frame (`reshape`, `bend`), with `follow(y)` groups carrying the face, arms and hair along. His hair is a bubble bath: `bubbleMesh` (many spheres in one dynamic mesh) over a pink core; bubbles float off, pop and grow back. Gaze: keepers watch the pet, not the camera (following the player felt creepy). `updShop` calls `keeperGaze(K)` which sets `K.g.userData.gaze` {mode pet | glance | partner}: the pet most of the time and always while talking, short glances round the shop, and in a two-keeper shop (Pom and Blush) they look at each other and turn towards each other. Eyes read it through `gazeAngles(o,S)` (`kEyesUpd`, `kFace2`, Boing); outside a shop (figurines) they just wander. `camLocal(o,pt)` = a world point's direction in an object's frame. Body language: in a shop each keeper's parts sit in a layer group (`K.layer`, added in `buildShop`, `K.kind` = keeper key); `keeperLayer` plays idle moves from `K_IDLE` (per keeper sets in `KEEPER_IDLES`: hop, sway, stretch, look, wiggle, spin, lean, squash, rock, march, twirl, dance, bow, tiptoe, laugh) every few seconds and talking styles from `K_TALK`/`KEEPER_TALKS` (nod, bounce, lean, sway, excited; 'listen' nods along). `keeperChat`: in a two-keeper shop they chat now and then (turn to each other, alternate talking via the `talk` flag, the other listens, a shared laugh at the end); anything the player does ends it. Cushy (`cushion`): `cushionGeo` (rounded-square outline puffed front/back to a pinched seam; `geo.B(th)` gives the outline) as dynamic geometry whose top corners lift like hands (wave, cheer), `pivAt(par,geo,x,y)` places things on any geometry's front (nearest vertex), sleepy half-closed lids (`kEye` open -.05), big corner tassels. Use that kit for the rest, one at a time against the user's sheets (all nine are now rebuilt from the user's sheets; Pom: slim curved loft, an afro of puffs each with a swept spiral `pm_curl`, tool belt; Blush: pear loft with paint flecks, lashes, pouty lips, beret; Stitch: a yarn ball of great-circle tori kept off a cream face patch, a painted tape band). `camLocal`/`kEyesUpd` guard against NaN (one bad early frame used to leave an eye's rotation NaN forever, so it never drew). Bolt is done (egg loft + overalls lofts, straps are `sweepGeo` with `o.ref` so the strap lies flat on the body, ribbed lathe helmet: lathe profiles go bottom to top or the faces point inward, pink mallet tapping). Joy is done (starry eyes: `eyeTex` `star:1`, speaker grille texture, sneakers). Fizz's hair bubbles are transparent (`Ba`/`Bb`) with a white shine per bubble (a third `bubbleMesh`), sizes varied.
- Jelly Arcade (`SHOPS.arcade`, keeper `KEEPERS.joy`, `FIX.cabinet` with `userData.game` → `openGame(k)` via `townHit`, `FIX.scores` wall board `drawScores`): minigames in `GAMES` (catch, pop, stack, says, drop = {pet} Drop (now 3D, after the user's research spec `Miitomo-Drop-Claude-Reconstruction-Spec.md`: ◀ ▶ buttons move the claw and GO! drops, as in the original; the swing and a small bob are automatic; `b3` builds a real 3D board in the game renderer's scene `gpSc` with the real pet, the camera fitted so the board plane matches the physics pixels; `draw2` is the old 2D picture, kept for the cabinet art and as a fallback; `exit` removes the board. Prize pockets have lips (`lip` segments; the featured item's pocket is narrower); rest is measured relative to the surface and on smoothed speed; bumpers fire once and re-arm when the pet moves away; peg bounces are deterministic. Look (Miitomo-inspired, kept offbeat): each board is one bold colour (`S.col`/`col2`, ledges `S.plc`) with tone-on-tone doodles (`dropDoodle`: squiggles, googly eyes, lopsided stars, spirals) in a navy cabinet with neon tubes, zigzag teeth and chasing marquee bulbs (`B.bulbs`, `B.bon/boff`; `g.partyT` = party mode after a win, `g.flashT` = all-on flash and a screen flash); prizes sit on gold pill pads with three stars and rays; gold coins in arcs over each prize (+1, pop when grabbed); bumpers are sunburst discs with mismatched googly eyes that follow the pet; the floor has pill pads with candy and neon dividers. A win sets `g.pop` and the prize flies to the middle of the screen over a ray burst (`upd3`), with the name underneath; the canvas behind is a dark cabinet with turning rays (`backdrop`). No clipping: the pet's feet sit on the contact point (`off` .97r), it eases upright to the surface when slow and while landing (`g.restA`), prize plaques sit on the front of ledges with their top flush, floor plaques are below the floor line and floor prizes are behind the pet. No drop timed out in a 450-drop simulation across the three boards (a headless sim: build `g` with `D.init`, press GO via `D.down` on the GO button, step `D.upd` at 1/60). Not done from the spec: a head+body compound collider, arrow-key input, measured original boards (the user didn't want a candy theme or the name Gumdrop Drop; it's kept generic so each board can get its own theme later), modelled on Miitomo Drop; it has its own upright machine `FIX.dropboard` (`fxDropBoard`) instead of a cabinet; the pet swings from a claw (drag to move, release to drop; games can have an `up` handler; the swing tilt at release makes landings slide), a themed board per day (`STAGES`: Cliffs, Falls, Tower; ledges `plats` with prizes `p`, moving `mv`, bumpers, pegs, floor cups), and you win a prize only by coming to rest on it (`settle`; slow motion near a prize, teetering at ledge edges). Prizes: small/mid/big points and a daily featured accessory you don't own (`giftId`, added to `state.wear`). Grip is higher on flat ledges than slopes. Balance checked by simulating random drops: gifts roughly 1–5% of drops; each `init/upd/draw/down/move/pose/art`, called with `this`=the game) on the 2D `#gmc` canvas in the `#game` overlay; the 3D `loop` pauses while it's open. The pet in the games is the real 3D pet: `gpAttach` moves `pet.group` into a second renderer (`gpR`/`gpSc`, framed by `gpFrame`), games return a pose each frame (`pose` → `gpApply`, presets `PZ`), `gpDraw` blits it; `gpDetach` puts it back and rebuilds the rig. Anything on the rig sockets (future clothes) shows up automatically. `gpSnap` makes the stills on cabinet screens. Points: combos/multipliers (`gMult` badge), in-round levels (`lvAt`/`lvSub`, `gLevel` banner), 0-3 stars per round (`stars`), hearts by stars (`STAR_H`, `ARC_CAP` 30/day each), mastery XP + titles per game and person (`mLevel`, `titles`). State: `state.arc.hi` (best points), `.st` (best stars), `.xp`, `.earned`, `.plays` (`arcA()` fills them in). Drawing kit: `gJelly`, `gPuff`, `gBurst`/`gParts` particles, `sprite()` cache, `TREATS`, `bubbleArt`, `gText` (R42 Bubble). Two-dos/big moments use `stars:<game>` and `lvl:<game>` events. New game: add to `GAMES` (with `art`, `legend`, `stars`, `titles`, `xp`), a cabinet in the layout, `g_`/`l_` two-dos and a big moment.
- For sale / sold out (`addSaleTags`, before `buildShop`): everything for sale gets a heart-price tag (`saleLabel`, `tagTex`: shelf tags on slots, a stake sign beside floor pieces facing the camera, a hanging tag under wall pieces; lime "Yours" when owned, a SALE ribbon on deals). Buying swaps the tapped thing (`tapObj`, `saleMatch`) for a Sold out placard (`soldOut`, `placard`); sold spots are kept per shop and US Central day in `SOLD` (by `userData.sid`) and re-applied on rebuild (`applySold`). Not saved: a reload restocks.
- Plan-shop camera: `planFrame()` fits the current storey's projected footprint to the screen (`away.cc` is the look-at point used by `updCam`, `cam.dist` fitted to width/height) on arrival and on `setLevel`. Floors below the current one are dimmed (`dimLevel`, cached `dimMat` per material).
- Shop spacing and the pet: plan cells are `PLAN_CS` (1.25) units wide (`planGX/planGZ/planCell/planSize` and `buildPlanLevel`'s X/Z), so shops are roomier without moving layouts. In shops the nav grid keeps the pet's centre `w*.36` from furniture (home `.26`); `petGo` refuses to walk when there's no path (it used to walk straight through things); `petFree()` steps the pet off furniture on arrival and on `setLevel`. Test clipping by stepping `updatePet` in each shop and measuring the pet's footprint against item Box3s. Staff rooms are dark (`greyMat`). Sold out = a sandwich board hinged at the top (`placard`).
- `petMinds` seeds temperaments from `state.pet.seed` (set once from `p.t`); `p.t` changes on every care action, and the old signed `h>>4` could give an undefined temperament and throw in `updatePet`.
- Drop is tall now (Sept 2026, like Miitomo's scrolling board): `g.sc` = one screen of board (all physics speeds, gravity and sizes use it), `g.bh` = the whole board (`S.tall`, ~2.7 screens), `g.cam` = the scroll (camera follows the pet with look-ahead, eases back up for the next drop; `camUpd`, `camMax`), `g.camY` makes the framework draw particles/floating text scrolled. A 3.2 s flyover shows the board first (`g.prev`, tap to skip). Boards come from `gen(look,i)` (three sections: staggered dot rows 4/3 wide, two prize pills per section on alternating sides, pink wall deflectors, bumpers; Falls adds a slide per section, Tower a moving pill; dots are filtered away from ledges/bumpers so nothing can wedge; no dot row over the floor cups); `SEGS` only supplies names/colours now. Prize platforms are just the gold pill (no ledge under it) and anywhere on the pill counts; a pet resting on nothing (perched on a dot) gets nudged off. Depth meter on the side (`meter`). Made less generic (Beau): bumpers are the shopkeepers (a Capsule Pal figurine in a bubble on the sunburst, backing in their shop's colour, one per bumper rotating daily, they hop and spin when hit), and every prize is a real thing you get (`prizes`: per pill/floor cup, cheap snacks up top, fancy treats deep down, a capsule token on some mid pills, max 2 tokens a day via `state.arc.dropTok`; `grant`, `prizeName`, `B.prizeM` shows the real food prop or token); points still count for stars. Balance from a 250-drop sim per board: ~1% misses, ~1% time-outs, gift 1-3%, drops land spread over all three sections.
- Pinball v3 (Sept 2026): a dot-matrix screen (DMD) above the table (`dmdH`, `dmdFrame` draws a 128x32 frame per event kind in `g.dm` {k,txt,t} set by `say(g,txt,col,kind)`: idle title/score/marquee, launch, space, multi/moon, hole, atom, uplink, radar, save, drain, level; tinted amber by multiply, LED look from `dmdMask`); the 3D view renders below it (`B.oy`, `B.vh`, `proj` accounts for it). More to hit: 2 mini bumpers, round targets `g.posts` (atom reactor: 3 hits = Atom Smash, double scoring 20 s; satellite: 12 s ball save, 15 s cooldown; radar dish: next black hole x2), spinners `g.spin` (20 per turn), moons all down = multiball (`g.extra` comet balls; if the pet ball drains during multiball a comet takes its place). Flavour: orbiting planets round the atom, city beacons, twinkling stars on the art's sparkles, a moon circling the top-left planet, rocket flame. The ball is the pet itself, curled (`pose`), in a roll pivot at its middle (`B.roll`, `B.petCy`); `exit` puts it back in `gpSc`. Scoring rebalanced by bot sims (black hole ignores multipliers, 5 s cooldown): bot median ~116k, stars 40k/120k/300k. While a minigame is open `body.gaming` hides pet emotes and keeper bubbles and `toast()` drops messages unless called with `force`.
- Pinball polish: the 3D view is drawn `up` px (2.2% of the height) higher, into the DMD's bottom margin, so the gaps above and below the table even out (`B.oy`/`B.vh` include it, so `proj` still matches). The ball has just a faint cyan glow under it (`B.glow`; the user found discs/rings/trails too much); the curled pet is scaled to br*2.5.
- Pinball rules (Sept 2026, 'like an actual pinball machine'): every switch reports to `ev(g,k)` (bump, sling, atom, sat, radar, spin, moon, lane, hole) for the end-of-ball bonus (`BON`, x the S-P-A-C-E multiplier, counted on the DMD at drain, `g.bonusV`), the multiball jackpot (`g.jp`, +500 per bumper) and missions. Missions `MS` (9, `k`+`c` count or `seq` shots in order, 60 s / 75 s): the launch starts the lit one (a drained mission resumes with its progress), the black hole starts the next; completing one promotes you (`g.lv` = rank, `RANKS` Cadet..Star Legend, `rank(lv)`; the level is earned by missions now, not score), lights an extra ball after missions 3 and 7 (collect at the black hole), and all nine = SUPERNOVA wizard mode (`g.wiz` 30 s, everything x3, super jackpot at the hole, then tour 2 pays double). Lit shots show as bouncing arrows (`lit(g)`, `B.arw`); rank inserts are a star arc under the atom (`B.rk`). Skill shot = let go of the plunger with the meter in its moving pink zone (`g.skZ`, meter drawn under the table; plunged balls ride the arc and never reach the lanes). Multiball is a lock: two moon landings (`g.land`/`g.landN`, +1 per multiball up to 4) light it (`g.mbLit`) and the black hole starts it. Match after the last ball (1 in 10: one more ball, once). Ball search kicks a still ball after 1.5 s unless a flipper is up. The DMD queues messages (`say(...,now)`, `g.dq`, stale ones dropped after 4 s). Moon/lane resets run on the game clock (`moonRs`/`laneRs`), never setTimeout (the sim can't see those, and they fired while paused). Balance from a headless bot (`tools/dev/pb_sim.js`: it evals the `pinball:{...}` block with stubs and flips when a ball nears a bat): median ~700k for a strong bot, ~7 missions, 2 multiballs, Supernova 1 game in 3; stars 100k/350k/900k, mastery xp step 300000.
- Pinball playfield art: `assets/pinball/space-table.webp` (the user's art, 863x1823, so `TH`=2.112) is the table texture; the layout follows it (`geom`, `FP` flipper pivots, `FL`, `SL` slingshot triangles [x1,y1,x2,y2,yb], `PLY` launcher floor at the bottom of the art's yellow tube; bumpers in its three rings, lights round its atom). To lay features on new art: grid the image in table units (u = x/width, v = y/width) and read positions off it. Camera distances scale with `TH/1.62`.
- Pinball is drawn in 3D (Sept 2026, after the old desktop space table): `b3` builds the table once in the game renderer's scene (`gpSc`): painted playfield canvas, chrome rails + neon strips from the physics segments, mushroom planet bumpers, rocket-fin slingshots with a rubber face, moon targets that sink, a swirl black hole, S-P-A-C-E light discs, a ring of chasing lights, flippers on pivots, a spring plunger, and the ball = a glass sphere with the real pet inside (scaled to fit, spinning with the roll). `upd3` animates them from the physics state, `draw` renders with a camera behind the flippers (steeper and closer on portrait screens), `proj` puts points/particles on the 3D spot, `exit` removes it and restores the pet. `draw2` is the old flat table (fallback). Launch strength is now 3.1-4.35, so a quick tap always clears the chute. Keepers no longer talk over a minigame.
- {pet} Pinball (`GAMES.pinball`, the `pinball` table on the arcade's party floor; any shop layout item can carry `game:'<key>'`): a retro-futurist space table, the pet is the ball (curled pose, drawn from the game renderer inside a glass bubble). Table units x 0..1, y 0..`TH` 1.62; `geom` builds the segments (top arc, walls, inlane guides, rocket-fin slingshots with `kick`, S-P-A-C-E lane posts, the moon bank); planets = pop bumpers, 3 moon drop targets (all down = Moon landing bonus), black hole saucer (holds 1.4 s, then ejects), plunger lane (`press/release` 'p', charge while held), 3 balls, 6 s ball save, S-P-A-C-E raises the multiplier (flipper presses rotate the lit lanes). Physics: 10 sub-steps, `hitSeg` circle-vs-segment, `hitFlip` moving capsule adding the flipper's contact velocity. Input: pointer ids are now passed to games' `down/up` (two flippers at once); keyboard arrows/Z/slash, space/down to launch. A bot sim (60 games) found no stuck spots or escapes after moving the slingshots up (the inlane was narrower than the ball); bot median ~15k, so stars are 15k/40k/80k.
- Android back button: `backAct()` closes the topmost thing (reward, game, gacha, map arrange/card/map, pet wheel, paint brush, product card, sub-page back, sheet, follow; in a shop it opens the map); a spare history entry is re-pushed after each handled back; with nothing open, a second back within 2.5 s leaves.
- State: `defaultState`, `normalize` (migrates old saves — keep it backward compatible), `saveSoon`/`flush`, `connectShared`.

## Engine gotchas
- Static mesh merging (draw calls: each mesh is drawn for colour, outline and shadow). `bakeKeeper(K,kind)` (shop keepers and Capsule Pals), `bakeStatic(o)` (every shop fixture with its stock, in `buildShop`; every furniture piece, in `buildItem`) merge meshes that never move into their nearest moving / tappable / root ancestor, grouped by material *properties* (so copies of an identical material merge) and outline. What moves is found by simulating (keepers: `upd` in idle/talk/greet/cheer, cached per kind by tree index; objects: `userData.anim`/`use`) and watching transforms, visibility and material values (`bakeWatch`). Merges stop at tappable nodes (`BAKE_STOP`: product, offer, game, gacha, svc, catalog, door, keeper). Consequence: after building, don't look up individual child meshes of a keeper/fixture/furniture piece to change them; animate groups, or make sure the change shows up in the simulation. Result: keepers 651→319 meshes, Snack Shack 1068→438 drawn, Toy Box 1205→570, home ~330→221.
- Dynamic geometry `dyn=2` re-uploads positions only (bubbles; normals never change).
- Adaptive resolution (`adaptQuality`): steps the pixel ratio down when frames are slow and back up after smooth stretches; ignores hitches over .25 s and the time around travel; floor 1.25x on high-DPR phones. It used to only go down, so one heavy shop made the whole session fuzzy.
- Lost WebGL context (Android drops it for backgrounded apps): every `WebGLRenderer` now rebuilds itself on `webglcontextrestored` (`_initGL()` re-makes programs, the white texture, shadow map, line/quad VAOs, post programs, and empties the `_vao`/`_tex` caches so geometry and textures re-upload lazily on the next frame; `this.bg` survives). The page only reloads (`glReload`) if the main context isn't back 3.5 s after the app is visible again (`glCheck`), and a reload returns you to the same shop and floor: `spotSave()` writes `{k,lv,t}` to sessionStorage on hide/pagehide/before reload, `spotResume()` travels there ~0.9 s after load (same app session, under 3 h). Test with `WEBGL_lose_context` (`loseContext` then `restoreContext`) on `renderer.gl` and `tm.R.gl`.
- Textures are uploaded once: after redrawing a canvas texture call `renderer.disposeTexture(t)` so it re-uploads (`needsUpdate` alone does nothing).
- Top-level `const`/`let` order matters: anything run at load (e.g. registering catalog entries) must come after what it uses (`BUILD` is defined after the tiles block; window CAT entries are registered just before the TOWN block for that reason).
- Class names are global CSS: `.own` is the in-room count badge (a card class `own` broke layout once).
- Full-size tile sources are 1024² canvases (~4 MB); use `thumbTex(key)` (swatch) for many small things, and `stylePat` frees the source when the set isn't in use.
- Shops are built after `setRoomSize(8)` (wall pieces placed against a bigger home room ended up outside the shop, which hid every sign for a while).
- Transparent materials render very faintly; use opaque jelly for things that must read (the fairy wings).
- The mini engine is not full three.js: e.g. `Vector3` has no `lerp`; the name `skyTex` is already taken (porthole texture).
- Edits are usually done with Python string replacement asserting each target occurs exactly once.

## Testing (what has worked)
- Serve: `python3 -m http.server 8765` from the repo root (it dies between sessions; restart it). On Garrett's Windows PC the repo is `C:/Users/Garrett/Documents/Room-For-Two`; Python with fontTools/Pillow/numpy is `~/anaconda3/python.exe`, and the solo-mode server `tools/dev/serve_solo.py` (serves `firebase-config.js` as null, 404s `sw.js`) is what to use with the in-app browser (in the desktop app, add it to `.claude/launch.json` as a `python` config on port 8765). The Playwright notes below are from a cloud session (Linux).
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

Not yet verified by hand: moving the door by tapping a wall (Decorate → Door → Move door), the 12×12 upgrade, storing
furniture back to storage, and scrolling door/window thumbnails on a phone (each renders its set's pattern, may stutter).

## Where things stand (end of the Sept 2026 cloud session, after the desktop one)
Done, in order: room sets 01–10 imported (40 tile sets); buy/build rework (Decorate tabs Furniture/Floors/Walls/Door,
owned-only outside shops, clear tile names with theme headings, debug Sandbox, fixed the paint bar that never showed);
the Two-Do List game loop (daily two-dos, treat, weekly sticker card, story levels, big moments); Jelly Arcade with four
minigames; then the arcade redo (real 3D pet in the games, levels/stars/mastery, refined art).

Not verified on a real phone yet: arcade performance (the pet renders in a second WebGL context every frame; if it
stutters, render the pet every other frame or at a smaller size in `gpDraw`), game touch controls, and the reward
cards. High scores started fresh with the stars version (old `state.arc.best` is ignored). Placeholder icons
`assets/icons/arcade.webp` and `twodo.webp` were drawn in SVG by Claude; the user may replace them with ChatGPT art
(prompts were given: glossy jelly arcade cabinet; pink clipboard with checks and a heart).

## Where we're going
- Style shops are in (Glow Up Studio, Jelly Threads). Worn things show in the arcade too (they sit on the rig sockets). Ideas: more accessories each week, accessory colours, outfits saved as presets, back items that are visible from the front more often (the pet usually faces the camera).
- Map art for the shop houses; ChatGPT icons to replace the SVG placeholders `assets/icons/glam.svg` and `wear.svg`.
- More ChatGPT art: tile sets (follow `tools/tiles/README.md`), pet portraits per stage, item art, posters, backdrops.
- Shops could change stock/prices over time (the showroom and deals are already daily, seeded by date).
- Longer term: exploration.

## Other ideas discussed
- Pet portrait art per stage for the pet card; item art; wall-art posters; backdrop paintings (prompts were written).
- Exploration as a future expansion.
- Reef Pinball (`GAMES.pinball2`, second table on the arcade's party floor): a child of `GAMES.pinball` (`Object.assign(Object.create(GAMES.pinball),{...})`) overriding only what differs: its own missions/ranks/`WORD` 'CORAL', `SUB` text map, jellyfish bumpers, clam/lighthouse/periscope posts, kelp spinners, a whirlpool that pulls the ball in, a procedural playfield (`paintTex`), a tide (`TIDE` 28 s sine, `grav` lighter at high tide, low-tide pearl bonus) and a third flipper guarding the left lane (`FP`/`FD`, driven by the left button). Bot sim: `node tools/dev/pb_sim.js 20 pinball2` (median ~1M, stars 120k/400k/1M).

## Pinball art and cabinets (Sept 2026)
- Reef Pinball's playfield is the user's art `assets/pinball/reef-table.webp` (863x1823, same aspect as the space art, so the same table units apply). `GAMES.pinball2.paintTex` draws it into a canvas and overlays the pearl bank, whirlpool, clam sand, lighthouse rock and periscope ring; when the image finishes loading it repaints and `_redo` calls `gpR.disposeTexture` so the GPU copy refreshes.
- Arcade cabinets: `pbCab(o)` (before "NEW SETS: helpers") builds a tilted-table pinball machine with legs, rails, apron, plunger, glass, flippers and a backbox with a painted backglass; the playfield plane uses the same art as the game (`pbImg` preloads it). `BUILD.pinball` = `pbSpace` (purple, planets/atom/moons), `BUILD.reefpinball` = `pbReef` (teal + sand, jellyfish bumpers, lighthouse, clam, whirlpool, third flipper). CAT `reefpinball` is used in the arcade party floor for `game:'pinball2'`. Body colours are fixed per theme (they ignore the catalog tint).

## Town building models (Sept 2026)
Each shop in the town view is a novelty building from `TM_BODY[k]` (before `tmHome`), replacing the plan-derived boxes and `tmFlair` roof props (both still exist as fallback for a shop with no `TM_BODY` entry). Each builder gets `{hw,hd,dz}` (half plan size, door z), keeps the west face flat at x=-hw so the shared door/sign/owner code in `tmShop` still fits, and returns the label height. Snack Shack = a cream bakery-diner (v34 redesign: checkered orange wainscot, soft orange roof caps, brick kitchen chimney, a lathe-turned burger on the bakery roof with wavy lettuce, cheese drips, tomato, sesame seeds, a toothpick flag and bunny ears (one flopped), striped café awning with bunting, a patio with two umbrella tables in the plan's empty corner), Toy Box = toy box with a bouncing spring-head (Boing), Bubble Salon = bubble bath with a duck (Fizz), Cozy Nest = pillow stack with a nightcap (Cushy), Hammer & Hue = hard hat with drips, mallet and paint can (Bolt), Glow Up = vanity with bulb mirror, lipstick, powder puff and afro puffs (Pom/Blush), Jelly Threads = tape-measure box with button, yarn ball and needle (Stitch), Jelly Arcade = control-panel deck with joystick and a marquee (Joy). Mirror/marquee are double-sided because buildings rotate in arrange mode. The map camera is high, so silhouettes and colour matter more than fine detail.
- Plan massing (refinement): every `TM_BODY` builder starts with `tmMass(g,k,{m,mD,h0,h1,r,ld,wm})`, which builds the shop's real plan as merged room blocks (level 0 at `h0`, level 1 stacked at `h1`, staff rooms lowered by `ld` and darker `mD`) with windows on outer walls, and returns `{out,yt,upper,X,Z}` (blocks `{x,z,w,d,y,lo,li}`, top height, plan-to-world helpers). The wacky theme is then dressed on those blocks (toys: loft block under the spring head; build: hard-hat dome over the gallery; arcade: marquee on the party floor; snack: burger layers follow `tmFoot2(k)` footprint rects; salon/glam/wear/furn: rims, bands and roof props per block). Builders return the label height.

## Font fix (Sept 2026)
- R42 Bubble's counters (holes in o, e, a, B, 8, 0, &, @) were too small, so the UI's ink outline (text-shadow, `strokeText`) filled them. `tools/font/build.py` now runs `open_counters` before tracing: every interior hole is dilated by `GROW` px (default 6, env var) at the 4x mask scale. Needs `opencv-python-headless`, `potracer`, `brotli` (scipy breaks with numpy 2 here, so it's cv2 only). Rebuild: `python extract.py && python build.py` in `tools/font`. `sw.js` CACHE bumped to v3.

## Camera pan (Sept 2026)
- Two-finger drag pans the camera (`camPanBy`, in the `pinch` gesture: pinch = zoom, twist = rotate, midpoint drag = pan). `cam.panT` is the target offset, `cam.pan` eases to it and is added to the look-at point in `updCam` (faded out while styling, cleared on travel and when following the pet). Limit ~1.6x room half-size. A "Re-center" pill (`#centerPill`, `camRecenter`) shows whenever the camera is off-centre. The engine's `lookAt` takes a Vector3 only (use `camLook`).

## Z-fighting and the lift (Sept 2026)
- `buildPlanLevel` wall runs extend `WT/2` past their ends so corners close; that made end faces coplanar with the neighbouring run's outside face. `seg` now takes `J` (joined ends) and skips end faces where another run touches that end point (`joined`); interior and rail tops get distinct tiny y offsets.
- `fxElevator` is a real lift: front wall with an open doorway, doors slid into the jambs, a lit cab (mirror back, rail, ceiling light) in a shaft that runs back behind the wall, with a dark upper shaft, cables and guide rails.

## Shop logos (Sept 2026)
- `assets/logos/<shop key>.webp` (snack, salon, toys, furn, build, glam, wear, arcade): the user's ChatGPT logos (name baked in), trimmed and 640px. `SHOP_LOGO`/`shopLogo(k)` (before `updStoreBar`): the in-shop chip (`.storechip.logo`) and the town card header (`.tmh img.lg`) show them. Not yet used: 3D town signs, door signs, map SVG pins.

## Town map look (Sept 2026)
- Aesthetics pass: `tmIsland` builds a rounded layered island (`tmRR` rounded-rect outline, three `flat` slabs: light grass lip, dark grass, soil), a candy picket fence round the rim (posts, caps, two rails, four corner lamps), a painted grass plane (mowing checker, mottling, tufts, five-petal flowers; the grid overlay is a separate transparent plane shown only in arrange mode) and three pivots of drifting clouds (`tm.cl`, rotated in `tmTick`). Paths use three cobblestone materials (`tm.cob`). `tmPad` puts a tinted stone pad under each building. Labels are the text-free logos (`assets/logos/<key>-nt.webp`, home uses the room icon) with a small name pill under them, bobbing via CSS; sky is a brighter gradient with a sun glow and vignette. `sw.js` CACHE is v5.

## Town map declutter (Sept 2026)
- Labels are name pills only (`.tml span`, sun colour when you're there, a pink dot when the pet wants to go there); the bobbing logos and badges are gone (the text-free `*-nt.webp` logos are unused for now). Grass tufts/flowers, fence caps and the sky dot pattern were toned down. `tmMass` blocks now get plinth, cornice and detailed windows (frame, glass, mullions, sill, lintel, side trim).

## Town map popup (Sept 2026)
- The town map floats over the room with no card, border or backdrop: `#town3` is a faint scrim (tap it to close), `#tmPop` a transparent box (canvas `#tmc`, labels, title, Arrange, close, shop card and tools live inside it). It grows out of the Explore button like the macOS minimize genie (`tmGenie(open)` animates a CSS `matrix3d` quad from `tmQuad`: the top edge leads, the bottom lags and pinches into `#dkExplore`; close reverses it). `tmTick` sizes the renderer and projects labels from `#tmPop`'s `clientWidth/Height`. `tmIsland` is just a flat map ground (cream rim slab, checkered grass plane, arrange grid `tm.grid`); the island/meadow/hills/fence descriptions above are superseded. Default zoom .98. Town camera near/far 4/260. A throw inside `tmIsland` makes `tmInit` return null and the map falls back to the old SVG map, so check the console for `town` warnings. `sw.js` CACHE is v11. `genie(el,btn,open,dur,end)` is the shared genie: the map (`tmGenie`, 340 ms open / 220 close) and the menu sheet (`sheetGenie` from `setTab`, from `#dkMenu` or `#dkPet`, 300/210 ms; the `.sheet.gen` class pins it in place while it runs). The pet wheel warps the same way as a whole cluster (now `wheelAnim`, see below).
- Genie fixes: `setTab` renders the sheet (and `fitSheet`) before `sheetGenie` when opening so the first open measures real content; `genie` clamps p >= 0; the map's labels/title/buttons are hidden while `#tmPop` has `.gen` and fade in when the genie ends; `tmInit` is pre-warmed 6 s after load to avoid a cold-open stall. `sw.js` CACHE is v12.

## Perf patch (Sept 2026)
- `roomItem(id)` at home used a linear `state.items.find` per call, called per item per frame (O(items²)). `loop` now builds `frameIM` (id → item Map) once per frame at home and clears it before render; outside the loop `roomItem` falls back to `itemById`. Audits of `normalize`, all menu pages, shops, catalog, doors/windows, wear and keepers found no other errors.
- Map open stall (Sept 2026): the first open cost ~860 ms (town scene sync + shader compile + first render), which also swallowed the genie so the popup appeared at its final spot. The 6 s pre-warm now also runs `tmNorm`/`tmSync` and one offscreen render (first open ~20 ms), and `genie` starts its clock on its first animation frame. `sw.js` CACHE is v14.
- Map genie on slow phones: the town re-rendered every frame during the genie, so frames were slow and the time-based animation skipped to its end ("comes from the top"). Now `tmTick` draws once and then skips rendering while `#tmPop` has `.gen` (the canvas keeps its last frame); `genie` advances at most .14 per frame (`pl`) so every stage shows; `#town3` fades only its scrim background (it used to fade the whole layer, hiding the close shrink) and is hidden when the close genie ends. `sw.js` CACHE is v16.
- Android Chrome drew the genie's `matrix3d` wrong on the WebGL canvas (the map grew from the top-left corner on a phone, although `getBoundingClientRect` and desktop were right; the menu, with no canvas, was fine). While `#tmPop` has `.gen`, `#tmc` is hidden and a 2D copy `#tmSnap` (`tmSnapNow`, drawn right after a render) is animated instead; `tmClose` renders and snapshots before the close genie. Don't put a 3D CSS transform on a WebGL canvas. `sw.js` CACHE is v17.
- That still failed on the phone, so the map no longer uses the `matrix3d` genie: `tmPopAnim` is a plain 2D translate + scale out of the bottom middle of the screen (height leads, width follows, cubic ease-out, 300/200 ms, same per-frame cap). The menu sheet and pet wheel still use `genie`. `sw.js` CACHE is v18.
- `APP_V` (next to `hardRefresh`) is shown under Refresh app in the menu so the user can see which build a device runs; bump it together with `sw.js` CACHE. `hardRefresh` waits at most 2.5 s for the save (a hung shared-room write used to block the reload).
- The second open still came from the top on Android, so the map's own layer (`#tmPop`, with the WebGL canvas) is never transformed now: `tmGenie` hides it (`visibility`) and flies a separate fixed 2D canvas `#tmSnap` (`.tm-fly`, a child of `#town3` outside `#tmPop`, filled by `tmSnapNow`) over `#tmPop`'s rect with `tmPopAnim`, then shows the real map. `APP_V` 20, `sw.js` CACHE v20.
- Map genie v3 (Sept 2026): a real macOS genie drawn in 2D. `tmGenie(open)` hides `#tmPop` and draws the cached snapshot `tm.snap` onto the full-screen canvas `#tmSnap` in ~H/3 horizontal strips: the sides bend into a funnel toward the Explore button (`b`), then the rows slide down through it (`sl`); opening is the reverse (380/320 ms, per-frame cap .12). No CSS 3D transforms anywhere near the WebGL canvas. Open lag: the snapshot is made ahead of time by `tmFresh()` (sync home, reset to the open pose, `tmDraw`, `tmSnapNow`, `tm.snapOk`) 6 s after load and ~350 ms after each close, so `tmOpen` renders nothing up front (click ~4 ms); the live map (`tmFrame` = `tmDraw` + labels) is drawn when the genie lands. `tmTick` skips while `.gen`. `APP_V` 21, CACHE v21.
- Genie tuning: the map shows from the second frame (slide `sl` is u² so it moves fast at the start of an open, the clock starts one frame back, alpha only fades over the last 4%), ease-out on open / ease-in on close, 300 ms each; `#tmSnap` is only reallocated when the viewport changes and drawn at ≤1.25x; after landing the snapshot stays up two more frames so the live WebGL canvas never shows blank (the blink). `APP_V` 22, CACHE v22.

## Pet wheel animation (Sept 2026)
- `wheelAnim(open)` uses the Web Animations API on plain 2D transforms (no matrix3d): the pet circle stretches out of `#dkPet` genie-style (squash, tall stretch, settle), then the need circles radiate from behind it with an overshoot, staggered (`data-x/data-y` hold each target); close reverses it. Need labels are SVG `textPath` arcs (`arcLabel`) hugging the outside of each ring (top half reads clockwise over the top, bottom half counter-clockwise under it). `w._busy` blocks `renderWheel` re-renders while it animates. `.pw-c` sits above the needs (z-index). APP_V 23, `sw.js` CACHE v23. Timings were sped up ~30% in v25.

## Journal, Inbox, Footprints (Sept 2026)
- Mail is split into three menu pages (`MENU_ITEMS`; each has its own unread badge via `unreadOf(sec)`, seen-times in localStorage `markSeen`/`seenT`, cleared in `setTab`). **Journal** (`state.journal`, `renderJournal`): the pet writes it. Narrative, generated from templates (`JR_T` per event, `JR_AWAY` per time of day) filled by `jrCtx` (pet name, head names, an owned item, personality fav). `jrEvent(k,x)` is called from care actions, growth, wishes, gifts, capsules and shop buys; `jrUse` adds throttled idle lines (25 min, 35%); `jrCatchUp` (run by `lifeCheck` ~5 s after load) writes 1-4 "while you were away" entries spread across the gap, timestamped inside it. `{p}` in stored text is replaced at render with who did it. **Inbox** (`state.inbox`, `renderInbox`): DM-style bubbles; residents (`RES`, one per keeper) send at most one message per 9 h on load (`RES_T`+open/end lines) plus a thank-you after a shop buy (`resThanks`, 3 h gap); partner notes (`state.feed` k 'note') show in the same thread and the compose box sits at the top. **Footprints** (`renderSteps`): the `state.feed` events (non-notes), who did what.
- Both devices write these arrays, so `jrAdd` dedupes by text and time. `state.jrT` (last flush) drives the away gap, `state.ibT` the last resident message. APP_V 25, `sw.js` CACHE v25.

## Menu cleanup (Sept 2026, v26)
- `MENU_ITEMS` entries carry a group (6th field): `h` Home & pet (Decorate, Wardrobe, Journal), `t` Together (Two-dos, Inbox, Footprints), `s` a slim row (Room & sharing), `''` hidden (Debug, reached from Room & sharing > More). The old floors/walls shortcuts and room-size hint were dropped from the Room page (Decorate already has them); room code, reset and debug sit in a collapsed `.adv` section.

## Floating menu (Sept 2026, v27)
- The Menu button (`#dkMenu`) opens a floating cluster like the pet wheel, not a sheet: `#menuwheel` (`.petwheel.mw`), `openMenuWheel`/`closeMenuWheel`/`renderMenuWheel`, same `wheelAnim(open,wid,bid)` (2D transforms only) fanning out of the Menu button. The six `MENU_ITEMS` in groups h/t ring round the centre circle **Our room** (room icon + `#presence` text; tap = Room & sharing); Refresh app is a small pill `.pw-ref` near the top with `v${APP_V}`. Circles are white with a brand-colour inner ring (`MN_RING`, like the pet wheel), labels arc over the top for upper circles and under the bottom otherwise (never sideways). Every menu page starts with the same header `pgHead(k,{t,right,sub})`: the circle's icon in a matching ring, the same name as the circle, an optional right chip (hearts, date) and a subtitle; Decorate gets it through `decoSeg`. Badges from `menuBadges()`. APP_V 28, CACHE v28. `wheelOn()` covers both wheels, `closeWheel()` closes both. The sheet's back button (`#sback`, "Menu") reopens the cluster. `renderMenu` and the `openTab==='menu'` sheet are gone. `APP_V` 27, CACHE v27.

## Town map fidelity pass (Sept 2026, v29)
- Map labels are the shops' text-free logo stickers (`assets/logos/<key>-nt.webp`, home = `tab-room` icon) with a little pin tail (`.tml img`/`.tml i`; `here` bobs with a sun tail, the pet's wish = pink dot `b`); the name is the button's aria-label/title and still shows in the card.
- Rendering: the town renderer now has sun shadows (`dl` at (-11,11,1.5), ortho shadow camera +-15, 2048 map; placed so shadows fall sideways where the camera sees them) and contact AO (`tmAO`: one entry per building and decoration in `sc.userData.lighting.ao`, max 24). The sky fill is halved through a getter on `lighting.sh` (scales `env._sh`), otherwise it washes the shadows out. `#tmc` has a soft CSS mask on its edges (2D only).
- Ground: painted grass (dapples, grass strokes, clover, five-petal flowers, darker rim) at 48 px per cell; a layered diorama base under the cream rim (caramel soil + darker bottom + pebbles). Cobbles are 128 px with grout and highlights. `tmWater()` ripple texture on the pond, fountain and salon pools.
- Buildings: `tmGlass(tint)` glass (sky gradient, curtains, streak) for all windows; `tmMass` adds flower boxes under ground-floor windows; every shop door gets a mat, potted topiaries and lanterns; untextured shop materials get the engine's plaster speckle (`detail=3`, not the door model or figurines, whose materials may be shared). Trees have two-tone canopies with blossoms. Home (`tmHome`) is a cottage: shingled roof halves in the heads' lime and blue (`tmShingle`), shutters, flower boxes, heart on the front gable, porch awning and lanterns, picket fence with a gate gap, stepping stones, mailbox, chimney smoke (added after `bakeStatic`, which otherwise merges animated children it can't see move).
- Time of day on the map (v30): `tmTOD()` (run from `tmDraw`, at most once a second unless the debug sky slider `skyHourOverride` is set) follows US Central time via `centralHour()`, with keyframes `TM_TOD` [hour, light colour, intensity, sky fill, fill tint, emissive boost, night] on the same hours as `SKY_TIMES`. The sun rises on the right of the map and sets on the left (long warm shadows at dawn and golden hour); at night a bluish moon light from the upper left, the sky fill drops and is tinted (`tm.todK`, applied by the `lighting.sh` getter), windows glow (`tmGlassMs` emissive), decoration lamps become point lights (max 8), and the scrim behind the map darkens (`--tmn`).
- Map signs (v32): every building has its own sign object by the door, fixed in the world (`TM_SIGN[k](fg,L)`, built after `bakeStatic` by `tmSignFor`, then baked itself unless it animates): Snack Shack A-board with a bun, Bubble Salon hanging bubble sign on a gold bracket, Toy Box lollipop pole, Cozy Nest cushion stack, Hammer & Hue plank sign with hazard stripe, Glow Up mirror with chasing bulbs, Jelly Threads button sign on a hanger bracket, Jelly Arcade marquee lightbox, Home wooden plaque by the gate. Faces use `tmFace(p,w,mat,d,edge,round,oneSided)` with `tmLogoTex(k,bg,round)` (logo on a cream plate over the sign colour; redraws + re-uploads when the logo loads and re-snapshots the idle map). Logos are preloaded at start (`tmImg`, `TM_IMG`). At night (night > .4) the logo materials switch to unlit (`m.basic=true`, emissive 0) so they read like lit signs; emissive white washed them out to blank (the engine's emissive is a flat colour over the map, and the night emissive boost multiplies it). Test map changes at night too (`skyHourOverride=22`), not just noon. The old name board over the door is gone (the canopy stays). A strip of the logos along the bottom of the map (`#tmDock`, `tmLabels`) is the quick-travel row: tap = `tmSelect`; `here` has a sun dot, the pet's trip wish a pink dot. It hides while the card or arrange tools are open. While a place is picked, a "Map" back button (`#tmBack`, top left, replaces the title) returns to the overview. The camera is shifted toward the viewer (`tm.off`, 1.9 overview / .75 focused) so the board sits above the strip and a focused shop above its card.
- Map warm-up: the map is built, rendered and snapshotted ~1.6 s after start (requestIdleCallback, 1.5 s timeout) so the first Explore tap is instant.

## Keeper speech bubbles (v35)
- `keeperSay(txt,K)` -> `kbShow`: the bubble `#kbub` gets a name tag in the shop colour (`.kn`, from `TM_OWN[K.kind]`), types its text out (`KB.n`, 38 chars/s, `.on`/`.off` spans so the size never changes) while the keeper's mouth moves (`talking` in `updShop` = revealing), then holds for a reading time (2-5 s). Tap it: finish typing, then the next queued line (`KB.q`, max 2, a pink arrow `.more` shows there is more), then close. A new line while one is still typing is queued instead of overwriting it.
- Placement (`kbPlace`, every frame from `kbTick`): candidates above / right / left / below the keeper's projected Box3 (cached at say time, trimmed to the body; `y0` pulled toward the head), scored by staying on screen, not covering the keeper, and not covering the HUD (`header.top .brand/.jar`, `#storebar`, `#dock`, `#floorchip`, `#shopcard`, the sheet), with a small bias to keep the current side; eased position; the tail (`.tl`, a rotated square) sits on the edge facing the keeper and points at the head (`data-side` t/b/l/r). The old version anchored .55 above the head in world units, which a steep shop camera squashed onto the face.

## Shopkeeper close-up, chat and friendship (v36)
- In a shop the shop's logo replaces the Room for Two logo top left (`body.away .brand>h1.logo` hidden, `.storechip.logo img` 92px). Careful: the store chip also has class `logo`.
- Tapping a keeper opens the close-up (`kOpen(K)`, `kmode={K,kind,view,y0,hk}`): `body.kmode` hides the HUD, routine toasts are dropped (forced ones still show), the camera blends to the keeper (`cam.kk`, target from the keeper's Box3: menu = whole keeper with headroom for the bubble, `hk*1.6` visible; shop = face, `hk*.95`), the keeper turns to and looks at the camera (`keeperGaze` mode 'cam'), and `#kpanel` slides up. Views (`kPanel(view,dir)`, height animated FLIP-style, content slides): **menu** (`kActs`: Chat, Shop, and per shop Restyle (Pom) / Makeover (Blush) / Play a game (arcade) / Capsule machine (toys, arcade) / Fitting room (wear)), **chat** (`kTopics`: mood, story, two random "what do you think of X", the pet, tips), **reply** (answers to a question line; the bubble stays up until you answer, `kbT=600`). **Shop** = the sheet at 64vh (`.sheet.kshop`, no genie) with the keeper's face in the top third; `setTab('shopcat')` renders furn (renderDeco buy), build (`renderBuildCat`) or `renderGoodsCat` (goods of `S.kind` by category, wear items for sale, or the arcade's games). The sheet's back button says the keeper's name and returns to the menu (`kShopBack`); × says bye (`kClose`). Back button / Escape / empty tap step back through the views.
- Dialog lives in `KBIB` (keeper kind -> {n, role, hi:{m,d,e,n}, hiF, mood, story:[[level,line]], tips, pet, rel:{other: line}, bye}); lines can be `{t, r:[[you say, they answer]]}`. Written from the character bible `tools/writing/keepers-bible.md` (personalities, voices, relationship map); keep them in sync. `{n}` pet name, `{a}/{b}` head names.
- Friendship: `state.kf[kind]={p,d,s}` (shared, normalised): first chat of the day +2, each purchase +1 (`buyOffer`), story index `s`. Levels `KF_LV` 0/4/10/18/30 = `KF_N` New face / Regular / Friend / Good friend / Bestie; shown as hearts in the panel; stories unlock by level (`KB_LATER` deflects), greetings get warmer from Friend (`hiF`).
- Arrival hint now says to tap the keeper; the speech bubble in the shop view clamps to the top of the screen over the keeper's head rather than covering the catalogue.
- v37 fixes: the sheet's `deco` class (Decorate layout: the body doesn't scroll, `#tray` does) is only for Decorate and the Cozy Nest / Hammer & Hue catalogues; the keeper shop sheet scrolls its body (`.sheet.kshop .sheet-body`), so the goods / wear / games catalogues scroll. Leaving or switching shops ends the close-up (`kmode.shop`); `kClose(quiet)` for actions that open another screen (games, gacha, studio, wardrobe) and closes the catalogue before clearing `kmode` (so no sheet genie); tapping the other keeper in a two-keeper shop switches to them. Chat badges (`#kbadges`, `updBadges` from `updShop`): a bobbing speech-bubble button over each keeper's head (from the keeper's Box3 top), tap = `kOpen`; a pink dot when you haven't chatted today or a story chapter is ready (`kNews`); hidden upstairs, while that keeper is talking, in the close-up, while styling, gaming or with a sheet open.
- v38: the hidden HUD in the keeper close-up is `visibility:hidden` plus `pointer-events:none` on its children: the dock's buttons (z 9) re-enable pointer events, so the invisible Menu button sat over the keeper panel's right-hand button and caught taps (Bolt's Shop opened the Menu). `body.mapopen` (set in `tmOpen`/`tmClose`) hides the chat badges and keeper bubble behind the town map.

## Pet autonomy and AI (v39)
- **Needs per furniture** (`needsOf(d)`, cached on the catalog entry as `d._nd`): explicit `NEED_OVR` (food tables and counters, bowls/fridges/vending with `e:1` = serves food from your bag, bath pieces, cuddly and cozy things, play pieces) then rules: pet beds (`NAP`) energy 40, beds 45, seats 12, ride-ons fun 16, `BOWL` = bag food, otherwise by use animation (`NEED_ANIM`: nibble/sip/stir = hunger, games/TV/music/swing/dive... = fun, splash/wash/dry = clean, hug/snuggle/warm/admire = affection). `needHas`, `needKeys`, `needLine` (used in the product card), `NEED_IC/NM/SHORT/WANT`. Coverage: ~45 food, ~72 fun, ~111 energy, ~16 clean, ~26 love of ~490 pieces; most decor fills nothing on purpose.
- **Choosing** (`needPick(stats)`, first in the idle chooser at home only): needs under `NEED_TH` (seek / urgent; energy seeks under 70 at night) sorted by how low they are; urgent ones always, others 55% of the time; candidates weighted by amount, recency and how much the pet likes the piece (`state.pet.likes`); a need thought bubble, then `goUse`. Nothing for the need in the room: `needMissing` (puzzled bubbles, lonely pets come and greet you) and, when urgent and no wish is active, a room-request wish `WISH_T.need` (`state.wish.need`, `ev:'need:<k>'`, Go = `openDecoNeed(k)`); placing any piece that fills that need grants it (`spawn` -> `wishHit('need:'+k)`).
- **Filling** (`autoFill(id)` via `autoUseStart` 1.2 s after a use starts: `startUse` (not inspections, `u.inspect`), `startPerch`, both nap paths): adds the piece's amounts to needs under 90, per need at most once per `AUTO_GAP` (6 min) using shared timestamps `state.pet.auto[need]` so two open devices don't double it; bowls/fridges eat one food from the bag (`bagFood`: paid food first, the biggest when starving, favourites otherwise; the free rice ball as a fallback), favourite food adds fun; no xp or hearts. Emotes the need, bumps `likes`, sometimes writes a Journal line (`JR_T.self_<need>`). An empty bowl (no food at all) says so once in a while.
- **While you were away** (`selfCareAway(gap)` in `lifeCheck`, gap from `state.jrT`): for needs under 65 with a provider at home, adds up to three uses' worth (capped at 85), eats up to three bag foods for hunger, sets the timestamps, writes one Journal line.
- **General AI**: night (US Central 22:00-7:00) sends it to bed sooner and sleeps longer (`petNight`, naps x2, bed naps x2.2); waking in the morning it stretches (`petMorning`); it comes over and waves (`petGreet`) ~4 s after the app opens, after 15+ min away, and when lonely with nothing cuddly; favourites (`state.pet.likes`) are chosen more often in `pickUse`/`needPick` and shown on the Pet page.
- **UI**: Decorate has a third browse mode **By need** (`decoBrowse='need'`, tiles `need:<k>` -> pages listing Yours / To collect grouped by set); every card shows small need icons (`.dneeds`); product cards say what the pet can use it for. The Pet page has "Looks after itself with" (`selfCareRow`: per need, how many pieces at home; a dashed "Add one" opens that Decorate page) and the favourite spot.
- Test autonomy by stepping `updatePet(dt,t)` directly (the loop uses real elapsed time, so stepping `loop` with fake timestamps doesn't move the pet), and remember `spotResume` may put a reloaded test page back in a shop (autonomy is home-only).
- v40: need names are the stats themselves: Hunger, Fun, Energy, Hygiene, Love (`NEEDS` labels and `NEED_SHORT`); levels like Peckish / Stuffed / Joyful (`TIERS`) show under each ring. "Full" and "Happy" were levels and read wrong as names.
- Android also wipes GPU-backed 2D canvases of a backgrounded app, so after the WebGL restore every canvas texture (tiles, sky, tags) re-uploaded blank and the room went black. Texture canvases are now memory-backed: `mkCanvas` and `ctex` create their 2D context with `willReadFrequently:true` (keep new texture canvases going through them). Safety net: `glProbe` (a small `mkCanvas` filled at load); if `canvasWiped()` is true when the main context comes back, it reloads to the saved spot instead of showing a black room.
- v41 shared saves merge instead of overwriting: every device wrote its whole copy of the one Firestore doc, so an idle device (the pet feeding itself saves every few minutes) put back old furniture and pet stats. `flush` and `tryRemote` now three-way merge against `syncBase` (last version both sides had, `snapBase` after adopting, merging or writing): keys only the other side changed are taken, keys only we changed stay, keys both changed use `MERGE` (hearts/tokens and inv/fown add both deltas, journal/inbox/feed join, owned sets union, visits/kf max, pet per field with needs combined as deltas at the same moment via `petAt`, xp adds). Furniture/tiles both changed: ours (the later write) wins. `afterMerge` redraws what changed.
- v42 sync hardening: (1) the base is persisted per room (`localStorage['r42base:'+roomCode]`, loaded in `loadLocal`), and the first snapshot after load merges instead of adopting when `localChanged()`, so changes that never reached the server (slow connection, the 9 s "couldn't reach" solo fallback, reload mid-save) aren't dropped. (2) Per-key revisions `state.kr` are stamped in `flush` for every key that differs from the base; `mergeInto` ignores a remote key whose `kr` is older than the base's (a stale whole-copy write, e.g. from a device still on old code, which carries the kr it last saw or none), and `tryRemote` always merges once a base exists, writing ours back if anything was stale. `SYNC_SKIP` (rev, kr, visits, jrT) aren't compared.
- v43 Welcome back card (`welcomeBack(since)`): opening the app (or returning to it) after 3+ hours on this device (`localStorage.r42seen`, refreshed every minute while open and on hide) shows a reward card greeting by US Central time, how the pet is feeling (its lowest needs' tier words), up to 3 Journal lines and 3 of your person's Footprints since then, and new Inbox notes/messages; the button ("Say hi to <pet>") makes the pet come over and gets a pat. `showReward(t,ic,html,{ok,fn})` now takes an optional button label and action.
- v44 sync, round three (items bought and placed still vanished overnight): the first snapshot after load now always merges when a base exists (it used to adopt the server copy whenever this device had no unsent changes, which skipped the kr staleness check, so an old-version device's stale overnight write won). Saves now carry `cv` (the app version) and `minV` (`SYNC_MIN_V`, the oldest version allowed to edit); a client older than `remote.minV` refreshes itself without saving (`hardRefresh(true)`). `firestore.rules` also requires `cv >= 44` on writes; it has to be published by hand (Firebase console, Firestore, Rules) as there's no Firebase CLI here. Publish it only after every phone runs v44, or the phones still on older versions go read-only.
- v45 Journal by day: today's notes stay as separate cards; every earlier day is one page (`.jr-day`, lined paper) written by the pet from that day's notes (`jrDay(list,key)`, seeded by the date via `jrRand` so it reads the same each time): opening by how busy the day was, milestones (hatch/warm/grow), who fed/bathed/played/tucked in and with what, outings, wishes/gifts, self-care (one per kind, `JR_SELF`), one of its own musings verbatim, and a sign-off from the heads; the original notes sit in a "The day's notes" fold-out. Entries now store `i` (item, shop or stage name) for these summaries (`jrAdd(...,i)`, kept by `normalize`; journal `k` now keeps 16 chars, older entries may have `self_affecti`). Self-care notes are written with `by:''`.
- v46: the Journal has no unread badge (it updates too often); only Inbox and Footprints count towards the Menu badge (`unread`, `menuBadges`).
- v47 keeper fidelity pass: `kPolish(K,kind)` runs before `bakeKeeper` in `buildShop`: every keeper material gets `rim` (.34; the shader's new `uRim` term adds a soft light on silhouette edges, off for other materials), plush keepers (`K_PLUSH`: Bunbun, Cushy, Stitch) get the fabric weave (detail 1), Fizz (`K_JELLY`) gets the glossy jelly finish (detail 4). The white step box is now `kPodium` (plinth, cream body with panel insets, gold band, a mat in the shop's colour; top still at y .5). Cushy's feet are lavender plush with a stitched seam and beads. The arrival hint toast is cleared when a keeper close-up opens.

## Traits, dreams, favours and town cheer (v48)
One loop tying pet care, the home and the town together (block before `cDate`). Everything counts from the two-do event reporter: `td(ev,amt)` now also calls `trHit`, `dreamHit`, `reqHit`. New events: `self:<need>` / `self:art` (from `autoFill` when the pet looks after itself), `chat` and `chat:<keeper>` (the first chat with a keeper each day, in `kSay`). `lifeTick()` (15 s interval + after `lifeCheck`) runs `reqEnsure`, `dreamTick`, `cheerTick`.
- **Traits** (`TRAITS`: foodie, homebody, playful, tidy, cuddly, stylish, artsy; points in `state.pet.tr`, merged with max): points from `TR_EV` per event; `trOf(d)` maps furniture to a trait (art animations `TR_ANIM`, else the need it fills most). `traitsOf()` = up to two traits with >= 6 points and >= 17% of the total. A new trait toasts and writes a journal line (`p.trS` remembers the shown set). Effects: furniture of a top trait is chosen ~1.45x more (`trBoost` in `pickUse`/`smartPick`), trait idles (`TRAITS[k].acts`) in `idleAct`, trait journal lines in `jrUse`, trip wishes favour trait shops (`trShop`), dreams and favours are picked to suit them. Pet page: "Who {n} is becoming" (`traitRow`).
- **Dreams** (`DREAMS`, `state.dream` {k,s step,got,n done,next,last}): three steps each (`st:[ev,count,text,go]`), two per trait plus three general ones. `dreamPick` is seeded by room + dreams done so both devices pick the same; a new one 3 h (`DREAM_GAP`) after the last. Completing: +15 hearts, +1 token, +4 xp, +3 trait, +20 cheer, a reward card and journal line. Pet page card `dreamRow` with Go per step (`reqGo`: shop keys, `k:<keeper>` travels there and opens the keeper close-up, `deco:<need>` opens Decorate by need, else `tdGo`).
- **Favours** (`REQ_T` per keeper, `state.req` {day,list:[{kp,i,n}],prog,done}): two a day from `reqMake(day)` (seeded by room + day, trait keepers 3x as likely, never the same event as a two-do, pet ones skipped for eggs). They arrive in the Inbox timestamped 12:00Z of that day (so both devices write the same message) and sit on the Two-dos page (`reqSection`, with the town cheer bar). Done: +5 hearts, +3 friendship, +10 cheer, a thank-you in the Inbox (and in person if you're talking to them). Keepers mention an open favour when tapped (`kReqLine`).
- **Town cheer** (`CHEER` levels [points, title, landmark, text], `state.cheer` {p,lv,hp}): +10 favour, +20 dream, +6 happy pet day (`cheerTick`: every need >= 60, once a day), +3 per two-do. Each level: reward card (+10+5*lv hearts, +1 token), a landmark decoration placed on the map near the middle the next time it opens (`tmGifts`, `tmSpot`, `state.tmap.gl` = levels already placed), decorations unlocked for Arrange (`DECOR_LV`, locked ones greyed in the palette), keeper chatter by level (`CHEER_TALK`). Map: chip `#tmCheer` (`tmCheerUI`) and card `tmCheerCard`. New decorations: bunting, candy cart, bandstand (gazebo), pet statue.
- Growth: `STAGE_XP` is now [0,3,8,15,25,40,100,400] (quick to young adult, elder is late game). `normalize` migrates old elders once (`pet.xv`): xp >= 150 becomes 400 + the rest, so nobody loses a stage.
- Merge rules: `cheer` (points add, level max), `dream` (more dreams done wins; two new dreams at once settle on the same one), `req` (newer day wins; progress per person max, done union), `pet.tr` max. `SYNC_MIN_V` is 48 (older apps refresh; they would strip the new map decorations).
- Debug: "Dreams, favours, town cheer" section (new dream, dream step, do favours, new favours, +50 cheer, +5 trait).
- Future direction (not built): more maps (a neighbourhood with keepers' houses, other townspeople), several workers per shop so keepers can roam without closing shops. Life stages matter less; most play is young adult / adult.

## Townsfolk, neighbourhoods and houses (v49)
Garrett asked for new townsfolk so shops never close, houses for everyone, and three neighbourhoods with some residents living together.
- **Assistants** (one per shop, modelled with the keeper kit by helper agents, reviewed in a headless preview): Pip `jam` (Snack Shack, jam jar), Loofah `sponge` (Bubble Salon, sponge in a towel turban), Tock `windup` (Toy Box, wind-up tin toy), Dusty `dust` (Cozy Nest, dust bunny with a duster), Sketch `pencil` (Hammer & Hue, pencil with glasses), Gloss `polish` (Glow Up Studio front desk, nail-polish bottle), Bobbin `spool` (Jelly Threads, spool of thread), Pixel `pixel` (Jelly Arcade, voxel cube). Models live between `/* <townsfolk> */` markers (before `tilesWith`), dialog between `/* <townsfolk-talk> */` (before `kActs`: `Object.assign(KBIB,…)`, `RES_T` inbox lines, `ASSIST_LINES` shop lines). Full character sheets: `tools/writing/townsfolk/<key>.md`; the bible has a summary. They're also Capsule Pals (`FIG_KEEPERS`), in `TM_OWN`, `RES`, `KEEPER_IDLES/TALKS`, `K_PLUSH/K_JELLY`.
- **Shifts** (`RESIDENTS` {n, shop, role, boss}, `resWhere(k,h)`, `townHour()` = debug sky hour or US Central): keepers work 7:00-17:00, assistants are home 7:00-13:00 and in the shop otherwise. `shopCrew(key)` decides who's in a shop (both: the assistant stands on the shop floor at a spot found by `crewPlace`, no podium; boss gone: the assistant takes the boss's podium spot). Gloss offers Pom's and Blush's services (`kActs`). Shops without anyone are guarded (`away.keeper` may be undefined in a house).
- **Neighbourhoods**: the map has tabs Town / Sugarloaf / Bubble Bay / Playhouse (`tmTabs`, `tmSwitch`, `tmUse(mk)`): each map keeps its own world, ground and buildings (`TM_MKEYS`, `tm.maps`), size `TM_MAPS[mk]` (`TM_W`/`TM_D` are `let`), layout `state.nmaps[mk]` (town stays `state.tmap`; `tmM()`, `tmSetM`, `tmNormCur`, `hoodDefault(mk)`; merge rule `nmaps:mFields`). Signposts `gate_hood` (town) / `gate_town` are movable buildings that switch maps. `HOODS` {n, short, blurb}; `HOUSES[id]` {hood, res:[residents], at:[gx,gz,rot]}: Sugarloaf Lane: bunbun, pip, cushy, dusty; Bubble Bay: fizz, loofah, stitch, studio (Pom & Blush), flat (Gloss & Bobbin); Playhouse Hill: gamenight (Boing & Joy), clockwork (Tock & Sketch, a couple), bolt, pixel. Roommates share working hours. Empty lots (`TM_DECOR.lot`, not in the Arrange palette) leave room for future townsfolk: a new resident needs a KEEPERS model, RESIDENTS + KBIB entries, a HOUSES entry (on a lot) and a house.
- **Houses** are `SHOPS['h_'+id]` with `house:1` (made by `houseShop(id)`/`addHouses()`, kept out of shop lists by `tmShops`, trips, favours): the same floor-plan buildings as shops, from `HOUSE_DEF[id]` {n, blurb, door, color, plan (W,D <= 6 so the map footprint is 2x2, door on the west), layout (catalog furniture), kg:{resident:[gx,gz]}, lines:{resident:{hi}}}, between `/* <house-plans> */` markers before `addHouses();`; map exteriors are `TM_BODY['h_'+id]` (novelty buildings like the shops') between `/* <house-models> */` before `const TM_IMG`. Residents stand on the floor (no podium) when home (`shopCrew`), and appear as figurines outside (`tmOwners`). A house sign is a name plaque (`TM_SIGN._house`). Close-up actions at home: Chat only.
- **Visiting**: `houseVisit(id)`: someone must be home and have invited you (Friend for keepers, Regular for assistants); reaching that level posts an Inbox invite (`houseInvite`, from `kfAdd`). The map card `tmHouseCard` says who lives there and when they're home. Visits fire `td('visit:h_<id>')` and `td('visit:house')` and sometimes a Journal line (`JR_T.visit`).
- **Debug**: "Neighbours and houses" section: get invited everywhere, everyone home (`dbgAllHome`).
- **Build tooling** (gitignored, `.claude/town/`): `kview.js` (creature preview), `hview.js <house id>` (map close-ups + interior), `run.js` (generic headless test with a `__T` eval hook injected at serve time, so nothing is added to index.html), `integrate.py` (re-runnable: puts creatures, dialog and the houses listed in `houses/DONE` between their markers), `talk.py` (dialog from the sheets), `BRIEF.md` / `HOUSE_BRIEF.md` (the agent briefs). Playwright lives in `.claude/pw/` (`npm i playwright` there; Chromium is in the user's ms-playwright cache).
- Ideas next: shopkeepers' events at home (Sunday tea at Bunbun's, Game Night at the Game Night house), redecorating requests (Happy Home Designer style), new townsfolk moving into the lots, keepers roaming (visiting each other) using the same schedule.

## 15 more townsfolk and Lantern Meadow (v50)
- Neighbours who aren't shop staff (Garrett asked for 15 more): Mayor Marsh `mayor` (marshmallow), Parcel `parcel` (cardboard-box mail carrier), Fold `crane` (origami crane, sign painter), Posy `posy` (flower-pot gardener), Prickles `cactus` (retired cactus adventurer), Dewey `book` (living hardback, librarian), Lumi `lantern` (lamplighter), Nimbus `cloud` (rain cloud, weather watcher), Beacon `beacon` (lighthouse, harbour keeper), Tutti `cone` (ice-cream cone vendor) and her niece and nephew the muffin twins Scone `scone` & Crumb `crumb`, Echo `gramo` (gramophone street musician), Dr. Patch `patch` (sticking-plaster doctor; hearts, never a red cross), Cobble `pebble` (pebble road mender).
- `RESIDENTS` entries without `shop` are townsfolk: `out:[from,to]` hours away (US Central, may wrap past midnight via `inHours`) with `away` text; `resWhere` returns 'out'/'home'. Their houses need no invite (`houseVisit` skips the friendship check for them; `houseInvite` is shop staff only). Dialog: the townsfolk part of `talk.py` (a line-based sheet parser; `letters` go to `RES_T`, `rel` names mapped to keys). Registries (RES, TM_OWN, Capsule Pals, idles/talks) by `.claude/town/reg_town.py` (runs once).
- Houses: Sugarloaf `tutti` (Tutti + twins, a household of three), `patch`; Bubble Bay `beacon`; Playhouse Hill `post` (Parcel & Fold), `cobble`; and a fourth neighbourhood **Lantern Meadow** (`HOODS.meadow`, map tab "Meadow"): `mayor`, `dewey`, `lamp` (Lumi & Nimbus), `garden` (Posy & Prickles, a couple), `echo`. New houses replace their lot in saved layouts (`tmNorm` drops an overlapping `lot`). Lots left: one in each older neighbourhood, two in the Meadow.

## Town life: tying it together (v51)
Garrett: "it's turning Animal Crossing-esque, build it all, mindful of usage". All in the `/* <town-life> */` block (source `.claude/town/life.js`, put in by `integrate.py`, wired by `.claude/town/life_wire.py`), before `kActs`.
- **Neighbours page** (menu tile `town`, `renderTown`, tabs `lifeTab`): People (everyone grouped by shops and neighbourhoods, where they are now `lifeWhere`, hearts, loves discovered so far, Gift button), Garden, Calendar (3-day weather, this week's events and birthdays, festivals), Parcels.
- **Gifts** (`giveGift(k,{t:'inv'|'fown',id},how)`): food/grooming from the bag or furniture from storage. `LIKES[k]` {love, like} tags (`f:<food cat>`, `g:groom`, `s:<set>`, `n:<fn>`); first gift a day: love +5, like +3, else +2 friendship; birthday +4; the day's house wish (`lifeWish`, one resident wants a kind of furniture) +3 and cheer. Loves are revealed as you find them (`state.disc`). Furniture given goes into the resident's house (`state.hdeco[house]`, placed on free cells by `houseDecoLayout`, layouts of houses are functions now). From the page it's sent with Parcel (thank-you in the Inbox); in a close-up it's "Give a gift" (reaction card). Every close-up has the gift action now.
- **Birthdays** `bdayOf(k)` (spread over the year), Mayor's Inbox note on the day (`townLifeTick`, deduped by text). **Weather** `weatherOf(day)` (sun/cloud/rain/wind, seeded by room + day so both phones agree); rain waters the garden; Nimbus writes on rainy days. Icons are inline SVGs (`LIFE_IC`), no emoji.
- **Jobs** (`JOB_ACTS[kind]` → `jobAct`): Dr. Patch check-up (report card from needs/stage/traits, +3 hearts once a day), Posy seeds (2 a day), Beacon lost and found, Dewey story time (reads a past journal day with `jrDay`), Tutti a free scoop, Echo plays a song (the pet dances), Mayor town news, Nimbus forecast, Parcel sends a parcel. Once-a-day bookkeeping in `state.acts`.
- **Garden** (`state.garden`, 3 planters; `SEEDS` berry/melon/root give food, sunflower/dandelion give furniture): plant, water once a day (either of you; rain counts), grows a stage per watered day (`plotGrowth`), harvest. Harvested plots stay as `{s:null,u}` so the merge (newest `u` wins) doesn't bring them back.
- **Parcels between the two of you** (`state.parcels`): wrap a shop treat (price + 1 heart) with a note; on the other phone `townLifeTick` opens it with a card and adds the item. (Same shared inventory, it's about the surprise.)
- **Events** (`EVENTS`, weekly, US Central; `eventNow` memoised per day/hour): Sunday tea at Bunbun's, Story hour at Dewey's (Wed), Music night at Echo's (Thu), Game Night (Fri), Bake sale at the Mayor's (Sat). Guests leave home/work (`resWhere` → 'event'; hosts stay 'home'), appear in the host house (`shopCrew`, `guest:1`), the house is open to everyone while it's on; arriving rewards once (`eventArrive`: +5 hearts, friendship, cheer, journal). **Festivals** (`FESTS`, a week each: Spring Picnic, Summer Fair, Pumpkin Parade, Festival of Lights) are all-day events at the Mayor's with a keepsake from the season's furniture set, the Mayor's letter, and plaza decorations on the town map (not saved).
- **Life around town**: off-duty residents pop into shops as customers (`shopVisitOf`, 2-hour slots, `resWhere` → 'visit', `customer:1` keepers on the floor, Chat + their job + Gift); visitors knock at home now and then (`visitorTick`/`spawnVisitor`/`updVisitor`, chat badge `#visBadge`, they bring a snack and comment on a piece in your room; at most every ~2.5 h per device); the pet can wish to visit a neighbour (`WISH_T.friend`); the Mayor writes when town cheer levels up.
- State/merge: `gifts`, `acts` (newest day per key), `disc` (union), `seeds` (counts), `garden` (newest per plot), `hdeco` (union by id), `parcels` (union by id, `open` union), `evseen` (set). Debug "Neighbours and houses": cycle event/festival, visitor now, +4 seeds, everyone home.
- Next ideas: a plaza place for market stalls, keepers' own room requests (redecorate a room in their house with a budget), birthdays with a party at the house, letters you can write to residents.

## One connected world map (v52, step 1 of the living town)
Garrett wants residents walking around a real town (an overworld after all), combining one big zoomable map, the wheel and a walkable town. Plan: (1) one world + wheel [done], (2) zoom levels and chunking, (3) the pet walks the streets; doors lead in and out; stepping out of your room puts you outside your house; picking a place on the wheel hops there, (4) residents walk their schedules, chat and gifts on the street, (5) events, festivals, day/night and weather outdoors. Scale: compact (45x46 cells).
- The map is now one world (`tm.mk==='world'`, `TM_MAPS.world`, layout `state.wmap`, merge `wmap:mFields`): `WORLD_PARTS` offsets the town (middle) and Sugarloaf (N), Lantern Meadow (S), Bubble Bay (W), Playhouse Hill (E); `WORLD_LINKS` are the streets joining them; corners are woods. `worldCompose(fromSaved)` builds it the first time from the saved part layouts (`state.tmap`, `state.nmaps`), so arrangements carry over; gates are gone. District tints on the grass (`WORLD_TINT`), smaller grass texture for the big map.
- Buildings are built progressively (`tmSync(full,budget)` sets `tm.pending`; `tmPump(n)` each frame while open, `tmPumpIdle` when closed) so a phone doesn't stall.
- Navigation: one finger pans (clamped to the world), pinch zooms (`tm.zoom` .12 to 1.4, eased `tm.zoomTo`), two-finger twist turns. A picked building uses a fixed close distance.
- The Explore wheel (`#tmWheel`, `TM_WHEEL`, `tmWheelOpen`, `tmWheelBuild`): Town square, Sugarloaf, Playhouse, Who's around (`tmPeopleCard`: everyone, where they are, Go = hop to them), Meadow, Bubble Bay, What's on (`tmWhatsOnCard`: event now, next events, birthdays, festival, wishes); Home in the middle (Go home when away). It opens with the map; tapping empty ground or the Places button (`#tmWheelBtn`) brings it back. District name labels (`.tmd`, `tmDistrictLabels`) show when zoomed out. The map opens centred on where you are (`tmWhere`). The tabs and logo strip are gone (hidden); the old per-map code (`tmUse`, hoods) is still there but unused.

## The walkable town (v53)
- The map is full screen now (no popup frame, sky gradient behind it, darker at night) and opens without the wheel (the Places button opens it). Pinch can zoom right down to street level.
- **The map is the outdoors** (`/* <town-walk> */` block, source `.claude/town/walk.js`, wired by `walk_wire.py`): opening it (Explore, or leaving through a room's or shop's door via `openDoor`) puts the real pet just outside the door of wherever you are (`twStart`: `twDoor(k)` from the building's door pivot `g.userData.fg` and its doorstep child `fg.userData.out`, set in `tmShop`/`tmHome`; the camera turns to face the door). The pet model is borrowed into the map world like the arcade does (`twPetAttach`/`twPetDetach`, scaled to `TW_PET_H`, walk pose `twPetPose` on the rig's legs/arms/heads). Closing the map (×) puts it back inside where you were; `tmClose` calls `twEnd`.
- Tap the ground: the pet walks there (`twWalk` → `twPath`, A* on the map grid `twGrid` built from buildings, big decorations and streets; streets cost less; path smoothing). Tap a building: it walks to the door and goes in (`twGoIn`; houses check `houseVisit` first). The camera follows the pet until you pan. The wheel still hops instantly; Home in the wheel closes the map (or travels home).
- **Residents walk their schedules** (`twPlan(k)`: rounds while 'out', a commute when their place changes within ~12 minutes, heading to an event that's about to start, 22% chance of a stroll near home in any hour, mingling outside an event's house; `twResSync` every 4 s, up to 16 at a time). Each has a dot (`twDot`, their colour with eyes) and, close to the camera, a full keeper model at `TW_RES_SCALE` (max `TW_FULL` = 8, cached). Tap one: they stop and face the pet, a card (`twCard`) with their greeting (first chat of the day +2 friendship), Chat (mood/pet/relationship lines), Give a gift (in person, reaction line) and Visit their place.
- The title shows the district the pet is in. Rain falls over the map on rainy days (`#tmRain`); events show guests mingling outside the host's door; festival bunting on the plaza; lamps glow at night (as before).
- Not done yet (ideas): residents entering/leaving buildings with a door animation, benches to sit on, shop staff visible walking to work at shift change from far away, the pet's own idle moves outdoors, ambient sound.

## The round island and the curved world (v54)
- The world is redesigned as a round island (`worldDesign()`, layout version `m.v===2`; older world layouts are replaced once, since Garrett asked for a full rework): 48x48 cells, `ISLAND_R` 22.6 (`inIsland`; `tmFits` refuses cells outside it). A plaza in the middle (fountain, benches, lamps, a statue) with the eight shops in a ring facing it (north: Snack Shack, Arcade; south: Toy Box, Glow Up; west: Hammer & Hue, Cozy Nest; east: Jelly Threads, Bubble Salon), a ring road and four streets out; a lane across the north and one across the south; the neighbourhoods in the corners (Sugarloaf NW, Playhouse NE, Lantern Meadow SW, Bubble Bay SE), houses on both sides of each lane, five empty lots; your house just south-west of the plaza facing the south street; a park at the west end, a lookout at the east end; woods round the shore. `WORLD_PARTS`/`TM_MAPS[part]` are now the district rectangles (tints, labels, flying, the title, residents' rounds).
- The island is round (circular slabs and a circular grass disc in `tmIsland` when `RND`).
- **Curved world** (Animal Crossing's rolling log, our take): the engine's vertex shaders (main, outline, shadow) bend the world down with distance from the camera, `crv()` with `uCurve` (camera x/z, forward strength, side strength) and `uCurveDir`; a renderer only curves when `renderer.curve=[cx,cz,k,kSide,dirx,dirz]` is set (the town map sets it in `tmDraw`, strength `.55/d²` so it's strong at street level and gentle zoomed out; the room/shops never set it). HTML on the map is lowered to match (`tmCurveY`). Raycasts use the flat world (fine near the camera).
- Camera: the tilt follows the zoom (low and see-the-horizon at street level, nearly top-down zoomed out), it stays over the island, starts a little further out when you step outside, and shadows follow the camera (`sun.userData.tgt` lets a directional light aim at a point other than the origin; the shadow box grows with the zoom).
- Residents are always visible outdoors: the closest few as full models, everyone else as portrait pins (`twPin`: their figurine face in their colour, a little smaller when zoomed out, tap to talk) instead of grey dots.

## Rolling-hill camera and map performance (v55, unfinished tuning)
- Camera (town map): low and wide at street level (pitch ~.34, fov 46) so the horizon shows over the forward bend; nearly top-down and narrower zoomed out (`tmDraw`; `tmFit` uses a fixed 30° so zoom stays stable). The bend is forward-mostly (`R.curve` side strength .12 of forward), strength `.8/d²`. Taps on the curved ground use `tmGroundHit`.
- Engine: opt-in frustum culling (`renderer.cull=true`, `_frustum(VP)`, curve-aware; also on the shadow pass), per-vertex colour (attribute 4 `vcol`, white by default via `vertexAttrib4f`), `renderer.drawn` counts what was drawn.
- Town map: buildings/decorations/streets are built at low geometry detail (`GEO_LOD`/`setGeoLod`, `tmLod` wrapper around `tmShop`, `tmHome`, `tmDecor`, `tmIsland`; sphere/cylinder/lathe segments and rounded-box subdivisions scale with it, cache keys include it). Decorations merge into a few meshes (single objects again while arranging). `tmMergeWorld` merges every static opaque mesh into one mesh per 12-cell area × surface kind × outline × shadow (colours per vertex; textured ones per texture), hiding the originals (taps still hit them); animated pieces are merged into themselves first; arranging unmerges (`tmUnmerge`), changes set `tm.mergeDirty`. Pixel ratio capped at 1.5, 1024 shadow map on touch devices, 5 full-detail residents (baked like keepers; townsfolk motion is pre-worked out in idle time after load).
- The whole town is built behind the startup loader with a progress bar (`preloadTown`, `finishLoad` → `finishLoad2`).
- Measured on software GL: island ~2M → ~0.94M vertices, street view draws ~420 of ~1700 meshes. Still ~1450 drawn zoomed out: the remaining cost is many small animated pieces and per-texture sign/window meshes. Next steps if it's still slow on phones: render the far view at half rate or without shadows, skip outlines when zoomed far out, lower `GEO_LOD` further, fewer decorations, and test on a real phone.

## Map fixes (v56)
- The land looked lower than everything else: the grass was one big disc of long triangles, and the world-curve bends vertices, so
  big triangles sagged below the true curve while the small pieces of paths/buildings followed it. The grass is now a tessellated disc
  (`tmDiscGeo`, 26 rings x 120 segments). Anything big and flat on the curved map needs enough vertices.
- Performance, measured on software GL after the town is built: street ~19 ms, mid ~13-19 ms, far ~20 ms per frame (v55 had
  multi-second frames). Causes found: merged town meshes *receiving* shadows was pathologically slow (merged pieces now
  `receiveShadow=false`; the ground, pet and residents still receive, so shadows still fall on the ground); merged meshes are split
  into batches under 60k vertices (16-bit indices, better culling); zoomed far out (`tm.far`, camera distance > 26) the sun casts
  no shadows and the map redraws every other frame unless the camera moves (`tmTick`).
- Known: building a resident's full model + bake costs ~50-85 ms on software GL (a short hitch the first time someone walks into view;
  townsfolk bakes are pre-warmed in idle time after load). Any `tmSync` (e.g. a logo image loading while the map is closed) unmerges and
  the next frame re-merges (~0.4 s), which only happens while the map isn't on screen.
- v57: stray yellow bits on the plaza came from `tmMergeWorld` reading world matrices before the animation check put moving parts back;
  it now calls `tm.sc.updateMatrixWorld(true)` right before collecting meshes. Residents grow out of a door when they set off and shrink
  into it when they arrive (`r.sc`, `r.out` in the walk code).
- v58: the map camera works like the room's (Garrett asked): one finger orbits (turn + tilt, pitch .22-1.3, same rates as the room),
  two fingers pinch to zoom, twist to turn and drag to pan (`tmPanPx`; panning stops following the pet, tapping to walk resumes it),
  fov 50 like the room, no automatic tilt (it starts at .6 when you step outside). The world-curve is unchanged.
- v59 (from Garrett's phone screenshots): zooming in close showed grey: the map camera's near plane was 4 units; it now scales with the
  distance (`near=clamp(d*.06,.05,4)`, far 600). He shouldn't see the island's edge ("wrap around like Animal Crossing"): the island now
  sits in a sea (`tmSea`: a sand beach ring, a foam line, a shallow and a deep sea ring out to radius 260, built with `tmRingGeo` in many
  pieces so the world-curve rolls it away into the horizon). The camera keeps the pet in view: in `tmDraw` it tilts up just enough that
  the line from the camera to the target clears every roof (`tw.grid.own` maps cells to buildings, heights from `userData.top`).
  Note: flat ring/disc geometry must wind so its front faces +z before the -90° x rotation (a wrong winding gets back-face culled).
- v60: "I don't want it to be an island either": the world map has no sea now (`tmSea` is unused). `tmCountry` surrounds the town
  with countryside out to radius 260: grass, dirt roads out of the four gates, woods that start at a wobbly edge with clearings and
  bushes (no ring hedge, it read as an island rim), patchwork crop fields along the roads, flower meadows and hills on the horizon.
  Camera jitter: the roof-clearing tilt is eased (`tm.lift`), the map draws every frame (no half-rate frames when far), the follow is
  frame-rate independent (`1-exp(-dt*k)`), and the town's shadow box only moves in whole shadow-map texels in the light's frame and
  resizes in whole units (moving it continuously made every shadow shimmer as the camera glided).
  Town life outdoors (in the town-walk block): **daily finds** (`findSpots`, 7 per day on road cells, seeded by room + day so both
  phones agree; kinds heart candy / posy with a seed / present with a snack / four-leaf clover / capsule token; walking over one picks
  it up, `findGrant`, `td('find')`; `state.finds` {day, got:[index]}, normalised, merged as a union for the same day). **Neighbours
  chat** when they meet on the street (`twChats`: they stop, face each other and talk in turns for ~6-9 s, then a cooldown; their pins
  pulse; tapping one mid-chat opens with their `KBIB.rel` line about the other, `twChatLine`). **The pet idles outside**: after standing
  still a few seconds it looks at a nearby resident, hops or turns (`P.still`, `P.idle`, `P.hop`; it also hops on picking something up).
- v61 character quality pass: every resident was rendered side by side (`tools/dev/town/kall.js`: front, three-quarter, face
  close-ups with `KZ=.5 KL=.2`, cheer and greet) and the weak ones refined in their creature code: Fold (`crane`: bigger head and eyes,
  shorter legs, paper-fibre texture, stronger pinks), Cobble (`pebble`: proper hard hat on top, two reflective stripes on the vest,
  bigger relaxed eyes with friendly brows; he stays sleepy, it's in his sheet), Echo (`gramo`: bigger eyes, a resting smile `sml`
  that swaps for the open mouth when talking), Sketch (`pencil`: each lens sits on its own facet so the glasses don't float off the
  face from the side), Dewey (`book`: glasses closer to the cover). All poses (idle, cheer, greet) were checked for every resident.

## One pet form, bond levels (v62)
Garrett: "Room for Two" means one body for two heads and one pet for two people, so the game centres on that, and the life stages
no longer fit. **No egg, no growing up**: `stageOf()` always returns `PET_FORM` (5, the Young adult shape everything is tuned to);
the old curve is `stageOfOld`. All stage checks (egg gates, `smartAge`, perch fit, foot 'auto' style) still work and simply see the
grown form. New rooms start hatched at xp 0. Old saves keep their xp (the elder migration in `normalize` still runs).
- **Bond level** replaces growth: care xp counts towards `bondOf(xp)` {lv, n title from `BOND_N`, cur, need, left}; each level needs
  5 more care moments than the last (`bondAt(lv)`: 0, 10, 25, 45, 70...), endless. `commitPet` calls `bondUp(B)` on a level up
  (reward card, 5+lv hearts, a token every 5th level, Journal `JR_T.bond`, Footprints). Shown on the pet wheel (`Bond n · title`),
  the pet page (`.bondbar`), Dr. Patch's check-up, debug. Big moments `bond5`/`bond10` replace hatch/child/adult.
- `SYNC_MIN_V` 62 so an old phone refreshes instead of showing stages. Next (agreed plan): a head for each of you (each head's likes
  grow from how that person cares for it), furniture that remembers who placed it, ways to reach each other through the pet.

## A head for each of you, furniture remembers who placed it (v63)
- `state.heads` {pid:{s first seen, c:{kind:count}, f:{food cat:count}}} (block before `function td(`): `headPeople()` = the first two
  people by `s` (head 0 = left/`headL`, head 1 = right; `state.pet.hsw` swaps them, "Swap heads" on the pet page; `'me'` only counts
  in solo mode). `td()` calls `hcHit(ev)` (kinds `HC_LOVE`: feed, bath, play, nap, pat, home, trip, games), `doAct` adds `hcFood(cat)`.
  Each phone only writes its own entry; merge `MERGE.heads` keeps the entry with more care per person and the earliest `s`.
- Pet page `headRow()`: each head's name, whose head it is ("Your head" / "Beau's head" / waiting), and what it loves most
  (`headInfo`). When you come back to the app (`petGreet`), your head turns to you and bobs (`headHello`, `pet.myH`/`pet.myHT`
  in the head pose code) with a little party bubble from that head.
- Furniture placed from now on carries `by` (pid, set in `spawn`); in Decorate the selected piece shows "Beau picked this"
  (`#selBy`, `byLabel`); when the pet uses it, its placer's head sometimes shows a star (`headUses`) and the Journal can say so
  (`JR_T.useby`, `{p}` = the placer, `{h}` = their head). Older pieces have no `by`.
- Next from the plan: ways to reach each other through the pet (leave something for the other, a message carried by the pet,
  a moment when you're both online).

## The game loop, simplified (v64) — read this before adding any new daily system
Garrett agreed the game had become overwhelming: about a dozen daily things (two-dos, favours, dreams, wishes, finds, garden,
jobs, sticker card, story levels, town cheer...). The loop is now three layers:
1. **Any visit:** check on the pet, care for it, see what your person did (the pet, Journal, Footprints, Welcome back).
2. **Daily: one list, "Today with <pet>"** on the pet page (`todayHtml`/`bindToday`, state still `state.td`, made by `tdMake`):
   the pet's wish of the moment on top ("Right now", `wishRow`), then 3 things phrased as what the pet wants (`TD_T`: a care
   one, a home/town/play one, and **always one together**; `both:1` templates need each of you once, only offered when two
   people have heads), then the treat (+5 hearts, +2 tokens, a snack/toy or furniture, +2 bond). Each item: hearts + 2 bond
   (`bondAdd`). One swap a day each. The Pet dock button gets the "!" badge (`#petBadge`) when the treat is ready.
3. **Long term: the bond.** `bondUp` now also gives a whole room theme every even level (`tdThemeGift`, what story levels
   did) and moves the town along: town cheer is no longer its own track, `cheerOf().p` is the care-moment count and
   `cheerSync()` levels the town (title, map landmark via `tmGifts`, Arrange decorations `DECOR_LV`, Mayor's letter);
   `cheerSync(true)` runs quietly in `lifeCheck`. Big moments (`TD_MS`) are a fold-out under About.
**Removed:** favours (`REQ_T`, `state.req`), dreams (`DREAMS`, `state.dream`), the weekly sticker card, story levels, the
Two-dos menu page (`openTab==='todo'` redirects to the pet page), the map's town-cheer chip/card, cheer bonuses for gifts,
garden and events, the egg code paths (`warm`, egg branches in the wheel/tap/mood). `normalize` deletes `dream`/`req`
and old td fields. Optional, never on a list: wishes, finds, the garden, jobs, events, keeper chats.
Pet page order: name + bond chip, bond bar, Today, needs and actions, looks-after-itself, spirit, a head for each of you
(names editable on the cards), About (personality, traits, bag, big moments), Style.

## Resident sets and room makeovers (v65)
- **A furniture set per resident** (32 sets, ~350 pieces, each with its own floor, wallpaper, icon, and a matching door and
  window), made by helper agents from `tools/dev/town/SET_BRIEF.md` / `DOOR_BRIEF.md` and reviewed set by set. Each set is one
  `SET_DEF({set:{k,n,c,res},tiles,cat,build,use,dw})` call (defined just before `/* <resident-sets> */`, which registers the set,
  its CAT entries, BUILD builders, USE_ITEM entries, tile sets and THEME_DW door/window); they live between the
  `/* <resident-sets> */` markers in index.html (sources in gitignored `.claude/sets/r*.js`, put in by `.claude/sets/integrate.py`).
  Set keys are `r<resident key>` (rbaker, rjoy...), `set.res` is the resident. Not on the nose by design: a mood and materials
  that fit the character (Bunbun = "Butter Hearth" farmhouse bakehouse, Cobble = "Riverstone", Pixel = "Voxel Cottage"...).
  Cozy Nest's rotation is now `NEST_CYC=12` (~6 sets a day from ~70). Builders often wrap helpers in an IIFE: `build:(()=>{...;return{...}})()`.
  Gotcha the agents found: inside furniture `makePiece` turns every BoxGeometry into a 768-triangle rounded box and bumps spheres
  to 20x14, so small details should use hand-built low-poly geometry. The engine has no `THREE.Path`.
- `tools/dev/town/sview.js <setfile.js> <outPrefix>` (or `--set <existing key> <outPrefix>`) renders a set: every piece on a contact
  sheet, its door and window, and a room furnished with the whole set on its floor and wallpaper.
- **Room makeovers** (Happy Home Designer style, Beau's side; `/* <makeovers> */` block before `kActs`): `MK_REQ` (3 requests per
  resident in their voice: t, ask, need [fns], like [set or fn], mood, love/ok/meh reactions; written from the character sheets).
  `state.mk` {req:{k,i,t}, next, n, rooms:{resident:{i,items,tf,tw,stars,at,by}}}: one request at a time (`mkTick` from `lifeTick`,
  seeded by room + count so both phones agree; a new one 20 h after finishing; never expires), arriving as an Inbox letter.
  Start it from Decorate's home page (`mkDecoHtml`: request banner + "Rooms you've made") or the resident's close-up ("Design their
  room" / "See the room you made", `kActs` wraps `kActs0`). Designing is a sandbox (`sandbox.mk`): your room shell, empty, size 8,
  the whole catalogue; the bar `#mkbar` (`mkBar`) shows the checklist (`mkCheck`: needed kinds, a style they love = their `like`
  set or their own resident set, 6+ pieces) and Later / Furniture / Show <name>. `mkFinish` scores 1-3 stars, saves the design,
  restores your room, rewards hearts + friendship (3 stars: a piece from their set) and posts their reaction. Visiting a finished
  room (`mkStart(k,true)`) shows it with the resident standing in it (`mkHost`, a visitor with `mk:1`). `td()` ignores events while
  any sandbox is on. Merge: more makeovers done wins, rooms by newest `at`. Fixed here too: the v64 cleanup had cut the `heads` and
  `finds` merge rules by accident; they're back.
- Also in v65: `spark()` (a canvas helper used by 8 older textures, e.g. the Space set's Orbit poster) drew a four-point sparkle;
  it now draws a soft five-point star. Seats: with the pet always grown, every single chair/stool (perch `w` ~.3) failed the fit
  check in `perchSpots`, so the pet never sat on them; the check now lets the pet overhang (`hw*.5>P.w+.1`), and `P.x` may be a
  number or an array. 145 of 146 perches fit (the Space egg chair's hood is genuinely too low).

## Through the pet (v66)
The two of you reach each other through the pet (block before `function td(`): **surprises** (`state.surp` [{id,by,it,note,t,got}],
merged by id; pet page "Leave a surprise for <person>" → `petView='surp'`, `surpHtml`/`surpBind`, `surpLeave` takes the food out
of the bag, toys are just shared; max 3 waiting); **delivery** (`petDeliver`, every 20 s while visible, idle at home: the giver's
head turns to you (`pet.myH`) and the pet hands over the surprise, or carries over your person's newest unseen Inbox note, last one
remembered per device in `localStorage['r42petnote:'+room]`, with "Write back" → Inbox); **together** (every device stamps
`state.visits[pid]` every 2 min while open; `togetherCheck`: when your person's stamp is under 2.5 min old, a toast "<name> is here
too!", the pet dances and both heads cheer, once per 3-hour window). `partnerId()` = the other head's person.
Also in this round: house interiors refurnished with each resident's own set, and a second character polish pass (see git log).
- Houses refurnished (v66): all 23 `HOUSE_DEF` interiors now use their residents' own sets (furniture, `s_r<key>` tiles,
  `win_r<key>` windows, `door:'r<key>'`), shared homes give each resident a room in their set and mix the shared rooms. Sources
  in `.claude/town/houses/<id>_home.js` (gitignored), swapped into index.html. Things found: a layout item's `c` is a TINTS index,
  not a hex (old houses passed hex values, so tints were random); the grown pet needs ~1 clear cell (1.25) to pass furniture and
  each resident blocks ~1.7 cells, so rooms must stay sparser than they look; interior walls are knee-high, so wall pieces only
  work on the outer north/west walls; `clearKeepers` pushes a counter/vanity in front of a resident towards the camera.
  `tools/dev/town/hview.js <houseId> [outPrefix]` previews a house (fixed: it had an undefined ROOT).

## Makeover rooms stay as part of the houses (v67)
Garrett: designs must never disappear. Every finished makeover is kept as an added room of that resident's house, one per request:
`state.mk.rooms[resident][i]` {items,tf,tw,stars,at,by,ed} (old one-room-per-resident saves migrate in `normalize`; merge per room,
newest `at`; `SYNC_MIN_V` 67 because older apps would strip the new shape). Helpers `mkRooms(k)`, `mkRoom(k,i)`, `mkAllRooms()`.
Inside a resident's house a "Rooms you made" list (`#mkhouse`, `mkHouseChips` from `updStoreBar`) steps into each room
(`mkStart(k,true,i,houseKey)`: the resident stands in it; "Back to the house" travels back). "Rearrange" in a visited room edits it
and saves it back on leaving (`sandbox.mk.edit`, `mkCancel`). The close-up lists each room ("Your reading nook", `mkv:<i>`).
Requests now read "<name> is adding a room"; a resident stops asking once all three of their rooms exist.

## Map: talk to residents, Places redesigned (v68)
- Tapping a resident on the map talks to them (`twPick`: screen-space pick on each walking resident's projected position, curve
  included, because the bent world made raycasts miss), opening their card (Chat / Give a gift / Visit their place). `tmFlyTo` now
  stops following the pet (flying somewhere used to snap straight back to the pet).
- Places (`#tmWheel`, now a bottom panel `.pl`, `tmWheelBuild`) has three looks for three things: neighbourhood **postcards**
  (striped art, blurb `PL_BLURB`, homes/shops, how many are out there now, "you're here"; tap = fly there), **Out and about** faces
  (who's walking around, nearest first; tap = fly to them and chat), and a cork **noticeboard** for what's on (festival, event now
  with Go, birthdays, next events as pinned notes). "Everyone in town" opens the old people list. Close with ×, a tap on the map,
  or the phone's back button.

## Conversations on the map (v69)
Tapping a resident on the map starts a conversation (`cvStart`, end of the town-walk block): the pet walks up, the camera closes in
low and side-on on the two of them (`cvTick` eases target/yaw/pitch/zoom; `cvEnd` restores and resumes following), and the map card
becomes a dialogue box (`.cvbox`: name tag in their colour, friendship hearts, typed line, reply choices). Content is `TALK[key]`
(between `/* <talk> */` markers; sources `.claude/talk/<key>.js`, written by helper agents from the character sheets with
`tools/dev/town/TALK_BRIEF.md`, ~6,000 lines for 32 residents): `busy` (brush-offs), `out` (openers), `topics` (branching scenes),
`ask` (they ask you), `gossip`, `deep` (Good friend and up, in order, `kf.dp`), `bye`. Nodes are strings or `{t, r:[[you say, reply
node, 1 = extra friendship]]}`. Placeholders {n} {a} {b} {me}. They don't feel like talking (`cvBusy`) when rushing somewhere
(often), after 4 chats with you that day, or ~12% at random (seeded per 15 min); they still take a gift. Kind choices give +1
friendship (max 2 per chat); the first chat of the day +2. Residents without TALK fall back to KBIB lines (`cvT`). The old
`twCard` card is still used for "Everyone in town". Visitors no longer knock at home while the map is open.

## Game bible, holidays, real weather (v70)
- **`tools/writing/GAME_BIBLE.md`** is the canon reference (see the note in Start here). Pronoun rule: a character's own sheet wins,
  else they/them. Open questions live in its last chapters (Boing/Blush/Joy pronouns, whether there's a sea).
- **Holidays** (`HOLIDAYS`, design in `tools/writing/holidays.md`): 16 one-day holidays, some on real-world dates (Fresh Jar Day
  Jan 1, Two-Heart Day Feb 14, Topsy Day Apr 1, Bubblework Night Jul 4, Swap-Face Night Oct 31, Long Table 4th Thu Nov...),
  some the town's own (Puddle Parade, Lost & Found Day, First Brick Day = the town's birthday...), plus **Room Day** = the
  anniversary of the room (`state.born`, set once from the oldest journal/feed entry, merged as the minimum). `holOn(day)`,
  `holNext(n)`, `holTick` (from `lifeTick`, once per holiday per year via `state.evseen`): the host's Inbox letter, +10 hearts,
  a Journal line, a reward card. The Places noticeboard shows today's holiday, the next two and the weather; festival bunting
  also goes up on holidays.
- **Real weather** (`wxNow`, `wxFetch`): Open-Meteo forecast for the phone's location (asked once with a card, `wxAsk`; stored
  only in localStorage `r42loc`, rounded to ~1 km), else Kansas City; refreshed every 30 min (`r42wx`). `weatherOf(day)` uses it
  for today and the next two days (kinds sun/cloud/rain/storm/snow/fog/wind; hot >=85°F, cold <=35°F), so map rain, the
  Neighbours forecast and the garden follow the real sky.
- **Dialogue reacts** (`cvOpener`): openers pick from `TALK[k].hol[holiday]` on holidays, `fest` in festival weeks, `wx[kind]`
  (or `hot`/`cold`), `tod` (m/d/e/n, US Central), else `out`; `cvFitWx` skips lines that mention a different weather. All 32
  residents have wx/tod/hol/fest lines (`.claude/talk2/<key>.js`, brief `tools/dev/town/TALK2_BRIEF.md`).
- Gotcha: writing regexes through a bash heredoc into Python turned `\b` into a backspace character; write code with the
  Write tool and check index.html has no control characters.

## Coast, sky, world decorations (v71)
- **Coast** (`TM_COAST`, `tmCoastR(angle)`, `tmWet`, `tmCoast` inside `tmCountry`): a bay east-south-east of town (Bubble Bay's
  side), shore curving away at both ends so the town is not an island. Beach, wet sand, foam, shallow and deep sea bands (finely
  tessellated polar strips so the world-curve bends them; winding matters: wrong winding = invisible from above), shore rocks, a pier
  where the east road ends, a lighthouse on a rock (`tm.lighthouse`, lamp brighter at night), bobbing sailboats (`tm.coastAnim`,
  called from `tmDraw`). The countryside (woods, fields, meadows, hills) keeps clear of the water.
- **Sky** (`tmSkyDraw`, `#tmSky` 2D canvas under the WebGL `#tmc`, drawn every frame from `tmFrame`, ~0.3 ms): keyframes `SKY_KF`
  through night/dawn/day/golden/twilight (US Central); everything is placed relative to the *visible, curved* horizon (the world-
  curve puts it far below the flat one): x by compass direction, y by elevation above that horizon. Sun from the map light's
  direction (agrees with shadows), moon with craters and stars (round dots) at night, flat-bottomed cumulus drawn solid on an
  offscreen layer then faded in (`tmSkyDraw.cl`), horizon haze.
- **World decorations**: 62 new `TM_DECOR` entries (between `/* <world-decor> */` markers; sources `.claude/decor/{nature,
  landmark,street}.js` by helper agents from `tools/dev/town/DECOR_BRIEF.md`, previewed with `tools/dev/town/dview.js`). Each has
  `cat` (nature/water/landmark/street/fun; old ones are "classic"); Arrange's decoration palette has category chips (`TM_CATS`,
  `tm.decoCat`). Streams are 6 keys (straight both ways + 4 bends); `archbridge` 3x1 crosses a north-south stream in its middle cell,
  `footbridge` 1x3 an east-west one. Nature kit lives on `TM_DECOR.cherrytree.kit()`, water kit in `stream.b('kit')`.
- **Layout v3** (`worldV3`, run once by `tmNorm` on saved v2 world layouts and by `worldDesign`): ~40% of outskirt trees/flowers
  become still species (palms near the coast; moving ones like willows only as a few showpieces, since animated pieces can't be
  merged), and landmarks/playground/street furniture go into free spots near targets (only generic greenery makes way; nothing
  placed by the players moves). `SYNC_MIN_V` 71: older apps don't know the new decoration keys.
- Perf (software GL, warm): far view ~20 ms/frame, street ~19 ms (no worse than v70).

## Overnight refinement (v72)
- **Older furniture sets refined** (all 37 pre-resident sets): overrides between `/* <set-refines> */` markers (after the resident
  sets; sources `.claude/sets_v2/<set>.js`, brief `tools/dev/town/REFINE_BRIEF.md`). Each re-registers BUILD (and sometimes CAT)
  entries for its set; all 814 catalog pieces build (total ~7.7M triangles, down from 8.55M).
- **Wardrobe**: 100 wearables themed on the resident sets, 3-4 per set, between `/* <wear-more> */` (just before `dressPet`;
  sources `.claude/wear/{sugar,bay,hill,meadow}.js`, brief `tools/dev/town/WEAR_BRIEF.md`, preview `tools/dev/town/wview.js`).
- **Exteriors**: every shop and house refined (roofs with tiles/shingles, gutters, shutters, curtains, awnings, porches, gardens,
  chimney smoke, night glow via `tmGlassMs`), overrides of `TM_BODY` between `/* <exteriors-v2> */` (after the house models;
  sources `.claude/ext/{shops,houses_a,houses_b}.js`, brief `tools/dev/town/EXT_BRIEF.md`, preview `tools/dev/town/xview.js`).
  ~10% more meshes drawn on the map; the Game Night house keeps Boing's spring-head topper.
- **Friendship-level conversations** (all 32 residents): `TALK[k].lv` {hi, topics, bye} per level 0-4 (`KF_N`), `mile` (met, week,
  month, season, year, talk10/50/100; said once, recorded in `kf.ms`), `nick` (what they call you at Bestie, `{me}`). Engine:
  `cvLv`, `cvLvPick`, `cvMile`; `kf` now also stores `m` (first met), `c` (chats), `dp`, `ms` (merge: m min, c max, ms union;
  `SYNC_MIN_V` 72 so older apps don't strip them). Content is appended to the `/* <talk> */` block after the line
  `// ---- talk3: ...` (sources `.claude/talk3/<key>.js`, brief `tools/dev/town/TALK3_BRIEF.md`). The facts they invented are in
  the bible's Canon log.

## Civic places, the Sunday market and the park (v73)
- **Places** (block after `addHouses`): `PLACES[id]` {n, staff:{resident:[from,to]}, open, at:[gx,gz,rot] (rot = door direction), road}
  and `PLACE_DEF[id]` (same shape as `HOUSE_DEF`) become `SHOPS['p_'+id]` with `place:1` (`placeShop`, `addPlaces()` right after the
  `/* <places> */` block). Townhall, library, postoffice, weather, lampshed. Staff on duty: `resWhere` returns 'place' (`placeOf(k)`),
  `shopCrew` puts them on the floor, `placeVisit` checks opening hours, `tmPlaceCard` is their map card. Lists of shops skip places
  (`tmShops`, trips, `trShop`). Close-up actions `PLACE_ACTS` -> `placeAct` (guest book `state.gbook` (shared, merged by who+time), the
  First Brick, borrow a book `LIB_BOOKS`, your cubby = Inbox, umbrella, weather book, wicks). Each place has its own furniture set
  (`c<id>`, between `/* <place-sets> */` right after the set refines: it must come before the line that turns THEME_DW doors into `win_`
  catalogue windows). Sources `.claude/places/<id>.js` + `<id>_set.js` (gitignored), put in by `.claude/places/integrate.py`; brief
  `tools/dev/town/PLACE_BRIEF.md`; preview `tools/dev/town/pview.js <id>` (map shots from the door side, inside with the staff).
- **World layout v4** (`worldV4`, from `tmNorm` and `worldDesign`): places each place once (`m.pl` remembers which; only generic greenery
  `TM_SOFT` makes way; roads from `PLACES[id].road`), then the market stalls and the park (`TM_PARK`). Decorations may carry a 4th entry,
  quarter turns (`tmDecor` rotates them; footprints are square so nothing else changes).
- **Sunday market** (`MARKET` Sundays 9-13, `marketOn`, debug `dbgMarket`): vendors `MARKET.vendors` are 'market' in `resWhere`, stand
  behind their stall (`MKT_STALL` decor key, `twStallOf`, plan mode 'stall'); chatting adds "What are you selling?" (`cvMarket`,
  `mktList`: `MKT_GOODS` per vendor, `MKT_FURN` = the Market Morning piece per stall). Stalls `mkt_*`, the arch `mkt_arch` and the park
  pieces (parkgate, bigslide, crumbwall, flowerbed, pottingshed, climbdome, hopscotch, pergolabench) are `TM_DECOR` entries from
  `.claude/places/market.js` (brief `tools/dev/town/MARKET_BRIEF.md`).
- **Park rounds**: `RES_NEAR` (Posy and the twins) keeps their rounds near the park (`twNearOf`, `twSpotNear`).
- Perf note: the map draws ~2,080 meshes far out (was ~1,780). On this laptop's software GL every version (v71 too) now shows
  intermittent multi-second frame stalls in headless tests; compare versions with `R42_INDEX` before blaming a change.

## Paths and the round town (v74)
- **Path types** (`PATH_T`, in hierarchy order with a walking cost each: cobble road .30, brick street .33, plaza tiles .36, flagstone
  lane .45, boardwalk .50, gravel path .58, dirt trail .70, stepping stones .85; grass `PATH_GRASS` 1.6). A layout path cell is
  `[x,z,type]` (`pathT(q)`; old `[x,z]` = cobble). `twGrid` keeps a `cost` per cell; `twPath` is 8-way A* (no corner cutting) on those
  costs, and its smoothing never shortcuts over worse ground, so residents and the pet keep to the best paths (tested ~99% on paths,
  main roads for long trips). `twRandomRoad` picks wander targets weighted toward the main roads.
- **Smooth rendering** (`tmPaths`): per type, a distance field on a fine grid (`PATH_RES` 5 per cell; a disc on each cell, bands to all
  8 neighbours, joins between two types drawn in the less important one, then two box blurs) traced with marching squares
  (`pathField`, `pathMesh`): round corners, diagonal runs read as curves, filled areas become round plazas; a curb band in the type's
  edge colour under each; tiling textures `pathTex` (256 px = 2 units, `wrapS=1000`); stepping stones are separate stone meshes
  (`pathStones`). About 15 meshes for the whole town (the old renderer was a box per cell).
- **Arrange > Paths**: pick a type (chips), and a brush: Paint (tap/drag), Circle (tap the middle, then the edge) or Round plaza
  (filled) (`tmRoadShape`). A tap on the same type lifts it, on another type changes it; redraws are debounced (`tmRoad.t`).
- **Layout v5** (`worldDesign5`, a pure function also runnable in node from `.claude/paths/design5.js`): a round tiled plaza, a cobble
  ring road, the shops round it with brick paths to their doors, four avenues (west to the park, south past home, east to the bay
  road), brick Market Street with the stalls up to the Town Hall, the weather station up a gravel path behind it, and the **Crescent**,
  a round flagstone lane (r 13.2) through all four neighbourhoods, houses outside it facing in (Playhouse NE, Bubble Bay SE by the
  boardwalk, Lantern Meadow SW with the lamp shed, Sugarloaf NW), the library and post office inside it on the west and east avenues,
  the park west with two round gravel loops, dirt trails in the woods. Older saved world layouts (v<5) are replaced once (the old one
  is kept on that device in `localStorage.r42wmapOld`). `worldDesignV2` is the old designer, unused.
- **Districts** are by angle round the plaza now (`plDistrictOf`: within r 11.6 = town; NE hill, SE bay, SW meadow, NW sugar); the title
  uses it. `WORLD_PARTS`/`WORLD_SIZE` (`WPS`) only place the district labels, tints and residents' round areas.

## Grid paths, circles, a grid town, night light (v75; Garrett: "less blobby, grid based with dynamic corners, square paths too, circles too")
- The blurred distance-field renderer of v74 is gone. **Grid paths** (`pathBuild`, `pathPoly`, `pathFillet`, `pathPolysMesh`): every path
  cell is a square polygon; an outside corner (neither side neighbour is a path) is rounded by its type's radius `PATH_RAD` (board and
  tiles nearly square, dirt and gravel round), an inside corner (three of four cells round a grid point) gets a small curved fill, a side
  touching another path (or a circle) has no curb, so kinds meet flush. `[x,z,type,'s']` keeps a cell square (Arrange brush "Square
  corners" toggles it). Curbs are the same polygons pushed out .07 on exposed sides, drawn below all surfaces.
- **Circles** are their own shapes: the layout's `c` list `[cx,cz,r,w,type(,a0,a1)]` (w = ring width, 0 = a filled round plaza; a0/a1 =
  an arc in degrees, 0 east 90 south), drawn as smooth ring/disc meshes (`pathRingMesh`); their cells (`pathCircleCells`) count as paths
  of that type for walking, for grid neighbours and for Arrange taps (`tmCircleAt`). Arrange's Circle and Round plaza brushes add one
  (max 24); tapping it with the same type lifts it.
- **Layout v6** (`worldDesign6`, from `.claude/paths/design6.js`; v5's `worldDesign5` kept, unused): round tiled plaza (a circle) with a
  brick ring round the fountain and benches facing it, a round cobble ring road, straight avenues, brick Market Street, and the Loop: a
  square flagstone lane (x/z 11..36) with quarter-circle arc corners; 24 slots outside it, three each side of every avenue, for the 23
  houses and the lamp shed, facing in; the library and post office inside it; the park walk and two gravel circles on the west edge;
  the boardwalk on the east; street lamps along the Loop and avenues. Saved layouts older than v6.3 are replaced once.
- **Night**: `TM_GLOW` lists light-giving decorations (radius, height); `tmGlowBuild` lays a warm radial pool on the ground under each
  and in front of every building's door, all in one transparent mesh (`tm.glow`, opacity by night in `tmTOD`); the 8 point lights now
  come from the nearest of those sources, not just `lamp`.

## The places host events; life on the streets (v76)
- **Events at places**: an event has either `house` (a HOUSES id, as before) or `at` (any SHOPS key) with `hosts`. Use `evAt(E)` for
  where it is and `evHosts(E)` for who hosts; never `'h_'+E.house` again. Story hour (Wed 16-18) is at the library; new Town meeting
  (Mon 17-19, Town Hall) and Stargazing (Tue 20-22, weather station); festivals are at the Town Hall (`eventCalc`). `placeVisit` opens
  a place to everyone during its event, and `shopCrew` puts the hosts and guests inside (up to six guests). Hosts at a place are
  'event' in `resWhere` (only a house's own residents stay 'home').
- **Spots** (`TW_SPOTK`, `twSpots`, `twSpotPick`, `twSpotFree`): benches, park benches, the pergola and picnic tables (sit: the model
  is lowered onto the seat facing out), the fountain, ponds, the well, the statue, the clock tower, the carousel (stand round, facing
  in), the noticeboard and, on market Sundays, the stalls (browse, facing the counter). Residents on rounds or strolls go to one ~38% of
  the time (weighted: stalls on Sundays, benches, the fountain), stay a while (sit 14-36 s), one resident per spot (`tw.spotUse`).
- **Doors open** (`tmDoorHinge`, `tmDoorOpen(k,ms)`): since v77 each map door gets a hidden lit-doorway panel that grows open from the
  hinge side while `tm.dopen[k]` is in the future (the door itself merges; hidden panels cost nothing). Residents leaving step out of the doorway and
  arriving ones walk into it (`r.inPt`) while it's open; the pet's door opens when it steps out (`twStart`) and before it goes in
  (`twGoIn`).

## Map: edge scrolling and a performance pass (v77)
- **Edge scrolling** (Garrett: "keep the middle the same, touch and hold the sides to scroll"): a touch that starts in the outer 12% (left/
  right) or 9% (top/bottom) of the map and is held for 240 ms without moving scrolls the map that way (`tmEdgeTick`, from `tmTick`,
  speeding up over 1.4 s; diagonals in the corners), with a soft glow on that edge (`#tmEdge`, `tmEdgeShow`). A quick tap still taps,
  dragging still orbits, and lifting after a scroll isn't a tap. Not in Arrange.
- **Performance** (drawn meshes far/mid/street: v76 2082/1904/707 -> v77 ~1079/946/607):
  - animated details (`tmMergeWorld` collects meshes under moving nodes into frozen merged batches per area, `tm.farChunks`;
    `tmFarLod` shows the real moving pieces only in areas within ~13 units of the camera target, none when `tm.far`);
  - coarser static merge (16-cell areas, rounder material buckets);
  - doors no longer keep a separate hinge (see v76 note);
  - the map's own adaptive resolution (`tmAdapt`, `tm.pr` .85..1.5 from a frame-time average; it was a fixed 1.5x);
  - outlines skipped when zoomed far out (`renderer.outlines=false`, a new renderer flag);
  - less garbage per frame in `twResTick` (resident sort every .3 s, one reused vector for the pins).

## Fixes (v78-v79)
- v78: `evAt` called itself (a global search-and-replace turned `'h_'+E.house` inside its own definition into `evAt(E)`), so any event at
  a house (Sunday tea...) threw "Maximum call stack size exceeded" every frame and the map stopped responding (no zoom).
- v79: Arrange refused new decorations once a layout had 80 (the world has 300+), now 900 on the world map; "edge of the island" text.
  Regression sweeps added (see Working method).

## Map taps, shop logos, quieter pins, neighbours talking to each other (v80)
Garrett's phone test asked for these.
- **Tapping a building outdoors opens its card first** (`twTap` -> `tmSelect`); the card's button walks the pet there and in (`tmEnter` ->
  `twGoIn`). Outdoors the card doesn't zoom (`tmFocusB` keeps the zoom, stops following; `tmCardClose` resumes it); the place you just
  stepped out of says "Go back in" (`tmBack`).
- **Shop logo stickers** (`.tms`, made in `tmDistrictLabels`, placed in `tmFrame`) over every shop and home at middle zoom only
  (camera distance > 24 and not `far`, where the district names take over). Tap = card.
- **Resident pins** (`.tmr`) are 26px white faces with a ring in their colour, slightly see-through, a bigger invisible tap area;
  chatting shows a small bobbing "···" (`i.dots`).
- **Talking waits until you're side by side**: `cvStart` makes the resident stop (`tw.card`), walks the pet over (`tw.cvPend`,
  `cvPendTick`), then `cvBegin` opens the conversation. Tapping the ground or walking elsewhere cancels it.
- **Residents talk to each other** (block `/* <res-chat> */` after `/* </talk> */`; sources in gitignored `.claude/rchat/`: `rel.js`,
  `engine.js`, the four dialogue files `sugar/bay/hill/meadow.js`, put in by `.claude/rchat/integrate.py`; brief
  `tools/dev/town/RCHAT_BRIEF.md`). **Relationships are data and canon** (bible chapter 5, "How residents feel about each other"):
  `RTYPE` (Animal Crossing personalities; cranky Prickles and Dewey, snooty Blush and Gloss, smug Fizz, the Mayor and Echo), `RWX`
  weather loves/hates (shift feelings to everyone by one), `RREL_SRC` ~105 written pairs (-2..2 each way, tag, reason), `RREL_WX`
  weather-only feelings, `RTYPE_DEF` defaults by personality, housemates/workmates at least 1. `rFeel(a,b,W)` = how a feels about b now.
  Content `RCHAT.v[k]` (a voice kit per resident: hi re small back about bye wx snub join won lost peace caught; arrays by feeling) and
  `RCHAT.p['a|b']` (325 written scenes for the 105 pairs: `l` lines, optional `w` weather, `j` join block). `rcScene` picks a pair scene
  (72%, weather ones first) or builds one from the kits (greeting, reply, small talk / gossip about a third resident / weather, goodbyes);
  people who can't stand each other sometimes just snub and walk on. `twChats` (replaces `twChatsOld`) starts scenes when two off-duty
  residents meet (not on rounds, not at a market stall; same pair at most every 10 min) and steps the lines; the line being said shows
  over the speaker when you're close (`rcBubTick`). Walking within ~3.4 of a chat shows a chip (`rcPromptTick`): **Listen** (the
  dialogue box plays the scene with both name tags, `rcOpen`/`rcLine`; at the end one may notice you, `caught.warm/cold`, cold for mean
  types under Good friend), **Join in** (`rcJoin`: side with one, the other, or change the subject; siding gives that resident +1
  friendship once a day per pair, nobody loses any), or × to ignore. Tapping a chatting resident offers Listen / Join / Talk to them
  (`rcTapChatting`). Then Talk to either one or leave. Camera framing in `rcTick`.
- New facts the writers invented are in the bible's Canon log ("Neighbours talking (v80)").


## Walking round things, a camera that stays put (v81)
- `twGrid`: decorations block their cells even when they stand on a path (benches, lamps, the fountain used to be walkable because
  path cells cleared every block); `TW_WALK` (flowers, lots, hopscotch, stepping stones, arches, gates) never block and `TW_BRIDGE`
  (arch and foot bridges) force their cells open over streams. Path shortcuts keep a body's width (.22) from solid cells. Residents
  with no route wait instead of walking straight through things.
- The map camera no longer tilts up to clear roofs (`tm.lift` is gone; Garrett: "the camera gets pushed away by buildings"). When a
  building hides the pet for over .35 s, a small pet-face marker shows where it is (`tw.petHid`, `twPetMark`, `.twpm`).

## Touching the pet, caught in the act, a calm arrival (v82)
- **Touch** (`/* touching the pet */` functions before `petTap`): `pick` now returns `{pet,head}` (head index from `R.heads[i].p`).
  Room pointer gestures on the pet: tap = `petTouch(head)` (your head: bob + happy bubble via `pet.myH`; your person's head: a curious
  tilt `pet.boop.c` and the heads glance at each other; tummy: a jelly squash `pet.soft.sv`; 4 quick boops = ticklish jiggle/hiccup;
  3 taps wake a sleeper), drag on the pet = rub (`petRub`, `rubPose`: leans into it, eyes half shut, a heart every ~170 px),
  press 380 ms = pick up (`petPickUp`, mode `held`, `petHoldMove` follows the finger on the floor plane, `heldPose` dangles and kicks,
  `petDrop` falls with gravity onto the nearest free nav cell). `petAffect` = the pat reward (td 'pat', throttled fun/affection).
  `petGo`/`petAct` refuse while held. Styling and Decorate keep the old behaviour.
- **Arrival** (`arrStart`, near `welcomeBack`): every visit (load, or back after 15+ min) opens the same way. After 1 h+ away the pet
  is "caught in the act" (`arrScene`: napping, daydreaming, looking round, sniffing, twirling, dancing; mode `scene` replays the act,
  facing away), notices you (`arrNotice`, ❗ from both heads), walks over and says hello (`petGreet`); after 3 h+ one welcome card
  (`welcomeBack`, returns true when shown) that also carries the scene, "Today with <pet>" (first open item) and the daily gift
  (`ARR.gift`). While `ARR.on`, routine toasts wait (`ARR.q`, max two shown after) and deliveries, visitors and the together check hold
  off. The local-weather question now comes the first time you open the map (`tmOpen`), not 12 s after load. `ARR` is a `var` (toast
  runs before its line). The first-time intro (`showCoach`) was rewritten (no egg, no Two-Do List).

## Buttons, glimmers, tickets; the Bag; the prize counter; town dailies (v83)
Garrett didn't love hearts as money (hearts mean love: the pet's affection, friendship). Now:
- **Buttons** `state.btn` (everyday money; shops, salon, parcels, market). Catalog prices `.p` stay in the old units and are converted
  at the money boundary: `BTN=10`, `itemPrice(it)`, `furnPrice` (×BTN), `tilePrice` (×BTN), doors `6*BTN`, wear `D.p*BTN`, `studioPrice`
  (wraps `studioPrice0`). Logic that compares raw `.p` (gift pools, cheap/expensive thresholds) still uses old units on purpose.
- **Glimmers** `state.glim` (special): earned from bond level-ups (2, 5 every fifth), the daily treat, holidays, big moments, 3-star
  makeovers, a "you're both here" moment (`acts.tog`), finished collections (3). Spent on room size (`SIZE_PRICE` 10/20, offer `cur:'g'`)
  and one **showpiece** per furniture set (`glimOf(k)`: the set's priciest piece, p≥6, costs round(p/4) glimmers; `furnCur(k)`).
  Offers carry `cur` ('b'|'g'|'t'); `wal(c)`, `payCur(n,c)`, `curIc(c)`, icons `IB`/`IG`/`IT` (assets/icons/cur-btn|glim|tix.svg).
- **Tickets** `state.tix` (arcade): every round pays `TIX_STARS` [5,15,30,50] (+10 new best, +25 per mastery level), no daily cap;
  the capsule machine costs `CAP_TIX` 30; capsule tokens are folded in (all old token grants give 30 tickets).
- Hearts (`state.hearts`) and `state.tokens` are legacy, frozen after migration. `normalize` migrates once (`curMig`: btn = hearts×10,
  tix = tokens×30, glim = 5 + 5×bond level). `MERGE.btn/glim/tix = mCur` (takes the larger when the base has no value, so two phones
  migrating don't double it). `SYNC_MIN_V` 83. HUD jar shows buttons and glimmers (`#hearts`, `#glims`).
- **The Bag** (menu tile `bag`, `renderBag`, `bagTab`, `bagOpen`): tabs Food, Care, Toys, Treasures, Keepsakes, Furniture, Clothes, Seeds.
  Treasures are `ITEMS` kind 'treasure' (`TREASURES`, collections `COLS` shore/trail, models `TREASURE_BUILD` in `PROP_BUILD`) in
  `state.inv`; `treasureGet(id)` records the first finder (`state.tfound`), finishes collections (`state.cbook`, +3 glimmers, a ribbon).
  Keepsakes `state.keeps` (letters, ribbons, bottle notes, wishes come true; `keepAdd`; merged by id). Item actions: use, give to a
  neighbour (`giveGift(...,'mail')`, treasure tags `t:<col>`), leave for your person (`surpLeave`), sell to Beacon (treasures, p×BTN),
  put in your room (set `treasure`: CAT `tr_<id>`, `gacha:1`, never sold; `treasureSet()` via `SET_DEF`).
- **Prize counter** (`renderPrizes`, tab `prizes`; Joy/Pixel close-up action or the arcade's game list): arcade-ish furniture, toys,
  sweets, and 1 glimmer for 400 tickets (`prizeList`).
- **Dailies** (block `/* <dailies> */`; optional, never on a list; once a day per person via `dKey`/`dDone`/`dMark` in `state.acts`):
  beachcombing (3 `shore` finds a day on boardwalk path cells, in `findSpots`, `shoreRoll`), the day-old basket (`dlyBasket`; Snack
  Shack close-up or its map card), the wishing well (tap the `well` decoration on the map → `dlyWell`, 10 buttons; next day
  `dlyWellTick` grants it via a resident's letter, or gives buttons back), Prickles' jokes (`dlyJoke`, `JOKES`, `JOKE_RE`; his
  close-up or "I've got a joke for you" on the map; weather he hates lowers the score; 3 = a trail treasure), Blush's mystery colour
  (`dlyMystery`, Blush or Gloss; previews, keep or change back), the Mayor's monthly parcel (`dlyMayorTick`, `state.mayorM`,
  `MAYOR_LET`). `dlySay(k,text,choices)` is a small dialogue card that works anywhere. All run from `lifeTick` → `dlyTick`.

## Menu sweep (v84)
- The Menu has six circles: Decorate, Wardrobe, Bag, Journal, Inbox, Neighbours, with "Our room" (settings, sharing) in the middle.
  Footprints became the Journal's second tab ("You two", `jrTabs`/`jrTabsBind`; `openTab` 'steps' still exists, its MENU_ITEMS group is
  '' so it's not a circle; the Journal circle carries its unread badge). "Room & sharing" is called "Our room" everywhere.
- Pet page order: name and bond, needs rings and the four care buttons, Today with <pet>, looks after itself, heads, About (personality,
  traits, spirit, an "Open the Bag" button, big moments), Style. The wish line reads "<pet> wants …" with who won the vote above it.
- Today's swap button sits on the card's bottom corner; the map's Arrange button is a smaller "Edit town".

## Makeover rooms are floors of the house; more town talk (v85)
- **Rooms you made for a resident are real floors of their house**: `buildShop` uses `housePlan(S)` for houses (the house plan plus one
  level per made room: a single room 'm' over the house footprint, its floor/wall = the most used tile in the design, `tileMode`;
  level has `mk:{k,i,by}` and `lbl`) and appends `houseMkItems(S,P)` (the design's items scaled to the footprint; wall pieces go on the
  back wall, or the left wall for `w:3`). Floor buttons show the room names (`updFloorChip`), arriving says who made it (`setLevel`
  toast), the resident moves up and stands in their room while you're there (`mkHostLevel`, most open spot), and `#mkhouse` now only
  shows "Rearrange this room" (opens the old sandbox view via `mkStart(k,true,i,houseKey)`). `S.plan` itself is unchanged (the map uses it).
- **Round two of resident talk** (sources `.claude/rchat2/<group>.js`, brief `tools/dev/town/RCHAT2_BRIEF.md`, put in by
  `.claude/rchat/integrate.py` into the res-chat block): 2 scenes for every pair that had none (all 496 pairs now have written scenes,
  1,107 in all), and per resident `TALK[k].sys` (treasure, well, parcel, basket, joke, mystery, arcade, money) and `TALK[k].ev` (tea, story,
  meeting, stars, music, games, market = bake sale, sunmkt) lines. `cvSysLine(T)` (engine.js, called first in `cvOpener`, ~38%) picks one
  that fits: today's event until it ends, treasures found in the last two days, a wish at the well, the first five days of the month
  (the Mayor's parcel), else the general ones. index.html is ~7.1 MB now (it was 6.7).

## Prize counter items; speech like Animal Crossing (v86)
- The prize-counter things residents mention are real: 23 `TREASURES` with `col:'prize'`, `r:0` (never wash up), `tix` = ticket price
  (rubber duck 20 ... giant squeaky mallet 400), models in `TREASURE_BUILD`, a Bag collection "The prize counter", displayable like any
  treasure, sold in `prizeList` (bought via `treasureGet`). Residents who wanted them love them (`LIKES`: Pom the gold comb, Bolt the
  mallet, Nimbus the pink umbrella, Sketch the graph pad, Fold the paper, Bobbin the big button, Stitch the sewing kit...).
- Dialogue boxes look like Animal Crossing's (CSS block "speech, Animal Crossing style" before `</style>`): `.cvbox` (map conversations
  and listening in) and `.dlybox` are a soft cloud (`::before` with an irregular border-radius and the SVG filter `#acwob`,
  feTurbulence + feDisplacementMap, defined next to `#kbub`) in a light tint of the speaker's colour (`--cc`), the name tab sits on the
  top edge, text in R42 Bubble, a bouncing `.cvmore` ▼ while typing / for "tap to go on", and choices in their own bubble above the
  box. Shopkeepers' `.kbub` uses the same tint and blob shape. A `dlySay` with no choices shows ▼ and closes on a tap.
- v87 redid the bubbles: no more CSS oval + displacement filter. `acShape(el)` draws an SVG path into `.acsvg` sized to the element (a
  rounded box, corner radius ≤30, with gentle bumps every ~52px along the edges) for `.cvbox`, `.dlybox` and their reply bubbles
  `.cvch` (`acShapes(root)` after each render, on reveal, and on resize). `acVars` sets `--bf/--bs/--tf` from the speaker's colour:
  a pastel of their own hue, or Animal Crossing's soft blue for pale/grey speakers (mixing strong colours toward blue went muddy).
  Name in a pill (no face), outlined bobbing triangle `.cvmore` (SVG data URI).

## The pet's own life: habits, moods, a scrapbook (v88)
Block `/* <pet-life> */` after the dailies (source `.claude/items/petlife.js`). It hooks in by wrapping existing functions
(`autoFill`, `needPick`, `jobAct`, `twStart`, `travelTo`, `giveGift`, `kfAdd`, `setLook`, `treasureGet`, `bondUp`, `cvBegin`, `rcOpen`,
`mkFinish`, `dlyMayorTick`, `dlyWellTick`, `togetherCheck`, `dlyTick`): reassigning a function declaration keeps every caller pointed at
the wrapper, so add hooks the same way rather than editing those functions.
- **Habits** `state.pmem.hab[bucket][need]` counts what it chose for itself (`autoFill`) per time of day (`PL_BUCKETS`, `townHour`);
  a habit = ≥4 and ≥50% of that bucket (`plHabit`), written to the Journal when it forms, and `needPick` seeks that need a bit sooner
  then. **Its spot** = the most-liked placed piece (`state.pet.likes`, ≥6 and 1.4× the next; `plSpot`, remembered in `pmem.spot`).
- **Greetings by absence** `plGreetAfter(gap)` from `arrStart` (6 h+: a jump; a day+: hearts and a nuzzle; 3 days+: a hesitant ❓ then a
  big hello and a dance); `plGapLine` opens the welcome card ("It's been 4 days. Mochi kept your spot warm...").
- **Moods** `petMood()` (priority cold > Room Day "Birthday giddy" > "Missing <person>" (their `visits` stamp older than 3 days) >
  "Rainy-day cozy" (real rain)): a box under the bond bar (`petMoodHtml`), the welcome card, and what it does (`plMoodTick` every 6 s at
  home: yawns and dozes in rain, twirls on Room Day, sneezes with a cold, looks at the door and the missing person's head wonders).
  **A little cold** (`plColdTick`, seeded per day, ~3%, at most every 21 days; `state.pmood` {k:'cold',d,cured,over}) passes the next
  day, or Dr. Patch's check-up cures it (wrapped `jobAct`). No stats change.
- **Scrapbook** = the Journal's third tab (`openTab` 'scrap', `renderScrap`, `state.firsts` {key:{t,by,d}}, earliest wins in the merge;
  `firstOf(key,text)`; `plBackfill` adds the older ones once: the room's birth, bond 5/10, first treasure, first makeover, first friend).

## Seasons and sound (v89)
- **Seasons** (`/* <seasons> */`, source `.claude/items/seasons.js`, wired by `.claude/items/seasons.py`): `seasonNow()` from the
  US Central date (Mar-May spring, Jun-Aug summer, Sep-Nov autumn, else winter; debug "Season" button in Neighbours and houses sets
  `dbgSeason`). `tmSeasonPaint()` runs before every `tmMergeWorld`: green materials on the map turn into the season's foliage (autumn
  golds/reds per material, winter snowy, spring some blossom pink; `seasonMat`, original colour kept in `m._c0`), big flat greens in the
  countryside (`m._big`, from the ground group's mesh sizes) go golden-olive/snowy instead, and the town grass gets a tint or a snow
  texture (`seasonGround`). `tmSeasonFx` draws drifting leaves / snow (also whenever it's snowing) / petals / summer-night fireflies on
  the 2D canvas `#tmSeaFx` over the map. Seasonal decorations = `TM_DECOR` entries with `season`, placed by `tmSeasonDecor()` on
  open (`seasonSpots`: up to 3 of each beside paths, seeded per room + season + year, not saved, block walking via `tm.seaCells`);
  they're hidden from the Arrange palette. `seasonHello()` shows a card the first map visit of a new season (per device).
- **Sound** (`/* <sound> */`, source `.claude/items/sound.js`, wired by `.claude/items/sound.py`): Web Audio, all synthesised, starts on
  the first pointerdown/keydown, suspends when hidden. Buses: music (`musTick`: a generative music box, pentatonic melody over a chord
  loop, slower and lower in the evening and at night, a short noise-impulse reverb), sounds (`SFX.*`: tap, open, coin, chime, pop,
  squish, chirp (per head), giggle, whee, plop, sad, snore, sneeze, step(path type)), ambience (`ambTick`: fountain loudness by the
  pet's distance from the plaza on the map, rain (muffled indoors), wind, room tone, birds by day / crickets at night). Residents babble
  while their lines type (`sBabble(k,ch)`, voice pitch per resident, `VOICE_LOW/HIGH`) in map conversations, listening in and shop
  bubbles. Hooks wrap existing functions (emote, petTouch, petPickUp, petDrop, payCur, buyOffer, nextReward, setTab, petAct). Settings
  per device in `localStorage.r42snd` {m,s}: sliders on the Our room page.
- **Town decorations, batch two** (block `/* <world-decor2> */` after the world-decor block; sources `.claude/decor2/*.js`, brief
  `tools/dev/town/DECOR2_BRIEF.md`, put in by `.claude/decor2/integrate.py`, which also registers `glow` fields into `TM_GLOW` and keeps
  `season` pieces out of the Arrange palette). Seasonal (placed automatically): autumn pumpkin patch, scarecrow, hay bales, leaf pile,
  cider stand; winter snowman, lit evergreen, snowy bench, sled with presents, little ice rink; spring blossom cart, painted eggs,
  flowering arch, birdhouse post; summer shaved-ice cart, splash fountain, paddling pool, garden umbrella. Beach (cat water): umbrella,
  sandcastle, lifeguard tower, rowboat, deckchairs, dock, bucket and spade, crab pots. Walk-through ones are in `TW_WALK`.

## Eleven theme sets, more town decorations, your own designs (v90)
- **Theme sets** (block `/* <theme-sets> */` right after `/* </place-sets> */`; sources `.claude/sets2/t*.js`, brief
  `tools/dev/town/THEME_BRIEF.md`, put in by `.claude/sets2/integrate.py [keys]`, which also adds seasonal Cozy Nest dates to `SEASONS`):
  Malt Shop `tdiner`, Neon Byte `tcyber`, Atomic Lounge `tretro`, Starlet Suite `tdeco`, Harvest Hearth `tharvest` (autumn, Sep 15-Nov
  30), Captain's Cabin `tpirate`, Storybook Castle `tcastle`, Desert Bloom `tboho`, Knit & Cocoa `twinter` (Dec-Feb), Puddle Days
  `train`, Blossom Hour `thanami` (Mar 20-Apr 30). 131 pieces, each set with floor, wallpaper, door and window. Agents' gotchas: `M()`
  needs numeric colours (a '#hex' string renders black), `cushionGeo` takes half sizes.
- **More town decorations** in the world-decor2 block: fun fair (Ferris wheel, bouncy castle, mini golf, duck pond, tire swing,
  treehouse, hammock, campfire, outdoor stage, picnic blanket), nature (cactus garden, bamboo, hedge maze, vegetable patch, flower
  tunnel, glowing mushrooms, firefly meadow, beehive), street and landmarks (vending machine, food truck, news stand, café tables,
  hydrant, flag pole, fancy lamp, cat statue, train halt, school house, museum, community garden). 149 decorations in all.
- **Your designs** (`/* <designs> */` after the sound block; source `.claude/items/designs.js`, wired by `designs.py`): Decorate's 5th tab
  "Designs". 32x32 pixel pictures, 16-colour palette (`state.designs`, max 24, merged by id; deletions in `state.dzDel`). Each one
  registers tile sets `f:d_<id>` / `w:d_<id>` (heading "Your designs", `dz:1`, never sold) and a framed wall picture CAT `dz_<id>` (set
  `designs`, one free in storage, "Another framed picture" adds more). `designRegister` runs at the start of `normalize` (so saved tiles
  and items stay valid) and after merges. Designs are immutable: Edit saves a new one and `designReplace` swaps tiles/items over.
  Editor `renderDzEdit`: pen, fill, eraser, mirror, undo, clear; tap the selected colour again for a colour picker.

## Photo mode (v91)
`/* <photo> */` (source `.claude/items/photo.js`, wired by `photo.py`): a camera button under the money jar (`#phBtn`) and next to the
map's close button (`#tmPhBtn`). `phOpen` hides the HUD (`body.photo`), shows a 4:5 viewfinder, filters (`PH_FILTERS`, CSS filters
previewed live on the canvas), a polaroid frame toggle, "Say cheese" (`phPose`), the shutter (`phShoot`: renders and copies the WebGL
canvas in the same task because the main renderer doesn't preserve its buffer; on the map it layers `#tmSky`, `#tmc` and `#tmSeaFx`),
then crops to 4:5, adds the polaroid caption (place + date) and saves a JPEG to IndexedDB `r42photos` on this phone only (the shared
Firestore doc can't hold images). Album `phAlbum`/`phView`: share via the Web Share API (file), save, delete. First photo goes in the
scrapbook.

## Fishing (v92)
- Data and models (`/* <fish-data> */`, just before `ITEMMAP`, so `PROP_BUILD`, `ITEMMAP` and the treasure display set include them):
  `FISH` rows [id, name, where (pond/river/sea), months, hours, weather, rarity, price, size cm, shape, colours, fish-book hint] →
  `FISHMAP`, pushed into `TREASURES` (collections `fresh` / `sea`, `fish:1`, `hint`) and `ITEMS`; one generic model `fishModel(F)` by
  shape (round, deep, slim, long, flat, puff, eel, frog, claw, shell, star, jelly, octo, squid, horse, ray, boot).
- Play (`/* <fishing> */` after photo): tap a water decoration on the map (`FISH_SPOT`: ponds, streams, bridges, waterfall = fresh;
  `dock`, `beacon` = sea); the pet walks over, `fishStart(w)` opens a top-down water view (`#fishv` 2D canvas): cast, wait, a shadow
  sized by the fish swims up, 1-3 nibbles (tapping now scares it), a bite with "!" (tap within `FISH_WIN` .62 s). `fishAvail(w)` filters
  by month, hour (wraps midnight) and real weather; `fishRoll` weights by rarity. A catch: `treasureGet` (fish book in the Bag, first
  catch → scrapbook), biggest size per fish in `state.fbest`, Beacon's card (keep / sell / let go / cast again). `fishDock()` places a
  dock beside the boardwalk once (`tmM().dk`).
- Fixed in passing: the small dialogue card's choice buttons were invisible since v87 (their fade-in animation left them at opacity 0
  inside `.dlybox`); `.dlybox .cvch button{animation:none}`.
- v93: `tools/dev/town/sweep3.js` (interaction sweep, see Start here). It caught a race: closing an item card and opening another
  within 250 ms hid the new one on slow frames (`closeProduct`'s timer now lives in `#shopcard._ct` and openers clear it).

## Residents remember; moments together; designs on the pet (v94)
- **Memories** (`/* <memories> */` after fishing; engine `.claude/items/mem.js`, lines `.claude/mem/<group>.js` by agents from
  `tools/dev/town/MEM_BRIEF.md`, put in by `.claude/items/mem.py`): `memRec(k,kind,v)` stores `state.rmem[k][kind]` {t,v,said}; town
  news goes in `state.rmem._town` (fish, joke, photo; `said` = list of residents who've mentioned it). Recorded by wrappers: `giveGift`
  (gift_love/like/meh, {g}), `travelTo` a house (visit), `mkFinish` (room), `fishCatch` (fish, {f}, rarer ones), `phShoot` (photo), and
  inline in `dlyJoke` (joke {s} out of ten) and `rcJoin` (sided / against, {o}). `memPick(k)` (first thing tried after milestones in
  `cvBegin`, 55%) picks the newest unsaid one under 7 days (town news under 4) and fills it from `TALK[k].mem[kind]`. Merge `rmem`:
  newest per kind, said lists unioned.
- **Together** (`/* <together> */`): when your person's `visits` stamp is under 2.5 min old, the pet page shows "Together right now"
  (`tgHtml`): a group hug, a dance party, cake for three, a high five. `tgStart` writes `state.tg` {id,by,k,t,join}; the other phone's
  `tgTick` (every 2 s) shows an invitation card for a minute; joining adds to `join` (merge unions joins on the same id), and both
  phones celebrate (`tgCelebrate`: pet animation, +1 glimmer once a day each, a Journal line, a scrapbook first).
- **Designs as pet patterns**: `petPatternTex` draws pattern `dz_<id>` as tiles of the design (head keeps its face clear); Blush's
  studio lists your designs after the built-in patterns; `petLook` accepts `dz_` patterns whose design exists.

## Swap-Face Night masks (v95)
`/* <swapface> */` (source `.claude/items/swap.js`): on Swap-Face Night (`holOn()` k 'swapface', Oct 31; debug "Swap-Face Night" toggle
`dbgSwap`) every resident holds a paper mask on a stick showing who they've come as (`SWAP_AS`, from the bible's costume table, using the
`mask:` entries where the bible has them). `swapMask(g,k)` is called after a keeper is built in `buildShop` and after a walking resident's
full model is built (`twFull`); map pins show the costume's face. The mask texture (`swapMaskTex`) is a 2x `ctex` canvas: when the
portrait thumbnail arrives later it's redrawn with the transform reset (`setTransform`), then re-uploaded on both renderers.
- v96: a one-time "What's new" card per device (`/* <whatsnew> */`, `WHATSNEW` [[version, text]], localStorage `r42wn`), shown
  after the arrival sequence when this phone last saw an older version. **Add a line to `WHATSNEW` for each user-visible release.**
- v97 perf fix: seasonal decorations are now `bakeStatic`-merged like the arranged ones (static pieces in their own group, animated
  ones kept apart); before, 15 seasonal pieces added ~770 draw calls to the far map view (2,095 → 1,492; v88 was 1,363). Measure
  map cost with draw counts at far/mid/street (see `.claude/items/perf.js`) after adding anything to the map.

## Bug catching (v98)
Data and models in `/* <bug-data> */` (right after fish-data, before `ITEMMAP`): `BUGS` rows [id, name, where (flower/tree/water/lamp/
ground), months, hours, weather, rarity, price, shape, colours, hint] → `BUGMAP`, treasures in collection `bugs` (`bug:1`), `bugModel(B)`
by shape. Play in `/* <bugs> */`: `bugsTick` (from `twTick`) keeps up to 4 bugs near the pet, spawned beside decorations that suit them
(`BUG_HOME` regexes on decoration keys; 'ground' anywhere), rarity-weighted from `bugAvail(w)` (month, hour, weather; rain brings only
rain bugs out of flowers and water); fliers flutter in loops, crawlers wander; each has a pale halo so it reads on grass. A tap goes to
`bugPick` (screen-space) before residents; the pet walks up (`bugGo`) and `bugCatch` opens a ring that closes on the bug: tap while it's
green. Catches go in the Bag (bug book with hints), and Posy's card offers keep / give to Posy (buttons) / let go.

## The Little Museum (v99)
`/* <museum> */` (source `.claude/items/museum.js`): `musPlace()` (on map open, once per layout via `tmM().mu`) puts a `museum`
decoration on a free 2x2 next to a road near the middle; tapping it walks there and opens `musOpen()` (Dewey's page: wings Fish, Bugs,
Finds (shore + trail), donated ones shown, unknown ones "?"). "Donate N new finds" (`musDonate`) moves one of each undonated species
from the Bag into `state.museum` {id:{by,t}} (merge keeps the earliest). A finished wing: +3 glimmers and a keepsake ribbon
(`state.cbook['mu_'+wing]`). Prize-counter things aren't exhibits.

## Town projects (v100)
`/* <projects> */` (source `.claude/items/proj.js`): the shared long-term goal. `PROJECTS` [decoration key, name, cost in buttons,
the Mayor's pitch], built in order. Neighbours page tab "Project" (`projHtml`): progress bar, each person's share, Give 50/200/500
(`projGive`, `payCur`). Funded → `projFinish` (Mayor's Inbox letter naming both shares, Journal, scrapbook, +2 glimmers, reward card) and
the key goes to `state.proj.pend`; `projPlace()` on the next map open puts it on a free spot by a road ~11 units from the middle (skips
if the layout already has that key, so two phones can't place it twice). State `state.proj` {i, got:{pid:buttons}, done, pend}; merge:
same i → per-person max, else the larger i; done and pend unioned.
- v101: the garden has `gardenN()` planters (3, plus one every 3 bond levels, max 8) and two new `SEEDS`: potato (food) and pumpkin
  vine (grows a Harvest Hearth pumpkin pouf `hv_pouf`). Residents' new-thing lines (`TALK[k].sys` bugs, museum, project, designs, season,
  fishing; block `/* <sys2> */` after the memories block, sources `.claude/sys2/<group>.js`, brief `tools/dev/town/SYS2_BRIEF.md`),
  weighted up in `cvSysLine` when they're relevant (a bug or fish found in the last 3 days, a recent museum donation, money in the
  current project, having designs). `season` = autumn lines; `season_winter`/`season_spring`/`season_summer` (v102, block
  `/* <season-talk> */`, sources `.claude/season/<group>.js`, brief `tools/dev/town/SEASON_BRIEF.md`) are picked by `seasonNow()`.

## Visitors, fixed up (v103)
- Only residents you've met knock (`visMet(k)`: `kf` has `m`, chats `c` or points `p`). No toast and no reward card: they talk through the
  shop speech bubble `#kbub`, which now also runs at home for the visitor (`updVisitor` calls `kbTick`; `visSay(lines)` queues lines,
  tints the tag with `RES[k][1]`). Flow: a knock and a greeting (`memPick`/level `hi`/KBIB hi; never map `out` openers, they're about
  being outdoors), the pet walks over and waves (`visPetMeet`); tapping the chat badge: first a comment on a placed piece (mentions who
  picked it) and a snack for the pet (once, +2 friendship, `td('visitor')`), then up to one more line (level topics, gossip, topics), then
  a goodbye bubble (`visLeave`) and they shrink out through the door. Unvisited after 4 min, or 75 s after the last chat, they say bye.
  The makeover host (`mkHost`, `visitor.mk`) skips all of this.

## The map opens fast (v104)
Beau tapped Explore, nothing happened for a while, he tapped again and the map opened and then closed.
- Every open (and ~350 ms after every close, in `tmFresh`) ran `tmSync`, which rebuilds the home, paths and every decoration and forces
  a full `tmMergeWorld` (~1.5 s of JS on the laptop, more on a phone). Now `tmSync` stores `tm.syncKey` (`tmSyncKey()`: the layout's
  b/r/c/d, the door, owned doors, the place list) and `tmSyncNeeded()` skips it when nothing changed. Second open from home: 11.8 s ->
  66 ms on software GL. If you add something `tmSync` builds from, put it in `tmSyncKey`.
- Taps queued while the map opened: the scrim behind the map (`#town3` pointerdown, which is all that's under your finger while `#tmPop`
  is hidden during the genie) closed it. The scrim, × and the back button now ignore a close in the first 700 ms (`tmJustOpened`) or
  during the genie; Explore does nothing while the map is open; `tmOpen` returns early if already open (a second open started a second
  `tmTick` loop). Code paths (travel, entering a building) still close at once.
- `twResTick` threw every frame ("reading 'isConnected'") after a resident left the map: the cached nearest list `tw.near` kept the
  dropped resident whose `dot` was null. Skips `!r.dot` and clears `tw.near` on a drop.

## The town layout stopped resetting; faster map loads (v105)
- **Data bug since v75:** `worldV4` wrote `m.v=Math.max(m.v|0,4)`, and `|0` cut the world layout's version 6.3 to 6. `tmNorm` replaces
  any world layout below 6.3 with a fresh `worldDesign()`, so every load threw away the town: Edit town changes, the dock and museum
  (placed again each session), and finished project landmarks (gone, since `pend` was already empty). Now `+m.v||0`, a saved 6 counts as
  6.3, `projPlace` puts back any finished project missing from the map, and `SYNC_MIN_V` is 105 so older apps (which would keep
  resetting the shared layout) refresh instead of saving. Never use `|0` on a version number with a fraction.
- First open of a session no longer rebuilds and re-merges the town: `tmPump` records the sync key when the startup build finishes
  (`tm.syncKeyP`), and `tmSeasonDecor` no longer sets `mergeDirty` (the seasonal pieces aren't part of the town merge; they're built
  behind the loader now). Laptop software GL: 6.5 s -> 0.4 s; reopening from the arcade ~650 -> ~150 ms.
- `smoothNormals` uses a numeric hash table (same quantisation, ~4.7x faster); `bakeWatch` compares numbers instead of joined strings;
  `renderer.disposeGeometry(g)` frees the old merged town batches' GPU buffers in `tmUnmerge`; `tmDecor` marks the merge dirty when a
  merged world exists (otherwise the old merged copy lingered and decorations drew twice); residents' pin portraits are drawn in idle
  time after load. `tmWarmAll` (draw everything once to upload it) exists but isn't called: on software GL it made startup minutes long.


## Tests run on the laptop's GPU (Oct 5 2026)
- `tools/dev/town/run.js` and the preview tools (kview, kall, sview, wview, xview, dview) launch Chromium with `--use-angle=d3d11
  --enable-gpu` (the NVIDIA RTX 3060); `R42_GL=soft` brings back SwiftShader. On the GPU: app ready ~2.4 s (minutes on SwiftShader),
  map first open ~0.85 s, reopen ~40 ms. Most of the "software GL is slow" numbers in older sections were SwiftShader.
- Gotcha in test code: `ev()` returns JSON text, so `await ev('x')===true` is never true (compare with `'true'`, or parse it). A wait
  loop written that way just runs out its timer; several timing tests in the v105 work did that and reported ~200 s "startups".


## Saves survive reloads and two phones at once; speed readout (v106)
- `tools/dev/town/persist.js`: fills the save through the game's own code (runs sweep3, then gifts, keepsakes, firsts, memories,
  treasures, fish, wishlist, project money, museum, garden, a design, friendship, journal, Footprints, town layout edits...), saves,
  reloads, opens the map, and diffs every field of `state` (pet stats, wish, revisions are ignored; `PERSIST_QUICK=1` skips sweep3).
  First run: clean apart from empty bag slots, which `normalize` drops on purpose.
- `tools/dev/town/merge.js`: two "phones" start from one save, each makes different changes as a different person, `mergeInto` combines
  them. It found that furniture, painted tiles and the town's decorations/paths/circles kept only one phone's version when both changed.
  New rules before `MERGE`: `mById` (furniture by id: each side's adds, moves and removals survive; a piece one side stored and the other
  moved stays stored; both moved = ours), `mArr3` (tiles square by square; a room-size change keeps ours), `mList3` + `mLayout` (wmap:
  decoration/path/circle entries as sets against the base, buildings per key, a newer layout version wins). Add a merge rule for any new
  shared list both phones can edit.
- **Speed readout** (`/* <perfhud> */` after the whatsnew block): Debug's first button toggles it (per device, `localStorage.r42perf`).
  Overlay `#pfHud`: fps over the last 60 frames, worst frame in 5 s, frames over 100 ms per minute, renderer `drawn` and `pixelRatio`
  (map or room), and the last timings: app ready, map open (Explore tap to the live map, plus how long `showMap` blocked), trips
  (`travelTo` to arrival). `showMap`/`travelTo` are wrapped. Tap = copy `pfText()` (clipboard, else a card) for Garrett to paste.

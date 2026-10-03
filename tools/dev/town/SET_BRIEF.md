# Brief: a furniture set for each resident of Room for Two

Room for Two is a cozy shared virtual-pet web app (mobile-first) for two people and their two-headed jelly pet. Everything is
one big file, `C:/Users/Garrett/Documents/Room-For-Two/index.html` (~1.8 MB, a custom WebGL2 engine that mimics a small part of
three.js, exposed as `THREE`). Read `CLAUDE.md` in the repo root first: at least "Start here", the "Furniture sets II" bullet
(the model kit and gotchas), "Engine gotchas", "Engine note", "The user's preferences", and the character bible
`tools/writing/keepers-bible.md` + `tools/writing/townsfolk/<key>.md` for the residents you're given.

Every resident in town gets **their own furniture set that fits their vibe without being on the nose**. A set someone could put in
their own room because they like the look, and that you'd recognise as "very Bunbun" once you know Bunbun. Not merchandise of the
character (no giant bunny-head chair, no portraits of them), but a mood, a material palette, a few clever motifs, the kind of
room they'd live in. Each set is sold at Cozy Nest like the ~46 existing sets, and later the player will decorate the residents'
own rooms with them, so they must also be good, useful furniture.

## Hard rules
- **Do NOT edit `index.html` or anything tracked in git.** Write only inside `C:/Users/Garrett/Documents/Room-For-Two/.claude/sets/`.
- For each set you're given, write:
  1. `.claude/sets/<setkey>.js` — exactly one top-level statement: `SET_DEF({...});` (format below). Everything else (helpers,
     materials, textures) goes **inside** builder/painter functions (it's inserted into the app before many helpers exist at load
     time; functions run later, so they may use anything). Cache keys you pass to `gcache`/`tcache` must start with `<setkey>_`.
  2. `.claude/sets/set-<setkey>.svg` — the set's icon (see "Icon").
  3. Screenshots from the preview tool (see below), in `.claude/sets/out/`.
- No four-pointed star / sparkle shapes anywhere (hard rule: reads as an AI logo). Five-point stars are fine.
- No emoji in names; no text baked into models (a painted texture may have tiny decorative lettering only if there's a reason).
- Names say what the piece is, plainly and charmingly ("Rolling pin bench", not "The Bunbun Experience"). Never name things
  after the resident. The **set name** (`n`) is a mood or a place, 1-3 words, and must not collide with an existing set name
  (see `const SETS=[` in index.html) or any other set in this batch.
- Glossy candy look like the rest of the app: deep-purple outlines (`ol(mesh,w)`, #3B1273), rounded shapes, chunky proportions,
  soft bevels. Cute and cozy. High quality, recognisable silhouettes.
- Efficiency: aim for under ~60 meshes and ~25k triangles per piece (static meshes are merged later, so mesh count matters less
  than triangles). Under ~140k triangles for the whole set.

## The set file format
```js
SET_DEF({
  set:{k:'<setkey>',n:'<Set name>',c:'#RRGGBB',res:'<resident key>'},   // c = the set's accent colour (UI)
  tiles:{f:['<floor name>',(x,w,h)=>{ /* paint a 512x512 floor tile, 2x2 grid cells, must tile seamlessly */ }],
         w:['<wall name>',(x,w,h)=>{ /* paint a 512 x WPXH wall tile, 2 columns wide, tiles horizontally */ }]},
  cat:[ {k:'<unique key>',n:'<Name>',fn:'seat',p:8,dc:3, perch:{...}}, ... ],   // no `set` field, SET_DEF adds it
  build:{ '<key>'(c){ const g=G(); /* build */ return g } , ... },
  use:{ '<key>':{kind:'stand',anim:'u_sip',d:5,dist:.05,emo:['💗'],w:.7}, ... }   // optional, see "The pet uses it"
});
```
- Keys: globally unique, lowercase, short, no prefix needed but check `CATMAP` doesn't have it (`grep "k:'<key>'" index.html`).
- **9-11 pieces per set**, covering: 1-2 seats (one can be for two), a bed or a pet bed (`fn:'pet'`, `sleep:1`, `flat:1`), a table or
  counter (`surface`), a light, storage, a plant or decor object, a rug (`fn:'rug'`, `flat:1`), 1-2 wall pieces (`fn:'wall'`,
  `wall:1`, `y:` height of its centre on the wall, ~1.5-2.0), and one fun/interactive thing (`fn:'fun'`). A food bowl (`fn:'pet'`,
  `feed:1`, `flat:1`) is welcome. `fn` must be one of: seat, bed, surface, storage, light, fun, plant, rug, deco, wall, pet.
- `p` = price in hearts (2-14; big pieces cost more), `dc` = default tint index into `TINTS` (index.html), whose colour arrives
  as `c` in the builder. Use `c` for the main dyeable surface so recolouring works; keep accents fixed.
- **Perches** (seats, beds, ride-ons) need a `perch` object or the pet can't sit/lie on them. Copy and adapt from similar existing
  pieces (search `perch:{` in index.html): `y` seat height, `z` front offset, `x` (number or array of spots for two), `w` seat
  width, `bz`/`fe` back/front edges, `kind:'bed'` with `pz` pillow z for beds, `kind:'ride'` for ride-ons. Seat heights ~.42-.6.
- Models: origin at the floor centre of the piece, front faces **+z**, y up, sizes in room units (the room is 8x8; the pet is
  ~0.9 tall; a chair seat ~.45 high, a sofa ~1.8 wide, a bed ~1.4 x 2.0, a floor lamp ~1.6 tall). Wall pieces: origin at the
  centre, the back flat against z=0, depth pointing +z (look at `movieposter` / `moviemarquee`).
- Animated parts: `o.userData.anim=t=>{...}` on a group (ambient), or `userData.use=(t,p)=>{...}` while the pet uses it.
- Engine and kit (read the real code, it's not full three.js): `G()`, `M(hex,{roughness,metalness,map,emissive})`, `add`, `bx`, `rb`
  (rounded box), `cy`, `sp`, `co`, `to` (torus), `ol`, `nosh`, `lathe(g,[[r,y]...] bottom to top,m,...)`/`latheGeo`, `flat` (extrude;
  fans from the centroid), `sweepGeo`, `loftGeo`, `cushionGeo`, `heartGeo` (~1 unit wide), `leafGeo`, `ctex(w,h,painter)` canvas
  textures (fill edge to edge; transparent = black), `jel()` jelly material, `GOLDM()`, `lighten`/`darken`/`shade`, `rnd(seed)`,
  and the set helpers `nsPuffs`, `nsHalf`, `nsScallop`, `nsLine`, `nsBlob`, `nsDrop`, `nsFace`, `nsPillows`, `s1Stripe`, `s1Plaid`,
  `s1Sling`, `s2Tex`, `s2Pot`. Study 2-3 existing sets' builders (search e.g. `cinemacouch(c)`, `loveseat(c)`, `toadstool(c)`).
  Gotchas: `Vector3` has no `lerp`; Euler order XYZ, positive rotation.x tips +y towards +z; `Shape` has no absarc; lathe profiles
  go bottom to top or faces point inward; emissive adds flat colour over a map (keep it low on textured parts); transparent
  materials render very faintly (avoid for important parts).
- Tile painters: look at `SET_TILE_PAINT` in index.html (e.g. `f_movie`, `w_movie`, `f_cafe`) and its kit: `planksF(x,w,h,rows,R=>colour,seed)`,
  `tilesF`, `checkerF(x,w,h,n,[H,S,L],[H,S,L],seed)`, `carpetF(x,w,h,colour,seed)`, `vstripes(x,w,h,[[px,colour],...])`,
  `panelLow(x,w,h,f,base,pn,rail)`, `lattice`, `scatter`, `MOT` motifs, `star5`, `grain`, `hh(i,j)`. Floors must tile seamlessly;
  wallpapers tile left-right. Pick a floor and a wall that make the room shot look like a finished, designed room.

## The pet uses it
Furniture fills the pet's needs by its use animation (seats/beds automatically). For pieces that should do something specific, add
a `use` entry, copying the shape of existing `USE_ITEM` entries (search `Object.assign(USE_ITEM,{`): kinds `stand` (walk up, face
it, play an anim), `perch`, `nap` (pet beds: use `NAP`), `wall`, `rug`; anims available include u_sip, u_nibble, u_stir, u_read,
u_play? (check `ACTS_ANIM` for the real list: u_lean, u_rummage, u_boop, u_sniff, u_pat, u_gaze, u_wiggle, u_watch, u_admire,
u_tick, u_splash, u_wash, u_dry, u_spin, u_warm, u_scope, u_drum, u_water, u_game, u_swing, u_piano, u_paint, u_blow, u_snuggle,
u_dance, u_rake, u_unwrap, u_dig, u_dive, u_type, u_run, u_bounce, u_peer, press...). Food bowls use `BOWL`, pet beds `NAP`.

## Icon (`set-<setkey>.svg`)
48x48 viewBox, matching the existing set icons (open `assets/icons/set-movie.svg`, `set-cafe.svg`, `set-cloud9.svg`): one simple
object or motif that says the set, chunky shapes in the set's colours, #3B1273 outlines (stroke-width ~3), a white highlight.
No text.

## Preview tool (use it every round, look at the pictures honestly, iterate)
```
node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/sview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets/<setkey>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets/out/<setkey>
```
It serves the app in solo mode (never touches live data), inserts your file, renders every piece on a contact sheet
(`_pieces.png`), then furnishes a room with the whole set on its own floor and wallpaper and shoots it from two angles
(`_room.png`, `_room2.png`). It prints each piece's size, mesh and triangle count and any errors. Open the PNGs with the Read
tool. Check: silhouettes read at a glance, proportions next to each other make sense (a table isn't taller than the lamp),
nothing floats or clips, nothing inside-out or black, outlines clean, the dyeable colour looks good, the room looks like one
designed room with a clear personality. Do at least 3 rounds per set. It's slow (software GL): ~1-2 minutes a run.

## Report back
For each set: the set key and name, one line on the vibe and why it fits the resident without being on the nose, the piece list
(key, name, fn), the triangle total, and anything you couldn't get right.

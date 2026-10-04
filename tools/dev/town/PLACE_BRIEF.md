# Brief: the town's civic buildings (Room for Two)

Room for Two is a cozy shared virtual-pet web app (mobile-first) for two people and their two-headed jelly pet. Everything is one big
file, `C:/Users/Garrett/Documents/Room-For-Two/index.html` (a custom WebGL2 engine that mimics part of three.js as `THREE`). The town
has 32 residents, 8 shops and 23 houses on one walkable world map. The residents talk about places that don't exist yet: the Town Hall,
the library, Parcel's post office, Nimbus's weather station, Lumi's lamp shed. You are building the place(s) you're given:
**a walk-in interior, a map exterior, and the place's own furniture set** (used inside, and sold at Cozy Nest like every other set so
the players can decorate with it too). Cozy, candy-bright, never RPG. Garrett (the player) said: make it really high fidelity.

Read first: `CLAUDE.md` ("Start here", "Shop buildings", "Town building models", "Plan massing", "Engine gotchas", "Engine note",
"The user's preferences", the "Furniture sets II" bullet for the model kit), `tools/writing/GAME_BIBLE.md` (canon: read the chapters for
your place's residents and "Places in the lore that aren't buildings on the map (yet)"; the bible wins), and these briefs for the rules
you're combining: `tools/dev/town/HOUSE_BRIEF.md` (interiors: plan format, walkways, the resident's spot), `tools/dev/town/SET_BRIEF.md`
(furniture sets: format, perches, tiles, icon, quality bar), `tools/dev/town/EXT_BRIEF.md` (the quality bar for exteriors). In index.html
read `const PLACES=` (your place's staff, hours and map spot), `function placeShop`, a few `HOUSE_DEF.<id>=` entries, `TM_BODY` shop and
house builders (e.g. `snack(g,o)`, `h_mayor`, the refined ones in the `/* <exteriors-v2> */` block), and 2-3 `SET_DEF({` sets.

## Hard rules
- **Do NOT edit `index.html` or anything tracked in git.** Write only in `C:/Users/Garrett/Documents/Room-For-Two/.claude/places/`.
- Per place `<id>` write:
  1. `<id>.js`: exactly two top-level statements: `PLACE_DEF.<id>={...};` and `TM_BODY.p_<id>=function(g,o){...};`.
  2. `<id>_set.js`: exactly one top-level statement, `SET_DEF({...});` (the SET_BRIEF format; set key `c<id>`, e.g. `ctownhall`; **no `res`
     field**; include `tiles` and a matching `dw` door and window like the resident sets do).
  3. `set-c<id>.svg`: the set icon (SET_BRIEF "Icon").
  Helpers go inside the functions. Cache keys (`gcache`/`tcache`) start with `p<id>_` (exterior) or `c<id>_` (set).
- No four-pointed stars or sparkles (five-point stars are fine), no emoji, no text in models except tiny lettering on a painted texture
  when it has a reason (a sign, a book spine). Deep-purple outlines `ol()`, palette accents pink #FF3D9A, lime #A6E22E, cyan #3EC8F2,
  sun #FFD21F, orange #FF8A1C, grape #9B4DF2.

## 1. The interior: `PLACE_DEF.<id>`
Same shape as `HOUSE_DEF` (see HOUSE_BRIEF): `{n, blurb, door, color, plan, layout, kg:{resident:[gx,gz]}, lines:{resident:{hi:[3 greetings
at work, in their voice]}}}`. `door` = your set key (its `dw` door). The plan is the shops' format.
- **The front door is on the west side** (`door:[0,j,'w']`, `arrive` just inside it). On the map the building is turned so this west face
  looks onto the street; the **west side is the facade**, so the plan's D (north-south) is the facade width and W the depth.
- Map footprint = ceil(W*0.3) x ceil(D*0.3) cells, so stay within the size you're given below.
- A public building, not a home: rooms for what happens there (from the bible), staff-only rooms with `lock:1` where it makes sense
  (they show greyed), at least one place to sit for visitors. 15-35 pieces from your own set plus existing catalog pieces that fit
  (`CAT`; grep `set:'<set>'`) and shop fixtures (`FIX`: `stairs`, `counter`, `shelfunit`...). Walkways clear (the pet needs about a cell);
  tall things on the north/west walls (the camera looks from the south-east); wall pieces `wl:[gx,gz,'n'|'w']` with `y`.
- `kg`: where each staff member stands while on duty (clear of furniture, visible, in the main room, apart from each other).
- A second storey is fine for the Town Hall (a `stairs` fixture like the Toy Box's, `lv:1` items).

## 2. The exterior: `TM_BODY.p_<id>(g,o)`
Same contract as a house exterior (HOUSE_BRIEF part 2, EXT_BRIEF): build into `g` centred at 0, ground y=0, keep the west face flat at
x=-o.hw around the door (z=o.dz), return the label height. The map adds the door model, a name plaque, a pad and the staff figurines on
that face. `tmMass(g,'p_<id>',{...})` can mass the real plan for you. Make it read as *that* building from a high map camera: a civic
silhouette with personality (a clock or a bell, a flag, steps, columns, a weather vane...), real roofs, windows with `tmGlass()` that
glow at night (or push your own lamp materials into `tmGlassMs`), small props that tell the story. Under ~70k triangles (the preview
prints it); reuse materials; static geometry merges well, keep animation to small charming touches (a flag, a vane, smoke).

## 3. The set: `SET_DEF` in `<id>_set.js`
SET_BRIEF rules (pieces face +z, perches for seats, `fn` kinds, prices, tints, `use` entries, tiles that tile, a matching door and window
in `dw`). It's the place's own look, made into furniture a player would want at home too: e.g. the Town Hall's set has the guest book
lectern, the first-brick display case, a council bench for two, a tall civic clock, flag bunting, a ribbon-cutting stand; never a
portrait of a resident. Set name (`n`) 1-3 words, a mood or a place, unique (check `const SETS=[` and every `SET_DEF({` in index.html).
Piece count is given per place below.

## Preview (every round; look at every picture; be honest; iterate 3+ rounds)
- The building: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/pview.js <id>` writes `.claude/places/out/<id>_map_a.png`,
  `_map_b`, `_map_night`, `_map_wide`, `_in1`, `_in2` (+ `_up1/_up2` for an upper floor) and prints triangles, errors, who's inside and a
  pet clip check (should be empty). It loads your `<id>_set.js` too.
- The set: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/sview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/places/<id>_set.js C:/Users/Garrett/Documents/Room-For-Two/.claude/places/out/<id>_set`
- One preview at a time (they use software GL; the laptop is shared with other agents). Read only the parts of index.html you need.

## Writing
Greetings and the blurb in the residents' voices (bible). Short, specific, warm, no AI tics ("it's not X, it's Y", "a testament to",
em-dash rhythm). Piece names say what the thing is.

## Report back
File paths; the interior (rooms, what's in them) and exterior in two lines each; the set (key, name, pieces with fn, triangles); the
exterior's triangles; anything you couldn't get right; any new lore fact you invented (for the bible's Canon log).

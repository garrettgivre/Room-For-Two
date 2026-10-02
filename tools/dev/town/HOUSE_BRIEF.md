# Brief: the neighbourhood houses (Room for Two)

Room for Two is a cozy shared virtual-pet web app. Everything is in one big file,
`C:/Users/Garrett/Documents/Room-For-Two/index.html` (a custom WebGL2 engine that mimics part of three.js as `THREE`).
Read `CLAUDE.md` first (at least "Start here", "Shop buildings", "Town building models", "Plan massing",
"Engine gotchas", "The user's preferences"), and `tools/writing/keepers-bible.md` for who the shopkeepers are.
The eight new shop assistants have character sheets in `.claude/town/creatures/<kind>.md`.

The town now has three neighbourhood maps (Sugarloaf Lane, Bubble Bay, Playhouse Hill; see `HOODS` and `HOUSES` in index.html)
where the residents live. Some houses are shared: Pom & Blush (best friends, co-owners of Glow Up), Gloss & Bobbin
(flatmates), Boing & Joy (the Game Night house), Tock & Sketch (a couple). You can visit a house when someone's home (they
stand inside and you can chat). Right now every house is a placeholder box. You are designing the houses listed in your task
(by house id): each needs an **interior** (a small floor plan, furnished) and a **novelty exterior** for the map,
both full of that character's personality. Cute, cozy, candy-bright; never RPG.

## Hard rules
- **Do NOT edit `index.html` or anything tracked in git.** Write only in `C:/Users/Garrett/Documents/Room-For-Two/.claude/town/houses/`.
- For each house `<id>` write two files:
  1. `<id>_home.js` — exactly one top-level statement: `HOUSE_DEF.<id>={...};`
  2. `<id>_ext.js` — exactly one top-level statement: `TM_BODY.h_<id>=function(g,o){...};`
  Everything else goes inside those objects/functions. `gcache` keys must start with `h<id>_`.
- No four-pointed star/sparkle shapes (the user's rule). Five-point stars are fine. No emoji. Deep-purple outlines
  (`ol(mesh,w)`), palette pink #FF3D9A, lime #A6E22E, cyan #3EC8F2, sun #FFD21F, orange #FF8A1C, grape #9B4DF2 as accents.

## 1. The interior: `HOUSE_DEF.<id>`
```js
HOUSE_DEF.<id>={
  n:'Bunbun’s Burrow',            // the house's name (cute, specific)
  blurb:'One sentence for the map card.',
  door:'<THEME_DW key>',          // the front door style (see THEME_DW in index.html: classic, the room themes and every furniture set key)
  color:'#FFB35C',                // the house's colour (map pad, name plaque)
  plan:{W:6,D:5,ext:0xFFF1E0,base:0xFFF6EA,door:[0,1,'w'],arrive:[[.9,1.5]],levels:[{grid:[...],rooms:{...},doors:[...],open:[],rugs:[...]}]},
  layout:[{k:'<CAT or FIX key>',g:[gx,gz],r:<radians>,c:<hex tint optional>,lv:<level>}, {k:'...',wl:[gx,gz,'n'|'w'],y:<height>}, ...],
  kg:{<resident kind>:[gx,gz], ...},   // where each resident stands (floor cell coords, floats ok): in the main room, clear of furniture, visible from the camera, apart from each other
  lines:{<resident kind>:{hi:['…','…','…']}, ...}   // three greetings at home per resident, in their voice
};
```
- The plan format is exactly the shops' (`S.plan`, read "Shop buildings" in CLAUDE.md and the `SHOPS` entries, e.g. Snack Shack, Toy Box with
  stairs). Grid letters are rooms, `.` outside. Doors between rooms: `[i,j,'e'|'s']` = a gap on the east/south edge of cell (i,j).
  `open:['AB']` removes the wall between rooms A and B. Rugs: `[i0,j0,i1,j1,'<floor tile key>']`.
- **Size: W and D at most 6** (the map footprint must stay 2x2). Cells are 1.25 units. 2–4 rooms; a second storey is allowed
  (a `stairs` fixture like the Toy Box's, `lv:1` items), but keep it small and only if it suits the character.
- **The front door must be on the west side:** `door:[0,j,'w']`, `arrive` = a spot just inside it.
- No `lock` rooms (nothing is staff-only at home).
- Room tiles: `f` / `w` are tile set keys (see `TILESETS`, `TILE_ORDER`, `SET_TILES`: set floors/walls are `s_<set>`, e.g. `s_cafe`).
- Furniture: use catalog keys (`CAT` entries `{k,n,set,fn}`; grep `set:'<set>'` to list a set's pieces) and the shop fixtures in `FIX`
  where they make sense (e.g. `stairs`). Theme it from the furniture sets that fit the character, and make it feel *lived in*:
  a bed (a bedroom each for roommates; one shared for the couple), a place to sit, their hobby corner, something personal; in a
  shared house, both personalities and a spot they share. 10–25 pieces. Rotations: `r` in radians (pieces face +z at r=0).
  Wall pieces: `wl:[gx,gz,'n']` on a back (north) wall, `wl:[gx,gz,'w']` on a west wall, with `y` height.
- Keep walkways clear: the pet walks in from the door and must be able to reach the resident and most rooms (pieces need a gap
  of about a cell from each other in walkways). The camera looks from the south-east, so tall things go on the north/west walls.

## 2. The exterior: `TM_BODY.h_<id>`
The map builds each house with `tmShop('h_<id>')`; when `TM_BODY['h_<id>']` exists it calls it instead of making plain boxes,
then adds the real door model, a name plaque, a pad and (when they're home) the residents' figurines by the door, all on the
**west face at x=-hw**. Study the shop builders in `TM_BODY` (Snack Shack's burger bakery, Toy Box, Cozy Nest's pillow stack,
Jelly Arcade...) and `tmMass` (plan massing helper; optional for houses).
```js
TM_BODY.h_<id>=function(g,o){ // o={hw,hd,dz}: half width (x), half depth (z) of the plan in map units, door z position on the west face
  ... build the house into group g, centred at 0, ground at y=0, keeping the west face flat at x=-o.hw around the door (z=o.dz) ...
  return labelHeight; // the top of the building (y)
};
```
- A novelty house that *is* the character's theme (for a shared house, a mix of both) (e.g. a bread-loaf cottage, a jack-in-the-box), the size of a cottage:
  about 2·hw by 2·hd footprint (~1.5–1.8 units), 1.0–1.8 tall. The map camera is high and far, so silhouette and colour matter
  more than fine detail; add a few charming details anyway (chimney, windows with `tmGlass()`, flower box, little props).
- Materials: `M(hex,{roughness})`, `.detail=3` plaster speckle; `tmGlass()` for windows (glows at night). Anything animated
  needs `userData.anim=t=>...` on its group (and it must be added after `bakeStatic` if you call it; see `tmHome`'s chimney smoke).
- Keep it efficient: under ~150 meshes per house.

## Preview (use it; look at every picture; iterate until it's genuinely good)
```
node C:/Users/Garrett/Documents/Room-For-Two/.claude/town/hview.js <id>
```
It injects your two files into the app (solo mode, never touches live data) and writes to `.claude/town/out/`:
`h_<id>_map_wide.png` (its whole neighbourhood), `_map1.png` / `_map2.png` (your house close up, two angles), `_map_night.png`,
`_in1.png` / `_in2.png` (inside, the resident at home, two camera angles; `_up1/_up2` for an upper floor), and prints errors,
who's inside, and a `pet clip check` list (furniture overlapping the pet where it arrives: should be empty).
Read the PNGs with the Read tool and judge honestly: does the outside read as that character's house from the map? Is the inside
cozy, uncluttered, walkable, with the resident clearly visible and not inside furniture? Any z-fighting, floating or clipped pieces?
Do 2–3 rounds per house, and be economical with tokens: read only the parts of index.html you need (grep, then Read with
offset/limit; never read the whole file), and look at the pictures you need rather than all of them every round.

## Writing
Greetings and the blurb in the character's voice (bible / creature sheets). Short, specific, warm. Avoid AI-writing tics: no
"it's not X, it's Y", no "a testament to", no em-dash-heavy rhythm.

## Finish
Reply with the file paths, a two-line description of each house (outside / inside), mesh counts if you know them, and anything
you'd still improve.

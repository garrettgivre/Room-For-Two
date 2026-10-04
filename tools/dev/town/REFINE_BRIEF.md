# Brief: refine the older furniture sets

Room for Two has ~70 furniture sets. The 32 newest (resident sets, keys `r<name>`, between `/* <resident-sets> */` markers in
index.html) are detailed and charming; the 37 older sets look simpler next to them. Your job: **refine** older sets so they reach
the same quality. Refine, don't redesign: each piece keeps what it is, its name, its rough size and footprint, its function, its
colours and personality, and anything the game relies on (see "Don't break"). Make it look better: nicer silhouettes, proper
proportions, soft bevels, real details (stitching, piping, grain, handles, feet, trims, small props), textures where they help,
better materials, satisfying outlines. Fix anything that looks broken, floating, clipping or too plain.

Read first: `CLAUDE.md` (Start here, the "Furniture sets II" bullet with the model kit and gotchas, "Engine gotchas", "Engine note",
"The user's preferences", "Resident sets and room makeovers (v65)"), `tools/dev/town/SET_BRIEF.md` (the kit and quality bar used
for the resident sets), and look at 2-3 resident set files in `.claude/sets/` (e.g. `rbaker.js`, `rbook.js`, `rpebble.js`) and their
screenshots in `.claude/sets/out/` for the bar to hit.

## How
For each set you're given:
1. Find its pieces: in index.html `const CAT=[` lists every piece with `set:'<setkey>'`; each piece's model is `BUILD.<key>(c)`
   (search `<key>(c){` in index.html; some are in `const BUILD={`, others in `Object.assign(BUILD,{` blocks, a few use helpers
   defined nearby). Also note its `USE_ITEM` entry, `perch` in CAT, and any `userData.anim`/`userData.use`.
2. Look at the set first: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/sview.js --set <setkey> C:/Users/Garrett/Documents/Room-For-Two/.claude/sets_v2/out/<setkey>_before`
3. Write improved builders to `C:/Users/Garrett/Documents/Room-For-Two/.claude/sets_v2/<setkey>.js`, exactly one statement:
   `Object.assign(BUILD,{ key(c){ ... return g }, ... });` for every piece of the set (copy the original as a starting point and
   improve it; helpers go inside the builders or in a cached kit function stored on one of the set's builders, cache keys start
   with `v2<setkey>_`). This file is inserted after all original builders, so it overrides them.
4. Preview with the override: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/sview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets_v2/<setkey>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets_v2/out/<setkey> --key <setkey>`
   (writes `_pieces.png`, `_room.png`, `_room2.png`). Compare with `_before`. At least 2 rounds per set; look honestly.

## Don't break
- Same origin and orientation (floor centre, front +z), same footprint (within ~10%) and similar height, so rooms that already
  contain the piece still look right and the pet's `perch` spots (seat height `y`, `z`, `w`, `bz`, `fe`, `pz` for beds) still fit:
  seats keep their seat height; beds keep mattress height and headboard position.
- Keep every `userData.anim` / `userData.use` behaviour (same moving parts), and keep the dyeable main surface on `c`.
- Keep wall pieces flat against z=0 at the back. Keep `flat` pieces (rugs, mats) thin.
- Budget: under ~25k triangles per piece (inside furniture, `bx`/`rb` become 768-triangle rounded boxes and spheres are bumped to
  20x14, so use the low-poly tricks the resident-set files use for small details).
- No four-pointed stars or sparkles (five-point stars fine), no text, no emoji.
- Do not edit index.html or anything tracked in git. One preview at a time (the machine is shared with 3 other agents).

## Report back
Per set: what you improved (a line), triangle totals before/after, anything you couldn't do. Keep going through your whole list.

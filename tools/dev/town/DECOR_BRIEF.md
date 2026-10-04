# Brief: world decorations for the town map

Room for Two has a 3D town map (the "Explore" map): a curved, rolling world with shops, houses, streets, and decorations the
players place and arrange themselves (Arrange mode on the map, Decorations tool). There are only 13 decorations today (tree, pine,
flowers, lamp, bench, hedge, pond, fountain, balloons, bunting, candy cart, bandstand, pet statue). You're adding many more,
**high fidelity**: detailed, charming, readable from the map's camera (which goes from street level, looking along the ground,
to high above), in the app's glossy candy style.

Read first: `CLAUDE.md` ("Start here", "The user's preferences", "Engine gotchas", "Engine note", the town map sections from v52
onward), and in `index.html` the existing decorations: search `const TM_DECOR={` and read every entry (they show the kit and the
scale), plus the kit functions they use (`G`, `M`, `add`, `sp`, `cy`, `rb`, `bx`, `co`, `to`, `ol`, `piv`, `lathe`/`latheGeo`,
`flat`, `sweepGeo`, `loftGeo`, `nsPuffs`, `nsLine`, `leafGeo`, `ctex`/`mkCanvas` canvas textures, `glowM`, `tmWater()` animated-
looking water texture, `bcDuck`, `gcache`). The Bubble Bay district has a harbour and lighthouse in the lore; the town also has a
river and a coast now, so water things are welcome.

## Scale and rules
- One map cell = 1 unit. A tree is ~1 unit tall, a bench .7 wide, the pet ~.5 tall, a shop ~2-4 cells and ~1.5-3 tall.
  `sz:[w,d]` = footprint in cells (default [1,1]); the object is centred on its footprint, origin at ground level (y=0).
- Each entry: `key:{n:'Name',cat:'nature'|'water'|'landmark'|'street'|'fun',sz:[w,d],b(){const g=G();...;return g}}`.
  Optional `g.userData.anim=t=>{...}` for gentle motion (leaves, flags, water wheels, windmill sails, fountain jets); animate
  pivots/groups only.
- High fidelity, but efficient: under ~8k triangles per 1x1 item, ~20k for big landmarks (they're placed many times and the map
  is heavy on phones). Use `GEO_LOD`-aware helpers (`sp`, `cy`, `lathe`) rather than raw high-segment geometry; reuse materials
  and cached geometry (`gcache('<key>_...')`), and keep small details few but well chosen.
- Outlines: `ol(mesh,w)` with small widths (.002-.006 at this scale). Brand palette accents: pink #FF3D9A, lime #A6E22E, cyan
  #3EC8F2, sun #FFD21F, orange #FF8A1C, grape #9B4DF2, ink #3B1273; nature in fresh candy greens, warm woods, lilac stone.
- No four-pointed stars or sparkles (five-point stars fine). No text unless painted on a sign texture for a reason. No emoji.
- Write ONLY your file: `C:/Users/Garrett/Documents/Room-For-Two/.claude/decor/<yourfile>.js` containing exactly one statement
  `Object.assign(TM_DECOR,{ ... });` (helpers go inside the `b()` functions; keys unique, lowercase, not already in TM_DECOR).
  Do not edit index.html or anything tracked in git.

## Preview (use it every round; look at the PNGs with the Read tool; 3+ rounds)
`node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/dview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/decor/<yourfile>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/decor/out/<yourfile>`
Writes `_items.png` (each item on its grass footprint with a pet-sized lime ball for scale) and `_row.png` (all in a row), and
prints sizes, meshes and triangles. Check silhouette and charm at a glance, scale against the ball and each other, nothing floating
or clipping, nothing black or inside-out, outlines clean, triangle budget. The machine is shared; run one preview at a time.

## Report back
List of keys with name, category, footprint, triangles, and anything you couldn't get right.

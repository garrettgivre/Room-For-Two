# Brief: refine the town's building exteriors

On the Room for Two town map every shop and house is a novelty building (`TM_BODY[k](g,o)` in index.html; shops: snack, toys,
salon, furn, build, glam, wear, arcade; houses: `h_<id>` for 23 homes, between the `/* <house-models> */` markers). The world
around them now has detailed decorations (trees, bridges, a windmill, a clock tower, street furniture, `TM_DECOR`), a coast and a
painted sky, and the buildings look plainer than their surroundings. Refine them: keep each building's idea, silhouette, colours and
footprint (it must still fit its plan and its door), and add fidelity: roof shingles/tiles with edges and trims, proper windows
with frames, sills, shutters and curtains, porches and steps, chimneys, gutters, little gardens, planters, awnings, signs that
belong, fences or low walls where they fit, night-time warm window glow (see how `tmGlass`/`tmGlassMs` and lamps work), and a
few details that tell you who lives or works there. Each resident's house should echo their furniture set's palette and motifs
(set keys `r<resident>`, `.claude/sets/out/<key>_room.png`). Not on the nose: no giant character heads.

Read first: CLAUDE.md (Start here; "Town building models", "Town map fidelity pass", "Map signs", the v52-v71 town sections,
"Engine gotchas"), `tools/writing/GAME_BIBLE.md` for who lives where, and in index.html `const TM_BODY={`, `tmMass`, `tmShop`,
`tmHome`, `tmPad`, `tmSignFor`/`TM_SIGN`, the house builders in the house-models block, and `TM_DECOR` entries for the quality bar.

## How
- Write overrides to `C:/Users/Garrett/Documents/Room-For-Two/.claude/ext/<yourfile>.js`: only `Object.assign(TM_BODY,{ key(g,o){...}, ... });`
  (copy the original builder as a start and improve it; keep its contract: builds into `g`, uses `o.hw/o.hd/o.dz` the same way,
  keeps the west face flat at x=-hw where the door goes, returns the label height like the original). Helpers inside the
  functions; cache keys prefixed `x2<key>_`.
- Preview: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/xview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/ext/<yourfile>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/ext/out/<yourfile> <key>,<key>`
  (shoots each building on the real map from three angles by day and once by night: `<out>_<key>_a/b/c/night.png`). Use `-`
  instead of the file to see the current version. 2+ rounds per building. One preview at a time.
- Budget: the whole town is drawn at once on phones. Keep each building within ~1.3x its current triangle count (the preview
  prints it) and prefer few well-chosen details; reuse materials; merge-friendly static geometry (no animation unless it's a small
  charming touch like smoke or a flag).
- No four-pointed stars or sparkles, no text unless on a painted sign texture, no emoji. Do not edit index.html or tracked files.

## Report back
Per building: what changed, triangles before/after, anything you couldn't get right.

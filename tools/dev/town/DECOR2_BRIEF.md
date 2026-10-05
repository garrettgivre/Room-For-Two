# Brief: town decorations, batch two

Read `tools/dev/town/DECOR_BRIEF.md` first: it has the scale, the rules, the kit, the file format and the preview tool, and all of it
applies. The town already has ~100 decorations (`const TM_DECOR={` plus the `/* <world-decor> */` and market blocks in index.html);
read a good number of them, and don't duplicate any (check names and keys).

Differences for this batch:
- Write `C:/Users/Garrett/Documents/Room-For-Two/.claude/decor2/<yourfile>.js` (one `Object.assign(TM_DECOR,{...});`), previews to
  `.claude/decor2/out/` with `tools/dev/town/dview.js`.
- **Seasonal pieces** get a `season` field: `'autumn'`, `'winter'`, `'spring'` or `'summer'`. The game places those around town by
  itself during their season (and hides them out of season), so make them look good scattered along paths, by houses and on the
  plaza. Non-seasonal pieces go in the Arrange palette under their `cat` for the players to place.
- Give pieces that make light at night `glow:[radius,height]` (like a lamp: the night lighting picks them up).
- The machine is shared: one preview at a time, 3+ rounds, look at every PNG honestly.

## Your list
(given in the agent's message)

## Report back
Keys with name, category, season if any, footprint, triangles, and anything you couldn't get right.

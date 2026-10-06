# Brief: furniture that moves when it's used

Room for Two has ~90 furniture sets (~1,000 pieces). Garrett wants the pieces to feel less static: when the two-headed pet uses a
piece, the piece itself should respond. A general layer already exists (v127): every seat/bed squashes and springs back, used pieces
wobble, and beds get a blanket the pet sleeps under, rumpled after, then made. Your job is the **per-piece** part: give the pieces in
your sets their own moving parts and little reactions, the way a cozy life sim would.

Read first: `CLAUDE.md` (Start here; "Furniture sets II" bullet with the model kit and gotchas; "Living in the room" (perch / USE_ITEM /
USE_FN, `userData.use`/`anim`); "Engine gotchas" (static mesh merging!); "Engine note"; "The user's preferences"), and the existing
animated pieces for reference: search index.html for `userData.use=` and `userData.anim=` (globe, grandclock, stove, ducklamp...).

## What to make
For each set you're given, pick the pieces the pet actually uses (they have a `USE_ITEM` entry, a `perch` in CAT, or a `USE_FN` for
their `fn`; skip pure decor unless an ambient touch is cheap and charming) and give each one a reaction, for example:
- Seats/sofas/beanbags: cushions puff up after the pet leaves, a throw pillow tips over, a rocking chair rocks, a swing sways.
- Beds: a pillow dents and fluffs back, a canopy curtain sways, a mobile turns. (The blanket is already handled; don't add another.)
- Tables/counters/food pieces: a teapot lid lifts and steam puffs, plates rattle, a cake slice disappears and comes back, a cookie jar
  lid pops.
- Appliances: fridge/oven/cupboard doors open while used and close after, a TV/monitor screen brightens and flickers colours, a
  record turns, a fan spins faster, a lamp's shade sways, bubbles rise from a tub.
- Toys/play pieces: a ball rolls, a spinning top spins, a trampoline flexes, a slide's ladder wobbles.
Small, readable motions, a second or two long, looping gently while in use, settling back to rest after. Cozy, not slapstick.

## How it works in code
- `o.userData.use = (t,p) => {...}` is called every frame while the pet uses the piece (standing uses and, since v127, while it sits,
  lies or rides on a perch): `t` = seconds since the use started, `p` = progress 0..1. It's called once with `(-1,-1)` when the use
  ends: put every moving part back to its rest pose then (or start a settle you can't see - keep it simple: rest pose).
- `o.userData.anim = t => {...}` runs all the time (ambient). Use sparingly; most pieces should be still until used.
- **Static mesh merging**: `bakeStatic` merges every mesh that doesn't move into its nearest moving ancestor. It finds what moves by
  simulating `use(t,(t%4)/4)` and `anim(t)` for 120 steps of 0.1 s and watching node transforms, visibility and material values.
  So: put each moving part in its own `G()` pivot (positioned at the hinge), animate the pivot's rotation/position/scale/visible, and
  make sure it actually moves during that simulation (don't gate motion on anything else). Don't look up child meshes later.
  Material changes (emissive for a screen) are detected too; give the animated mesh its own material.
- Keep the piece's footprint, height, origin, orientation, `perch` spot heights, dyeable main surface (`c`) and look the same; you're
  adding motion, not redesigning. Keep existing `use`/`anim` behaviour (extend it).

## Files and preview
1. Find each piece: `const CAT=[` lists pieces with `set:'<setkey>'`; the model is `BUILD.<key>(c)` (search `<key>(c){`; overrides in
   `/* <set-refines> */`, `/* <resident-sets> */`, `/* <theme-sets> */`, `/* <place-sets> */` win, so start from the LAST definition of
   that key in the file).
2. Write `C:/Users/Garrett/Documents/Room-For-Two/.claude/anim/<setkey>.js`: exactly one statement,
   `Object.assign(BUILD,{ key(c){ ...the builder, with pivots and userData.use... return g }, ... });` for the pieces you animate
   (helpers inside the builders or in a cached kit function on one builder; cache keys start with `an<setkey>_`). It's inserted
   after every other builder, so it overrides them.
3. Preview: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/aview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/anim/<setkey>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/anim/out/<setkey> --keys k1,k2,...`
   It writes `<setkey>_anim.png` (each piece: rest, three use frames, after) and prints `movedNodes` per piece (0 = nothing moves:
   your pivot got merged away or use() never ran). Also run `tools/dev/town/sview.js <file> <out> --key <setkey>` once to check the
   pieces still look right at rest. Look at the images; at least two rounds per set.

## Don't break
- No errors in the preview output. Triangle budget as before (~25k per piece). No four-pointed stars/sparkles, no text, no emoji.
- Moving parts must not clip through the rest of the piece or poke far outside its footprint (doors opening are fine).
- Do not edit index.html or anything tracked in git. One preview at a time; the laptop is shared with other agents. Save previews only
  under `.claude/anim/out/` and keep them small (the disk filled up once).

## Report back
Per set: which pieces you animated and what each does (a line each), anything you couldn't do. Your final message is the report (you
can't write report files). Garrett asked me to pass on his thanks: he really appreciates the work you're doing on his game.

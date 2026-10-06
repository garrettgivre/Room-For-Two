# Brief: fill each set's missing needs (one new piece per gap)

Decorate's "By need" browser lists the pieces the pet uses on its own for Hunger, Fun, Energy, Hygiene and Love. Many sets have no
piece at all for some needs, so Garrett asked: look at each set, and where it has nothing for a need, **add one new piece to that set**
that fills it, in the set's own style. You get a list of sets, each with the needs it's missing (hunger / hygiene / love).

## What to make
- For each listed need of a set, one new furniture piece that belongs in that set (same palette, materials, motifs and personality:
  read the set's existing builders and look at its pieces first) and that the pet would plausibly use for that need:
  Hunger: a snack table, treat jar, fruit stand, tea tray, mini fridge, bread box, a themed food bowl...; Hygiene: a washbasin, bath tub,
  shower nook, towel rack, grooming vanity, bubble bath, soap stand, rain barrel spout...; Love: a cuddle cushion, plush toy, hug pillow,
  blanket nook, a keepsake/photo stand to admire, a two-seat snuggle pouf... Make it charming and specific to the set (the Stargazer set's
  hygiene piece might be a comet-shaped bath; Bolt's builder set's love piece a tool-belt teddy).
- Each piece: a `cat` entry (unique key, name, `fn` from FUNCS, `p` price 2-10 in old units, `dc` default tint, `wall:1` only for wall
  pieces, `perch` for seats), a builder, a `use` entry (USE_ITEM; kinds `stand` with a `u_*` anim from ACTS_ANIM, `perch`, `nap`, `wall`,
  `rug`), need amounts (8-14 for the need, optionally 3-5 for a side need), and its **own use animation** (pivots + `userData.use(t,p)`,
  rest pose on `use(-1,-1)`; see `tools/dev/town/ANIM_BRIEF.md`). Good pet animations per need: Hunger `u_nibble` `u_sip` `u_stir`
  `munch`; Hygiene `u_splash` `u_wash` `u_dry` `scrub` `lather` `spritz` `brush`; Love `u_hug` `u_snuggle` `hug` `nuzzle` `stroke`.
- Quality bar and modelling kit: as in `tools/dev/town/SET_BRIEF.md` (read it) and the set's own builders. Budget ~15k triangles per
  piece (furniture bumps spheres to 20x14 and boxes to rounded boxes; use low-poly helpers like the newer sets do). No four-point
  stars/sparkles, no text, no emoji.

## Files
One file per set: `C:/Users/Garrett/Documents/Room-For-Two/.claude/fill/<setkey>.js`, exactly one statement:
`SET_ADD('<setkey>',{cat:[{k:'...',n:'...',fn:'...',p:5,dc:0},...],build:{key(c){...return g},...},use:{key:{kind:'stand',anim:'u_wash',...}},need:{key:{clean:12},...}});`
(`SET_ADD` is defined in index.html next to `SET_DEF`; it adds pieces to an existing set). Copy USE_ITEM shapes from the set's existing
pieces or similar ones (search `USE_ITEM` / `use:{` in index.html). Helpers go inside the builders (cache keys `fl<setkey>_`).

Preview (the file is injected near the end of the script, after every set exists):
`node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/aview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/fill/<setkey>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/fill/out/<setkey> --keys k1,k2`
(rest frame, three use frames, after; prints `movedNodes`). To see it next to the set's other pieces, add a couple of the set's existing
keys to `--keys`. Look at the images; fix and re-run at least once per set.

## Rules
Never edit index.html or anything tracked in git. Only write under `.claude/fill/` (previews in `.claude/fill/out/`, small; the disk is
nearly full, delete extras; helper scripts in `.claude/fill/x/`). One preview at a time; never kill all node processes. Your final
message is the report (you can't write report files): per set, the new pieces (key, name, need, what the animation does). Garrett asked
me to pass on his thanks: he really appreciates the work you're doing on his game.

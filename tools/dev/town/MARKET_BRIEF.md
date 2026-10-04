# Brief: the park and the Sunday market (Room for Two)

Room for Two is a cozy shared virtual-pet web app (mobile-first) for two people and their two-headed jelly pet. Everything is one big
file, `C:/Users/Garrett/Documents/Room-For-Two/index.html` (a custom WebGL2 engine that mimics part of three.js as `THREE`). The town is
one walkable world map; its decorations are `TM_DECOR` entries (trees, benches, a windmill, bridges, a playground...). Two outdoor places
the residents talk about are missing, and you're making their pieces:

1. **The park** at the west end of town: Posy (the gardener) tends it every morning; the muffin twins Scone and Crumb play at the
   playground 9:00-14:00. Canon (`tools/writing/GAME_BIBLE.md`, "Places in the lore"): swings, **the big slide** (Scone got his plaster
   on it), **the small slide** with a snail by it, and **a wall with Crumb's holed stone set in it at eye level**; Posy's flower beds;
   Crumb keeps the snail's wall damp with a little cup. Some pieces already exist and stay (swingset, slideframe, seesaw, sandbox, pond,
   picnic tables): yours make it a real park.
2. **The Sunday market** on Market Street (the street from the plaza up to the new Town Hall): eight stalls, each run by a resident on
   Sunday mornings 9:00-13:00, standing **behind** their stall's counter: Pip (jam, key `jam`), Posy (flowers and seeds), the twins
   (lemonade, both at one stand), Prickles (curios from his travels: he's a retired cactus adventurer with a map of flags), Fold (paper
   crafts: origami, painted signs), Cobble (river pebbles; he's a sleepy road mender), Bobbin (knits; a spool of thread, errand runner),
   Tock (wind-up toys; the Toy Box's stock keeper, counts everything). Plus an arch over the street saying it's the market.
3. **A furniture set** with a market-day look, sold at Cozy Nest and at the stalls, so the players can bring the market home.

Read first: `CLAUDE.md` ("Start here", "Engine gotchas", "Engine note", "The user's preferences", the v71 "Coast, sky, world decorations"
section, the "Furniture sets II" bullet), the bible chapters for the residents above, `tools/dev/town/DECOR_BRIEF.md` (the decoration
format, kit and quality bar: follow it), `tools/dev/town/SET_BRIEF.md` (the set format). In index.html read `const TM_DECOR=`, a few
entries in the `/* <world-decor> */` block (e.g. `stall`, `picnictable`, `windmill`, `cherrytree`), and `function twStallOf`.

## Hard rules
- **Do NOT edit `index.html` or anything tracked in git.** Write only in `C:/Users/Garrett/Documents/Room-For-Two/.claude/places/`.
- `market.js`: exactly one statement, `Object.assign(TM_DECOR,{...});` with these keys (all `cat:'fun'` or `'street'` for the market,
  `'nature'`/`'fun'` for the park; give each `n` a plain name):
  - Market, **1x1 each** (`sz` omitted or `[1,1]`), counter facing **+z**, the back half of the square left open for the vendor to stand
    in (they're placed at the square's centre moved .18 toward -z, facing +z): `mkt_jam`, `mkt_flower`, `mkt_lemon` (two vendors: leave
    room at x ±.22), `mkt_knit`, `mkt_curio`, `mkt_paper`, `mkt_pebble`, `mkt_toy`. Each one different and specific: an awning or canopy
    in its own colours, the goods on display (jars with gingham lids, buckets of flowers and seed packets, a lemonade jug with lemons and
    cups, a rail of tiny knits, curios and a little flag map, paper cranes on strings, trays of striped pebbles, wind-up toys in rows),
    a chalk price board, a crate or two. They must read from the map camera (silhouette, colour) and be charming close up.
  - `mkt_arch`: `sz:[2,1]`, an arch that spans a 2-cell street (posts at the cell edges, nothing at ground level in the middle), bunting
    and a painted sign board (a short word like "Market" is fine on its painted texture).
  - Park: `parkgate` (`sz:[2,1]`, the park's entrance: hedges or a little fence and an arch with a sign), `bigslide` (`sz:[2,2]`: the
    big slide and the small slide with a snail by it), `crumbwall` (`sz:[2,1]`: a low stone wall with one round holed stone set in it at
    a child's eye level, maybe a tiny cup on top), `flowerbed` (`sz:[2,1]`: Posy's raised bed, neat rows), `pottingshed` (1x1 or 2x2:
    Posy's shed), plus 2-3 more park pieces of your choice that the park needs (a climbing frame, a hopscotch path, a little duck house,
    a bench under a pergola...).
  - Animation only as small touches (`userData.anim` on a group: a flag, a swinging sign, a spinning paper windmill).
- `market_set.js`: exactly one `SET_DEF({...});` (SET_BRIEF format), set key `cmarket`, **10-11 pieces**, no `res` field, with tiles and a
  matching `dw` door and window; plus the icon `set-cmarket.svg`. Pieces a market-lover would want at home: a striped awning wall piece,
  a crate shelf, a flower bucket stand, a jam pantry shelf, a lemonade stand (`fn:'fun'`, the pet can use it), a chalkboard sign, a
  wicker basket, a folding stool, a bunting wall piece, a market umbrella table... Cache keys start with `cmarket_` (set) and `mkt_` /
  `park_` (decorations).
- No four-pointed stars or sparkles (five-point fine), no emoji, deep-purple outlines `ol()`, palette accents pink #FF3D9A, lime
  #A6E22E, cyan #3EC8F2, sun #FFD21F, orange #FF8A1C, grape #9B4DF2. Budget: decorations under ~8k triangles per 1x1, ~20k per 2x2
  (`setGeoLod` lowers detail on the map; the preview prints counts); the set under ~140k triangles total.

## Preview (every round; look at every picture; iterate 3+ rounds)
- Decorations: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/dview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/places/market.js C:/Users/Garrett/Documents/Room-For-Two/.claude/places/out/market`
  (a contact sheet of every entry the file adds, plus a "street" shot of them in a row; it prints sizes and triangles).
- The set: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/sview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/places/market_set.js C:/Users/Garrett/Documents/Room-For-Two/.claude/places/out/market_set`
- One preview at a time (software GL, shared laptop). Read only the parts of index.html you need.

## Report back
File paths; each decoration (key, size, what it is, triangles); the set (key, name, pieces with fn, triangles); anything you couldn't
get right; any new lore fact you invented (for the bible's Canon log).

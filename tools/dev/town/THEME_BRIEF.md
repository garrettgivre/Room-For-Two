# Brief: new themed furniture sets (batch "sets2")

Build complete themed furniture sets for Room for Two, exactly like the resident sets: read `tools/dev/town/SET_BRIEF.md` (format,
kit, rules, preview tool, quality bar) and `tools/dev/town/DOOR_BRIEF.md` (each set's matching door and window, the `dw` property).
Everything in those two briefs applies, with these differences:

- These sets belong to no resident: omit `res` in `set:{...}`. Each is a **theme** someone would pick for their whole room.
- Write to `C:/Users/Garrett/Documents/Room-For-Two/.claude/sets2/<setkey>.js` (one `SET_DEF({...});` with `set`, `tiles`, `cat`,
  `build`, `use` where useful, and `dw`), the icon to `.claude/sets2/set-<setkey>.svg`, previews to `.claude/sets2/out/`.
  Preview: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/sview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets2/<setkey>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets2/out/<setkey>`
- **10-12 pieces** per set (the coverage list in SET_BRIEF), a floor, a wallpaper, a door and a window. Prices `p` are in the old
  units (2-14), the app converts them.
- Set names (`n`) must be unique against `const SETS=[` in index.html, every `SET_DEF({set:{...n:` in index.html, and the tile theme
  headings (`g:`) of the room-art sets (e.g. "Bubblegum diner", "Cyber bedroom"). Suggested names below; pick better ones if you like.
- Garrett's taste: cozy, candy-glossy, chunky, cute, high-quality silhouettes; not on the nose; no four-point stars or sparkles, no
  text, no emoji. Each set needs a clear personality you'd recognise from the room shot alone.
- The machine is shared by several agents: run one preview at a time, 3+ rounds per set, look at every PNG honestly.

## The sets
| key | suggested name | idea |
|---|---|---|
| `tdiner` | Malt Shop | a 50s diner at home: a booth for two, a chrome stool, a jukebox (fun), a milkshake counter, a neon wall clock, checker floor |
| `tcyber` | Neon Byte | a glowing gamer-tech bedroom: a pod chair, a hologram lamp, a LED-strip bed, a server-rack shelf, a grid floor |
| `tharvest` | Harvest Hearth | cozy autumn that isn't spooky: pumpkin cushions, a plaid quilt bed, an apple crate shelf, a cider-jug lamp, a hay-bale seat, a leaf rug |
| `tcastle` | Storybook Castle | a room-scale fairytale castle: a canopy throne bed, a tower bookshelf, a crown lamp, banners, a drawbridge chest |
| `tretro` | Atomic Lounge | mid-century modern: a sunburst wall clock, a boomerang table, an egg chair, a record console (fun), a starburst lamp |
| `tdeco` | Starlet Suite | Art Deco glam: a bulb-ringed vanity, a fan-back chair, a mirrored bar cart, a gold fan lamp, a velvet chaise |
| `tpirate` | Captain's Cabin | a ship's cabin: a ship's wheel (fun), a hammock bed, a treasure chest, a porthole lamp, a map table, a rope rug |
| `tboho` | Desert Bloom | boho and desert: rattan peacock chair, macramé wall hanging, cactus planters, a woven pouf, a low daybed, a sun mirror |
| `twinter` | Knit & Cocoa | winter cozy without the holidays: knit everything, a cocoa cart, a snowy window seat, a fur-trim bed, a mitten garland |
| `train` | Puddle Days | a rainy-day room: an umbrella stand, a raindrop chandelier, a puddle rug, a window bench, rubber-boot planters, a cloud lamp |
| `thanami` | Blossom Hour | cherry-blossom picnic: blossom-branch lamps, a low picnic table, paper lanterns, a petal bed, a tea set, a blossom tree in a pot |

## Report back
Per set: key, name, the vibe in one line, the piece list (key, name, fn), triangle total, door and window names, and anything you
couldn't get right.

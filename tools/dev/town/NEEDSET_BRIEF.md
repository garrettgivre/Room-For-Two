# Brief: new furniture sets to even out "By need"

Decorate has a "By need" browser: pieces the pet uses on its own to look after Hunger, Fun, Energy, Hygiene and Love. It is lopsided
(Hygiene 16 pieces, Hunger 59, Love 66, Fun 127, Energy 291), so Garrett asked for new furniture. You build **one complete themed
set** whose pieces fill one need (most pieces) or two.

Build it exactly like the theme sets: read `tools/dev/town/THEME_BRIEF.md`, `tools/dev/town/SET_BRIEF.md` (format, kit, rules,
preview tool, quality bar) and `tools/dev/town/DOOR_BRIEF.md` (the set's door and window, `dw`). Also read
`tools/dev/town/ANIM_BRIEF.md`: unlike the older sets, give **every piece its own use animation from the start** (pivots +
`userData.use(t,p)`, rest pose on `use(-1,-1)`, seats/beds/pet beds looping on `t`), so these pieces move like the rest of the
catalogue now does.

## Differences from THEME_BRIEF
- Write to `C:/Users/Garrett/Documents/Room-For-Two/.claude/sets3/<setkey>.js`, the icon to `.claude/sets3/set-<setkey>.svg`,
  previews to `.claude/sets3/out/` (small; the disk is nearly full; delete extras).
  Preview: `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/sview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets3/<setkey>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets3/out/<setkey>`
  and for motion `node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/aview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets3/<setkey>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets3/out/<setkey> --set <setkey>`
  (aview injects files near the end of the script; that's fine for a SET_DEF file too).
- **12 pieces**, a floor, a wallpaper, a door and a window. Prices `p` in old units (2-14).
- **Every piece must be usable by the pet and fill your set's need.** Give each piece a `USE_ITEM` entry in the SET_DEF `use` block
  (kinds: `stand` with a `u_*` animation from `ACTS_ANIM`, `perch` via a CAT `perch` for seats/beds, `nap` for pet beds, `wall`,
  `rug`; copy shapes from existing sets), and after the `SET_DEF({...});` add in the same file one statement
  `Object.assign(NEED_OVR,{ key:{clean:14}, key2:{clean:10,affection:4}, ... });` giving each piece its need amounts (look at the
  existing `const NEED_OVR={` entries for typical numbers: 8-16 for the main need, 3-6 for a side need). Good animations for each
  need: Hygiene `u_splash` `u_wash` `u_dry` `scrub` `lather` `spritz` `brush`; Love `u_hug` `u_snuggle` `hug` `nuzzle` `stroke`;
  Hunger `u_nibble` `u_sip` `u_stir` `munch`. A pet bed (kind `nap`) is fine as one piece (it fills Energy; give it a side need).
- Set names must be unique (check `const SETS=[` and every `SET_DEF({set:{...n:` in index.html).
- Fill gaps, don't duplicate: search CAT for what already exists (e.g. there is a claw tub, a sink vanity, a towel rack in Bubble
  Bath) and make different, more interesting pieces.

## The sets (one per agent)
| key | suggested name | need | idea |
|---|---|---|---|
| `nsuds` | Splash & Suds | Hygiene | a playful bathroom: a glass shower with a rain head, a bubble-bath tub for two, a double sink with two mirrors, a heated towel ladder, a bath caddy shelf of potions, a rubber-duck pool, a foam pet bed, a toothbrush cup station, a shower-curtain screen, a bath mat, a soap-bubble lamp, a hamper |
| `nspa` | Steam & Petals | Hygiene (+Love) | a spa day: a footbath stool, a steam cabinet, a massage bench, a face-mask vanity, an aroma diffuser lamp, a rose-petal soak tub, a hair-dryer hood chair, a stone sauna bucket and ladle, a robe wardrobe, a pebble rug, a bamboo water spout, a towel-roll pet bed |
| `nhug` | Snuggle Burrow | Love (+Energy) | a cuddly den: a giant plush you hug, a heap of hug pillows, a heart beanbag for two, a blanket-fort nook, a weighted-blanket bed, a plush display shelf, a cuddle swing, a fuzzy rug, a teddy lamp, a love-letter mailbox, a pet-cuddle mat, a heart cushion chair |
| `nsnack` | Midnight Snack | Hunger (+Fun) | a cozy snack corner: a cereal bar with dispensers, a toaster counter, a fruit-bowl table, a snack cupboard, a popcorn maker, a cookie-jar shelf, a honey-pot side table, a mini pancake griddle, a smoothie blender stand, a bread-box bench, a snack pet bowl, a tea kettle stove |

## Report back
Your final message is the report (you can't write report files): key, name, each piece with its need amounts and what its animation
does, triangle counts, anything you couldn't do. Never edit index.html or tracked files; one preview at a time; never kill all node
processes. Garrett asked me to pass on his thanks: he really appreciates the work you're doing on his game.

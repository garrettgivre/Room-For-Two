# Brief: a matching door and window for each resident set

Every furniture set in Room for Two has its own front door and window (sold at Hammer & Hue; the door is the room's door, the
window hangs on a wall). The 32 new resident sets (files `.claude/sets/r*.js`, each a single `SET_DEF({...})` call) don't have
them yet. You add them.

Read first: `CLAUDE.md` (repo root) "Doors & windows" bullet, "Engine gotchas", "The user's preferences"; then in `index.html`
read `const THEME_DW={` (the existing doors and windows, ~230 lines; study at least 6 of them, e.g. classic, strawberry, diner,
movie, cafe, cloud9, books) and the kit right before it: `openPts`, `dBase(o)` (glow, frame, step, a leaf in `D.hinge` with x 0..w,
y 0..h, front at z .04; options top:'rect'|'arch'|'dome'|'peak'|'gable'|'round'|'chamfer'|'soft'|'circle', F frame material,
L leaf material, fw frame width, signY), `wBase(o)` (glass, frame, sill, mull 'cross'|'grid'|'vert'), `mt(hex,roughness,opts)`,
props `curtains`, `awning`, `blinds`, `shutters`, `planter`, `pot`, `bloom`, `leaf3`, `icicles`, `lumps`, `bulbs`, `fairy`,
`bunting`, `crescent`, `star3`, `heart3`, `bone3`, `porthole`, `alongTop`, `inset`, `knob`. Also read the set file you're
decorating (its palette, motifs and pieces) and its screenshots in `.claude/sets/out/<key>_room.png`.

## What to write
In each assigned set file, add a `dw` property to the object passed to `SET_DEF` (keep everything else untouched):
```js
  dw:{n:'<door style name, 1-2 words, e.g. "Bakehouse">',wn:'<window name, e.g. "Bakehouse window">',
      door(){const D=dBase({...});/* decorate D.hinge (moves with the leaf) and D.g (the frame) */knob(D);return D},
      win(){const W=wBase({...});/* decorate W.g */return W}},
```
Rules: same quality and chunkiness as the existing THEME_DW entries; follow the set's palette and one or two of its motifs; not on
the nose (no character faces); no four-pointed stars or sparkles (five-point stars are fine); no text; the door must still read as
a door and the window as a window. Keep each under ~15k triangles. Everything stays inside the functions.

## Preview
`node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/sview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets/<key>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/sets/out/<key>`
now also writes `<key>_doorwin.png` (the door and window on their own) and puts the door and window into the room shots. Look at
them with the Read tool and iterate (2+ rounds per set). The run is slow (1-2 min); other agents share the machine. Only change
the `dw` part of each file: other parts are finished and reviewed. Never edit index.html or anything tracked in git.

## Report back
Per set: key, door name, window name, one line on the idea, and anything that didn't come out right.

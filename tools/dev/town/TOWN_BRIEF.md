# Brief: more townsfolk for Room for Two (neighbours)

Room for Two is a cozy shared virtual-pet web app (mobile-first). Everything is in one big file,
`C:/Users/Garrett/Documents/Room-For-Two/index.html` (~600 KB, a custom WebGL2 engine that mimics a small part of three.js,
exposed as `THREE`). Read `CLAUDE.md` in the repo root first (at least "Start here", "Shopkeeper models", "Engine gotchas",
"The user's preferences"), and `tools/writing/keepers-bible.md` (the existing characters, their voices and relationships).

The town has nine shopkeepers and eight shop assistants (their models are in `.claude/town/creatures/*.js` and inside index.html;
sheets in `tools/writing/townsfolk/`). We're adding **townsfolk who aren't shop staff**: neighbours with their own jobs and routines
around town (the mayor, the mail carrier, the gardener...). They live in the neighbourhoods and you visit them at home.
You are designing and modelling ONE of them in 3D (or the pair named in your task), in the same style and quality as the existing ones.
Look at a couple of the existing creatures' screenshots in `.claude/town/out/` (e.g. `jam_three.png`, `pencil_three.png`) to match the bar.

## Hard rules
- **Do NOT edit `index.html` or anything tracked in git.** Write only inside `C:/Users/Garrett/Documents/Room-For-Two/.claude/town/creatures/`.
- Your output files (replace `<key>` with your creature's key):
  1. `<key>.js` — the model. It must contain exactly one top-level statement: `KEEPERS.<key>=function(){ ... };`
     Everything else (helpers, constants, materials) goes **inside** that function. Cache keys passed to `gcache(...)`
     must start with `<key>_` so they never collide. The file is injected into the app's closure just before `const clock=`,
     so every helper in index.html is in scope.
  2. `<key>.md` — the character sheet (see "Writing" below).
  3. Screenshots you made with the preview tool (in `.claude/town/out/`, they're for review).
- No four-pointed star / sparkle shapes anywhere (the user's hard rule: reads as an AI logo). Five-point stars are fine.
- No emoji, no text baked into the model unless it's part of a painted texture with a reason.
- Cute, cozy, glossy candy look; deep-purple outlines (#3B1273 via `ol(mesh,w)`), brand palette: pink #FF3D9A, lime #A6E22E,
  cyan #3EC8F2, sun #FFD21F, orange #FF8A1C, grape #9B4DF2 (use them as accents; your creature has its own main colours).
- Keep it efficient: aim for under ~120 meshes and under ~40k triangles (existing keepers are 100–200 meshes before baking).

## The builder contract
```js
KEEPERS.<key>=function(){
  const g=G(),b=G();g.add(b);            // g = root (feet at y=0, facing +z toward the camera), b = body group
  ... build meshes with the kit ...
  return {g, head:<an Object3D at the face/head centre>, upd(dt,t,act,p,talk){ ... animate ... }};
};
```
- Size: roughly 0.9–1.5 units tall before the shop scales keepers by 1.22. Feet at y=0. The face must be clearly visible
  from the front and from a camera that's up and to the side (~35° above, ~40° to the side).
- `upd(dt,t,act,p,talk)`: `act` is 'idle' | 'greet' | 'cheer' (`p` = 0..1 progress through it), `talk` = true while speaking.
  Do: breathing (`kBreath`), blinking eyes with gaze (`kEye` + `kEyesUpd`, or `kFace2`), a mouth that moves while `talk`
  (syllable pattern like the others: see how Cushy/Bunbun do `ES.mo`), a wave or bounce for greet, a bigger happy move for
  cheer, and **one idle quirk on a timer** that waits while talking (the existing ones: flour puffs, a comb through the hair,
  BOING, a self-fluff). Clamp `dt` (`dt=Math.min(dt,.05)`).
- Gaze: `kEyesUpd` reads where to look automatically (the shop sets `g.userData.gaze`); outside a shop it wanders. Use it.
- Static meshes get merged after building (`bakeKeeper`), found by simulating `upd`. So: anything that animates must be moved
  through its own group/pivot transform, visibility or material values; don't rely on looking up child meshes later.
- Materials: matte plush/fabric (`M(hex,{roughness:.6})`, `.detail=1` weave / `3` plaster speckle), glossy jelly `jel(hex)`,
  metal `M(hex,{metalness:.5,roughness:.3})`. Don't make important parts transparent (renders faint). `M(...).rim` is set for you.

## The kit (read these parts of index.html)
- Basics (around lines 2154–2175, 3422–3430, 3741–3750, 5259–5330): `G()`, `M(hex,opts)`, `add(g,geo,mat,x,y,z)`, `piv(par,x,y,z)`,
  `sp(g,r,mat,x,y,z,sx,sy,sz)` sphere, `cy(g,rTop,rBot,h,mat,x,y,z,seg)` cylinder, `rb(g,w,h,d,radius,mat,x,y,z)` rounded box,
  `ol(mesh,width)` outline, `gcache(key,fn)`, `lighten/darken(hex,a)`, `clamp`, `latheGeo(pts [[r,y]...] bottom to top, seg)`,
  `lathe(g,pts,m,...)`, `flat(g,shapePts,depth,m,...)`, `heartGeo()`, `leafGeo`, `ctex`/`mkCanvas` canvas textures
  (`new THREE.CanvasTexture(canvas)`, set `tex.encoding=THREE.sRGBEncoding`), `onSurface`, `gloss`, `jel`.
- The keeper mesh kit (lines ~7081–7164): `kArm2`, `kArm3` noodle arms, `kBreath`, `meshGeo`, `smoothProf`, `loftGeo`
  (elliptical rings with their own centres; great for bodies), `sweepGeo` (tubes along a curve), `kAim`, `camLook`,
  `crPt`, `bubbleMesh`, `cushionGeo`, `pivAt`, `profAt`, `onLoft` (place things on a loft's surface), `eyeTex` (painted eyes:
  iris colours, star pupils...), `kEye`, `kEyesUpd`.
- The existing keepers to learn from (KEEPERS, lines ~7165–7700, plus `KEEPERS.joy` and `Object.assign(KEEPERS,{hair,makeup,tailor})`):
  Cushy (cushionGeo, corner lifts), Bolt (egg loft + overalls), Bunbun (`kFace2`, `onBody`, sprung ears), Fizz (dynamic body,
  bubble hair), Boing (spring, one eye), Pom, Blush, Stitch, Joy. Copy their techniques; don't copy their looks.
- Engine notes: Euler order XYZ; no `rotateX`; `Vector3` has no `lerp`; positive rotation.x tips +y toward +z;
  ExtrudeGeometry fans from the centroid; lathe profiles go bottom to top; a canvas texture must be filled edge to edge.

## Preview tool (use it, look at the pictures, iterate until it's genuinely good)
```
node C:/Users/Garrett/Documents/Room-For-Two/.claude/town/kview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/town/creatures/<key>.js <key> C:/Users/Garrett/Documents/Room-For-Two/.claude/town/out/<key> [cheer|greet|talk]
```
It serves the app in solo mode (never touches live data), injects your file, builds your creature on a podium-less floor, runs
`upd`, and writes `<out>_front.png`, `_three.png`, `_side.png`, `_back.png`, `_act.png`; it prints size, mesh and triangle
counts and any console errors. Open the PNGs with the Read tool and judge them honestly: proportions, cuteness, readable face,
no floating/clipping parts, nothing inside-out, outlines clean. To compare with an existing keeper:
`node .../kview.js - cushion .../out/ref_cushion`. Do at least 3 rounds of looking and refining. Also run it with `cheer` and `talk`.

## Writing (`<key>.md`)
Follow the format of a character in `tools/writing/keepers-bible.md`: Name · Role, Look, Voice, Loves / Can't stand, Quirks,
With the two of you, and relationships (2–4 of the existing keepers/assistants, fond, specific). Then:
- `idles:` 5 picks from hop, sway, stretch, look, wiggle, spin, lean, squash, rock, march, twirl, dance, bow, tiptoe, laugh
- `talks:` 3 picks from nod, bounce, lean, sway, excited
- `lines:` with these exact sub-headings, each a list of quoted lines: hi (4, greetings when you visit their home), mood (3),
  tips (3, small life advice in their voice), pet (3; may use {n} pet name, {a}/{b} head names), bye (2), story (4 chapters, each a
  single line under 110 characters), letters (3 short middles for an Inbox note, lowercase start, e.g. "the roses came up pink this year.")
- `rel:` one first-person line about each of 2–4 named residents (e.g. `- baker: "Bunbun gives me the burnt cookies. I prefer them."`)
- `home:` a paragraph: what their house looks like outside and inside.
Voice: short, specific, warm, each character sounds different with the name hidden. Avoid AI-writing tics: no
"it's not X, it's Y", no "a testament to", no em-dash-heavy rhythm. Gossip is fond; no villains.

## Finish
Reply with: the file paths, the mesh/triangle counts, a two-sentence description of the design, and what you'd still improve.

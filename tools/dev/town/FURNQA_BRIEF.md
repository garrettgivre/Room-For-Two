# Brief: furniture quality pass (the pet actually using every piece)

A message from Garrett and Beau: thank you. They'll see these pieces every day in their room.

Room for Two has ~1,100 furniture pieces. Most got moving parts in v127-v131 (`userData.use`, see `tools/dev/town/ANIM_BRIEF.md`) and
the pet uses them (sits, lies, rides, stands at them and plays a `u_*` animation). Nobody has watched the pet use each one. Your job:
for every piece in your sets that the pet can use, make the pet use it in the room, look at it, and fix what looks wrong.

Read first: `CLAUDE.md` (Start here; "Living in the room"; "Lying down"; "Lying on beds"; "Furniture comes alive (v127)"; "Engine
gotchas"; "Engine note"), `tools/dev/town/ANIM_BRIEF.md` (how pieces and their animations are built and previewed), and
`tools/dev/town/PLAYTEST_BRIEF.md` "How to play headlessly" (`tools/dev/town/run.js`, `ev` returns JSON text).

## What to check, per piece (with the pet using it)
- Clipping: the pet sunk into a seat/bed/table, a head or arm through a backrest, a canopy, a shelf or the piece's moving part; the pet
  standing inside the piece for a standing use.
- Floating: the pet hovering above a seat or bed, or a moving part flying off the piece / detached from where it hinges.
- Facing and spot: the pet facing away from what it's using (a TV, a stove, a desk), using it from behind or from inside a wall, or
  standing so far away it doesn't read as using it.
- Animation: the moving part does something broken (spins off axis, scales to nothing, stays in the wrong pose after use), or the pet's
  use animation doesn't fit the piece (scrubbing a lamp).
- Pieces with no reaction at all that clearly should have one (rare; v131 covered most).
Ignore pure decor the pet doesn't use, and the blanket on beds (that's the shared v127 layer, it's fine).

## How to look
Write your own test with run.js. Spawn a piece into the home room: `state.fown[k]=(state.fown[k]|0)+1; const it=spawn(k);` (it's
selected; `select(null)`), then `petUseItem(it.id)` makes the pet walk over and use it. Step the pet by hand (rAF is throttled in
headless): `let t=0; for(...){t+=1/60; updatePet(1/60,t)}` and the IL layer runs from an updatePet wrapper. Wait until `pet.use`
(standing uses) or `pet.mode==='perch'` / `'sleep'` (seats, beds) is active and a second or two in, then render (`renderer.render(scene,
camera)` after setting the camera, or let a frame run) and screenshot from an angle where you can see the contact: e.g. set `cam.yaw`,
`cam.pitch`, `cam.dist` or follow the pet (`setFollow(true)`). Measure as well as look: `new THREE.Box3().setFromObject(pet.group)` vs the
piece's Box3 and its seat height (`CATMAP[k].perch`), to spot floating/sinking by numbers. Clear the room between pieces
(`state.items=[];syncScene()`). Save screenshots as small JPEGs and overwrite the same few filenames (the C: drive was full recently;
check `df -h /c` now and then and stop making images if it's under 5 GB).

## How to fix
Write fixes as plain JavaScript in `C:/Users/Garrett/Documents/Room-For-Two/.claude/qa/<your group>.js`; it will be inserted into
index.html after every builder and override (after the `/* </anim-sets> */` block), so it can re-assign anything:
- seat/bed spots: `CATMAP.<key>.perch.y = ...` (also `z`, `x`, `w`, `pz`, `hb`... see perchSpots / seatWorld / startPerch in index.html);
- standing use spots or kinds: `USE_ITEM.<key> = {...}`;
- a model or its animation: wrap the builder, e.g. `{const b=BUILD.<key>;BUILD.<key>=function(c){const g=b.call(this,c); ...fix...; return g}}`
  (remember: moving parts must be in their own pivot and move during bakeStatic's simulation).
Test your fix by injecting your file (run.js takes injected files as a second argument: `node tools/dev/town/run.js test.js
.claude/qa/<group>.js`; injected code runs before `const clock=`, which is after the builders, so it behaves the same) and look again.
Wrap each piece's fix in its own `try{...}catch(e){console.warn('qa <key>',e)}`. Keep the file parsing (`node -e "new Function(require('fs').readFileSync('.claude/qa/<group>.js','utf8'))"`).
Don't edit index.html or anything tracked by git. Keep helper scripts and images in `.claude/qa/<group>/` with distinctive names.

## Report
Your final message: per set, what you checked and what you fixed (piece key: problem -> fix), and anything you found but couldn't fix.
Work set by set and keep the fixes file valid as you go, so partial work survives.

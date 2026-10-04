# Brief: wearables themed on the residents' sets

The two-headed jelly pet in Room for Two can wear accessories (hats, eyewear, neck, back, waist), hand styles and shoes, bought at
Jelly Threads and swapped in the Wardrobe. There are ~50 of each already. Every resident now has their own furniture set (keys
`r<resident>`, e.g. `rbaker` "Butter Hearth" for Bunbun, `rpebble` "Riverstone" for Cobble; see `// ---- r` lines in index.html and
`.claude/sets/r*.js`, screenshots in `.claude/sets/out/<key>_room.png`). Your job: a small capsule collection per resident set, in
that set's palette and motifs, cute and wearable, never a costume of the character (no character faces).

Read first: `CLAUDE.md` ("The big wardrobe" bullet: the wearables kit `wkJ`, `wkM`, `wkGold`, `wkDome`, `wkCyl`, `wkCone`, `wkStar`,
`wkHeart`, `wkBall`, `wkRing`, `wkLathe`, `wkBrim`, `wkFlower`, `wkLeaf`, `wkLine`, `wkBand`, `wkFaceZ`, `wkSticker`, `wkLens`,
`wkRim`, `wkShine`, `wkNeck`, `wkPend`, `wkCollar`, `wkStraps`, `wkWingPair`, `wkBelt`, `wkHip`, `wkSkirt`, `wkTail`, `wkHand`,
`wkCuff`, `wkHold`, `wkSole`, `wkUpper`, `wkShaft`, and the socket geometry notes), "Pet look", "The user's preferences";
`tools/writing/GAME_BIBLE.md` for the residents. In index.html read `const ACCS={` and the `Object.assign(ACCS,{` blocks,
`HAND_STYLES`, `FOOT_STYLES`, `WEAR_DESC` to copy the patterns exactly (build signatures differ: ACCS `build(r)`, hands
`build(ap,S,m,s)`, shoes `build(lp,S,m,s,gy)`; main surfaces of hands/shoes use the dyeable material `m`).

## Output
For each resident set you're given, 3-4 items: usually 2 accessories (different slots, e.g. a hat and a neck piece) plus a hand
style or shoes. Names say what the thing is ("Butter-churn earmuffs" no; "Gingham bonnet" yes), never the resident's name. Prices
`p` 8-18. Descriptions `d` (ACCS) or `WEAR_DESC[key]` (hands/shoes) one short, charming line.
Write ONE file: `C:/Users/Garrett/Documents/Room-For-Two/.claude/wear/<yourfile>.js` with only `Object.assign(ACCS,{...});`,
`Object.assign(HAND_STYLES,{...});`, `Object.assign(FOOT_STYLES,{...});` and `Object.assign(WEAR_DESC,{...});` statements. Keys unique
(check index.html and the other files in `.claude/wear/`), lowercase. Helpers inside the build functions. No four-pointed stars or
sparkles, no text, no emoji.

## Preview (every round; 3+ rounds; look at the PNG with the Read tool)
`node C:/Users/Garrett/Documents/Room-For-Two/tools/dev/town/wview.js C:/Users/Garrett/Documents/Room-For-Two/.claude/wear/<yourfile>.js C:/Users/Garrett/Documents/Room-For-Two/.claude/wear/out/<yourfile>`
Shows each item on the real pet (hats and eyewear on both heads), front and three-quarter. Check: sits right on the socket (not
floating, not buried), reads at a glance, cute, in the set's style; budget under ~6k triangles per item. One preview at a time.
Do not edit index.html or anything tracked in git.

## Report back
Per item: key, name, slot, price, which set, and anything you couldn't get right.

# Brief: deeper friendships (more "what's on your mind", Bestie letters, more letters)

A playtest found friendship content runs out around day 15: each resident has only 5 `deep` conversations (unlocked at Good friend,
played in order, then they repeat), Bestie gives nothing, and each resident has only 3 Inbox letter lines. Read the bible
(`tools/writing/GAME_BIBLE.md`: voices, pronouns, chapter 5 relationships, households, the Canon log) and each resident's existing lines
(`.claude/talk/<key>.js`; their current `deep` entries are in index.html inside the `/* <talk> */` block under `TALK.<key>`), and continue
from where their 5 deep conversations leave off: these are the next, more personal ones (a memory, a worry, something they've never told
anyone, a small hope), never melodramatic, always cozy.

## Per resident (all 32)
- `deep` (5 more): same shape as the existing ones:
  `{t:"line",r:[["what you say","their answer",1],["another choice","their answer"]]}` (the `1` marks a kind reply that earns a little
  friendship; one per node).
- `bestie` (1): a short letter they send when you become best friends (under 280 characters), warm and in voice. `{me}` is the player.
- `letters` (2 more): short Inbox lines in the same style as `RES_T` (lowercase start, they're slotted after a greeting like "Hi! "), under
  140 characters, e.g. "the oven is full and the whole street smells like warm bread."
Placeholders: `{n}` pet, `{a}`/`{b}` its heads, `{me}` the player. No emoji, no AI tics (no "it's not X, it's Y", no "honestly," openers,
no em-dash pileups, no aphorisms, no lists of three).

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/deep/<group>.js` with, per resident:
`TALK.<key>.deep.push(...five nodes...);TALK.<key>.bestie="...";RES_T.<key>.push("...","...");`
Groups: sugar (baker jam cushion dust cone scone crumb patch), bay (stylist sponge tailor hair makeup polish spool beacon),
hill (toymaker joy windup pencil builder pixel parcel crane pebble), meadow (mayor book lantern cloud posy cactus gramo).
Check: `node -e "global.TALK={};global.RES_T={};'<keys>'.split(' ').forEach(k=>{TALK[k]={deep:[]};RES_T[k]=[]});eval(require('fs').readFileSync('.claude/deep/<group>.js','utf8'));for(const k in TALK)console.log(k,TALK[k].deep.length,!!TALK[k].bestie,RES_T[k].length)"`.
Don't edit index.html or anything in git. Report counts and any new facts you invented. You can't write report files; your final message is the report.

# Brief: residents' moods (good days and grumpy days)

Residents now have gentle moods day to day (seeded, the same on both phones): most days are ordinary, some days they're in a
**good** mood, some days a bit **grumpy** (tired, distracted, a small thing went wrong; never mean to the player, never sad in a heavy
way). A chat or a gift can cheer a grumpy resident up. Write the lines in each resident's exact voice. Read the bible
(`tools/writing/GAME_BIBLE.md`: voices, pronouns, chapter 5 relationships, Canon log) and their existing lines (`.claude/talk/<key>.js`,
`.claude/social/<group>.js`).

## Per resident (all 32), under 150 characters each
- `mood_good` (4): an opener on a good day, ideally with a small concrete reason ("The bread rose twice as high today...").
- `mood_grumpy` (4): an opener on a grumpy day, with a small reason, still kind to the player.
- `mood_cheered` (3): what they say when the player has cheered them up (after a chat or a gift on a grumpy day).
- `mood_why_good` / `mood_why_grumpy` (2 each): a short phrase (3-8 words, lowercase, no full stop) for a status line, e.g.
  "the bread rose beautifully", "stubbed a toe on the mixer".
Placeholders: {n} pet, {me} player. No emoji, no AI tics (no "it's not X, it's Y", no "honestly," openers, no em-dash pileups,
no aphorisms, no lists of three).

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/mood/all.js`: one `Object.assign(TALK.<key>.sys,{mood_good:[...],mood_grumpy:[...],
mood_cheered:[...],mood_why_good:[...],mood_why_grumpy:[...]});` per resident. Keys: baker jam cushion dust cone scone crumb patch
stylist sponge tailor hair makeup polish spool beacon toymaker joy windup pencil builder pixel parcel crane pebble mayor book lantern
cloud posy cactus gramo. Check with: `node -e "global.TALK={};'baker jam cushion dust cone scone crumb patch stylist sponge tailor hair makeup polish spool beacon toymaker joy windup pencil builder pixel parcel crane pebble mayor book lantern cloud posy cactus gramo'.split(' ').forEach(k=>TALK[k]={sys:{}});eval(require('fs').readFileSync('.claude/mood/all.js','utf8'));for(const[k,v]of Object.entries(TALK))console.log(k,Object.entries(v.sys).map(([q,a])=>q+':'+a.length).join(' '))"`.
Don't edit index.html or anything in git. Report new facts you invented (for the bible's Canon log).

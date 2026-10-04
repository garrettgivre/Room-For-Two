# Brief: residents talking to each other

On the town map, residents bump into each other when they're off work and stop to chat. Walking by, the player can **listen in**,
**ignore** them or **join** the conversation. Garrett wants it to feel like old-school Animal Crossing: some neighbours adore each
other, most are indifferent, and a few are **mean** (snooty, cranky, petty, cutting), some only to certain people, some only in weather
they hate. Relationships must stay consistent: who likes whom is fixed in data and every line you write must agree with it.

Read first:
- `.claude/rchat/rel.js`: **the relationship data, canon.** `RTYPE` personality per resident (old Animal Crossing types: normal, peppy,
  lazy, jock, cranky, snooty, smug, sisterly), `RWX` weather each one loves or hates, `RREL_SRC` how each feels about the other
  (-2 can't stand them, -1 irritated, 0 indifferent, 1 friendly, 2 close; it can differ each way) with a tag and the reason,
  `RREL_WX` feelings that change with the weather. Pairs not listed get personality defaults (`RTYPE_DEF`) and housemates/workmates
  are at least friendly. Run `node -e "const R=require('./.claude/rchat/rel.js');console.log(R.rBase('cactus','cloud'),R.rBase('cloud','cactus'))"`
  from the repo root to check any pair (housemate/workmate bumps don't show in node; see the bible's households and shops).
- `tools/writing/GAME_BIBLE.md`: canon (voices, households, jobs, pronouns, facts). Chapter 1's writing rules apply, **except** the
  old "no real conflict, gossip is always fond" rule: Garrett has now asked for mean villagers. Mean means Animal Crossing mean: snide
  remarks, eye-rolls, backhanded compliments, pointed silences, petty grudges, "I'm not talking to you". Never cruel about bodies, never
  threats, never slurs, nothing a kid's game wouldn't have. The mean ones still have a soft spot (usually for one person).
- Your residents' sheets: `tools/writing/townsfolk/<key>.md`, shopkeepers in `tools/writing/keepers-bible.md`; their existing dialogue
  `.claude/talk/<key>.js` (format: `tools/dev/town/TALK_BRIEF.md`). Voices must match. Don't repeat existing lines.

## How the game uses your lines
A chat between A and B is either a **pair scene** (written for that pair, used when one exists) or **built from the two voice kits**:
A greets B (`hi`, by how A feels about B), B replies (`re`, by how B feels about A), then one or two exchanges of small talk / gossip about
a third resident / the weather, each answered with `back`, then goodbyes (`bye`). So every kit line must work with *anyone* at that
feeling level: use `{o}` for the other resident's name, `{c}` for a third resident in `about` lines. Don't name specific people in kit
lines (that's what pair scenes are for), and don't assume what the other just said in `back` lines (they follow anything).

If the player joins: A pulls them in (`join`, by A's feeling for B), the player picks "side with A", "side with B" or "change the
subject", and each resident reacts (`won` if you sided with them, `lost` if you sided with the other, `peace` for the subject change).
If they spot the player listening at the end: `caught.warm` (they don't mind) or `caught.cold` (they do; mean ones are snippy). People
who can't stand each other sometimes just walk past with one line (`snub`).

Placeholders: `{o}` the other resident, `{c}` a third resident, `{n}` the pet's name, `{a}`/`{b}` its heads, `{me}` the player.
Lines under 150 characters, the player's choices under 45. No emoji, no AI tics (no "it's not X, it's Y", no "honestly," openers,
no em-dash pileups, no aphorisms, no lists of three). Write like a person, in their voice. Read it aloud.

## Output: one file per group, `C:/Users/Garrett/Documents/Room-For-Two/.claude/rchat/<group>.js`
Exactly these statements (RCHAT exists already):
```js
RCHAT.v.<key>={   // one voice kit per resident in your group; arrays by feeling [-2,-1,0,1,2] = index 0..4
  hi:[[..],[..],[..],[..],[..]],     // 3+ per level: greeting {o}
  re:[[..],[..],[..],[..],[..]],     // 3+ per level: answering {o}'s greeting
  small:[[..],[..],[..],[..],[..]],  // 4+ per level: small talk to {o}; at -2/-1 jabs and backhanded remarks, at 1/2 warmth and in-jokes
  back:[[..],[..],[..],[..],[..]],   // 4+ per level: a reaction that follows anything {o} says
  about:[[..],[..],[..],[..],[..]],  // 3+ per level: gossip about {c}, by how THEY feel about {c}
  bye:[[..],[..],[..],[..],[..]],    // 3+ per level
  wx:{rain:[..], sun:[..], other:[..]},  // 3+ for each weather in their RWX (love or hate; keys sun cloud rain storm snow fog wind hot cold) + 3 'other' that don't name the weather
  snub:[..],                         // 3+: walking past someone they can't stand
  join:[[..],[..],[..],[..],[..]],   // 2+ per level: pulling the player in about {o}, e.g. "{me}, tell {o} they're wrong about..."
  won:[..], lost:[..], peace:[..],   // 3+ each
  caught:{warm:[..], cold:[..]}      // 3+ each: noticing you and {n} listening in
};
RCHAT.p['<a>|<b>']=[ /* keys sorted alphabetically, e.g. 'cactus|cloud' */
  {l:[['cactus','line'],['cloud','line'],['cactus','line'] /* 3-7 lines */],
   w:'rain',          // optional: only in this weather (a key from the weather list)
   j:{by:'cactus', t:'line pulling the player in', r:[['you say','cactus', [['cactus','reply'],['cloud','reply']]],
                                                   ['you say','cloud', [[...]]], ['you say',0, [[...]]] ]}}  // 'a key' = you sided with them, 0 = neutral
];
```
For each pair assigned to you below write **3 scenes** (4 for -2 feuds and couples), at least two with a `j` block, and one weather
scene where either of them has a weather mood. Scenes should show the relationship and its reason (the note in `RREL_SRC`) without
explaining it, and can mention shared history from the bible. Asymmetric feelings should show (Boing cheerful at Prickles, Prickles
fuming). Mean scenes need a real sting and a laugh. Fond rivalries bicker warmly. Close pairs have in-jokes. Couples are quietly sweet.

## Check
`node -e "global.RCHAT={v:{},p:{}};const f=require('fs');eval(f.readFileSync('.claude/rchat/<group>.js','utf8'));for(const[k,v]of Object.entries(RCHAT.v))console.log(k,['hi','re','small','back','about','bye','join'].map(x=>v[x].map(a=>a.length).join('')).join(' '),Object.keys(v.wx));console.log(Object.keys(RCHAT.p).length,'pairs',Object.values(RCHAT.p).reduce((a,s)=>a+s.length,0),'scenes')"`
Every level array must have 5 entries. Speaker keys in scenes must be the pair's two keys. Don't edit index.html or anything in git.
No browser needed. Report: residents and pairs done, counts, new facts you invented (they go into the bible's Canon log).

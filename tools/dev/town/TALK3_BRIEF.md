# Brief: conversations that grow with the friendship

When you chat with a resident in Room for Two (on the town map, and in their shop or house), they should talk differently
depending on **how close you are**: a polite new face at first, then a regular, a friend, a good friend, a best friend. And they
should notice **how long they've known you and the pet** and **how much you've talked**: the first meeting, the first week, a
month, a season, a year; ten chats, fifty, a hundred.

Read first: `tools/writing/GAME_BIBLE.md` (canon: voices, relationships, pronouns, households, established facts; it wins), the
existing dialogue for your residents (`.claude/talk/<key>.js` and `.claude/talk2/<key>.js`, format in
`tools/dev/town/TALK_BRIEF.md`), their sheets (`tools/writing/townsfolk/<key>.md`, shopkeepers in `tools/writing/keepers-bible.md`).
Don't repeat existing lines. Keep every fact consistent with the bible; if you invent a new fact, list it in your report so it can
be added to the bible's Canon log.

Friendship levels (the game's `KF_N`): **0 New face**, **1 Regular**, **2 Friend**, **3 Good friend**, **4 Bestie**.
How each level should feel (adapt to each character: a shy one opens up slowly, a gushing one is warm from the start but gets
more honest, a grumpy one gets drier and fonder):
- 0: polite, a little formal or shy; introduces themself and their job; asks your name or the pet's; small talk.
- 1: recognises you; remembers the pet's name; light jokes; their routines; mild opinions.
- 2: easy and warm; teasing; stories about housemates and neighbours; small worries; asks how the two of you are.
- 3: personal; hopes, fears, memories; asks your advice; inside jokes start; compliments that mean something.
- 4: best friends; nicknames for you or the pet; finishing each other's routines; the most honest and the most silly; gratitude.

## Output
One file per resident: `C:/Users/Garrett/Documents/Room-For-Two/.claude/talk3/<key>.js`, exactly one statement:
```js
Object.assign(TALK.<key>,{
  lv:{ // by friendship level 0-4
    hi:[[ /*0*/ ],[ /*1*/ ],[ /*2*/ ],[ /*3*/ ],[ /*4*/ ]],      // 4+ openers per level (strings or nodes)
    topics:[[ ],[ ],[ ],[ ],[ ]],                                  // 6+ conversation nodes per level, most with replies, some 2-3 deep
    bye:[[ ],[ ],[ ],[ ],[ ]]                                      // 3+ goodbyes per level
  },
  mile:{ // said once, the first chat after each milestone; nodes welcome (warm, specific, in voice)
    met:[], week:[], month:[], season:[], year:[],                // time since you first met: first meeting, 7 days, 30, 90, 365
    talk10:[], talk50:[], talk100:[]                               // number of chats you've had
  },
  nick:'<what they call the player at Bestie, e.g. "sweet pea">'     // optional
});
```
Each `mile` entry: 2 alternatives. Nodes: `{t:'they say', r:[['you say','they answer (string or node)', 1 if especially kind]]}`,
2-3 choices, your side under 45 characters, their lines under 170. Placeholders: `{n}` pet, `{a}`/`{b}` heads, `{me}` the
player's name if set. Aim for ~170-220 of their lines per resident. No emoji, no AI tics (no "it's not X, it's Y", no
"honestly," openers, no em-dash pileups). Never romance with the player; cozy, warm, funny, specific.

## Check
`node -e "global.TALK={};const f=require('fs');eval(f.readFileSync('.claude/talk/<key>.js','utf8'));eval(f.readFileSync('.claude/talk3/<key>.js','utf8'));const T=TALK.<key>;console.log(T.lv.hi.map(a=>a.length),T.lv.topics.map(a=>a.length),T.lv.bye.map(a=>a.length),Object.keys(T.mile).length)"`
must show 5 levels in each and 8 milestone keys. Do not edit index.html or anything tracked in git. No browser needed.
Report: residents done, counts, new facts invented.

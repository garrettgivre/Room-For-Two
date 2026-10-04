# Brief: conversations for the residents of Room for Two

Room for Two is a cozy shared virtual-pet game for two people (Garrett and his boyfriend Beau) and their two-headed jelly pet.
The town has 32 residents. When you meet one walking around the town map, the camera closes in on your pet and them, and you have
a real conversation: they say something, you pick a reply from 2-3 choices, they answer, sometimes that leads somewhere further.
Your job: write that conversation content for your residents, a lot of it, in each one's own voice.

Read first: `C:/Users/Garrett/Documents/Room-For-Two/CLAUDE.md` ("Start here", "The user's preferences"), the character bible
`tools/writing/keepers-bible.md`, and for each of your residents their sheet `tools/writing/townsfolk/<key>.md` (the nine
shopkeepers are in the bible). Also read their existing lines in index.html: search `"<key>": {"n":` inside `Object.assign(KBIB,`
or the KBIB block (keys baker, stylist, toymaker, cushion, builder, hair, makeup, tailor, joy are near `const KBIB`), so you
don't repeat them and you match the voice. `const RESIDENTS=` lists everyone (key, name, job, schedule); `const HOUSES=` who lives
with whom; `const LIKES=` what they love.

## Output
One file per resident: `C:/Users/Garrett/Documents/Room-For-Two/.claude/talk/<key>.js` containing exactly one statement:
```js
TALK.<key>={
  busy:[ /* 6+ short brush-offs when they don't feel like talking: rushing to work, mid-errand, tired, in a mood. Kind, in voice. */ ],
  out:[ /* 8+ openers when you bump into them in town: what they're up to outdoors, the weather, the street. Strings or nodes. */ ],
  topics:[ /* 14+ conversation nodes (see below), each a little scene with choices. Mix: their job, their home and housemates,
              their past, opinions, small worries, jokes, the pet, the two of you, other residents, seasons and weather, food. */ ],
  ask:[ /* 6+ nodes where THEY ask YOU something (a favourite, an opinion, advice), with 2-3 answers they react to */ ],
  gossip:[ /* 8+ lines about other residents by name, affectionate, never cruel; strings */ ],
  deep:[ /* 5 nodes only shared with good friends: something personal, a hope, a memory. Earned, warm. */ ],
  bye:[ /* 6+ goodbyes */ ]
};
```
A **node** is either a string (they just say it) or `{t:'what they say', r:[['what you say','their answer (string or another node)', 1], ...]}`.
- `r` choices: 2-3 per node. Each choice is `[your words, their reply, friendship]` where friendship is 0 (default, omit) or 1 when
  the choice is especially kind or right for them. Never punish a choice: every reply is gracious, but they can react differently
  (delighted, amused, thoughtful, teasing).
- Nest up to 3 levels deep in some topics so conversations really branch. At least a third of topics should have a second level.
- Your-side choices are short (under 45 characters), natural, varied in tone (warm, curious, cheeky), and written as the player
  talking (the two of them share a pet; you can say "we" or "I").
- Placeholders allowed: `{n}` the pet's name, `{a}` and `{b}` the pet's two heads' names, `{me}` the player's name. Use `{n}` often
  in pet topics.
- Length: lines under 170 characters. Aim for 120-180 lines per resident in total.

## Voice and rules
- Each resident must sound unmistakably like themself (vocabulary, rhythm, quirks from their sheet: Cobble's "Mm.", Bobbin's
  "and also", Pixel's flat scores, Mayor Marsh's "Ahem", Nimbus's forecasts, Cushy's trailing "mm..."). Keep their relationships
  consistent with the bible (roommates, partners, Tutti's niece and nephew, who's friends with whom).
- Cozy, warm, funny, specific. Concrete details beat generalities. No meanness, no romance with the player, nothing scary.
- Avoid AI-writing tics: no "it's not X, it's Y", no "honestly," openers, no em-dash pileups, no "a testament to", no "little did",
  no listing things in threes by reflex. Write like a person.
- No emoji. Plain apostrophes are fine; use double quotes for JS strings containing apostrophes, or escape them.

## Check before reporting
Run `node -e "global.TALK={};eval(require('fs').readFileSync('<file>','utf8'));const T=TALK.<key>;console.log(Object.keys(T).map(k=>k+':'+T[k].length).join(' '))"`
for each file: it must parse and have every section with the minimum counts. Report: residents done, counts, anything you weren't sure of.
Do not edit index.html or anything tracked in git.

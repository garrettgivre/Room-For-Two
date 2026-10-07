# Brief: the social system (v141): enemies, nemeses, insults, gossip and making up

A message from Garrett and Beau to you: thank you. These lines define the heart of the characters, so this is important work.
Beau loves shady insults; they both wish Animal Crossing villagers could be meaner. So: **go meaner than Nintendo would.**
Cutting, petty, shady, savage, backhanded, grudge-holding. In-universe only: no slurs, nothing about real-world groups, bodies or real
people, no threats of harm. The comedy is in each character's own voice and pettiness.

## Read first (the bible is canon, and you must keep it consistent)
- `tools/writing/GAME_BIBLE.md`: Tone (read the new "social system (v141)" rule), Writing rules, Pronoun table, chapter 4 (each of
  your residents: voice, tics, job, passions, facts), Households, Couples, Family, chapter 5 "How residents feel about each other"
  (personality types, who likes/dislikes whom and why), and the Canon log at the end.
- Each resident's sheet `tools/writing/townsfolk/<key>.md` (or `tools/writing/keepers-bible.md` for the eight shopkeepers).
- A sample of their existing lines in `index.html` (search `TALK.<key>=` / `TALK.<key>.` and `RCHAT.v.<key>`) so the voice matches.
- The data: `RTYPE` (personality per resident) and `RREL_SRC` (the written relationships) in index.html.
Never contradict the bible. Anything new you invent (a grudge's origin, a secret, a nickname, an old incident) goes in your report as a
Canon log entry, and must not clash with existing facts.

## What the game now does
- **Standing** with each resident runs -100..+100, shared by the two players. Tiers: `bestie` (81+), `close` (61..80), `good`
  (41..60), `friend` (21..40), `acq` (1..20), `neutral` (0, met), `cool` (-1..-20), `sour` (-21..-40), `rival` (-41..-60), `enemy`
  (-61..-80), `nemesis` (-81..-100). Residents speak to the players as one "you" (the two of you, you two). **Never use `{me}`** in
  these lines and never name either player.
- **Social moves** in conversations: compliment, tell a joke, ask about their day, tease, insult, brush them off, mock their thing (their
  job or passion), apologise. Outcome depends on personality, standing and mood: a move "lands" (`up`) or "flops/hurts" (`down`).
- **Snipes**: short unkind replies the player can pick after almost any line.
- **The web**: residents hear what you did to others and react by how they feel about that person (a mean type who dislikes your
  victim loves it). Residents' feelings about each other move too: they argue on the street, fall out, make up. Couples and housemates
  can fall out as well (write lines that work for where they stand now).
- **Big swings**: one huge gesture (the perfect birthday gift, a heartfelt apology) or one line crossed (insulting them at their own
  party) jumps standing several tiers.

## Per resident: write one statement in this exact shape (3 lines where an array shows [3], etc.; lines under 150 characters,
player lines (`you`) under 60)
```js
SOC.r.<key>={
  t:{ // greetings (hi), goodbyes (bye) and, on the bad side, brush-offs when you try to chat (brush) for each standing
    bestie:{hi:[3],bye:[2]}, close:{hi:[3],bye:[2]}, good:{hi:[3],bye:[2]}, friend:{hi:[3],bye:[2]}, acq:{hi:[3],bye:[2]},
    neutral:{hi:[3],bye:[2]},   // met, but nothing either way (can be after a long history that cooled off)
    cool:{hi:[3],bye:[2],brush:[2]}, sour:{hi:[3],bye:[2],brush:[3]}, rival:{hi:[3],bye:[2],brush:[3]},
    enemy:{hi:[3],bye:[2],brush:[3]}, nemesis:{hi:[4],bye:[3],brush:[3]}},
  m:{ // social moves: what the player says (you), reaction when it lands (up) / flops or hurts (down)
    compliment:{you:[3],up:[3],down:[3]},   // down = suspicious, unimpressed, "what do you want?"
    joke:{you:[3],up:[3],down:[3]},          // you = a joke the player tells THIS resident (tailored, silly, short)
    ask:{you:[2],up:[3],down:[2]},           // asking about their day
    tease:{you:[3],up:[3],down:[3]},         // up = they enjoy the banter (fits jocks, cranky friends, sisterly); down = offended
    insult:{you:[4],up:[2],down:[4]},        // you = really cutting, aimed at them specifically; up = only for types who relish a scrap
    brush:{you:[3],down:[3]},                // brushing them off mid-chat
    mock:{you:[3],down:[3]},                 // mocking their job or passion specifically (their buns, their weather charts...)
    apologise:{you:[2],yes:[3],no:[3],grudge:[2]}}, // forgiven / refused / forgiven but they won't forget
  snipe:{you:[6],down:[4],up:[2]},           // short rude replies that fit after nearly any line ("Riveting.", "Did I ask?"), in the
                                              // player's plain voice but aimed at this resident's habits; reactions
  hear:{meanFoe:[3],meanFriend:[3],kindFoe:[2],kindFriend:[2]}, // {o} = the resident you were mean or kind to; Foe = someone they dislike
  cold:[2],                                   // cooler with you because you're close to someone they dislike ({o})
  op:{best:[2],pos:[3],neg:[3],nem:[3]},     // their opinion of another resident {o} at that level (best friends / likes / dislikes / nemesis)
  about:{<otherKey>:{pos:[1-2],neg:[1-2]}},  // specific lines about each resident they have a written relationship with in chapter 5:
                                              // pos = said while they get on, neg = said while they've fallen out (even if canon is warm)
  fight:{open:[3],jab:[4],retort:[4],storm:[2]}, // street argument kit with {o}: opening shot, jabs, comebacks, storming off
  mend:{offer:[2],accept:[2],refuse:[2]},    // making up with {o}
  note:{enemy:[2],nemesis:[3]},              // letters they send the players when they're Enemies / Nemeses (signed in their style)
  swing:{up:[2],down:[2]},                   // big moment: a huge gesture won them over / you crossed a line
  gos:[{t:'',a:'',b:'',s:''}]                // 5+ lines of gossip about OTHER pairs of residents (names spelled out in t, not {o});
                                              // a, b = the two residents' keys, s = 'best'|'pos'|'neg'|'nem' (what the line reveals about how
                                              // a feels about b). Only shown while it's true, so it's fine to write lines about feuds that
                                              // don't exist yet ("Fizz and Blush? Not since the festival.") as long as they fit the characters.
};
```
Placeholders: `{n}` the pet, `{a}`/`{b}` its heads, `{o}` the other resident's name (only where noted). Use each resident's pronouns
from the bible for anyone you mention. Names, never keys (Sketch, never Pencil). No emoji. Banned tics: "it's not X, it's Y",
"Honestly?" openers, aphorisms, stacked one-word fragments, em-dash pileups, reflexive lists of three. Every tier must sound different:
a Bestie's goodbye and a Nemesis's goodbye should be worlds apart, and each resident must be recognisable with the name hidden.
Kind types can still be devastating when hurt (quietly), mean types are mean with style. Everyone stays themselves.

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/soc/<group>.js` with one `SOC.r.<key>={...};` per resident in your group.
Check it parses and counts:
`node -e "global.SOC={r:{}};eval(require('fs').readFileSync('.claude/soc/<group>.js','utf8'));for(const[k,v]of Object.entries(SOC.r))console.log(k,Object.keys(v.t).length,Object.keys(v.m).length,(v.gos||[]).length)"`
Each resident should show 11 tiers and 8 moves. Write residents one at a time and append, so partial work survives.
Don't edit index.html or anything tracked by git (except nothing: report only). Keep any screenshots or scratch files out of the repo.
Your final message is the report: which residents are done, and the Canon log entries you invented (one bullet each, with the key).

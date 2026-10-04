# Brief: weather, time-of-day and holiday conversations

Room for Two's residents already have conversations (`.claude/talk/<key>.js`, `TALK.<key>={busy,out,topics,ask,gossip,deep,bye}`;
format and voice rules in `tools/dev/town/TALK_BRIEF.md`: read it first, and read the resident's existing TALK file so you keep
the voice and don't repeat). The game now knows the **real local weather** where the players live and the **time of day**, and
the town has **holidays** (`tools/writing/holidays.md`: read it in full). Your job: add conversations that react to those.

Read: TALK_BRIEF.md, holidays.md, the bible `tools/writing/keepers-bible.md`, each resident's sheet `tools/writing/townsfolk/<key>.md`
(shopkeepers are in the bible) and their `.claude/talk/<key>.js`.

**Pronouns:** a character's own sheet wins; if it doesn't say, use they/them for that character. When unsure about someone else,
use their name.

## Output
One file per resident: `C:/Users/Garrett/Documents/Room-For-Two/.claude/talk2/<key>.js` containing exactly one statement:
```js
Object.assign(TALK.<key>,{
  wx:{ // openers for the current weather; 3+ each; strings or nodes (nodes with replies welcome, at least one per kind)
    sun:[], cloud:[], rain:[], storm:[], snow:[], fog:[], wind:[], hot:[], cold:[] },
  tod:{ // openers for the time of day (US Central): m 5-11, d 11-17, e 17-22, n 22-5; 3+ each
    m:[], d:[], e:[], n:[] },
  hol:{ // for each holiday key in holidays.md (jar, shadow, twoheart, sprout, topsy, puddle, longlight, bubblework, lostfound,
        // firstbrick, tooldown, swapface, longtable, quilt, wrap, roomday): 2-3 lines or nodes about how THEY keep that day,
        // their own traditions and feelings about it, what they're bringing or doing. Hosts get 4-5 and at least one node.
    jar:[], shadow:[], ... },
  fest:{ spring:[], summer:[], spooky:[], lights:[] } // 2-3 each for the four festival weeks
});
```
- Weather lines should feel like weather is happening to them: what they're wearing, doing, worrying about, enjoying. Match their
  personality (Nimbus has opinions about every forecast; Cobble likes rain on stone; Lumi hates wind; Loofah loves steam...).
- `hot` and `cold` are temperature moods (above ~85°F, below ~35°F) and can combine with any sky.
- `roomday` is the players' own anniversary: residents congratulate the two of you warmly (they know it from the pet).
- Holidays inside festivals (topsy in Spring Picnic, bubblework in Summer Fair, swapface in Pumpkin Parade, quilt and wrap in
  Festival of Lights) should mention the festival week naturally.
- Lines under 170 characters, choices under 45, no emoji, no AI tics (see TALK_BRIEF.md). Placeholders {n} {a} {b} {me} allowed.

## Check
`node -e "global.TALK={};eval(require('fs').readFileSync('.claude/talk/<key>.js','utf8'));eval(require('fs').readFileSync('.claude/talk2/<key>.js','utf8'));const T=TALK.<key>;console.log(Object.keys(T.wx).length,Object.keys(T.tod).length,Object.keys(T.hol).length,Object.keys(T.fest).length)"`
must print `9 4 16 4` for every file. Report: residents done, anything unsure. Do not edit index.html or anything tracked in git.

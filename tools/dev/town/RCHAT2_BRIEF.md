# Brief: more life in town (round two)

Two jobs for your group of residents, in one file.

Read first, as in round one (`tools/dev/town/RCHAT_BRIEF.md`, which explains the resident-to-resident scene format and the tone):
- `tools/writing/GAME_BIBLE.md` (canon; chapter 5 "How residents feel about each other" is fixed data, and the Canon log has the
  newest facts, including "Neighbours talking (v80)" and "Money and town dailies (v83)").
- `.claude/rchat/rel.js` (personalities, weather moods, feelings), your residents' sheets (`tools/writing/townsfolk/<key>.md`,
  shopkeepers in `tools/writing/keepers-bible.md`), their existing lines (`.claude/talk/<key>.js`, `.claude/rchat/<group>.js`). Match the
  voices exactly and don't repeat existing lines.

## 1. Pair scenes for neighbours who don't have any yet
The list under your group in `.claude/rchat/pairs2.md`: pairs who mostly don't feel strongly about each other (feeling 0), plus a few
mild irritations (-1) and workmates or housemates (1). Write **2 scenes per pair** (3-5 lines each). Indifferent doesn't mean dull:
small talk with character, two people who barely know each other, polite awkwardness, a shared complaint about the weather or a third
resident, a misunderstanding, one of them trying to be friendly. At least one of the two scenes should touch something concrete in
town: an event, the Sunday market, the boardwalk, a shop, a holiday coming up, the well, the Mayor's speeches, Prickles' jokes. The
-1 pairs should have a little edge. Optional `w` (weather) on one scene if either has a weather mood. Same format as round one:
`RCHAT.p['a|b']=[{l:[['a','line'],['b','line'],...]}, ...]` (keys sorted). No `j` blocks needed this time (you may add one if it's good).

## 2. Lines about the new town things, and event days
For each resident in your group, add:
```js
Object.assign(TALK.<key>,{
  sys:{ // said to the player as an opener when it fits (3+ lines each, in their voice; {n} pet, {me} player)
    treasure:[], // you've been finding treasures on the boardwalk (shells, sea glass, the odd bottle); what do they make of it
    well:[],     // you made a wish at the wishing well recently
    parcel:[],   // early in the month: the Mayor's monthly parcel and letter just went out to everyone
    basket:[],   // Bunbun's day-old basket at the Snack Shack (one free bake a day)
    joke:[],     // Prickles hears one joke a day and rates it, harshly (Prickles' own lines: about being told jokes)
    mystery:[],  // Blush tries a free mystery colour on the pet once a day (said when they notice the pet's colours)
    arcade:[],   // tickets, the prize counter at Jelly Arcade
    money:[]     // buttons (everyday money) and glimmers (rare and special); a remark, a habit, an opinion
  },
  ev:{ // said on the day of each weekly event, before or during it (2+ lines each): who's going, what they'll bring, opinions
    tea:[],      // Sunday tea at Bunbun's (Sun 15-17)
    story:[],    // Story hour at the library with Dewey (Wed 16-18)
    meeting:[],  // Town meeting at the Town Hall (Mon 17-19)
    stars:[],    // Stargazing at the weather station with Nimbus (Tue 20-22)
    music:[],    // Music night at Echo's (Thu)
    games:[],    // Game Night at Boing and Joy's (Fri)
    market:[],   // the Mayor's Saturday bake sale for the town fund
    sunmkt:[]    // the Sunday market stalls (9-13)
  }
});
```
Hosts talk about hosting; people who'd hate an event can say so (Prickles at Game Night, Dewey at music night). Keep relationships
consistent with the data. Lines under 150 characters. No emoji, no AI tics (no "it's not X, it's Y", no "honestly," openers, no
em-dash pileups, no aphorisms, no lists of three).

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/rchat2/<group>.js`: the `RCHAT.p[...]` assignments, then one `Object.assign(TALK.<key>,...)`
per resident. Check: `node -e "global.RCHAT={v:{},p:{}};global.TALK={};const f=require('fs');['baker','jam','cushion','dust','cone','scone','crumb','patch','stylist','sponge','tailor','hair','makeup','polish','spool','beacon','toymaker','joy','windup','pencil','builder','pixel','parcel','crane','pebble','mayor','book','lantern','cloud','posy','cactus','gramo'].forEach(k=>TALK[k]={});eval(f.readFileSync('.claude/rchat2/<group>.js','utf8'));console.log(Object.keys(RCHAT.p).length,'pairs',Object.values(RCHAT.p).reduce((a,s)=>a+s.length,0),'scenes');for(const[k,v]of Object.entries(TALK))if(v.sys)console.log(k,Object.keys(v.sys).length,Object.keys(v.ev).length)"`.
Every pair in your list covered, speaker keys must be the pair's keys. Don't edit index.html or anything in git. No browser needed.
Report counts and any new facts you invented (for the bible's Canon log).

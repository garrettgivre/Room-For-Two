# Brief: residents talk about the newest things in town

Same as round two's `sys` lines (see `tools/dev/town/RCHAT2_BRIEF.md`, part 2): openers a resident says to the player when it fits. Read the
bible (`tools/writing/GAME_BIBLE.md`, including the Canon log sections "Money and town dailies", "Residents remember", "Moments together and
designs"), your residents' sheets, and their existing lines (`.claude/talk/<key>.js`, `.claude/rchat2/<group>.js`, `.claude/mem/<group>.js`).
Match voices exactly; don't repeat lines; keep relationships consistent with chapter 5.

## New things (3+ lines each, for each resident)
- `bugs`: bug catching around town (butterflies, bees, beetles, fireflies; Posy loves bugs and buys them).
- `museum`: the Little Museum in town, where Dewey catalogues one of each fish, bug and find people donate.
- `project`: the Mayor's town projects that the two of you fund with buttons (the first is a Ferris wheel; then a train halt, a treehouse,
  an observatory, a school house, an outdoor stage, a bouncy castle, a community garden). Opinions welcome; the Mayor is thrilled.
- `designs`: the player's own pixel designs (floors, wallpapers, framed pictures, even patterns on the pet at Blush's).
- `season`: the season changing in town right now (it's autumn: leaves turning, pumpkins and scarecrows, cider; say something that would
  still be true in any autumn week, not tied to a date).
- `fishing`: fishing at the ponds, streams and the new dock by the boardwalk (Beacon buys fish).

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/sys2/<group>.js`: one `Object.assign(TALK.<key>.sys,{bugs:[...],museum:[...],project:[...],
designs:[...],season:[...],fishing:[...]});` per resident (TALK[key].sys already exists). Lines under 150 characters; {n} pet, {me} player.
No emoji, no AI tics (no "it's not X, it's Y", no "honestly," openers, no em-dash pileups, no aphorisms, no lists of three).
Check: `node -e "global.TALK={};['baker','jam','cushion','dust','cone','scone','crumb','patch','stylist','sponge','tailor','hair','makeup','polish','spool','beacon','toymaker','joy','windup','pencil','builder','pixel','parcel','crane','pebble','mayor','book','lantern','cloud','posy','cactus','gramo'].forEach(k=>TALK[k]={sys:{}});eval(require('fs').readFileSync('.claude/sys2/<group>.js','utf8'));for(const[k,v]of Object.entries(TALK))if(v.sys.bugs)console.log(k,Object.entries(v.sys).map(([q,a])=>q+':'+a.length).join(' '))"`
Don't edit index.html or anything in git. Report counts and any new facts you invented.

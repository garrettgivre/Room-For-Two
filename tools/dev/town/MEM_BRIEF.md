# Brief: residents remember what you did

When you chat with a resident on the town map, they should sometimes bring up something the two of you did with them recently. The
game tracks the events; you write how each resident brings each one up, in their voice, once, a day or a few days later.

Read first: `tools/writing/GAME_BIBLE.md` (canon; chapter 5 "How residents feel about each other" is fixed data, and the Canon log),
your residents' sheets (`tools/writing/townsfolk/<key>.md`, shopkeepers in `tools/writing/keepers-bible.md`) and their existing lines
(`.claude/talk/<key>.js`, `.claude/rchat/<group>.js`, `.claude/rchat2/<group>.js`). Match voices exactly; don't repeat lines.

## The memories (write 3+ lines for each, for each resident)
- `gift_love`: you gave them something they loved (`{g}` = the gift's name, lowercase). Still delighted, a detail of how they used it.
- `gift_like`: something they liked (`{g}`). Pleasant, a little remark.
- `gift_meh`: something that wasn't really their thing (`{g}`). Polite, or for the mean ones, a little pointed. Never cruel.
- `sided`: you took their side when they were arguing with `{o}` (another resident's name). Grateful, smug, or conspiratorial.
- `against`: you took `{o}`'s side against them. Hurt, huffy, teasing, or gracious, depending on who they are and how they feel about {o}.
- `visit`: you came to their house. Something about having you over.
- `room`: you designed a room in their house for them (the makeover). How they're using it now.
- `fish`: you caught a fish (`{f}` = its name, lowercase) recently and they heard about it. Prickles and Beacon might care a lot.
- `joke`: Prickles rated a joke you told him (`{s}` = the score out of ten). Everyone has heard about it; Prickles' own lines are his
  review of it.
- `photo`: someone saw you taking photos around town.

Placeholders: `{n}` pet, `{a}`/`{b}` heads, `{me}` player, plus the ones above. Lines under 150 characters. No emoji, no AI tics (no
"it's not X, it's Y", no "honestly," openers, no em-dash pileups, no aphorisms, no lists of three). Keep relationships consistent.

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/mem/<group>.js`, one `Object.assign(TALK.<key>,{mem:{gift_love:[...],gift_like:[...],
gift_meh:[...],sided:[...],against:[...],visit:[...],room:[...],fish:[...],joke:[...],photo:[...]}});` per resident.
Check: `node -e "global.TALK={};['baker','jam','cushion','dust','cone','scone','crumb','patch','stylist','sponge','tailor','hair','makeup','polish','spool','beacon','toymaker','joy','windup','pencil','builder','pixel','parcel','crane','pebble','mayor','book','lantern','cloud','posy','cactus','gramo'].forEach(k=>TALK[k]={});eval(require('fs').readFileSync('.claude/mem/<group>.js','utf8'));for(const[k,v]of Object.entries(TALK))if(v.mem)console.log(k,Object.entries(v.mem).map(([q,a])=>q+':'+a.length).join(' '))"`.
Don't edit index.html or anything in git. Report counts and any new facts you invented.

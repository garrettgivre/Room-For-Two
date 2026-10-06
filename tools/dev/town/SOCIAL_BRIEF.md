# Brief: neighbours' lives (birthday parties, visiting each other, friendships that change)

Write new dialogue for your group of residents, in their exact voices. Read first: `tools/writing/GAME_BIBLE.md` (voices, pronouns,
chapter 5 "How residents feel about each other", households, the Canon log), each resident's sheet `tools/writing/townsfolk/<key>.md`
(or the keepers' bible `tools/writing/keepers-bible.md` for the eight shopkeepers), and their existing lines (`.claude/talk/<key>.js`,
`.claude/rchat2/<group>.js`, `.claude/season/<group>.js`). Keep relationships consistent with chapter 5: friends are warm, rivals
needle, people who can't stand each other stay polite at best.

## What the game now does
- **Birthday parties**: on a resident's birthday there's a party at their house in the evening; their friends come. The player can drop in.
- **Visiting**: off duty, residents sometimes spend an hour or two at a friend's house. The player may find them there.
- **Friendships shift**: week to week two residents can get a bit closer or drift a bit apart. Residents mention it.

## Lines to write (per resident, 3+ lines each unless noted, under 150 characters)
- `party_host`: what they say to the player at their own birthday party.
- `party_guest`: what they say at someone else's party. Use `{o}` for the host's name.
- `visit_guest`: said when the player finds them visiting a friend's house. `{o}` = the friend whose house it is.
- `visit_host`: said in their own house while a friend is visiting. `{o}` = the visiting friend.
- `closer`: they've been getting on better with someone lately. `{o}` = that resident. (2+ lines)
- `apart`: they've drifted from someone lately; gentle, never cruel, no fights. `{o}` = that resident. (2+ lines)
Placeholders: `{o}` other resident's name, `{n}` the pet, `{me}` the player. No emoji, no AI tics (no "it's not X, it's Y", no
"honestly," openers, no em-dash pileups, no aphorisms, no lists of three).

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/social/<group>.js`: one `Object.assign(TALK.<key>.sys,{party_host:[...],party_guest:[...],
visit_guest:[...],visit_host:[...],closer:[...],apart:[...]});` per resident (TALK[key].sys already exists).
Check: `node -e "global.TALK={};['baker','jam','cushion','dust','cone','scone','crumb','patch','stylist','sponge','tailor','hair','makeup','polish','spool','beacon','toymaker','joy','windup','pencil','builder','pixel','parcel','crane','pebble','mayor','book','lantern','cloud','posy','cactus','gramo'].forEach(k=>TALK[k]={sys:{}});eval(require('fs').readFileSync('.claude/social/<group>.js','utf8'));for(const[k,v]of Object.entries(TALK))if(v.sys.party_host)console.log(k,Object.entries(v.sys).map(([q,a])=>q+':'+a.length).join(' '))"`.
Don't edit index.html or anything in git. Add any new fact you invent to your report (I'll put it in the bible's Canon log).

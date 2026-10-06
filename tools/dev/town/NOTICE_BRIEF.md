# Brief: neighbourhood noticeboards (optional side quests)

Each neighbourhood gets a noticeboard with short, funny notes pinned by residents. Some notes are just notes (jokes, lost-and-found
gossip, announcements); others are small optional favours the player can help with. Nothing is ever required, no deadlines, no
penalties. Read the bible (`tools/writing/GAME_BIBLE.md`: residents, voices, pronouns, households, places, the Canon log) and match each
resident's voice exactly.

## Neighbourhoods and who lives there (from the game)
- `sugar` Sugarloaf Lane: baker (Bunbun), jam (Pip), cushion (Cushy), dust (Dusty), cone (Tutti), scone, crumb, patch (Dr. Patch)
- `bay` Bubble Bay: stylist (Fizz), sponge (Loofah), tailor (Stitch), hair (Pom), makeup (Blush), polish (Gloss), spool (Bobbin), beacon
- `hill` Playhouse Hill: toymaker (Boing), joy, windup (Tock), pencil (Sketch), builder (Bolt), pixel, parcel, crane (Fold), pebble (Cobble)
- `meadow` Lantern Meadow: mayor (Mayor Marsh), book (Dewey), lantern (Lumi), cloud (Nimbus), posy, cactus (Prickles), gramo (Echo)

## Notes (per neighbourhood: 6 plain notes + 8 favours)
Plain note: `{by:'<key>', t:'note text'}`.
Favour: `{by:'<key>', t:'note text', q:{...}, thanks:'what they say when you help', reward:'buttons'|'treasure'|'furniture'}` where `q` is one of
- `{k:'bring', need:'<tag>'}`: bring them something. Tags: `fish`, `bug`, `shore` (a beach find), `trail` (a trail find),
  `food:sweets|fruit|exotic|snacks|drinks|veggies|grains`, `groom` (a grooming item).
- `{k:'find', at:'<place>'}`: they lost something near a place; the player finds it there and brings it back. Places: `plaza`, `park`,
  `pond`, `library`, `townhall`, `postoffice`, `dock`, `market`, or a resident key (their house).
- `{k:'visit', to:'<key>'}`: go and say hi to / check on another resident and come back with news.
- `{k:'deliver', to:'<key>'}`: take a letter or a small parcel to another resident.
Keep notes under 160 characters, thanks under 150. `{n}` pet, `{me}` player. Lost things should be small and silly (a sock, a thimble,
a reading pebble). No emoji, no AI tics.

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/notice/all.js` defining
`const NOTICES={sugar:[...],bay:[...],hill:[...],meadow:[...]};` (each 14 entries as above). Check it with
`node -e "eval(require('fs').readFileSync('.claude/notice/all.js','utf8')+';global.N=NOTICES');for(const[h,L]of Object.entries(N))console.log(h,L.length,L.filter(x=>x.q).length+' favours')"`.
Don't edit index.html or anything in git. Report new facts you invented.

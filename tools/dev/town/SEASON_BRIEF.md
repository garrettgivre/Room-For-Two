# Brief: residents talk about the season (winter, spring, summer)

Each resident already has autumn lines (`TALK[k].sys.season`, in `.claude/sys2/<group>.js`). Write the other three seasons in the same
voice and quality. Read the bible (`tools/writing/GAME_BIBLE.md`: voices, chapter 5 relationships, the calendar and festivals, the Canon
log), your residents' sheets and existing lines (`.claude/talk/<key>.js`, `.claude/rchat2/<group>.js`, `.claude/sys2/<group>.js`).
Each line must be true on any day of its season (no specific dates or one-off events). Weather moods matter (bible chapter 5 table:
e.g. Prickles loves sun and hates cold and snow, Nimbus loves rain, Tutti hates cold, Fold hates wind and rain).
What the town looks like: winter = snow on the trees and roofs, a snowman, a little ice rink, a lit evergreen, sleds, cocoa;
spring = cherry blossom, tulips, birdhouses, egg baskets, a flowering arch, petals drifting; summer = long days, a splash fountain,
paddling pools, shaved ice, garden umbrellas, fireflies over the meadow at night.

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/season/<group>.js`: one
`Object.assign(TALK.<key>.sys,{season_winter:[...],season_spring:[...],season_summer:[...]});` per resident, 3+ lines each, under 150
characters, {n} pet, {me} player. No emoji, no AI tics (no "it's not X, it's Y", no "honestly," openers, no em-dash pileups, no aphorisms,
no lists of three). Check: `node -e "global.TALK={};['baker','jam','cushion','dust','cone','scone','crumb','patch','stylist','sponge','tailor','hair','makeup','polish','spool','beacon','toymaker','joy','windup','pencil','builder','pixel','parcel','crane','pebble','mayor','book','lantern','cloud','posy','cactus','gramo'].forEach(k=>TALK[k]={sys:{}});eval(require('fs').readFileSync('.claude/season/<group>.js','utf8'));for(const[k,v]of Object.entries(TALK))if(v.sys.season_winter)console.log(k,v.sys.season_winter.length,v.sys.season_spring.length,v.sys.season_summer.length)"`.
Don't edit index.html or anything in git. Report counts and any new facts you invented.

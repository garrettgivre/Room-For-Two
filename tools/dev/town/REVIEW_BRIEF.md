# Brief: dialogue review (find and fix problems in residents' lines)

You're reviewing the written dialogue of a cozy game, "Room for Two" (repo `C:/Users/Garrett/Documents/Room-For-Two`). Canon is
`tools/writing/GAME_BIBLE.md` (voices, pronoun table, households, relationships in chapter 5, the Canon log). Lines live in
`index.html` (about 7 MB; never read it whole, use grep/sed by line ranges): the blocks between `/* <talk> */`, `/* <res-chat> */`,
`/* <sys2> */`, `/* <season-talk> */`, `/* <social-talk> */` markers, plus `KBIB` entries. Each resident's lines are under their key
(`TALK.<key>`, `RCHAT.v.<key>`, `Object.assign(TALK.<key>.sys,...)`, pair scenes `RCHAT.p['a|b']`).

## Look for (only real problems; don't rewrite lines that are fine)
- Wrong pronouns for a resident (check the bible's pronoun table; unknown = they/them).
- A real person's name (Garrett, Beau) in a line: players are always `{me}`; the pet is `{n}`, its heads `{a}`/`{b}`.
- Broken or unknown placeholders (anything other than {n} {a} {b} {me} {o} {g} {f} {s} where that block uses them).
- Contradictions with the bible (who lives where, jobs, relationships, birthdays from the Canon log, established facts).
- AI writing tics: "it's not X, it's Y", "honestly," openers, em-dash pileups, aphorisms, lists of three, the same joke repeated.
- Lines repeated word for word (or nearly) within one resident; voice slips (a character sounding like another).
- Typos, grammar slips, lines over ~170 characters.

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/review/<group>.json`: a JSON array of fixes `{"old": "...", "new": "...", "why": "..."}`.
`old` must be an exact substring of index.html (copy it from the file, including escaped quotes as they appear in the source) and must
occur exactly once there; include enough of the line to be unique. `new` is the replacement in the same quoting style. Aim for quality over
count (typically 20-80 fixes). Don't edit index.html or anything in git. Report how many fixes and the main kinds of problems you found.
Check your JSON parses and every `old` occurs exactly once: `node -e "const s=require('fs').readFileSync('index.html','utf8'),F=JSON.parse(require('fs').readFileSync('.claude/review/<group>.json','utf8'));F.forEach((f,i)=>{const n=s.split(f.old).length-1;if(n!==1)console.log(i,n,f.old.slice(0,60))});console.log(F.length,'fixes')"`.

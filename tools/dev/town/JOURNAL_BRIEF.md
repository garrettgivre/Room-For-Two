# Brief: the pet's Journal, better writing

The pet writes a Journal (Menu > Journal). Short entries come from templates `JR_T[key]` in `index.html` (search `const JR_T={`, ~84
keys, 3 lines each) and "while you were away" lines `JR_AWAY` (search `const JR_AWAY=`). Older days are summarised by `jrDay`. The voice:
the pet, two heads sharing one body, written as "we"/"I" interchangeably, small and funny and warm, never twee, never sad for long.
Placeholders: `{a}`/`{b}` the two heads, `{p}` the person who did it, `{i}` the item/shop/stage name, `{n}` the pet's name (check each key's
existing lines to see which placeholders it uses; only use those). Read `tools/writing/GAME_BIBLE.md` (the pet, the two players, tone,
writing rules) first.

## Task
For every key in `JR_T` and `JR_AWAY` that has lines, write **4 more** lines in the same voice and placeholder set, varied in rhythm and
angle (some about one head, some a tiny exchange between heads, some a small observation about the room or the person). Avoid repeating
jokes already there. Under 140 characters each. No emoji, no AI tics (no "it's not X, it's Y", no "honestly," openers, no em-dash
pileups, no aphorisms, no lists of three).

## Output
`C:/Users/Garrett/Documents/Room-For-Two/.claude/journal/more.js` containing statements like
`JR_T.feed.push('...','...','...','...');` and `JR_AWAY.<key>.push(...)` (match JR_AWAY's actual structure; if its values aren't arrays,
explain in your report instead of guessing). Check it with a quick node script that defines empty arrays for the keys and evals the file.
Don't edit index.html or anything in git. Report how many lines you added.

# Brief: play the game and find problems with the gameplay loop

"Room for Two" is a cozy mobile web game for two people sharing one two-headed pet, a room, and a town of 32 residents (repo
`C:/Users/Garrett/Documents/Room-For-Two`). Read `CLAUDE.md` "Start here" and "What the game is" first, and skim the sections for the
systems in your focus area. Design rules that matter: one daily list ("Today with <pet>"), no streaks or penalties, cozy not RPG, optional
extras never become chores.

## How to play headlessly
- `node tools/dev/town/run.js <your-test.js>` serves the game in solo mode (no real data, safe) and runs your test module:
  `module.exports=async({ev,pg,wait,log,shot})=>{...}`. `ev('code')` evaluates inside the game and returns **JSON text** (so
  `await ev('ready')` is the string `'true'`; parse it). `shot('name')` saves `.claude/town/out/name.png` (430x860, a phone). `pg` is a
  Playwright page: you can `pg.mouse.click(x,y)` on what you see, or call game functions through `ev`.
- Wait for start: loop until `await ev('typeof ready!=="undefined"&&ready&&!ARR.on')==='true'`. Reward cards (`#reward`) and dialogue
  cards (`#dlyBox`) can sit on top of things; click their button or hide them.
- Useful entry points: `setTab('pet'|'bag'|'journal'|'inbox'|'town'|'room'|'wardrobe')`, `openDecorate('furn')`, `showMap()`, `closeMap()`,
  `travelTo('<shop key>'|'home')`, `doAct('feed'|'bath'|'play'|'nap', itemId)`, `state` (the save), `todayHtml()`, `tdMake`, `kOpen(K)` in a
  shop (`away.keepers`), `cvStart(k)` on the map, `openGame('catch'|'pop'|'stack'|'drop'|'pinball'|'says')`, debug helpers such as
  `tdDayShift` (simulate other days) and `skyHourOverride` (the hour). Read the code around anything you use (grep index.html; it's ~7 MB,
  never read it whole).
- Play like a real person would: tap through the UI where you can (screenshots tell you what's on screen), then check state.

## What to look for (gameplay loop, not code style)
Dead ends and confusing moments (nothing tells you what to do next, a button that seems to do nothing, a card you can't close), things
that break or don't save, progress that stalls (can't afford anything, nothing new to do after day 2, a favour you can't finish),
rewards that feel wrong (too stingy, too generous, duplicated), text that's wrong or contradicts what's on screen, overlapping UI, things
that only work in a certain order, and anything that would annoy a couple playing a few minutes a day.

## Output
Write `C:/Users/Garrett/Documents/Room-For-Two/.claude/play/<your area>/report.md`: a numbered list of issues, most important first. For
each: what you did (exact steps or the ev code), what happened, what you expected, how bad it is (blocker / annoying / polish), and
screenshot paths. Keep your test scripts in the same folder. Don't edit index.html, CLAUDE.md or anything tracked by git; don't fix things
yourself. Report the top issues in your final message.

# Headless test tools for the town (used since v49)

Copied from the gitignored `.claude/town/` workspace. They serve the app in solo mode (no Firebase), inject a `__T` eval hook
into the served page only (index.html is never modified), and drive it with Playwright + software GL.

Setup (once): `mkdir -p .claude/pw && cd .claude/pw && npm init -y && npm i playwright` (Chromium is fetched by
`npx playwright install chromium` if it isn't in the user's ms-playwright cache). Output goes to `.claude/town/out/`.

- `node tools/dev/town/syn.js` — syntax-checks every `<script>` block of index.html (run after every edit).
- `node tools/dev/town/run.js <test.js> [inject1.js,inject2.js]` — test.js exports `async({ev,pg,wait,log})=>{}`; `ev(code)` evaluates
  inside the app's closure and returns JSON. Screens: `pg.screenshot({path,animations:'disabled'})`. While the town map is open,
  freeze it before screenshots (`tm.open=false;gc={open:true};tmFrame(.1)`) or the screenshot can time out.
- `node tools/dev/town/kview.js <file.js|-> <keeperKey> <outPrefix> [cheer|greet|talk]` — renders one keeper model (front/three/side/back/act).
- `node tools/dev/town/hview.js <houseId>` — injects `.claude/town/houses/<id>_home.js`/`_ext.js` if present, shoots the house on the map and inside.
- `BRIEF.md`, `TOWN_BRIEF.md`, `HOUSE_BRIEF.md` — the briefs given to helper agents that modelled creatures and houses (reuse for new townsfolk).

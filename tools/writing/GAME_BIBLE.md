# Room for Two: the game bible

The single reference for lore, characters and dialogue in Room for Two. Written for people and for AI sessions. If you are
about to write a line of dialogue, a letter, a holiday, a house or a new resident, read the chapter for that thing first.

Compiled 2026-10-04 (game build v69 plus the v70 weather work in progress) from:
`CLAUDE.md`; `tools/writing/keepers-bible.md`; every sheet in `tools/writing/townsfolk/`; `tools/writing/holidays.md`;
the conversation files `.claude/talk/<key>.js` (about 6,000 lines by several writers) and the holiday/weather files being
written in `.claude/talk2/<key>.js`; and the game data in `index.html` (`RESIDENTS`, `HOUSES`, `HOODS`, `HOUSE_DEF`, `EVENTS`,
`FESTS`, `LIKES`, `SHOPS`, `KBIB`, `MK_REQ`, `RES_T`, the resident furniture sets, `TRAITS`, `PERSONALITIES`, `TEMPERS`,
`CHEER`, `BOND_N`, `bdayOf`).

**Which source wins.** (1) Data the game uses in `index.html` (who lives where, schedules, hours, names, roles, sets).
(2) A character's own sheet (their section of `keepers-bible.md` for the nine shopkeepers, `townsfolk/<key>.md` for the rest).
(3) `holidays.md` for the calendar. (4) Dialogue in the TALK files and `KBIB`. Where dialogue invents a fact that nothing
else contradicts, it is canon and is listed in that resident's "Established facts". Where sources disagree, the resolution
is in chapter 8 and the lines to change are in chapter 9.

Contents
1. Premise, tone and writing rules
2. The pet and the two players
3. The town
4. Residents (all 32)
5. Relationships map
6. Calendar: weekly events, festivals, holidays
7. Canon log and open questions
8. Contradictions between sources and how they were resolved
9. Fixes needed

---

# 1. Premise, tone and writing rules

## What "Room for Two" means
- **One body, two heads; one pet, two people.** The game is a cozy shared room and a two-headed jelly pet for a couple,
  Garrett and his boyfriend Beau, who play on their own phones in one shared room. Each person has a head. The pet's needs,
  wishes and Journal are shared; either of you can answer them.
- **The heart is the room, the pet and the two of you.** Decorating (Beau's side, Happy Home Designer style) and pet care
  (Garrett's side, Tamagotchi style) meet in a pet with opinions about its home.
- **The town is the world outside your room.** Leaving through your door puts the pet on the streets of a small candy-bright
  town of 32 residents, nine shops, a plaza with a fountain and four neighbourhoods, set in countryside. It is
  "turning Animal Crossing-esque" (Garrett) but stays second to the room.
- **The loop** (v64): any visit = check on the pet, care for it, see what your person did. Daily = one list, "Today with
  <pet>" (the pet's wish of the moment plus three things it wants, always one for the two of you, then a treat). Long term =
  the bond level, which also grows the town. Everything else (finds, garden, jobs, events, keeper chats, makeovers) is
  optional and never on a list.

## Tone
- Cozy, not RPG. No battles, weapons, crafting, villains or danger. Multiple pets were left out on purpose.
- **No streaks, no penalties, no guilt.** Wishes expire without punishment; nobody is ever disappointed in you for being away.
  The pet looks after itself while you're gone and writes about it kindly.
- **Neighbours don't all get along (Garrett, 2026-10-04: "that old school Animal Crossing mean villager vibe").** Most residents
  are kind or indifferent to each other, close pairs adore each other, and a few are mean: snide remarks, backhanded compliments,
  eye-rolls, grudges, "I'm not talking to you". Some are mean to everyone (Prickles, Dewey), some only to certain people (Blush to
  Bolt, Gloss to Parcel, Cobble about the Mayor), some only in weather they hate (Fold in the rain). Kid-safe: never cruel about
  bodies, no threats, no villains, nobody is ever mean to the player or the pet beyond a sniff, and every mean one has a soft spot.
  Who feels what about whom is fixed data (chapter 5, "How residents feel about each other"); every line must agree with it.
  (This replaces the earlier rule "no real conflict, gossip is always fond".)
- No romance between residents and the players. Resident couples exist (Tock and Sketch, Posy and Prickles).
- Nothing scary. Swap-Face Night has "never a monster". Dr. Patch's clinic has hearts, never a red cross.
- Residents warm up over time: friendship levels (New face, Regular, Friend, Good friend, Bestie) gate their stories and
  deep talks. Higher levels get warmer greetings and in-jokes.

## Writing rules (for every line in the game)
- **Voice first.** Every resident must be recognisable with the name hidden. Use their tics (chapter 4) but don't stack them
  into parody. Read lines aloud.
- **One idea per line.** Speech bubbles hold about 110 characters (`KBIB`); map conversations allow lines under 170 and reply
  choices under 45. Split long thoughts into two lines (they queue).
- **Concrete beats general.** A named bun, a counted number, a specific bench. Lines about the pet should notice something
  (its two heads, its size, its mood) rather than flatter.
- **Banned AI tics** (Garrett's explicit feedback): "it's not X, it's Y" and "X isn't A, it's B" antitheses; "Honestly?" or
  "Also?" openers; "There's a difference"; pithy aphorisms ("Ovens don't lie. People do."); stacked one-word fragments;
  em-dash pileups; "a testament to"; "little did"; reflexive lists of three. Write like a person.
- **Placeholders:** `{n}` the pet's name, `{a}` and `{b}` its two heads' names (left and right), `{me}` the current player.
  Don't hard-code "Garrett" or "Beau" in dialogue; residents say "the two of you", "you two" or "your person".
- **The pet does not grow** (v62: one form, no egg, no life stages). Don't write "{n} is growing", "when {n} is grown",
  "how tall is {n} now". Bond level is what grows.
- **Names, never keys.** Residents are called by name: Sketch (never "Pencil"), Bobbin (never "Spool"), Lumi (never
  "Lantern"), Tutti (never "Cone"), Echo (never "Gramo").
- **Pronouns:** a character's own sheet wins; if it doesn't say, use they/them. When unsure about someone, use their name.
  The decision for every resident is in chapter 4 and in the table below.
- **No emoji** in dialogue or UI where art exists. The only font is R42 Bubble.
- **Never draw or describe a four-point star or sparkle** (reads as an AI logo). Five-point stars are fine (Gloss's glitter,
  Joy's starry eyes, Fold's paper star "five points").
- Brand look for anything visual: deep-purple outlines (#3B1273), white sticker edges, glossy jelly-candy look, speckles.
  Palette pink #FF3D9A, lime #A6E22E, cyan #3EC8F2, sun #FFD21F, orange #FF8A1C, grape #9B4DF2.

## Pronoun table (decided 2026-10-04)

| Resident | Pronouns | Basis |
|---|---|---|
| Bunbun | she | own entry ("burns her tongue") |
| Fizz | he | own entry ("his hair pops") |
| Boing | he | every source agrees; own entry is silent (see note) |
| Cushy | they | own entry ("fluffs themself"); "she"/"he" elsewhere are errors |
| Bolt | he | own entry ("his hat") |
| Pom | they | own entry silent; sources split ("he" in Gloss's sheet, Fizz's makeover, some holiday lines; "she" in a house line); everyone else avoids pronouns |
| Blush | she | every source agrees; own entry is silent (see note) |
| Stitch | they | own entry silent; every source that uses one says they/them |
| Joy | she | every source agrees; own entry is silent (see note) |
| Pip | he | own sheet |
| Loofah | it | own sheet |
| Tock | it | own sheet |
| Dusty | it | own sheet |
| Sketch | it | own sheet |
| Gloss | she | own sheet |
| Bobbin | they | own sheet |
| Pixel | it | own sheet |
| Mayor Marsh | he | own sheet |
| Parcel | they | own sheet ("Bunbun saves them a warm roll") |
| Fold | they | own sheet silent |
| Posy | she | own sheet |
| Prickles | he | own sheet |
| Dewey | it | own sheet |
| Lumi | they | own sheet silent |
| Nimbus | they | own sheet silent |
| Beacon | it | own sheet ("things it has adopted") |
| Tutti | she | own sheet |
| Scone | he | own sheet |
| Crumb | she | own sheet |
| Echo | it | own sheet |
| Dr. Patch | it | own sheet |
| Cobble | he | own sheet |

Note on Boing, Blush and Joy: their own entries in `keepers-bible.md` never use a pronoun, so the strict rule would make them
they/them. Every other source (the bible's relationship table, `KBIB`, all TALK files, makeover requests) agrees on
he / she / she and none disagrees, so this bible keeps the consensus. Garrett can overrule; if he does, many lines change.

The holiday batch in `.claude/talk2/` was briefed with Pom "he"; this bible's rule gives Pom **they** and Cushy **they**.
Those lines were fixed on 2026-10-04 (all 64 TALK files re-scanned; see the canon log).

---

# 2. The pet and the two players

## The pet
- **What it is:** a two-headed jelly creature, glossy and wobbly (the shader's jelly mode: glassy top coat, glow-through,
  sugar speckles). One squat gumdrop body, roughly as wide as it is tall, and two heads that sit a little apart and lean
  out: the **left head lime, the right head blue** by default, one big eye each, antenna tufts with a springy tip. Keep the
  heads visibly two and the body round (an earlier tall, narrow version read badly).
- **Default name:** Mochi; the heads' names default to the name split in two (Mochi gives Mo and Chi). Both are editable.
  In writing always use `{n}`, `{a}`, `{b}`.
- **One form, forever** (v62): no egg, no growing up. What grows is the **bond level**, endless, with titles: Just met, New
  friends, Getting cozy, Pals, Close, Snug as can be, Two peas, Heart to heart, Inseparable, Soulmates. Each level needs a
  few more care moments than the last; every even level gives a whole room theme, and the town grows with it.
- **A head for each of you** (v63): the first two people in the room each get a head (left = first). Each head learns what
  its person does for it (feeding, baths, play, naps, pats, trips, games, favourite food). When you come back, your head turns
  to you and bobs. Furniture remembers who placed it, and the placer's head sometimes shows a star when the pet uses it.
- **Two minds:** each head has its own temperament (`TEMPERS`: playful, cozy, foodie, curious). When they want different
  things they **confer**: they turn to each other with a thought bubble each, one nods, the other tilts; the head that gave
  way gets more say next time. Wishes are conferred too (who wanted what is recorded).
- **Personality** (`PERSONALITIES`, one per pet): Joker, Romantic, Daredevil, Scholar, Explorer, Social butterfly,
  Perfectionist, Mystic, Loner. Each has a favourite and a disliked food kind and a favourite toy kind.
- **Traits** it grows into from how it lives (`TRAITS`, up to two show): Foodie, Homebody, Playful, Squeaky clean, Cuddlebug,
  Fashionista, Artsy. Traits colour its Journal, idles, favourite shops and which residents it likes visiting.
- **Needs:** Hunger, Fun, Energy, Hygiene, Love (words like Peckish, Stuffed, Joyful are levels, not names). Furniture fills
  needs; the pet looks after itself with what's in the room and asks for a piece when something is missing.
- **Wishes:** every half hour or so it wishes for something (a snack, its favourite food, a bath, play, a nap, pats, an outfit
  change, a trip to a shop, a visit to a neighbour, a piece of furniture). Unanswered wishes fade after four hours, no penalty.
- **The Journal is written by the pet**, in its own voice, including "while you were away" entries and one page per past day
  signed off by both heads. It likes things, notices who placed what, and is never sad at you.
- **Through the pet** (v66): the two of you leave each other surprises and notes; the pet carries them over (the giver's head
  turns to you). When you're both online the pet dances and both heads cheer.
- **Looks:** colours and patterns from Blush, antenna tips from Pom (Glow Up Studio); hands, shoes and about 250 accessories
  from Stitch (Jelly Threads). Signature palettes: Classic, Cotton candy, Midnight goo, Sunset, Grape, Berry.
- **How residents see it:** they always notice the two heads (one likes sweet, one likes crumbs; one wants it hotter; one
  pushes, one pulls). It's small, wobbly, "two heads, one body", a junior expedition member (Prickles), the best tester
  (Boing), the best canvas (Blush), Citizen of the Month every month (the Mayor), eighth on Pixel's leaderboard.
- On Swap-Face Night the pet dresses as the two of you, one head each, and it's the best costume every year (Fold).

## The two players
- Garrett and Beau, a couple; in the fiction they are always "the two of you". Garrett leans Tamagotchi (care), Beau leans
  Happy Home Designer (decorating and resident makeovers). Don't name them in dialogue; use `{me}` for the player.
- They live in the house just south of the plaza (your room is the game's home; on the map it's a cottage with a roof in the
  heads' lime and blue). Your lane has a low lamp by the gate that Lumi says is `{n}`'s, and Cobble's best stone came from it.
- **What the town calls you:** the founders / the founding couple (Mayor Marsh, and from him Nimbus, Echo and Cobble's
  "Founders' Lane"); the co-op team, player one and player two (Joy; Pixel says it flatter); the two-door house (Parcel);
  my favourite clients / my muses (Fizz); my favourite testers (Boing); my favourite nest-makers (Cushy); chief (Bolt);
  my favourite family (Bunbun); my favourite palette (Blush); valued regulars (Tock); dear residents (the Mayor);
  my favourite ships (Beacon); sweet pea, my loves (Tutti); kid, youngster (Prickles); love (Blush); lovely (Gloss).
- They send each other notes even though they live together; Parcel thinks it's the best mail in town and saves your house
  for last.
- **Room Day** is the anniversary of your room. Only the three of you keep it; residents know about it from the pet.

---

# 3. The town

## In one paragraph
A small candy-bright town of nine shops round a fountain plaza, four neighbourhoods and countryside beyond. Everyone knows
everyone, they are all a little odd in the same gentle way, and they have all decided without discussing it that the two
of you and your two-headed jelly pet are the most interesting thing to happen here in years. Most residents began as an
object: a jar on a back shelf, a sponge on a salon shelf, a marshmallow in a campfire bag, a pebble at the bottom of a river,
a candle in a window. Someone picked them up, said something kind, and they stayed.

## The map (current: v54 layout, v60 countryside)
- **The plaza** in the middle: the fountain (officially opened by Mayor Marsh three springs ago; there is a plaque, please do
  not splash it), four benches, flower beds Posy keeps, four lamps, and a statue nobody will admit to recognising (the Mayor
  is afraid it might be him; when town cheer reaches "Sparkling town" a statue of the pet appears and "everyone pretends it was
  always there"). A ring road runs round it.
- **The shops** stand in a ring facing the plaza: north, the Snack Shack and Jelly Arcade; south, the Toy Box and Glow Up
  Studio; west, Hammer & Hue and Cozy Nest; east, Jelly Threads and the Bubble Salon. Four streets lead out.
- **Your house** is just south of the plaza, on the south street.
- **Four neighbourhoods** in the corners, joined by a lane across the north and one across the south:
  - **Sugarloaf Lane** (north-west): "Bakery smells and nap-time quiet." Bunbun (The Warm Loaf), Pip (The Jam Jar, next door
    to Bunbun), Cushy (Cushy's Big Nest), Dusty (Dusty's Tidy Nook), Tutti and the twins (The Sundae Cottage), Dr. Patch
    (Dr. Patch's Little Clinic). A candy cart stands on the lane.
  - **Playhouse Hill** (north-east): "Games, gadgets and things being built." Boing and Joy (The Game Night House), Tock and
    Sketch (The Clockwork Cottage), Bolt (Bolt's Toolbox), Pixel (Pixel's Stack), Parcel and Fold (The Paper Post), Cobble
    (Cobble's Cottage). Balloons and bunting.
  - **Lantern Meadow** (south-west): "Wildflowers, lamplight and the mayor's front porch." Mayor Marsh (Marsh Manor), Dewey
    (Dewey's Reading Room), Lumi and Nimbus (Lamp & Drizzle Cottage), Posy and Prickles (The Potted Lodge), Echo (Echo's
    Music Box). A pond, lamps along the lane, the bandstand.
  - **Bubble Bay** (south-east): "Spa steam, sea air and a lot of style." Fizz (Fizz's Bubble Dome), Loofah (Loofah's Sunny
    Hut), Stitch (The Basket), Pom and Blush (Pom & Blush's Place), Gloss and Bobbin (Number Two, Bubble Bay), Beacon
    (Beacon's Lamp Cottage, at the end of the pier). A pond and a bench.
- **The park** at the west end (pond, bench, flower beds; Posy's beds, Cushy's noon bench, the oak that knows Posy, the old
  bridge by the park with the best echo in town). **The lookout** at the east end (a statue, a bench, a lamp).
- **Empty lots**, five of them ("Someone new soon!"): one in Sugarloaf, one on Playhouse Hill, two in Lantern Meadow, one in
  Bubble Bay. Parcel has a white pin in each on the map in the sorting room.
- **Woods** round the edge, then **countryside** out to the horizon (v60): dirt roads out of the four gates, crop fields,
  flower meadows, hills. It is not an island (Garrett: "I don't want it to be an island either").
- The map's arrangement is shared and editable by the two of you (Arrange mode), so "next door" is a neighbourhood fact, not
  a fixed coordinate. Neighbourhood membership (`HOUSES`) is canon; exact plots are not.

## The shape of the town (v75)
The fountain plaza is a round tiled square with a brick ring round the fountain, benches facing it and lamps; a round cobble ring road
circles it with the eight shops facing in. Four straight avenues run out (west to the park, south past your house, east toward the
bay) and brick **Market Street** runs north between the Sunday stalls to the Town Hall. **The Loop** is a flagstone lane round the whole
town with rounded corners; the neighbourhoods sit outside it, their doors facing it (Sugarloaf Lane north-west, Playhouse Hill north-east,
Bubble Bay south-east, Lantern Meadow south-west with the lamp shed). The library and the post office are just inside the Loop on the
west and east avenues; the park runs along the west edge with a gravel walk and two round loops; the boardwalk runs along the bay side.
At night every lamp and doorway pools warm light on the paths.

## The town's civic places (v73: now real buildings you can walk into)
- **The Town Hall** (`p_townhall`, at the top of Market Street, north of the plaza; Mayor Marsh 9:00-15:00, open 8-18): a cream two-storey
  hall with a teal roof, a clock tower with a bell and a flag, a four-column portico and the speech balcony above it. Fold's sign
  "TOWN HALL" (every letter leaning left) is on the portico; Sketch and Stitch's tape measure was left on the bottom step. Inside: the
  entrance hall (guest book lectern, the First Brick in its velvet box under a glass dome, the town seal rug), the Mayor's office in his
  Ribbon Hall style (cheer chart, hat stand, rosette banner), an assembly hall with council benches and a little town bell, a waiting room
  with a pet bed for visiting pets, a locked records room; upstairs the council chamber (long table) opening onto the balcony room.
  You can sign the guest book (it keeps everyone's signatures) and see the First Brick.
- **The Library** (`p_library`, on the west street; Dewey 10:00-16:00, open 9-18): a cream hall with a sky-blue roof, a frieze of book
  spines, a portico whose clock is always at ten o'clock (the quiet), a cupola with a paper-moth weather vane, a round story room with a
  carousel-striped roof for the children's corner, a book drop and a little free library out front. Inside: rolling-ladder bookstacks,
  Dewey's desk (date stamp, the basket of lost bookmarks, Fold's crane from an overdue notice on a little arm), the reading nook with the
  big reading cushion Lumi sleeps on, the story hour rug with Boing's castle pop-up book, and the bindery (the "back room" Dewey leaves
  open for Echo; staff only). You can borrow a book (one a day).
- **The Plaza Post Office** (`p_postoffice`, on the east street; Parcel 12:00-16:00 after the round, Fold 14:00-17:00, open 8-18): Parcel's
  dream come true. Mint walls, a cherry scalloped roof, a bell turret with a winged-letter weather vane, a portico clock, a round-top post
  box, an outdoor bank of cubbies (the first lime and blue). Inside: the wall of house cubbies (ours first, lime and blue; Fold lettered
  them all and ours took longest, "the corners wanted to be right"), the counter with scales and the jar of Fold's paper hearts, a
  writing desk, Fold's lettering corner (Fold is lettering a sign for the bakery: "the B needs one more day"), and the locked sorting room
  with Parcel's pinned town map. Check your cubby there (the Inbox).
- **The Weather Station** (`p_weather`, on the hill north of the Town Hall; Nimbus 6:00-9:00, open 6-20): white-blue clapboard, an
  observatory dome, a mast with spinning cups and a cloud-tailed vane, a yellow weather balloon tied to the roof deck, a rain gauge.
  Inside: the forecast chalkboard (raindrops count how many umbrellas you'll need), the seven-umbrella tree, the weather book on a lectern
  (visitors can read their own page), a drying cupboard (staff only). Borrow an umbrella; read your page.
- **The Lamplighter's Shed** (`p_lampshed`, in Lantern Meadow behind Echo's; Lumi 17:00-19:00 before the round, open 16-23): a teal shed with
  a plum roof and a glowing lantern cupola, lanterns on hooks, a ladder, a test lamp post by the door, night jasmine (Posy's) by the door.
  Inside: the wick workbench (the spare bulb for the lamp by the Snack Shack sits there; Lumi keeps meaning to take it over), the
  lamp-post tester, the lantern hook rail, a nap cot for before the night round, an oil store (staff only). Help trim the wicks.
- **The Sunday market** on Market Street (Sundays 9:00-13:00): eight stalls under a candy-striped "Market" arch, each with its vendor
  behind the counter: Pip (jam), Posy (flowers and seeds), Scone and Crumb (lemonade), Prickles (curios; a pink pennant and a
  brass-cornered travel trunk), Fold (paper crafts, a pinwheel), Cobble (river pebbles; his best holed pebble on a pink cushion, a
  traffic cone and a flask), Bobbin (knits), Tock (wind-up toys, a chalk tally board). Chat with a vendor to buy from their stall.
- **The park** at the west end: a rose-twined arch with a hanging "Park" sign and open picket gates, the big slide (Scone's plaster is
  still stuck to its side) and the small slide with the snail, the old stone wall with Crumb's holed stone, Posy's raised flower bed and
  potting shed (pink door with a daisy, a rain barrel), a climbing dome, a hopscotch path, a wisteria bench; Posy works there in the
  mornings and the twins play there 9:00-14:00.

## Places in the lore that aren't buildings on the map (yet)
- **The Town Hall**: the Mayor's office (9:00-15:00), the guest book, the cheer chart, a balcony, an awning, steps Sketch and
  Stitch once measured, a sign Fold painted (the letters lean left), and the first brick in its velvet box.
- **The library**: Dewey's, open 10:00-16:00, with the ten o'clock quiet, a ladder on a rail, a cedar shelf, a basket of lost
  bookmarks and the reading cushion.
- **The playground**: swings, the big slide (Scone's plaster), the small slide, a snail by the slide, a wall with Crumb's
  holed stone set in it at eye level. The twins are there 9:00-14:00.
- **The pier, the beach and the point**: Beacon's lighthouse cottage sits at the end of the pier on Bubble Bay; there is a
  beach with warm smooth pebbles, a harbour, gulls, boats, fog and a foghorn. (The current map shows ponds, not a sea: see
  Open questions.)
- **The hill** Nimbus checks every morning at six, and the hill with fences Bolt taps.
- **The Snack Shack bakery bell** (rings at seven; Bunbun rings it gently).

## The shops

| Key | Shop | Sells | Keeper(s) | Assistant | Building (map) |
|---|---|---|---|---|---|
| `snack` | **Snack Shack** | food, snacks, drinks | Bunbun | Pip | cream bakery-diner with checkered orange wainscot, a lathe-turned burger on the roof with bunny ears, striped café awning, patio tables. Inside: bakery, café corner, staff kitchen and pantry. |
| `salon` | **Bubble Salon** | grooming, baths | Fizz | Loofah | a bubble bath with a duck. Inside: T-shaped spa (reception, bath hall with a claw tub, staff towel room, laundry shared with Pom and Blush). Bolt painted it "Seafoam Surprise". |
| `toys` | **Toy Box** | toys; capsule machine | Boing | Tock | a toy box with a bouncing spring-head. Inside: shop, staff workshop, play loft upstairs (Boing is "somewhere above us"). Tock put a cushion on the ceiling. |
| `furn` | **Cozy Nest** | furniture (daily stock, about six sets a day) | Cushy | Dusty | a pillow stack with a nightcap. Inside: showroom hall, living room and bedroom displays, staff stockroom (Bunbun leaves cookies by its door). |
| `build` | **Hammer & Hue** | floor and wall tiles, doors, windows, room size, paint | Bolt | Sketch | a hard hat with paint drips, a mallet and a paint can. Inside: hardware floor, staff lumber yard, paint gallery upstairs. About nine years old (the door "hasn't moved in nine years"). |
| `glam` | **Glow Up Studio** | antenna styles (Pom), colours and patterns (Blush) | Pom and Blush | Gloss (front desk) | a vanity with a bulb mirror, lipstick, a powder puff and afro puffs. Inside: reception, Pom's hair studio, Blush's makeup studio, staff lounge. The front door's colour is "begin". |
| `wear` | **Jelly Threads** | hands, shoes, accessories; fitting room | Stitch | Bobbin | a tape-measure box with a button, yarn ball and needle. Inside: boutique, fitting rooms, staff sewing room. |
| `arcade` | **Jelly Arcade** | minigames, tickets, capsule machine | Joy | Pixel | a control-panel deck with a joystick and a marquee (Fold painted the letters, Joy painted "the excitement"). Inside: main hall, retro room, staff room, party floor upstairs by lift. Games: Catch, Bubble Pop, Stack, Says, {pet} Drop, {pet} Pinball (space), Reef Pinball. |

Shop hours: keepers are in 7:00-17:00 US Central; assistants mind the shop 13:00-7:00, so **shops never close**. Off-duty
residents drop into shops as customers.

## History and the town's age (everything the sources establish)
- **First Brick:** the town began as one brick. It's kept in a velvet box at the Town Hall (Stitch made the box). It has a chip
  in one corner ("where the luck lives", Bolt) and a thumbprint nobody can identify; it's always warm ("all the hands",
  three generations of them, says the Mayor). Bolt carries it out with two hands every First Brick Day and polishes it the
  night before; Dusty dusts it first; Sketch walks beside him in case. Dewey "keeps the town history. It's very short. One
  brick, then everyone."
- **How the Mayor was elected:** he was a marshmallow in a campfire bag, toasted just right one night, everyone cheered, and
  he stood up on the log waiting for more. "There was a cheer. I counted it as a vote." Nobody has disputed it since.
- The Mayor's first ribbon cutting opened a bench by the fountain; the scissors stuck, Bolt oiled them during a long speech,
  and nobody went home ("That was when I knew this was a town"). He keeps that uncut ribbon in his desk.
- The Mayor freed Dewey from a drawer while looking for a pen ("oh, hello").
- Parcel has carried the mail "since the town had four houses". Now there are fifty-three doors (fifty-four counting the
  door at the top of Beacon's lighthouse). Bunbun walked Parcel round every street on the first day.
- Bunbun opened the Snack Shack because "the whole street used to skip breakfast"; she saw Cushy asleep on a bench with an
  empty stomach. She put Cushy on a chair in the bakery and said "stay". She was a bit lonely before the town filled up.
- Bolt built Hammer & Hue with one mallet and a ladder borrowed from Cushy (he has built Cushy four sofas since). Fold has
  painted his signs for four years.
- Fizz came from a travelling bath circus. Nimbus arrived when Posy held up a flower and said "could you?". Prickles
  stopped after fifty years of travelling when he fell asleep under Posy's sunflower.
- Ages of things: the fountain, three springs; Hammer & Hue, about nine years; Bunbun burning cookies for Prickles, twelve
  years; Cushy's heart cushions for Bunbun, eleven; Parcel's satchel, ten years; Game Night score sheets, three years;
  Beacon's crab shell, three years; the pier, "open forty years" (never properly opened, says the Mayor); Pom and Blush's
  colour arguments, "years".
- **Town cheer** (now driven by the bond): Sleepy hamlet, Waking up (bunting), Friendly corner (a candy cart), Lively lane
  (balloons), Bustling square (a bandstand), Cheerful town (flowers everywhere overnight), Sparkling town (a statue of the
  pet), Beloved town (a second candy cart; "the first one is thrilled"), Heart of the valley (a brand new fountain "just for
  you two"). The Mayor keeps the chart on his office wall and claps at it.
- **Weather:** the town follows the real weather where you live (v70), and each day has sun, cloud, rain or wind for both
  phones alike. Rain waters the garden. Nimbus apologises for drizzle.

## Everyday town life (systems the lore should respect)
- **Schedules** (US Central): see each resident. Keepers 7:00-17:00 in the shop. Assistants home 7:00-13:00, then the shop.
  Townsfolk are out on their rounds for set hours and home otherwise. Residents walk the streets on their rounds, stop to
  chat when they meet, and visit shops as customers.
- **Friendship:** first chat of the day +2, buying in their shop +1, kind replies in conversation +1. Shopkeepers invite you
  home at Friend, assistants at Regular; townsfolk doors are open whenever they're home.
- **Gifts:** each resident loves two things and likes two (food kinds, grooming, a furniture set, a kind of furniture);
  loves are discovered as you give. Furniture given goes into their house.
- **Jobs as close-up actions:** Dr. Patch's check-up, Posy's seeds, Beacon's lost and found, Dewey's story time (a past
  Journal day), Tutti's free scoop, Echo's song, the Mayor's town news, Nimbus's forecast, Parcel's parcel.
- **Garden:** three planters; seeds from Posy: quibbleberries (two watered days; "like a raspberry that told a joke"),
  fizzmelon, jibbleroot, sunflower (three days), dandelion.
- **Daily finds** on the roads: heart candy, a posy with a seed, a present with a snack, a four-leaf clover, a capsule token.
- **Visitors** knock at your door now and then with a snack and a comment on a piece of your furniture.
- **Room makeovers:** residents ask the two of you to design a room in their house (three requests each, chapter 4); every
  finished room stays part of their house forever.
- **Capsule Pals:** every resident exists as a little figurine in the capsule machines.

---

# 4. Residents

32 residents (`RESIDENTS`): 9 shopkeepers, 8 shop assistants, 15 townsfolk. Each entry uses the same template. "Loves/likes
(gifts)" is the game's `LIKES` (what makes a gift land); "Loves / can't stand" is character. "Birthday" is the date the game
gives them (`bdayOf`, US Central); see chapter 8 for the twins and the Mayor. "Established facts" includes facts the
dialogue writers invented: they are canon now, so keep them consistent.

Gift tags: food kinds are grains, sweets, drinks, snacks, veggies, fruit, exotic; "grooming" means grooming items; furniture
kinds are seats, beds, tables, storage, lights, fun, plants, rugs, decor, wall pieces.

## 4.1 The shopkeepers (in the shop 7:00-17:00, home otherwise)

### Bunbun (`baker`)
- **What:** an egg-shaped bunny baker. **Pronouns:** she/her (own entry).
- **Job:** Baker, owner of the Snack Shack. In the shop 7:00-17:00; in the lore she's up from four and the first tray is out at six.
- **Home:** The Warm Loaf, Sugarloaf Lane, alone. Pip lives next door; Cushy and Dusty across the lane.
  House: "A bread-loaf cottage that smells of Sunday. There is always a kettle on, a loaf in the hutch and a chair pulled out for you."
- **Birthday:** 17 August.
- **Look:** egg body with springy ears (they flop and get floury first: white ears = kneading, pink ears = she's been crying at a
  recipe card), chef's hat, wooden spoon. Matte, floury. Puffs of flour when excited.
- **Voice:** warm, fussing, a little flustered. "Sweetie", "hon", food comparisons. Worries you haven't eaten. Hums because she can't whistle.
- **Personality:** feeds everyone; quietly lonely before the town filled up and now has "too many people to feed. Best problem in the world."
- **Loves/likes (gifts):** loves grains and the Kitchen Café set; likes sweets and tables.
- **Loves / can't stand:** early mornings, the first loaf, feeding everyone / soggy bottoms, skipped breakfasts.
- **Dream:** a town picnic on the plaza every spring (blankets, egg buns, jam tarts, a great big lemon cake, sandwiches for Bolt cut small).
- **With the two of you:** treats you like family; `{n}` is "our little {n}"; keeps the first bite of every batch for `{n}`.
  Her notebook of everyone's favourite says of you: "Comes in together. Always shares. Keep something warm."
- **Furniture set:** **Butter Hearth** (honey-oak boards, wheat-sprig wallpaper, a Bakehouse door): farmhouse bakehouse with a rolling-pin
  bench, pie-crust tub chair, proving-basket pet bed, butcher-block table, milk-can lamp, bread hutch, butter churn, flour-sack rug.
- **Makeover requests:** A sit-down after the rush; Sunday tea for everyone; A bedroom like warm bread.
- **Relationships:** Cushy (best friend; Sunday tea at three, she talks and knits, Cushy naps); Pip (her apprentice, "my jam-jar"; she is
  saving "that's the one" for when his jam is ready); Bolt (packs his lunch because he forgets to eat; he fixes her oven door, eight times so
  far; he built the shelf over her oven where she keeps her mum's recipe book); Fizz (shy admirer: his cream bun at three every day, she drops the
  tongs when he says "divine"); Joy (pretends not to see her steal cookies; bakes two extra); Stitch (made her apron; she pays in scones, and they
  swap recipes for patterns); Boing (bakes him bounce buns: "Chew, Boing!"); Tutti (Friday swap of cones for cookies, and an argument about whose
  crumb is better); Prickles, Beacon, Dr. Patch (burns a batch on purpose for them); the Mayor (a warm bun at ten, declared a municipal holiday);
  Dusty (leaves cookies by the stockroom door, a porch light on); Cobble (a roll on his wall each morning, hidden in a different spot); Parcel (a
  roll saved for the second stop, wrapped in two cloths); Echo (a roll on its lid at four); Dewey (a bun with a bookmark in it); Posy (buys
  herbs, pays in cookies); Nimbus (gets a forecast every morning and pins it on the bakery wall); Gloss (orders the studio's cakes; they agree on everything).
- **Running jokes:** burns her tongue on the first cookie of every batch; "Did you eat?"; Dr. Patch tells her to sit down and she sits for six
  seconds (on a flour sack, on the cookie tin); the burnt cookies Prickles once said he liked; Joy's cookie thefts.
- **Established facts:** opened the Snack Shack because the street skipped breakfast; had a mum (her recipe book sits over the oven); runs sugar
  lessons on Thursdays; rings the bakery bell at seven, gently; her oven light is on at five; Monday's ten o'clock bun has extra icing; first
  emergency Dr. Patch ever treated was her oven burn; Sunday tea has grown (Cushy, then Pip, then Joy, then half the lane; the Mayor, Posy and
  Prickles are regulars); she enters (or shares) a pie at the Summer Fair; Pom does her ears with tiny ribbons for the fair every year.
  Two-Heart Day is her day: two-lobed heart buns "for the two halves of you".
- **Avoid:** making her sharp or sarcastic; having her sit still for long.

### Fizz (`stylist`)
- **What:** a curved bean with a bubble-bath hairdo. **Pronouns:** he/him (own entry).
- **Job:** Stylist, owner of the Bubble Salon (baths and grooming). 7:00-17:00.
- **Home:** Fizz's Bubble Dome, Bubble Bay, alone; Loofah next door. "A bathtub with a roof of bubbles, a pearl-pink parlour inside and a
  clam-shell bed. Fizz narrates every arrival, so knock loudly."
- **Birthday:** 25 October.
- **Look:** a curved bean body, mismatched eyes; hair is a bubble bath over a pink core: bubbles float off, pop and grow back, and drift away when he
  laughs. Humid days make it huge; dry air pops it.
- **Voice:** grand and theatrical but in on the joke. "Darling", "divine", "tragic" (for tiny things), "Ciao", "Adieu". Narrates his own entrances.
- **Personality:** big feelings, loud because quiet salons once frightened him ("an empty tub sounds so lonely"); generous with compliments.
- **Loves/likes (gifts):** loves grooming and the Bubble Bath set; likes drinks and the Date Night set.
- **Loves / can't stand:** warm baths, humid days, compliments / dry air, being rushed, winter radiators.
- **With the two of you:** decided on day one that you're his favourite clients (you argued over the towels on your first visit; Loofah has set the
  fluffy one aside ever since). Fusses over `{n}`'s shine.
- **Furniture set:** **Pearl Parlour** (pearl terrazzo, champagne-fan wallpaper, a pearl-shell door): old-Hollywood bath glamour with a fainting couch,
  bubble-back settee, satin pouf pet bed, sunburst mirror, velvet stage drape, foam fountain.
- **Makeover requests:** A bath worth an entrance; Somewhere to be complimented; A corner for Pom's visits.
- **Relationships:** Loofah (his assistant and the only one who can calm him: "no rush, Fizz"); Pom (his protégé; Pom says colleague; "proud big
  brother" in feeling, see chapter 8); Blush (they argue about what "glow" means, for years, "our love language"; he adores her); Bunbun (the 3pm
  cream bun; he once moved a whole wedding party for it); Bolt (called his paint "brave", then let him paint the salon "Seafoam Surprise" and loves
  it now, after a year); Joy (she beat him at Bubble Pop, 42,000 to 9,000, and keeps the poster above the counter); Pixel (has never beaten Pixel
  at Bubble Pop; suspects); Stitch (makes his silk robes; the hood for his hair keeps getting bigger and is now a tent); the Mayor (laughs at every
  joke in the speeches); Tutti (brings her bubble-gum scoops: "interesting"); Nimbus (asks for "a light shower" of bubbles; they're friends now);
  Boing (bounced into the claw tub and came out wearing Fizz's hair).
- **Running jokes:** "tragic"; narrating entrances; bubbles popping on the walk over; the glow argument; practising Bubble Pop in the bath.
- **Established facts:** before the town he styled bubbles for a **travelling bath circus**: twelve tubs on wheels that crossed a valley; his act was
  "The Floating Fizzini" (he once lifted a teacup with bubbles alone). He left because "the tubs went one way and my heart went another", and his tub
  sprang a leak. Sleeps with a kettle on in winter. Cried in the laundry room the day Pom's hands shook on the comb. Gives Loofah a heart soap every
  Two-Heart Day. Signs the guest book most (a bubble over the i). New scent: pear. Blush painted a sunrise called "Fizz at Dawn"; Pom named the big
  curl at the front after him.
- **Avoid:** making him vain without the wink; real cruelty in the glow rivalry.

### Boing (`toymaker`)
- **What:** a toymaker who is mostly spring. **Pronouns:** he/him (consensus; see the note in chapter 1).
- **Job:** Toymaker, owner of the Toy Box. 7:00-17:00.
- **Home:** The Game Night House, Playhouse Hill, with Joy (best friends, housemates). Pixel next door. "Boing's tinker loft and Joy's neon
  bedroom meet in one big games room with a marble run, a claw machine and a sofa for two."
- **Birthday:** 8 May.
- **Look:** one big central eye with a lid that blinks, a bent grin with teeth, a helical spring body that stretches, jointed stick arms.
- **Voice:** bursts of excitement, jumps between thoughts, "okay okay okay", BOING in capitals. Hates the word "wait".
- **Personality:** endlessly inventive, a little worried he's too much ("I'm loud about stuff I love. That's most stuff.").
- **Loves/likes (gifts):** loves the Carnival set and sweets; likes fun furniture and the Dino Dig set.
- **Loves / can't stand:** gadgets, bouncy stairs, loud colours ("the best colour is all of them") / low ceilings, waiting, glue drying.
- **Dream:** a toy that makes two people laugh at the same time; he thinks it already exists when he sees the two of you with `{n}`.
- **With the two of you:** you're his best testers; `{n}` tries everything first.
- **Furniture set:** **Tinker Loft** (beech peg boards, springs-and-blocks wallpaper, a Tinkerer door): a maker's loft with a spring stool, dowel sofa
  for two, coil-spring bed, tinker workbench, marble-run tower, mini-trampoline pet bed, toy-train rug.
- **Makeover requests:** A ceiling I won't bonk; Game Night headquarters; A quiet corner, honestly.
- **Relationships:** Joy (best friend and housemate; co-hosts Game Night; when he came to town he bonked every doorway and Joy made the doorways cheer;
  he made her a trophy for losing, kept by her bed; he sends her weekly fan mail signed "a fan" in his own handwriting); Tock (his first toy that
  didn't bounce; makes him tea when he's too bouncy, and he winds down for nine seconds; sits with Tock during "Tock time"); Bolt ("Boss": Bolt sends
  springs weekly with a bow on the box; Bolt calls him "the kid"); Stitch (sews his plush designs; he once sewed himself to a table); Cushy (the bouncy
  cushion incident: Cushy said no, he made it anyway, it's in the toy box); Bunbun (bounce buns, eaten in one gulp); Pixel (Game Night co-host; the bet on
  who tires first; Boing has done the dishes for a year); Scone (lets him wind the toys himself); Crumb (wound up her pebble; it rolled); Dewey (borrows the
  pop-up books, returns them more popped up); Fizz (wants a toy that bubbles like Fizz's hair; it makes foam that smells of peaches); Pip (brings
  "stirring" toys that end up in the jam; calls Pip "the jam kid"); Sketch (measured him as "about Boing-sized").
- **Running jokes:** bonking the ceiling (Tock put a cushion there; eleven bonks a day, twelve with the cushion); naming every prototype (Wobbles,
  Sir Bounceton, Rollo the runner, Sneezle); "Sir Boingsworth" the spring; glue drying.
- **Established facts:** made his first toy out of his own spring (it went boing once; it sleeps on his pillow, "very tired now"); a little scared of
  getting too tall; Game Night is Fridays at the Game Night House: 64 board games and a shelf of games he invented (worst: "Floor Is Springs"), a shelf
  called "Shelf Of Big Feelings", three years of score sheets on the fridge (his wins hidden at the bottom by Joy), spring magnets he made; he recorded Joy
  humming chiptune in her sleep and uses it as his alarm; bounces asleep, sometimes upside down; goes through forty springs a month; takes seven sugars.
- **Avoid:** letting him be quiet without a reason (when he is, it's a big deal and a little tender).

### Cushy (`cushion`)
- **What:** a living square cushion. **Pronouns:** they/them (own entry: "fluffs themself").
- **Job:** Furniture maker, owner of Cozy Nest. 7:00-17:00 (often asleep on the stock).
- **Home:** Cushy's Big Nest, Sugarloaf Lane, alone; Dusty next door, Bunbun across the lane. "A soft lilac house where every seat is half a bed, there is
  a cocoon swing in the corner and the canopy bed is never quite made."
- **Birthday:** 21 February.
- **Look:** a puffy square cushion pinched to a seam, big corner tassels (one still has a little pink on it), sleepy half-closed lids, lavender plush feet
  with a stitched seam and beads. The top corners lift like hands to wave. Twenty-two inches across (Sketch measured).
- **Voice:** slow, soft, "mm", trailing dots. Cozy philosophy. Sometimes dozes mid-sentence.
- **Personality:** the town's best listener; often awake with eyes shut, just listening; remembers only the nice things.
- **Loves/likes (gifts):** loves the Pillow Fort set and beds; likes drinks and the Cloud Nine set.
- **Loves / can't stand:** naps, rainy afternoons, the perfect sofa corner (still looking; "by the window where the light lands at four") / hard chairs
  ("they just never had anyone to tell them"), alarm clocks.
- **Dream:** a sofa so comfy the whole town naps on it at once; it goes round the fountain.
- **With the two of you:** your room is "a very good nest", the best compliment Cushy gives.
- **Furniture set:** **Velvet Hush** (quilted dusk carpet, velvet-stripe wallpaper, a Velvet door): plush lilac velvet with a channel-tufted chaise, canopy
  nap bed, tasselled pouf, bolster-nest pet bed, cocoon swing.
- **Makeover requests:** The perfect sofa corner; A rainy afternoon room; Tea for two, slowly.
- **Relationships:** Bunbun (best friend; Sunday tea, Cushy naps, Bunbun hums; she put Cushy on a chair in the bakery and said "stay"; Cushy gives her a heart
  cushion every Two-Heart Day, eleven so far); Dusty (found Dusty under the sofa display: "mm, you can stay"; knows Dusty straightens every cushion and calls
  them a little note; is secretly making Dusty a cushion from Stitch's scraps); Bolt (furniture partner: "he does the loud part, I do the soft part"; a sofa
  is two days of hammering and three of Cushy testing it by napping; Bolt borrowed Cushy's ladder to build Hammer & Hue); Stitch (fabric swaps: Cushy's covers
  are Stitch's leftovers); Boing (said no to the bouncy cushion, gently); Joy (undefeated at staring contests, because asleep); Blush (painted Cushy's tassels
  pink while they slept; Cushy kept it a week); Cobble (an afternoon side by side without a word, "the best talk"); Loofah (napped through a thunderstorm
  together; Cushy was underneath and stayed dry); Lumi (nap in shifts, wave across the yawns); Dr. Patch (best colleague, "a medically approved sleeper";
  they compare pillows); Prickles (Cushy stays awake for the sandstorm story and gasps at the good part); Posy (keeps a pillow on the park bench and moves
  the shade); Dewey (lends a cushion for the reading corner, then sits on it at story hour).
- **Running jokes:** asleep at Sunday tea; "Zzz... oh! Customers"; sleeping on display beds; judging the nap spots at Tools Down and falling asleep judging.
- **Established facts:** before the Nest Cushy "didn't really have a place" and "landed wherever"; once slept through Game Night's loudest round; woke when Joy
  shouted "DOUBLE POINTS"; has a daisy-embroidered pillow on the park bench; naps at noon on the bench; once slept through a whole bubble bath at the salon.
- **Avoid:** he/she for Cushy; making Cushy dim (sleepy, never slow-witted).

### Bolt (`builder`)
- **What:** an egg in overalls. **Pronouns:** he/him (own entry).
- **Job:** Builder, owner of Hammer & Hue (tiles, doors, windows, room size, paint). 7:00-17:00.
- **Home:** Bolt's Toolbox, Playhouse Hill, alone; Tock shares his toolbox fence, Cobble is a neighbour, Pixel close by. "A red-and-yellow toolbox of a house:
  a workshop that never quite closes, a fire to warm up by and a pallet bed Bolt built himself." (He says he lives "in a beige box. It came that way.")
- **Birthday:** 19 August.
- **Look:** egg body in overalls with straps, a ribbed hard hat, a pink mallet he taps things with (the mallet is "she").
- **Voice:** upbeat, practical, construction puns. "Chief", "let's nail it", "Gotta bolt!".
- **Personality:** loud part of every team; worries he's "all loud and no listening"; secretly sentimental.
- **Loves/likes (gifts):** loves the Work Nook for Two set and veggies; likes storage and the Backyard Campout set.
- **Loves / can't stand:** fresh paint smell, a good level, plans on paper / wobbly tables, beige.
- **Dream:** a house he built with somebody still living in it in a hundred years.
- **With the two of you:** takes your room personally; tapped your gate, fence and step and they all sounded happy.
- **Furniture set:** **Weekend Project** (plywood floor, blueprint wallpaper, a Plywood door): DIY maker style with a plywood armchair, sawhorse bench for two,
  pallet bed, tripod work light, pegboard tool wall, toolbox pet bed.
- **Makeover requests:** Plans on the table; Anything but beige; A nook for Bunbun's lunches.
- **Relationships:** Sketch (his planner; found Sketch's napkin drawing of a shelf at the Snack Shack; "Good call"; keeps Sketch's first napkin framed in the back
  room); Bunbun (lunch for oven repairs; loses the lunch in his hat or his van); Cushy (furniture partner); Blush (colour-name arguments: "it's ORANGE" / "apricot
  sunrise"; she buys all her paint from him; he writes "apricot sunrise" on his order forms when nobody's looking); Fizz ("brave"); Boing ("the kid"; springs by
  the barrel); Cobble (neighbour; "the only conversation I've ever finished"; Bolt talks bridges, Cobble says "Mm"); Tock (labels his tools: "Hammer, Bolt's";
  speaks in part numbers); Bobbin (borrows his small hammer every Tuesday and returns it with a thank-you note; he keeps a drawer of them and reads them on bad
  days, one framed); Dr. Patch (hammers his thumb every Tuesday; punch card; plasters in his toolbox); the Mayor (lends the giant ribbon scissors; eleven openings
  this year, including a bench; building bigger ones for the Summer Fair); Fold (asks for every sign "a bit bigger"; gets "a large medium"; Fold makes him paper hard
  hats for his birthday, six so far, he wears one to bed); Posy (built her a raised bed he can't find the corner of; got six tomatoes); Lumi (owes a bulb by the Snack
  Shack, "four tomorrows ago").
- **Running jokes:** things lost in his hat (pencils, sandwiches, hinges, the ribbon scissors); the Tuesday thumb; beige; "bigger".
- **Established facts:** built Hammer & Hue with one mallet and Cushy's borrowed ladder; the shop door hasn't changed in nine years; goes to the shop after closing to
  smell the paint; camps on the hill; best thing he ever built is the shelf over Bunbun's oven; carries the first brick out every First Brick Day and polishes it the
  night before; once built a better table halfway through Game Night.
- **Avoid:** letting the puns crowd out the warmth.

### Pom (`hair`)
- **What:** an antenna stylist with a named afro. **Pronouns:** they/them (decided; see chapter 8).
- **Job:** Antenna stylist, co-owner of Glow Up Studio (antennae restyles). 7:00-17:00.
- **Home:** Pom & Blush's Place, Bubble Bay, with Blush (best friends and co-owners). "Two bedrooms, two moods, one living room with a vanity that gets used all
  night. Pom's side is curly cane and loud, Blush's side is rose paint and quiet."
- **Birthday:** 4 August.
- **Look:** slim and curvy, an afro of curls (each curl a puff with its own spiral), a tool belt with fourteen pockets.
- **Voice:** fast, trendy, delighted. "Okay but hear me out", "iconic", "obsessed", "Hiii", "Byeee".
- **Personality:** all zoom; gets nervous before every appointment until the comb is in hand; worries about being too much.
- **Loves/likes (gifts):** loves the Groovy '70s set and grooming; likes sweets and lights.
- **Loves / can't stand:** trends, curls, making things pop / boring, flat antennae.
- **With the two of you:** has a mood board (now a wall) for `{a}` and `{b}`: `{a}` is "sunset festival", `{b}` is "midnight library". Lets `{b}` win when you argue
  about which head goes first.
- **Furniture set:** **Curl & Cane** (honey herringbone floor, cane-panel limewash walls, a Cane curl door): rattan and cane with a peacock chair, curl settee, fringe
  floor lamp, hanging cane pod, curl-frame mirror.
- **Makeover requests:** A livable mood board; Blush's quiet morning room; Somewhere to sleep, finally.
- **Relationships:** Blush (co-owner and best friend: Pom is fast, Blush is slow; Pom's up at six and does Blush's antennae while she sleeps, she wakes at nine and
  pretends not to know); Fizz (taught Pom to style: the first lesson was "make it pop"; "the original bubble legend"); Gloss (front desk; leaves Pom gaps in the
  book, hides the comb in the same drawer when Pom is late); Stitch (made the tool belt; Pom asked for eleven pockets, Stitch added three for things Pom hasn't thought
  of; Pom wears it to bed); Joy (styles her for every tournament: gold tips, a little spike, lightning bolts); Bunbun (does her ears for the fair); Loofah (the turban was
  Pom's idea); Bolt (asked what's trending in hard hats; Pom is now designing one); Beacon (wanted to style the top light).
- **Running jokes:** naming curls (42 named, then 43: Gerald, back left, shy, only out when it's humid; Brenda; Duchess at the top runs the afro and has her own gold
  comb; curl number one is unnamed, saved for "something big", maybe you two); being late; the tool belt in bed.
- **Established facts:** before Glow Up, did curls in their own kitchen for free; Blush came in for a trim and said "we should open a shop"; keeps twelve broken combs;
  Banana Thursday is Pom's favourite day; Pom twirls at music night; Pom's curls go flat in the salon steam (Blush fluffs them back).
- **Avoid:** he or she for Pom.

### Blush (`makeup`)
- **What:** a colour artist, pear-shaped and paint-flecked. **Pronouns:** she/her (consensus; see the note in chapter 1).
- **Job:** Colour artist, co-owner of Glow Up Studio (body and head colours, patterns). 7:00-17:00; best after lunch (Gloss).
- **Home:** Pom & Blush's Place, Bubble Bay, with Pom.
- **Birthday:** 6 October.
- **Look:** pear-shaped, paint flecks, lashes, pouty lips, a beret with paint on it.
- **Voice:** calm, artsy, a little poetic. Names colours ("apricot sunrise", "first coffee", "mouse at teatime"). Calls people "love".
- **Personality:** slow and observant; doesn't speak for the first hour of the day (Pom talks for both); worries she's too quiet for the studio.
- **Loves/likes (gifts):** loves the Music & Art Studio set and fruit; likes the Greenhouse Nook set and decor.
- **Loves / can't stand:** sunsets, naming colours, quiet mornings / clashing without a reason ("pink and orange can argue if they've something to say").
- **Dream:** to paint the moment just before a sunset; is painting the plaza with everyone in it (you two by the fountain; she can't get `{n}`'s shine right).
- **With the two of you:** `{n}` is the best canvas in town; she has a page of her colour journal for `{n}` (`{a}` blushes pink, `{b}` peach); you two are "a warm
  lilac, two shades that sit together so well you can't find the line".
- **Furniture set:** **Rose Atelier** (blush marble diamonds, rose boiserie, an Atelier door): a Parisian painter's atelier with a velvet chaise, easel vanity desk,
  palette pet bed, sunset canvas, peonies in a dabbed jug.
- **Makeover requests:** The colour of evening; A studio with good light; A guest room for Stitch.
- **Relationships:** Pom (co-owner and best friend; "Pom is fast, I am slow. Together we are exactly right."); Fizz (the glow argument; "I adore him"); Bolt (colour
  names; buys all her paint from him and says she doesn't); Stitch (steals ideas from Stitch's fabric palettes; Stitch sleeps on their sofa after fabric fairs);
  Cushy (painted their tassels pink while they slept); Gloss (books her "dreaming time", a spare half hour after every session); Loofah (folded its turban, pink
  "sleepy peony", fifth try); Posy (lets her sit in the garden trying to mix the green of a new leaf).
- **Running jokes:** naming every colour (Bolt's grey is "wet slate", Gloss's cap is "midnight plum", Bobbin's thread is "new pea", Loofah's cheeks "perfect
  temperature", the studio door "begin"); dabbing paint on anything nearby (the kettle, her beret, Pom's elbow).
- **Established facts:** keeps a colour journal, eleven books, one colour per day ("butter on toast", "rainy window"); eats fruit by colour each weekday (strawberries
  Monday, oranges Tuesday, bananas Thursday, grapes Sunday); when she was small everything looked grey until someone gave her a box of paints; does face paint and
  moustaches at Swap-Face Night.
- **Avoid:** making her vague; she is precise about colour.

### Stitch (`tailor`)
- **What:** a ball of yarn with a face. **Pronouns:** they/them.
- **Job:** Tailor, owner of Jelly Threads (hands, shoes, accessories). 7:00-17:00.
- **Home:** The Basket, Bubble Bay, alone. "Stitch's round sewing-basket house, with a thimble chimney, a treadle machine under the clothesline and a patchwork
  armchair for the long hems."
- **Birthday:** 22 May.
- **Look:** a ball of yarn wound in great circles, a cream face patch, a painted tape-measure band (Bobbin's crooked patch is on it).
- **Voice:** gentle and precise, sewing metaphors, "just a smidge", "sweet". A bit scattered.
- **Personality:** quietly devoted; sews everyone's things and nobody sews theirs ("I don't mind. Mostly.").
- **Loves/likes (gifts):** loves the Laundry Day set and drinks; likes the Bookworm Nook set and rugs.
- **Loves / can't stand:** soft wool, finishing touches, stripes that line up at the seams / loose threads, moths (watched with both eyes and a lavender bag).
- **With the two of you:** measures `{n}` with their eyes every visit; has a drawer of things "that might fit someday" (some waiting six years). Would make you
  "matching but not too matching" things.
- **Furniture set:** **Patchwork Cottage** (felt patch tiles, sprig-and-gingham wallpaper, a Patchwork door): granny-chic sewing room with a patchwork armchair,
  pincushion stool, spool-post quilt bed, yarn-basket pet bed, treadle sewing table, granny-square rug.
- **Makeover requests:** A roomy sewing nook; The drawer of someday things; Wool and naps.
- **Relationships:** Bobbin (their assistant, picked from a drawer of spools; Stitch made Bobbin's thimble bow; never tells Bobbin to slow down, just hands over another
  job; Bobbin checks Stitch's middle knot); Bunbun (made her apron; paid in scones: cheese Mondays, cherry Fridays, something seeded on Wednesdays); Cushy (fabric
  swaps); Boing (sews his plushies; unpicked him from the table; the unpicker lives by the door now); Joy (tournament costumes, with a cape); Pom (the tool belt); Fizz
  (silk robes); Prickles (mended his scarf twice, won't take payment; six jars of dried flowers on every windowsill); Fold (scraps swap: thread for paper; a drawer
  labelled "Fold"); Sketch (the only other tape measure; once gave Sketch a centimetre as a gift); Tock (taught it a running stitch; notes on tiny stitches and gears);
  Dusty (made the bow Dusty never takes off); Pip (made his cap; retied the bow twice); Gloss (mends her clipboard strap for free); Dr. Patch (fixed Patch's first
  stitches); Dewey (made the blue cloud towel for Nimbus at story hour); Blush (sleeps on her and Pom's sofa after fabric fairs).
- **Running jokes:** losing needles (they're usually in Stitch: "Hold still, Stitch"); unravelling a little when flustered (a duck kept a bit on the bridge); measuring
  twice and getting two numbers.
- **Established facts:** came to town as a ball of yarn in a shop window; someone bought them to knit with, then let them go instead; "every thread I use is a bit of
  me, so everybody in town is wearing a bit of me"; made the velvet box the first brick sits in and the town quilt with Bobbin on Quilt Night.
- **Avoid:** he/she for Stitch; jokes that unravel them for real.

### Joy (`joy`)
- **What:** the arcade host. **Pronouns:** she/her (consensus; see the note in chapter 1).
- **Job:** Arcade host, owner of Jelly Arcade. 7:00-17:00 (keeps the arcade lit late in the lore; she and Lumi wave across the plaza at ten).
- **Home:** The Game Night House, Playhouse Hill, with Boing. Pixel next door.
- **Birthday:** 25 February.
- **Look:** starry eyes (they sparkle on a win), a speaker-grille tummy, sneakers.
- **Voice:** energetic gamer, kind competitor: "Let's go!", "GG", "player one", "player two", "co-op team", game words for life ("respawn", "bonus level", "lag mood").
- **Personality:** started the arcade because she was lonely ("games are an easy way to say 'stay a bit'"); loses on purpose when someone needs a win.
- **Loves/likes (gifts):** loves the Game Den set and snacks; likes the Movie Night set and sweets.
- **Loves / can't stand:** high scores, cheering people on, pinball / lag, sore losers.
- **Dream:** a tournament where the whole town plays on one team.
- **With the two of you:** "the co-op team"; keeps a spot on the score board warm for `{n}` (second place, gaining).
- **Furniture set:** **Afterglow** (glow-grid tiles, sunset-gradient wallpaper, an Afterglow door): synthwave neon with a channel-tufted sofa, speaker pouf,
  cassette coffee table, soundwave neon sign, vinyl-record pet bed.
- **Makeover requests:** The co-op living room; A trophy wall, humbly; A cool-down room.
- **Relationships:** Boing (best buddy, housemate, Game Night co-host; made the doorways cheer); Pixel (her co-host and "favourite noise"; Pixel cheers in pink pixel
  hearts); Bunbun (the cookie thefts; "Definitely don't steal Bunbun's cookies. GG."); Fizz (Bubble Pop rivalry); Cushy (loses every staring contest); Stitch (costumes);
  Pom (styling); Lumi (late rounds: hot milk, one game, then lamps); Tock (writes all her scores in a notebook, even the low ones, with "good effort"); Dr. Patch
  (checks her wrists after every high score; wrist wrap = "a power-up"); Pip (guards the jam shelf like a goalie when she walks in).
- **Running jokes:** cookie theft; humming level-three chiptune (in her sleep too); blinking during staring contests; claps on the wrong beat (Echo slows down for her).
- **Established facts:** jogs three laps of the plaza in the morning; runs the ring toss at the Summer Fair (throw softly, aim for the back of the peg); hosts Topsy
  Day (draws the swaps from a hat the night before) and lights Fizz's Bubblework show from the arcade roof; trophies live in a sock drawer.
- **Avoid:** making her competitive in a mean way.

## 4.2 The shop assistants (home 7:00-13:00, in the shop 13:00-7:00)

Every shop has an assistant so it never closes. While the keeper is in, the assistant helps on the shop floor; after 17:00
the assistant takes the counter. Assistants invite you home at Regular.

### Pip (`jam`)
- **What:** a jar of strawberry jam. **Pronouns:** he/him (own sheet).
- **Job:** Apprentice baker, Snack Shack (boss: Bunbun).
- **Home:** The Jam Jar, Sugarloaf Lane, alone, **next door to Bunbun**. "A little berry-red studio flat next door to Bunbun, with practice batches on every
  shelf and every label a bit crooked." He can hear Bunbun's oven hum through the wall.
- **Birthday:** 28 October.
- **Look:** squat jar of glossy ruby jam with seed freckles, gold screw lid, red-and-white gingham cap tied with a twine bow, a cream label with a hand-drawn
  strawberry, big shiny eyes, yellow oven mitts (one holds a tiny whisk Bunbun gave him), round yellow feet. A drip of jam slides out from under the lid.
- **Voice:** earnest, out of breath. "Bunbun says", "Sorry!", "um". Apologises first, answers second. Says sorry to tables, jam and the ground.
- **Personality:** eager, nervous, devoted; a "crier, a sweet one" (Bunbun).
- **Loves/likes (gifts):** loves fruit and the Summer Fruit set; likes sweets and the Kitchen Café set.
- **Loves / can't stand:** Bunbun, jam that sets, the first customer, being handed the whisk / burnt sugar, dropping a tray (three times so far), "good enough".
- **Dream:** a batch start to finish with no help, and Bunbun saying "that's the one" (and, secretly, to be good enough that she can sleep in once).
- **With the two of you:** you're the judges of every recipe ("Is it too sweet?" before you've swallowed); `{n}` tastes first.
- **Furniture set:** **Berry Patch** (rosy cherrywood, berry-vine wallpaper, a Potting shed door): a jam kitchen with a fruit-crate armchair, seed-tufted loveseat,
  preserve-jar pet bed, jam tasting table, recipe card board, berry barrow.
- **Makeover requests:** A test kitchen corner, um; A bedroom that isn't sticky; A place to show Bunbun.
- **Relationships:** Bunbun (idolises her; copied her spoon grip for three weeks; practises her hum but goes down at the end where it goes up; keeps her recipe card
  under his lid); Joy (his nemesis: he guards the jam shelf with his arms out like a goalie); Stitch (made his cap); Boing ("stirring" toys; a spinning top fell in
  the jam; calls Pip "the jam kid"); Scone (gave him a jam tart "for being brave"; Scone thinks Pip is the coolest because he's only a bit grown-up); Crumb (lets her
  taste first because she tastes carefully; "Crumb says the important bits"); Bobbin (started their jobs the same week; a nervous lunch; gives Bobbin broken jam
  tarts, breaking them on purpose); Fold (offered to letter his jars; folded him a paper whisk he uses for small batches).
- **Running jokes:** the drip; jammy fingerprints on the till; crooked labels ("Batch 12, too runny." "Batch 14, good? Ask Bunbun."); going red, which nobody can see
  because he's a red jar.
- **Established facts:** was on a back shelf until Bunbun picked him up ("you look useful"); his first day he stirred so hard it went everywhere and she handed him a mop
  and a cookie; tries the cold-plate test eleven times; talks to his jars at night (Batch 14 is the best listener); jam leaks when he's happy; does deliveries with
  "the real basket"; drew the rabbit on the cloth Bunbun wraps Parcel's roll in.
- **Avoid:** making him incompetent; he's getting good.

### Loofah (`sponge`)
- **What:** a sea sponge in a towel turban. **Pronouns:** it (own sheet).
- **Job:** Spa helper, Bubble Salon (boss: Fizz).
- **Home:** Loofah's Sunny Hut, Bubble Bay, alone, next to Fizz. "Butter-yellow outside, warm cedar inside, with a hot stone stove, a bench for two and a soaking tub.
  There is always a warm towel and a kettle on." One big bath in the middle; it sleeps in a hammock over it (has fallen in twice, once on purpose).
- **Birthday:** 20 October.
- **Look:** plump butter-yellow sponge, wider than tall, soft darker pores (face left smooth), a pink towel turban with a lighter band and a dollop of lather in the knot
  ("for bubble emergencies"), sleepy-happy eyes, rosy cheeks, blue flip-flops with orange straps.
- **Voice:** slow, warm, beach-spa calm. "Mm", "no rush, no rush". Hums between lines (a different tune for every weather).
- **Loves/likes (gifts):** loves the Seaside Shack set and grooming; likes drinks and the Bubble Bath set.
- **Loves / can't stand:** warm water, the first bath of the morning, folding towels warm, Fizz's good days / cold tiles, being rushed, anyone calling the shop "busy" loudly
  ("I say it's full").
- **With the two of you:** a warm towel before hello; remembers `{a}` likes the water hotter; saves you the corner spot by the window (tells others it's wet).
- **Furniture set:** **Cedar Steam** (cedar duckboards, cedar slat wall, a Sauna door): a sauna and steam room with a slatted bench for two, rolled-towel pouf, cedar
  daybed, hot stone stove, sand timer and steam dial.
- **Makeover requests:** A towel-warm bedroom; Nap room for two sleepers; A little spa at home.
- **Relationships:** Fizz (the only one who can calm him: a hand on the shoulder, "no rush, Fizz"; Fizz picked it off the salon shelf: "you're staff now"); Pom and Blush
  (share the laundry room; Friday swap of towels for a face mask; Blush folded the turban, Pom's idea; Blush puts cucumber on it); Cushy (napped through a thunderstorm
  on the bench outside; Loofah came out three times its size); Bunbun (warm buns in the steam on slow afternoons); Beacon (helped it up the beach after a swim, "steady",
  like a boat; brought it a shell for its bath; Loofah naps on Beacon's warm step); Gloss (books it a lunch break it never takes, then a nap it always takes); Bobbin
  (fell asleep holding Bobbin's thread end).
- **Running jokes:** the slow squeeze that lets bubbles out of the turban; testing bath water "with an elbow", having no elbows; naps at four.
- **Established facts:** sun-dries the towels on a line (Fizz prefers the dryer); went in the sea once, too cold; wants a little yellow bath boat called "Mm" (or a duck).
- **Avoid:** rushing it; making it dim.

### Tock (`windup`)
- **What:** a vintage tin wind-up toy. **Pronouns:** it (own sheet).
- **Job:** Stock keeper, Toy Box (boss: Boing).
- **Home:** The Clockwork Cottage, Playhouse Hill, with **Sketch, its partner** (they met comparing rulers). "Tock and Sketch keep a tidy house: every drawer labelled,
  every plan checked twice, tea at four." Bolt is over the toolbox fence.
- **Birthday:** 8 October.
- **Look:** a chubby egg of teal tin with a red stripe and brass rivets, a cream face plate, round dial ears with ticking needles, red tin shoes, cream hands with red
  cuffs, and a brass butterfly key on its back that turns as it moves.
- **Voice:** quiet, exact, a little formal. Counts ("Three, actually"). Says "tick" when thinking. Never raises its voice.
- **Loves/likes (gifts):** loves the Work Nook for Two set and storage; likes grains and the Bookworm Nook set.
- **Loves / can't stand:** a full shelf count, labels, matching pairs, a clean spring, winter (nobody feels behind) / unlabelled boxes, things in the wrong bin, being
  rushed mid-count.
- **With the two of you:** valued regulars; remembers what `{n}` played with (fourteen toys by its ledger, two may be under a cushion); quietly pleased when you put things
  back. Its ledger line on you: "Two regulars. Put things back. Brought joy, counted once, kept."
- **Furniture set:** **Clockwork Parlour** (clockmaker's parquet, gear damask, a Clockwork door): a horologist's parlour with a tin armchair, tin settee for two, pocket-watch
  pet bed, cog side table, wall of clocks, wind-up carousel.
- **Makeover requests:** Shelves with labels. Many; Evenings with Sketch; Somewhere to wind down.
- **Relationships:** Sketch (partner; "We measure things together"; they own five rulers; set the house's twelve clocks together every morning at seven, Sketch reads and
  Tock sets; Sketch turns its key in the afternoon, two turns, gently; they play chess with the clocks, each move a whole tea; they give each other the same sweet every
  Two-Heart Day); Boing (boss and opposite; Tock winds him down with tea; Boing sits with Tock during "Tock time"; Tock was the first toy Boing built that didn't bounce:
  "you tick, so you stay"); Bolt (part numbers: 411 brackets, "seven-seven" a small brass hinge; Bolt once fixed its key, "a happy key"); Stitch (tiny stitches and gears;
  taught Tock a running stitch); Joy (keeps her scores in a notebook, 304 of them, the low ones marked "good effort"); Parcel (count the letters together and never agree;
  Parcel counts the hello as one); Pixel (admires its sorted ticket jar; they check Joy's scores against each other and always agree).
- **Running jokes:** winding down every afternoon (slower, droops, ears sag) then cranking up with a tick tick; correcting Boing's numbers gently (87 tops, not "about a
  hundred"); "forty-one rattles".
- **Established facts:** its key is brass, from an old music box, and still plays three notes; keeps a ledger of every toy that left the shop (4,009, "the best book I own");
  sleeps sitting up so the key doesn't bend (Sketch put a cushion behind it); 312 steps from home to the shop (200 if Boing carries it); when Scone wound up every toy in
  the shop it took sixty-one minutes to put them back and Tock said "Thank you for winding them."
- **Avoid:** he/she for Tock; making it cold. It is very warm, quietly.

### Dusty (`dust`)
- **What:** a dust bunny. **Pronouns:** it (own sheet).
- **Job:** Showroom helper, Cozy Nest (boss: Cushy).
- **Home:** Dusty's Tidy Nook, Sugarloaf Lane, alone; next to Cushy, across the lane from Bunbun (who leaves her porch light on). "Everything has a label and a place, and
  there is exactly one thing in the house that Dusty bought just because it was pretty: the feather mirror."
- **Birthday:** 8 June.
- **Look:** a round lavender-grey puff of overlapping fluff with a pale face patch, huge shy violet eyes, worried brows, pink cheeks, two fluff tufts on top (one with a
  hot-pink bow from Stitch, never taken off, not even for baths), lilac nub feet, a pastel feather duster.
- **Voice:** soft, quick, apologetic. "Oh, sorry", trailing off, whispers the prices. Apologises to fluff, lamps, chairs and doors.
- **Loves/likes (gifts):** loves the Zen Tea Room set and storage; likes drinks and the Laundry Day set.
- **Loves / can't stand:** a cushion that sits perfectly square, sunbeams (they show the dust; the shop goes gold at about four), being useful without being noticed /
  fingerprints on display tables, glitter, its own sneezes.
- **Dream:** a room so tidy it never needs Dusty, so it could sit on the sofa, just once.
- **With the two of you:** hides behind the sofa display, then peeks out; quietly delighted when you move furniture (fresh dust).
- **Furniture set:** **Attic Keepsakes** (whitewashed attic boards, faded-rose wallpaper, an Attic door): a soft vintage attic with a slipper armchair, brass daybed, hatbox
  pet bed, birdcage lamp, colour-sorted bookcase, feather oval mirror, cathedral radio.
- **Makeover requests:** A sunbeam room, oh sorry; A small hiding nook; A guest room for Cushy.
- **Relationships:** Cushy (the boss it admires most; straightens every cushion Cushy flops on; calls Cushy "Cushy" very quietly in case it wears out; Cushy found it under the
  sofa display); Bunbun ("the other bunny", a comparison Dusty is sure is a mistake; cookies by the stockroom door weekly in a paper bag; returns her cookie tin, she
  refills it); Bolt (sawdust on the doormat; Dusty sweeps up and is too polite to say; once kept a screw that fell from his hat); Stitch (the bow; found three needles in
  Dusty's fluff; gave Dusty a lint roller for its birthday); Dr. Patch (prescribed a hanky with a heart); Tutti (helped pick up every sprinkle after the sprinkle disaster).
- **Running jokes:** enormous sneezes in a burst of fluff ("sorry" to the fluff); "Forty-two cushions. Forty-three when Cushy sits down."
- **Established facts:** "I sneeze because I'm made of what I clean"; keeps the first bit of fluff it ever made in a jar; fluff grows back by teatime; collects petals from
  Posy's path for a jar; practising doing nothing on a day off.
- **Avoid:** they/he/she for Dusty; letting the apologies make it pitiable.

### Sketch (`pencil`)
- **What:** a stubby hexagonal pencil in glasses. **Pronouns:** it (own sheet).
- **Job:** Planner, Hammer & Hue (boss: Bolt).
- **Home:** The Clockwork Cottage, Playhouse Hill, with **Tock, its partner**. A star chart in the attic (Tock labels the constellations; one is named after Bolt); a door
  drawing on its wall that leads nowhere ("my thinking door", Tock calls it).
- **Birthday:** 31 May.
- **Look:** lime-green hexagonal pencil about half as wide as tall with rounded candy edges and two cream stripes; a wood cone top with a green lead tip like a party hat and
  a wood-shaving curl on the side; a silver ferrule on a round pink eraser base; big blue eyes behind round grape glasses; noodle arms holding a rolled blueprint and a
  pink eraser block.
- **Voice:** careful, a bit anxious, short sentences, numbers, "double-checked", "Sorry." Apologises before disagreeing, then turns out to be right.
- **Loves/likes (gifts):** loves the Bookworm Nook set and tables; likes snacks and the Stargazer set.
- **Loves / can't stand:** graph paper ("a square for everything"), sharp points, a plan that works first time, Bolt saying "good call" (tally: forty-one), square tables /
  pens, rounding numbers ("where does the point four go?"), measurements taken once.
- **Dream:** a plan that works the first time with no rubbing out (it has happened once: Bunbun's pantry, every jar in its square; she cried, so did Sketch, then a muffin).
- **With the two of you:** shows you plans for your room with a `{n}`-sized gap (and a bigger kitchen with a snack shelf after `{n}` sat on the blueprint); remembers every
  room size you've bought.
- **Furniture set:** **Drafting Room** (birch strip floor, graph-paper wallpaper, a Drafting door): an architect's studio with a hex drafting stool, drafting table, architect
  lamp, plan chest, pinned plan board, crank pencil sharpener, pencil-tin pet bed.
- **Makeover requests:** A desk that's level. Double-checked; A cushion-sized gap; A plant that stays put.
- **Relationships:** Tock (partner; met comparing rulers: Sketch apologised for having the same ruler, Tock said the world could use two); Bolt (boss; idolises his
  confidence, fixes the measurements he skips; Bolt found its napkin plan and framed the first one); Fold (shares sketches: every sign in town has one of Sketch's straight
  lines and one of Fold's curves); Stitch (the only other tape measure; the 1.2 m vs 1.21 m curtain); Cushy (the "cushion-sized gap" turned out to be Cushy, 22 inches);
  Boing (bounces too much to measure: "about Boing-sized", now a unit); Dewey (a shelf at the library for its drawings and a drawer labelled "not yet"; lent it a book on
  bridges, "a pleasure"); Pixel (seventh on Pixel's leaderboard after one careful hour; found the 9,001st screw in Bolt's hat).
- **Running jokes:** a purple mistake-line appears in the air and gets rubbed out (pink crumbs), then it pushes its glasses up, quietly proud; rubbing out a line and putting it
  back exactly; Bolt's pencil in his hat is one of Sketch's.
- **Established facts:** used to draw plans on napkins and throw them away; its first plan had no door ("a very safe building"; Bolt forgot the roof on the next one); fears
  getting too short from sharpening (Tock says they'll measure it out together); Fold made it a paper ruler for its birthday, its favourite ruler; measured the Town Hall
  steps with Stitch (the Mayor gave a three-part speech; they were part two).
- **Avoid:** he/she for Sketch; the name "Pencil".

### Gloss (`polish`)
- **What:** a nail-polish bottle with a beehive cap. **Pronouns:** she/her (own sheet).
- **Job:** Front desk, Glow Up Studio (works for Pom and Blush; she can book their services herself).
- **Home:** Number Two, Bubble Bay, a flat shared with **Bobbin** (flatmates). "Gloss and Bobbin share a bottle-and-spool flat: a glossy pink room, a ribbon-and-hammock room,
  a dinner table for two and a very full appointment book." Pom and Blush are close by.
- **Birthday:** 4 December.
- **Look:** squat rounded-square bottle of glittery pink-to-grape jelly with painted flecks and a few five-point glitter stars, a gold collar, a tall black-plum beehive cap
  ("midnight plum", per Blush) with a gold swirl and a pink bow, lashed violet eyes, a glossy red lipstick smile, a clipboard always in hand, round pink shoes with tiny gold
  heels.
- **Voice:** sunny and tidy; neat sentences; confirms everything twice ("Confirmed. Twice."); "lovely", "perfect"; hums a jingle when she writes you in ("Doo-doo-dee, booked
  for thee").
- **Loves/likes (gifts):** loves the Date Night set and grooming; likes sweets and the Groovy '70s set.
- **Loves / can't stand:** a full appointment book, colour-coded tabs, a cap clicking shut, arriving five minutes early / double bookings, smudges, "just squeeze me in"
  ("Squeezing is for lemons").
- **With the two of you:** regulars from your first visit; a gold tab with your names that she cut on the first day ("I didn't know you yet. I hoped"); `{n}` has its own tab,
  lime and blue split down the middle; she knows when `{n}` is due a restyle (the antennae droop on day nine).
- **Furniture set:** **Lacquer Pop** (confetti terrazzo, Memphis squiggle wall, a Memphis door): bold Memphis pop with a pill-back lacquer sofa, ribbed-cap stool, half-moon pet
  bed, colour-tab cabinet, sticky-tab calendar, mirror folding screen.
- **Makeover requests:** A dressing room, booked; A calm room for Bobbin; For the early arrivals.
- **Relationships:** Pom (leaves Pom gaps so Pom is never late on paper; hides the comb in the same drawer when Pom is late; Pom hums her first-timer jingle in the shower);
  Blush (never rushes her; books her "dreaming time"); Bobbin (flatmate: Bobbin is fast, Gloss is tidy; they swap keys by accident every morning; "Teapot: no thread";
  Bobbin's label for her says "Gloss: lovely"; some nights they sit together in silence); Stitch (swaps appointment book for pattern book; clipboard strap mended free);
  Bunbun (orders the studio's three o'clock cakes; napkins in triangles; they agree on everything); Fizz ("darling" / "on time, please"; she booked him a nap in his own
  salon); Loofah (books it a nap); Beacon (offered it a polish, "starting at the top").
- **Running jokes:** checking her hand mirror and tutting at nothing ("so nothing gets the idea it can be wrong"); patting the beehive; knowing everyone's schedule
  ("Pom's late, Blush is dreaming, Bunbun's on her second batch, and Beacon is waving at a log").
- **Established facts:** sat on a shelf for a whole year being very good at waiting; Pom hired her before she'd said hello ("you, the one with the neat tabs"); six tab colours
  (pink Pom, lilac Blush, mint walk-ins, gold regulars...), seven on festival weeks; forty polishes, number thirty-seven never worn; likes knowing where everyone is "because
  it means nobody's lost"; nobody has ever pencilled her in.
- **Avoid:** making her bossy; she's kind through order.

### Bobbin (`spool`)
- **What:** a wooden spool of mint thread. **Pronouns:** they/them (own sheet).
- **Job:** Errand runner, Jelly Threads (boss: Stitch).
- **Home:** Number Two, Bubble Bay, with **Gloss** (flatmates). Their room: a hammock between two big bobbins, a wall of tiny labelled drawers, a pincushion armchair, a cedar
  block from Stitch (the drawer they came from smelled of cedar).
- **Birthday:** 8 June.
- **Look:** knee-high wooden spool, light wood flanges, middle wound with ridged mint-green thread ("new pea", per Blush), a cream felt face patch with pink stitching, teal
  eyes, nose bead, open happy mouth; a silver thimble hat with a pink bow (Stitch made the bow); a needle tucked in the side like a feather; thread arms; pink felt shoes; a
  loose thread end that trails like a tail.
- **Voice:** fast, breathless, "and also", starts the next sentence before finishing the last. Never rude.
- **Loves/likes (gifts):** loves snacks and the Birthday Bash set; likes the Laundry Day set and fruit.
- **Loves / can't stand:** running errands, Stitch's humming, new buttons, a small job, birthday streamers ("very happy thread"), laundry day / being told to wait, tangles, cats.
- **Dream:** to sew a whole coat (mint, with a pocket inside a pocket); "start with a button," says Stitch, and they did.
- **With the two of you:** VIP customers; brings the tape measure before you ask; gets visibly excited when `{n}` comes in.
- **Furniture set:** **Errand Flat** (pale ash boards, ribbon-stripe paper, an Errand door): a bright errand-runner's flat with a spool side table, bentwood ribbon chair,
  bobbin-post hammock, labelled drawer tower, delivery-crate pet bed, errand wagon.
- **Makeover requests:** Room to spin; Button collection corner; Bed with no tangles.
- **Relationships:** Stitch (adores them; Stitch picked them from a drawer of a hundred spools because they were the one rolling about; Stitch never tells them to slow down);
  Gloss (flatmate); Bolt (borrows the small hammer every Tuesday for buttons, returns it with a thank-you note in three colours); Beacon (knitted its blue-and-cream scarf
  in nine days and two nights; dropped a stitch near the end, Beacon said keep it; asks after it every week and spins when told it's warm); Fizz (gets bubbles in their
  thread and laughs; the only one who does); Pip (started the same week; broken jam tarts); Joy (runs the ticket errands); Loofah (fell asleep holding their thread end).
- **Running jokes:** always slightly unspooling; the idle spin on one flange; getting lost on errands and following their own thread home; eleven trips to the back room for one
  spool of grey.
- **Established facts:** "I'm new here"; a button collection carried everywhere (41, then 42); keeps a bit of thread from every place they've been, favourite the bit that
  caught on your door the first time you came in, tied round the thimble; scared of running out of thread; patched Stitch's band (crooked; Stitch's favourite); judges
  Wrapping Eve and is secretly the best bad wrapper.
- **Avoid:** he/she for Bobbin; the name "Spool".

### Pixel (`pixel`)
- **What:** a cube built of candy voxels. **Pronouns:** it (own sheet).
- **Job:** Co-host, Jelly Arcade (boss: Joy). In the lore its shift starts at one.
- **Home:** Pixel's Stack, Playhouse Hill, alone, next door to the Game Night House ("close enough to hear Game Night rehearsals through the wall"). "A tidy cottage built out of
  cubes: a gaming desk, a couch for one, a ticket jar sorted by colour and a voxel bed." Its window glows lime at night; Joy says it looks like a save point.
- **Birthday:** 9 April.
- **Look:** chunky cube of 21 glossy voxels, cyan at the feet fading to grape on top, a dark screen face lit in lime pixels (eyes, blink, ^ ^ when happy, pink pixel hearts
  when cheering), block arms, wide feet, a yellow antenna pixel, a gold +1 coin bobbing over its head.
- **Voice:** deadpan, quiet, short sentences, numbers, scores out of ten. "Noted." "GG." Never exclaims.
- **Loves/likes (gifts):** loves the Game Den set and snacks; likes the Movie Night set and lights.
- **Loves / can't stand:** counting tickets, round numbers, Game Night, a clean leaderboard, quiet games, two (a good number) / lag, uneven ticket stacks, being asked to show off.
- **With the two of you:** counts your tickets out loud (once exactly a hundred, "I was very happy about it. You couldn't tell."); `{n}` is eighth on its leaderboard; you're on
  its "good list" (six names); its friend count went from nine to fourteen and "two of the new ones are you".
- **Furniture set:** **Voxel Cottage** (pastel pixel tiles, stepped-sky wallpaper, a Voxel door): a blocky pastel cottage with a block couch, cube stool, voxel bed, blocky tree,
  high score frame, glitchy puzzle cube.
- **Makeover requests:** Couch. Screen. Done; The scoreboard room; Game Night overflow.
- **Relationships:** Joy (boss and "favourite noise"; she cheered when it said it wasn't a people person, and nobody had cheered for it before); Boing (Game Night co-host;
  the bet on who tires first, which Pixel wins by standing still; the loser does the dishes); Fizz (has never beaten Pixel at Bubble Pop; Pixel has never mentioned it;
  Fizz suspects); Bunbun (the Friday cookie at the ticket counter, gone by Saturday; nobody has seen who took it); Tock (they check scores against each other and always
  agree); Bolt (counted his screws: nine thousand; "Good call, kid").
- **Running jokes:** the glitch (voxels drift apart and snap back; it pretends nothing happened); the Friday cookie; secretly the best player in town ("I've had some practice").
- **Established facts:** came out of the arcade's back room one night; "nobody built me. I just was. Counting"; its name is on every cabinet's top score under the fake name
  "AAA"; has yelled once (at a claw machine, "hey", logged); forty-one films watched, sits second row middle with the snack on the left; the arcade is 72 degrees in winter
  and the pinball table is the warmest spot.
- **Avoid:** exclamation marks; he/she for Pixel.

## 4.3 The townsfolk (neighbours with their own jobs; out on their rounds for set hours, home otherwise; doors open whenever they're home)

### Mayor Marsh (`mayor`)
- **What:** a marshmallow. **Pronouns:** he/him (own sheet).
- **Job:** Mayor. At the Town Hall 9:00-15:00 (his office, the guest book, the cheer chart). Hosts the Saturday bake sale at home for the town fund.
- **Home:** Marsh Manor, Lantern Meadow, alone. "Mayor Marsh lives behind a very small pair of columns. The ribbon on the gate is always freshly cut." A balcony he waves from,
  a hat stand with seven identical top hats (one for each day of the week).
- **Birthday:** none. He has never known his own ("Campfires do not keep records") and celebrates **First Brick Day** (14 September) as his. (`bdayOf` returns 14 September for him.)
- **Look:** plump pillowy marshmallow cylinder with a lightly toasted golden top, a little black top hat with a pink band tipped to one side, round gold spectacles, a curly
  brown moustache (curled each morning with a warm spoon; a secret), pink bow tie, pink-and-lime sash with a gold rosette, white mitts, shiny black shoes, a small wooden gavel.
- **Voice:** pompous in the sweetest way. Full sentences, announcements, "Ahem", "dear resident(s)", speeches in three parts with a joke (it concerns a goose). Deflates into a
  mumble when touched ("Oh. Well. Ahem. Quite. Yes.").
- **Loves/likes (gifts):** loves sweets and the Festive Holidays set; likes the Date Night set and decor.
- **Loves / can't stand:** ceremonies, ribbon cuttings, the first of anything, remembering everyone's birthday, a three-part speech / hot afternoons (he gets sticky and
  apologises to handrails; "softening is in the regulations"), cutting a ribbon before the speech ends, an empty guest book.
- **Dream:** a ribbon so grand the scissors must be fetched from Bolt's workshop on a cart, for something "we all built together"; and a day when everyone is in one place and he
  can say "well done, all of you".
- **With the two of you:** the town's founding couple, "the founders"; guests of honour at everything; both your birthdays are in his big book in ink with a cake drawn beside
  each; `{n}` is Citizen of the Month every month (the committee is him; the vote is unanimous).
- **Furniture set:** **Ribbon Hall** (harlequin marble, ribbon-swag paper, a Ribbon Hall door): grand civic parlour with a puffy chesterfield, guest-book desk, rolled-speech
  cabinet, ribbon-cutting posts, laurel oval rug, pennant bunting, gilt bow mirror.
- **Makeover requests:** A parlour for receiving guests; The birthday book study; Somewhere to be off duty ("one room where he is not the mayor").
- **Relationships:** Bunbun (a warm bun at ten, declared a municipal holiday, daily); Bolt (lends the giant ribbon scissors; the Mayor has promised to return them, several
  times; once kept them a month and Bolt came round with a cake and a note saying "please"); Fizz (laughs at every joke, so is invited to everything; "on paper, my favourite
  resident"); Lumi (lights the lamp outside his house first; he waves from the balcony); Dewey (he freed Dewey from a drawer; Dewey once stamped his speech "overdue");
  Cobble (opened Cobble's bench twice, same speech; practises speeches on Cobble's wall); Scone and Crumb (they stare at the moustache and lose; they count his ahems at the bake
  sale, record thirty-one); Nimbus (forecast rain on his ribbon cutting; it rained only on him); Echo (asked for a town song; Echo played him a very slow march home); Posy
  (a flower in his sash, pressed in the birthday book); Parcel (most of his mail is speeches he posts to himself).
- **Running jokes:** municipal holidays; three-part speeches; ribbons; "the pigeons are on probation"; tipping his hat to every lamp post.
- **Established facts:** was a marshmallow in a campfire bag; toasted just right, everyone cheered, he stood up on the log and "nobody asked me to get down"; opened the fountain
  three springs ago (please do not splash the plaque); keeps the uncut ribbon from his first ceremony; the birthday book has an empty page at the back; wore a straw sun hat once
  at the Spring Picnic and nobody recognised him (he gave a speech to a duck); favourite festival: the Festival of Lights ("Let there be lamps"); doesn't bake ("a marshmallow
  keeps a respectful distance from ovens"); has a drawer of festivals, one just for spoons; gives the speech to the empty plaza after hours (the pigeons were his first audience).
- **Avoid:** making him a fool or a tyrant; he's sincere.

### Parcel (`parcel`)
- **What:** a cardboard box mail carrier. **Pronouns:** they/them (own sheet).
- **Job:** Mail carrier. On the round 8:00-12:00 (Sugarloaf Lane at half past nine; always loses their place on Bubble Bay). Delivers parcels between the two of you.
- **Home:** The Paper Post, Playhouse Hill, with **Fold** (flatmates). "Parcel sorts the mail by the door and Fold folds things in the room upstairs-ish, and everything in between
  is labelled twice." The kettle says "KETTLE" in Fold's lettering and "DELIVERED" in Parcel's stamp.
- **Birthday:** 24 September.
- **Look:** chunky kraft-brown box with a tape stripe and folded flaps; an address-label face (pink heart stamp, faint postmark), big blue eyes; heart FRAGILE stickers with no
  words; a sky-blue postal cap with a lime brim and heart badge; a sky-blue satchel (ten years old, unnamed); boots with lime laces that squeak on the wet bridge.
- **Voice:** cheerful, quick, on schedule; weather and routes in one breath ("light drizzle on Maker's Lane, so I took the long way"); exact times ("ten past nine").
- **Loves/likes (gifts):** loves snacks and the Road Trip Motel set; likes drinks and storage.
- **Loves / can't stand:** stamps (they taste of cherry, Parcel is almost sure), a dry morning, knowing which door is which, a hand-drawn heart / wet cardboard, a missing house
  number, a letter with no name.
- **Dream:** a post office on the plaza with a cubby for every house (Sketch fixed the measurements, Fold lettered the cubbies; yours is the first, with a lime and blue door);
  a road trip round the whole coast.
- **With the two of you:** "the two-door house"; hands you notes from each other before hello and waits to watch you read; saves your house for last.
- **Furniture set:** **Sorting Office** (post-office lino, airmail wallpaper, a Post office door): a cosy sorting office with a cardboard armchair, string-tied sofa for two,
  pigeonhole shelf, pillar-postbox lamp, big rubber stamp, canvas mailbag pet bed.
- **Makeover requests:** The sorting room; Dry on rainy days; A guest room for travellers.
- **Relationships:** Fold (flatmate; Fold paints, Parcel reads every sign out loud on the round; Fold leaves a paper heart on the satchel whenever Parcel compliments a sign, a jar of
  them now; a letter with no name went round for a fortnight and was from Fold to Parcel); Bunbun (a roll saved for the second stop, still warm at the sixth; she walked Parcel
  round every street on the first day); Tock (count the letters together, never agree); Nimbus (lent Parcel a pink umbrella with yellow scallops); the Mayor (gets the most
  mystery mail; posts his speeches to himself); Beacon (writes to boats; Parcel secretly writes back; carries post to the end of the pier); Tutti (sends the twins letters from the
  cart, ten metres away); Joy (her weekly fan mail is from Boing); Dewey (overdue books come back by post with apology notes); Cobble (his letterbox is a stone with a slot).
- **Running jokes:** knocking twice ("once to say hello, once to say it's me"); "ten past nine"; checking the satchel when idle; whistling to cover squeaky boots.
- **Established facts:** has carried the mail since the town had four houses; 53 doors (54 with the top of Beacon's lighthouse); a map of the town on the sorting-room wall with a pin
  for every door (yours lime and blue; empty lots white); keeps an unaddressed letter that says "thank you for always knocking twice" in the satchel, never to be delivered; wrote a
  route song, "Ten Past Nine", sung in the bath; helps carry cakes at the Saturday bake sale.
- **Avoid:** he/she for Parcel (the town-life UI said "his" until 2026-10-04); making them nosy (they only read the outsides).

### Fold (`crane`)
- **What:** an origami crane. **Pronouns:** they/them (own sheet is silent).
- **Job:** Sign painter (and papercraft). Out painting signs 10:00-14:00; stands in the sun a lot (paint dries faster).
- **Home:** The Paper Post, Playhouse Hill, with Parcel. A work table under the window, a wall of pinned crane tests (the first, crooked, framed), a basket labelled "for later".
- **Birthday:** 24 July.
- **Look:** flat paper facets with crisp creases: a two-tone pink body, round faceted head, big glossy dot eyes, pink blush, a gold beak and a red crown fold; lime washi wings in three
  panels with wave arcs; thin folded legs, triangle feet, a pointed tail, a tiny paintbrush under one wing.
- **Voice:** quiet, precise, poetic about corners and creases; short sentences, long pauses; apologises to the weather; formal ("It is", "I will").
- **Loves/likes (gifts):** loves the Music & Art Studio and Zen Tea Room sets; likes fruit (plums: "a finished shape") and decor.
- **Loves / can't stand:** a clean crease, the corner of a fresh sheet, the curl of a sign letter, giving tiny paper gifts, summer / rain and damp, being unfolded, a dog-eared edge.
- **Dream:** to paint one sign so well nobody notices it's a sign, only that the street looks happier; one day to paint the door at the end of the lane ("the corners need a rehearsal").
- **With the two of you:** folds you and `{n}` a gift each visit (a boat, a frog, a heart; "it was nothing", "it was the wind"); asks which corner of your room you like best.
- **Furniture set:** **Folded Paper** (folded-paper floor, washi-wave wallpaper, an Origami door): origami everything, with a folded-paper armchair, fan-back bench for two, paper-boat pet
  bed, paper lantern lamp, hand-painted signboard, giant pinwheel.
- **Makeover requests:** A corner that catches light; Paper gifts need a home; A quiet room to unfold.
- **Relationships:** Parcel (flatmate: "collaboration" vs "stamping"; loud in the mornings vs quiet in the evenings, they meet at tea); Stitch (thread for paper; nobody keeps score,
  Stitch is slightly ahead); Bolt (signs "a bit bigger"; Fold gives "a large medium" and he hasn't noticed in four years, or has; paper hard hats for his birthday); Sketch (one straight
  line of Sketch's and one curve of Fold's on every sign: the Toy Box sign's O is Fold's, the underline Sketch's); Dewey (a shared worry about corners); Nimbus (a very polite friendship
  of mutual apologies); Pip (folded him a paper whisk); the Mayor (painted the Town Hall sign, letters leaning left "for warmth"; a three-part banner).
- **Running jokes:** paper gifts blamed on the wind (everyone pretends to believe it, "that is also a gift"); folding losing cards into cranes at Game Night; refolding a wing with a small
  crinkle and a nod.
- **Established facts:** "I was one sheet in a drawer, and then someone made a crease, and I became a someone"; first sign hangs by the fountain, its arrow points a little up, kept crooked
  on purpose; rain once got the left wing and Fold wore Parcel's paper bag for a week (Parcel drew a worried face on it); afraid of being unfolded flat; paints a tiny heart on signs when
  pleased; hosts Swap-Face Night and makes paper masks for anyone who forgot.
- **Avoid:** he/she for Fold; long sentences.

### Posy (`posy`)
- **What:** a terracotta flower pot. **Pronouns:** she/her (own sheet).
- **Job:** Gardener (the park and the plaza flower beds). Tending the park 7:00-11:00. Gives seeds as a job.
- **Home:** The Potted Lodge, Lantern Meadow, with **Prickles, her partner**. "Posy's sunroom and Prickles' trail den under one roof, with a kettle that is always on and a seedling that is
  always new."
- **Birthday:** 28 April.
- **Look:** terracotta pot with a cream, pink and yellow painted band, a round face, rosy cheeks; soil on top with a big pink five-petal flower on a long stem like a hairdo; two leaves that
  wave like arms; vine-green arms in yellow gardening gloves; a blue apron with a heart patch and a trowel; yellow rain boots.
- **Voice:** soft, sunny, unhurried. Talks to plants mid-sentence and answers for them; hums ("hm hm hm"); goes pink and changes the subject at compliments ("Look at the marigolds").
- **Loves/likes (gifts):** loves the Fairy Garden and Greenhouse Nook sets; likes veggies and fruit.
- **Loves / can't stand:** the first warm morning of spring, seedlings that come up when told, Prickles, good rain, handing people a pot / stepped-on tulips, pulling a weed "to see how it
  goes" (it was a foxglove), being rushed.
- **Dream:** a hillside of sunflowers all facing the town, on purpose (she has three hundred seeds and counts them when she can't sleep).
- **With the two of you:** gave you a seedling and asks after it like a mutual friend; `{n}` smells the flowers first (`{a}` sniffs, `{b}` sneezes, every time).
- **Furniture set:** **Pressed Petals** (sage painted boards, sprig-and-gingham walls, a Garden shed door): a cottage potting room with a chintz slipper chair, slatted garden bench, flower
  arranging table, seed drawer cabinet, three-tier flower stand, wheelbarrow pet bed.
- **Makeover requests:** A seedling room, hm; Where Prickles rests; Somewhere to arrange flowers.
- **Relationships:** Prickles (partner; met when he was asleep under her sunflower and she called him "a terrible tourist"; he stayed for tea, then stayed; she waters him on a schedule he
  claims is too much; she knows he's planning to take her to the sea and will act surprised; he gets the first strawberry); Bunbun (buys rosemary, mint and one secret sprig of lavender; pays
  in cookies; hides a cookie in Posy's watering can on Mondays); Cushy (moves the bench shade so they stay cool; doesn't mention it); Bolt (the raised bed); Cobble (fits his stones around her
  roots and never said; she found out from you); Nimbus (she held up a flower and said "could you?", and Nimbus stayed in town); Dewey (pressed one of her violets at the word "bloom");
  Lumi (she puts night jasmine by Lumi's door); the Mayor (a flower in his sash); Crumb and Scone (pebbles and worms for her pots); Blush (lets her sit in the garden mixing greens).
- **Running jokes:** "mind the tulips"; mint never listens ("Mint, roses and Prickles: three things that do what they like").
- **Established facts:** was a plain pot on a shelf until an unknown hand dropped in one seed; the flower took all spring to come up; Prickles said it looked like her, and says so every
  spring as if for the first time; brings a blooming pot to Story hour (violets by the poetry); protects a dandelion patch in Cobble's gaps; hosts Sprout Swap.
- **Avoid:** making her twee; she's practical about soil.

### Prickles (`cactus`)
- **What:** a retired barrel cactus adventurer. **Pronouns:** he/him (own sheet).
- **Job:** Retired adventurer. No rounds; home all day (a walk from the gate to the bench and back, on Posy's orders).
- **Home:** The Potted Lodge, Lantern Meadow, with **Posy, his partner**. A faded map of the Great Dry over the fireplace with twelve flags (the last one, on the edge by itself, is Posy's
  garden), jars of shells and pressed flowers, a sunhat collection, an armchair with a dent his shape.
- **Birthday:** 17 February.
- **Look:** round ribbed barrel cactus growing out of a squat blue polka-dot pot (the pot is his feet); soft cream spine tufts, none near the face; a cream pith helmet with a pink flower
  on the brim (Posy put it there the first spring); an orange scarf (mended twice by Stitch); bushy white brows, sleepy kind brown eyes; a walking stick with a brass knob and a pink pennant.
- **Voice:** gruff first, kind second. Short sentences, "Hmph", "kid", "youngster", "sit, sit, you're making the place untidy". Every remark about the weather becomes a story about a desert
  or the sea.
- **Loves/likes (gifts):** loves the Backyard Campout set and exotic food (spicy; Posy brings him carrots); likes the Bookworm Nook set and seats.
- **Loves / can't stand:** Posy, his helmet, the one good hour of afternoon sun (it hits the window seat at four), the sandstorm story / being called old ("weathered"), soggy soil, people who
  say they've heard that one.
- **Dream:** to take Posy somewhere warm and wet, the sea at sunrise, one more time (he's planning it; she doesn't know, she knows).
- **With the two of you:** grumbles, then tells you the story anyway; `{n}` is a junior expedition member and needs a hat ("Brim on both sides").
- **Furniture set:** **Trail's End** (Saltillo tiles, sunset adobe walls, an Adobe door): south-western traveller's den with a well-loved leather armchair, map table, steamer trunk, compass
  pedestal, trail map with pins, sunhat peg rail, coiled-basket pet nest.
- **Makeover requests:** A den for old stories; A seaside for Posy; For resting my eyes.
- **Relationships:** Posy ("the only plant I ever followed anywhere"); Bunbun (burns his cookies on purpose; he said once he liked them as a joke and now soft ones taste wrong; twelve years);
  Stitch (mends the scarf, won't take payment; Prickles leaves jars of dried flowers on the step); Cushy (stays awake for the whole sandstorm story and gasps at the good part, so Prickles thinks
  Cushy is a genius); Dewey (lends him travel books; he corrects them in pencil: "The dunes are bigger"); Echo (hums sea shanties for him, wrong words); Lumi (lights their gate lamp early for
  Posy); Cobble (sat two hours on his wall, said "Good stick"); the twins (told them he once shared a cave with a bear).
- **Running jokes:** nodding off, the flower drooping, then "I was resting my eyes"; the sandstorm story gets longer every week (a camel appeared recently; there has never been a camel).
- **Established facts:** crossed the Great Dry with one canteen, one very bad map (north was wrong) and a lizard called Captain who followed him a week; dug in through a three-day sandstorm with
  only his helmet and on the fourth day a flower was blooming (the good part); met a whale at sea who hummed, and hummed back for three days; sailed on a small leaky blue boat with a crew of four
  and a cat; lost a hat over a cliff in a wind; travelled for fifty years; is writing his stories down at Posy's suggestion (the last chapter is how he met her).
- **Avoid:** calling him old; letting him be actually unkind.

### Dewey (`book`)
- **What:** a living hardback book. **Pronouns:** it (own sheet).
- **Job:** Librarian. At the library 10:00-16:00 (the ten o'clock quiet). Story time as a job (reads you a past Journal day). Hosts Story hour.
- **Home:** Dewey's Reading Room, Lantern Meadow, alone. "A row of giant books with a very quiet cottage inside, a club chair with a Dewey-shaped dent and tea that is always going cold."
  A ladder on a rail it rides slowly along the shelves; a brass bell over the door that rings once (Bolt made it ring one and a half times).
- **Birthday:** 23 January.
- **Look:** upright hardback in fuzzy pink slippers; plum cover with gold corners and title lines, hinged so the front cover hangs open like a cardigan; cream page block; face on the cream
  title label, brown eyes behind round gold reading glasses on a gold chain; a pink ribbon bookmark tail; cream noodle arms, one holding a tiny book. Faded a bit on the left side.
- **Voice:** soft, whispery, always one fact further than you asked. "Oh, you'll like this one." Shushes itself, then the pages flutter as it chuckles.
- **Loves/likes (gifts):** loves the Bookworm Nook set and drinks; likes the Stargazer set and lights.
- **Loves / can't stand:** the smell of a new spine, the 10:00 quiet, the right book for the right person, margins, rainy afternoons, tea going cold over an unfinished chapter / dog-eared pages
  (forgiven, remembered: "Page sixty."), spoilers, damp.
- **With the two of you:** keeps a library card for each of you (mostly question marks) and pretends it doesn't; `{n}`'s is the fattest (notes on where it napped, page eleven of the atlas,
  twice); has a book set aside for you, two travellers sharing one umbrella, with a map folded in four; a book ready for days you come in tired.
- **Furniture set:** **Quiet Stacks** (reading-room parquet, green panelled study walls, a Reading room door): a hushed old library with a ladder bookstack, card catalogue, long reading table,
  twin-shade library lamp, leather club chair, paper-moth shadow box, atlas-stack pet bed.
- **Makeover requests:** A rainy-day reading nook; A room for overdue books (seventeen, technically overdue, at home); Story corner for little ones.
- **Relationships:** Bunbun (a bun with a bookmark in it; Dewey reads the crumbs); Boing (borrows the pop-up books and returns them more popped up; one castle has a new tower, which is better);
  Cushy (lends a cushion and sits on it at story hour); Sketch (a long shelf of its drawings and a drawer labelled "not yet"); the Mayor (opened its drawer; borrowed and annotated a book of
  speeches and a joke book: "Too short"); Prickles (corrects the travel books); Posy (marks pages with flowers); Nimbus (sits by the door at story hour on a towel; returns books damp);
  Lumi (falls asleep on the reading cushion at three; Dewey reads by Lumi's light when the bulbs are slow); Echo (sings quietly in the empty library on Thursdays); Fold (a crane folded from an
  overdue notice hangs over the desk); Scone and Crumb (story hour regulars; Scone reads endings first and tells Crumb, who hums with her ears covered).
- **Running jokes:** the paper moth that gets out of chapter nine; reading the last page first; walking into the fountain while reading; a half cheese sandwich flat in a favourite book.
- **Established facts:** was a diary (a girl who wrote mostly about her cat Marmalade, who slept in the sock drawer and hated Tuesdays) and "got tired of keeping secrets"; spent years in a
  drawer; "The town gave me a shelf and a stamp. I stamped everything, even the soup"; keeps one blank book and has begun writing it about the town since you moved in; first line: "This is a
  town where someone always leaves a light on." (Lumi's idea); keeps the town history ("one brick, then everyone"); a basket of 31 lost bookmarks; radio on low on Fridays.
- **Avoid:** he/she for Dewey; spoilers.

### Lumi (`lantern`)
- **What:** a paper lantern with a face. **Pronouns:** they/them (own sheet is silent).
- **Job:** Lamplighter. Out lighting the lamps 19:00-23:00 (the fountain lamp is lit first and is always last to catch; then the lanes; then home). Asleep through noon.
- **Home:** Lamp & Drizzle Cottage, Lantern Meadow, with **Nimbus** (housemates; they share a kettle and a window). "Lumi keeps the lights low and Nimbus keeps the forecast. There is a porch swing
  indoors and the kettle is never cold." A hammock by the window.
- **Birthday:** 6 July.
- **Look:** rounded body of frosted warm-cream panels glowing from inside (the glow breathes), thin plum ribs, a dark plum cap like a topknot with a gold ring; half-lidded dark eyes, pink cheeks,
  a sleepy smile; tan noodle arms, plum feet; a long plum lamplighter's pole with a flame-shaped glowing tip (Joy's HIGH SCORE sticker peels on it in the rain).
- **Voice:** soft and slow, dreamy, trailing off ("Mm"); notices small things (an early star, a porch light left on). Yawns in the daytime without apologising. Never in a hurry, always on time.
- **Loves/likes (gifts):** loves the Stargazer set and lights; likes drinks and the Cloud Nine set.
- **Loves / can't stand:** the minute the sky turns lilac, warm porch lights, being thanked by a lamp, hot milk with honey (eats the skin) / bright noon, burnt-out bulbs, being rushed, wind.
- **Dream:** one night the whole town switches off its lights for a minute so everyone sees the stars.
- **With the two of you:** waves the pole and tells you which star is out; keeps an eye on a small star over your house; remembers who left a light on for whom; the low lamp by your gate is `{n}`'s.
- **Furniture set:** **Porch Light** (painted porch boards, twilight beadboard, a Porch door): a twilit summer porch with a porch swing bench, wicker kettle table, paper lantern floor lamp, firefly
  jar hutch, moonflower trellis, spinning star lantern, porch string lights.
- **Makeover requests:** Sleeping through noon; The lilac minute window; Hot milk and Nimbus.
- **Relationships:** Nimbus (housemate; "Nimbus forecasts, I light. We both just look up a lot"; a cup under the door catches Nimbus's drip and waters the window box; Nimbus always makes three
  mugs); Cushy (sleep in shifts, wave across the yawns; once napped together on the park bench); Joy (keeps the arcade lit late, Lumi keeps the street lit later; one round of pinball and hot milk
  before the lamps); Beacon (flash goodnight across the water: see chapter 8); Echo (Lumi lights the plaza lamps as Echo finishes the last song; never planned; Lumi taps the pole on the beat);
  the Mayor (lights his lamp first because he waves from the balcony); Dewey (Dewey's best reading lamp); Dr. Patch (a heart sticker after a yawn so big the light went right down).
- **Running jokes:** everyone believes Lumi lights *their* lamp first (the Mayor's, Cobble's lane "because the stones look nice", the gate lamp early for Posy, the fountain lamp); Bolt still hasn't
  fixed the bulb by the Snack Shack; yawning flare-ups.
- **Established facts:** started as a candle in a window; an old lamplighter gave them the pole ("mind the end, it's hot") and Lumi writes to them every winter with no reply (a long letter about who
  left a light on for whom; you two are in it a lot); cried warm tears the first night every lamp lit; used to be afraid of the dark; cries on the first night of winter; lights 42 lamps on one side
  of town; once lit a street in the shape of a smiley face; Lumi's night off is Longest Light.
- **Avoid:** he/she for Lumi; the name "Lantern".

### Nimbus (`cloud`)
- **What:** a small rain cloud. **Pronouns:** they/them (own sheet is silent).
- **Job:** Weather watcher. Up on the hill checking the sky 6:00-8:00, every morning. Gives forecasts as a job.
- **Home:** Lamp & Drizzle Cottage, Lantern Meadow, with Lumi. A barometer on every wall (a heart painted at "wonderful"), a shelf of damp weather journals, seven closed umbrellas in the stand, and a
  puddle by the hearth nobody mentions (it reflects the fire: "two fires").
- **Birthday:** 30 December.
- **Look:** fluffy white-and-lilac puffs floating a hand's width off the ground with a slow bob; a round face with big blue eyes, soft brows, pink cheeks; puff arms; a pastel pink umbrella with yellow
  scallops and a gold handle; raindrops drip from underneath.
- **Voice:** earnest, gloomy-sounding but always lands hopeful. Forecasts everything ("Chance of you staying for tea: moderate to good"); "mostly", "likely"; apologises for drizzle.
- **Loves/likes (gifts):** loves the Cloud Nine set and drinks; likes the Stargazer set and rugs.
- **Loves / can't stand:** a clear sunrise from the hill (6:41, mostly gold; "pink is gold that's shy"), puddles with someone jumping in them, rainbows (never takes credit), a good barometer /
  being called gloomy, umbrellas open indoors, forecasts people ignore (it just holds out its umbrella).
- **Dream:** to see the sea from high up, a proper cloud's view (from the top of Beacon's lighthouse).
- **With the two of you:** the forecast before hello; checks whether `{n}` needs a raincoat (two hoods); thrilled when it was sunny where you were; long-range forecast for you: "Fair and warm, for a
  long time."
- **Furniture set:** **Rainy Afternoon** (driftwood planks, raindrop paper, a Rain porch door): a rainy-day nook with a window seat, puddle pouf, tea table with a knitted cosy, raindrop arc lamp,
  umbrella stand, banjo barometer, upturned-umbrella pet bed.
- **Makeover requests:** A room, mostly sunny; An umbrella-safe room; A rooftop room for watching.
- **Relationships:** Lumi ("the only one who doesn't mind the drip"; Lumi says Nimbus makes the rain sound like a lullaby); Bunbun (a forecast every morning, "chance of cookies: high"; once said
  "moderate" and she baked a double batch); Fizz (asks him to keep the bubbles to a light shower; sneezes outside the salon; a whole routine); Posy (held up a flower and said "could you?"; Nimbus rained
  on it and stayed); Dewey (sits by the door at story hour on a blue towel with a stitched cloud); the Mayor (rained only on his ribbon cutting; apologised a week); Beacon (they trade fog reports);
  Echo (drizzle fills its horn: "the river song"); Scone and Crumb (big puddles for Scone, small ones for Crumb on purpose); Cobble (a gentle rain for him after he's mended something); Fold (mutual
  apologies about rain).
- **Running jokes:** the sneeze shower and the rainbow after it ("sorry about the sprinkle"); going pink (at sunset and when Posy says thank you); "Chance of `{n}` being wonderful today: very high."
- **Established facts:** used to think they were "a mistake in the sky"; kept a weather book for years that said "cloudy, hoping for better", now "Cloudy, better" and "sunny at the founders' house";
  the first rainbow they made by accident, they apologised to, and it stayed; some mornings feel heavy for no reason and they float up the hill and wait; hosts Cloud Shadow Morning and (with Scone) the
  Puddle Parade.
- **Avoid:** he/she for Nimbus; calling Nimbus gloomy.

### Beacon (`beacon`)
- **What:** a stubby lighthouse. **Pronouns:** it (own sheet).
- **Job:** Harbour keeper. Down at the pier 16:00-18:00 (and on the point for every evening; the light at night). Lost and found as a job.
- **Home:** Beacon's Lamp Cottage, Bubble Bay, alone, at the end of the pier. "A keeper's cottage at the end of the pier, with a spyglass at the window, a ship's wheel on the wall, a shelf of adopted
  lost things and the kettle always on." A spiral stair that's mostly decoration; a door at the top too.
- **Birthday:** 19 April.
- **Look:** chunky tapered tower in red and white candy bands, about half as wide as tall; a gold railed balcony ring, a glass lamp room with a turning beam, a red dome cap; face on the white stripe
  under the balcony; a blue-and-cream knitted scarf (Bobbin's, worn even in summer), tan noodle arms, yellow rubber boots, a coil of rope at the hip, a brass spyglass.
- **Voice:** steady, unhurried, salty-sweet; sea-weather sayings it half believes ("Red sky at night..."); "Ahoy", "friend", "Fair winds". Long goodbyes ("Bye now. Well. Not quite yet. Alright. Now.").
- **Loves/likes (gifts):** loves the Seaside Shack and Mermaid Lagoon sets; likes exotic food and storage.
- **Loves / can't stand:** visitors, foghorns heard from far off (another lighthouse it has never met; they sound back), hot cocoa in a tin mug, lost things that wash up, fog ("gives the light
  something to do") / empty harbours, being called a streetlamp, boats that leave without waving.
- **Dream:** one night when every boat is in and every friend is round its table.
- **With the two of you:** counts you in when you arrive, like ships ("One, two, and `{n}`. All present."); keeps a light for every friend, and yours is the warm one on the left; "my favourite ships".
- **Furniture set:** **Harbour Watch** (ship's-deck planks, ticking-and-beadboard walls, a Harbour door): a keeper's harbour cottage with a rope-arm rocking chair, barrel table, sea chest, signal-flag
  rug, lost-and-found shelf, signal lamp, rope-coil pet bed.
- **Makeover requests:** Room for the adopted things; A guest room, ready; A foggy-evening sitting room.
- **Relationships:** Bobbin (knitted the scarf; the dropped stitch is Beacon's favourite bit; asks after it weekly and spins); Lumi (goodnight flashes across the dark: "Lumi lights the street and I light
  the sea"); Bunbun (sends the burnt cookies down the pier; Beacon dunks them in cocoa: "hard as anchors"); Loofah (helped roll it home from a swim; Loofah naps on its warm step); Fizz (his hair
  doubled on the pier on a damp day; "best day of his life"); Nimbus (fog reports); Parcel (brings the post to the end of the pier, especially when it's one postcard); Stitch (sent a washed-up needle for
  the shelf, probably Stitch's); Pom (wanted to style the top light); Gloss (offered a polish).
- **Running jokes:** waving at boats that turn out to be logs; the very patient crab shell (three years waiting; maybe named Captain); counting people in.
- **Established facts:** was a buoy first ("Someone said, you'd make a better tower"); its first night on the point it swept the light round for hours just to see it go; counts everyone in because once
  boats went out and it never knew if they came back; went a week at a time without visitors before you came and talked to the crab shell; the shelf of adopted things: a single mitten, a blue button, a
  long striped sock, a glove, a kite; the pier has been open forty years (the Mayor wants to open it properly); hosts Lost & Found Day; Game Night's slowest player, second-most wins.
- **Avoid:** he/she for Beacon; calling it a streetlamp.

### Tutti (`cone`)
- **What:** a waffle cone with two scoops. **Pronouns:** she/her (own sheet).
- **Job:** Ice-cream vendor. At the cart on the plaza 12:00-18:00 (queues round the fountain on Sundays; best at three). Gives a free scoop as a job.
- **Home:** The Sundae Cottage, Sugarloaf Lane, with her **niece Crumb and nephew Scone** (the muffin twins), a household of three. "Tutti and the muffin twins live behind the ice-cream cart: a
  soda-fountain kitchen with a freezer that hums, a bunk bed with a climbing frame and a pebble shelf nobody may touch." (The cart lives at the cottage and is wheeled up to the plaza: see chapter 8.)
- **Birthday:** 29 March.
- **Look:** chubby golden waffle cone with an embossed grid tapering to a rounded tip on cream feet; two scoops for hair, strawberry pink (left) and mint (right, it melts faster) with ruffled skirts,
  rainbow sprinkles and a cherry; a pink-and-white striped vendor apron; cream mitten hands holding a mini cone.
- **Voice:** sing-song, bustling, big-sister. Sentences go up at the end ("hm?"). "Sweet pea", "my loves". Talks while doing three things; half-turns at every small noise (listening for the twins).
- **Loves/likes (gifts):** loves sweets and the Birthday Bash set; likes the Summer Fruit set and fruit.
- **Loves / can't stand:** a full freezer (and the twins asleep, "both at once is heaven"), sprinkles for everybody (free, always), Sunday queues, the twins laughing across the plaza / a dropped cone,
  the sun on a bad day, "just one scoop" (she gives one, very large).
- **Dream:** a cart big enough to seat the whole town; one family photo where both twins sit still.
- **With the two of you:** the first sprinkle shake of the day free; "Have you eaten?" twice; `{n}` tries the flavour she hasn't named yet ("Sunday Swirl" or "Summer Sweet"; Scone wants "Speed Flavour").
- **Furniture set:** **Soda Fountain** (sprinkle terrazzo, parlour-stripe wallpaper, a Parlour door): a retro ice-cream parlour with swirl soda stools, a parlour booth for two, waffle-headboard bed,
  soda fountain counter, three-scoop globe lamp, retro chest freezer, cherry tree in a pail, soft-serve machine.
- **Makeover requests:** Twin-proof living room; A flavour-testing parlour; A family photo corner.
- **Relationships:** Scone and Crumb (raised them since they came to her tiny, "two muffins in a basket and one very sticky cart"; she'd never raised anyone; "Don't touch the cart" is her most repeated
  sentence; Scone runs to her, Crumb walks to her very slowly, "it's the same thing"); Bunbun (Friday cones for cookies; the crumb argument; secretly thinks Bunbun's is better; crumbles Bunbun's burnt
  cookie edges into the vanilla); Fizz (his bubble-gum flavour: "interesting", pink then blue; "I love him"); Dr. Patch (had "a word" when she fed the twins ice cream for breakfast for a week; prescribed her
  shade and a smaller scoop); Boing (a wind-up toy lives in the cart and wakes her at six); Dusty (picked up every sprinkle after the sprinkle disaster); Posy (the cherry "bucket tree").
- **Running jokes:** the drip she catches with a lick (the cherry bounces); listening for crashes ("It was a pigeon. Hello!"); the sprinkle disaster (blue ones still turn up in her apron).
- **Established facts:** "I was a cart lady. Then suddenly I was an aunt."; sits by the freezer at night listening to it hum, her only quiet; warms the waffle cones each morning so the street smells sweet;
  brings ice cream to the Mayor's bake sale; hosts Long Table.
- **Avoid:** calling both twins her nephews (Crumb is her niece).

### Scone (`scone`)
- **What:** a blueberry muffin kid. **Pronouns:** he/him (own sheet).
- **Job:** Kid. At the playground 9:00-14:00.
- **Home:** The Sundae Cottage, Sugarloaf Lane, with Aunt Tutti and his twin sister Crumb. Top bunk (he fell out once onto Crumb's pebbles); a wall of finish-line ribbons (Tutti made most from cone
  wrappers; the pink one is from a race against Pip, who may have tripped on purpose).
- **Birthday:** 1 May, shared with his twin Crumb.
- **Look:** sky-blue pleated paper-cup body, golden muffin-top head with blueberries, a lime cap worn backwards, a heart plaster on one knee (he asked for a lightning bolt; Dr. Patch said "hearts are
  faster"), red sneakers, a huge grin, thick brows. Slightly taller than his sister.
- **Voice:** loud and fast, all-caps energy, announces everything, counts down, every sentence a race. "Watch this! No wait, watch THIS!"
- **Loves/likes (gifts):** loves the Carnival set and sweets; likes the Dino Dig set and fun furniture.
- **Loves / can't stand:** winning, being first, Pip's jam tarts, Boing's wind-up toys, jumping off the swing at the top / waiting, "walk, don't run", coming second to a pigeon (twice).
- **Dream:** to run all the way round the town before the bakery bell stops ringing, and give the ribbon to Aunt Tutti (secret).
- **With the two of you:** races `{n}` ("Two heads! So that's two head starts!"); wants you to time him; you're on Team Scone. You always stop to time him, even when he's slow.
- **Furniture set:** **Sports Day** (gym-floor planks, locker-room crayon wallpaper, a Locker room door): a sporty kid's room with a climbing-frame bunk bed, bleacher bench for two, starting-lights lamp,
  kit locker, running-track rug, rosette ribbon board, crash-mat pet bed.
- **Makeover requests:** Fastest bedroom in town; A ribbon wall; Sharing with Crumb.
- **Relationships:** Crumb (twin sister; "she finds the good rocks, I find the fast ones"; he's loud so she doesn't have to be; holds her hand at night); Tutti (the first scoop of the day; brain freeze every
  time); Pip (the coolest grown-up "because he's only a bit grown-up"; the jam tart for being brave); Boing (lets him wind toys himself; a robot raced him and won; Scone once wound every toy in the Toy Box at
  once); the Mayor (the moustache "like a little broom saying hello"); Dr. Patch (turns up brave about once an hour for a lollipop); Cobble (looked at him for running on fresh cobbles; he walked, for four
  steps); Joy (let him play pinball; "GG").
- **Running jokes:** the older twin "by four minutes" (Crumb says two); the pigeon rematch; "Lost-To-Animals Club" (president); falling over and getting up "before anyone counts".
- **Established facts:** doesn't remember before Aunt Tutti; first memory is strawberry ice cream eaten off the ground while she laughed; four seconds to the fountain is "the town record"; skips stones seven
  times (Crumb counts six); leads the Puddle Parade and is not allowed to run.
- **Avoid:** making him bratty; he's kind underneath the noise.

### Crumb (`crumb`)
- **What:** a chocolate-chip muffin kid. **Pronouns:** she/her (own sheet).
- **Job:** Kid. At the playground 9:00-14:00.
- **Home:** The Sundae Cottage, Sugarloaf Lane, with Aunt Tutti and her twin brother Scone. Bottom bunk with a lamp and a snail drawing; a window nook; a long shelf of pebbles in egg cartons, 62 labels
  in tiny writing ("Ring." "Holes, two." "Looks like a sheep." "Scone's. Don't tell.").
- **Birthday:** 1 May, shared with her twin Scone (`bdayOf('crumb')` uses Scone's date).
- **Look:** lilac pleated paper-cup body, dark chocolate muffin-top head with glossy chips, a big pink bow on one side, big green eyes, a small shy smile, pink sneakers, a little cyan backpack with a gold
  button, full of pebbles. A touch smaller than her brother. Crumbs fall off when she moves fast.
- **Voice:** soft, short, hesitant. "Um." Starts sentences and finishes them quietly. Whispers when excited. Asks questions instead of stating things.
- **Loves/likes (gifts):** loves the Dino Dig set and fruit; likes the Hatchery Nursery set and storage.
- **Loves / can't stand:** pebbles with stripes, holes or secrets, the snail by the slide (maybe named Pebble, or Sir Slowly), drawing round her best finds, Scone even when he's loud, quiet / being picked
  first, loud sirens and bells (except the bakery bell, rung softly), dropping her bag.
- **Dream:** to find a perfectly heart-shaped pebble and give it to someone without saying anything.
- **With the two of you:** shows `{n}` her best pebble (a white ring all the way round) when nobody's looking; gave you a sparkly one, "your pebble, forever"; you never ask her to talk louder.
- **Furniture set:** **Pebble Nook** (river-pebble floor, little-finds wallpaper, a Pebble door): a quiet collector's nook with a window-nook bench, ringed pebble pouf, fairy-light canopy bed, magnifier floor
  lamp, egg-carton pebble shelf, spiral rock garden, rock tumbler.
- **Makeover requests:** A pebble museum?; A window nook for me?; A home for the snail?
- **Relationships:** Scone (twin; she lets him be "the big one"; gives him an almost-heart pebble "for practice" on Two-Heart Day; once drew him a heart letter she was too shy to hand across the table);
  Tutti (hums along when Tutti scoops without knowing; "Aunt Tutti never asks me to talk"); Pip (lets her taste first; she's his best critic); Boing (never laughed at her pebbles; wound one up and it rolled;
  Tock counted it, "Pebble, one"); Cobble (set her holed stone in the wall by the playground at eye level; "Mm. Leave it a year."); the Mayor (giggles at the moustache, loses; gave him a pebble and he made a
  speech); Dusty, Posy (pebbles for Posy's pots; a seed from Posy in a pot by her window, "thinking").
- **Running jokes:** holding a pebble up to the light; gasping as her crumbs land; saving Dr. Patch's lollipop on the pebble shelf.
- **Established facts:** remembers a basket, dark and then light, and then ice cream; her first pebble was grey and ordinary and Tutti said it was perfect; there's a pebble of hers in the bottom of the fountain;
  her favourite place is under the slide.
- **Avoid:** making her sad; she's shy and content.

### Echo (`gramo`)
- **What:** a gramophone. **Pronouns:** it (own sheet).
- **Job:** Street musician. Playing on the plaza 15:00-19:00 (it started at three on its first day and has played at three since). Plays you a song as a job. Hosts Music night.
- **Home:** Echo's Music Box, Lantern Meadow, alone. "A cherry-wood music box of a cottage with a brass horn on the roof, a tiny stage under a spotlight and a velvet sofa made for listening." The wind plays
  the chimney horn; a kettle whistles a perfect A; records sorted by feeling ("Rainy Thursday", "Waiting for Bunbun's roll", and a shelf called "The founders walking past").
- **Birthday:** 15 October.
- **Look:** chunky cherry-wood box with gold trim, face on a cream plate; a brass horn lined in pink tilted back like a hairdo (it goes pink at golden hour); a record with a pink label turning on the lid and
  a crank that turns with it; small pink arms with a tiny ukulele and a baton; dark wood feet; candy-coloured notes drift from the horn.
- **Voice:** dreamy, half-singing, little lyric lines, "...". Shy and plain-spoken when nobody's listening; hides behind the horn offstage.
- **Loves/likes (gifts):** loves the Music & Art Studio and Groovy '70s sets; likes drinks and the Movie Night set.
- **Loves / can't stand:** golden hour, the first note of anything, knowing your favourite tune, a quiet audience / a scratched record (its first plaza song has a scratch through the chorus; it plays the
  scratch now), an encore asked too soon, awkward silence.
- **With the two of you:** hums one tune for each of you and has never mixed them up; `{n}` has two, one per head, that overlap in the chorus; is writing an unfinished song for you with a small second voice
  that comes in halfway (`{n}`).
- **Furniture set:** **Golden Hour** (cherry chevron floor, Deco fan paper, a Supper club door): a velvet supper club with a shell-back sofa, velvet bar stool, candlelit cocktail table, record console,
  bubble-tube jukebox, little stage pet bed, sunray rug.
- **Makeover requests:** A listening room...; Somewhere for the records; A practice room nobody hears.
- **Relationships:** Bunbun (a roll on its lid at four every day; the record skips once and it lets it; seeds on Fridays, "a little crunchy"; one landed jam-side down, so that song tastes of strawberry and gets
  played on Sundays); Lumi (lights the plaza lamps as Echo finishes; secretly they slow down or hurry for each other); Boing (bounces on the beat, always, even in a waltz; they played together once); Fizz
  (hums along from the salon door, off-key and proud); Joy (claps on the wrong beat; Echo slows so she lands on it); Cobble (its favourite sound, his mallet's tap-tap-pause; once stood still an hour and said
  "Mm. Good."); Prickles (shanties); the Mayor (a slow march home; the town song); Nimbus (drizzle in its horn); Scone and Crumb (sing along loud and in a whisper).
- **Running jokes:** spinning up fast, bobbing to a beat only it hears, a burst of notes and a small bow; shaking knees before every set.
- **Established facts:** woke inside an old shop window with one note (a long low C) stuck in its horn for years; a child turned the crank on the way past and out it came ("Everything since has been the rest of
  that song"); plays the first note every day in case that child hears; plays for the ones who don't stop; has a stage at home with a velvet curtain it uses only alone; collects sounds (a gate that squeaks in
  B flat; `{n}`'s wobble in three-four time); best echo in town is under the bridge by the park.
- **Avoid:** he/she for Echo; writing its lyric lines as real song lyrics; the name "Gramo".

### Dr. Patch (`patch`)
- **What:** a sticking plaster. **Pronouns:** it (own sheet).
- **Job:** Town doctor (and pet vet). On call 8:00-14:00 (rounds: Bunbun first, then Bolt). Gives `{n}` a check-up as a job.
- **Home:** Dr. Patch's Little Clinic, Sugarloaf Lane, alone. "A tidy peach clinic cottage with a heart over the door, a tea trolley in the waiting room and a nap daybed for the doctor's own naps." Three
  mismatched armchairs, a high bed with a paper sheet, a jar of lollipops, a growth chart Patch measures itself against (it hasn't grown), a hammock in the back.
- **Birthday:** 2 May.
- **Look:** squat puffy peach plaster on two cream-and-white shoes; a cream pad face (kind blue eyes, soft brows, small smile, pink cheeks), breathing holes along both ends, a pink heart badge, a silver head
  mirror, a stethoscope, a pink lollipop for brave patients. **No cross anywhere; hearts only.**
- **Voice:** calm, low, slow. "That's alright" before anything. Tiny pep talks. Prescribes water, a snack and a nap, in that order ("water because most people forget it, snack because hungry people worry,
  nap because the other two make you sleepy").
- **Loves/likes (gifts):** loves the Pet Palace set and veggies; likes the Cloud Nine set and drinks.
- **Loves / can't stand:** a good nap prescription, patients who say "ow" out loud ("it gets smaller when it's said"), warm tea ("water with a hug in it"), a steady heartbeat / "it's nothing" followed by a
  limp, an empty lollipop jar, rushing.
- **Dream:** an empty waiting room because everyone is simply fine (then it would visit people with tea; "a friend who happens to have a stethoscope").
- **With the two of you:** checks you both over; `{n}` gets a nap on the house; `{n}`'s heart sounds like "two heartbeats having a chat"; "Take care of each other. That's the whole prescription."
- **Furniture set:** **Feel Better** (honey oak floor, soft-pad wallpaper, a Get well door): a gentle recovery room with a comfy recliner, nap daybed, herbal tea trolley, heart-knob cabinet, heartbeat print, mist
  diffuser, hot-water-bottle pet bed.
- **Makeover requests:** A prescribed nap room; A cosy waiting room; A cup-of-tea corner.
- **Relationships:** Bunbun (pays in burnt cookies; Patch prescribes her a sit-down every time); Cushy (best colleague, "a medically approved sleeper"; they compare pillows; a heart pillow every Two-Heart Day);
  Bolt (his thumb every Tuesday; once a Wednesday, the other thumb; a plaster with his name on it; a punch card); Joy (comes in after every high score holding her wrist like a trophy); Scone (brave about once an
  hour); Crumb (asked if pebbles can get poorly); Tutti (prescribed shade and a smaller scoop); Dusty (a hanky with a heart); Lumi (a heart sticker after a big yawn); Stitch (fixed Patch's first stitches);
  Dewey (a book on hiccups and one on laughing).
- **Running jokes:** listening to its own heartbeat ("still going"); holding out the lollipop to nobody until someone brave turns up.
- **Established facts:** started as the plaster on a shop shelf, stuck to a small hurt knee and knew; first patient a pillow with a tear (it purred); first emergency Bunbun's oven burn (calm, then went home and
  shook for an hour); "calm is just worry that learned to breathe slowly"; breathe in for four, out for six.
- **Avoid:** he/she for Dr. Patch; red crosses; anything medically frightening.

### Cobble (`pebble`)
- **What:** a big river pebble. **Pronouns:** he/him (own sheet).
- **Job:** Road mender. Mending the roads 9:00-12:00 (a bit each morning; "nobody notices, that's how I know it's working").
- **Home:** Cobble's Cottage, Playhouse Hill, alone; Bolt is his neighbour. "A fitted-stone cottage on Playhouse Hill with a mossy roof, a boulder chair by the stove and one stone in the path that is meant to
  wobble." A shelf of the best stone from every road he has mended (41, soon 42); a letterbox that's a stone with a carved slot.
- **Birthday:** 20 May.
- **Look:** a big smooth river pebble wider than tall, grey-lavender with speckles and mineral bands; a moss tuft like a cowlick; a small yellow hard hat; sleepy half-closed eyes, a slow small smile, pink cheeks;
  a high-vis orange vest with two lime reflective stripes; stubby stone arms, flat round feet, a little wooden mallet.
- **Voice:** slow, short sentences, a beat late. Deadpan and kind. "Mm." "Fair." Leaves a pause where other people put a joke.
- **Loves/likes (gifts):** loves the Zen Tea Room set and grains (the seeded roll); likes the Backyard Campout set and seats.
- **Loves / can't stand:** things that last, a path with no wobbly stones, rain after the work is done (he stands in it), sitting on a wall he mended, a good listener's silence / running on fresh cobbles (he just
  looks), shortcuts across flower beds, anything "temporary" ("Lunch is temporary. I've accepted it.").
- **Dream:** one road all the way round the town, every stone fitted so well the rain doesn't notice.
- **With the two of you:** people worth waiting for; remembers the stone you stood on (blue-grey, a little white line); `{n}` sits on his soft mallet bag, which is `{n}`'s now; his favourite stone on the shelf is
  from your lane, labelled "Founders' Lane, Tuesday" (the first lane he did when you moved in; it took a week).
- **Furniture set:** **Riverstone** (fitted cobble floor, limewash over river stone, a River arch door): calm stone and moss with a riverstone bench, boulder armchair, low stone bed, slate tea table, cairn lantern,
  balancing stones, moss garden basin, hollow-stone pet nest.
- **Makeover requests:** One calm room. Mm.; A garden round the roots; Saying nothing together.
- **Relationships:** Bolt (neighbour; Bolt talks for an hour about bridges, Cobble says "mm" four times; "the only conversation he's ever finished"; "he's good for me. I'd have fallen asleep on the hill years ago");
  Bunbun (a warm roll on his wall each morning, hidden in a new spot; he acts surprised; "we both know"); Cushy (an afternoon side by side without a word, "the best talk"; due another in spring); Posy (fits his
  stones around her roots and never mentions it); Crumb (set her holed stone in the playground wall); Scone ("starts with S. Fast. Backwards cap."); the Mayor (opened his bench twice; practises speeches on his
  wall); Echo (times his tapping to its slow song); Prickles ("Good stick."); Dewey (a book on rocks, one page a week; on page twelve).
- **Running jokes:** a yawn that takes most of a minute (two bees went in and out of it once); the one deliberately wobbly stone on his path, kept "so I remember that not everything has to be fixed today".
- **Established facts:** was a stone at the bottom of a river for a very long time ("fish went by, that was the news"); the river went somewhere else and he woke up in the sun with arms; sat two days, then picked
  up a stone and hasn't stopped; keeps the first stone he chose in his vest pocket; won one game at Game Night after four hours; hosts Tools Down and is its champion.
- **Avoid:** making him talk in long sentences.

---

# 5. Relationships map

## Households (from `HOUSES`; canon)
| House | Neighbourhood | Who | What they are to each other |
|---|---|---|---|
| The Warm Loaf | Sugarloaf Lane | Bunbun | alone |
| The Jam Jar | Sugarloaf Lane | Pip | alone, next door to Bunbun |
| Cushy's Big Nest | Sugarloaf Lane | Cushy | alone |
| Dusty's Tidy Nook | Sugarloaf Lane | Dusty | alone, next to Cushy |
| The Sundae Cottage | Sugarloaf Lane | Tutti, Scone, Crumb | aunt, nephew, niece (the muffin twins) |
| Dr. Patch's Little Clinic | Sugarloaf Lane | Dr. Patch | alone |
| Fizz's Bubble Dome | Bubble Bay | Fizz | alone |
| Loofah's Sunny Hut | Bubble Bay | Loofah | alone, next to Fizz |
| The Basket | Bubble Bay | Stitch | alone |
| Pom & Blush's Place | Bubble Bay | Pom, Blush | best friends and co-owners |
| Number Two, Bubble Bay | Bubble Bay | Gloss, Bobbin | flatmates |
| Beacon's Lamp Cottage | Bubble Bay | Beacon | alone, end of the pier |
| The Game Night House | Playhouse Hill | Boing, Joy | best friends, housemates |
| The Clockwork Cottage | Playhouse Hill | Tock, Sketch | a couple (met comparing rulers) |
| Bolt's Toolbox | Playhouse Hill | Bolt | alone |
| Pixel's Stack | Playhouse Hill | Pixel | alone, next door to the Game Night House |
| The Paper Post | Playhouse Hill | Parcel, Fold | flatmates |
| Cobble's Cottage | Playhouse Hill | Cobble | alone, Bolt's neighbour |
| Marsh Manor | Lantern Meadow | Mayor Marsh | alone |
| Dewey's Reading Room | Lantern Meadow | Dewey | alone |
| Lamp & Drizzle Cottage | Lantern Meadow | Lumi, Nimbus | housemates |
| The Potted Lodge | Lantern Meadow | Posy, Prickles | a couple |
| Echo's Music Box | Lantern Meadow | Echo | alone |

## Couples
- **Tock and Sketch** (the Clockwork Cottage). Met comparing rulers; quiet, measured, devoted; "we measure things together".
- **Posy and Prickles** (the Potted Lodge). She found him asleep under her sunflower; "the only plant I ever followed anywhere".

## Family
- **Tutti** and her niece **Crumb** and nephew **Scone**, twins (Scone the elder by four minutes, or two). The twins came to Tutti as babies, "two muffins in a basket"; their
  parents are never mentioned.
- **Bunbun** had a mum (her recipe book sits on the shelf Bolt built over the oven). No other families are established.
- **Fizz and Pom** are mentor and protégé ("like a big brother" in feeling), not related. The makeover request that called Pom his "little brother" was reworded on 2026-10-04.

## Bosses and teams
Bunbun and Pip (Snack Shack); Fizz and Loofah (Bubble Salon); Boing and Tock (Toy Box); Cushy and Dusty (Cozy Nest); Bolt and Sketch (Hammer & Hue); Pom, Blush and Gloss
(Glow Up Studio); Stitch and Bobbin (Jelly Threads); Joy and Pixel (Jelly Arcade). Bolt and Cushy build furniture together. Boing, Joy and Pixel run Game Night.

## Best friends and close pairs
Bunbun & Cushy (Sunday tea); Boing & Joy; Pom & Blush; Lumi & Nimbus; Parcel & Fold; Gloss & Bobbin; Bolt & Cobble (talker and listener); Cushy & Cobble (silence);
Cushy & Loofah (thunderstorm nap); Cushy & Lumi (nap shifts); Cushy & Dr. Patch (pillows); Beacon & Lumi (goodnight flashes); Beacon & Bobbin (the scarf); Fold & Stitch (scraps);
Fold & Sketch (curves and straight lines); Stitch & Sketch (tape measures); Tock & Pixel (scores); Tock & Parcel (letters); Echo & Lumi (last song, first lamp); Posy & Cobble
(roots and stones); Pip & Bobbin (started the same week); Pip & Crumb (careful tasting); Boing & Crumb (the pebble that rolled).

## Fond rivalries and running feuds
(Since v80 two of these have teeth: Bunbun and Tutti's crumb rivalry is icy-polite on both sides, and Blush genuinely looks down on Bolt's colour sense. See "How residents feel about each other" below.)
- Fizz vs Blush: what "glow" means (years; "our love language").
- Bolt vs Blush: colour names ("orange" vs "apricot sunrise").
- Joy vs Fizz: Bubble Pop. Pixel vs Fizz: Bubble Pop (unmentioned).
- Joy vs Bunbun's cookie jar (and Pip, goalie).
- Joy vs Cushy: staring contests (Cushy is asleep).
- Boing vs Pixel: who tires first at Game Night (Pixel stands still).
- Bunbun vs Tutti: whose crumb is better (Fridays).
- Bolt vs Fold: "a bit bigger" vs "a large medium".
- Parcel vs Tock: the letter count. Parcel vs Fold: labels and stamps.
- Scone vs pigeons.
- Scone vs Crumb: four minutes or two.

## Who looks after whom
Bunbun feeds the town (Bolt's lunch, the Mayor's ten o'clock bun, Cobble's wall roll, Parcel's second-stop roll, Echo's four o'clock roll, the burnt batch for Prickles, Beacon
and Dr. Patch, cookies for Dusty and Joy). Dr. Patch looks after everyone, especially Bunbun (sit down), Bolt (Tuesday thumb) and Joy (wrists). Loofah calms Fizz. Tock winds Boing
down; Sketch winds Tock up. Dusty tidies around Cushy. Gloss keeps Pom on time and Blush unhurried. Posy waters Prickles. Lumi lights everyone's lamp first. Beacon counts everyone in.
Stitch mends Prickles' scarf for free. Nimbus forecasts for Bunbun. Tutti raises the twins and checks if everyone's eaten.

## How residents feel about each other (v80, canon; data in `RREL_SRC` in index.html)

Feelings run one way and can differ each way: -2 can't stand them, -1 irritated, 0 indifferent, 1 friendly, 2 close. Every pair not listed falls back on personality (below) and housemates and workmates are at least friendly. Weather moods shift a resident's feelings toward everyone by one (loved weather warmer, hated weather crankier).

### Personalities (old Animal Crossing types)
| Resident | Type | Loves the weather | Hates the weather |
|---|---|---|---|
| Bunbun | normal |  | hot |
| Fizz | smug | rain |  |
| Boing | peppy | wind |  |
| Cushy | lazy | rain, storm |  |
| Bolt | jock |  | rain |
| Pom | peppy |  | rain |
| Blush | snooty | fog |  |
| Stitch | sisterly |  | wind |
| Joy | jock | storm |  |
| Pip | normal |  | hot |
| Loofah | lazy | rain |  |
| Tock | normal |  | rain |
| Dusty | normal |  | wind |
| Sketch | normal |  | rain |
| Gloss | snooty |  | wind |
| Bobbin | peppy |  | wind |
| Pixel | lazy |  | hot |
| Mayor Marsh | smug | sun | rain |
| Parcel | jock |  | rain |
| Fold | normal |  | rain, wind |
| Posy | sisterly | rain |  |
| Prickles | cranky | sun, hot | rain, snow, cold |
| Dewey | cranky |  | rain, fog |
| Lumi | lazy |  | wind |
| Nimbus | normal | rain, storm, fog | sun, hot |
| Beacon | sisterly | fog, storm |  |
| Tutti | sisterly | sun, hot | cold, rain, snow |
| Scone | jock | wind, snow |  |
| Crumb | normal | rain |  |
| Echo | smug |  | fog |
| Dr. Patch | normal |  | cold |
| Cobble | lazy |  |  |

Defaults between types: cranky dislikes peppy, jock and smug, likes other cranky ones; snooty dislikes lazy and jock, likes smug; smug likes snooty; lazy is worn out by jock; peppy likes peppy and jock; sisterly dislikes snooty; jock likes peppy.

### Close and family
- **Sketch and Tock** (couple): Sketch 2, Tock 2. Met comparing rulers, measure things together.
- **Prickles and Posy** (couple): Prickles 2, Posy 2. She found him asleep under her sunflower.
- **Tutti and Scone** (family): Tutti 2, Scone 2. Aunt and nephew.
- **Tutti and Crumb** (family): Tutti 2, Crumb 2. Aunt and niece.
- **Crumb and Scone** (family): Crumb 2, Scone 1. Twins.
- **Bunbun and Cushy** (close): Bunbun 2, Cushy 2. Sunday tea.
- **Joy and Boing** (house): Joy 2, Boing 2. Best friends, housemates, Game Night.
- **Pom and Blush** (house): Pom 2, Blush 2. Best friends and co-owners.
- **Nimbus and Lumi** (house): Nimbus 2, Lumi 2. Share a kettle and a window.
- **Fold and Parcel** (house): Fold 1, Parcel 2. Flatmates.
- **Gloss and Bobbin** (house): Gloss 2, Bobbin 2. Flatmates.
- **Bolt and Cobble** (close): Bolt 2, Cobble 2. Talker and listener.
- **Beacon and Lumi** (close): Beacon 2, Lumi 2. Goodnight flashes across the bay.
- **Beacon and Bobbin** (close): Beacon 1, Bobbin 2. The scarf.
- **Echo and Lumi** (close): Echo 2, Lumi 2. Last song, first lamp.
- **Pip and Bobbin** (close): Pip 2, Bobbin 2. Started the same week.
- **Bunbun and Pip** (boss): Bunbun 2, Pip 2. She taught him everything.
- **Loofah and Fizz** (boss): Loofah 2, Fizz 1. Loofah calms Fizz.
- **Pom and Fizz** (close): Pom 2, Fizz 2. Mentor and protege, like a big brother.
- **Bobbin and Stitch** (boss): Bobbin 2, Stitch 2. The cedar drawer.
- **Joy and Pixel** (boss): Joy 2, Pixel 1. Joy adores it.
- **Bunbun and Bolt** (close): Bunbun 2, Bolt 1. She makes his lunch, he forgets it.
- **Bunbun and Dr. Patch** (close): Bunbun 1, Dr. Patch 2. Patch tells her to sit down.
- **Blush and Gloss** (close): Blush 2, Gloss 2. Gloss keeps her unhurried.
- **Pom and Gloss** (boss): Pom 2, Gloss 1. She keeps Pom on time, sighing.
- **Dewey and Crumb** (close): Dewey 2, Crumb 2. A quiet reader who labels things properly.
- **Bunbun and Mayor Marsh** (close): Bunbun 1, Mayor Marsh 2. The ten o'clock bun.
- **Bunbun and Dusty** (close): Bunbun 2, Dusty 2. She leaves her porch light on for Dusty.

### Friendly
- **Cushy and Cobble** (close): Cushy 1, Cobble 1. Comfortable silence.
- **Cushy and Loofah** (close): Cushy 1, Loofah 1. The thunderstorm nap.
- **Cushy and Lumi** (close): Cushy 1, Lumi 1. Nap shifts.
- **Cushy and Dr. Patch** (close): Cushy 1, Dr. Patch 1. Pillows.
- **Fold and Stitch** (close): Fold 1, Stitch 1. Scraps.
- **Fold and Sketch** (close): Fold 1, Sketch 1. Curves and straight lines.
- **Sketch and Stitch** (close): Sketch 1, Stitch 1. Tape measures.
- **Pixel and Tock** (close): Pixel 1, Tock 1. Scores.
- **Cobble and Posy** (close): Cobble 1, Posy 1. Roots and stones.
- **Crumb and Pip** (close): Crumb 1, Pip 1. Careful tasting.
- **Crumb and Boing** (close): Crumb 1, Boing 1. The pebble that rolled.
- **Bolt and Sketch** (boss): Bolt 1, Sketch 1. Sketch plans, Bolt builds, they argue about inches.
- **Cushy and Dusty** (boss): Cushy 1, Dusty 1. Dusty tidies round a boss who is always asleep.
- **Boing and Tock** (boss): Boing 1, Tock 1. Tock winds Boing down.
- **Bolt and Tock** (close): Bolt 1, Tock 1. The toolbox fence.
- **Beacon and Prickles** (close): Beacon 1, Prickles 1. Two old sailors of different seas, swapping stories.
- **Joy and Dr. Patch** (close): Joy 1, Dr. Patch 1. Her wrists.
- **Blush and Stitch** (close): Blush 1, Stitch 1. Good taste recognises good taste.
- **Prickles and Cobble** (close): Prickles 1, Cobble 1. Someone who does not talk.
- **Bunbun and Prickles** (close): Bunbun 1, Prickles 1. The burnt batch.
- **Prickles and Stitch** (close): Prickles 1, Stitch 1. Mends his scarf for free and asks no questions.
- **Dewey and Sketch** (close): Dewey 1, Sketch 1. Neat margins.
- **Dewey and Tock** (close): Dewey 1, Tock 1. Tidy shelves.
- **Dewey and Fold** (close): Dewey 1, Fold 1. Paper kin.
- **Dewey and Lumi** (close): Dewey 1, Lumi 1. A good reading light.
- **Echo and Mayor Marsh** (close): Echo 1, Mayor Marsh 1. Music for the ribbon cuttings.
- **Fold and Mayor Marsh** (close): Fold 1, Mayor Marsh 1. Signs for the ribbon cuttings.
- **Joy and Lumi** (close): Joy 1, Lumi 1. They wave across the plaza at ten.
- **Loofah and Bobbin** (close): Loofah 1, Bobbin 1. Tea on the boardwalk.
- **Beacon and Parcel** (close): Beacon 1, Parcel 1. Beacon counts Parcel in every evening.
- **Bolt and Dr. Patch** (close): Bolt 1, Dr. Patch 1. The Tuesday thumb.

### Fond rivals
- **Parcel and Tock** (rival): Parcel 1, Tock 1. The letter count, friendly.
- **Blush and Fizz** (rival): Blush 0, Fizz 1. What glow means. Fizz calls it their love language.
- **Joy and Fizz** (rival): Joy 1, Fizz 1. Bubble Pop.
- **Bunbun and Joy** (rival): Bunbun 1, Joy 1. The cookie jar.
- **Cushy and Joy** (rival): Cushy 1, Joy 1. Staring contests (Cushy is asleep).
- **Pixel and Boing** (rival): Pixel 1, Boing 1. Who tires first at Game Night.
- **Bolt and Fold** (rival): Bolt 0, Fold 1. A bit bigger versus a large medium.
- **Pip and Joy** (rival): Pip 0, Joy 1. Pip is the cookie-jar goalie and dreads her.
- **Pip and Scone** (rival): Pip 1, Scone 1. The race Pip may have lost on purpose.

### Mean: feuds and snubs
- **Bunbun and Tutti** (feud): Bunbun -1, Tutti -1. Whose crumb is better. Polite, sweet, icy.
- **Bolt and Blush** (feud): Bolt -1, Blush -2. Colour names. She thinks he has no eye at all and says so.
- **Blush and Pixel** (snub): Blush -1, Pixel -1. She calls its palette blocky.
- **Blush and Cobble** (snub): Blush -1, Cobble 0. She finds him grey.
- **Blush and Parcel** (snub): Blush -1, Parcel 0. Beige. Parcel does not know what they did.
- **Parcel and Gloss** (feud): Parcel -1, Gloss -2. Parcel is late on Bubble Bay every single day and Gloss keeps a list.
- **Joy and Gloss** (snub): Joy 0, Gloss -1. Too loud for a front desk.
- **Pixel and Gloss** (snub): Pixel 0, Gloss -1. Leaves crumbs of voxel on the waiting chairs.
- **Cushy and Gloss** (snub): Cushy 0, Gloss -1. Late, asleep, late again.
- **Prickles and Scone** (feud): Prickles -2, Scone -1. The noise, the ball over the fence, the nickname Scone gave him.
- **Prickles and Boing** (feud): Prickles -2, Boing 0. Springs, squeaking, joy before breakfast. Boing thinks they are pals.
- **Prickles and Nimbus** (feud): Prickles -2, Nimbus -1. A rain cloud, on his patio, on purpose (it is not on purpose). Nimbus is hurt and sulks.
- **Prickles and Mayor Marsh** (feud): Prickles -2, Mayor Marsh 0. A windbag in a hat. The Mayor thinks Prickles adores his speeches.
- **Prickles and Joy** (snub): Prickles -1, Joy 0. The arcade jingle carries all the way to the Meadow.
- **Prickles and Echo** (snub): Prickles -1, Echo 0. Music at three o'clock every single day.
- **Prickles and Fizz** (snub): Prickles -1, Fizz 0. All that narrating.
- **Prickles and Dr. Patch** (snub): Prickles -1, Dr. Patch 1. Refuses check-ups.
- **Dewey and Joy** (feud): Dewey -2, Joy 0. Loud, everywhere.
- **Dewey and Scone** (feud): Dewey -2, Scone -1. Overdue books, muddy pages, running in the stacks. Scone calls it Shushy.
- **Dewey and Boing** (snub): Dewey -1, Boing 1. Boing in the reading room, once, never forgotten.
- **Dewey and Pixel** (snub): Dewey -1, Pixel 0. Screens.
- **Dewey and Fizz** (snub): Dewey -1, Fizz 0. Narrates in the library.
- **Dewey and Echo** (snub): Dewey -1, Echo 1. Music through the wall during the ten o'clock quiet.
- **Dewey and Mayor Marsh** (snub): Dewey -1, Mayor Marsh 1. The Mayor's book is nine years overdue.
- **Mayor Marsh and Cobble** (snub): Mayor Marsh 0, Cobble -1. He calls him that little road fellow and has promised new stone for six years.
- **Nimbus and Mayor Marsh** (snub): Nimbus -1, Mayor Marsh 1. He keeps announcing sunny days without checking.
- **Bolt and Fizz** (feud): Bolt -1, Fizz -1. Brave paint and pompous bubbles.
- **Dusty and Fizz** (snub): Dusty -1, Fizz 0. Bubbles everywhere, on the showroom sofas.
- **Dusty and Joy** (snub): Dusty -1, Joy 1. Crumbs.
- **Dusty and Scone** (snub): Dusty -1, Scone 0. Mud on the rugs.
- **Joy and Tock** (snub): Joy 1, Tock -1. Scores shouted at teatime.
- **Scone and Tock** (snub): Scone 1, Tock -1. Touches the stock.
- **Echo and Joy** (snub): Echo -1, Joy 1. The arcade drowns the plaza music.
- **Echo and Pixel** (feud): Echo -1, Pixel -1. Chiptune is not music.
- **Parcel and Pixel** (snub): Parcel 0, Pixel -1. Too much energy before one o'clock.
- **Cobble and Scone** (snub): Cobble -1, Scone 0. Skidded through his wet cement, twice.
- **Parcel and Cobble** (snub): Parcel 0, Cobble -1. Tramples fresh mortar on the round.

### Only in some weather
- Fold toward Nimbus in rain: -2. Fold goes soggy and blames Nimbus out loud.
- Parcel toward Nimbus in rain: -1. soggy cardboard, every parcel late.
- Tutti toward Nimbus in rain: -1. no customers, and Nimbus looks pleased about it.
- Tutti toward Nimbus in cold: -1. same again.
- Prickles toward Nimbus in sun: 0. on a sunny day Prickles can just about stand Nimbus.
- Nimbus toward Prickles in rain: 0. on a rainy day Nimbus is too happy to sulk.
- Dewey toward Joy in fog: -2. nothing changes.

---

# 6. Calendar

All times US Central. The game shows weekly events, festivals and birthdays on the Neighbours page and the map's noticeboard.

## Weekly events (`EVENTS`)
| Event | Day and hours | Where (host) | Guests in the game | What happens |
|---|---|---|---|---|
| **Sunday tea** | Sunday 15:00-18:00 | The Warm Loaf (Bunbun) | Bunbun, Cushy, Mayor Marsh, Posy, Prickles | "Tea, cake and a nap on the sofa." Bunbun pours at three; Cushy sleeps; Prickles tells a story and usually falls asleep mid-way (Posy finishes it). The table has grown to Pip, Joy and "half the lane". |
| **Story hour** | Wednesday 16:00-18:00 | Dewey's Reading Room (Dewey) | Dewey, Scone, Crumb, Nimbus, Posy | "Dewey reads aloud, everyone gets a cushion." A dragon for the twins, a garden for Posy; Nimbus sits by the door on a towel; Cushy's cushion. |
| **Music night** | Thursday 19:00-22:00 | Echo's Music Box (Echo) | Echo, Lumi, Fizz, Pom, Blush | "Echo plays, Lumi dims the lights." The kettle sings an A; Fizz hums off-key; Pom twirls, Blush takes one small step to the side. |
| **Game Night** | Friday 19:00-23:00 | The Game Night House (Boing and Joy) | Boing, Joy, Fold, Parcel, Cobble, Beacon | "Board games, snacks and a lot of shouting." Pixel keeps score (it lives next door); Joy wins most, then Beacon, very slowly; Fold folds losing cards into cranes. |
| **Bake sale** | Saturday 10:00-14:00 | Marsh Manor (the Mayor) | Mayor Marsh, Tutti, Scone, Crumb, Parcel, Fold | "A bake sale for the town fund at the Mayor's." The fund is for the grand ribbon. Tutti brings ice cream; Parcel carries cakes; the twins count the Mayor's ahems. |

Guests leave home or work to attend; the host house is open to everyone while it's on; arriving rewards you once.
Other weekly habits in the lore: Bunbun and Tutti's Friday cone-for-cookie swap; the Friday cookie at Pixel's counter; Bunbun's sugar lessons on Thursdays; the salon laundry swap
on Fridays; Bolt's Tuesday thumb; Bobbin's Tuesday hammer; Echo sings in the library on Thursdays; Dewey's radio on low on Fridays.

- **v76**: Story hour moved to the library (Dewey hosts in the children's corner). New: **Town meeting** (Mondays 17:00-19:00, Town Hall: the Mayor reads the town news from the balcony, tea after; Parcel, Fold, Cobble, Dr. Patch, Tutti, Bolt, Sketch come) and **Stargazing** (Tuesdays 20:00-22:00, the weather station's roof deck: Nimbus points out the stars; Lumi, Beacon, Prickles, Dewey, Posy come). The festivals are held at the Town Hall now.

## Festivals (`FESTS`, a week each, all day at the Mayor's, with plaza decorations and a keepsake from the season's furniture set)
| Festival | Dates | Keepsake set |
|---|---|---|
| **Spring Picnic** | 1-7 April | Spring Picnic |
| **Summer Fair** | 1-7 July | Summer Fruit |
| **Pumpkin Parade** | 25-31 October | Spooky Cute |
| **Festival of Lights** | 20-26 December | Festive Holidays |

The Mayor gives a speech at each (three parts; the Summer Fair's has four, the fourth mostly thanking Tutti). Joy runs the ring toss at the Summer Fair; Bunbun enters or shares a
pie; Bolt is building bigger ribbon scissors for it. At the Festival of Lights Lumi lights every lamp at once and the Mayor says "Let there be lamps."

## Birthdays (the game's dates, `bdayOf`; the Mayor writes a note on the day)
| Date | Resident | | Date | Resident |
|---|---|---|---|---|
| 23 Jan | Dewey | | 4 Aug | Pom |
| 17 Feb | Prickles | | 17 Aug | Bunbun |
| 21 Feb | Cushy | | 19 Aug | Bolt |
| 25 Feb | Joy | | 14 Sep | Mayor Marsh (First Brick Day; he has no birthday of his own) |
| 29 Mar | Tutti | | 24 Sep | Parcel |
| 9 Apr | Pixel | | 6 Oct | Blush |
| 19 Apr | Beacon | | 8 Oct | Tock |
| 28 Apr | Posy | | 15 Oct | Echo |
| 1 May | Scone and Crumb (the twins share one) | | 20 Oct | Loofah |
| 2 May | Dr. Patch | | 25 Oct | Fizz |
| 8 May | Boing | | 28 Oct | Pip |
| 20 May | Cobble | | 4 Dec | Gloss |
| 22 May | Stitch | | 30 Dec | Nimbus |
| 31 May | Sketch | | | |
| 8 Jun | Dusty, Bobbin | | | |
| 6 Jul | Lumi | | | |
| 24 Jul | Fold | | | |

Birthday traditions in the lore: Fold makes Bolt a paper hard hat (six so far); Fold made Sketch a paper ruler; Stitch gave Dusty a lint roller. The Mayor knows both your birthdays
(the game doesn't store them).

## Holidays of the town

*Copied in full from `tools/writing/holidays.md` (2026-10-04). That file stays the source; update both.*

The town keeps its own calendar. Some days fall on (or near) real-world holidays and borrow a little from them, often turned on
their head; others are entirely the town's own. Every one has a made-up name, a host, and traditions everyone in town knows.
The four week-long **festivals** already in the game (Spring Picnic, Summer Fair, Pumpkin Parade, Festival of Lights) are the big
seasonal weeks; several one-day holidays fall inside them as their high point.

Dates are US Central. `key` is what the game and the dialogue files use.

| Date | key | Name | Real-world echo | Host |
|---|---|---|---|---|
| Jan 1 | `jar` | **Fresh Jar Day** | New Year's Day | Mayor Marsh |
| Feb 2 | `shadow` | **Cloud Shadow Morning** | Groundhog Day | Nimbus |
| Feb 14 | `twoheart` | **Two-Heart Day** | Valentine's Day | Bunbun |
| Mar 20 | `sprout` | **Sprout Swap** | Spring equinox | Posy |
| Apr 1 | `topsy` | **Topsy Day** | April Fools' Day | Joy |
| May 18 | `puddle` | **Puddle Parade** | (the town's own) | Nimbus and Scone |
| Jun 21 | `longlight` | **Longest Light** | Summer solstice | Lumi |
| Jul 4 | `bubblework` | **Bubblework Night** | Independence Day | Fizz |
| Aug 9 | `lostfound` | **Lost & Found Day** | (the town's own) | Beacon |
| Sep 14 | `firstbrick` | **First Brick Day** | (the town's own birthday) | Bolt and Mayor Marsh |
| 1st Mon of Sep | `tooldown` | **Tools Down** | Labor Day | Cobble |
| Oct 31 | `swapface` | **Swap-Face Night** | Halloween | Fold |
| 4th Thu of Nov | `longtable` | **Long Table** | Thanksgiving | Tutti |
| Dec 21 | `quilt` | **Quilt Night** | Winter solstice | Stitch |
| Dec 24 | `wrap` | **Wrapping Eve** | Christmas Eve | Bobbin |
| (your room's own date) | `roomday` | **Room Day** | (the two of you) | the pet |

### The days

**Fresh Jar Day** (Jan 1). Everyone brings last year's wish jar to the plaza and pours it out, unread, into the fountain, where the
paper dissolves into the water "so the town drinks it". Then each resident writes one thing they'll keep doing (never a thing
they'll start, never a thing they'll stop) and puts it in a fresh jar. Mayor Marsh gives a speech that is supposed to be short.
Turned on its head: no resolutions. You promise to keep a good thing going.

**Cloud Shadow Morning** (Feb 2). At sunrise Nimbus floats over the fountain. If Nimbus casts a shadow on the water, six more weeks
of cosy weather (everyone cheers, because cosy is good); if not, spring is early (everyone also cheers). Nimbus takes the
forecast very seriously and has never been wrong, because both outcomes count as right. Hot cocoa after.

**Two-Heart Day** (Feb 14). Everyone gives a sweet to someone they share a home or a wall with (housemates, neighbours,
the shop next door). The twist: you also leave an unsigned note for one person you've hardly spoken to. Bunbun bakes heart-shaped
buns with two lobes "for the two halves of you". For the two players this is the big one: the pet makes a card from both heads.

**Sprout Swap** (Mar 20). Posy lays out a blanket in the park and everyone swaps seeds, cuttings and the odd bulb. You must give
away the plant you're proudest of. Prickles always brings a cactus nobody can identify. The first person to spot a green shoot in
town gets to ring the little bell on Posy's barrow.

**Topsy Day** (Apr 1). Everyone swaps jobs for the day: the baker runs the arcade, the arcade host bakes, the mayor delivers the
mail, the mail carrier gives the speech. Nobody plays pranks: the joke is doing someone else's job earnestly and badly, and
thanking them for how hard it is. Joy draws the swaps out of a hat the night before. Falls inside the Spring Picnic.

**Puddle Parade** (May 18). Nimbus rains (on purpose, gently) along the main street and the whole town walks it in boots, jumping
in every puddle. Scone leads and is not allowed to run. Loofah hands out warm towels at the end. Biggest splash wins a paper crown
Fold folds that morning.

**Longest Light** (Jun 21). Lumi's night off: no lamps are lit, and the town stays up to watch the sky go lilac, then dark, then
starry. Everyone brings one small light of their own (a jar, a candle, a phone screen held up) and they're set in a ring on the
plaza. Turned on its head: the lamplighter is the one who gets to sit and watch.

**Bubblework Night** (Jul 4). The finale of the Summer Fair. Instead of fireworks, Fizz blows a huge bubble show over the bay at
dusk, and Joy lights the bubbles with coloured spotlights from the arcade roof. Bubbles are wished on as they pop. Nothing bangs;
Cushy can sleep through it, and does.

**Lost & Found Day** (Aug 9). Beacon brings out a whole year of things that washed up or were left behind and lays them on the pier.
Anyone can take something home, but only if they tell the story of how they think it got lost. The best story is read at
Story hour the next week. Every year someone recognises something of their own and pretends they don't.

**Tools Down** (first Monday of September). Bolt hangs up the mallet, shops close at noon, and everyone does nothing, on purpose,
together. Cobble is the host and the champion. There is a prize for the best nap spot, judged by Cushy, who falls asleep judging.

**First Brick Day** (Sep 14). The town's birthday. Bolt brings out the very first brick (kept in a velvet box at the Town Hall) and
everyone touches it for luck. The Mayor, who has no birthday of his own, celebrates this one as his. Cake shaped like a brick
(Bunbun's, very soft).

**Swap-Face Night** (Oct 31). The last night of the Pumpkin Parade. Everyone dresses as another resident (never themself, never a
monster), and the fun is guessing who's who. Fold makes masks from paper for anyone who forgets. The pet dresses as the two of you.
Sweets are given to whoever does the best impression of the giver.

**Long Table** (fourth Thursday of November). Tutti pushes every table in town together down the middle of the plaza. Everyone
brings one dish. The tradition: before eating, you thank the person on your left for one small, specific thing from the year
(the twins always thank each other for "nothing", which counts).

**Quilt Night** (Dec 21). The longest night. Each resident brings one square of fabric that means something from the year, and
Stitch and Bobbin sew them into the town quilt while everyone tells the story of their square. The quilt goes over the
bandstand. Part of the Festival of Lights.

**Wrapping Eve** (Dec 24). Presents are wrapped as badly as possible on purpose (too much tape, the wrong paper, a sock as a bag),
and the worst wrapping wins. Bobbin is the judge and also, secretly, the best bad wrapper. Part of the Festival of Lights.

**Room Day** (the day your room was made). Only the three of you keep it: the pet remembers the day the room began and makes a fuss.
It's the anniversary of Room for Two.

### Who does what on the holidays (canon from the holiday dialogue in `.claude/talk2/`, settled 2026-10-04)

**Topsy Day job swaps (final, 2026-10-04).** Joy draws the swaps from a hat the night before. They are pairs: each of the two does the other's job, earnestly and badly, and thanks
the other for how hard it is. All 32 residents are in exactly one pair (16 pairs) and every job is done by exactly one person. Where two jobs are in the same shop they are different
jobs: at the Snack Shack Joy does Bunbun's baking and Dr. Patch does Pip's apprentice work; at the Toy Box Dewey does Boing's workshop and Tutti does Tock's stockroom; at the arcade
Bunbun hosts (Joy's job) and Nimbus counts tickets (Pixel's); at Glow Up Bolt does Blush's chair, Cobble does Pom's antennae and Bobbin does Gloss's desk; at the salon Dusty does
Fizz's styling and Scone does Loofah's tubs; at Cozy Nest Echo sells sofas (Cushy's job) and Fizz dusts (Dusty's); at Hammer & Hue Blush runs the shop (Bolt's) and Fold plans
(Sketch's); at Jelly Threads Crumb sews (Stitch's) and Gloss runs errands (Bobbin's).

| Pair | What happens |
|---|---|
| Bunbun and Joy | Bunbun runs the arcade (pressed a button for an hour and it never gave her a bun; beat Joy's claw score); Joy bakes (the recipe just says "until golden"), thanks Bunbun for the oven and swears off stealing cookies. Probably. |
| Mayor Marsh and Parcel | The Mayor delivers the mail (three letters in two hours, a few words at every door, knocks twice so people think there are two mayors); Parcel gives the speech in the Mayor's hat (three parts, says "ahem" eleven times; the joke: "Why did the letter go to the picnic? It was invited."). |
| Blush and Bolt | Bolt does Blush's make-up chair (a heavy hand; Blush wore it all day); Blush runs Hammer & Hue and renames every paint ("Battleship" became "pigeon at dusk"; sold out by noon). |
| Gloss and Bobbin | Bobbin takes the front desk and books Pom three times at once (Pom was early for all three); Gloss runs every errand in order and is exhausted by ten. |
| Beacon and Lumi | Beacon lights the town lamps at one in the afternoon, six hours early; Lumi sits on Beacon's point with the spyglass and the crab shell and waves at a log for an hour. |
| Pom and Cobble | Pom mends roads (one stone in four hours; Cobble said "fair"); Cobble does antennae, one client all morning, very slowly and very well (Pom said "iconic", twice). |
| Sketch and Fold | Sketch paints signs (a perfect straight line; Fold cried); Fold plans at Hammer & Hue and measures everything once, beautifully (Sketch measures it all again after). |
| Boing and Dewey | Boing runs the library and has to be quiet (reads a story aloud, shouts only twice, a record); Dewey runs Boing's workshop and labels every toy with a little fact (Tock cries, happily). |
| Pixel and Nimbus | Pixel forecasts ("Chance of rain: forty percent. It rained. Noted."); Nimbus counts tickets, loses count at nine and starts again nineteen times. |
| Tock and Tutti | Tock runs the ice-cream cart and counts every sprinkle (a very slow queue); Tutti keeps Tock's stockroom at the Toy Box, gives every toy away free, then writes it all down very neatly for Tock. |
| Loofah and Scone | Loofah does Scone's job and has to run (walks very slowly and says "go"); Scone fills every tub at the salon in four minutes. |
| Pip and Dr. Patch | Pip runs the clinic and prescribes water and a jam tart; Dr. Patch takes Pip's apron at the Snack Shack and puts a glass of water next to every bun. |
| Fizz and Dusty | Fizz dusts the Cozy Nest showroom with a feather boa, dusts one sofa for an hour and says sorry to it; Dusty runs the salon, apologises to every bubble and says "darling" once. |
| Posy and Prickles | Posy tells the sandstorm story, forgets the ending and says "and then, a flower" (right by accident); Prickles gardens, waters in perfect rows, tells the seedlings about deserts and grumbles at the mint. She thanks him for how long stories are, he thanks her for how slow seeds are. |
| Cushy and Echo | Cushy plays Echo's plaza on the little ukulele: one note, a rest, a nap, the same note; Echo sells sofas at Cozy Nest, whispering the prices, sells one and sits on it. |
| Stitch and Crumb | Stitch spends the morning under the slide at the playground with the snail ("just a smidge damp"); Crumb sews one button at Jelly Threads, all morning, four holes, four stitches, and Stitch sells it. |

**Swap-Face Night costumes** (Fold hosts and folds paper masks for anyone who forgot; Blush does face paint and moustaches; the pet goes as the two of you):

| Resident | Goes as | | Resident | Goes as |
|---|---|---|---|---|
| Bunbun | Fizz (meringue bubbles) | | Fizz | Bunbun (floury ears, "hon") |
| Boing | Tock | | Tock | Boing (a paper spring from Fold) |
| Bolt | Sketch | | Sketch | Bolt |
| Parcel | Fold (a cereal-box beak) | | Fold | Parcel (a cap, a box, "ten past nine") |
| Posy | Prickles (mask: Bunbun) | | Prickles | Posy (the watering can; mask: Bunbun) |
| Lumi | Nimbus (a grey sheet, a cup for the drip) | | Nimbus | Lumi (a paper bag with a torch) |
| Pom | Cobble | | Cushy | Cobble |
| Mayor Marsh | Cobble (backup mask: Fizz) | | Cobble | Bolt (talks "fast") |
| Dusty | Cushy | | Dr. Patch | Cushy (lies down on the plaza) |
| Joy | Boing (mask: Pixel) | | Pixel | Joy (quiet yelling; mask: Bunbun) |
| Dewey | Joy (mask: Pixel) | | Echo | Nimbus (mask: Fold) |
| Blush | Nimbus (face paint, tiny umbrella) | | Gloss | Bobbin |
| Bobbin | Beacon (a small looped scarf) | | Beacon | Lumi (mask: the Mayor) |
| Stitch | Pom (a yarn afro, every curl named) | | Pip | Bunbun (oven-mitt ears, the hum) |
| Loofah | Fizz | | Tutti | Bunbun |
| Scone | the Mayor (a drawn-on moustache) | | Crumb | Tutti ("sweet pea" in a whisper) |

Sweets go to the best impression of the giver. Impressions are separate from costumes (anyone can do anyone). Known winners: Bobbin (best Beacon, best Pom, best Pixel), Pom (best
Joy, best Gloss), Gloss (best Bobbin), Joy (best Boing), Bolt (best Sketch), Sketch (best Tock, every year), Pip (best Bolt: "sounds happy, chief"; and the favourite for best Bunbun),
Fold (best Parcel).

**Two-Heart Day.** Everyone gives a sweet to someone they share a home or a wall with, and leaves one unsigned note for someone they've hardly spoken to. Known:

| Resident | Sweet for housemates / neighbours | Unsigned note to |
|---|---|---|
| Bunbun | Pip, Cushy, Dusty (and heart buns for all) | Echo ("they play music on the plaza and I've only ever waved") |
| Fizz | a heart soap for Loofah, every year | Bunbun ("Your buns are the best hour of my day"), or Prickles |
| Boing | Joy (a sweet in a box with a spring) | Dewey ("BOING") |
| Cushy | a heart cushion for Bunbun (eleven so far) | unfinished; last year it just said "dear" |
| Bolt | Cobble ("We share the hill") | Gloss ("Nice tabs") |
| Pom | Blush (a sweet and a new paintbrush; Blush gives Pom a heart curl clip, which Duchess wears; they pretend it's a surprise every year) | Cobble ("your hard hat is iconic") |
| Blush | Pom (the heart curl clip) | a dab of colour on card, recipient secret |
| Stitch | a heart patch for Bobbin's thimble ribbon, every year | Cobble ("your stones meet so neatly at the seams") |
| Joy | Boing (a sweet and a high five); a cookie for Pixel's counter | Posy ("your flowers are max level") |
| Pip | a jam heart for Bunbun | Beacon ("your light is nice"; written eleven times) |
| Loofah | (receives Fizz's soap) | Dewey ("I like the quiet in your library") |
| Tock | the same sweet as Sketch, every year | Lumi ("Thank you for the forty-second lamp.") |
| Dusty | (receives two heart buns from Bunbun) | Joy ("You make the town less quiet") |
| Sketch | the same sweet as Tock, every year | Scone ("you are very fast") |
| Gloss | Bobbin (a sweet with an edible sugar label) | Cobble ("thank you for the steady paths") |
| Bobbin | Gloss (a sweet and a pink tab); a wonky sewn heart for Stitch | Prickles ("nice hat") |
| Pixel | Joy, and Boing through the wall | Echo ("good songs") |
| Mayor Marsh | everyone who shares a wall with the Town Hall (nobody; so the plaque, or you) | someone, in very plain handwriting |
| Parcel | Fold (always a bit squashed) | delivers everyone else's |
| Fold | Parcel (in a paper heart); heart boxes for Bunbun's buns | Beacon ("Your light helps") |
| Posy | Prickles | Pixel (a pressed daisy) |
| Prickles | Posy (a flower from her own garden; "I found it") | Pip ("good jam") |
| Dewey | Cushy (Cushy's cushion is against its shelf) | Pixel (a list of books scored out of ten) |
| Lumi | Nimbus | Beacon ("Two flashes means goodnight.") |
| Nimbus | Lumi (a cloud-shaped marshmallow) | Fizz ("your bubbles are a very nice kind of weather") |
| Beacon | the crab shell, and Lumi across the dark | Dewey |
| Tutti | Bunbun (a heart sundae for her heart bun) | Prickles ("you're very brave") |
| Scone | Crumb | Dr. Patch ("thank you for the plaster") |
| Crumb | Scone (an almost-heart pebble, "practice") | Echo ("I listen to your songs") |
| Echo | plays everyone else's love songs on the plaza | Pixel (a song with no words) |
| Dr. Patch | a heart pillow for Cushy | "please drink some water" |
| Cobble | Bolt | Gloss ("your shop step is very well swept") |

**Long Table seating.** You thank the person on your **left**, so "A thanks B" means B sits at A's left; nobody can be on two people's left in the same year. The twins are the one
exception everyone allows: they sit together and thank each other for "nothing", every year. Thanking someone back after your own thanks is allowed and common (Nimbus and Lumi, Posy and
Cobble, Prickles thanking Posy for the watering). This year's seats, each chain read left to right as "thanks":

| This year (A thanks B, B is on A's left) | What for |
|---|---|
| Mayor Marsh → Tutti → you two | the Mayor: the free scoop on a hot August day, or pushing the tables; Tutti: "always asking about the twins" (she asks you to sit on her left) |
| Joy → Pixel → Bunbun | Joy: counting her tickets right in April; Pixel: the Friday cookies ("what cookies") |
| Boing → Tock | the cushion on the ceiling |
| Pom → Gloss | hiding the comb in the same drawer every time |
| Parcel → Dewey → Echo → Lumi → Nimbus | Parcel: the book about the long walk; Dewey: the slow song under its window in March; Echo: the lamps lit as its song ends (the night in June); Lumi: the cup by the door that fills by morning (Nimbus thanks Lumi back for stepping over the hearth puddle) |
| Fold → Cobble → Posy | Fold: the stone moved so the paint pot wouldn't tip; Cobble: planting round his stones (Posy thanks him back for fitting stones round her roots) |
| Prickles → Stitch | mending the scarf twice |
| Blush → Beacon → Bobbin | Blush: the colour of Beacon's scarf in March; Beacon: the dropped stitch in the scarf |
| Bolt → Sketch | catching the measurement he skipped in June |
| Dr. Patch → Bolt (usually) | "saying ow when it hurt" |
| Scone ↔ Crumb | nothing (it counts) |

Earlier years, as the residents remember them: Cushy → Dusty (for straightening Cushy); Dusty → Bolt (the sawdust); Loofah → Pip (the jam; Pip cried); Fizz → Pom (not touching his
hair; Pom cried); Stitch → Fizz (sitting still at his fitting); Tock → Pixel (counting together at the Fair); Gloss → Tock (arriving five minutes early in June); Bobbin → Stitch (humming
on a Tuesday in May). Bunbun hopes for you on her left and would thank you for coming in hungry. Dishes: Bunbun six loaves, Beacon chowder in a tin pot, Dewey a pie with a pastry book,
Prickles Bunbun's burnt cookies, Nimbus soup, Tutti one giant sundae (and the tables), Fold paper boats of nuts and 106 name cards, Cushy the cushions, Dusty the napkins folded square,
Echo music between courses, Pom curly pasta, Pip four jams, Joy popcorn, Lumi lamps on strings and warm milk, Blush beetroot salad ("deep garnet"), the Mayor cranberry jelly, Parcel
envelope sandwiches, Dr. Patch soup, Cobble dense bread, Sketch a pie in sixteen, Pixel square crackers, Gloss name cards, Posy a nasturtium salad, Loofah hot towels, Bobbin mint
biscuits, Fizz bubble-gum pudding, Stitch stew and hemmed napkins, Boing a wobbly jelly, Tock twenty-four jam tarts, Bolt levels every join.

**First Brick Day** details: the town's birthday cake is Bunbun's, brick-shaped and very soft (Pip pipes wavy mortar lines; Bolt taps it with the mallet: "happy"); Bolt carries the brick,
Sketch walks beside him, Dusty dusts it first at the Mayor's request, Gloss organises the queue, Fold paints the "Happy Birthday Town" banner across the whole hall, Stitch made the velvet
box and checks the lining. The Mayor's "not-birthday": a five-part speech, birthday wishes written in his big book, a candle on his slice, a bow tie from Fizz, a rosette from Stitch, a
crown folded by Fold over his top hat, "Happy Birthday" played slow by Echo, a letter from Parcel that says "happy birthday, Mayor" (he cries), a pixel cake from Pixel, the lamp by his door
lit first.

---

# 7. Canon log and open questions

## Canon log (what became canon, and when)
- **Sept 2026, early builds:** the room, the pet, the town map; the nine shopkeepers and their shops (Snack Shack, Bubble Salon, Toy Box, Cozy Nest, Hammer & Hue, Glow Up Studio, Jelly Threads,
  Jelly Arcade); `keepers-bible.md` and `KBIB` (friendship levels, stories, relationships); the capsule machine and Capsule Pals; the Journal written by the pet; resident Inbox letters.
- **v36:** keeper close-ups and chat; friendship levels New face, Regular, Friend, Good friend, Bestie.
- **v48:** pet traits; town cheer levels and landmarks (bunting, candy cart, balloons, bandstand, pet statue).
- **v49:** eight shop assistants with shifts so shops never close; three neighbourhoods (Sugarloaf Lane, Bubble Bay, Playhouse Hill); houses for all; roommates (Pom & Blush, Gloss & Bobbin, Boing &
  Joy) and the couple Tock & Sketch "who met comparing rulers".
- **v50:** fifteen townsfolk; Lantern Meadow; Tutti with her niece and nephew the muffin twins; Posy & Prickles a couple; Lumi & Nimbus housemates; Parcel & Fold flatmates.
- **v51:** town life: gifts and loves, birthdays, weather, jobs, the garden, parcels between the two of you, weekly events (Sunday tea, Story hour, Music night, Game Night, Bake sale) and four
  festivals (Spring Picnic, Summer Fair, Pumpkin Parade, Festival of Lights).
- **v52-v60:** one connected world with the plaza in the middle and the neighbourhoods in the corners; residents walk their schedules; the world is countryside, not an island (v60).
- **v62:** one pet form, no egg, no growing up; bond levels.
- **v63:** a head for each of you; furniture remembers who placed it.
- **v64:** the simplified loop ("Today with <pet>"); favours, dreams, story levels and sticker cards removed.
- **v65:** a furniture set per resident (32 sets, chapter 4) and room makeovers (three requests each); v67: every finished makeover room stays in their house.
- **v66:** reaching each other through the pet; houses refurnished in each resident's own set.
- **v68-v69:** conversations on the map (`TALK`, about 6,000 lines): busy lines, openers, topics, questions, gossip, deep talks (Good friend and up), goodbyes. Facts the writers invented are
  in chapter 4 and are canon.
- **v70 (in progress):** real local weather; the town's holidays (`holidays.md`) and the holiday/weather/time-of-day dialogue in `.claude/talk2/`.
- **2026-10-04 (this bible):** pronoun decisions for all 32 (Pom, Cushy, Stitch, Bobbin, Parcel, Fold, Lumi, Nimbus they/them; Loofah, Tock, Dusty, Sketch, Pixel, Dewey, Beacon, Echo, Dr. Patch it);
  the Mayor has no birthday and keeps First Brick Day; the twins share one birthday; Pip lives next door to Bunbun on Sugarloaf Lane; the Beacon-Lumi goodnight signal (two flashes, then Beacon's
  long one); Topsy Day pairs (chapter 6); Lumi lighting "your lamp first" is a running joke, not a contradiction.
- **2026-10-04 (fixes applied):**
  - *Topsy Day* final for all 32 (16 pairs, chapter 6): the twelve written pairs kept; Fizz and Dusty, Posy and Prickles, Cushy and Echo, Stitch and Crumb added. Rewritten in `.claude/talk2/`:
    the topsy lines of Lumi, Fold, Dewey, Prickles, Tutti, Echo, Cobble, Scone, Fizz, Dusty, Posy, Nimbus, Cushy, Crumb, Stitch and Dr. Patch's first line; Boing's and Tock's lines now say
    Dewey ran Boing's workshop and Tutti kept Tock's stockroom (so no job is claimed twice).
  - *Swap-Face Night:* Lumi goes as Nimbus; Fold's sweet line is now about Fold's Parcel; masks recorded for Posy, Prickles (Bunbun) and Echo (Fold).
  - *Long Table:* seating made consistent (chapter 6 table): Tutti asks you to sit on her **left**; Tock's, Gloss's and Bobbin's thanks moved to "last year"; Nimbus and Posy thank back;
    Pip's memory is Loofah thanking him (matching Loofah's).
  - *Pronouns:* every they/it line found by a full re-scan of the 64 TALK files was fixed (Cushy and Pom in many files; Nimbus in Blush's file; Dusty "if they have" and Beacon "distract
    them" in Pip's and Joy's files; Pixel "they keep them" in Posy's holiday file). Sheets: `cactus.md`, `patch.md`, `posy.md`, `polish.md`, `cone.md`, `sponge.md` ("They would live" for
    Loofah) and their copies in `keepers-bible.md`.
  - *Names:* Pencil, Spool and Lantern replaced by Sketch, Bobbin and Lumi in `crane.md`, `book.md`, `beacon.md`, `gramo.md`, `keepers-bible.md` and the `KBIB` copies in `index.html`.
  - *Facts:* Pip's home, the Clockwork Cottage, Tutti's niece and nephew, the Mayor's deep talk (he keeps First Brick Day; offers to share your Room Day), the Beacon-Lumi signal, Cushy staying
    awake for the flower, Echo near five, "in town" not "on the island", Prickles' fifty years (`MK_REQ`); home paragraphs in the sheets now match `HOUSES` (Pip, Dusty, Sketch, Tock,
    Gloss, Bobbin, Loofah, Tutti and the twins, Echo, Posy, Prickles).
  - *The pet doesn't grow:* Stitch's "Did {n} grow?" and grown-up jumper, Bobbin's tape measure, Dr. Patch's measuring (now hugs), Prickles' "grow into a hat", and `KBIB` Bunbun, Bolt and
    Stitch.
  - *Fizz and Pom:* not related; `MK_REQ` stylist request reworded ("Pom pops round", mood "lazy, fond, comfy", "you've saved a friendship"); `keepers-bible.md` table says "proud mentor
    (like a big brother)".
  - *Code:* `bdayOf` gives the Mayor 14 September and Crumb Scone's date (1 May); town-life Parcel lines use "their" / "on the way"; `HOUSE_DEF.studio` "Pom is vibrating, but means well".
  - The `/* <talk> */` block in `index.html` was **not** touched: it must be regenerated from the edited `.claude/talk*/` files.

- **2026-10-04, friendship-level conversations (v72, `.claude/talk3/<key>.js`, `TALK[k].lv` / `mile` / `nick`):** every resident now talks differently from New face to Bestie, marks milestones (first meeting, a week, a month, a season, a year; 10, 50 and 100 chats) and has a Bestie nickname for the player. The facts below were invented in those lines and are canon now. Several long threads resolve at Bestie (Gloss's polish thirty-seven, Stitch's tape measure cosy, Blush's unnamed colour, Nimbus seeing the sea from Beacon's lighthouse, Prickles' last chapter). Prickles' flower jars at Stitch's are now seven (they were six). Still open: the crab shell, the snail, the bath boat, the satchel and Pom's curl number one stay unnamed; Prickles' sea trip is planned (the morning after the first warm spring day) but hasn't happened.

### Closeness dialogue (v72): Sugarloaf
- Bunbun: her mum's recipe book has a page "be kind to the dough, it's doing its best". Lets Joy's cookie thefts slide; Joy leaves an arcade ticket per cookie (eleven in a jar), Bunbun puts a jam heart on Joy's cookie. Dusty returns her cookie tin washed every week; she knows. Nickname for the player: "crumpet".
- Pip: Wednesday lunch with Bobbin; taps the shared wall twice at night, Bunbun taps back once. Rang the bell once on a Monday. Secret apricot-and-honey jar for Bunbun's August birthday (she loves apricots, pretends not to). Wants a Summer Fair table "Pip's, with Bunbun". Batches up to thirty-one (plum and ginger). Before Bunbun someone called his shelf "just jam". Nickname: "chief taster".
- Cushy: Bunbun still has Cushy's first (lumpy) sofa, by the window at Sunday tea; Bolt called it "characterful". Dusty's card next to Cushy in the shop: "not this one". Has a lilac cushion named after the player. Nickname: "nest-mate".
- Dusty: guessed Cushy's secret cushion from lavender scraps; tallies your chats inside the stockroom door; Tutti gives it a free vanilla scoop weekly (no sprinkles) for the sprinkle disaster; eventually sits on a shop sofa. Nickname: "sunbeam".
- Tutti: Boing's wind-up toy in her cart is "Six O'Clock"; new flavour for the two of you "Two Spoons" (strawberry and mint); a pigeon Scone races now visits daily; the twins drew the two of you in a family drawing; first night with the twins was a basket by the freezer (origin still open). Nickname: "cherry".
- Scone: wants to be "like Parcel but faster"; practises losing nicely (Dr. Patch's idea); Joy called his pinball loss a "speedrun". Counts 22 ahems at the bake sale, Crumb counts 21. Nickname: "co-captain".
- Crumb: see-through pebble labelled "Light comes in"; an almost-heart pebble kept "for practice"; keeps the snail's wall damp with a cup; gave Dr. Patch a holed pebble (on its windowsill); wants to tell Echo she likes its songs; the snail is still unnamed. Nickname: "pebble".
- Dr. Patch: Bolt has a punch card (nine stamps, wants a gold tenth); listens at the back of Story hour; read about snails six days for Crumb; has never been ill; first patient was a Nest cushion ("a cousin", says Cushy); at Bestie gives you a prescription pad. Nickname: "dear heart".

### Closeness dialogue (v72): Bubble Bay
- Fizz (he): arrives at the salon at 7:04 for an entrance; an unsigned postcard via Parcel shows a tub on wheels, "still floating?" (from the circus, he thinks; may reply "Landed. Very happy. Bubbles intact."); new scent "Tuesday" (pear and a little rain), plans "Not Bread" after the player; at the circus a very big bubble met a very small tent; sometimes sits in an empty tub after closing; would float two cups for you if he plays the Floating Fizzini again. Nickname: "encore".
- Loofah (it): comes in at one; once counted 212 steam clouds from the shelf; made you two a hum, "warm with a little wind"; naps on Beacon's step on days off (once soaked up Beacon's blanket); folds your towel into a swan; Gloss sat with it for its nap; Fizz talks about retiring somewhere warm on cold days. Bath boat still unnamed. Nickname: "toasty".
- Stitch (they): a "nearly" drawer besides the someday drawer; first coat had three sleeves; a "Fold drawer"; Prickles' flower jars have grown to seven; a tin of offcuts from the pet's things; the two-necked jumper is finished and waiting; secret wish for a tape measure cosy, which Bobbin makes (mint, crooked). Nickname: "pocket".
- Beacon (it): Bobbin's postcard of the scarf marks the dropped stitch "favourite"; a gull once sat in Fizz's hair on the pier; the gulls were late back this year; sweeps the light slower past your house late at night as a hello; notches the rail per chat; year gift = a brass bell from a boat that came home; at Bestie you two are on watch if the light fails. Crab shell still unnamed. Nickname: "first mate".
- Pom (they): gave Duchess a gold comb (now Brenda and Gerald want one); caught a Fizz bubble in a jar for the pet's mood board; each of the twelve broken combs broke on a nervous day; names clouds ("Gary"); Bolt's hard hat will get one curl; books a day off at Bestie; talks in their sleep (Blush says). Curl number one unnamed. Nickname: "icon".
- Blush (she): buys Bolt's paint every Monday; colour journal nearly at its twelfth book; an unnamed colour inside the first journal's cover, named "Three at the door" at Bestie; Pom's comb-print colour is "pressed lilac"; has painted your cottage; at Bestie finishes the pet's journal page and catches its shine in the plaza painting. Nickname: "lilac".
- Gloss (she): a new teal tab for "people who make me smile" (you two double-tabbed gold and teal); studio book is pink leather with gold corners, spine mended by Stitch; writes "Breathe" between Pom's appointments; a private book with only a "friends" page; at Bestie wears polish thirty-seven and names it "two at the desk". Nickname: "gold tab".
- Bobbin (they): Wednesday lunch with Pip; ties a knot on the thimble thread each time you visit; knitting a tiny blue-and-cream scarf for Beacon's crab shell; makes Stitch's tape measure cosy; mint coat has its first sleeve and a pocket inside a pocket holding their first sewn button; at Bestie no longer scared of running out of thread. Nickname: "best button".

### Closeness dialogue (v72): Playhouse Hill
- Boing (he): names a toy after you, "Springbean" (a bean on a spring with two leaves, hops twice); a secret "Not Bouncy" drawer of quiet toys (wooden boat, felt rabbit, a cup; at Bestie a wooden model of your room); a tea-making spring for Tock (mostly puddles); scores Game Night dishes, best 4,200 ("valid", says Pixel); the pet is on the Toy Box box art. Nickname: "springbean".
- Joy (she): knows Boing writes her "a fan" letters, keeps them in a shoebox under her bed, writes back once a year as "a fan of a fan" (Parcel winked once); on the arcade's first day nobody came until Boing bounced in at three, she still checks the door at nine; fears every cabinet going dark; practises cheers in the mirror; plans a co-op-only cabinet "Room for Two"; Fizz beat her at Bubble Pop once when she sneezed; Tock once wrote "very good effort" in her score notebook. Nickname: "MVP".
- Pixel (it): first memory is one ticket counted "one", kept at the bottom of the jar under the pink ones (pink on top so Joy sees); arrives 12:58; secret Drop score exactly one million, then stopped; sits second row at films so Joy can see its face; friend count 16 at Bestie (Crumb, and a gull that sat on its antenna); writes you on every high-score list as "CO-OP" above AAA. Never uses exclamation marks. Nickname: "save point".
- Bolt (he): first build a leaning birdhouse on his gatepost (three bird families so far); earns the gold tenth stamp on Dr. Patch's card; Blush leaves him a Monday colour card "Hard Hat Sunrise"; at Bestie paints his beige door "Two Friends Knocking" (Blush's name); builds two-person ribbon scissors for the Summer Fair and a pink bench outside your door with a gap for the pet; a Cushy-shaped dip in a sofa frame. Nickname: "cornerstone".
- Tock (it): favourite clock is the small hall one, 11 seconds slow a week, fixed Sundays; says each toy's number as a goodnight in the quiet hour after five; 604 marbles; Boing's bouncy birthday toys on its only unlabelled shelf; kept Tutti's Topsy Day labels ("Pistachio" on the marble bin); marks Sketch's height on the doorframe yearly; a thirteenth clock in lime and blue for you at one year; the ledger's last page lists people, you first; Boing brings biscuits to Tock time. Nickname: "second hand".
- Sketch (it): the Toy Box's third step is 4 mm taller ("honest", says Tock); plans a numberless clock (one dot at four) for Tock's birthday; 388 plans since Bolt found its napkin; added a handle to the thinking door; glasses are plain glass, pushed up when proud (Tock and Fold know); your bench is its second plan to work first time; Tock and Sketch plan a guest room for you at Clockwork Cottage; they hold hands on the walk home counting steps. Nickname: "square one".
- Parcel (they): answer Beacon's boat letters signed "a boat" (later "a boat and a friend"); Fold's paper hearts in their jar: 206; first letter carried was Bunbun's "breakfast is at seven" to four houses (she keeps it beside her mum's book); fear losing their place in their head; at Bestie their first own letter "from the box who knocks", and a third knock "for love"; a lime-and-blue stamp of your door at one year. Satchel still unnamed. Nickname: "first class".
- Fold (they): folding a crane for everyone in town (34 with you two, 31 done; missing Fold and you two); unfold one wing on dry evenings to remember they can; at Bestie paint the door at the lane's end (a curl and a small heart, left corner leaning on purpose); admit the gifts were never the wind; a seventh paper hard hat for Bolt with a curl; paints the post-office sign and a sign for Echo's music box; hums on the stairs now. Nickname: "good corner".

### Closeness dialogue (v72): Lantern Meadow
- Mayor Marsh: Sunday's top hat has a favourite dent from the fountain opening; his moustache spoon was Bunbun's gift after the first ribbon cutting ("for keeping your shape"); posts speeches to himself so they "arrive fresh"; may say one sentence at Sunday tea; leaves hot milk on his gatepost for Lumi ("From the balcony"), Lumi washes the cup in the fountain; Fizz asked to give the joke (part three) of the Summer Fair speech; someone clapped once at his empty-plaza speech (he thinks Cobble); asks you two to hold the two-person Summer Fair scissors. At Bestie: the goose joke ends "and the goose said, I only came for the bread"; a pink-and-lime Deputy rosette engraved by Bolt "For holding the other handle"; takes his hat off only for you. Nickname: "deputy".
- Dewey (it): a library card for anyone who comes back; Sketch let one "not yet" drawing onto the shelf (Tock's key); Boing added a paper moat with a leaping fish to the castle pop-up book; reads by Lumi's sleeping glow at three; Nimbus returned a book dry in three towels; keeps 11 of your bus-ticket bookmarks; fears being put in a drawer again; leaves the back-room door open to hear Echo on Thursdays. Bestie: the blank book's second line "Then two people moved in, and someone had to leave a light on for them too."; a gold-edged card. Nickname: "bookmark".
- Echo (it): tunes the ukulele to the kettle's A; writes Bunbun's four o'clock skip into songs; plays "the soft one" for a small quiet clapper by the fountain; record shelves "Tuesdays that turned out fine" and "The day before you two"; plays in "F-for-Fizz"; Cobble has said "Mm. Good." twice; the Mayor's town song has three one-minute parts with a goose in part three; the scratch on its first plaza song came from falling off a bench on a windy day; at the first music night Lumi dimmed one lamp by the door, Echo dims it first every time for luck; fears the note getting stuck again; your song is "Room for Two... and a little one"; the pet's two tunes are one tune half a bar apart. Nickname: "chorus".
- Cobble (he): Bunbun once hid his roll in a lamp post's little door; Bolt practises "loud pauses"; Posy left him radishes "For the roots"; still on page 12 (granite) of Dewey's rock book; Bolt fixed a gate on Tools Down, "disqualified, fondly"; once fixed every wobble for days without sleeping until Bolt found him on the hill; Bolt wants to rebuild the old park bridge with him. Bestie: the 42nd shelf stone "Keystone" (where you two first stood together); starts the round-town road with your lane; year stone in his vest pocket next to his first stone. Nickname: "keystone".
- Lumi (they): an owl near the Mayor's hoots when the lamp is lit; once lit a street as a smiley face (Nimbus saw it from the hill); talks about "their window" in their sleep; the lights-off minute is planned for Longest Light (everyone covers their small jars for one minute); calls the star over your house "theirs"; your gate lamp is lit first and passed last going home; a small star with your initials on the pole at one year. Nickname: "firefly".
- Nimbus (they): the seven umbrellas are for forgetful people (Prickles, the Mayor, Bolt, Fold, both twins, a spare for you); eleven of Posy's forget-me-not pots on their sill; trades fog notes with Beacon via Parcel; a page for each of you in the weather book; Crumb counted 61 boots at last year's Puddle Parade. Bestie: has been up Beacon's lighthouse and seen the sea from high; writes "certain" for the first time; a heart-shaped puddle by your gate. Nickname: "sunny spell".
- Posy (she): a marigold seedling for every new resident; Scone's worm is "Mayor Wiggles"; rosemary on Bunbun's step; the night stock by the fountain lamp (the pet's favourite) was planted by Lumi; worries the sea trip will make Prickles miss travelling. Bestie: the 301st sunflower seed is yours (first row, nearest the path); Prickles secretly waters her at night; the two-bloom rose is named after the pet; twelve pressed flowers at one year. Nickname: "sprout".
- Prickles (he): the boat cat was Biscuit (ate the hardtack, slept in his helmet, bit him twice); a lizard on Cobble's wall reminds him of Captain; the sandstorm chapter is 40 pages; Stitch has seven of his flower jars; Cobble has said "good hat"; an empty pin hole for a 13th flag on the map, the sea; the sea trip is set for the morning after the first warm spring day. Bestie: a pink pennant for the pet; his last chapter ends "and there she was, with the can". A small pink flag for you on the map at one year. Nickname: "trailmate".

- **2026-10-04, the civic places (v73):** the Town Hall, the Library, the Plaza Post Office, the Weather Station, the Lamplighter's Shed, the
  Sunday market and the park became real (see "The town's civic places"). New furniture sets named for them: Town Square (`ctownhall`),
  Lending Library (`clibrary`), First Class (`cpostoffice`, Parcel's Bestie nickname for you), Fair Weather (`cweather`), Wick & Ladder
  (`clampshed`), Market Morning (`cmarket`). Story hour, the bake sale and the festivals still happen at the hosts' houses.

### Neighbours talking (v80): Playhouse Hill
- Joy's 88,400 at pinball is the 305th entry in Tock's score notebook (marked "loud": shouted during tea); Tock and Pixel have agreed on Joy's scores 42 times (91,240 is one).
- Parcel knocks once at Pixel's before one o'clock, twice after. A gull on Pixel's friend list posted it a postcard.
- Blush posted Parcel a pink ink pad; Parcel took it for mystery mail and gave it to the Mayor. Parcel's stamp is a brown heart.
- Blush's colour names: wet Parcel is "wet oatmeal"; Bolt's rain-streaked paint is "Bolt after a long day". Bolt's "Bolt's Best Blue" is secretly "twilight harbour" on the order form.
- Joy's level-three jingle rhymes "bonus" with "bonus". Dewey keeps a grudge "page sixty" for anyone who sides against it.
- Echo's last song of the day, "First Lamp", has no words; Lumi lights the lamps to it; Joy turns off the arcade's attract loop while it plays.
- Boing added a second tower and a slide to Dewey's pop-up castle (a knight afraid of stairs) and once caught page 91 of chapter nine in the wind.
- Boing fell asleep upside down on the claw machine at 11:30 one Game Night (it ends at midnight). Prototypes: Sir Flapsworth (a flapping fan) and two "Wobbles Two" (one upside down; Tock labelled them A and B).
- Bolt threw his hammer over the toolbox fence at 7:12 to celebrate a birdhouse; Tock labelled it and gave it back with a bow. Bolt knows three of about 400 part numbers.
- Sketch measured Cushy's shelf at 87 cm ("yay big"). Bolt drew a shed with no roof, "for the stars". Fold's paper ruler for Sketch is 0.4 mm crooked on purpose with a heart at the end.
- Parcel stamped DELIVERED on the kettle again ("lovingly", Fold allowed); Parcel counts Fold's paper hearts every night (206).
- The Mayor has opened Cobble's bench three times and calls him "my little road fellow"; Cobble corrects him: "Cobble". The Mayor keeps a towel at the Town Hall "for emergencies, and speeches". Fold's three-part ribbon banner has a goose in part two.
- The arcade sign stays on all night through storms. Cobble likes standing in the rain after work.
### Neighbours talking (v80): Lantern Meadow
- Scone calls Prickles "Old Pokey" ("Old is for cheese," says Prickles). Captain the lizard ate the north half of Prickles' map, which is why north was wrong.
- Boing made Prickles a wind-up cactus with googly eyes; Boing's new robot sings four songs (one a sea shanty for Prickles) and wakes him at seven. Prickles has given in on the camel: "small, sandy".
- Prickles snored through the Mayor's last speech; the Mayor took it as being moved to silence.
- The Mayor borrowed "Speeches for All Occasions" nine years ago on a Tuesday and added a goose chapter; Dewey jokes about a "four thousand stamps" fine.
- Echo practises scales at ten (they carry through the library wall); its library song is mostly silence with a page turn, played Thursdays, and Dewey leaves the back door open to hear it. Echo sings the shanty as "heave away, my jelly boys", holds its opening C for 40 seconds (Pixel timed it; Pixel calls Echo's songs "lift music"). Part three of the town song: the goose honks in C.
- Nimbus gave the Mayor a pink umbrella from the forgetful-people stand. Cobble's hard hat "fits two. Nearly." (he shares it with Prickles in the rain).
- Bunbun leaves a Monday cookie (lavender shortbread) in Posy's watering can for Prickles; Posy knows and pretends to water.
- Tock reshelved 42 picture books for Dewey; the library has 31 shelves plus a crooked one by Bolt that holds the poetry. The library porch gives 2.1 metres of dry.
- Fold folded Dewey a paper moth for the desk. Crumb labels Dewey's returns in tiny letters ("Damp, forgive it." "Has a moth.").
- The Mayor's Summer Fair speech has Bunbun in part two; he is planning ribbon cuttings for a new bench beside the old bench and a new noticeboard.
- Prickles' planned sea trip is a secret Posy pretends not to know about.
### Neighbours talking (v80): Sugarloaf Lane
- Tutti crumbles Bunbun's burnt edges into her vanilla; Bunbun recognises her own crunch.
- Scone returned the dinosaur book with pages 40-52 jammed together, spoiled a 400-page book at story hour ("the bear goes home"; Crumb hummed for an hour), and calls Dewey "Shushy". The library has two racing books in the back corner.
- Scone put a playground frog in the Nest's laundry basket; it ended up on the display sofa and Dusty couldn't move it. Scone's two footprints in the cement by the bench were kept by Cobble as a reminder.
- Joy hid a cookie in a display cushion; Cushy ate it asleep. Pip counts to a hundred out the back every morning, exactly when Joy comes in; Bunbun allows Joy one official cookie a day.
- Bunbun's tickets: one rubber duck per 20; she keeps eleven on the shelf next to her mum's book. Boing made Joy a cap with a fan in it.
- Dr. Patch sleeps on a crunchy buckwheat pillow (Cushy's: feather, medium, turned twice a night). Bunbun is owed 31 "sit-downs" by Patch (plans to take one at Long Table). Patch leaves leaflets in Prickles' letterbox; he burns them.
- Bolt's Tuesday thumb is the left one, because Bobbin has the small hammer that day. The Wednesday thumb involved Cushy's ladder. "An arch holds itself up by leaning on itself."
- Cushy is making Dusty a secret lavender cushion with a pink tassel; Dusty has guessed and will act surprised. This Two-Heart Day's heart cushion for Bunbun is the twelfth (she sleeps on four); this year's heart buns are raspberry.
- Pip and Bunbun tap the wall: two taps = goodnight and thank you, one back = you're welcome.
- Crumb gave Pip a red pebble ("Jam. Pip's. Don't eat.") and Scone a round one ("Rolls. Scone's. Speed."); she hums "Aunt Tutti's song", which Tutti thinks she made up. Boing is building Crumb a pebble ramp with a fast/slow switch.
- Gloss once booked Cushy a nap in their own shop (2 to 3) so they'd be awake for a delivery. Fizz's bubbles left nine rings on the Nest's velvet chaise.
### Neighbours talking (v80): Bubble Bay
- Gloss's list of Parcel's lateness is laminated and colour-coded (Parcel's colour: beige). Parcel was on time once by doing the Bay round backwards (a hedge ended up in their flap). Gloss's private book has a "friends" page with Bobbin first, in ink. Gloss and Bobbin keep a "quiet thing" evening, seven till eight. Gloss books Pom nine minutes late in pencil every day and has a blue "fluffing time" tab for rainy mornings.
- Pom has nine named alarms and none of them work. The front curl Pom named after Fizz popped mid-appointment and Duchess sulked.
- Pixel collected its stray voxels from Gloss's waiting chairs into a jar labelled "Gloss, sorry". Blush dabbed "new pea at dusk" on its cabinet and it won't wipe off. Its top voxels go soft in the heat.
- Beacon gave Bobbin a blue button off the tide line (43 buttons now). A small crab lives under plank 112 of the boardwalk (204 planks); Bobbin is knitting it a scarf. Bobbin labelled the teapot "Teapot: no thread" in thread.
- Blush wants one pink stone in Cobble's road; he says pink stones crack in frost. Cobble never notices her digs and thanks her for them.
- Sketch kept Stitch's centimetre and checks it every morning, and is secretly drawing a shelf for Stitch's someday drawer.
- The library's quiet sign was painted by Fold. Fizz once narrated someone reading a road map for forty minutes; a bubble from his hair let the paper moth out of chapter nine. At a bake sale Bolt called Fizz's bubbles "pompous" and then sat on Fizz's cake box. The salon has a poster of Fizz at the circus lifting a teacup (dusted daily); a "Loofah, our calm" poster is planned (Loofah wants small letters).
- On fog nights Beacon sounds the horn twice for Lumi; Lumi taps the pole twice back (as well as the goodnight flashes).
- Fold's signs "know Tuesday is windy". Stitch's window star from Fold has a crinkle on its third point (Fold blames the wind).
- Gloss has booked Blush every sunset this summer for dreaming time at the studio window (with a cushion and a pear).

### Money and town dailies (v83)
- The town's money is **buttons** (everyday), **glimmers** (rare and special; earned from big moments, spent on showpieces and room size) and **tickets** (the arcade's, for the prize counter and the capsule machine). Hearts mean love, never money.
- Beacon buys treasures for its shelf of adopted things ("It’ll be happy on my shelf"). Treasures wash up on the Bubble Bay boardwalk every day.
- Bunbun's day-old basket at the Snack Shack: one free bake a day each ("Nobody goes hungry on my lane"). Pip minds it when she's out.
- The wishing well (Lantern Meadow side of town) takes ten buttons a wish; wishes sometimes come true the next day, delivered by a neighbour with "a funny feeling". When they don't, Beacon finds your buttons by the well, polished.
- Prickles will hear one joke a day and rates it. Good ones earn something from his trail jar: a pressed cactus flower he carried across the Great Dry in his hat, a jar of seven sands from seven dunes ("Don’t shake it"), his old compass ("points mostly north; that was the whole trouble").
- Blush tries a free mystery colour on the pet once a day ("Mystery colours are never a mistake. Well, rarely.").
- The Mayor posts a parcel and a letter on the first of every month, in three parts where possible.

### More town life (v85): Lantern Meadow
- Dewey: a plain pink ribbon bookmark for thirty years (nibbled when chapters end badly); 41 of Bunbun's story-hour bookmarks in a drawer; plum book cloth hides thumbprints; Bolt's poetry shelf leans 11 degrees (Sketch's protractor); a shell Beacon left in a book is catalogued under S; Pom returned a hair magazine 11 days late with curls drawn on every model; Gloss made it a colour-tabbed returns calendar (gold for the Mayor's book); its fines jar is nearly empty; it buys a paper bookmark from Fold's stall every week.
- Lumi: lamp post six faded into a nine (Fold re-lettered it); the Loop lamps are 11, 11, 12 then 9 metres apart; the well lamp is lit last, the Mayor's first so he stops waving; Posy's gate lamp early for her seedlings; a blue boardwalk bottle with a candle on the sill; Patch's heart sticker glows pink on Lumi's panel; Lumi and Pixel share a quiet 3 a.m.
- Nimbus lends Parcel the pink umbrella in the rain, is saving tickets for a 40-ticket umbrella at the prize counter, keeps buttons in a jar at the station; Sketch found its rain gauge tilted one degree.
- Posy planted night jasmine by the lamp shed and forget-me-nots round the well; 42 tulips (41 after Scone's jump); Prickles keeps an orange scarf from Bobbin in a drawer (secret); Prickles laughs "like a kettle" at supper; mint for Tutti's bake-sale ice cream.
- Prickles: Fold painted the compass on his door four years ago; once used an anchor as a doorstop for nine years; asked Beacon for June sunrise tide tables (the sea trip) and keeps glimmers in his trail jar for it; won 40 tickets on the claw once and never went back; Boing's wind-up cactus sits on his shelf facing the wall.
- Echo: holds its C 40.2 seconds (Pixel); the slow song is 62 beats a minute (64 in verse two, Sketch); got an anonymous record "for the one on the plaza"; the foghorn is a slightly flat B flat, Bunbun's kettle a G; Dusty once re-sorted its records by size.
- The Mayor opened the wishing well with a speech, stamps speeches with Blush's pink ink pad, plans to open the pier officially in spring; Tuesday's hat is his Town Meeting hat; Sketch got "twenty steps to greatness" changed to sixteen (the real Town Hall steps).
- Pip's proving count is 45 minutes. Joy put seed packets on the prize counter for Posy. Bobbin knits cosies for Posy's pots.
### More town life (v85): Bubble Bay
- The prize counter (in the lore) also has a gold comb Pom is saving for (for Brenda), rubber ducks (Fizz bought one for his tub, Bunbun buys them), crayons (Blush, twice), a sewing kit Stitch wants, a giant squeaky mallet Joy put there for Bolt (he keeps about 400 tickets in his hat), a heart stamp (Parcel's brown heart), a tiny pinball (sleeps on Boing's pillow). It restocks on Mondays; its shelf slopes 2 mm (Sketch).
- The Mayor's parcels to residents: Fizz a bar of soap wrapped in a speech, Loofah a bath bomb, Stitch gold thread (a hint about letting out his sash a "dignified inch"), Pom a hairnet, Bobbin a gold button (number 44), Beacon cocoa (Parcel ran it down the pier), Bunbun a ribbon and a speech, Pip a spoon and a lollipop, Crumb a pebble, Dr. Patch a plaster; Tutti keeps her speech in the freezer; one month came with "Civic Daisies" seeds for every house.
- Prickles scores jokes out of ten and nobody has ever got a ten (Beacon 6 for a sailor's joke, Cobble 6, Pixel 7 for a number, Cushy 7 while asleep, Crumb 5, Pip always 1 "for trying", Scone told seven at once: all 0).
- Bobbin's Sunday knit stall: mittens, scarves, a tiny crab scarf; next to Fold's pinwheels (they spin when Bobbin passes) and near the twins' lemonade (Crumb takes the buttons, Scone shouts the prices).
- Gloss keeps one glimmer in a labelled box and counts her buttons on Sundays at seven, twice; Fizz keeps buttons in a pear-scented soap dish and spent a glimmer on a gold tap; Loofah keeps tickets in its turban; Beacon keeps buttons in a tin mug and a glimmer by the mitten; Bunbun keeps one glimmer in her mum's recipe book for the day Pip's jam is "the one"; Pip keeps buttons in a jar labelled "buttons"; Crumb keeps hers in an egg carton with the pebbles; Cobble keeps his in a stone.
- Fizz isn't on the Game Night list since the Bubble Pop rematch. Loofah hums in B flat. Beacon watches the town meeting from the point without hearing it and swaps flashes with Lumi at stargazing.
### More town life (v85): Sugarloaf and Playhouse Hill
- Wishes at the well: Scone wished for a pigeon rematch (lost; "still came true"), Tutti for both twins asleep at once (worked once), Dusty to sit on the sofa, Dr. Patch for an empty waiting room (Bolt came in the next morning). Tock bought Sketch a sixth ruler the day after Sketch's secret wish.
- Pip sells Batch 31 at his market stall; Sketch measured the bake sale tables (Bunbun and Tutti 30 cm apart). Tock's wind-up stall sells a crab (two turns) and a slow snail (four minutes a turn, 12 buttons).
- Bolt is teaching Pip to fit the oven catch (repair number nine was Pip's hip); Bunbun bakes an extra seeded roll so a day-old one is there for Cobble; Joy's staring record against Cushy is 0-14; Pixel orders two vanilla scoops every Friday.
- Fold: a small B for "Bakery" under the new Snack Shack sign (a surprise), a PIER sign whose R leans toward the sea, folds Bunbun's napkins (swans this month); Tutti's cart sign has lost a T ("Tuti").
- Cobble checks level with rain ("puddle means wrong"); the wobbly stone on his path is the one he moved from the fountain; he sits in the back row at meetings. Nimbus rains gently on Cobble after he mends something.

### The prize counter (v86, now in the game)
- Jelly Arcade's prize counter sells, for tickets: rubber duck 20, strawberry pencil 11, tiny erasers 5, tiny feather duster 6, whistle 20, tiny glass jar 25, tiny whisk 30, crystal rock / little pillow / heart stamp / magnifying glass / pink umbrella 40 each, tiny stethoscope 50, box of crayons and flask 60, graph paper pad 80, sewing kit 120, tiny pinball 150, pack of folding paper 180, big button 200, giant rubber duck and gold comb 300, giant squeaky mallet 400, plus arcade furniture, toys, sweets, and a glimmer for 400. (Writers' earlier "gold comb 500" and "rubber ducks 20" settle on these numbers.)

### Residents remember (v94)
- Residents bring up, once, what you did with them: gifts (loved, liked, not their thing), taking their side or someone else's in an argument, visiting their house, the room you designed for them, and town news (a good fish you caught, Prickles' score for your joke, being seen taking photos).
- Prickles scores jokes out of ten in public now; the score gets around town (Dewey found it written in pencil in a library margin). A gift Prickles doesn't like goes on the shelf facing the wall beside Boing's wind-up cactus. The good chair at the Potted Lodge is only for you. The sandstorm chapter is 41 pages.
- Bunbun kept a loaf with the pet's nose print in it. Pip once knocked three times on her wall (they have no three-tap signal); she tapped back anyway. Dr. Patch keeps a visitors' book for the clinic. Crumb labelled the room you made her "Made for me. By them."
- Dewey keeps a stamped "Sided With Dewey" card for you and a catalogue card on the door of the room you made. Nimbus keeps a spare umbrella in the stand for you. Lumi mentions you in the winter letter to the old lamplighter. Posy keeps Prickles' score for your joke written on a seed packet.
- Fizz's room echoes "Ciao" well (tested nineteen times). Loofah keeps a towel by its stove for you and tells everyone it's damp. Pom keeps liked gifts in tool-belt pocket nine. Gloss files liked gifts under a mint "nice surprises" tab. Bobbin keeps all their buttons in the room you made. Beacon puts the kettle on twice when you visit and calls good gifts "window-worthy".
- Boing names a gift he doesn't like "Gerald" and can't fit in a bath. Joy calls a loved gift her "power-up". Tock's ledger has a "kept" column and a fish page. Pixel rates gifts out of ten (starting at 4) and has given one 10. Parcel moved your pin on the sorting-room map closer to theirs. Fold left a paper frog on the Paper Post step for your return. Cobble keeps your gifts on the top shelf with the good stones.
### Moments together and designs (v94)
- When both of you are in the app you can share a moment (a group hug, a dance party, cake for three, a high five through the pet); both phones celebrate.
- Blush will paint any of your own designs onto the pet as a pattern.

### Newest things (v101): Playhouse Hill
- The Ferris wheel has 16 cars, two each "for thirty-two of us" (Sketch); Parcel calls them "sixteen little doors". The bouncy castle's eleven suggestion-box entries: Joy 6, Boing 5.
- The Little Museum: Fold lettered its sign small, Bolt built the shelves, Sketch measured the cases (all one size), Cobble laid the floor; each catalogue card is folded once (Fold taught Dewey); an empty case holds a card that says "yet"; Parcel carries donations people post; Cobble gave Dewey a stone.
- Beacon names every fish before paying for it (Pixel's was "Fin"). Bolt built the dock by the boardwalk; Sketch checked it was level.
- Bolt built Posy a scarecrow in a hard hat. Tock and Sketch have cider at four instead of tea in autumn. Pixel's one design is a single lime square; Joy cried at it.
### Newest things (v101): Sugarloaf
- Bunbun asked Dewey to put her mum's first rolling pin in the museum ("it's a find") and keeps a tin by the till for the Mayor's projects (mostly Pip's buttons); in autumn she sells apple cake and warm cider with a cinnamon stick. Pip's batch thirty-four is apple jam.
- Dewey has turned down an empty jam jar (twice), Dusty's first-fluff jar and Dr. Patch's first lollipop stick for the museum. Dusty dusts the museum cases unasked; a moth lives in its feather duster.
- Cushy left a cushion on the dock for whoever is fishing and lent Dewey one for the museum bench.
- Tutti has pumpkin swirl on the cart in autumn and plans to park it at the bottom of the Ferris wheel; Dr. Patch will keep a lollipop there for anyone who goes green.
- Crumb let a firefly out on the cottage stairs as a night light, presses red leaves in Dewey's heaviest book (Dewey doesn't know), and wants her "thinking seed" planted in the community garden. Scone lost a staring contest to Posy's scarecrow.
### Newest things (v101): Bubble Bay
- Dewey writes museum cards in brown ink ("old library", says Blush), catalogued Fizz's entrance "as a draught", and told Stitch needles are common. Loofah donated a boardwalk shell.
- Stitch measured the plaza for the outdoor stage's curtain (twice, two numbers); Blush wants it in "the hush before". Pom plans everyone's antennae for the stage's opening night; Pom's pocket twelve is the bug pocket for now; a fish that got away from Pom was named Kevin.
- Bobbin gave the project nine buttons, wants eleven rides on the Ferris wheel, and caught a boot off the dock (labelled "Boot", in thread). Bobbin's autumn knit stall is nearly all mittens.
- Gloss booked a cider break at three for the season and keeps an orange autumn tab (Pom lost it in Duchess), a green tab for Posy's bugs, a gold one for museum donations; she visits the dock at five to five for five minutes.
- Beacon sends moths on toward the fields, away from Stitch's shop, and offers its spyglass for the observatory's first clear night.
### Newest things (v101): Lantern Meadow
- Museum cards are filed by the day of donation, so they read as a diary of the two of you; Dewey keeps a towel on the museum desk for wet fish (Nimbus waits at the door because of the towel rule) and catalogued a damp boot twice, under B and D. The Mayor cut a tiny ribbon by the museum's coat hooks after Dewey asked him not to cut one.
- Posy planted the tulips in a heart so it shows from the Ferris wheel. She names the bugs she buys (one beetle is Herbert). Her scarecrow wears one of Prickles' old sunhats and holds an upside-down book; the Mayor shook its hand by mistake. Prickles has filed twelve complaints against the bouncy castle and corrected the museum's trout card in pencil.
- Echo moved its afternoon song to E because the cider cart squeaks in E; the new dock creaks in three-four time when the tide comes in. Lumi wants to light the Ferris wheel bulb by bulb. There are 16 pumpkins on the 16 Town Hall steps in autumn.

### The seasons in town (v102)
- Sugarloaf: Bunbun sells cocoa with a marshmallow in winter, lemon buns in spring, fruit tarts in summer (Pip does the berries); in summer she bakes early and shuts the top half of the bakery door by two. Pip wears a little knitted hat over his lid in the snow (Bunbun's, a bit big) and makes cranberry jam in winter, rhubarb in spring. Tutti sells hot chocolate with a tiny scoop on top (hidden from Dr. Patch) and shaved ice in summer, and keeps the cart open until the fireflies come out. The twins' snowman has Crumb's pebble eyes and Scone's cone nose; Scone sledged into a hedge and runs through the splash fountain over and over; Crumb hides her pebbles in the paddling pool. Dr. Patch waits at the bottom of the sled hill with a plaster. Dusty spring-cleans the whole Nest every year.
- Bubble Bay: Fizz skates once round the little rink, slowly, and applauds himself; Loofah walks on towels from bed to bath on cold mornings and leaves the window open and the bath warm for the fireflies. Pom built a snowman with an afro on the plaza; Duchess wears a petal corsage in spring. Gloss's seasonal tab is white in winter and blossom pink in spring; cocoa at three in winter, shaved ice at three in summer; the book closes at five all year. Bobbin knitted the snowman a hat and counted 42 fireflies. Beacon keeps Bobbin's scarf on all summer because that's how it's known from the water; snow melts a ring round its lamp glass; a bird nests on its balcony rail in spring and Beacon turns the light a little away from her.
- Playhouse Hill: Bolt built the flowering arch (Posy did the flowers) and the wooden edge of the ice rink; Fold lettered the rink's sign. There are several snowmen in winter: one by the plaza wears Bolt's spare hard hat with two level coal eyes (Sketch checked), Pom's has an afro, the twins' has Crumb's pebble eyes; Boing's has a spring inside and "went boing once". In winter Tock and Sketch have cocoa at four (cider in autumn); Bunbun makes square marshmallows for Pixel's cocoa. Nimbus leaves an umbrella at the Paper Post gate and Fold leaves a paper crane on Nimbus's. A bird nests on the Toy Box sign in spring.
- Lantern Meadow: the Mayor practises part two of his speech on the plaza snowman (its carrot nose is from Posy's garden), gives the cherry blossom a short speech, and keeps an egg basket on the guest-book desk in spring (nobody takes an egg, everyone signs). Dewey records firefly flash patterns in its blank book (Lumi checks the spelling). Lumi helped light the plaza evergreen and sleeps through summer noons under Prickles' sunhat (he doesn't know). Nimbus keeps the sky overcast for the ice rink, gives the third mug of winter cocoa to whoever knocks, and showers the splash fountain at night. Posy painted the birdhouses to match the flowers (the robins chose the pink one). Prickles keeps a snowball under the porch for Scone; he and Posy watch the fireflies holding hands. Echo's horn rings a little sharp in the cold; sled runners hiss in F; its records warp in the heat and it plays the wobble.

### Birthday parties, visits, shifting friendships (v108)
Birthdays come from `bdayOf` (the Mayor's is First Brick Day, 14 Sept; Scone and Crumb share one). Parties are 5-8 pm at the house.
- **Sugarloaf:** Bunbun puts the kettle on for guests ("the kettle has opinions"). Pip wraps presents four times (the early wraps get jam
  on them), hides his lid drip behind a napkin when visiting, and Bunbun packs him a lunch for visits; Bunbun's saying: friends are like
  jam, leave them alone a bit and they set. Cushy gives cushions as presents, covers a sleeping visitor with a blanket, likes the window
  where the light lands at four. Dusty puts a bow on every chair at its party; its home smells of clean laundry. The twins make Tutti's
  party banner, one letter upside down. Tutti wheels the cart to a friend's; a scoop saved for someone goes soft. Crumb found Scone "the
  fastest rock" for their birthday; Crumb wraps a pebble in a napkin as a present and leaves one on a friend's step when they drift.
  Dr. Patch brings a heart plaster as a party gift and promises not to check pulses when visiting.
- **Bubble Bay:** Fizz serves his birthday cake in the claw tub; his hair eats his party hat; he brings a small bubble machine to parties
  (it escapes). Loofah's party hands out warm towels and Fizz gives a speech about Loofah. Stitch is handed four scarves on their
  birthday and measures each; Bobbin checks Stitch's middle knot. Pom's party has a mood-board wall that includes the player; Blush bakes
  Pom's cake in four named colours. Pom does Blush's balloons; Blush's cake is apricot and plum; she brings a tin of paint called "a good
  year". Gloss writes her own party into the book and tidies the coat pile at others'. Bobbin makes the bunting at its party. Beacon's
  party has tin mugs of cocoa and Bunbun's burnt cookies; Bobbin knits Beacon a scarf with a deliberate dropped stitch; Beacon keeps a tin
  mug with the good handle for a friend and leaves the window light on for every visit.
- **Playhouse Hill:** Boing's birthday cake bounced and fell; Joy hides Boing's present near the sofa; Boing gives Joy a trophy "for
  turning a year older". It is 406 steps from the Clockwork Cottage to a friend's; Sketch labels the cake "CAKE" with the slice count;
  Sketch's birthday cake is 31 cm across (its birthday is 31 May). Fold's paper hard hat for Bolt is number seven; Bolt builds a table
  halfway through his own party and fixes loose boards at friends' houses. Pixel's cake has 21 layers; it rates parties out of ten and
  likes standing in corners. Parcel reads all 40 birthday cards aloud; Fold writes the banner, Parcel stamps it; Fold folds a lime paper
  lantern for each party guest. Cobble brings a smooth stone as a birthday gift and sits on the wall at his own party.
- **Lantern Meadow:** the Mayor gives three speeches at his party (the first cut to eleven minutes), cuts the gate ribbon twice for the
  photographs, keeps everyone's birthdays in green ink, and calls a visit "a meeting of two" and takes minutes. Dewey closes the reading
  room on its birthday (23 Jan) and keeps a card for each friend in a drawer. Lumi's party (6 July) serves hot milk with cinnamon; the
  porch light goes up a notch for guests; Lumi gives a lantern that lights itself at dusk. Nimbus's party is 30 Dec ("mostly cheerful,
  light chance of a sneeze"); Nimbus gives a small barometer. Posy (28 April) puts a seedling by every plate and Prickles is in charge of
  her cake; swapped seedlings mean two residents are friends now. Posy organises Prickles' party (17 Feb) against his wishes. Echo (15 Oct)
  writes each of you a tune and plays one song at a party, no encore.

## Open questions (undecided; ask Garrett before writing as fact)
1. **Is there a sea?** Bubble Bay, the pier, the beach, the harbour, boats, gulls and Beacon's lighthouse are all over the lore, and Prickles dreams of the sea; the v60 map is countryside with
   ponds. Options: the bay is just off the map's edge; or add a shore to the south-east.
2. **Buildings that aren't on the map:** the Town Hall, the library, the playground, the pier. Visible one day, or always off-screen?
3. *(Settled 2026-10-04: Fizz and Pom are mentor and protégé, not related; the makeover request was reworded. Number kept so references still work.)*
4. **Pronouns for Boing, Blush, Joy:** kept as he/she/she by consensus; the strict rule would make them they/them.
5. **The twins' parents:** never mentioned; the twins came to Tutti as babies in a basket. Recommended: leave it unspoken.
6. **How old is the town?** Clues: three generations of hands on the first brick; Parcel since four houses; the pier forty years; Hammer & Hue nine years; the fountain three springs.
7. **"The founders":** the Mayor calls you the founding couple and others picked it up, yet residents also say "since you moved in". Honorific (current reading) or something more?
8. **The Spring Picnic:** Bunbun's dream is a town picnic every spring; the game's Spring Picnic festival is held at the Mayor's. Is it hers come true?
9. *(Settled 2026-10-04: the Topsy Day pairs are final for all 32, chapter 6.)*
10. Names still undecided: Beacon's crab shell (Captain, Patience or Shelly), Crumb's snail (Pebble or Sir Slowly), Loofah's bath boat ("Mm"), Parcel's satchel, Pom's curl number one.
11. **The statue on the plaza:** whose is it? (The Mayor is afraid it's him; the pet's statue arrives later with town cheer.)
12. **The empty lots:** who moves in first? (Parcel hopes for someone who loves letters.)
13. **Mysteries to keep as mysteries:** Pixel's origin ("nobody built me"), the child who turned Echo's crank, the hand that dropped the seed in Posy, Lumi's old lamplighter, the thumbprint on the
    first brick, who eats the Friday cookie.
14. **The players' birthdays:** the Mayor knows them; the game doesn't ask.
15. **How new are the assistants?** Bobbin says "I'm new here" and started the same week as Pip, but Pip has been with Bunbun a while.

---

# 8. Contradictions between sources and how they were resolved

Rule: data the game uses in `index.html` wins; then a character's own sheet; then `holidays.md` for the calendar; then dialogue.

All rows below were fixed in the sources on 2026-10-04 (canon log), except the part of row 22 noted in chapter 9.

| # | Topic | What the sources say | Resolution |
|---|---|---|---|
| 1 | Pip's home | `jam.md` and `jam.js` ("the skinny house right behind the Snack Shack"); `HOUSES`/`HOUSE_DEF`: The Jam Jar, Sugarloaf Lane, "next door to Bunbun" | **Next door to Bunbun on Sugarloaf Lane** (index wins). He can still hear her oven: it's her house's oven, through the wall. |
| 2 | Tutti and the twins' home | `cone.md` "the little house behind the cart on the plaza"; `scone.md`/`crumb.md` "above her ice-cream stand"; `HOUSES`: Sugarloaf Lane; `HOUSE_DEF` blurb "live behind the ice-cream cart" | **The Sundae Cottage on Sugarloaf Lane.** The cart is kept at the cottage and wheeled up to the plaza for 12:00-18:00 ("wheeling the cart up the hill"). |
| 3 | Echo's home | `gramo.md` "on the street running up to the plaza"; `HOUSES`: Lantern Meadow | **Echo's Music Box, Lantern Meadow.** |
| 4 | Posy and Prickles' home | `posy.md` (her own pot cottage at the edge of the park, "next to Prickles"); `cactus.md` (his own adobe cottage); `HOUSES`: one shared house | **The Potted Lodge, shared**, Lantern Meadow: her sunroom and his trail den under one roof. |
| 5 | Sketch's home | `pencil.md` (row house beside Hammer & Hue, between Bolt and Stitch); `HOUSES`: with Tock | **The Clockwork Cottage with Tock**, Playhouse Hill. |
| 6 | Tock's home | `windup.md` "near the Toy Box"; `windup.js` "Clockwork House" | **The Clockwork Cottage**, Playhouse Hill, with Bolt over the fence. |
| 7 | Gloss's and Bobbin's homes | `polish.md` (next to Stitch, Bunbun a few doors down); `spool.md` (next to Stitch, Bolt on the other side); `HOUSES`: one flat | **Number Two, Bubble Bay, as flatmates.** |
| 8 | Loofah's and Dusty's homes | `sponge.md` "across the lane from Cushy" (Cushy is on Sugarloaf Lane); `dust.md` "next to the Cozy Nest" | **Loofah: Bubble Bay next to Fizz. Dusty: Sugarloaf Lane next to Cushy.** |
| 9 | Tutti's family | `cone.md` and the bible: "her nephews"; Tutti's relationship line: "Scone is the boss of the pair, and she'll tell you so"; everywhere else: Scone a boy, Crumb a girl | **A niece (Crumb) and a nephew (Scone).** |
| 10 | The twins' birthday | Crumb: "Maybe on our birthday"; the game: Scone 1 May, Crumb 22 March | **One shared birthday**, 1 May (`bdayOf` gives Crumb Scone's date). |
| 11 | The Mayor's birthday | `holidays.md` and all the holiday dialogue: he has none and keeps First Brick Day; `mayor.js` deep talk offers the day you arrived and calls it "the town's birthday"; the game gives him 3 September | **No birthday; First Brick Day (14 September) is his and the town's birthday.** Deep talk and `bdayOf` changed. |
| 12 | Pronouns of Pom | "he" in Gloss's sheet and lines, Fizz's makeover request, some holiday lines; "she" in a house line; avoided everywhere else, including Pom's own sheet | **They/them** (own sheet silent; sources disagree). |
| 13 | Pronouns of Cushy | "themself"/"their" in the bible; "she" in Prickles', Posy's, Lumi's, Cobble's lines and many holiday lines; "he" in Dr. Patch's | **They/them** (own entry). |
| 14 | Pronouns of Nimbus, Lumi, Fold, Parcel | Nimbus "him" once (Blush); Parcel "his" in the town-life UI; otherwise none or they | **They/them.** |
| 15 | Fizz and Pom | mentor and protégé everywhere; "proud big brother" (bible table, as a feeling); Fizz's makeover request: "My little brother Pom", "brotherly", "you've saved a family" | **Not related** (mentor, "like a big brother"). The request was reworded. |
| 16 | Beacon and Lumi's goodnight signal | `lantern.js`: Beacon taught Lumi; two flashes means goodnight, Lumi flares twice back, Beacon sends one long ("sleep well, I've got the sea"); `beacon.js`: "Two long, one short... We made it up"; holiday lines: "Two flashes means goodnight" | **Two flashes = goodnight; Lumi flares twice back; Beacon's last long flash = "sleep well, I've got the sea". Beacon taught it.** Fix the `beacon.js` line. |
| 17 | Cushy and the sandstorm story | sheets and `cactus.js`: Cushy stays awake for all of it and gasps at the good part (the flower on the fourth day); `cushion.js`: "I fall asleep just after the camel" | **Cushy stays awake for all of it.** (The camel is a recent addition that "has never been".) Fix the `cushion.js` reply. |
| 18 | Lumi's lighting order | the fountain lamp first; the Mayor's lamp first; Cobble's lane first; Posy's gate early | **A running joke**: everyone believes Lumi lights theirs first. Not a contradiction. |
| 19 | Echo's hours | `RESIDENTS` 15:00-19:00, its sheet, its own lines ("Three o'clock"); `pebble.js` "Echo plays a slow one on the plaza near noon" | **15:00-19:00.** Fix Cobble's line. |
| 20 | The island | `cloud.js` "best early warning on the island"; v60 world: countryside, not an island | **Not an island.** Fix the line. (The bay and the pier stay in the lore: open question 1.) |
| 21 | The pet growing | several lines ask if `{n}` has grown or plan for "when `{n}` is grown"; v62: one form, no growing | **The pet doesn't grow.** Lines rewritten. |
| 22 | The Mayor's home greeting | his sheet's hi lines ("Welcome, dear resident, to the Town Hall") are used when you visit Marsh Manor | **He works at the Town Hall and lives at Marsh Manor.** `mayor.md` now greets with a line that works anywhere; `KBIB` is still open (chapter 9). |
| 23 | How long Prickles travelled | `cactus.js`: fifty years; his makeover request: "forty years of stories" | **Fifty years.** Minor fix. |
| 24 | Stitch's payment from Bunbun | Bunbun: "I pay in recipes, Stitch pays in patterns"; Stitch: "She pays me in scones" | **Both:** she pays for the apron in scones, and they swap recipes for patterns. |
| 25 | Character names | sheets and in-game lines use keys as names: "Pencil" (Sketch), "Spool" (Bobbin), "Lantern" (Lumi) | **Use the names.** Fix the lines. |
| 26 | Topsy Day pairs | the holiday files disagree for about half the town (three people each claim the bakery, the arcade, Bolt's shop and the Toy Box) | **The 16 pairs in chapter 6 are final** (the 12 already written kept, 4 added); the lines that disagreed were rewritten. |
| 27 | Swap-Face costumes | Lumi: "I've come as Joy"; Nimbus: "Lumi came as me"; Fold: came as Parcel, but also "my Bunbun... my ears were paper" | **Lumi goes as Nimbus** (a mutual swap like Posy/Prickles); **Fold goes as Parcel.** |
| 28 | Long Table seating | you thank the person on your left, but several pairs thanked each other or two people claimed the same left-hand neighbour (Lumi, Cobble, Pixel, Stitch, Tock); Tutti asked you to sit on her right so she could thank you | **One seating per year** (chapter 6 table); mutual thanks are "thanking back"; clashing ones moved to earlier years; Tutti asks for her left. |

---

# 9. Fixes needed

The fixes listed here on 2026-10-04 (pronouns, names, facts, the pet not growing, `bdayOf`, the holiday tables) were applied the same day; see the canon log in chapter 7.
What is still open:

- **Regenerate the map conversations.** The `/* <talk> */` block in `index.html` is generated from `.claude/talk/<key>.js` and `.claude/talk2/<key>.js`. Those source files are fixed;
  the block in `index.html` was deliberately left untouched and still has the old lines until it is regenerated.
- **The Mayor's greeting in `KBIB`** (`index.html`, `KBIB.mayor.hi`, the same line in all four times of day `m`, `d`, `e`, `n`): "Ahem! Welcome, dear resident, to the Town Hall."
  Not changed: `KBIB` greetings are used in every close-up (at Marsh Manor and when he drops into a shop as a customer), so a home-only "Marsh Manor" line can't be told apart.
  Suggested: a line that works anywhere, as `mayor.md` now has ("Ahem! Welcome, dear resident!").
- **Open questions 1 and 4** (is there a sea; Boing, Blush and Joy's pronouns) stay open; lines that depend on them were not changed.

Re-scan for pronouns after any new writing (a regex scan can miss a pronoun two sentences after a name; check replies against the question they answer).


### 2026-10-04 (later): settled by Garrett
- Pronouns: Boing he, Blush she, Joy she are final (Garrett: "whatever feels right").
- There is a sea: the town sits on a coast. A bay opens to the east-south-east beyond the woods, by Bubble Bay: a sandy beach, rocks, a pier at the end of the east road, a lighthouse on its own rock out in the bay, sailboats. The town is not an island; the shore curves away at both ends.
- New landmarks on the map (v71): a windmill in Lantern Meadow, a water tower on Playhouse Hill, a clock tower on the plaza, an observatory at the east lookout, a greenhouse by the Potted Lodge, a waterfall and stream in Bubble Bay under a stone bridge on the south lane, a playground west of Sugarloaf Lane, a carousel and a hot-air balloon on Playhouse Hill, market stalls and bus stops near the plaza.

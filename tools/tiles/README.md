# Tile sets: floors and wallpapers

The room is a grid. The floor is **8 × 8 tiles**, and each wall is **8 columns**, each one tile wide and the full wall
height. One tile is 1 × 1 in the room, and the walls are **3.4 tiles tall**. You paint sets onto that grid from the
Room tab: tap a set, then drag over the room. **Tile** paints what you touch, **Area** fills the rectangle (or stretch
of wall) you drag out, and **Room** does the whole floor or every wall.

A set is one image, in one of these kinds:

| Kind | Mode | What the image is | ChatGPT size | `make_tile.py` flags |
|---|---|---|---|---|
| Floor, 1 tile | repeat | one tile that repeats in every direction | 1024 × 1024 | `--kind f --span 1x1 --seamless` |
| Floor, bigger repeat | repeat | a pattern covering N × M tiles (e.g. 2 × 2), repeats as a block | square for 2×2, 1536 × 1024 for 3×2 | `--kind f --span 2x2 --seamless` |
| Floor with border | border | a 3 × 3-tile area with a border all round: corners, edges and a plain middle | 1024 × 1024 | `--kind f --mode border --seamless` |
| Wallpaper, repeating | repeat | a swatch N columns wide that repeats sideways **and up the wall** | 1024 × 1024 (1 column) or 1536 × 1024 (3 columns) | `--kind w --span 1x1 --seamless` / `--span 3x1` |
| Wallpaper, full height | repeat + full | one strip N columns wide, floor to ceiling (a mural, a dado rail) | 1024 × 1536 for 2 columns | `--kind w --span 2x1 --full --seamless` |
| Wallpaper with ends | run | 3 full-height columns: left end, middle, right end. Every painted stretch gets the end caps | 1024 × 1024 (gets stretched to wall height) | `--kind w --mode run --seamless` |

How the dynamic ones are cut up:

```
Floor border (3 x 3 tiles)          Wall run (3 columns)
+--------+--------+--------+        +--------+--------+--------+
| corner |  top   | corner |        |  left  | middle | right  |
+--------+--------+--------+        |  end   |        |  end   |
|  left  |  fill  | right  |        |        |        |        |
+--------+--------+--------+        |        |        |        |
| corner | bottom | corner |        +--------+--------+--------+
+--------+--------+--------+
```

- The **fill** tile repeats across the middle of the painted area, so it has to tile with itself.
- The **edge** tiles repeat along the side they sit on.
- The **border band** should be about **30%** of an edge tile (roughly 1/10 of the whole image), running the same width all round. If yours is thicker or thinner, pass `--b 0.25` or similar. Inner corners (on L-shaped areas) are made automatically from the corners.
- For **runs**, the middle column repeats sideways. The end columns carry the trim that caps each stretch.

## Importing a whole batch of room sets

For folders of themed sets (each with `floor.png`, `bordered-rug.png`, `wallpaper.png`, and `full-wall.png` or
`wall-run.png`), use the batch importer instead. Add the folder's number, key and name to `SETS` at the top of
`tools/tiles/import_sets.py`, then:

```bash
python tools/tiles/import_sets.py path/to/Room-For-Two-Room-Sets-01-10
```

It fixes seams automatically (crops to the pattern's repeat when there is one, otherwise cuts the least visible
seam; plank floors wrap at a plank joint), rebuilds bordered rugs so their edges and corners join at any size,
turns full walls into 2-column panels, and turns short banner "wall runs" into paneling under the set's wallpaper.
Paste the printed lines into `TILE_ART`. Helpers live in `tools/tiles/art_fix.py`.

## Making one

1. Generate the image in ChatGPT with one of the prompts below. Save it into the repo, or anywhere else.
2. Run the script from the repo root. It resizes the image, blends the edges with `--seamless`, saves
   `assets/tiles/<f|w>-<key>.webp` and prints a line like this:
   ```bash
   python tools/tiles/make_tile.py ~/Downloads/marble.png --kind f --key marble --name "Pink marble" --span 2x2 --seamless
   ```
   ```
   {kind:'f',k:'marble',n:'Pink marble',span:[2,2],img:'assets/tiles/f-marble.webp'},
   ```
3. Paste that line into `TILE_ART` in `index.html`. It shows up at the end of the Floors or Walls row.

Keys are permanent: saved rooms refer to sets by key, so don't rename one after it has been used.

## Prompt templates

Shared style line. Keep it at the end of every prompt so the sets match the room:

> Style: cute glossy jelly-candy cartoon style, soft pastel colours with bright accents (pink #FF3D9A, lime #A6E22E,
> cyan #3EC8F2, sun yellow #FFD21F, grape #9B4DF2), subtle speckles, gentle soft lighting, no text, no logos, no people,
> no four-point sparkle shapes.

**Floor tile (1×1 or N×N repeat)**
> A perfectly flat, straight-on top-down texture of [a floor material, e.g. "pink terrazzo with candy chips"], filling
> the whole square edge to edge. It must tile seamlessly: whatever touches the left edge continues from the right edge,
> and the same for top and bottom. No perspective, no shadows from outside, no border, no vignette. [Style line]

For a 2 × 2 repeat, add: *"The pattern repeats exactly twice across and twice down the image (a 2 by 2 grid of the
motif)."* That keeps the motif's scale right.

**Floor with a border (3×3)**
> A perfectly flat top-down square texture of a floor area with a decorative border, seen straight on. The border is a
> band running evenly around all four edges, about one tenth of the image wide, with [border design, e.g. "mint candy
> stripes and small white dots"] and a special motif in each of the four corners [e.g. "a pink heart"]. The border's
> pattern repeats at an even rhythm along each side. Inside the border is [fill design, e.g. "soft pink with scattered
> sprinkles"], a simple even pattern with no central picture. No perspective, no shadows, nothing outside the square.
> [Style line]

**Wallpaper, repeating swatch**
> A flat, straight-on wallpaper pattern swatch of [design, e.g. "cream background with small lilac flowers"], filling the
> image edge to edge. It must tile seamlessly left to right and top to bottom. No perspective, no room, no furniture,
> no frame. [Style line]

For a 3-column repeat, use a 1536 × 1024 image and add: *"The design is a wide repeat: [motif] appears three
times across, each a little different."*

**Wallpaper, full height (murals, dado rails)**
> A flat, straight-on tall wall panel from floor to ceiling: [design, e.g. "lilac dotted wallpaper on the top two thirds,
> a white chair rail, and pink panelled wainscoting on the bottom third"]. The left and right edges must line up
> seamlessly so panels can sit side by side. No room, no floor, no ceiling, no perspective. [Style line]

**Wallpaper with end caps (run)**
> A flat, straight-on wall design split into three equal vertical parts, left to right: a LEFT END with [trim, e.g. "a
> white pilaster trim on its left edge"], a MIDDLE section, and a RIGHT END with the same trim on its right edge. All
> three share the same wallpaper and [horizontal features, e.g. "a chair rail and pink wainscoting at the same heights"]
> so they join seamlessly. No perspective, no room. [Style line]

## Tips

Lessons from the first batch of generated art:
- ChatGPT often draws a small motif repeated 2×2 inside a "seamless" square. That's fine: crop one quarter and it
  tiles perfectly (the Jungle and Leafy vines wallpapers were made this way).
- For 3-part walls (end caps) it likes to draw thin divider lines between the parts. Ask for *"no lines or gaps
  between the three parts, the wallpaper runs continuously across them"*.
- Full-height panels often don't match at the left and right edges. Ask for *"the left and right edges line up
  exactly so the panel repeats sideways"*, or send it to Claude to crop to its repeat.
- Wide 1536 × 1024 swatches usually have a seam at the top and bottom. For anything that repeats up a wall or across
  a floor, prefer square images.

- Ask ChatGPT for "flat, straight-on, no perspective" every time. Any slant or lighting from one side shows up as
  stripes when it repeats.
- If a seam still shows, run the script with `--seamless`, or regenerate asking for a simpler, more even pattern.
- Bigger repeats (2×2, 3×1) look less repetitive across a whole room than 1×1 tiles.
- `--px 384` keeps extra detail for intricate designs. The built-in sets use 256 pixels per tile.

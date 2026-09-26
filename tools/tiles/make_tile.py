"""Turn a generated image into a Room for Two tile set.

Usage (from the repo root):
  python tools/tiles/make_tile.py IMAGE --kind f|w --key KEY --name "Shown name"
        [--mode repeat|border|run] [--span 2x2] [--full] [--seamless] [--b 0.3] [--px 256]

Writes assets/tiles/<kind>-<key>.webp at the size the game expects and prints the line to add to TILE_ART in
index.html. See tools/tiles/README.md for what each kind of image should look like.
"""
import argparse, os, sys
import numpy as np
from PIL import Image

WALLH = 3.4  # wall height in tiles

def seamless(a, axes):
    """Blend an image with a half-offset copy of itself so its opposite edges meet without a seam."""
    a = a.astype(np.float32)
    h, w = a.shape[:2]
    m = np.ones((h, w), np.float32)
    rolled = a
    if 1 in axes:
        rolled = np.roll(rolled, w // 2, axis=1)
        m *= 1 - np.abs(np.linspace(-1, 1, w))[None, :]
    if 0 in axes:
        rolled = np.roll(rolled, h // 2, axis=0)
        m *= 1 - np.abs(np.linspace(-1, 1, h))[:, None]
    m = np.clip(m * 1.6, 0, 1)[..., None]
    return (a * m + rolled * (1 - m)).clip(0, 255).astype(np.uint8)

def main():
    p = argparse.ArgumentParser()
    p.add_argument('image')
    p.add_argument('--kind', choices=['f', 'w'], required=True, help='f = floor, w = wall')
    p.add_argument('--key', required=True, help='short id, lowercase letters/numbers')
    p.add_argument('--name', required=True, help='name shown in the game')
    p.add_argument('--mode', choices=['repeat', 'border', 'run'], default='repeat')
    p.add_argument('--span', default='1x1', help='tiles the image covers, e.g. 2x2 (floors) or 3x1 (walls)')
    p.add_argument('--full', action='store_true', help='walls: stretch to full wall height instead of repeating upwards')
    p.add_argument('--seamless', action='store_true', help='blend the edges so the pattern repeats without seams')
    p.add_argument('--b', type=float, default=0.3, help='border mode: how much of an edge tile the border band covers')
    p.add_argument('--px', type=int, default=256, help='pixels per tile (256 matches the built-in sets; 384 for extra detail)')
    a = p.parse_args()

    if a.mode == 'border' and a.kind != 'f': sys.exit('border mode is for floors')
    if a.mode == 'run' and a.kind != 'w': sys.exit('run mode is for walls')
    sx, sy = (int(v) for v in a.span.lower().split('x'))
    im = Image.open(a.image).convert('RGB')
    px = a.px

    if a.kind == 'f':
        size = (3 * px, 3 * px) if a.mode == 'border' else (sx * px, sy * px)
    elif a.mode == 'run' or a.full:
        cols = 3 if a.mode == 'run' else sx
        size = (cols * px, round(WALLH * px))
    else:
        # repeating wallpaper: keep the image's shape; the game repeats it up the wall
        w = sx * px
        size = (w, round(w * im.height / im.width))
    im = im.resize(size, Image.LANCZOS)
    arr = np.asarray(im)

    if a.seamless:
        if a.mode == 'repeat':
            arr = seamless(arr, (0, 1) if a.kind == 'f' else ((1,) if a.full else (0, 1)))
        elif a.mode == 'border':
            c = px
            arr = arr.copy()
            arr[c:2*c, c:2*c] = seamless(arr[c:2*c, c:2*c], (0, 1))      # fill repeats both ways
            for sl in [(slice(0, c), slice(c, 2*c)), (slice(2*c, 3*c), slice(c, 2*c))]:
                arr[sl] = seamless(arr[sl], (1,))                          # top/bottom edges repeat sideways
            for sl in [(slice(c, 2*c), slice(0, c)), (slice(c, 2*c), slice(2*c, 3*c))]:
                arr[sl] = seamless(arr[sl], (0,))                          # left/right edges repeat up and down
        elif a.mode == 'run':
            c = px
            arr = arr.copy()
            arr[:, c:2*c] = seamless(arr[:, c:2*c], (1,))                  # the middle repeats sideways

    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    out_dir = os.path.join(root, 'assets', 'tiles')
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, f'{a.kind}-{a.key}.webp')
    Image.fromarray(arr).save(out, 'WEBP', quality=90, method=6)

    entry = {'kind': a.kind, 'k': a.key, 'n': a.name}
    if a.mode != 'repeat': entry['mode'] = a.mode
    if a.mode == 'repeat' and (sx, sy) != (1, 1): entry['span'] = [sx, sy]
    if a.mode == 'border' and a.b != 0.3: entry['b'] = a.b
    if a.full and a.kind == 'w' and a.mode == 'repeat': entry['full'] = 1
    entry['img'] = f'assets/tiles/{a.kind}-{a.key}.webp'
    val = lambda v: "'" + v.replace("'", "\\'") + "'" if isinstance(v, str) else '[' + ','.join(map(str, v)) + ']' if isinstance(v, list) else str(v)
    js = '{' + ','.join(f'{k}:{val(v)}' for k, v in entry.items()) + '},'
    print(f'Saved {out} ({size[0]}x{size[1]})')
    print('Add this to TILE_ART in index.html:')
    print('  ' + js)

if __name__ == '__main__':
    main()

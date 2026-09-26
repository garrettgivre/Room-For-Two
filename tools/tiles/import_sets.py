"""Import a batch of ChatGPT room sets (folders with floor / bordered-rug / wallpaper / full-wall or wall-run images).

Usage (from the repo root):
  python tools/tiles/import_sets.py path/to/Room-For-Two-Room-Sets-01-10

For every set folder it writes up to four tile sets into assets/tiles/ and prints the TILE_ART lines:
  floor.png        -> f-<key>.webp       2x2 floor repeat (cropped to its repeat or seam-quilted)
  bordered-rug.png -> f-<key>rug.webp    border-mode floor, rebuilt so edges and corners join at any size
  wallpaper.png    -> w-<key>.webp       wallpaper, repeats sideways and up, 2 columns per repeat
  full-wall.png    -> w-<key>panel.webp  floor-to-ceiling panel (wallpaper over wainscot), 2 columns wide
  wall-run.png     -> w-<key>run.webp    run mode: the set's wallpaper above the banner, which becomes the wainscot
                                          with its posts as end caps
Edit SETS below to name new folders.
"""
import os, sys, re
import numpy as np
from PIL import Image
import cv2
sys.path.insert(0, os.path.dirname(__file__))
from art_fix import make_tileable, wrap_x, cut_background, border_source, plank_rows

WALLH = 3.4
PX = 320                      # pixels per tile
SETS = {  # folder prefix -> (key, name, rug band as a fraction of the rug image, corner motif fraction)
    '01': ('diner', 'Bubblegum diner', .14, .2),
    '02': ('motel', 'Moon motel', .2, .26),
    '03': ('aqua', 'Aquarium', .17, .24),
    '04': ('toybox', 'Toybox', .2, .24),
    '05': ('cyber', 'Cyber bedroom', .15, .2),
    '06': ('punch', 'Fruit punch', .2, .26),
    '07': ('cloud', 'Cloud club', .17, .24),
    '08': ('garden', 'Indoor garden', .17, .24),
    '09': ('arcade', 'Arcade carpet', .18, .24),
    '10': ('candybath', 'Candy bathroom', .15, .22),
}
PLANKS = {'toybox'}          # plank floors: wrap each row at a plank joint
BIG_SEAM = {'garden'}        # chunky patterns need a wider overlap to hide the seam
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'assets', 'tiles')


def load(p):
    return np.asarray(Image.open(p).convert('RGB'))


def save(a, name):
    Image.fromarray(a).save(os.path.join(OUT, name), 'WEBP', quality=90, method=6)


def clean_rug(a):
    """Remove a black/white margin: crop to the rug and fill what's left of the background from its surroundings."""
    bg = cut_background(a)
    if bg.mean() < .002:
        return a
    ys, xs = np.nonzero(~bg)
    a = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    bg = bg[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    n = min(a.shape[:2])
    a, bg = a[:n, :n], bg[:n, :n]
    if bg.any():
        a = cv2.inpaint(np.ascontiguousarray(a), (cv2.dilate(bg.astype(np.uint8), np.ones((5, 5)))) * 255, 9, cv2.INPAINT_TELEA)
    return a


def seamless_run(img):
    """img: 3 columns wide. Make the middle column repeat sideways and blend the end columns into it."""
    o, k = PX // 5, PX // 6
    mid = wrap_x(img[:, PX - o:2 * PX], o).astype(np.float32)
    w = np.linspace(0, 1, k)[None, :, None]
    left = img[:, :PX].astype(np.float32)
    right = img[:, 2 * PX:].astype(np.float32)
    left[:, -k:] = left[:, -k:] * (1 - w) + mid[:, -k:] * w       # lead into the middle's first column
    right[:, :k] = mid[:, :k] * (1 - w) + right[:, :k] * w        # continue from the middle's last column
    return np.concatenate([left, mid, right], 1).clip(0, 255).astype(np.uint8)


def wall_run(banner, wallpaper):
    """3 columns x full wall height: wallpaper on top (one column per repeat), the banner as the wainscot."""
    bg = cut_background(banner, 30)
    ys, xs = np.nonzero(~bg)
    banner, bg = banner[ys.min():ys.max() + 1, xs.min():xs.max() + 1], bg[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    W, H = 3 * PX, int(WALLH * PX)
    bh = int(banner.shape[0] * W / banner.shape[1] * 1.3)    # a little taller than drawn, to read as a wainscot
    rgba = np.dstack([banner, (~bg).astype(np.uint8) * 255])
    rgba = cv2.resize(rgba, (W, bh), interpolation=cv2.INTER_AREA)
    rgba = seamless_run(rgba).astype(np.float32)
    bn, alpha = rgba[..., :3], rgba[..., 3:] / 255
    # wallpaper at its normal scale (one repeat = 2 columns); a 1.25-column slice is quilted down to 1 column so the
    # middle column can repeat
    big = cv2.resize(make_tileable(wallpaper, (0, 1), .12), (2 * PX, 2 * PX), interpolation=cv2.INTER_AREA)
    tile = wrap_x(np.ascontiguousarray(big[:, :int(PX * 1.25)]), int(PX * .25))
    wall = np.tile(tile, (int(np.ceil(H / tile.shape[0])) + 1, 3, 1))[-H:].astype(np.float32)
    y0 = H - bh
    wall[y0:] = wall[y0:] * (1 - alpha) + bn * alpha
    return wall.clip(0, 255).astype(np.uint8)


def main(src):
    lines = []
    for d in sorted(os.listdir(src)):
        m = re.match(r'(\d\d)_', d)
        if not m or m.group(1) not in SETS:
            continue
        key, name, band, corner = SETS[m.group(1)]
        P = lambda f: os.path.join(src, d, f)
        # floor: 2x2 repeat
        a = load(P('floor.png'))
        a = plank_rows(a) if key in PLANKS else make_tileable(a, (1, 0), .12 if key not in BIG_SEAM else .3)
        save(cv2.resize(a, (2 * PX, 2 * PX), interpolation=cv2.INTER_AREA), f'f-{key}.webp')
        lines.append(f"{{kind:'f',k:'{key}',n:'{name}',span:[2,2],img:'assets/tiles/f-{key}.webp'}},")
        # rug: border mode
        if os.path.exists(P('bordered-rug.png')):
            rug = clean_rug(load(P('bordered-rug.png')))
            rug = cv2.resize(rug, (1024, 1024), interpolation=cv2.INTER_AREA)
            srcimg, b = border_source(rug, PX, .42, band, corner)
            save(srcimg, f'f-{key}rug.webp')
            lines.append(f"{{kind:'f',k:'{key}rug',n:'{name} rug',mode:'border',b:{b:.2f},img:'assets/tiles/f-{key}rug.webp'}},")
        # wallpaper: 2 columns per repeat
        wp = load(P('wallpaper.png'))
        a = make_tileable(wp, (1, 0), .12)
        save(cv2.resize(a, (2 * PX, int(2 * PX * a.shape[0] / a.shape[1])), interpolation=cv2.INTER_AREA), f'w-{key}.webp')
        lines.append(f"{{kind:'w',k:'{key}',n:'{name}',span:[2,1],img:'assets/tiles/w-{key}.webp'}},")
        if os.path.exists(P('full-wall.png')):
            fw = load(P('full-wall.png'))
            target_w = int(fw.shape[0] * 2 / WALLH)            # 2 columns at full wall height
            o = max(24, fw.shape[1] - target_w)
            a = wrap_x(fw, o)
            save(cv2.resize(a, (2 * PX, int(WALLH * PX)), interpolation=cv2.INTER_AREA), f'w-{key}panel.webp')
            lines.append(f"{{kind:'w',k:'{key}panel',n:'{name} wainscot',span:[2,1],full:1,img:'assets/tiles/w-{key}panel.webp'}},")
        if os.path.exists(P('wall-run.png')):
            save(wall_run(load(P('wall-run.png')), wp), f'w-{key}run.webp')
            lines.append(f"{{kind:'w',k:'{key}run',n:'{name} paneling',mode:'run',img:'assets/tiles/w-{key}run.webp'}},")
    print('\n'.join('  ' + l for l in lines))


if __name__ == '__main__':
    main(sys.argv[1])

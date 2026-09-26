"""Helpers for turning generated art into clean tile sources (used by tools/tiles/import_sets.py).

- find_period / crop_periodic: crop an almost-repeating image to whole repeats of its motif.
- wrap_x / wrap_y: make an image tile by overlapping its ends and cutting along the least visible seam
  (image quilting). Better than cross-fading: no ghosting, motifs stay whole.
- cut_background: flood-fill a solid background (black or white margins) from the image border.
- border_source: rebuild a bordered rug as the 3x3 source the game's border mode expects, so edges and corners
  join without seams at any size.
"""
import numpy as np
from PIL import Image
import cv2


def _seam_path(err):
    """Minimum-cost top-to-bottom path through err (H x W), moving at most one column per row."""
    H, W = err.shape
    cost = err.copy()
    back = np.zeros((H, W), np.int16)
    for y in range(1, H):
        prev = cost[y - 1]
        l = np.r_[np.inf, prev[:-1]]
        r = np.r_[prev[1:], np.inf]
        stack = np.vstack([l, prev, r])
        k = stack.argmin(0)
        cost[y] += stack[k, np.arange(W)]
        back[y] = k - 1
    path = np.zeros(H, int)
    path[-1] = int(cost[-1].argmin())
    for y in range(H - 1, 0, -1):
        path[y - 1] = min(W - 1, max(0, path[y] + back[y, path[y]]))
    return path


def wrap_x(a, o):
    """Tile horizontally: the last o columns are cut into the first o along the least visible seam. Width becomes W-o."""
    a = a.astype(np.float32)
    H, W = a.shape[:2]
    A, B = a[:, W - o:], a[:, :o]
    err = ((A - B) ** 2).sum(-1)
    err = cv2.GaussianBlur(err, (0, 0), 1.5)
    # keep the seam away from the very ends of the overlap
    ramp = np.minimum(np.arange(o), np.arange(o)[::-1]).astype(np.float32)
    err += (1 - np.clip(ramp / (o * .15), 0, 1)) * err.max()
    p = _seam_path(err)
    xs = np.arange(o)[None, :]
    m = np.clip((xs - p[:, None]) / 3.0 + .5, 0, 1)[..., None]   # 0 = take A (right end), 1 = take B
    out = a[:, :W - o].copy()
    out[:, :o] = A * (1 - m) + B * m
    return out.clip(0, 255).astype(np.uint8)


def wrap_y(a, o):
    return wrap_x(a.transpose(1, 0, 2), o).transpose(1, 0, 2)


def find_period(a, axis, lo=.3):
    """Smallest shift p (as a fraction of the size, >= lo) at which the image repeats itself, and how well it matches."""
    g = cv2.cvtColor(a, cv2.COLOR_RGB2GRAY).astype(np.float32)
    if axis == 0:
        g = g.T
    H, W = g.shape
    g = g[:, ::1]
    base = np.abs(g[:, 1:] - g[:, :-1]).mean()
    best = None
    for p in range(int(W * lo), W - 8):
        d = np.abs(g[:, p:] - g[:, :W - p]).mean()
        if best is None or d < best[1]:
            best = (p, d)
    return best[0], best[1] / max(base, 1e-3)


def crop_periodic(a, axis, thresh=1.6):
    """If the image clearly repeats along axis, crop it to whole repeats. Returns (image, cropped?)."""
    p, q = find_period(a, axis)
    if q > thresh:
        return a, False
    n = a.shape[1 - axis] if False else a.shape[axis]
    k = max(1, n // p)
    if axis == 1:
        return a[:, :k * p], True
    return a[:k * p], True


def make_tileable(a, axes=(0, 1), frac=.12):
    """Crop to the repeat if there is one, otherwise quilt the seam. axes: 1 = horizontal, 0 = vertical."""
    for ax in axes:
        a2, ok = crop_periodic(a, ax)
        if ok:
            a = a2
        else:
            n = a.shape[ax]
            a = wrap_x(a, int(n * frac)) if ax == 1 else wrap_y(a, int(n * frac))
    return a


def cut_background(a, tol=18):
    """Mask of a solid background touching the image border (True = background)."""
    h, w = a.shape[:2]
    corners = np.array([a[2, 2], a[2, -3], a[-3, 2], a[-3, -3]], np.float32)
    bg = np.median(corners, 0)
    diff = np.abs(a.astype(np.float32) - bg).max(-1) < tol
    ff = np.zeros((h + 2, w + 2), np.uint8)
    seeds = [(x, y) for x in (0, w - 1) for y in range(0, h, 8)] + [(x, y) for y in (0, h - 1) for x in range(0, w, 8)]
    mask = np.zeros((h, w), bool)
    lab = diff.astype(np.uint8)
    n, cc = cv2.connectedComponents(lab, connectivity=4)
    touch = set(cc[y, x] for x, y in seeds if lab[y, x])
    for t in touch:
        mask |= cc == t
    return mask


def _rot(a, k):
    return np.ascontiguousarray(np.rot90(a, k))


def border_source(rug, c=320, band=.4, band_src=None, corner_src=None):
    """Rebuild a bordered rug for border mode.

    The game draws a painted area from half-tile pieces: corners use the outer quarter of the corner cells, edges use
    half of the edge cells, the middle uses the fill cell, and pieces meet at half-cell lines. So the source is made of
    periodic layers (fill everywhere, one band strip per side repeating every cell) with the rug's own corner motifs
    faded in, which guarantees every junction matches.
    rug: RGB array with the background already removed/filled. band: band thickness in tiles (<= .5).
    """
    N = rug.shape[0]
    hbR = int(N * (band_src or .16))           # band thickness in the rug image
    qR = int(N * (corner_src or .24))          # corner motif size in the rug image
    hb = int(c * band)
    # fill: the rug's interior, made seamless
    m0 = int(N * .3)
    fill = make_tileable(np.ascontiguousarray(rug[m0:N - m0, m0:N - m0]), (0, 1), .18)
    fill = cv2.resize(fill, (c, c), interpolation=cv2.INTER_AREA)
    S = 3 * c
    out = np.tile(fill, (3, 3, 1)).astype(np.float32)

    def band_strip(side):
        # side 0 = top, 1 = right, 2 = bottom, 3 = left; returned as a horizontal strip for the top
        r = _rot(rug, side)                        # rotate so the wanted side is on top
        s = r[:hbR, qR:N - qR]
        s = make_tileable(np.ascontiguousarray(s), (1,), .2)
        return cv2.resize(s, (c, hb), interpolation=cv2.INTER_AREA).astype(np.float32)

    fade = np.ones(hb, np.float32)
    k = max(2, int(hb * .22))
    fade[-k:] = np.linspace(1, 0, k)
    for side in range(4):
        st = np.tile(band_strip(side), (1, 3, 1))           # hb x 3c
        layer = _rot(out, side).copy()                       # work with this side on top
        # rotated canvas keeps the same periodic phase because 3c is a whole number of periods
        layer[:hb] = layer[:hb] * (1 - fade[:, None, None]) + st * fade[:, None, None]
        out = _rot(layer, -side)
    # corners: the rug's own corner motif, fading out before the quarter's inner edges
    q = c // 2
    yy, xx = np.mgrid[0:q, 0:q].astype(np.float32) / q
    a_c = np.clip((1 - np.maximum(xx, yy)) / .3, 0, 1) ** 1.2
    for side in range(4):
        layer = _rot(out, side).copy()
        cr = _rot(rug, side)[:qR, :qR]
        cr = cv2.resize(np.ascontiguousarray(cr), (q, q), interpolation=cv2.INTER_AREA).astype(np.float32)
        layer[:q, :q] = layer[:q, :q] * (1 - a_c[..., None]) + cr * a_c[..., None]
        out = _rot(layer, -side)
    return out.clip(0, 255).astype(np.uint8), hb / c


def plank_rows(a):
    """Plank floors: the plank that crosses the tile edge is recoloured so both halves match (grain kept)."""
    g = cv2.cvtColor(a, cv2.COLOR_RGB2GRAY).astype(np.float32)
    H, W = g.shape
    prof = cv2.GaussianBlur(g.mean(1)[:, None], (1, 0), 2).ravel()
    thr = np.percentile(prof, 15)
    cuts = [y for y in range(3, H - 3) if prof[y] == prof[y - 3:y + 4].min() and prof[y] < thr]
    bands = [0] + [c for i, c in enumerate(cuts) if not i or c - cuts[i - 1] > H // 20] + [H]
    out = a.astype(np.float32).copy()
    for y0, y1 in zip(bands[:-1], bands[1:]):
        if y1 - y0 < 12:
            continue
        m0, m1 = y0 + (y1 - y0) // 4, y1 - (y1 - y0) // 4
        col = cv2.GaussianBlur(g[m0:m1].mean(0)[None, :], (0, 1), 1.5).ravel()
        t = np.percentile(col, 8)
        js = [x for x in range(4, W - 4) if col[x] == col[x - 4:x + 5].min() and col[x] < t]
        if len(js) < 2:
            continue
        jf, jl = js[0], js[-1]
        L = out[m0:m1, 2:max(3, jf - 6)].reshape(-1, 3)
        R = out[m0:m1, min(W - 3, jl + 6):W - 2].reshape(-1, 3)
        if len(L) < 20 or len(R) < 20:
            continue
        sl = out[y0:y1, :max(1, jf - 3)]
        sl[:] = sl - np.median(L, 0) + np.median(R, 0)
    top, bot = bands[1], bands[-2]                 # keep whole rows only, so rows also wrap top to bottom
    return out[top:bot].clip(0, 255).astype(np.uint8)

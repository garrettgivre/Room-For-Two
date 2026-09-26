# R42 Bubble font

`assets/r42-bubble.woff2` is traced from `specimen.jpg`.

    pip install numpy opencv-python-headless potracer fonttools brotli
    cd tools/font && python3 extract.py && python3 build.py

`extract.py` cuts each glyph out of the specimen grid (filling the gloss highlights) and saves `glyphs.pkl`. `build.py` traces the glyphs with potrace, lines them up on each row's baseline, and writes the WOFF2. The character order for each row is in `EXP` in both scripts, and `SCALE` evens out rows that were drawn smaller.

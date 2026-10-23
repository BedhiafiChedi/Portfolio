# Copybook-style ruled writing boxes (pale background, guide lines, vertical cells).
import sys
from PIL import Image, ImageDraw

PX = 12  # pixels per mm
BG, THIN, BASE, EDGE, VERT = '#EAF2FF', '#86A9DA', '#2F5FA8', '#3F64A0', '#A9C1E6'

def ruled(w_mm, h_mm, cell_mm, out):
    W, H = round(w_mm * PX), round(h_mm * PX)
    im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
    n = max(1, round(w_mm / cell_mm))
    for i in range(1, n):                       # vertical cell lines
        x = round(i * W / n); d.line([(x, 0), (x, H)], fill=VERT, width=2)
    for f, col, wd in ((0.25, THIN, 2), (0.75, THIN, 2), (0.5, BASE, 3)):   # guide lines, darker baseline
        y = round(f * H); d.line([(0, y), (W, y)], fill=col, width=wd)
    d.rectangle([0, 0, W - 1, H - 1], outline=EDGE, width=3)
    im.save(out)

for spec in sys.argv[1:]:                        # name:w:h:cell
    name, w, h, c = spec.split(':'); ruled(float(w), float(h), float(c), f'img/{name}.png')

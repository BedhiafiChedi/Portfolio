# Copybook (Seyes-style) ruled writing boxes: a thick main line in the middle with
# 3 thin lines above and 3 below (8 equal gaps), and vertical cell lines every 4 gaps.
import sys
from PIL import Image, ImageDraw

PX = 12          # pixels per mm
GAP = 2.1        # mm between two horizontal lines
BG, THIN, MAIN, EDGE, VERT = '#F1F6FF', '#9DBBE3', '#1F4E9A', '#3F64A0', '#8FAEDB'

def ruled(cells, out):
    g = GAP * PX
    W, H = round(cells * 4 * g), round(8 * g)
    im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
    for i in range(1, cells):                                   # vertical cell lines
        x = round(i * 4 * g); d.line([(x, 0), (x, H)], fill=VERT, width=2)
    for k in (1, 2, 3, 5, 6, 7):                                # 3 thin lines above and below
        y = round(k * g); d.line([(0, y), (W, y)], fill=THIN, width=2)
    d.line([(0, round(4 * g)), (W, round(4 * g))], fill=MAIN, width=4)   # main line
    d.rectangle([0, 0, W - 1, H - 1], outline=EDGE, width=3)
    im.save(out)
    return W, H

for spec in sys.argv[1:]:                                       # name:cells
    name, cells = spec.split(':')
    W, H = ruled(int(cells), f'img/{name}.png')
    print(name, f'{W}x{H}px', f'-> docx {round(W / PX * 3.7795)}x{round(H / PX * 3.7795)}')

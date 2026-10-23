# Put worksheet pages 1 (meem) and 2 (ra) side by side on one landscape A4 sheet.
import sys
from pypdf import PdfReader, PdfWriter, PageObject, Transformation
from reportlab.pdfgen import canvas
from io import BytesIO

src, out = sys.argv[1], sys.argv[2]
W, H = 842, 595                      # A4 landscape (pt)
x0, y0, bw, bh = 38, 43, 518, 773    # union content box of both pages (pt, PDF coords)
M = 14                               # margin inside each half
s = min((W / 2 - 2 * M) / bw, (H - 2 * M) / bh)

r = PdfReader(src)
sheet = PageObject.create_blank_page(width=W, height=H)
for idx, half_x in ((0, W / 2), (1, 0)):   # meem on the right, ra on the left (RTL order)
    tx = half_x + (W / 2 - bw * s) / 2
    ty = H - M - bh * s
    sheet.merge_transformed_page(r.pages[idx], Transformation().translate(-x0, -y0).scale(s, s).translate(tx, ty))

# dashed fold/cut line in the middle
buf = BytesIO(); c = canvas.Canvas(buf, pagesize=(W, H))
c.setStrokeColorRGB(0.6, 0.6, 0.6); c.setLineWidth(0.6); c.setDash(4, 3); c.line(W / 2, 10, W / 2, H - 10); c.save()
sheet.merge_page(PdfReader(buf).pages[0])

w = PdfWriter(); w.add_page(sheet)
w.add_metadata({'/Title': 'حرف الميم وحرف الراء: مرحلة التركيب'})
w.write(out)
print('scale', round(s, 3))

# In lines that contain inline ruled answer boxes, raise the text so it sits on the
# box's middle (darker) guide line instead of the box's bottom edge.
import re, sys, zipfile, shutil
src = sys.argv[1]; tmp = src + '.tmp'
INLINE_CY = 'cy="609600"'   # height of the ruled boxes (64 px = 48 pt)
RAISE = 24                  # half-points; tuned against the rendered PDF (main line = box middle)
with zipfile.ZipFile(src) as zin, zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == 'word/document.xml':
            xml = data.decode('utf-8'); count = [0]
            def fix(m):
                p = m.group(0)
                if INLINE_CY not in p:
                    return p
                count[0] += 1   # w:position must precede w:sz inside w:rPr
                return p.replace('<w:sz ', f'<w:position w:val="{RAISE}"/><w:sz ')
            xml = re.sub(r'<w:p>(?:(?!</w:p>).)*</w:p>', fix, xml, flags=re.S)
            print('adjusted', count[0], 'paragraphs'); data = xml.encode('utf-8')
        zout.writestr(item, data)
shutil.move(tmp, src)

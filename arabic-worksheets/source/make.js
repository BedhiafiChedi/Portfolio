const fs = require('fs');
const D = require('docx');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, WidthType,
  AlignmentType, BorderStyle, ShadingType, VerticalAlign, PageBreak, TableLayoutType, LineRuleType } = D;

const FONT = { ascii: 'Amiri', hAnsi: 'Amiri', cs: 'Amiri', eastAsia: 'Amiri' };
const NAVY = '1F3864', ACCENT = 'C00000', GREY = '808080';
const W = 10206; // content width (A4, margins 850)

const R = (text, o = {}) => new TextRun({ text, font: FONT, rightToLeft: true, size: o.size || 32,
  bold: o.bold, color: o.color, underline: o.underline ? {} : undefined });
const BL = (n = 16) => R('.'.repeat(n), { color: GREY, size: 32 });
// copybook-ruled answer boxes (see ruling.py): small, medium, full-width
const RBS = { s: { width: 76, height: 42 }, m: { width: 128, height: 42 }, l: { width: 624, height: 49 } };
const RB = (k) => new ImageRun({ type: 'png', data: fs.readFileSync(`img/rule_${k}.png`), transformation: RBS[k] });
const P = (children, o = {}) => new Paragraph({ children, bidirectional: true, alignment: o.align, indent: o.indent ? { start: o.indent } : undefined,
  spacing: { before: o.before ?? 60, after: o.after ?? 60, line: o.line ?? 360, lineRule: LineRuleType.AUTO }, keepNext: o.keepNext });
const C = AlignmentType.CENTER;

const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NB = { top: none, bottom: none, left: none, right: none };
const line = (c = '7F7F7F', s = 8) => ({ style: BorderStyle.SINGLE, size: s, color: c });
const BOX = (c, s) => ({ top: line(c, s), bottom: line(c, s), left: line(c, s), right: line(c, s) });

function cell(children, width, o = {}) {
  return new TableCell({ children, width: { size: width, type: WidthType.DXA },
    borders: o.borders || NB, verticalAlign: o.valign || VerticalAlign.CENTER,
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    margins: o.margins || { top: 60, bottom: 60, left: 80, right: 80 } });
}
function table(rows, widths, o = {}) {
  return new Table({ rows, columnWidths: widths, width: { size: widths.reduce((a, b) => a + b), type: WidthType.DXA },
    visuallyRightToLeft: true, alignment: o.align || C, layout: TableLayoutType.FIXED,
    borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none } });
}
const img = (name, w, h) => new ImageRun({ type: 'png', data: fs.readFileSync(`img/${name}.png`),
  transformation: { width: w, height: h } });
const spacer = (pt = 4) => new Paragraph({ children: [], spacing: { before: 0, after: 0, line: pt * 20, lineRule: LineRuleType.EXACT } });

// ---------- building blocks ----------
function title(text) {
  return table([new TableRow({ children: [cell([P([R(text, { bold: true, size: 46, color: NAVY })], { align: C, before: 30, after: 30, line: 320 })],
    6800, { borders: BOX(NAVY, 18), fill: 'DEEAF6' })] })], [6800]);
}
function heading(num, text) {
  return P([R(`${num} – `, { bold: true, color: ACCENT, size: 34 }), R(text, { bold: true, color: NAVY, size: 34, underline: true })],
    { before: 0, after: 90, line: 320, keepNext: true });
}
// each exercise inside a framed box
function exercise(children) {
  return [table([new TableRow({ cantSplit: true, children: [cell(children, W, { borders: BOX('8EA9DB', 10), valign: VerticalAlign.TOP,
    margins: { top: 120, bottom: 160, left: 180, right: 180 } })] })], [W]), spacer(8)];
}
function syllableBank(items) {
  const w = 1450;
  return table([new TableRow({ children: items.flatMap((s, i) => {
    const cs = [cell([P([R(s, { bold: true, size: 44 })], { align: C, before: 0, after: 0, line: 300 })], w, { borders: BOX('BF8F00', 12), fill: 'FFF2CC' })];
    if (i < items.length - 1) cs.push(cell([P([])], 300));
    return cs;
  }) })], items.flatMap((_, i) => i < items.length - 1 ? [w, 300] : [w]));
}

// ======================= PAGE 1 : حرف الميم =======================
const page1 = [
  title('حَرْفُ الْمِيمِ: مَرْحَلَةُ التَّرْكِيبِ'), spacer(14),
  ...exercise([
    heading('1', 'أُكْمِلُ بِالْمَقْطَعِ النَّاقِصِ وَأَقْرَأُ الْجُمْلَةَ قِرَاءَةً مُسْتَرْسِلَةً:'),
    syllableBank(['ـمَـ', 'مِيـ', 'مَا', 'ـمِ', 'ـمُـ']),
    P([R('وَقَفَتِ الْـ', { size: 44 }), RB('s'), R('ـعَلِّمَةُ أَ', { size: 44 }), RB('s'), R('مَ الْقِسْـ', { size: 44 }), RB('s'),
      R(' وَسَلَّـ', { size: 44 }), RB('s'), R('ـتْ', { size: 44 })], { before: 160, after: 40, line: 300 }),
    P([R('عَلَى التَّلَا', { size: 44 }), RB('s'), R('ـذِ.', { size: 44 })], { before: 40, after: 20, line: 300 }),
  ]),
];
const dot = () => P([R('●', { color: NAVY, size: 24 })], { align: C, before: 0, after: 0 });
const box = (t, w, fill) => cell([P([R(t, { bold: true, size: 40 })], { align: C, before: 20, after: 20, line: 320 })], w, { borders: BOX('595959', 12), fill });
const MW = [1750, 330, 750, 330, 3300, 330, 750, 330, 1900];
const matchRow = (a, b, pic) => new TableRow({ cantSplit: true, children: [
  box(a, MW[0], 'E2EFDA'), cell([dot()], MW[1]), cell([P([])], MW[2]), cell([dot()], MW[3]),
  box(b, MW[4], 'FBE4D5'), cell([dot()], MW[5]), cell([P([])], MW[6]), cell([dot()], MW[7]),
  cell([P([img(pic, 96, 83)], { align: C, before: 0, after: 0, line: 240 })], MW[8], { margins: { top: 45, bottom: 45, left: 40, right: 40 } }),
] });
// empty row so the word boxes stay visually separate
const gapRow = () => new TableRow({ height: { value: 160, rule: 'exact' }, children: MW.map((w) => cell([spacer(2)], w, { margins: { top: 0, bottom: 0, left: 0, right: 0 } })) });
page1.push(...exercise([
  heading('2', 'أَرْبِطُ لِأُكَوِّنَ جُمَلًا مُفِيدَةً وَأَقْرَؤُهَا قِرَاءَةً مُسْتَرْسِلَةً:'),
  table([
    matchRow('مِيدَعَتِي', 'رُسُومٍ', 'flag_school'), gapRow(),
    matchRow('عَلَمُ', 'قُرْبَ مَمَرِّ الْمُتَرَجِّلِينَ', 'exhibition'), gapRow(),
    matchRow('مَعْرِضُ', 'بِلَادِي يُرَفْرِفُ', 'smock'), gapRow(),
    matchRow('سَامِي', 'جَمِيلَةٌ وَحَمْرَاءُ', 'crosswalk'),
  ], MW),
]));

// ======================= PAGE 2 : حرف الراء =======================
const word = (parts, w) => cell([P(parts, { align: C, before: 20, after: 20, line: 320 })], w, { borders: BOX('595959', 10), fill: 'F2F2F2' });
const S38 = (t) => R(t, { size: 42 });
const page2 = [
  title('حَرْفُ الرَّاءِ: مَرْحَلَةُ التَّرْكِيبِ'), spacer(14),
  ...exercise([
    heading('1', 'أَقْرَأُ الْمَقَاطِعَ وَأُكْمِلُ الْكَلِمَاتِ بِمَا يُنَاسِبُ:'),
    syllableBank(['ـرَا', 'رِيـ', 'ـرُو', 'رَ']),
    spacer(9),
    table([new TableRow({ children: [
      word([RB('s'), S38('ـمُ')], 2250), cell([P([])], 300),
      word([S38('حُـ'), RB('s'), S38('فًا')], 2250), cell([P([])], 300),
      word([S38('السَّبُّو'), RB('s'), S38('ةِ')], 2250), cell([P([])], 300),
      word([S38('فَـ'), RB('s'), S38('شَةً')], 2250),
    ] })], [2250, 300, 2250, 300, 2250, 300, 2250]),
  ]),
  ...exercise([
    heading('2', 'أُكْمِلُ النَّصَّ بِالْكَلِمَاتِ الْمُتَحَصَّلِ عَلَيْهَا وَأَقْرَؤُهُ قِرَاءَةً مُسْتَرْسِلَةً:'),
    P([S38('رَسَمَتْ '), RB('m'), S38(' '), RB('m'), S38(' عَلَى '), RB('m')], { before: 0, after: 0, line: 320 }),
    P([S38('وَكَتَبَ مَالِكٌ '), RB('m'), S38(' عَلَى كُرَّاسِهِ.')], { before: 20, line: 320, after: 0 }),
  ]),
];
const card = (pic, dims, parts, w) => cell([
  P(pic ? [img(pic, dims[0], dims[1])] : [], { align: C, before: 30, after: 0, line: 240 }),
  P(parts, { align: C, before: 40, after: 40, line: 340 }),
], w, { borders: BOX('595959', 10), valign: VerticalAlign.BOTTOM });
page2.push(...exercise([
  heading('3', 'أَسْتَمِعُ وَأُكْمِلُ الْكَلِمَاتِ بِالْمَقْطَعِ الْمُنَاسِبِ لِحَرْفِ الرَّاءِ:'),
  table([new TableRow({ cantSplit: true, children: [
    card('ruler', [105, 70], [S38('مِسْطَـ'), RB('s'), S38('ةٌ')], 2250), cell([P([])], 300),
    card(null, null, [S38('اِشْتَـ'), RB('s')], 2250), cell([P([])], 300),
    card('boy', [54, 70], [S38('كَـ'), RB('s'), S38('ـمُ')], 2250), cell([P([])], 300),
    card('sharpener', [105, 70], [S38('مِبْـ'), RB('s'), S38('ةٌ')], 2250),
  ] })], [2250, 300, 2250, 300, 2250, 300, 2250]),
]));
page2.push(...exercise([
  heading('4', 'أُرَتِّبُ الْكَلِمَاتِ السَّابِقَةَ لِلْحُصُولِ عَلَى جُمْلَةٍ مُفِيدَةٍ ثُمَّ أَقْرَؤُهَا:'),
  P([RB('l')], { align: C, before: 60, after: 20, line: 240 }),
]));

// ======================= PAGE 3 : answer key =======================
const key = (t) => P([R('◄ ', { color: ACCENT, size: 22 }), R(t, { size: 34 })], { before: 60, after: 60, line: 480 });
const sub = (t) => P([R(t, { bold: true, color: ACCENT, size: 32, underline: true })], { before: 300, after: 100, line: 420 });
const page3 = [
  title('الْإِصْلَاحُ – خَاصٌّ بِالْمُعَلِّمِ'), spacer(10),
  sub('حَرْفُ الْمِيمِ'),
  key('التَّمْرِينُ الْأَوَّلُ: وَقَفَتِ الْمُعَلِّمَةُ أَمَامَ الْقِسْمِ وَسَلَّمَتْ عَلَى التَّلَامِيذِ.'),
  key('التَّمْرِينُ الثَّانِي:'),
  ...['مِيدَعَتِي جَمِيلَةٌ وَحَمْرَاءُ.', 'عَلَمُ بِلَادِي يُرَفْرِفُ.', 'مَعْرِضُ رُسُومٍ.', 'سَامِي قُرْبَ مَمَرِّ الْمُتَرَجِّلِينَ.']
    .map((t) => P([R(t, { size: 34 })], { before: 0, after: 0, line: 340, indent: 700 })),
  sub('حَرْفُ الرَّاءِ'),
  key('التَّمْرِينُ الْأَوَّلُ: رِيمُ – حُرُوفًا – السَّبُّورَةِ – فَرَاشَةً.'),
  key('التَّمْرِينُ الثَّانِي: رَسَمَتْ رِيمُ فَرَاشَةً عَلَى السَّبُّورَةِ وَكَتَبَ مَالِكٌ حُرُوفًا عَلَى كُرَّاسِهِ.'),
  key('التَّمْرِينُ الثَّالِثُ: مِسْطَرَةٌ – اِشْتَرَى – كَرِيمُ – مِبْرَاةٌ.'),
  key('التَّمْرِينُ الرَّابِعُ: اِشْتَرَى كَرِيمُ مِسْطَرَةً وَمِبْرَاةً.'),
];

const doc = new Document({
  creator: 'Teacher', title: 'حرف الميم وحرف الراء: مرحلة التركيب',
  styles: { default: { document: { run: { font: FONT, size: 32, rightToLeft: true } } } },
  sections: [page1, page2, page3].map((children) => ({ properties: { page: { size: { width: 11906, height: 16838 },
    margin: { top: 600, bottom: 500, left: 850, right: 850, header: 300, footer: 300 } } }, children })),
});
Packer.toBuffer(doc).then((b) => fs.writeFileSync('worksheet.docx', b));

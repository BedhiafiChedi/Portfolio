// Tunisian flag drawn at origin, width 150 height 100
function star(cx, cy, R, r, rot) {
  let p = [];
  for (let i = 0; i < 10; i++) {
    const a = rot + i * Math.PI / 5, rad = i % 2 ? r : R;
    p.push((cx + rad * Math.cos(a)).toFixed(2) + ',' + (cy + rad * Math.sin(a)).toFixed(2));
  }
  return `<polygon points="${p.join(' ')}"/>`;
}
const flag = `<g><rect width="150" height="100" fill="#E70013"/><circle cx="75" cy="50" r="25" fill="#fff"/>
<circle cx="75" cy="50" r="18.75" fill="#E70013"/><circle cx="79.7" cy="50" r="15" fill="#fff"/>
<g fill="#E70013">${star(80.5, 50, 10, 4, Math.PI)}</g></g>`;

const S = {};
S.flag_school = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 260">
<rect width="300" height="260" fill="#DFF1FB"/>
<circle cx="45" cy="45" r="22" fill="#FFD54F"/>
<ellipse cx="245" cy="105" rx="26" ry="10" fill="#fff"/><ellipse cx="266" cy="99" rx="18" ry="9" fill="#fff"/>
<rect y="225" width="300" height="35" fill="#8BC34A"/>
<rect x="40" y="130" width="220" height="100" fill="#F6E3B4" stroke="#B9935A" stroke-width="2"/>
<polygon points="30,132 150,92 270,132" fill="#C0504D"/>
<rect x="132" y="180" width="36" height="50" fill="#8D5B3A"/><circle cx="160" cy="206" r="2.5" fill="#FFD54F"/>
<g fill="#90CAF9" stroke="#fff" stroke-width="3">
<rect x="58" y="150" width="34" height="28"/><rect x="104" y="150" width="34" height="28"/>
<rect x="162" y="150" width="34" height="28"/><rect x="208" y="150" width="34" height="28"/>
<rect x="58" y="192" width="34" height="28"/><rect x="208" y="192" width="34" height="28"/></g>
<rect x="149" y="18" width="4" height="96" fill="#616161"/><circle cx="151" cy="17" r="4" fill="#FFC107"/>
<g transform="translate(153,22) scale(0.62)"><path d="M0,0 Q40,-8 75,0 T150,0 V100 Q110,92 75,100 T0,100 Z" fill="#E70013"/>
<g transform="translate(0,0)"><circle cx="75" cy="50" r="25" fill="#fff"/><circle cx="75" cy="50" r="18.75" fill="#E70013"/>
<circle cx="79.7" cy="50" r="15" fill="#fff"/><g fill="#E70013">${star(80.5, 50, 10, 4, Math.PI)}</g></g></g>
</svg>`;

S.exhibition = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 260">
<rect width="300" height="260" fill="#FFF8E7"/>
<rect y="200" width="300" height="60" fill="#C8A27A"/><rect y="196" width="300" height="6" fill="#8D6E63"/>
<g transform="translate(25,45)"><rect width="74" height="96" fill="#6D4C41"/><rect x="7" y="7" width="60" height="82" fill="#B3E5FC"/>
<rect x="7" y="62" width="60" height="27" fill="#81C784"/><circle cx="48" cy="24" r="9" fill="#FFCA28"/>
<polygon points="10,62 30,34 48,62" fill="#7E57C2"/></g>
<g transform="translate(113,60)"><rect width="74" height="64" fill="#FFB300"/><rect x="6" y="6" width="62" height="52" fill="#FFFDE7"/>
<circle cx="27" cy="30" r="12" fill="#EF5350"/><rect x="38" y="22" width="20" height="20" fill="#42A5F5"/><polygon points="20,52 34,38 48,52" fill="#66BB6A"/></g>
<g transform="translate(201,45)"><rect width="74" height="96" fill="#37474F"/><rect x="7" y="7" width="60" height="82" fill="#FCE4EC"/>
<circle cx="37" cy="58" r="8" fill="#FFEB3B"/><g fill="#EC407A"><circle cx="37" cy="47" r="7"/><circle cx="48" cy="58" r="7"/><circle cx="37" cy="69" r="7"/><circle cx="26" cy="58" r="7"/></g>
<rect x="36" y="74" width="3" height="15" fill="#43A047"/></g>
<g fill="#E53935"><rect x="58" y="160" width="185" height="5" rx="2"/><rect x="62" y="165" width="5" height="34"/><rect x="234" y="165" width="5" height="34"/></g>
<g transform="translate(150,135)"><circle cx="0" cy="0" r="10" fill="#FFCC80"/><path d="M-10,-3 Q0,-16 10,-3 Z" fill="#5D4037"/>
<rect x="-11" y="10" width="22" height="34" rx="6" fill="#1E88E5"/><rect x="-9" y="44" width="7" height="18" fill="#37474F"/><rect x="2" y="44" width="7" height="18" fill="#37474F"/></g>
</svg>`;

S.smock = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 260">
<rect width="300" height="260" fill="#FDF6F0"/>
<path d="M115,30 L150,48 L185,30 L238,52 L270,118 L238,132 L222,100 L222,232 L78,232 L78,100 L62,132 L30,118 L62,52 Z" fill="#D32F2F" stroke="#9A1C1C" stroke-width="3" stroke-linejoin="round"/>
<path d="M115,30 L150,48 L185,30 L172,26 L150,36 L128,26 Z" fill="#fff" stroke="#9A1C1C" stroke-width="2"/>
<line x1="150" y1="48" x2="150" y2="232" stroke="#9A1C1C" stroke-width="2"/>
<g fill="#fff"><circle cx="160" cy="80" r="4"/><circle cx="160" cy="115" r="4"/><circle cx="160" cy="150" r="4"/><circle cx="160" cy="185" r="4"/></g>
<rect x="92" y="160" width="44" height="40" rx="4" fill="#B71C1C" stroke="#7F1414" stroke-width="2"/>
<g transform="translate(100,175)"><rect width="5" height="22" fill="#FFEB3B"/><rect x="9" width="5" height="22" fill="#42A5F5"/><rect x="18" width="5" height="22" fill="#66BB6A"/></g>
<g transform="translate(168,172)" font-family="Arial" font-weight="bold" font-size="20"><text fill="#FFEB3B">a</text><text x="14" fill="#81D4FA">b</text><text x="28" fill="#A5D6A7">c</text></g>
</svg>`;

S.crosswalk = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 260">
<rect width="300" height="260" fill="#E3F2FD"/>
<rect y="70" width="300" height="40" fill="#BDBDBD"/>
<rect y="110" width="300" height="120" fill="#546E7A"/>
<g fill="#fff"><rect x="30" y="115" width="240" height="14"/><rect x="30" y="139" width="240" height="14"/><rect x="30" y="163" width="240" height="14"/>
<rect x="30" y="187" width="240" height="14"/><rect x="30" y="211" width="240" height="14"/></g>
<rect y="230" width="300" height="30" fill="#BDBDBD"/>
<rect x="250" y="10" width="7" height="90" fill="#455A64"/><rect x="238" y="10" width="31" height="52" rx="5" fill="#263238"/>
<circle cx="253.5" cy="24" r="8" fill="#E53935"/><circle cx="253.5" cy="47" r="8" fill="#43A047" opacity=".35"/>
<g transform="translate(110,30)">
<circle cx="25" cy="16" r="14" fill="#FFCC80"/><path d="M11,12 Q25,-6 39,12 Z" fill="#4E342E"/>
<circle cx="20" cy="17" r="1.8" fill="#333"/><circle cx="30" cy="17" r="1.8" fill="#333"/><path d="M20,23 Q25,27 30,23" stroke="#333" fill="none" stroke-width="1.5"/>
<rect x="9" y="30" width="32" height="36" rx="7" fill="#FB8C00"/><rect x="2" y="32" width="9" height="28" rx="4" fill="#FB8C00"/><rect x="39" y="32" width="9" height="28" rx="4" fill="#FB8C00"/>
<rect x="-3" y="36" width="10" height="26" rx="3" fill="#1565C0"/>
<rect x="12" y="66" width="11" height="30" fill="#1E3A5F"/><rect x="27" y="66" width="11" height="30" fill="#1E3A5F"/>
<rect x="10" y="94" width="14" height="6" rx="3" fill="#212121"/><rect x="26" y="94" width="14" height="6" rx="3" fill="#212121"/></g>
</svg>`;

S.ruler = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
<rect width="300" height="200" fill="#fff"/>
<g transform="rotate(-12 150 100)"><rect x="20" y="72" width="260" height="56" rx="5" fill="#FFD54F" stroke="#C9A227" stroke-width="2"/>
<g stroke="#5D4037" stroke-width="2">${Array.from({length: 25}, (_, i) => `<line x1="${32 + i * 10}" y1="72" x2="${32 + i * 10}" y2="${i % 5 ? 84 : 94}"/>`).join('')}</g>
<g font-family="Arial" font-size="11" fill="#5D4037" text-anchor="middle">${[0,5,10,15,20].map((n,i)=>`<text x="${32 + i*50}" y="108">${n}</text>`).join('')}</g></g>
</svg>`;

S.boy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260">
<rect width="200" height="260" fill="#fff"/>
<circle cx="100" cy="62" r="38" fill="#FFCC80"/>
<path d="M62,58 Q66,18 100,20 Q136,18 140,58 Q122,40 100,42 Q80,40 62,58 Z" fill="#4E342E"/>
<circle cx="86" cy="64" r="4" fill="#333"/><circle cx="114" cy="64" r="4" fill="#333"/>
<path d="M86,80 Q100,92 114,80" stroke="#C62828" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="78" cy="76" r="5" fill="#FFAB91" opacity=".7"/><circle cx="122" cy="76" r="5" fill="#FFAB91" opacity=".7"/>
<rect x="64" y="104" width="72" height="80" rx="14" fill="#43A047"/>
<rect x="44" y="108" width="22" height="64" rx="10" fill="#43A047"/><rect x="134" y="108" width="22" height="64" rx="10" fill="#43A047"/>
<circle cx="55" cy="176" r="9" fill="#FFCC80"/><circle cx="145" cy="176" r="9" fill="#FFCC80"/>
<rect x="72" y="184" width="24" height="54" fill="#1565C0"/><rect x="104" y="184" width="24" height="54" fill="#1565C0"/>
<rect x="66" y="236" width="32" height="12" rx="6" fill="#424242"/><rect x="102" y="236" width="32" height="12" rx="6" fill="#424242"/>
</svg>`;

S.sharpener = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
<rect width="300" height="200" fill="#fff"/>
<rect x="70" y="60" width="120" height="90" rx="10" fill="#1E88E5" stroke="#0D47A1" stroke-width="3"/>
<rect x="84" y="74" width="92" height="20" rx="3" fill="#B0BEC5" stroke="#607D8B" stroke-width="2"/>
<circle cx="100" cy="84" r="4" fill="#607D8B"/>
<circle cx="190" cy="112" r="20" fill="#0D47A1"/><circle cx="190" cy="112" r="12" fill="#263238"/>
<g transform="translate(196,112)"><polygon points="0,0 22,-9 22,9" fill="#FFE0B2"/><polygon points="0,0 7,-3 7,3" fill="#333"/>
<rect x="22" y="-9" width="70" height="18" fill="#FFC107"/><rect x="88" y="-9" width="8" height="18" fill="#F48FB1"/></g>
</svg>`;
module.exports = S;

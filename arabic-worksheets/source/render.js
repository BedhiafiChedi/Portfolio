const { chromium } = require('playwright');
const S = require('./svgs.js');
(async () => {
  const b = await chromium.launch({ }).catch(() => chromium.launch());
  const p = await b.newPage({ deviceScaleFactor: 2 });
  for (const [k, svg] of Object.entries(S)) {
    await p.setContent(`<html><body style="margin:0">${svg.replace('<svg ', '<svg id="s" width="' + (svg.includes('0 0 300 260') ? 300 : svg.includes('0 0 200') ? 200 : 300) + '" ')}</body></html>`);
    await p.locator('#s').screenshot({ path: `img/${k}.png` });
  }
  await b.close();
})();

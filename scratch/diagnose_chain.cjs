const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  const chain = await page.evaluate(() => {
    const el = document.querySelector('div.max-w-\\[620px\\]');
    if (!el) return 'el not found';
    const list = [];
    let cur = el;
    while (cur && cur !== document.body) {
      const s = window.getComputedStyle(cur);
      list.push({
        tag: cur.tagName,
        id: cur.id,
        className: cur.className,
        display: s.display,
        visibility: s.visibility,
        opacity: s.opacity,
        height: cur.offsetHeight,
        styleAttr: cur.getAttribute('style')
      });
      cur = cur.parentElement;
    }
    return list;
  });

  console.log('PARENT CHAIN:\n', JSON.stringify(chain, null, 2));
  await browser.close();
}

run().catch(console.error);


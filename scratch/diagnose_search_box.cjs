const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));

  const searchBoxInfo = await page.evaluate(() => {
    // Check all elements matching search box
    const outerCenter = document.querySelector('div[class*="min-[64.0625rem]:z-[37]"]') ||
                        document.querySelector('div[style*="left: 50%"][style*="top: 42%"]') ||
                        document.querySelector('div[style*="left:50%"][style*="top:42%"]');

    const searchInputDiv = document.querySelector('div.max-w-\\[620px\\]');
    const popularDiv = document.querySelector('.edp-popular-searches');

    function getDetails(el) {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex,
        pointerEvents: style.pointerEvents,
        innerHTMLSnippet: el.innerHTML.slice(0, 150)
      };
    }

    return {
      outerCenter: getDetails(outerCenter),
      searchInputDiv: getDetails(searchInputDiv),
      popularDiv: getDetails(popularDiv),
      allSearchNodesCount: document.querySelectorAll('*[class*="max-w-[620px]"]').length
    };
  });

  console.log('SEARCH BOX COMPUTED INFO:\n', JSON.stringify(searchBoxInfo, null, 2));

  await browser.close();
}

run().catch(console.error);


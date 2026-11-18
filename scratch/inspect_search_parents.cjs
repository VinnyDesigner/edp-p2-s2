const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const idx = html.indexOf('max-w-[620px]');
console.log(html.substring(Math.max(0, idx - 600), idx + 200));


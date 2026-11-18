const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const idx = html.indexOf('max-w-[620px] mx-auto px-4');
console.log('Found search card wrapper at:', idx);
console.log(html.substring(idx - 100, idx + 1600));


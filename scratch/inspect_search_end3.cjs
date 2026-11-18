const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const idx = html.indexOf('Ask anything');
const idx2 = html.indexOf('Ask anything', idx + 1);
console.log(html.substring(idx2 + 600, idx2 + 1200));


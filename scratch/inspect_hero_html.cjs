const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const idx = html.indexOf('The agent layer for');
console.log('Found The agent layer for at:', idx);
console.log(html.substring(Math.max(0, idx - 800), Math.min(html.length, idx + 1000)));


const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const idx = js.indexOf('let a=performance.now()');
console.log(js.substring(Math.max(0, idx - 800), idx + 200));


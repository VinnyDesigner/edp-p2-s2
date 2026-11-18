const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const idx = js.indexOf('d(V.slice(0,a))');
console.log(js.substring(Math.max(0, idx - 400), idx + 100));


const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const idx = js.indexOf('d(V.slice(0,a))');
console.log(js.substring(Math.max(0, idx - 4500), Math.max(0, idx - 3000)));


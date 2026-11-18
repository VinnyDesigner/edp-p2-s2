const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const idx = js.indexOf('eq.current');
console.log(js.substring(Math.max(0, idx - 150), Math.min(js.length, idx + 400)));


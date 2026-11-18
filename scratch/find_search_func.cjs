const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const idx = js.indexOf('Ask anything');
console.log(js.substring(Math.max(0, idx - 2000), Math.max(0, idx - 1000)));


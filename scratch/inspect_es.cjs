const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const idx = js.indexOf('function eS(){');
console.log(js.substring(idx, idx + 1000));


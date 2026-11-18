const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const pos = 265500;
console.log(js.substring(pos - 1500, pos));


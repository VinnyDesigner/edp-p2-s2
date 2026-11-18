const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const pos = 268074;
console.log(js.substring(pos - 1000, pos));


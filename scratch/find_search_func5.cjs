const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const idx = js.indexOf('function x(e){let{active:t,sending:n}=e');
console.log(js.substring(idx + 2500, idx + 3500));


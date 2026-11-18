const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

// The component function is likely named right above that
const idx = js.indexOf('function x(e){let{active:t,sending:n}=e');
console.log(js.substring(Math.max(0, idx - 800), idx));


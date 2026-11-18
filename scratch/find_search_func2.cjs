const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

// The component function is likely named right above that. Let's find function name
const idx = js.indexOf('boxShadow:p.shadowChat');
console.log(js.substring(Math.max(0, idx - 800), idx));


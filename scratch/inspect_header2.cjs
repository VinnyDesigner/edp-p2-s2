const fs = require('fs');
const js = fs.readFileSync('public/_next/static/chunks/app/page-14ad751b86e9d6b1.js', 'utf8');
const idx = js.indexOf('Use Cases');
console.log(js.substring(idx + 2500, idx + 5000));


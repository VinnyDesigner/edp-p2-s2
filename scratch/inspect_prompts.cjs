const fs = require('fs');
const js = fs.readFileSync('public/_next/static/chunks/app/page-14ad751b86e9d6b1.js', 'utf8');

const idx = js.indexOf('best shots');
console.log('Found best shots at:', idx);
if (idx !== -1) {
  console.log(js.substring(Math.max(0, idx - 150), Math.min(js.length, idx + 400)));
}


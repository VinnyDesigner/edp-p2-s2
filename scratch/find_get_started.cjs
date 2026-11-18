const fs = require('fs');
const js = fs.readFileSync('public/_next/static/chunks/app/page-14ad751b86e9d6b1.js', 'utf8');
let pos = 0;
let count = 0;
while ((pos = js.indexOf('"Get started"', pos)) !== -1) {
  count++;
  console.log(`Match ${count} at ${pos}:`);
  console.log(js.substring(Math.max(0, pos - 60), Math.min(js.length, pos + 80)));
  pos += 10;
}


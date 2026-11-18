const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

let pos = 0;
while ((pos = js.indexOf('(0,a.jsx)(y,', pos)) !== -1) {
  console.log('Found (0,a.jsx)(y, at', pos);
  console.log(js.substring(Math.max(0, pos - 150), Math.min(js.length, pos + 300)));
  pos += 10;
}


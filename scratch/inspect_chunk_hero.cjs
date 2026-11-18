const fs = require('fs');
const js = fs.readFileSync('public/_next/static/chunks/app/page-14ad751b86e9d6b1.js', 'utf8');

['Research Preview', 'Ask anything', 'The agent layer for'].forEach(term => {
  let pos = 0;
  let count = 0;
  while ((pos = js.indexOf(term, pos)) !== -1) {
    count++;
    console.log(`Found "${term}" match ${count} at ${pos}`);
    console.log(js.substring(Math.max(0, pos - 80), Math.min(js.length, pos + 120)));
    pos += 10;
  }
});


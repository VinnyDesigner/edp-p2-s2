const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

let pos = 0;
while ((pos = html.indexOf('Research Preview', pos)) !== -1) {
  console.log('Match at', pos);
  console.log(html.substring(Math.max(0, pos - 150), Math.min(html.length, pos + 150)));
  pos += 10;
}


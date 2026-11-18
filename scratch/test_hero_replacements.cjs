const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Check page-14ad751b86e9d6b1.js
const pageChunkPath = path.join(rootDir, 'public/_next/static/chunks/app/page-14ad751b86e9d6b1.js');
const js = fs.readFileSync(pageChunkPath, 'utf8');

console.log('page-14ad751b86e9d6b1.js checks:');
console.log('Research Preview occurrences:', (js.match(/children:"Research Preview"/g) || []).length);
console.log('The agent layer for occurrences:', (js.match(/The agent layer for/g) || []).length);
console.log('Ask anything occurrences:', (js.match(/children:"Ask anything"/g) || []).length);
console.log('eu prompt array:', js.includes('eu=["Find the best shots from the trip"'));

// 2. Check index.html
const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
console.log('\nindex.html checks:');
console.log('Research Preview occurrences:', (html.match(/Research Preview/g) || []).length);
console.log('The agent layer for occurrences:', (html.match(/The agent layer for/g) || []).length);
console.log('Ask anything occurrences:', (html.match(/Ask anything/g) || []).length);

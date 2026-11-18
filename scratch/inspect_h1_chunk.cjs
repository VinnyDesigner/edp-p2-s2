const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const pageChunkPath = path.join(rootDir, 'public/_next/static/chunks/app/page-14ad751b86e9d6b1.js');
const js = fs.readFileSync(pageChunkPath, 'utf8');

const idx = js.indexOf('The agent layer for');
console.log(js.substring(Math.max(0, idx - 100), Math.min(js.length, idx + 400)));


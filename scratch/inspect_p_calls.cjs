const fs = require('fs');
const js = fs.readFileSync('page_chunk.js', 'utf8');

const idx = js.indexOf('function eS(){');
const endIdx = js.indexOf('return J(X(eC/.14))', idx);
const chunk = js.substring(idx, endIdx);

let matches = [];
let regex = /p\(([^)]+)\)/g;
let m;
while ((m = regex.exec(chunk)) !== null) {
  matches.push({ match: m[0], index: m.index });
}
console.log('Matches for p(...):', matches);
matches.forEach(item => {
  console.log('Context at', item.index, ':', chunk.substring(Math.max(0, item.index - 50), Math.min(chunk.length, item.index + 80)));
});


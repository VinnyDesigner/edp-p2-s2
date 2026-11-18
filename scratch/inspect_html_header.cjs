const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find header nav section
const start = html.indexOf('<div class="flex items-center gap-4 sm:gap-5 md:gap-6"><a href="#use-cases"');
console.log('Header start at:', start);
if (start !== -1) {
  console.log(html.substring(start, start + 1200));
}


const fs = require('fs');

const code = fs.readFileSync('src/lib/data/themes.ts', 'utf8');

// We'll extract the interface and the array.
// But writing a regex to parse the array of objects in JS is tricky.
// Since we are in Node, let's just use typescript? No, we can just compile it or use a simple regex since the format is very consistent.

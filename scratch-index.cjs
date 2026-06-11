const fs = require('fs');

const code = fs.readFileSync('src/lib/data/themes.ts', 'utf8');
const themeRegex = /id: '([^']+)'/g;

let match;
const ids = [];
while ((match = themeRegex.exec(code)) !== null) {
	ids.push(match[1]);
}

let indexExports = `import type { Theme } from '../themes';\n\n`;
let indexArray = `export const THEMES: Theme[] = [\n`;

ids.forEach((id) => {
	const camelName = id
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join('');
	indexExports += `export * from './${id}';\n`;
	indexArray += `\t${camelName},\n`;
});

indexArray += `];\n`;

fs.writeFileSync('src/lib/data/themes/index.ts', indexExports + '\n' + indexArray);

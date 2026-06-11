const fs = require('fs');
const path = require('path');

const code = fs.readFileSync('src/lib/data/themes.ts', 'utf8');

// match each theme block. They start with "\t{\n\t\tid: '" and end with "\t},"
const themeRegex = /\t\{\n\t\tid: '([^']+)',[\s\S]*?\n\t\},?/g;

let match;
const themes = [];
while ((match = themeRegex.exec(code)) !== null) {
	const id = match[1];
	let content = match[0];
	if (content.endsWith(',')) {
		content = content.slice(0, -1); // remove trailing comma
	}
	themes.push({ id, content: content.trim() });
}

fs.mkdirSync('src/lib/data/themes', { recursive: true });

let indexImports = `import type { Theme } from '../themes';\n\n`;
let indexArray = `export const THEMES: Theme[] = [\n`;

themes.forEach((t) => {
	const camelName = t.id
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join('');
	const content = `import type { Theme } from '../../themes';\n\nexport const ${camelName}: Theme = ${t.content};\n`;
	fs.writeFileSync(`src/lib/data/themes/${t.id}.ts`, content);

	indexImports += `import { ${camelName} } from './${t.id}';\n`;
	indexArray += `\t${camelName},\n`;
});

indexArray += `];\n`;

fs.writeFileSync('src/lib/data/themes/index.ts', indexImports + '\n' + indexArray);
console.log('Created ' + themes.length + ' themes');

const fs = require('fs');

const files = fs
	.readdirSync('src/lib/data/themes')
	.filter((f) => f.endsWith('.ts') && f !== 'index.ts');

let indexImports = `import type { Theme } from '../themes';\n\n`;
let indexExports = `\n`;
let indexArray = `export const THEMES: Theme[] = [\n`;

files.forEach((file) => {
	const id = file.replace('.ts', '');
	const camelName = id
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
		.join('');
	indexImports += `import { ${camelName} } from './${id}';\n`;
	indexExports += `export { ${camelName} };\n`;
	indexArray += `\t${camelName},\n`;
});

indexArray += `];\n`;

fs.writeFileSync(
	'src/lib/data/themes/index.ts',
	indexImports + indexExports + '\n' + indexArray,
);

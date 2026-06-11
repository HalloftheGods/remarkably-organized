const fs = require('fs');

const files = fs
	.readdirSync('src/lib/data/themes')
	.filter((f) => f.endsWith('.ts') && f !== 'index.ts');

files.forEach((file) => {
	const path = `src/lib/data/themes/${file}`;
	let content = fs.readFileSync(path, 'utf8');
	content = content.replace(
		/import type \{ Theme \} from '\.\.\/\.\.\/themes';/g,
		"import type { Theme } from '../themes';",
	);
	fs.writeFileSync(path, content);
});

console.log('Fixed imports in', files.length, 'files');

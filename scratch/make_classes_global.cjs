const fs = require('fs');
const path = require('path');
const dir = 'src/lib/components/organisms/wizard';

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svelte'));

for (const file of files) {
	const p = path.join(dir, file);
	let content = fs.readFileSync(p, 'utf-8');

	const styleRegex = /<style lang="scss">([\s\S]*?)<\/style>/;
	const match = content.match(styleRegex);
	if (match) {
		let styleContent = match[1];
		// Replace .class with :global(.class) but avoid already :global(.class)
		// Only match if dot is preceded by space, brace, comma, or > or &
		styleContent = styleContent.replace(
			/([ \t{},>&\n])\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g,
			'$1:global(.$2)',
		);
		content = content.replace(styleRegex, `<style lang="scss">${styleContent}</style>`);
		fs.writeFileSync(p, content, 'utf-8');
		console.log(`Updated ${file}`);
	}
}

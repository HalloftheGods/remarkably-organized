const fs = require('fs');
const path = require('path');
const dir = 'src/lib/components/organisms/wizard';

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svelte'));

for (const file of files) {
	const p = path.join(dir, file);
	let content = fs.readFileSync(p, 'utf-8');

	// Only apply if it has <style lang="scss"> and doesn't already have :global { as the next thing
	if (
		content.includes('<style lang="scss">') &&
		!content.includes('<style lang="scss">\n\t:global {')
	) {
		content = content.replace(/<style lang="scss">/, '<style lang="scss">\n\t:global {');
		content = content.replace(/<\/style>/, '\t}\n</style>');
		fs.writeFileSync(p, content, 'utf-8');
		console.log(`Updated ${file}`);
	}
}
console.log('Done');

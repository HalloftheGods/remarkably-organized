const fs = require('fs');
const path = require('path');

const dir = 'src/lib/components/templates/';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svelte'));

for (const file of files) {
	const filePath = path.join(dir, file);
	let content = fs.readFileSync(filePath, 'utf8');

	const className = file
		.replace('.template.svelte', '')
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.toLowerCase();

	// We want to replace these properties ONLY when they immediately follow the top-level class declaration.
	// e.g. .sprint-planner { \n display: flex; ...

	// We can construct a precise regex for this.
	// \.${className}\s*\{\s*display:\s*flex;\s*flex-direction:\s*column;\s*width:\s*100%;\s*height:\s*100%;\s*box-sizing:\s*border-box;

	// Wait, the order might vary slightly or box-sizing might be missing.
	// Let's just find the start of the class:
	const classStartRegex = new RegExp(
		`(\\.${className}(\\.page)?\\s*\\{\\s*\\n)([\\s\\S]{0,150})`,
	);

	const match = content.match(classStartRegex);
	if (match) {
		let block = match[3];
		let originalBlock = block;
		// remove the 5 redundant properties
		block = block.replace(/^\s*display:\s*flex;\s*\n/m, '');
		block = block.replace(/^\s*flex-direction:\s*column;\s*\n/m, '');
		block = block.replace(/^\s*width:\s*100%;\s*\n/m, '');
		block = block.replace(/^\s*height:\s*100%;\s*\n/m, '');
		block = block.replace(/^\s*box-sizing:\s*border-box;\s*\n/m, '');

		if (block !== originalBlock) {
			content = content.replace(match[1] + match[3], match[1] + block);
			fs.writeFileSync(filePath, content, 'utf8');
			console.log(`Fixed ${file}`);
		}
	}
}

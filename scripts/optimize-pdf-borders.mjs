import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
	fs.readdirSync(dir).forEach((f) => {
		let dirPath = path.join(dir, f);
		let isDirectory = fs.statSync(dirPath).isDirectory();
		isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
	});
}

walkDir('./src/lib', function (filePath) {
	if (!filePath.endsWith('.svelte') && !filePath.endsWith('.css')) return;

	let content = fs.readFileSync(filePath, 'utf8');
	let original = content;

	// Replace display="dotted" variations with "grid"
	content = content.replace(/display="dotted"/g, 'display="grid"');
	content = content.replace(/display="dotted-small"/g, 'display="grid-small"');
	content = content.replace(/display="dotted-large"/g, 'display="grid-large"');

	// Replace dashed borders in tailwind classes
	content = content.replace(/border-dashed/g, 'border-solid');
	// Replace dotted borders in tailwind classes
	content = content.replace(/border-dotted/g, 'border-solid');
	content = content.replace(/border-t-dotted/g, 'border-t-solid');
	content = content.replace(/border-b-dotted/g, 'border-b-solid');
	content = content.replace(/border-l-dotted/g, 'border-l-solid');
	content = content.replace(/border-r-dotted/g, 'border-r-solid');

	// Replace dashed/dotted in CSS
	// Match `1px dashed`, `2px dashed` etc.
	content = content.replace(/(\d+px)\s+dashed/g, '$1 solid');
	content = content.replace(/(\d+px)\s+dotted/g, '$1 solid');

	// Some are `border-bottom: 1px dashed` or `border: 2px dashed` or `border-top: 1px dashed` etc. (handled above)
	// There's `border-top-style: dashed` maybe?
	content = content.replace(/style:\s*dashed/g, 'style: solid');
	content = content.replace(/style:\s*dotted/g, 'style: solid');

	if (content !== original) {
		fs.writeFileSync(filePath, content, 'utf8');
		console.log(`Updated borders in ${filePath}`);
	}
});

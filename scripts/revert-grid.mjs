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
	if (!filePath.endsWith('.svelte')) return;

	let content = fs.readFileSync(filePath, 'utf8');
	let original = content;

	content = content.replace(/<Grid display="grid"/g, '<Grid display="dotted"');
	content = content.replace(
		/<Grid display="grid-small"/g,
		'<Grid display="dotted-small"',
	);
	content = content.replace(
		/<Grid display="grid-large"/g,
		'<Grid display="dotted-large"',
	);

	if (content !== original) {
		fs.writeFileSync(filePath, content, 'utf8');
		console.log(`Reverted Grid in ${filePath}`);
	}
});

const fs = require('fs');
const path = require('path');

const dir = 'src/lib/components/organisms/wizard';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svelte'));

for (const file of files) {
	const filePath = path.join(dir, file);
	let content = fs.readFileSync(filePath, 'utf-8');

	// Add import
	if (!content.includes("from '$atoms'")) {
		content = content.replace(
			/<script lang="ts">/g,
			`<script lang="ts">\n\timport { Box, Text, Input, Button } from '$atoms';`,
		);
	}

	// First, replace in:fade={{ duration: 150 }} with transition="fade" inDuration={150}
	content = content.replace(
		/in:fade=\{\{\s*duration:\s*150\s*\}\}/g,
		'transition="fade" inDuration={150}',
	);
	content = content.replace(
		/in:fade=\{\{\s*duration:\s*200\s*\}\}/g,
		'transition="fade" inDuration={200}',
	);
	content = content.replace(/in:fade/g, 'transition="fade"');

	// Replace <div> -> <Box>
	content = content.replace(/<div\b([^>]*)>/g, '<Box$1>');
	content = content.replace(/<\/div>/g, '</Box>');

	// Replace <p> -> <Text tag="p">
	content = content.replace(/<p\b([^>]*)>/g, '<Text tag="p"$1>');
	content = content.replace(/<\/p>/g, '</Text>');

	// Replace <h3> -> <Text tag="h3">
	content = content.replace(/<h3\b([^>]*)>/g, '<Text tag="h3"$1>');
	content = content.replace(/<\/h3>/g, '</Text>');

	// Replace <h4> -> <Text tag="h4">
	content = content.replace(/<h4\b([^>]*)>/g, '<Text tag="h4"$1>');
	content = content.replace(/<\/h4>/g, '</Text>');

	// Replace <label> -> <Text tag="label">
	content = content.replace(/<label\b([^>]*)>/g, '<Text tag="label"$1>');
	content = content.replace(/<\/label>/g, '</Text>');

	// Replace <input> -> <Input>
	content = content.replace(/<input\b([^>]*)>/g, '<Input$1>');

	// Replace <button> -> <Button>
	content = content.replace(/<button\b([^>]*)>/g, '<Button$1>');
	content = content.replace(/<\/button>/g, '</Button>');

	// Fix implicit any
	content = content.replace(/\(e\) =>/g, '(e: any) =>');
	content = content.replace(/\(e, /g, '(e: any, ');

	fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Conversion complete v3');

const fs = require('fs');
const path = require('path');

const dir = 'src/lib/components/organisms/wizard';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svelte'));

for (const file of files) {
	if (file === 'WizardSpreads.organism.svelte') continue; // already mostly done
	const filePath = path.join(dir, file);
	let content = fs.readFileSync(filePath, 'utf-8');

	// skip if already imported atoms
	if (content.includes("from '$atoms'")) continue;

	// Add import
	content = content.replace(
		/<script lang="ts">/g,
		`<script lang="ts">\n\timport { Box, Text, Input, Button } from '$atoms';`,
	);

	// Replace <div> -> <Box>
	content = content.replace(/<div([^>]*)>/g, '<Box$1>');
	content = content.replace(/<\/div>/g, '</Box>');

	// Replace <p> -> <Text tag="p">
	content = content.replace(/<p([^>]*)>/g, '<Text tag="p"$1>');
	content = content.replace(/<\/p>/g, '</Text>');

	// Replace <h3> -> <Text tag="h3">
	content = content.replace(/<h3([^>]*)>/g, '<Text tag="h3"$1>');
	content = content.replace(/<\/h3>/g, '</Text>');

	// Replace <h4> -> <Text tag="h4">
	content = content.replace(/<h4([^>]*)>/g, '<Text tag="h4"$1>');
	content = content.replace(/<\/h4>/g, '</Text>');

	// Replace <label> -> <Text tag="label">
	content = content.replace(/<label([^>]*)>/g, '<Text tag="label"$1>');
	content = content.replace(/<\/label>/g, '</Text>');

	// Replace <input> -> <Input>
	content = content.replace(/<input([^>]*)>/g, '<Input$1>');

	// Remove self-closing / on some tags if they got mangled? <input ... /> becomes <Input ... />
	// It's mostly fine.

	// <button> -> <Button>
	content = content.replace(/<button([^>]*)>/g, '<Button$1>');
	content = content.replace(/<\/button>/g, '</Button>');

	fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Conversion complete');

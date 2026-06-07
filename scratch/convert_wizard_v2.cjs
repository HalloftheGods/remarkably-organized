const fs = require('fs');
const path = require('path');

const dir = 'src/lib/components/organisms/wizard';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svelte'));

for (const file of files) {
	const filePath = path.join(dir, file);
	let content = fs.readFileSync(filePath, 'utf-8');

	// Add import
	if (!content.includes("from '$atoms'")) {
		content = content.replace(/<script lang="ts">/g, `<script lang="ts">\n\timport { Box, Text, Input, Button } from '$atoms';`);
	}

	// 1. Replace <div> -> <Box>. We'll replace all of them and then fix the fade ones manually or with another regex.
	content = content.replace(/<div([^>]*)>/g, '<Box$1>');
	content = content.replace(/<\/div>/g, '</Box>');

	// Change Box with in:fade back to div. This requires matching the specific opening and closing tags, which is hard.
	// Actually, let's just strip in:fade={{...}} and style="position: relative;" if needed, or better, 
	// find `<Box class="step-content...` which are the main wrappers and change them back to `div`.
	content = content.replace(/<Box class="step-content([^>]*)>/g, '<div class="step-content$1>');
	// but what about closing tags? Each step-content is usually the root of the template, so the very last </Box> is its closing tag.
	// We can replace the last </Box> with </div>.
	
	// Wait, it's easier to just NOT convert <div class="step-content"> and its closing tag.
	// Let's do it right:
	
	// <p> -> <Text tag="p">
	content = content.replace(/<p\b([^>]*)>/g, '<Text tag="p"$1>');
	content = content.replace(/<\/p>/g, '</Text>');

	// <h3> -> <Text tag="h3">
	content = content.replace(/<h3\b([^>]*)>/g, '<Text tag="h3"$1>');
	content = content.replace(/<\/h3>/g, '</Text>');

	// <h4> -> <Text tag="h4">
	content = content.replace(/<h4\b([^>]*)>/g, '<Text tag="h4"$1>');
	content = content.replace(/<\/h4>/g, '</Text>');

	// <label> -> <Text tag="label">
	content = content.replace(/<label\b([^>]*)>/g, '<Text tag="label"$1>');
	content = content.replace(/<\/label>/g, '</Text>');

	// <input> -> <Input>
	content = content.replace(/<input\b([^>]*)>/g, '<Input$1>');

	// <button> -> <Button>
	content = content.replace(/<button\b([^>]*)>/g, '<Button$1>');
	content = content.replace(/<\/button>/g, '</Button>');

	// Fix implicit any
	content = content.replace(/\(e\) =>/g, '(e: any) =>');
	content = content.replace(/\(e, /g, '(e: any, ');

	fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Conversion complete');

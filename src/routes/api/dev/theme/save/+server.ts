import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

function toPascalCase(str: string) {
	return str
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

export async function POST({ request }) {
	if (import.meta.env.MODE !== 'development') {
		return json({ error: 'Only available in dev mode' }, { status: 403 });
	}

	try {
		const data = await request.json();
		const { id, theme } = data; // theme is the full Theme object
		
		theme.id = id;
		const themeNamePascal = toPascalCase(id);

		// Format object properly without quoting keys when possible
		const jsonString = JSON.stringify(theme, null, '\t');
		const objectString = jsonString.replace(/"([^"]+)":/g, '$1:');

		const themeTsContent = `import type { Theme } from '../themes';\n\nexport const ${themeNamePascal}: Theme = ${objectString};\n`;

		const filePath = path.join(process.cwd(), 'src/lib/data/themes', `${id}.ts`);
		await fs.writeFile(filePath, themeTsContent, 'utf-8');

		return json({ success: true, file: filePath });
	} catch (err) {
		console.error(err);
		return json({ error: String(err) }, { status: 500 });
	}
}

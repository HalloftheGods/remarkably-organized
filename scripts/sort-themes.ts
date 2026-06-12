import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getLuminance(hex: string) {
	// Remove #
	hex = hex.replace(/^#/, '');
	if (hex.length === 3) {
		hex = hex.split('').map((c) => c + c).join('');
	}
	const r = parseInt(hex.substring(0, 2), 16) / 255;
	const g = parseInt(hex.substring(2, 4), 16) / 255;
	const b = parseInt(hex.substring(4, 6), 16) / 255;

	const [sR, sG, sB] = [r, g, b].map((c) => {
		if (c <= 0.03928) {
			return c / 12.92;
		}
		return Math.pow((c + 0.055) / 1.055, 2.4);
	});

	return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
}

function run() {
	const indexTsPath = path.resolve(__dirname, '../src/lib/data/themes/index.ts');
	const indexTsContent = fs.readFileSync(indexTsPath, 'utf8');

	// Extract the THEMES array
	const themesArrayMatch = indexTsContent.match(/export const THEMES: Theme\[\] = \[([\s\S]*?)\];/);
	if (!themesArrayMatch) {
		console.error('Could not find THEMES array in index.ts');
		return;
	}

	const themesArrayContent = themesArrayMatch[1];
	const themeNames = themesArrayContent
		.split('\n')
		.map((line) => line.trim().replace(/,$/, ''))
		.filter((line) => line.length > 0);

	const themesWithLum = themeNames.map((themeName) => {
		// Find the import line for this theme
		const importRegex = new RegExp(`import\\s+\\{[\\s]*${themeName}[\\s]*\\}\\s+from\\s+['"](.\\/[^'"]+)['"]`);
		const importMatch = indexTsContent.match(importRegex);
		if (!importMatch) {
			console.error(`Could not find import for ${themeName}`);
			return { themeName, lum: 0 };
		}

		const importPath = importMatch[1];
		// Assume file is .ts
		const themeFilePath = path.resolve(__dirname, '../src/lib/data/themes', `${importPath}.ts`);
		const themeFileContent = fs.readFileSync(themeFilePath, 'utf8');

		// Extract colorBg
		const colorBgMatch = themeFileContent.match(/colorBg:\s*['"]([^'"]+)['"]/);
		if (!colorBgMatch) {
			console.error(`Could not find colorBg in ${themeFilePath}`);
			return { themeName, lum: 0 };
		}

		const colorBg = colorBgMatch[1];
		const lum = getLuminance(colorBg);
		return { themeName, lum, bg: colorBg };
	});

	// Sort descending (light to dark)
	themesWithLum.sort((a, b) => b.lum - a.lum);

	// Generate new array content
	const newArrayContent = '\n' + themesWithLum.map((t) => `\t${t.themeName},`).join('\n') + '\n';

	const newIndexTsContent = indexTsContent.replace(
		/export const THEMES: Theme\[\] = \[([\s\S]*?)\];/,
		`export const THEMES: Theme[] = [${newArrayContent}];`
	);

	fs.writeFileSync(indexTsPath, newIndexTsContent, 'utf8');

	console.log('Successfully organized themes by luminosity!');
	themesWithLum.forEach((t) => {
		console.log(`- ${t.themeName} (bg: ${t.bg}, lum: ${t.lum.toFixed(4)})`);
	});
}

run();

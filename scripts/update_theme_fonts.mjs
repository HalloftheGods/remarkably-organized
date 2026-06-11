import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themesDir = path.join(__dirname, '../src/lib/data/themes');

const fontGroups = {
	'dev-classic': {
		body: 'Fira Code',
		display: 'Roboto Slab',
		sideNav: 'Inconsolata',
		topNav: 'Inconsolata',
		cover: 'Fira Code'
	},
	'dev-modern': {
		body: 'Inter',
		display: 'Space Mono',
		sideNav: 'Inter',
		topNav: 'Inter',
		cover: 'DM Serif Display'
	},
	'cyberpunk': {
		body: 'VT323',
		display: 'Press Start 2P',
		sideNav: 'Inconsolata',
		topNav: 'Inconsolata',
		cover: 'Press Start 2P'
	},
	'retro-wave': {
		body: 'Orbitron',
		display: 'Righteous',
		sideNav: 'Orbitron',
		topNav: 'Orbitron',
		cover: 'Bungee'
	},
	'elegant-serif': {
		body: 'Lora',
		display: 'Playfair Display',
		sideNav: 'Karla',
		topNav: 'Karla',
		cover: 'Cormorant Garamond'
	},
	'playful': {
		body: 'Quicksand',
		display: 'Fredoka One',
		sideNav: 'Nunito',
		topNav: 'Nunito',
		cover: 'Pacifico'
	},
	'minimalist': {
		body: 'Work Sans',
		display: 'Montserrat',
		sideNav: 'Work Sans',
		topNav: 'Work Sans',
		cover: 'Montserrat'
	},
	'industrial': {
		body: 'Archivo',
		display: 'Anton',
		sideNav: 'Archivo',
		topNav: 'Archivo',
		cover: 'Bangers'
	},
	'handwritten': {
		body: 'Patrick Hand',
		display: 'Cabin Sketch',
		sideNav: 'Nunito',
		topNav: 'Nunito',
		cover: 'Shadows Into Light Two'
	},
	'fantasy': {
		body: 'EB Garamond',
		display: 'Cinzel',
		sideNav: 'Cinzel',
		topNav: 'Cinzel',
		cover: 'Cinzel'
	}
};

const categoryMatchers = [
	{ group: 'cyberpunk', keywords: ['cyberpunk', 'neon', 'pixel', 'midnight', 'hacker', 'punk'] },
	{ group: 'retro-wave', keywords: ['synthwave', 'vaporwave', 'retro', 'cassette', 'webwork', '84'] },
	{ group: 'elegant-serif', keywords: ['library', 'e-ink', 'coffee', 'rose', 'stardust', 'classic'] },
	{ group: 'playful', keywords: ['rainbow', 'pastel', 'garden', 'ocean-atelier', 'festival', 'sunset'] },
	{ group: 'handwritten', keywords: ['chalkboard', 'meadow'] },
	{ group: 'industrial', keywords: ['studio-noir', 'industrial', 'noir'] },
	{ group: 'fantasy', keywords: ['gods', 'fantasy', 'magic'] },
	{ group: 'minimalist', keywords: ['minimalist', 'paper', 'nordic', 'clean', 'oceanic'] },
	{ group: 'dev-modern', keywords: ['ayu', 'catppuccin', 'night-owl', 'nord', 'solarized', 'tokyo'] },
	{ group: 'dev-classic', keywords: ['atom', 'github', 'gruvbox', 'dracula', 'monokai', 'cobalt2', 'dark', 'light'] }, 
];

const highlyReadableFonts = [
	'Inter', 'Roboto', 'Open Sans', 'Nunito', 'Karla', 
	'Work Sans', 'Noto Sans', 'Quicksand', 'Fira Code', 
	'Inconsolata', 'IBM Plex Sans', 'Rubik', 'PT Sans', 
	'Montserrat', 'Lato', 'Source Code Pro', 'Comfortaa', 
	'Archivo', 'Space Mono', 'Roboto Mono', 'Crimson Text',
	'EB Garamond', 'Cabin', 'VT323', 'Press Start 2P', 'Orbitron'
];
const fallbackReadableFont = 'Inter';

// Helper to determine theme group
const getThemeGroup = (themeId) => {
	for (const matcher of categoryMatchers) {
		if (matcher.keywords.some(kw => themeId.includes(kw))) {
			return matcher.group;
		}
	}
	// Fallback group
	return 'minimalist';
};

const themes = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts').map(f => f.replace('.ts', ''));

for (const theme of themes) {
    const file = path.join(themesDir, theme + '.ts');
    let content = fs.readFileSync(file, 'utf8');
    
    const groupName = getThemeGroup(theme);
    const p = fontGroups[groupName];

	// --- ENFORCE HIGHLY READABLE NAV FONTS ---
	let finalTopNavFont = p.topNav;
	if (!highlyReadableFonts.includes(finalTopNavFont)) {
		if (highlyReadableFonts.includes(p.body)) {
			finalTopNavFont = p.body;
		} else {
			finalTopNavFont = fallbackReadableFont;
		}
	}

	let finalSideNavFont = p.sideNav;
	if (!highlyReadableFonts.includes(finalSideNavFont)) {
		if (highlyReadableFonts.includes(p.body)) {
			finalSideNavFont = p.body;
		} else {
			finalSideNavFont = fallbackReadableFont;
		}
	}
	// -----------------------------------------

    // Helper to replace font properties
    const updateDesignFont = (content, prop, value) => {
        const regex = new RegExp(`(${prop}:\\s*)['"\`][^'"\`]+['"\`]`);
        if (regex.test(content)) {
            return content.replace(regex, `$1'${value}'`);
        } else {
            return content.replace(/(colorText:\s*['"\`][^'"\`]+['"\`],?)/, `$1\n\t\t\t${prop}: '${value}',`);
        }
    };
	
	const updateOtherFont = (content, block, value) => {
		const regex = new RegExp(`(${block}:\\s*\\{[^}]*font:\\s*)['"\`][^'"\`]+['"\`]`);
		if (regex.test(content)) {
			return content.replace(regex, `$1'${value}'`);
		}
		return content;
	};

    content = updateDesignFont(content, 'font', p.body);
    content = updateDesignFont(content, 'fontDisplay', p.display);
    content = updateOtherFont(content, 'sideNav', finalSideNavFont);
    content = updateOtherFont(content, 'topNav', finalTopNavFont);
    content = updateOtherFont(content, 'coverPage', p.cover);

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated fonts for ${theme} (Group: ${groupName})`);
}
console.log('Theme fonts optimized successfully!');

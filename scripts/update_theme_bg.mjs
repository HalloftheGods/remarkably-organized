import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themesDir = path.join(__dirname, '../src/lib/data/themes');

// A mapping of theme IDs to their most appropriate background style
const themeBgMapping = {
    'atom-one-dark': 'circuit-board',
    'ayu-dark': 'mesh',
    'catppuccin-mocha': 'watercolor',
    'chalkboard-atelier': 'halftone',
    'classic-e-ink': 'vintage-wallpaper',
    'cobalt2': 'waves',
    'coffee-shop': 'terrazzo',
    'cyberpunk-city': 'neon-tubes',
    'dracula': 'fractals',
    'festival-folio': 'emoji',
    'garden-chapter': 'watercolor',
    'github-dark': 'circuit-board',
    'gruvbox-dark': 'terrazzo',
    'hall-of-the-gods': 'sacred-geometry',
    'library-loft': 'vintage-wallpaper',
    'material-theme-oceanic': 'waves',
    'meadow-memo': 'origami',
    'midnight-nerd': 'cyber-grid',
    'minimalist-muji': 'none',
    'monokai': 'neon-tubes',
    'neon-hacker': 'cyber-grid',
    'night-owl': 'starlight',
    'nord': 'waves',
    'nordic-forest': 'watercolor',
    'ocean-atelier': 'liquid-metal',
    'paper-pro-accents': 'origami',
    'pastel-dreams': 'holographic',
    'pixel-punk': 'halftone',
    'rainbow-sherbert': 'holographic',
    'rose-pine': 'starlight',
    'solarized-dark': 'bauhaus',
    'solarized-light': 'bauhaus',
    'stardust-notes': 'starlight',
    'studio-noir': 'none',
    'sunset-studio': 'glassmorphism',
    'synthwave-84': 'cyber-grid',
    'tokyo-night': 'neon-tubes',
    'vaporwave-aesthetics': 'holographic',
    'vintage-cassette': 'vintage-wallpaper',
    'worldwide-webwork': 'mesh'
};

const defaultBg = 'mesh';

const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
    const filePath = path.join(themesDir, file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');

    const idMatch = content.match(/id:\s*['"]([^'"]+)['"]/);
    if (!idMatch) continue;
    const themeId = idMatch[1];
    
    const newBg = themeBgMapping[themeId] || defaultBg;

    // Check if backgroundStyle already exists in coverPage
    const coverPageRegex = /(coverPage:\s*\{[^}]*)backgroundStyle:\s*['"]([^'"]+)['"]/s;
    
    if (coverPageRegex.test(content)) {
        // Replace existing
        content = content.replace(coverPageRegex, `$1backgroundStyle: '${newBg}'`);
    } else {
        // Insert it into coverPage: { ... }
        content = content.replace(/(coverPage:\s*\{)/, `$1\n\t\t\tbackgroundStyle: '${newBg}',`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
}
console.log('All themes updated with their styled backgrounds!');

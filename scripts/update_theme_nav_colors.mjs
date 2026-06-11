import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themesDir = path.join(__dirname, '../src/lib/data/themes');

// Helper to convert hex to rgb
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255];
}

// Helper to convert rgb to hex
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Blend two colors. amount is how much of color2 to use (0-1)
function blendColors(color1, color2, amount) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const r = rgb1[0] * (1 - amount) + rgb2[0] * amount;
    const g = rgb1[1] * (1 - amount) + rgb2[1] * amount;
    const b = rgb1[2] * (1 - amount) + rgb2[2] * amount;
    return rgbToHex(r, g, b);
}

const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
    const filePath = path.join(themesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract colorBg and colorText
    const bgMatch = content.match(/colorBg:\s*['"]([^'"]+)['"]/);
    const textMatch = content.match(/colorText:\s*['"]([^'"]+)['"]/);

    if (bgMatch && textMatch) {
        const bg = bgMatch[1];
        const text = textMatch[1];

        // Create a muted version of the text color by blending it 40% into the background
        const mutedText = blendColors(text, bg, 0.45);

        const updateDesignProp = (content, prop, value) => {
            const regex = new RegExp(`(${prop}:\\s*)['"\`][^'"\`]+['"\`]`);
            if (regex.test(content)) {
                return content.replace(regex, `$1'${value}'`);
            } else {
                return content.replace(/(colorText:\s*['"\`][^'"\`]+['"\`],?)/, `$1\n\t\t\t${prop}: '${value}',`);
            }
        };

        content = updateDesignProp(content, 'colorSideNavText', mutedText);
        content = updateDesignProp(content, 'colorTopNavText', mutedText);

        fs.writeFileSync(filePath, content, 'utf8');
    }
}
console.log('Top and Side Nav colors updated to perfectly blend with each theme!');

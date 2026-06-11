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
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
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

function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getSaturation(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let l = (max + min) / 2;
    if (max === min) {
        return 0; // achromatic
    } else {
        const d = max - min;
        return l > 0.5 ? d / (2 - max - min) : d / (max + min);
    }
}

function ensureContrast(color, bgHex, baseTextColor, targetContrast) {
    let currentHex = color;
    let iterations = 0;
    while (iterations < 20) {
        const rgb = hexToRgb(currentHex);
        const lum = getLuminance(...rgb);
        const bgLum = getLuminance(...hexToRgb(bgHex));
        const contrast = (Math.max(lum, bgLum) + 0.05) / (Math.min(lum, bgLum) + 0.05);
        
        if (contrast >= targetContrast) {
            return currentHex;
        }
        
        // Blend 10% more of the baseTextColor (white or black)
        currentHex = blendColors(currentHex, baseTextColor, 0.1);
        iterations++;
    }
    return currentHex;
}

const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
    const filePath = path.join(themesDir, file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');

    const bgMatch = content.match(/colorBg:\s*['"]([^'"]+)['"]/);
    if (!bgMatch) continue;
    const bg = bgMatch[1];
    
    const navBgMatch = content.match(/colorNavBg:\s*['"]([^'"]+)['"]/);
    const navBg = navBgMatch ? navBgMatch[1] : bg;

    // Determine if background is dark or light
    const isDark = getLuminance(...hexToRgb(bg)) < 0.5;

    // Mathematics of successful text color
    const baseTextColor = isDark ? '#ffffff' : '#000000';
    
    // Extract colorLines to use as the spectrum anchor for the text
    const linesMatch = content.match(/colorLines:\s*['"]([^'"]+)['"]/);
    const colorLines = linesMatch ? linesMatch[1] : blendColors(bg, baseTextColor, 0.5);

    const dotsMatch = content.match(/colorDots:\s*['"]([^'"]+)['"]/);
    const colorDots = dotsMatch ? dotsMatch[1] : blendColors(bg, baseTextColor, 0.3);

    // Flat color that sits exactly between dots and lines
    const flatMidpoint = blendColors(colorLines, colorDots, 0.5);

    // Calculate previous high-contrast targets
    const highContrastBody = ensureContrast(colorLines, bg, baseTextColor, 4.5);
    const highContrastTitle = ensureContrast(colorLines, bg, baseTextColor, 3.0);

    // Split the difference between ultra-flat and high-contrast
    const bodyText = blendColors(flatMidpoint, highContrastBody, 0.5);
    const titleText = blendColors(flatMidpoint, highContrastTitle, 0.5);

    // 3. Extract palette and find best accents for Nav
    let activeNavColor1 = bodyText;
    let activeNavColor2 = bodyText;
    
    const paletteMatch = content.match(/backgroundPalette:\s*\[(.*?)\]/s);
    if (paletteMatch) {
        const hexRegex = /['"](#[a-fA-F0-9]{3,6})['"]/g;
        const palette = [];
        let match;
        while ((match = hexRegex.exec(paletteMatch[1])) !== null) {
            palette.push(match[1]);
        }

        if (palette.length > 0) {
            // Score colors based on a combination of saturation and contrast against bg
            const scoredColors = palette.map(hex => {
                const rgb = hexToRgb(hex);
                const saturation = getSaturation(...rgb);
                const luminance = getLuminance(...rgb);
                const bgLuminance = getLuminance(...hexToRgb(navBg)); // contrast against navBg!
                
                const l1 = Math.max(luminance, bgLuminance);
                const l2 = Math.min(luminance, bgLuminance);
                const contrast = (l1 + 0.05) / (l2 + 0.05);

                const contrastPenalty = contrast < 2.5 ? -100 : 0;
                const score = (saturation * 10) + contrast + contrastPenalty;
                return { hex, score };
            }).sort((a, b) => b.score - a.score);

            const rawNavColor1 = scoredColors[0].hex;
            const highContrastNav1 = ensureContrast(rawNavColor1, navBg, baseTextColor, 3.5);
            // Blend heavily towards the raw color (75% raw, 25% contrast)
            activeNavColor1 = blendColors(rawNavColor1, highContrastNav1, 0.25);
            
            if (scoredColors.length > 1) {
                const rawNavColor2 = scoredColors[1].hex;
                const highContrastNav2 = ensureContrast(rawNavColor2, navBg, baseTextColor, 3.5);
                // Blend heavily towards the raw color (75% raw, 25% contrast)
                activeNavColor2 = blendColors(rawNavColor2, highContrastNav2, 0.25);
            } else {
                activeNavColor2 = activeNavColor1;
            }
        }
    }

    const updateDesignProp = (content, prop, value) => {
        const regex = new RegExp(`(${prop}:\\s*)['"\`][^'"\`]+['"\`]`);
        if (regex.test(content)) {
            return content.replace(regex, `$1'${value}'`);
        } else {
            return content.replace(/(colorText:\s*['"\`][^'"\`]+['"\`],?)/, `$1\n\t\t\t${prop}: '${value}',`);
        }
    };

    content = updateDesignProp(content, 'colorText', bodyText);
    content = updateDesignProp(content, 'colorTextDisplay', titleText); // Flat color for titles
    content = updateDesignProp(content, 'colorSideNavText', activeNavColor1); // Active color for nav
    content = updateDesignProp(content, 'colorTopNavText', activeNavColor1); // Active color for nav
    content = updateDesignProp(content, 'colorCoverText', titleText); // Flat color for cover titles too

    fs.writeFileSync(filePath, content, 'utf8');
}
console.log('All theme text colors mathematically optimized for aesthetic perfection using line spectrums!');


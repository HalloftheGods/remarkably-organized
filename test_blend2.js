function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255];
}
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}
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
        
        currentHex = blendColors(currentHex, baseTextColor, 0.1);
        iterations++;
    }
    return currentHex;
}

const bg = '#1a1818';
const baseTextColor = '#ffffff';
const colorLines = '#403522';

let bodyText = ensureContrast(colorLines, bg, baseTextColor, 5.5);
let titleText = ensureContrast(colorLines, bg, baseTextColor, 4.0);

console.log("Body:", bodyText);
console.log("Title:", titleText);


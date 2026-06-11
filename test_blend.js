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

const bg = '#1a1818';
const baseTextColor = '#ffffff';
const colorLines = '#403522';

function ensureContrast(color, bgHex, baseTextColor) {
    const rgb = hexToRgb(color);
    const lum = getLuminance(...rgb);
    const bgLum = getLuminance(...hexToRgb(bgHex));
    const contrast = (Math.max(lum, bgLum) + 0.05) / (Math.min(lum, bgLum) + 0.05);
    
    if (contrast < 4.5) { // AA body text contrast is 4.5
        // Blend with white or black (baseTextColor) to improve contrast
        return blendColors(color, baseTextColor, 0.4);
    }
    return color;
}

let bodyText = blendColors(baseTextColor, colorLines, 0.7);
let titleText = blendColors(baseTextColor, colorLines, 0.4);

console.log("Initial Body:", bodyText);
bodyText = ensureContrast(bodyText, bg, baseTextColor);
titleText = ensureContrast(titleText, bg, baseTextColor);

console.log("Final Body:", bodyText);
console.log("Final Title:", titleText);

const contrastValue = (c1, c2) => {
    const l1 = getLuminance(...hexToRgb(c1));
    const l2 = getLuminance(...hexToRgb(c2));
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

console.log("Body Contrast:", contrastValue(bodyText, bg));
console.log("Title Contrast:", contrastValue(titleText, bg));


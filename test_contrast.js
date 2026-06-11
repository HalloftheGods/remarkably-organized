function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255];
}
function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

const contrastValue = (c1, c2) => {
    const l1 = getLuminance(...hexToRgb(c1));
    const l2 = getLuminance(...hexToRgb(c2));
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

console.log("Contrast of #d4af37:", contrastValue('#d4af37', '#1a1818'));
console.log("Contrast of #e5c158:", contrastValue('#e5c158', '#1a1818'));


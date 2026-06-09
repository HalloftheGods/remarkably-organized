/**
 * Converts a hex color string to an RGB object.
 */
export function hexToRgb(hex: string) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
		: null;
}

/**
 * Converts RGB values to a hex color string.
 */
export function rgbToHex(r: number, g: number, b: number) {
	return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

/**
 * Calculates the relative luminance of a hex color.
 * Returns a value between 0 (black) and 1 (white).
 */
export function getLuminance(hex: string) {
	const rgb = hexToRgb(hex);
	if (!rgb) return 0;
	const a = [rgb.r, rgb.g, rgb.b].map((v) => {
		v /= 255;
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});
	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Lightens a hex color by a given percentage (0 to 1).
 */
export function lightenColor(hex: string, amount: number) {
	const rgb = hexToRgb(hex);
	if (!rgb) return hex;
	const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * amount));
	const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * amount));
	const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * amount));
	return rgbToHex(r, g, b);
}

/**
 * Ensures a color has a minimum luminance (lightness).
 * If it's darker than the threshold, it lightens it.
 */
export function ensureLightness(hex: string, minLuminance: number = 0.5) {
	const luminance = getLuminance(hex);
	if (luminance >= minLuminance) return hex;

	// Increase lightness until luminance reaches threshold
	// This is a simple approximation
	const rgb = hexToRgb(hex);
	if (!rgb) return hex;

	let currentHex = hex;
	let currentLuminance = luminance;
	let step = 0.1;

	while (currentLuminance < minLuminance && step < 1) {
		currentHex = lightenColor(hex, step);
		currentLuminance = getLuminance(currentHex);
		step += 0.1;
	}

	return currentHex;
}

import type { Theme } from '../themes';

export const SunsetStudio: Theme = {
	id: 'sunset-studio',
	name: 'Sunset Studio',
	description: 'Warm ceramics, soft peach, and a hand-lettered editorial vibe.',
	icon: '🌇',
	config: {
		design: {
			font: 'Ubuntu',
			fontDisplay: 'Righteous',
			colorBg: '#fff3ec',
			colorNavBg: '#ffe9dd',
			colorText: '#4a2f24',
			colorLines: '#ffc6a5',
			colorDots: '#ffd9c3',
		},
		coverPage: {
			font: 'Ubuntu',
			darkBackground: false,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 511,
			backgroundComplexity: 6,
			backgroundPalette: ['#f7c6a5', '#e39c78', '#6b4b41'],
		},
		topNav: { font: 'Ubuntu' },
		sideNav: { font: 'Ubuntu' },
	},
};

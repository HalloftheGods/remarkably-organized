import type { Theme } from '../themes';

export const SunsetStudio: Theme = {
	id: 'sunset-studio',
	name: 'Sunset Studio',
	description: 'Warm ceramics, soft peach, and a hand-lettered editorial vibe.',
	icon: '🌇',
	config: {
		design: {
			font: 'PT Serif',
			fontDisplay: 'Abril Fatface',
			colorBg: '#fff3ec',
			colorNavBg: '#f1c9ab',
			colorText: '#4a2f24',
			colorLines: '#d98f72',
			colorDots: '#b46951',
		},
		coverPage: {
			font: 'Abril Fatface',
			darkBackground: false,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 511,
			backgroundComplexity: 6,
			backgroundPalette: ['#f7c6a5', '#e39c78', '#6b4b41'],
		},
		topNav: { font: 'PT Serif' },
		sideNav: { font: 'PT Serif' },
	},
};

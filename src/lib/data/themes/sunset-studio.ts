import type { Theme } from '../themes';

export const SunsetStudio: Theme = {
	id: 'sunset-studio',
	name: 'Sunset Studio',
	description: 'Warm ceramics, soft peach, and a hand-lettered editorial vibe.',
	icon: '🌇',
	config: {
		design: {
			font: 'Karla',
			fontDisplay: 'Oswald',
			colorBg: '#2b1b1b',
			colorNavBg: '#1c1111',
			colorText: '#dfdddd',
			colorTextDisplay: '#f4f4f4',
			colorSideNavText: '#f7c6a5',
			colorTopNavText: '#f7c6a5',
			colorCoverText: '#f4f4f4',
			colorLines: '#5e3a3a',
			colorDots: '#422929',
		},
		coverPage: {
			font: 'Fjalla One',
			darkBackground: false,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 511,
			backgroundComplexity: 6,
			backgroundPalette: ['#f7c6a5', '#e39c78', '#6b4b41'],
		},
		topNav: { font: 'Oswald' },
		sideNav: { font: 'Karla' },
	},
};

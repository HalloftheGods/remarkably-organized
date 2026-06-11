import type { Theme } from '../themes';

export const SunsetStudio: Theme = {
	id: 'sunset-studio',
	name: 'Sunset Studio',
	description: 'Warm ceramics, soft peach, and a hand-lettered editorial vibe.',
	icon: '🌇',
	config: {
		design: {
			font: 'Quicksand',
			fontDisplay: 'Fredoka One',
			colorBg: '#2b1b1b',
			colorNavBg: '#1c1111',
			colorText: '#795f5f',
			colorTextDisplay: '#6d5151',
			colorSideNavText: '#f7c6a5',
			colorTopNavText: '#f7c6a5',
			colorCoverText: '#6d5151',
			colorLines: '#5e3a3a',
			colorDots: '#422929',
		},
		coverPage: {
			font: 'Pacifico',
			darkBackground: false,
			backgroundStyle: 'glassmorphism',
			backgroundSeed: 511,
			backgroundComplexity: 6,
			backgroundPalette: ['#f7c6a5', '#e39c78', '#6b4b41'],
		},
		topNav: { font: 'Nunito' },
		sideNav: { font: 'Nunito' },
	},
};

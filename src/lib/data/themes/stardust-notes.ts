import type { Theme } from '../themes';

export const StardustNotes: Theme = {
	id: 'stardust-notes',
	name: 'Stardust Notes',
	description: 'A celestial palette of deep violet, silver shimmer, and starry accents.',
	icon: '🌌',
	config: {
		design: {
			font: 'Lora',
			fontDisplay: 'Playfair Display',
			colorBg: '#0b0c10',
			colorNavBg: '#050608',
			colorText: '#4a5159',
			colorTextDisplay: '#3b424b',
			colorSideNavText: '#e8eaf9',
			colorTopNavText: '#e8eaf9',
			colorCoverText: '#3b424b',
			colorLines: '#1f2833',
			colorDots: '#151b22',
		},
		coverPage: {
			font: 'Cormorant Garamond',
			darkBackground: true,
			backgroundStyle: 'starlight',
			backgroundSeed: 931,
			backgroundComplexity: 9,
			backgroundPalette: ['#12162d', '#7a7fd6', '#e8eaf9'],
		},
		topNav: { font: 'Karla' },
		sideNav: { font: 'Karla' },
	},
};

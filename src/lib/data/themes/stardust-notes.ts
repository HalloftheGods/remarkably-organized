import type { Theme } from '../themes';

export const StardustNotes: Theme = {
	id: 'stardust-notes',
	name: 'Stardust Notes',
	description: 'A celestial palette of deep violet, silver shimmer, and starry accents.',
	icon: '🌌',
	config: {
		design: {
			font: 'Raleway',
			fontDisplay: 'Montserrat',
			colorBg: '#0b0c10',
			colorNavBg: '#050608',
			colorText: '#dadbdb',
			colorTextDisplay: '#f3f3f3',
			colorSideNavText: '#e8eaf9',
			colorTopNavText: '#e8eaf9',
			colorCoverText: '#f3f3f3',
			colorLines: '#1f2833',
			colorDots: '#151b22',
		},
		coverPage: {
			font: 'Poppins',
			darkBackground: true,
			backgroundStyle: 'fractals',
			backgroundSeed: 931,
			backgroundComplexity: 9,
			backgroundPalette: ['#12162d', '#7a7fd6', '#e8eaf9'],
		},
		topNav: { font: 'Montserrat' },
		sideNav: { font: 'Raleway' },
	},
};

import type { Theme } from '../themes';

export const StardustNotes: Theme = {
	id: 'stardust-notes',
	name: 'Stardust Notes',
	description: 'A celestial palette of deep violet, silver shimmer, and starry accents.',
	icon: '🌌',
	config: {
		design: {
			font: 'Acme',
			fontDisplay: 'Rancho',
			colorBg: '#12162d',
			colorNavBg: '#1f2348',
			colorText: '#e8eaf9',
			colorLines: '#7a7fd6',
			colorDots: '#a3a7ff',
		},
		coverPage: {
			font: 'Rancho',
			darkBackground: true,
			backgroundStyle: 'fractals',
			backgroundSeed: 931,
			backgroundComplexity: 9,
			backgroundPalette: ['#12162d', '#7a7fd6', '#e8eaf9'],
		},
		topNav: { font: 'Acme' },
		sideNav: { font: 'Acme' },
	},
};

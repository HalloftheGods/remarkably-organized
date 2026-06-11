import type { Theme } from '../themes';

export const StardustNotes: Theme = {
	id: 'stardust-notes',
	name: 'Stardust Notes',
	description: 'A celestial palette of deep violet, silver shimmer, and starry accents.',
	icon: '🌌',
	config: {
		design: {
			font: 'Space Mono',
			fontDisplay: 'Orbitron',
			colorBg: '#12162d',
			colorNavBg: '#161b38',
			colorText: '#e8eaf9',
			colorLines: '#262f60',
			colorDots: '#1e244a',
		},
		coverPage: {
			font: 'Space Mono',
			darkBackground: true,
			backgroundStyle: 'fractals',
			backgroundSeed: 931,
			backgroundComplexity: 9,
			backgroundPalette: ['#12162d', '#7a7fd6', '#e8eaf9'],
		},
		topNav: { font: 'Space Mono' },
		sideNav: { font: 'Space Mono' },
	},
};

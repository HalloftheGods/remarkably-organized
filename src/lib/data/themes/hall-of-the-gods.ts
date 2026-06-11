import type { Theme } from '../themes';

export const HallOfTheGods: Theme = {
	id: 'hall-of-the-gods',
	name: 'Hall of the Gods',
	description: 'Deep browns, golds, and blacks. Perfect for dark mode journaling.',
	icon: '⚜️',
	config: {
		design: {
			font: 'Crimson Text',
			fontDisplay: 'Cinzel',
			colorBg: '#1a1818',
			colorNavBg: '#262323',
			colorText: '#e0d8c8',
			colorLines: '#d4af37',
			colorDots: '#8a7224',
		},
		coverPage: {
			font: 'Cinzel',
			darkBackground: true,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 999,
			backgroundComplexity: 8,
			backgroundPalette: ['#1a1818', '#d4af37', '#8a7224'],
		},
		topNav: { font: 'Crimson Text' },
		sideNav: { font: 'Crimson Text' },
	},
};

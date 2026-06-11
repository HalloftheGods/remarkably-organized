import type { Theme } from '../themes';

export const HallOfTheGods: Theme = {
	id: 'hall-of-the-gods',
	name: 'Hall of the Gods',
	description: 'Deep browns, golds, and blacks. Perfect for dark mode journaling.',
	icon: '⚜️',
	config: {
		design: {
			font: 'EB Garamond',
			fontDisplay: 'Cinzel',
			colorBg: '#1a1818',
			colorNavBg: '#221f1f',
			colorText: '#e0d8c8',
			colorLines: '#3f3a3a',
			colorDots: '#2f2c2c',
		},
		coverPage: {
			font: 'EB Garamond',
			darkBackground: true,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 999,
			backgroundComplexity: 8,
			backgroundPalette: ['#1a1818', '#d4af37', '#8a7224'],
		},
		topNav: { font: 'EB Garamond' },
		sideNav: { font: 'EB Garamond' },
	},
};

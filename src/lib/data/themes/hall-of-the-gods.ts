import type { Theme } from '../themes';

export const HallOfTheGods: Theme = {
	id: 'hall-of-the-gods',
	name: 'Hall of the Gods',
	description: 'Deep browns, golds, and blacks. Perfect for dark mode journaling.',
	icon: '⚜️',
	config: {
		design: {
			font: 'Cinzel',
			fontDisplay: 'Cinzel',
			colorBg: '#1a1818',
			colorNavBg: '#0a0a0a',
			colorText: '#d4af37',
			colorTextDisplay: '#e5c158',
			colorSideNavText: '#d4af37',
			colorTopNavText: '#d4af37',
			colorCoverText: '#e5c158',
			colorLines: '#403522',
			colorDots: '#2d2518',
		},
		coverPage: {
			font: 'Cinzel',
			darkBackground: true,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 999,
			backgroundComplexity: 8,
			backgroundPalette: ['#1a1818', '#d4af37', '#8a7224'],
		},
		topNav: { font: 'Cinzel' },
		sideNav: { font: 'Cinzel' },
	},
};

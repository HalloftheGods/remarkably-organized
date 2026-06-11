import type { Theme } from '../themes';

export const NordicForest: Theme = {
	id: 'nordic-forest',
	name: 'Nordic Forest',
	description: 'Premium earthy tones with intricate flower of life patterns.',
	icon: '🌲',
	config: {
		design: {
			font: 'Merriweather',
			fontDisplay: 'Playfair Display',
			colorBg: '#f4f6f4',
			colorNavBg: '#e6ebe6',
			colorText: '#2d4a3e',
			colorLines: '#8ea89a',
			colorDots: '#b0c4b9',
		},
		coverPage: {
			font: 'Playfair Display',
			darkBackground: false,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 15,
			backgroundComplexity: 7,
			backgroundPalette: ['#2d4a3e', '#5a7d6c', '#8ea89a'],
		},
		topNav: { font: 'Merriweather' },
		sideNav: { font: 'Merriweather' },
	},
};

import type { Theme } from '../themes';

export const NordicForest: Theme = {
	id: 'nordic-forest',
	name: 'Nordic Forest',
	description: 'Premium earthy tones with intricate flower of life patterns.',
	icon: '🌲',
	config: {
		design: {
			font: 'Caveat',
			fontDisplay: 'Caveat',
			colorBg: '#f4f6f4',
			colorNavBg: '#ecefec',
			colorText: '#2d4a3e',
			colorLines: '#cdd6cd',
			colorDots: '#dee4de',
		},
		coverPage: {
			font: 'Kalam',
			darkBackground: false,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 15,
			backgroundComplexity: 7,
			backgroundPalette: ['#2d4a3e', '#5a7d6c', '#8ea89a'],
		},
		topNav: { font: 'Kalam' },
		sideNav: { font: 'Caveat' },
	},
};

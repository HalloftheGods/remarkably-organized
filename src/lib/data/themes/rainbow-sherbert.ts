import type { Theme } from '../themes';

export const RainbowSherbert: Theme = {
	id: 'rainbow-sherbert',
	name: 'Bubblegum',
	description: 'A bright, colorful and sweet pastel theme.',
	icon: '🍨',
	config: {
		design: {
			font: 'Kalam',
			fontDisplay: 'Rancho',
			colorBg: '#fff5f8',
			colorNavBg: '#ffe6ed',
			colorText: '#ff6b81',
			colorLines: '#ffaec6',
			colorDots: '#ffccdb',
		},
		coverPage: {
			font: 'Caveat Brush',
			darkBackground: false,
			backgroundStyle: 'glassmorphism',
			backgroundSeed: 777,
			backgroundComplexity: 6,
			backgroundPalette: ['#ff9a9e', '#fecfef', '#a1c4fd', '#96e6a1'],
		},
		topNav: { font: 'Caveat' },
		sideNav: { font: 'Patrick Hand' },
	},
};

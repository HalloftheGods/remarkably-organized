import type { Theme } from '../themes';

export const CoffeeShop: Theme = {
	id: 'coffee-shop',
	name: 'Coffee Shop',
	description: 'Mocha tones, paper textures, and a cozy café energy.',
	icon: '☕',
	config: {
		design: {
			font: 'Crimson Text',
			fontDisplay: 'Merriweather',
			colorBg: '#f8efdf',
			colorNavBg: '#f5e9d2',
			colorText: '#2f1f15',
			colorSideNavText: '#f8efdf',
			colorTopNavText: '#2f1f15',
			colorLines: '#ebd2a4',
			colorDots: '#f1debe',
		},
		coverPage: {
			font: 'Crimson Text',
			darkBackground: false,
			backgroundStyle: 'glassmorphism',
			backgroundSeed: 622,
			backgroundComplexity: 7,
			backgroundPalette: ['#6b4f35', '#d8c3a5', '#f8efdf'],
		},
		topNav: { font: 'Crimson Text' },
		sideNav: { font: 'Crimson Text' },
	},
};

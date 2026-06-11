import type { Theme } from '../themes';

export const CoffeeShop: Theme = {
	id: 'coffee-shop',
	name: 'Coffee Shop',
	description: 'Mocha tones, paper textures, and a cozy café energy.',
	icon: '☕',
	config: {
		design: {
			font: 'Indie Flower',
			fontDisplay: 'Parisienne',
			colorBg: '#f8efdf',
			colorNavBg: '#f5e9d2',
			colorText: '#2f1f15',
			colorSideNavText: '#f8efdf',
			colorTopNavText: '#2f1f15',
			colorLines: '#ebd2a4',
			colorDots: '#f1debe',
		},
		coverPage: {
			font: 'Great Vibes',
			darkBackground: false,
			backgroundStyle: 'glassmorphism',
			backgroundSeed: 622,
			backgroundComplexity: 7,
			backgroundPalette: ['#6b4f35', '#d8c3a5', '#f8efdf'],
		},
		topNav: { font: 'Indie Flower' },
		sideNav: { font: 'Patrick Hand' },
	},
};

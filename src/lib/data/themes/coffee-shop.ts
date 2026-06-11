import type { Theme } from '../themes';

export const CoffeeShop: Theme = {
	id: 'coffee-shop',
	name: 'Coffee Shop',
	description: 'Mocha tones, paper textures, and a cozy café energy.',
	icon: '☕',
	config: {
		design: {
			font: 'DM Serif Display',
			fontDisplay: 'Lobster',
			colorBg: '#f8efdf',
			colorNavBg: '#6b4f35',
			colorText: '#2f1f15',
			colorSideNavText: '#f8efdf',
			colorTopNavText: '#2f1f15',
			colorLines: '#a27b58',
			colorDots: '#d8c3a5',
		},
		coverPage: {
			font: 'Lobster',
			darkBackground: false,
			backgroundStyle: 'glassmorphism',
			backgroundSeed: 622,
			backgroundComplexity: 7,
			backgroundPalette: ['#6b4f35', '#d8c3a5', '#f8efdf'],
		},
		topNav: { font: 'DM Serif Display' },
		sideNav: { font: 'DM Serif Display' },
	},
};

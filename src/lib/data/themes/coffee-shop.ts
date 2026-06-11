import type { Theme } from '../themes';

export const CoffeeShop: Theme = {
	id: 'coffee-shop',
	name: 'Coffee Shop',
	description: 'Mocha tones, paper textures, and a cozy café energy.',
	icon: '☕',
	config: {
		design: {
			font: 'Merriweather',
			fontDisplay: 'Abril Fatface',
			colorBg: '#4a3b32',
			colorNavBg: '#362a23',
			colorText: '#e4e2e0',
			colorTextDisplay: '#f6f5f5',
			colorSideNavText: '#f8efdf',
			colorTopNavText: '#f8efdf',
			colorCoverText: '#f6f5f5',
			colorLines: '#7a6355',
			colorDots: '#614e42',
		},
		coverPage: {
			font: 'DM Serif Display',
			darkBackground: false,
			backgroundStyle: 'glassmorphism',
			backgroundSeed: 622,
			backgroundComplexity: 7,
			backgroundPalette: ['#6b4f35', '#d8c3a5', '#f8efdf'],
		},
		topNav: { font: 'Abril Fatface' },
		sideNav: { font: 'Merriweather' },
	},
};

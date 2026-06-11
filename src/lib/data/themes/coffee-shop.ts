import type { Theme } from '../themes';

export const CoffeeShop: Theme = {
	id: 'coffee-shop',
	name: 'Coffee Shop',
	description: 'Mocha tones, paper textures, and a cozy café energy.',
	icon: '☕',
	config: {
		design: {
			font: 'Lora',
			fontDisplay: 'Playfair Display',
			colorBg: '#4a3b32',
			colorNavBg: '#362a23',
			colorText: '#948378',
			colorTextDisplay: '#867468',
			colorSideNavText: '#f8efdf',
			colorTopNavText: '#f8efdf',
			colorCoverText: '#867468',
			colorLines: '#7a6355',
			colorDots: '#614e42',
		},
		coverPage: {
			font: 'Cormorant Garamond',
			darkBackground: false,
			backgroundStyle: 'terrazzo',
			backgroundSeed: 622,
			backgroundComplexity: 7,
			backgroundPalette: ['#6b4f35', '#d8c3a5', '#f8efdf'],
		},
		topNav: { font: 'Karla' },
		sideNav: { font: 'Karla' },
	},
};

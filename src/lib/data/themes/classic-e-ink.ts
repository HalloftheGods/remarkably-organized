import type { Theme } from '../themes';

export const ClassicEInk: Theme = {
	id: 'classic-e-ink',
	name: 'Classic E-Ink',
	description: 'Optimized high-contrast layout for e-ink devices.',
	icon: '🖋️',
	config: {
		design: {
			font: 'Lora',
			fontDisplay: 'Playfair Display',
			colorBg: '#f4f4f4',
			colorNavBg: '#e9e9e9',
			colorText: '#9d9d9d',
			colorTextDisplay: '#aaaaaa',
			colorSideNavText: '#000000',
			colorTopNavText: '#000000',
			colorCoverText: '#aaaaaa',
			colorLines: '#bbbbbb',
			colorDots: '#dddddd',
		},
		coverPage: {
			font: 'Cormorant Garamond',
			darkBackground: false,
			backgroundStyle: 'vintage-wallpaper',
			backgroundSeed: 101,
			backgroundComplexity: 5,
			backgroundPalette: ['#000000', '#555555', '#aaaaaa'],
		},
		topNav: { font: 'Karla' },
		sideNav: { font: 'Karla' },
	},
};

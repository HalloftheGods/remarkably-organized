import type { Theme } from '../themes';

export const LibraryLoft: Theme = {
	id: 'library-loft',
	name: 'Library Loft',
	description: 'Rich lounge tones with vintage bookshop warmth and quiet luxury.',
	icon: '📖',
	config: {
		design: {
			font: 'Lora',
			fontDisplay: 'Playfair Display',
			colorBg: '#3e342f',
			colorNavBg: '#2d2522',
			colorText: '#867a74',
			colorTextDisplay: '#766861',
			colorSideNavText: '#f7efe6',
			colorTopNavText: '#f7efe6',
			colorCoverText: '#766861',
			colorLines: '#6e5e56',
			colorDots: '#544741',
		},
		coverPage: {
			font: 'Cormorant Garamond',
			darkBackground: false,
			backgroundStyle: 'vintage-wallpaper',
			backgroundSeed: 257,
			backgroundComplexity: 6,
			backgroundPalette: ['#7f5845', '#d8c4b2', '#f7efe6'],
		},
		topNav: { font: 'Karla' },
		sideNav: { font: 'Karla' },
	},
};

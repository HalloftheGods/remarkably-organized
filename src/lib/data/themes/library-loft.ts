import type { Theme } from '../themes';

export const LibraryLoft: Theme = {
	id: 'library-loft',
	name: 'Library Loft',
	description: 'Rich lounge tones with vintage bookshop warmth and quiet luxury.',
	icon: '📖',
	config: {
		design: {
			font: 'Indie Flower',
			fontDisplay: 'Lora',
			colorBg: '#f7efe6',
			colorNavBg: '#f3e8da',
			colorText: '#32261d',
			colorLines: '#e6ccb0',
			colorDots: '#eddbc7',
		},
		coverPage: {
			font: 'Playfair Display',
			darkBackground: false,
			backgroundStyle: 'halftone',
			backgroundSeed: 257,
			backgroundComplexity: 6,
			backgroundPalette: ['#7f5845', '#d8c4b2', '#f7efe6'],
		},
		topNav: { font: 'Sacramento' },
		sideNav: { font: 'Dancing Script' },
	},
};

import type { Theme } from '../themes';

export const LibraryLoft: Theme = {
	id: 'library-loft',
	name: 'Library Loft',
	description: 'Rich lounge tones with vintage bookshop warmth and quiet luxury.',
	icon: '📖',
	config: {
		design: {
			font: 'Crimson Text',
			fontDisplay: 'Cormorant Garamond',
			colorBg: '#3e342f',
			colorNavBg: '#2d2522',
			colorText: '#e2e1e0',
			colorTextDisplay: '#f5f5f5',
			colorSideNavText: '#f7efe6',
			colorTopNavText: '#f7efe6',
			colorCoverText: '#f5f5f5',
			colorLines: '#6e5e56',
			colorDots: '#544741',
		},
		coverPage: {
			font: 'Libre Baskerville',
			darkBackground: false,
			backgroundStyle: 'halftone',
			backgroundSeed: 257,
			backgroundComplexity: 6,
			backgroundPalette: ['#7f5845', '#d8c4b2', '#f7efe6'],
		},
		topNav: { font: 'Cormorant Garamond' },
		sideNav: { font: 'Crimson Text' },
	},
};

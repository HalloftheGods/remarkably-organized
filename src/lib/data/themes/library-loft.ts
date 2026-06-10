import type { Theme } from '../themes';

export const LibraryLoft: Theme = {
		id: 'library-loft',
		name: 'Library Loft',
		description: 'Rich lounge tones with vintage bookshop warmth and quiet luxury.',
		icon: '📖',
		config: {
			design: {
				font: 'PT Serif',
				fontDisplay: 'Lilita One',
				colorBg: '#f7efe6',
				colorNavBg: '#7f5845',
				colorText: '#32261d',
				colorLines: '#b09280',
				colorDots: '#d8c4b2',
			},
			coverPage: {
				font: 'Lilita One',
				darkBackground: false,
				backgroundStyle: 'halftone',
				backgroundSeed: 257,
				backgroundComplexity: 6,
				backgroundPalette: ['#7f5845', '#d8c4b2', '#f7efe6'],
			},
			topNav: { font: 'PT Serif' },
			sideNav: { font: 'PT Serif' },
		},
	};

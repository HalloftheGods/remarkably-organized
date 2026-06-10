import type { Theme } from '../themes';

export const ClassicEInk: Theme = {
		id: 'classic-e-ink',
		name: 'Classic E-Ink',
		description: 'The standard grayscale layout.',
		icon: '🖋️',
		config: {
			design: {
				font: 'Roboto',
				fontDisplay: 'Roboto Slab',
				colorBg: '#ffffff',
				colorNavBg: '#f2f2f2',
				colorText: '#000000',
				colorLines: '#cccccc',
				colorDots: '#7a7a7a',
			},
			coverPage: {
				font: 'Roboto Slab',
				darkBackground: false,
				backgroundStyle: 'halftone',
				backgroundSeed: 101,
				backgroundComplexity: 5,
				backgroundPalette: ['#e0e0e0', '#cccccc', '#999999'],
			},
			topNav: { font: 'Roboto' },
			sideNav: { font: 'Roboto' },
		},
	};

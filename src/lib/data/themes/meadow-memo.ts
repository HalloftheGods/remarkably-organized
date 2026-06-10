import type { Theme } from '../themes';

export const MeadowMemo: Theme = {
		id: 'meadow-memo',
		name: 'Meadow Memo',
		description: 'Light wildflower softness with a clean, handwritten note style.',
		icon: '🍃',
		config: {
			design: {
				font: 'Satisfy',
				fontDisplay: 'PT Serif',
				colorBg: '#f7fbf4',
				colorNavBg: '#cfe3c9',
				colorText: '#3a4d3b',
				colorLines: '#9eb99e',
				colorDots: '#d7e0d3',
			},
			coverPage: {
				font: 'PT Serif',
				darkBackground: false,
				backgroundStyle: 'waves',
				backgroundSeed: 752,
				backgroundComplexity: 6,
				backgroundPalette: ['#cfe3c9', '#f7fbf4', '#3a4d3b'],
			},
			topNav: { font: 'Satisfy' },
			sideNav: { font: 'Satisfy' },
		},
	};

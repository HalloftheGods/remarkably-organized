import type { Theme } from '../themes';

export const MeadowMemo: Theme = {
	id: 'meadow-memo',
	name: 'Meadow Memo',
	description: 'Light wildflower softness with a clean, handwritten note style.',
	icon: '🍃',
	config: {
		design: {
			font: 'Quicksand',
			fontDisplay: 'Caveat Brush',
			colorBg: '#f7fbf4',
			colorNavBg: '#eff7e9',
			colorText: '#3a4d3b',
			colorLines: '#d1e8c0',
			colorDots: '#e1f0d6',
		},
		coverPage: {
			font: 'Quicksand',
			darkBackground: false,
			backgroundStyle: 'waves',
			backgroundSeed: 752,
			backgroundComplexity: 6,
			backgroundPalette: ['#cfe3c9', '#f7fbf4', '#3a4d3b'],
		},
		topNav: { font: 'Quicksand' },
		sideNav: { font: 'Quicksand' },
	},
};

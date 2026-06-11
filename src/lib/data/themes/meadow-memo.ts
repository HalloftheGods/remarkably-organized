import type { Theme } from '../themes';

export const MeadowMemo: Theme = {
	id: 'meadow-memo',
	name: 'Meadow Memo',
	description: 'Light wildflower softness with a clean, handwritten note style.',
	icon: '🍃',
	config: {
		design: {
			font: 'Lato',
			fontDisplay: 'Quicksand',
			colorBg: '#e8f5e9',
			colorNavBg: '#c8e6c9',
			colorText: '#232523',
			colorTextDisplay: '#0c0c0c',
			colorSideNavText: '#3a4d3b',
			colorTopNavText: '#3a4d3b',
			colorCoverText: '#0c0c0c',
			colorLines: '#a5d6a7',
			colorDots: '#c8e6c9',
		},
		coverPage: {
			font: 'Dosis',
			darkBackground: false,
			backgroundStyle: 'waves',
			backgroundSeed: 752,
			backgroundComplexity: 6,
			backgroundPalette: ['#cfe3c9', '#f7fbf4', '#3a4d3b'],
		},
		topNav: { font: 'Quicksand' },
		sideNav: { font: 'Lato' },
	},
};

import type { Theme } from '../themes';

export const MeadowMemo: Theme = {
	id: 'meadow-memo',
	name: 'Meadow Memo',
	description: 'Light wildflower softness with a clean, handwritten note style.',
	icon: '🍃',
	config: {
		design: {
			font: 'Patrick Hand',
			fontDisplay: 'Cabin Sketch',
			colorBg: '#e8f5e9',
			colorNavBg: '#c8e6c9',
			colorText: '#88a889',
			colorTextDisplay: '#92b693',
			colorSideNavText: '#3a4d3b',
			colorTopNavText: '#3a4d3b',
			colorCoverText: '#92b693',
			colorLines: '#a5d6a7',
			colorDots: '#c8e6c9',
		},
		coverPage: {
			font: 'Shadows Into Light Two',
			darkBackground: false,
			backgroundStyle: 'origami',
			backgroundSeed: 752,
			backgroundComplexity: 6,
			backgroundPalette: ['#cfe3c9', '#f7fbf4', '#3a4d3b'],
		},
		topNav: { font: 'Nunito' },
		sideNav: { font: 'Nunito' },
	},
};

import type { Theme } from '../themes';

export const NordicForest: Theme = {
	id: 'nordic-forest',
	name: 'Nordic Forest',
	description: 'Premium earthy tones with intricate flower of life patterns.',
	icon: '🌲',
	config: {
		design: {
			font: 'Work Sans',
			fontDisplay: 'Montserrat',
			colorBg: '#1f2421',
			colorNavBg: '#151816',
			colorText: '#5b645e',
			colorTextDisplay: '#4d5650',
			colorSideNavText: '#8ea89a',
			colorTopNavText: '#8ea89a',
			colorCoverText: '#4d5650',
			colorLines: '#354038',
			colorDots: '#27302a',
		},
		coverPage: {
			font: 'Montserrat',
			darkBackground: false,
			backgroundStyle: 'watercolor',
			backgroundSeed: 15,
			backgroundComplexity: 7,
			backgroundPalette: ['#2d4a3e', '#5a7d6c', '#8ea89a'],
		},
		topNav: { font: 'Work Sans' },
		sideNav: { font: 'Work Sans' },
	},
};

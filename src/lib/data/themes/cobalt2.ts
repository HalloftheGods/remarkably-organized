import type { Theme } from '../themes';

export const Cobalt2: Theme = {
	id: 'cobalt2',
	name: 'Cobalt2',
	description: 'High contrast blue theme by Wes Bos.',
	icon: '💎',
	config: {
		design: {
			font: 'Kalam',
			fontDisplay: 'Amatic SC',
			colorBg: '#193549',
			colorNavBg: '#1d3d54',
			colorText: '#e1efff',
			colorTextDisplay: '#ffffff',
			colorSideNavText: '#e1efff',
			colorTopNavText: '#e1efff',
			colorCoverText: '#ffc600',
			colorLines: '#2b5c7e',
			colorDots: '#234b67',
		},
		coverPage: {
			font: 'Cabin Sketch',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#193549","#1d3c53","#264f6e","#ffc600","#ff628c"],
		},
		topNav: { font: 'Satisfy' },
		sideNav: { font: 'Patrick Hand' },
	},
};

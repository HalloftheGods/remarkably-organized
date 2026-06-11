import type { Theme } from '../themes';

export const CatppuccinMocha: Theme = {
	id: 'catppuccin-mocha',
	name: 'Catppuccin Mocha',
	description: 'Soothing pastel theme for warm, comfortable viewing.',
	icon: '☕',
	config: {
		design: {
			font: 'Caveat',
			fontDisplay: 'Caveat Brush',
			colorBg: '#1e1e2e',
			colorNavBg: '#242437',
			colorText: '#cdd6f4',
			colorTextDisplay: '#f5e0dc',
			colorSideNavText: '#cdd6f4',
			colorTopNavText: '#cdd6f4',
			colorCoverText: '#cba6f7',
			colorLines: '#3a3a59',
			colorDots: '#2e2e47',
		},
		coverPage: {
			font: 'Permanent Marker',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#1e1e2e","#313244","#585b70","#cba6f7","#f38ba8"],
		},
		topNav: { font: 'Parisienne' },
		sideNav: { font: 'Sacramento' },
	},
};

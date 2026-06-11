import type { Theme } from '../themes';

export const CatppuccinMocha: Theme = {
	id: 'catppuccin-mocha',
	name: 'Catppuccin Mocha',
	description: 'Soothing pastel theme for warm, comfortable viewing.',
	icon: '☕',
	config: {
		design: {
			font: 'Quicksand',
			fontDisplay: 'Fredoka One',
			colorBg: '#1e1e2e',
			colorNavBg: '#181825',
			colorText: '#dddde0',
			colorTextDisplay: '#f4f4f5',
			colorSideNavText: '#cba6f7',
			colorTopNavText: '#cba6f7',
			colorCoverText: '#f4f4f5',
			colorLines: '#45475a',
			colorDots: '#313244',
		},
		coverPage: {
			font: 'Comfortaa',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#1e1e2e","#313244","#585b70","#cba6f7","#f38ba8"],
		},
		topNav: { font: 'Fredoka One' },
		sideNav: { font: 'Quicksand' },
	},
};

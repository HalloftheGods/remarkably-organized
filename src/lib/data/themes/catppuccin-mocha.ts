import type { Theme } from '../themes';

export const CatppuccinMocha: Theme = {
	id: 'catppuccin-mocha',
	name: 'Catppuccin Mocha',
	description: 'Soothing pastel theme for warm, comfortable viewing.',
	icon: '☕',
	config: {
		design: {
			font: 'Inter',
			fontDisplay: 'Space Mono',
			colorBg: '#1e1e2e',
			colorNavBg: '#181825',
			colorText: '#616271',
			colorTextDisplay: '#525465',
			colorSideNavText: '#cba6f7',
			colorTopNavText: '#cba6f7',
			colorCoverText: '#525465',
			colorLines: '#45475a',
			colorDots: '#313244',
		},
		coverPage: {
			font: 'DM Serif Display',
			darkBackground: true,
			backgroundStyle: 'watercolor',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#1e1e2e","#313244","#585b70","#cba6f7","#f38ba8"],
		},
		topNav: { font: 'Inter' },
		sideNav: { font: 'Inter' },
	},
};

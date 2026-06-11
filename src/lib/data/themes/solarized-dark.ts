import type { Theme } from '../themes';

export const SolarizedDark: Theme = {
	id: 'solarized-dark',
	name: 'Solarized Dark',
	description: 'A scientifically designed dark theme for reduced eye strain.',
	icon: '🌒',
	config: {
		design: {
			font: 'Inter',
			fontDisplay: 'Space Mono',
			colorBg: '#002b36',
			colorNavBg: '#073642',
			colorText: '#60787f',
			colorTextDisplay: '#516c73',
			colorSideNavText: '#b58900',
			colorTopNavText: '#b58900',
			colorCoverText: '#516c73',
			colorLines: '#586e75',
			colorDots: '#1a4550',
		},
		coverPage: {
			font: 'DM Serif Display',
			darkBackground: true,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 404,
			backgroundComplexity: 4,
			backgroundPalette: ['#002b36', '#073642', '#586e75', '#2aa198', '#b58900'],
		},
		topNav: { font: 'Inter' },
		sideNav: { font: 'Inter' },
	},
};

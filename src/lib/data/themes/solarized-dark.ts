import type { Theme } from '../themes';

export const SolarizedDark: Theme = {
	id: 'solarized-dark',
	name: 'Solarized Dark',
	description: 'A scientifically designed dark theme for reduced eye strain.',
	icon: '🌒',
	config: {
		design: {
			font: 'Inconsolata',
			fontDisplay: 'Source Code Pro',
			colorBg: '#002b36',
			colorNavBg: '#073642',
			colorText: '#d9dfe1',
			colorTextDisplay: '#f2f4f5',
			colorSideNavText: '#b58900',
			colorTopNavText: '#b58900',
			colorCoverText: '#f2f4f5',
			colorLines: '#586e75',
			colorDots: '#1a4550',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 404,
			backgroundComplexity: 4,
			backgroundPalette: ['#002b36', '#073642', '#586e75', '#2aa198', '#b58900'],
		},
		topNav: { font: 'Source Code Pro' },
		sideNav: { font: 'Inconsolata' },
	},
};

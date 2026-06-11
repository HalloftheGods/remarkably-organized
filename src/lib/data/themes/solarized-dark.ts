import type { Theme } from '../themes';

export const SolarizedDark: Theme = {
	id: 'solarized-dark',
	name: 'Solarized Dark',
	description: 'A scientifically designed dark theme for reduced eye strain.',
	icon: '🌒',
	config: {
		design: {
			font: 'Kalam',
			fontDisplay: 'Rancho',
			colorBg: '#002b36',
			colorNavBg: '#003745',
			colorText: '#839496',
			colorTextDisplay: '#93a1a1',
			colorSideNavText: '#839496',
			colorTopNavText: '#839496',
			colorCoverText: '#2aa198',
			colorLines: '#00647d',
			colorDots: '#004b5f',
		},
		coverPage: {
			font: 'Shadows Into Light Two',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 404,
			backgroundComplexity: 4,
			backgroundPalette: ['#002b36', '#073642', '#586e75', '#2aa198', '#b58900'],
		},
		topNav: { font: 'Kalam' },
		sideNav: { font: 'Caveat' },
	},
};

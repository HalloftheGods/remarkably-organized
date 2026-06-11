import type { Theme } from '$lib/types';

export const SolarizedDark: Theme = {
	id: 'solarized-dark',
	name: 'Solarized Dark',
	description: 'A scientifically designed dark theme for reduced eye strain.',
	icon: '🌒',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Fira Code',
			colorBg: '#002b36',
			colorNavBg: '#073642',
			colorText: '#839496',
			colorTextDisplay: '#93a1a1',
			colorSideNavText: '#839496',
			colorTopNavText: '#839496',
			colorCoverText: '#2aa198',
			colorLines: '#586e75',
			colorDots: '#657b83',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 404,
			backgroundComplexity: 4,
			backgroundPalette: ['#002b36', '#073642', '#586e75', '#2aa198', '#b58900'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
	},
};

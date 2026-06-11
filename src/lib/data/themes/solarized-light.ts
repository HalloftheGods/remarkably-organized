import type { Theme } from '../themes';

export const SolarizedLight: Theme = {
	id: 'solarized-light',
	name: 'Solarized Light',
	description: 'A scientifically designed light theme for reduced eye strain.',
	icon: '🌖',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Fira Code',
			colorBg: '#fdf6e3',
			colorNavBg: '#eee8d5',
			colorText: '#657b83',
			colorTextDisplay: '#586e75',
			colorSideNavText: '#657b83',
			colorTopNavText: '#657b83',
			colorCoverText: '#2aa198',
			colorLines: '#93a1a1',
			colorDots: '#839496',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: false,
			backgroundStyle: 'abstract',
			backgroundSeed: 405,
			backgroundComplexity: 4,
			backgroundPalette: ['#fdf6e3', '#eee8d5', '#93a1a1', '#2aa198', '#b58900'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
	},
};

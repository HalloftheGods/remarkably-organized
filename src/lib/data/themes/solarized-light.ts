import type { Theme } from '../themes';

export const SolarizedLight: Theme = {
	id: 'solarized-light',
	name: 'Solarized Light',
	description: 'A scientifically designed light theme for reduced eye strain.',
	icon: '🌖',
	config: {
		design: {
			font: 'Inconsolata',
			fontDisplay: 'Source Code Pro',
			colorBg: '#fdf6e3',
			colorNavBg: '#eee8d5',
			colorText: '#262522',
			colorTextDisplay: '#0d0c0b',
			colorSideNavText: '#6d5200',
			colorTopNavText: '#6d5200',
			colorCoverText: '#0d0c0b',
			colorLines: '#93a1a1',
			colorDots: '#dcd4c0',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: false,
			backgroundStyle: 'abstract',
			backgroundSeed: 405,
			backgroundComplexity: 4,
			backgroundPalette: ['#fdf6e3', '#eee8d5', '#93a1a1', '#2aa198', '#b58900'],
		},
		topNav: { font: 'Source Code Pro' },
		sideNav: { font: 'Inconsolata' },
	},
};

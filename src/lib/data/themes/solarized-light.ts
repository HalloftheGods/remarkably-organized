import type { Theme } from '../themes';

export const SolarizedLight: Theme = {
	id: 'solarized-light',
	name: 'Solarized Light',
	description: 'A scientifically designed light theme for reduced eye strain.',
	icon: '🌖',
	config: {
		design: {
			font: 'Inter',
			fontDisplay: 'Space Mono',
			colorBg: '#fdf6e3',
			colorNavBg: '#eee8d5',
			colorText: '#8c938e',
			colorTextDisplay: '#9ea6a1',
			colorSideNavText: '#ad8300',
			colorTopNavText: '#ad8300',
			colorCoverText: '#9ea6a1',
			colorLines: '#93a1a1',
			colorDots: '#dcd4c0',
		},
		coverPage: {
			font: 'DM Serif Display',
			darkBackground: false,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 405,
			backgroundComplexity: 4,
			backgroundPalette: ['#fdf6e3', '#eee8d5', '#93a1a1', '#2aa198', '#b58900'],
		},
		topNav: { font: 'Inter' },
		sideNav: { font: 'Inter' },
	},
};

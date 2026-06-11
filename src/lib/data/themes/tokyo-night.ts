import type { Theme } from '../themes';

export const TokyoNight: Theme = {
	id: 'tokyo-night',
	name: 'Tokyo Night',
	description: 'A clean, dark theme inspired by the lights of downtown Tokyo.',
	icon: '🗼',
	config: {
		design: {
			font: 'Patrick Hand',
			fontDisplay: 'Caveat Brush',
			colorBg: '#1a1b26',
			colorNavBg: '#20212f',
			colorText: '#a9b1d6',
			colorTextDisplay: '#c0caf5',
			colorSideNavText: '#a9b1d6',
			colorTopNavText: '#a9b1d6',
			colorCoverText: '#7aa2f7',
			colorLines: '#373950',
			colorDots: '#2b2c3e',
		},
		coverPage: {
			font: 'Just Another Hand',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 999,
			backgroundComplexity: 4,
			backgroundPalette: ['#1a1b26', '#16161e', '#565f89', '#7aa2f7', '#f7768e'],
		},
		topNav: { font: 'Yellowtail' },
		sideNav: { font: 'Patrick Hand' },
	},
};

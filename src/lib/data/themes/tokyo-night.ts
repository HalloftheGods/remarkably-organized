import type { Theme } from '../themes';

export const TokyoNight: Theme = {
	id: 'tokyo-night',
	name: 'Tokyo Night',
	description: 'A clean, dark theme inspired by the lights of downtown Tokyo.',
	icon: '🗼',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Fira Code',
			colorBg: '#1a1b26',
			colorNavBg: '#16161e',
			colorText: '#a9b1d6',
			colorTextDisplay: '#c0caf5',
			colorSideNavText: '#a9b1d6',
			colorTopNavText: '#a9b1d6',
			colorCoverText: '#7aa2f7',
			colorLines: '#565f89',
			colorDots: '#414868',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 999,
			backgroundComplexity: 4,
			backgroundPalette: ['#1a1b26', '#16161e', '#565f89', '#7aa2f7', '#f7768e'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
	},
};

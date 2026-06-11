import type { Theme } from '../themes';

export const TokyoNight: Theme = {
	id: 'tokyo-night',
	name: 'Tokyo Night',
	description: 'A clean, dark theme inspired by the lights of downtown Tokyo.',
	icon: '🗼',
	config: {
		design: {
			font: 'Roboto Mono',
			fontDisplay: 'Teko',
			colorBg: '#1a1b26',
			colorNavBg: '#16161e',
			colorText: '#ddddde',
			colorTextDisplay: '#f4f4f4',
			colorSideNavText: '#7aa2f7',
			colorTopNavText: '#7aa2f7',
			colorCoverText: '#f4f4f4',
			colorLines: '#414868',
			colorDots: '#292e42',
		},
		coverPage: {
			font: 'Space Mono',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 999,
			backgroundComplexity: 4,
			backgroundPalette: ['#1a1b26', '#16161e', '#565f89', '#7aa2f7', '#f7768e'],
		},
		topNav: { font: 'Teko' },
		sideNav: { font: 'Roboto Mono' },
	},
};

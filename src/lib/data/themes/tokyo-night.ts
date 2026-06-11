import type { Theme } from '../themes';

export const TokyoNight: Theme = {
	id: 'tokyo-night',
	name: 'Tokyo Night',
	description: 'A clean, dark theme inspired by the lights of downtown Tokyo.',
	icon: '🗼',
	config: {
		design: {
			font: 'Inter',
			fontDisplay: 'Space Mono',
			colorBg: '#1a1b26',
			colorNavBg: '#16161e',
			colorText: '#5c6179',
			colorTextDisplay: '#4d536d',
			colorSideNavText: '#7aa2f7',
			colorTopNavText: '#7aa2f7',
			colorCoverText: '#4d536d',
			colorLines: '#414868',
			colorDots: '#292e42',
		},
		coverPage: {
			font: 'DM Serif Display',
			darkBackground: true,
			backgroundStyle: 'neon-tubes',
			backgroundSeed: 999,
			backgroundComplexity: 4,
			backgroundPalette: ['#1a1b26', '#16161e', '#565f89', '#7aa2f7', '#f7768e'],
		},
		topNav: { font: 'Inter' },
		sideNav: { font: 'Inter' },
	},
};

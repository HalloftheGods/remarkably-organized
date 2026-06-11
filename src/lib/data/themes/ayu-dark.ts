import type { Theme } from '../themes';

export const AyuDark: Theme = {
	id: 'ayu-dark',
	name: 'Ayu Dark',
	description: 'Simple, bright, and elegant dark theme.',
	icon: '✨',
	config: {
		design: {
			font: 'Inter',
			fontDisplay: 'Space Mono',
			colorBg: '#0a0e14',
			colorNavBg: '#0f1419',
			colorText: '#626a78',
			colorTextDisplay: '#535b6b',
			colorSideNavText: '#ffb454',
			colorTopNavText: '#ffb454',
			colorCoverText: '#535b6b',
			colorLines: '#4d5566',
			colorDots: '#3e4b59',
		},
		coverPage: {
			font: 'DM Serif Display',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#0a0e14","#0f1419","#273747","#ffb454","#39bae6"],
		},
		topNav: { font: 'Inter' },
		sideNav: { font: 'Inter' },
	},
};

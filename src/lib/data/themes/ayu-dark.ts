import type { Theme } from '../themes';

export const AyuDark: Theme = {
	id: 'ayu-dark',
	name: 'Ayu Dark',
	description: 'Simple, bright, and elegant dark theme.',
	icon: '✨',
	config: {
		design: {
			font: 'Caveat',
			fontDisplay: 'Rancho',
			colorBg: '#0a0e14',
			colorNavBg: '#0f151e',
			colorText: '#b3b1ad',
			colorTextDisplay: '#e6e1cf',
			colorSideNavText: '#b3b1ad',
			colorTopNavText: '#b3b1ad',
			colorCoverText: '#ffb454',
			colorLines: '#222f44',
			colorDots: '#18212f',
		},
		coverPage: {
			font: 'Shadows Into Light Two',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#0a0e14","#0f1419","#273747","#ffb454","#39bae6"],
		},
		topNav: { font: 'Sacramento' },
		sideNav: { font: 'Caveat' },
	},
};

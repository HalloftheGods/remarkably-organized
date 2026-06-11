import type { Theme } from '../themes';

export const AyuDark: Theme = {
	id: 'ayu-dark',
	name: 'Ayu Dark',
	description: 'Simple, bright, and elegant dark theme.',
	icon: '✨',
	config: {
		design: {
			font: 'PT Sans',
			fontDisplay: 'Ubuntu',
			colorBg: '#0a0e14',
			colorNavBg: '#0f1419',
			colorText: '#dadbdc',
			colorTextDisplay: '#f3f3f3',
			colorSideNavText: '#ffb454',
			colorTopNavText: '#ffb454',
			colorCoverText: '#f3f3f3',
			colorLines: '#4d5566',
			colorDots: '#3e4b59',
		},
		coverPage: {
			font: 'Ubuntu',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#0a0e14","#0f1419","#273747","#ffb454","#39bae6"],
		},
		topNav: { font: 'Ubuntu' },
		sideNav: { font: 'PT Sans' },
	},
};

import type { Theme } from '../themes';

export const Cobalt2: Theme = {
	id: 'cobalt2',
	name: 'Cobalt2',
	description: 'High contrast blue theme by Wes Bos.',
	icon: '💎',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Roboto Slab',
			colorBg: '#193549',
			colorNavBg: '#122738',
			colorText: '#527084',
			colorTextDisplay: '#44647a',
			colorSideNavText: '#ffc600',
			colorTopNavText: '#ffc600',
			colorCoverText: '#44647a',
			colorLines: '#1f4662',
			colorDots: '#1b3d56',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'waves',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#193549","#1d3c53","#264f6e","#ffc600","#ff628c"],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
	},
};

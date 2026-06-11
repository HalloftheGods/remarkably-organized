import type { Theme } from '../themes';

export const Cobalt2: Theme = {
	id: 'cobalt2',
	name: 'Cobalt2',
	description: 'High contrast blue theme by Wes Bos.',
	icon: '💎',
	config: {
		design: {
			font: 'Fira Sans',
			fontDisplay: 'Fira Code',
			colorBg: '#193549',
			colorNavBg: '#122738',
			colorText: '#dde1e4',
			colorTextDisplay: '#f4f5f6',
			colorSideNavText: '#ffc600',
			colorTopNavText: '#ffc600',
			colorCoverText: '#f4f5f6',
			colorLines: '#1f4662',
			colorDots: '#1b3d56',
		},
		coverPage: {
			font: 'Orbitron',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#193549","#1d3c53","#264f6e","#ffc600","#ff628c"],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Sans' },
	},
};

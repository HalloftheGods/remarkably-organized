import type { Theme } from '../themes';

export const MaterialOceanic: Theme = {
	id: 'material-theme-oceanic',
	name: 'Material Oceanic',
	description: 'Deep ocean colors following Material Design guidelines.',
	icon: '🌊',
	config: {
		design: {
			font: 'Indie Flower',
			fontDisplay: 'Caveat Brush',
			colorBg: '#263238',
			colorNavBg: '#2c3a41',
			colorText: '#b0bec5',
			colorTextDisplay: '#eceff1',
			colorSideNavText: '#b0bec5',
			colorTopNavText: '#b0bec5',
			colorCoverText: '#80cbc4',
			colorLines: '#435863',
			colorDots: '#364850',
		},
		coverPage: {
			font: 'Dancing Script',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#263238","#37474f","#455a64","#80cbc4","#ff5370"],
		},
		topNav: { font: 'Kalam' },
		sideNav: { font: 'Sacramento' },
	},
};

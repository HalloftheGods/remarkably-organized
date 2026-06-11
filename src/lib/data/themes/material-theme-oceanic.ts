import type { Theme } from '../themes';

export const MaterialOceanic: Theme = {
	id: 'material-theme-oceanic',
	name: 'Material Oceanic',
	description: 'Deep ocean colors following Material Design guidelines.',
	icon: '🌊',
	config: {
		design: {
			font: 'Roboto',
			fontDisplay: 'Roboto Condensed',
			colorBg: '#263238',
			colorNavBg: '#1e272c',
			colorText: '#dee0e1',
			colorTextDisplay: '#f4f5f5',
			colorSideNavText: '#ff5370',
			colorTopNavText: '#ff5370',
			colorCoverText: '#f4f5f5',
			colorLines: '#37474F',
			colorDots: '#2C3A41',
		},
		coverPage: {
			font: 'Roboto',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#263238","#37474f","#455a64","#80cbc4","#ff5370"],
		},
		topNav: { font: 'Roboto Condensed' },
		sideNav: { font: 'Roboto' },
	},
};

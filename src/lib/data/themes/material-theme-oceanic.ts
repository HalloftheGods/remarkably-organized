import type { Theme } from '../themes';

export const MaterialOceanic: Theme = {
	id: 'material-theme-oceanic',
	name: 'Material Oceanic',
	description: 'Deep ocean colors following Material Design guidelines.',
	icon: '🌊',
	config: {
		design: {
			font: 'Work Sans',
			fontDisplay: 'Montserrat',
			colorBg: '#263238',
			colorNavBg: '#1e272c',
			colorText: '#646f75',
			colorTextDisplay: '#57646a',
			colorSideNavText: '#ff5370',
			colorTopNavText: '#ff5370',
			colorCoverText: '#57646a',
			colorLines: '#37474F',
			colorDots: '#2C3A41',
		},
		coverPage: {
			font: 'Montserrat',
			darkBackground: true,
			backgroundStyle: 'waves',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#263238","#37474f","#455a64","#80cbc4","#ff5370"],
		},
		topNav: { font: 'Work Sans' },
		sideNav: { font: 'Work Sans' },
	},
};

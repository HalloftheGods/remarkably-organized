import type { Theme } from '../themes';

export const MinimalistMuji: Theme = {
	id: 'minimalist-muji',
	name: 'Minimalist Muji',
	description: 'A very warm, minimal paper feel with simple geometric backgrounds.',
	icon: '𑁍',
	config: {
		design: {
			font: 'Work Sans',
			fontDisplay: 'Montserrat',
			colorBg: '#faf9f5',
			colorNavBg: '#f0ede6',
			colorText: '#a7a49e',
			colorTextDisplay: '#bab7b0',
			colorSideNavText: '#3a3835',
			colorTopNavText: '#3a3835',
			colorCoverText: '#bab7b0',
			colorLines: '#dcd8d0',
			colorDots: '#ebe8df',
		},
		coverPage: {
			font: 'Montserrat',
			darkBackground: true,
			backgroundStyle: 'none',
			backgroundSeed: 88888888,
			backgroundComplexity: 6,
			backgroundPalette: ['#f7f5f0', '#a09c95', '#3a3835'],
		},
		topNav: { font: 'Work Sans' },
		sideNav: { font: 'Work Sans' },
	},
};

import type { Theme } from '../themes';

export const MinimalistMuji: Theme = {
	id: 'minimalist-muji',
	name: 'Minimalist Muji',
	description: 'A very warm, minimal paper feel with simple geometric backgrounds.',
	icon: '𑁍',
	config: {
		design: {
			font: 'Work Sans',
			fontDisplay: 'Varela Round',
			colorBg: '#faf9f5',
			colorNavBg: '#f0ede6',
			colorText: '#262525',
			colorTextDisplay: '#0d0c0c',
			colorSideNavText: '#3a3835',
			colorTopNavText: '#3a3835',
			colorCoverText: '#0d0c0c',
			colorLines: '#dcd8d0',
			colorDots: '#ebe8df',
		},
		coverPage: {
			font: 'Varela Round',
			darkBackground: true,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 88888888,
			backgroundComplexity: 6,
			backgroundPalette: ['#f7f5f0', '#a09c95', '#3a3835'],
		},
		topNav: { font: 'Varela Round' },
		sideNav: { font: 'Work Sans' },
	},
};

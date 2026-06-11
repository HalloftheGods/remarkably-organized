import type { Theme } from '../themes';

export const MinimalistMuji: Theme = {
	id: 'minimalist-muji',
	name: 'Minimalist Muji',
	description: 'A very warm, minimal paper feel with simple geometric backgrounds.',
	icon: '𑁍',
	config: {
		design: {
			font: 'Inter',
			fontDisplay: 'Noto Sans',
			colorBg: '#f7f5f0',
			colorNavBg: '#fcfcfa',
			colorText: '#3a3835',
			colorTextDisplay: '#3a3835',
			colorSideNavText: '#3a3835',
			colorTopNavText: '#3a3835',
			colorCoverText: '#3a3835',
			colorLines: '#ffffff',
			colorDots: '#ffffff',
		},
		coverPage: {
			font: 'Inter',
			darkBackground: true,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 88888888,
			backgroundComplexity: 6,
			backgroundPalette: ['#f7f5f0', '#a09c95', '#3a3835'],
		},
		topNav: { font: 'Inter' },
		sideNav: { font: 'Inter' },
	},
};

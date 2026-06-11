import type { Theme } from '../themes';

export const PastelDreams: Theme = {
	id: 'pastel-dreams',
	name: 'Pastel Dreams',
	description: 'Soft pink lines and playful fonts.',
	icon: '🌸',
	config: {
		design: {
			font: 'Comfortaa',
			fontDisplay: 'Dosis',
			colorBg: '#fdf6e3',
			colorNavBg: '#f5ead2',
			colorText: '#262522',
			colorTextDisplay: '#0d0c0b',
			colorSideNavText: '#8a7a99',
			colorTopNavText: '#8a7a99',
			colorCoverText: '#0d0c0b',
			colorLines: '#e0d6c8',
			colorDots: '#f0e6d8',
		},
		coverPage: {
			font: 'Quicksand',
			darkBackground: false,
			backgroundStyle: 'glassmorphism',
			backgroundSeed: 303,
			backgroundComplexity: 8,
			backgroundPalette: ['#ffcce6', '#cce6ff', '#e6ccff'],
		},
		topNav: { font: 'Dosis' },
		sideNav: { font: 'Comfortaa' },
	},
};

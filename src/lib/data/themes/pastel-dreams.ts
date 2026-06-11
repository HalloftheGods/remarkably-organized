import type { Theme } from '../themes';

export const PastelDreams: Theme = {
	id: 'pastel-dreams',
	name: 'Pastel Dreams',
	description: 'Soft pink lines and playful fonts.',
	icon: '🌸',
	config: {
		design: {
			font: 'Quicksand',
			fontDisplay: 'Fredoka One',
			colorBg: '#fdf6e3',
			colorNavBg: '#f5ead2',
			colorText: '#aaa398',
			colorTextDisplay: '#beb6aa',
			colorSideNavText: '#cbb4e1',
			colorTopNavText: '#cbb4e1',
			colorCoverText: '#beb6aa',
			colorLines: '#e0d6c8',
			colorDots: '#f0e6d8',
		},
		coverPage: {
			font: 'Pacifico',
			darkBackground: false,
			backgroundStyle: 'holographic',
			backgroundSeed: 303,
			backgroundComplexity: 8,
			backgroundPalette: ['#ffcce6', '#cce6ff', '#e6ccff'],
		},
		topNav: { font: 'Nunito' },
		sideNav: { font: 'Nunito' },
	},
};

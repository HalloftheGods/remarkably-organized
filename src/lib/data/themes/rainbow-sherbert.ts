import type { Theme } from '../themes';

export const RainbowSherbert: Theme = {
	id: 'rainbow-sherbert',
	name: 'Bubblegum',
	description: 'A bright, colorful and sweet pastel theme.',
	icon: '🍨',
	config: {
		design: {
			font: 'Quicksand',
			fontDisplay: 'Fredoka One',
			colorBg: '#fff5f5',
			colorNavBg: '#ffebf0',
			colorText: '#bd9ca2',
			colorTextDisplay: '#d3aeb5',
			colorSideNavText: '#e98d91',
			colorTopNavText: '#e98d91',
			colorCoverText: '#d3aeb5',
			colorLines: '#ffccd5',
			colorDots: '#ffe0e6',
		},
		coverPage: {
			font: 'Pacifico',
			darkBackground: false,
			backgroundStyle: 'holographic',
			backgroundSeed: 777,
			backgroundComplexity: 6,
			backgroundPalette: ['#ff9a9e', '#fecfef', '#a1c4fd', '#96e6a1'],
		},
		topNav: { font: 'Nunito' },
		sideNav: { font: 'Nunito' },
	},
};

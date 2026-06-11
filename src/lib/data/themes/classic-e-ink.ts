import type { Theme } from '../themes';

export const ClassicEInk: Theme = {
	id: 'classic-e-ink',
	name: 'Classic E-Ink',
	description: 'Optimized high-contrast layout for e-ink devices.',
	icon: '🖋️',
	config: {
		design: {
			font: 'Lora',
			fontDisplay: 'Playfair Display',
			colorBg: '#f4f4f4',
			colorNavBg: '#e9e9e9',
			colorText: '#252525',
			colorTextDisplay: '#0c0c0c',
			colorSideNavText: '#000000',
			colorTopNavText: '#000000',
			colorCoverText: '#0c0c0c',
			colorLines: '#bbbbbb',
			colorDots: '#dddddd',
		},
		coverPage: {
			font: 'EB Garamond',
			darkBackground: false,
			backgroundStyle: 'halftone',
			backgroundSeed: 101,
			backgroundComplexity: 5,
			backgroundPalette: ['#000000', '#555555', '#aaaaaa'],
		},
		topNav: { font: 'Playfair Display' },
		sideNav: { font: 'Lora' },
	},
};

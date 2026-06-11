import type { Theme } from '../themes';

export const ClassicEInk: Theme = {
	id: 'classic-e-ink',
	name: 'Classic E-Ink',
	description: 'Optimized high-contrast layout for e-ink devices.',
	icon: '🖋️',
	config: {
		design: {
			font: 'EB Garamond',
			fontDisplay: 'Playfair Display',
			colorBg: '#ffffff',
			colorNavBg: '#f7f7f7',
			colorText: '#000000',
			colorTextDisplay: '#000000',
			colorSideNavText: '#000000',
			colorTopNavText: '#000000',
			colorCoverText: '#000000',
			colorLines: '#dbdbdb',
			colorDots: '#ebebeb',
		},
		coverPage: {
			font: 'EB Garamond',
			darkBackground: false,
			backgroundStyle: 'halftone',
			backgroundSeed: 101,
			backgroundComplexity: 5,
			backgroundPalette: ['#000000', '#555555', '#aaaaaa'],
		},
		topNav: { font: 'EB Garamond' },
		sideNav: { font: 'EB Garamond' },
	},
};

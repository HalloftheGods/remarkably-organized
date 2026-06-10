import type { Theme } from '../themes';

export const ClassicEInk: Theme = {
	id: 'classic-e-ink',
	name: 'Classic E-Ink',
	description: 'Optimized high-contrast layout for e-ink devices.',
	icon: '🖋️',
	config: {
		design: {
			font: 'Roboto',
			fontDisplay: 'Roboto Slab',
			colorBg: '#ffffff',
			colorNavBg: '#ffffff',
			colorText: '#000000',
			colorTextDisplay: '#000000',
			colorSideNavText: '#000000',
			colorTopNavText: '#000000',
			colorCoverText: '#000000',
			colorLines: '#a3a3a3',
			colorDots: '#666666',
		},
		coverPage: {
			font: 'Roboto Slab',
			darkBackground: false,
			backgroundStyle: 'halftone',
			backgroundSeed: 101,
			backgroundComplexity: 5,
			backgroundPalette: ['#000000', '#555555', '#aaaaaa'],
		},
		topNav: { font: 'Roboto' },
		sideNav: { font: 'Roboto' },
	},
};

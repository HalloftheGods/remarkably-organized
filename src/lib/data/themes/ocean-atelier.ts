import type { Theme } from '../themes';

export const OceanAtelier: Theme = {
	id: 'ocean-atelier',
	name: 'Ocean Atelier',
	description: 'Breezy blues, sandy neutrals, and a relaxed coastal feel.',
	icon: '🌊',
	config: {
		design: {
			font: 'Just Another Hand',
			fontDisplay: 'Caveat Brush',
			colorBg: '#eef7fa',
			colorNavBg: '#a1ced8',
			colorText: '#22515a',
			colorLines: '#79b1bf',
			colorDots: '#d5e8ee',
		},
		coverPage: {
			font: 'Caveat Brush',
			darkBackground: false,
			backgroundStyle: 'waves',
			backgroundSeed: 423,
			backgroundComplexity: 7,
			backgroundPalette: ['#a1ced8', '#eef7fa', '#22515a'],
		},
		topNav: { font: 'Just Another Hand' },
		sideNav: { font: 'Just Another Hand' },
	},
};

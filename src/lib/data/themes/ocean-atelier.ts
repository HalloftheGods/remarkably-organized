import type { Theme } from '../themes';

export const OceanAtelier: Theme = {
	id: 'ocean-atelier',
	name: 'Ocean Atelier',
	description: 'Breezy blues, sandy neutrals, and a relaxed coastal feel.',
	icon: '🌊',
	config: {
		design: {
			font: 'Kalam',
			fontDisplay: 'Sacramento',
			colorBg: '#eef7fa',
			colorNavBg: '#e2f1f7',
			colorText: '#22515a',
			colorLines: '#b7ddea',
			colorDots: '#cee8f1',
		},
		coverPage: {
			font: 'Great Vibes',
			darkBackground: false,
			backgroundStyle: 'waves',
			backgroundSeed: 423,
			backgroundComplexity: 7,
			backgroundPalette: ['#a1ced8', '#eef7fa', '#22515a'],
		},
		topNav: { font: 'Patrick Hand' },
		sideNav: { font: 'Caveat' },
	},
};

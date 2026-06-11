import type { Theme } from '../themes';

export const OceanAtelier: Theme = {
	id: 'ocean-atelier',
	name: 'Ocean Atelier',
	description: 'Breezy blues, sandy neutrals, and a relaxed coastal feel.',
	icon: '🌊',
	config: {
		design: {
			font: 'Spectral',
			fontDisplay: 'DM Serif Display',
			colorBg: '#001a33',
			colorNavBg: '#001122',
			colorText: '#d9dde0',
			colorTextDisplay: '#f2f4f5',
			colorSideNavText: '#eef7fa',
			colorTopNavText: '#eef7fa',
			colorCoverText: '#f2f4f5',
			colorLines: '#004080',
			colorDots: '#002b5e',
		},
		coverPage: {
			font: 'Playfair Display',
			darkBackground: false,
			backgroundStyle: 'waves',
			backgroundSeed: 423,
			backgroundComplexity: 7,
			backgroundPalette: ['#a1ced8', '#eef7fa', '#22515a'],
		},
		topNav: { font: 'DM Serif Display' },
		sideNav: { font: 'Spectral' },
	},
};

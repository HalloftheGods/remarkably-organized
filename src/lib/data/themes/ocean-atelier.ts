import type { Theme } from '../themes';

export const OceanAtelier: Theme = {
	id: 'ocean-atelier',
	name: 'Ocean Atelier',
	description: 'Breezy blues, sandy neutrals, and a relaxed coastal feel.',
	icon: '🌊',
	config: {
		design: {
			font: 'Quicksand',
			fontDisplay: 'Fredoka One',
			colorBg: '#001a33',
			colorNavBg: '#001122',
			colorText: '#356391',
			colorTextDisplay: '#235589',
			colorSideNavText: '#eef7fa',
			colorTopNavText: '#eef7fa',
			colorCoverText: '#235589',
			colorLines: '#004080',
			colorDots: '#002b5e',
		},
		coverPage: {
			font: 'Pacifico',
			darkBackground: false,
			backgroundStyle: 'liquid-metal',
			backgroundSeed: 423,
			backgroundComplexity: 7,
			backgroundPalette: ['#a1ced8', '#eef7fa', '#22515a'],
		},
		topNav: { font: 'Nunito' },
		sideNav: { font: 'Nunito' },
	},
};

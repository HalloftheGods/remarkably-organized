import type { Theme } from '../themes';

export const StudioNoir: Theme = {
	id: 'studio-noir',
	name: 'Studio Noir',
	description: 'A modern editorial palette with soft shadow and cream contrast.',
	icon: '🎬',
	config: {
		design: {
			font: 'Montserrat',
			fontDisplay: 'Oswald',
			colorBg: '#101115',
			colorNavBg: '#17181e',
			colorText: '#eeebe6',
			colorLines: '#2f323e',
			colorDots: '#22242c',
		},
		coverPage: {
			font: 'Montserrat',
			darkBackground: true,
			backgroundStyle: 'halftone',
			backgroundSeed: 817,
			backgroundComplexity: 6,
			backgroundPalette: ['#101115', '#7d7470', '#eeebe6'],
		},
		topNav: { font: 'Montserrat' },
		sideNav: { font: 'Montserrat' },
	},
};

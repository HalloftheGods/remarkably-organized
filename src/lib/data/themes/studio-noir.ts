import type { Theme } from '../themes';

export const StudioNoir: Theme = {
	id: 'studio-noir',
	name: 'Studio Noir',
	description: 'A modern editorial palette with soft shadow and cream contrast.',
	icon: '🎬',
	config: {
		design: {
			font: 'Bebas Neue',
			fontDisplay: 'Abril Fatface',
			colorBg: '#101115',
			colorNavBg: '#1e1d22',
			colorText: '#eeebe6',
			colorLines: '#7d7470',
			colorDots: '#c1b4aa',
		},
		coverPage: {
			font: 'Abril Fatface',
			darkBackground: true,
			backgroundStyle: 'halftone',
			backgroundSeed: 817,
			backgroundComplexity: 6,
			backgroundPalette: ['#101115', '#7d7470', '#eeebe6'],
		},
		topNav: { font: 'Bebas Neue' },
		sideNav: { font: 'Bebas Neue' },
	},
};

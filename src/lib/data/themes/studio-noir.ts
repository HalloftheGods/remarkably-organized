import type { Theme } from '../themes';

export const StudioNoir: Theme = {
	id: 'studio-noir',
	name: 'Studio Noir',
	description: 'A modern editorial palette with soft shadow and cream contrast.',
	icon: '🎬',
	config: {
		design: {
			font: 'Abhaya Libre',
			fontDisplay: 'Abril Fatface',
			colorBg: '#181818',
			colorNavBg: '#101010',
			colorText: '#dcdcdc',
			colorTextDisplay: '#f3f3f3',
			colorSideNavText: '#eeebe6',
			colorTopNavText: '#eeebe6',
			colorCoverText: '#f3f3f3',
			colorLines: '#383838',
			colorDots: '#282828',
		},
		coverPage: {
			font: 'Playfair Display',
			darkBackground: true,
			backgroundStyle: 'halftone',
			backgroundSeed: 817,
			backgroundComplexity: 6,
			backgroundPalette: ['#101115', '#7d7470', '#eeebe6'],
		},
		topNav: { font: 'Abril Fatface' },
		sideNav: { font: 'Abhaya Libre' },
	},
};

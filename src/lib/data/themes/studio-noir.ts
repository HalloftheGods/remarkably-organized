import type { Theme } from '../themes';

export const StudioNoir: Theme = {
	id: 'studio-noir',
	name: 'Studio Noir',
	description: 'A modern editorial palette with soft shadow and cream contrast.',
	icon: '🎬',
	config: {
		design: {
			font: 'Archivo',
			fontDisplay: 'Anton',
			colorBg: '#181818',
			colorNavBg: '#101010',
			colorText: '#5d5d5d',
			colorTextDisplay: '#4f4f4f',
			colorSideNavText: '#eeebe6',
			colorTopNavText: '#eeebe6',
			colorCoverText: '#4f4f4f',
			colorLines: '#383838',
			colorDots: '#282828',
		},
		coverPage: {
			font: 'Bangers',
			darkBackground: true,
			backgroundStyle: 'none',
			backgroundSeed: 817,
			backgroundComplexity: 6,
			backgroundPalette: ['#101115', '#7d7470', '#eeebe6'],
		},
		topNav: { font: 'Archivo' },
		sideNav: { font: 'Archivo' },
	},
};

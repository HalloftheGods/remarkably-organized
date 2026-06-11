import type { Theme } from '../themes';

export const GardenChapter: Theme = {
	id: 'garden-chapter',
	name: 'Garden Chapter',
	description: 'Fresh sage, terracotta clay, and botanical charm.',
	icon: '🪴',
	config: {
		design: {
			font: 'Nunito',
			fontDisplay: 'Dosis',
			colorBg: '#2d3a2d',
			colorNavBg: '#212b21',
			colorText: '#e0e1e0',
			colorTextDisplay: '#f5f5f5',
			colorSideNavText: '#d7e4d4',
			colorTopNavText: '#d7e4d4',
			colorCoverText: '#f5f5f5',
			colorLines: '#4a5e4a',
			colorDots: '#3b4d3b',
		},
		coverPage: {
			font: 'Comfortaa',
			darkBackground: false,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 720,
			backgroundComplexity: 5,
			backgroundPalette: ['#3f5642', '#d7e4d4', '#b29b84'],
		},
		topNav: { font: 'Dosis' },
		sideNav: { font: 'Nunito' },
	},
};

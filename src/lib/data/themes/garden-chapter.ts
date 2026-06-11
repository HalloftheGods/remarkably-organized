import type { Theme } from '../themes';

export const GardenChapter: Theme = {
	id: 'garden-chapter',
	name: 'Garden Chapter',
	description: 'Fresh sage, terracotta clay, and botanical charm.',
	icon: '🪴',
	config: {
		design: {
			font: 'Quicksand',
			fontDisplay: 'Fredoka One',
			colorBg: '#2d3a2d',
			colorNavBg: '#212b21',
			colorText: '#718071',
			colorTextDisplay: '#5f705f',
			colorSideNavText: '#d7e4d4',
			colorTopNavText: '#d7e4d4',
			colorCoverText: '#5f705f',
			colorLines: '#4a5e4a',
			colorDots: '#3b4d3b',
		},
		coverPage: {
			font: 'Pacifico',
			darkBackground: false,
			backgroundStyle: 'watercolor',
			backgroundSeed: 720,
			backgroundComplexity: 5,
			backgroundPalette: ['#3f5642', '#d7e4d4', '#b29b84'],
		},
		topNav: { font: 'Nunito' },
		sideNav: { font: 'Nunito' },
	},
};

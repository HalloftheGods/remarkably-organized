import type { Theme } from '../themes';

export const GardenChapter: Theme = {
	id: 'garden-chapter',
	name: 'Garden Chapter',
	description: 'Fresh sage, terracotta clay, and botanical charm.',
	icon: '🪴',
	config: {
		design: {
			font: 'Caveat',
			fontDisplay: 'Yellowtail',
			colorBg: '#f3f6f0',
			colorNavBg: '#ebf0e6',
			colorText: '#3f5642',
			colorLines: '#cfdbc3',
			colorDots: '#dfe7d6',
		},
		coverPage: {
			font: 'Great Vibes',
			darkBackground: false,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 720,
			backgroundComplexity: 5,
			backgroundPalette: ['#3f5642', '#d7e4d4', '#b29b84'],
		},
		topNav: { font: 'Great Vibes' },
		sideNav: { font: 'Parisienne' },
	},
};

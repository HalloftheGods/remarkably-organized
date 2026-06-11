import type { Theme } from '../themes';

export const GardenChapter: Theme = {
	id: 'garden-chapter',
	name: 'Garden Chapter',
	description: 'Fresh sage, terracotta clay, and botanical charm.',
	icon: '🪴',
	config: {
		design: {
			font: 'Indie Flower',
			fontDisplay: 'Caveat Brush',
			colorBg: '#f3f6f0',
			colorNavBg: '#d7e4d4',
			colorText: '#3f5642',
			colorLines: '#92aa8b',
			colorDots: '#b29b84',
		},
		coverPage: {
			font: 'Caveat Brush',
			darkBackground: false,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 720,
			backgroundComplexity: 5,
			backgroundPalette: ['#3f5642', '#d7e4d4', '#b29b84'],
		},
		topNav: { font: 'Indie Flower' },
		sideNav: { font: 'Indie Flower' },
	},
};

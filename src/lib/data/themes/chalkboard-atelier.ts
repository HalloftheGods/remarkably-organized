import type { Theme } from '../themes';

export const ChalkboardAtelier: Theme = {
	id: 'chalkboard-atelier',
	name: 'Chalkboard Atelier',
	description: 'Dark green chalkboard textures with hand-drawn accent lines.',
	icon: '🪄',
	config: {
		design: {
			font: 'Kalam',
			fontDisplay: 'Cabin Sketch',
			colorBg: '#14240f',
			colorNavBg: '#1a2f14',
			colorText: '#f7f2dd',
			colorLines: '#305624',
			colorDots: '#24411b',
		},
		coverPage: {
			font: 'Just Another Hand',
			darkBackground: true,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 532,
			backgroundComplexity: 5,
			backgroundPalette: ['#14240f', '#7ca678', '#f7f2dd'],
		},
		topNav: { font: 'Shadows Into Light Two' },
		sideNav: { font: 'Cabin Sketch' },
	},
};

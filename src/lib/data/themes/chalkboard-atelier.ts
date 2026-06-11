import type { Theme } from '../themes';

export const ChalkboardAtelier: Theme = {
	id: 'chalkboard-atelier',
	name: 'Chalkboard Atelier',
	description: 'Dark green chalkboard textures with hand-drawn accent lines.',
	icon: '🪄',
	config: {
		design: {
			font: 'Cabin',
			fontDisplay: 'Cabin Sketch',
			colorBg: '#262f27',
			colorNavBg: '#1c231c',
			colorText: '#dee0df',
			colorTextDisplay: '#f4f5f4',
			colorSideNavText: '#f7f2dd',
			colorTopNavText: '#f7f2dd',
			colorCoverText: '#f4f5f4',
			colorLines: '#415243',
			colorDots: '#2f3b30',
		},
		coverPage: {
			font: 'Alfa Slab One',
			darkBackground: true,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 532,
			backgroundComplexity: 5,
			backgroundPalette: ['#14240f', '#7ca678', '#f7f2dd'],
		},
		topNav: { font: 'Cabin Sketch' },
		sideNav: { font: 'Cabin' },
	},
};

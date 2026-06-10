import type { Theme } from '../themes';

export const ChalkboardAtelier: Theme = {
		id: 'chalkboard-atelier',
		name: 'Chalkboard Atelier',
		description: 'Dark green chalkboard textures with hand-drawn accent lines.',
		icon: '🪄',
		config: {
			design: {
				font: 'Shadows Into Light Two',
				fontDisplay: 'Dancing Script',
				colorBg: '#14240f',
				colorNavBg: '#1f3c21',
				colorText: '#f7f2dd',
				colorLines: '#7ca678',
				colorDots: '#b9c9a4',
			},
			coverPage: {
				font: 'Dancing Script',
				darkBackground: true,
				backgroundStyle: 'bauhaus',
				backgroundSeed: 532,
				backgroundComplexity: 5,
				backgroundPalette: ['#14240f', '#7ca678', '#f7f2dd'],
			},
			topNav: { font: 'Shadows Into Light Two' },
			sideNav: { font: 'Shadows Into Light Two' },
		},
	};

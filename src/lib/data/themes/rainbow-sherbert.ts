import type { Theme } from '../themes';

export const RainbowSherbert: Theme = {
		id: 'rainbow-sherbert',
		name: 'Rainbow Sherbert',
		description: 'A bright, colorful and sweet pastel theme.',
		icon: '🍨',
		config: {
			design: {
				font: 'Quicksand',
				fontDisplay: 'Fredoka One',
				colorBg: '#fff5f8',
				colorNavBg: '#ffe4e1',
				colorText: '#ff6b81',
				colorLines: '#ffd166',
				colorDots: '#06d6a0',
			},
			coverPage: {
				font: 'Fredoka One',
				darkBackground: false,
				backgroundStyle: 'glassmorphism',
				backgroundSeed: 777,
				backgroundComplexity: 6,
				backgroundPalette: ['#ff9a9e', '#fecfef', '#a1c4fd', '#96e6a1'],
			},
			topNav: { font: 'Quicksand' },
			sideNav: { font: 'Quicksand' },
		},
	};

import type { Theme } from '../themes';

export const PixelPunk: Theme = {
	id: 'pixel-punk',
	name: 'Pixel Punk',
	description: 'Electric pixel energy with neon contrast and arcade-inspired styling.',
	icon: '🕹️',
	config: {
		design: {
			font: 'VT323',
			fontDisplay: 'Silkscreen',
			colorBg: '#080808',
			colorNavBg: '#1c1c1c',
			colorText: '#fcfcfc',
			colorLines: '#ff0055',
			colorDots: '#1e90ff',
		},
		coverPage: {
			font: 'Silkscreen',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 884,
			backgroundComplexity: 10,
			backgroundPalette: ['#080808', '#ff0055', '#1e90ff'],
		},
		topNav: { font: 'VT323' },
		sideNav: { font: 'VT323' },
		dashboardPage: { fontSize: 0.88 },
	},
};

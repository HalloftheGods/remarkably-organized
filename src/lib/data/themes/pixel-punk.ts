import type { Theme } from '../themes';

export const PixelPunk: Theme = {
	id: 'pixel-punk',
	name: 'Pixel Punk',
	description: 'Electric pixel energy with neon contrast and arcade-inspired styling.',
	icon: '🕹️',
	config: {
		design: {
			font: 'VT323',
			fontDisplay: 'Press Start 2P',
			colorBg: '#080808',
			colorNavBg: '#101010',
			colorText: '#fcfcfc',
			colorLines: '#2c2c2c',
			colorDots: '#1c1c1c',
		},
		coverPage: {
			font: 'VT323',
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

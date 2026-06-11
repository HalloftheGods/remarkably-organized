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
			colorBg: '#101020',
			colorNavBg: '#0b0b14',
			colorText: '#58587c',
			colorTextDisplay: '#4a4a71',
			colorSideNavText: '#1e90ff',
			colorTopNavText: '#1e90ff',
			colorCoverText: '#4a4a71',
			colorLines: '#333366',
			colorDots: '#202040',
		},
		coverPage: {
			font: 'Press Start 2P',
			darkBackground: true,
			backgroundStyle: 'halftone',
			backgroundSeed: 884,
			backgroundComplexity: 10,
			backgroundPalette: ['#080808', '#ff0055', '#1e90ff'],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
		dashboardPage: { fontSize: 0.88 },
	},
};

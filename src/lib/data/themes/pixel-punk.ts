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
			colorText: '#dbdbde',
			colorTextDisplay: '#f3f3f4',
			colorSideNavText: '#1e90ff',
			colorTopNavText: '#1e90ff',
			colorCoverText: '#f3f3f4',
			colorLines: '#333366',
			colorDots: '#202040',
		},
		coverPage: {
			font: 'Press Start 2P',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 884,
			backgroundComplexity: 10,
			backgroundPalette: ['#080808', '#ff0055', '#1e90ff'],
		},
		topNav: { font: 'Press Start 2P' },
		sideNav: { font: 'VT323' },
		dashboardPage: { fontSize: 0.88 },
	},
};

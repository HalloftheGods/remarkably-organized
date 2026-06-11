import type { Theme } from '../themes';

export const RainbowSherbert: Theme = {
	id: 'rainbow-sherbert',
	name: 'Bubblegum',
	description: 'A bright, colorful and sweet pastel theme.',
	icon: '🍨',
	config: {
		design: {
			font: 'Fredoka One',
			fontDisplay: 'Lilita One',
			colorBg: '#fff5f5',
			colorNavBg: '#ffebf0',
			colorText: '#262525',
			colorTextDisplay: '#0d0c0c',
			colorSideNavText: '#995c5f',
			colorTopNavText: '#995c5f',
			colorCoverText: '#0d0c0c',
			colorLines: '#ffccd5',
			colorDots: '#ffe0e6',
		},
		coverPage: {
			font: 'Acme',
			darkBackground: false,
			backgroundStyle: 'glassmorphism',
			backgroundSeed: 777,
			backgroundComplexity: 6,
			backgroundPalette: ['#ff9a9e', '#fecfef', '#a1c4fd', '#96e6a1'],
		},
		topNav: { font: 'Lilita One' },
		sideNav: { font: 'Fredoka One' },
	},
};

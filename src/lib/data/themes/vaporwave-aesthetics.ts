import type { Theme } from '../themes';

export const VaporwaveAesthetics: Theme = {
	id: 'vaporwave-aesthetics',
	name: 'Vaporwave',
	description: 'Retro 80s synthwave vibes with a scattered emoji background.',
	icon: '🌴', // sunglasses
	config: {
		design: {
			font: 'Rajdhani',
			fontDisplay: 'Teko',
			colorBg: '#2b1b54',
			colorNavBg: '#311f60',
			colorText: '#ffb3ba',
			colorLines: '#472c8a',
			colorDots: '#3b2573',
		},
		coverPage: {
			font: 'Rajdhani',
			darkBackground: true,
			backgroundStyle: 'emoji',
			backgroundSeed: 88,
			backgroundComplexity: 9,
			backgroundPalette: ['#2b1b54', '#ffb3ba', '#bae1ff'],
		},
		topNav: { font: 'Rajdhani' },
		sideNav: { font: 'Rajdhani' },
	},
};

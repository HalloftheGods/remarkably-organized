import type { Theme } from '../themes';

export const ChalkboardAtelier: Theme = {
	id: 'chalkboard-atelier',
	name: 'Chalkboard Atelier',
	description: 'Dark green chalkboard textures with hand-drawn accent lines.',
	icon: '🪄',
	config: {
		design: {
			font: 'Patrick Hand',
			fontDisplay: 'Cabin Sketch',
			colorBg: '#262f27',
			colorNavBg: '#1c231c',
			colorText: '#647065',
			colorTextDisplay: '#566458',
			colorSideNavText: '#f7f2dd',
			colorTopNavText: '#f7f2dd',
			colorCoverText: '#566458',
			colorLines: '#415243',
			colorDots: '#2f3b30',
		},
		coverPage: {
			font: 'Shadows Into Light Two',
			darkBackground: true,
			backgroundStyle: 'halftone',
			backgroundSeed: 532,
			backgroundComplexity: 5,
			backgroundPalette: ['#14240f', '#7ca678', '#f7f2dd'],
		},
		topNav: { font: 'Nunito' },
		sideNav: { font: 'Nunito' },
	},
};

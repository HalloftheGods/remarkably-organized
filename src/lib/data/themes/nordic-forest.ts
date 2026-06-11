import type { Theme } from '../themes';

export const NordicForest: Theme = {
	id: 'nordic-forest',
	name: 'Nordic Forest',
	description: 'Premium earthy tones with intricate flower of life patterns.',
	icon: '🌲',
	config: {
		design: {
			font: 'PT Sans',
			fontDisplay: 'PT Serif',
			colorBg: '#1f2421',
			colorNavBg: '#151816',
			colorText: '#dddede',
			colorTextDisplay: '#f4f4f4',
			colorSideNavText: '#8ea89a',
			colorTopNavText: '#8ea89a',
			colorCoverText: '#f4f4f4',
			colorLines: '#354038',
			colorDots: '#27302a',
		},
		coverPage: {
			font: 'Lora',
			darkBackground: false,
			backgroundStyle: 'sacred-geometry',
			backgroundSeed: 15,
			backgroundComplexity: 7,
			backgroundPalette: ['#2d4a3e', '#5a7d6c', '#8ea89a'],
		},
		topNav: { font: 'PT Serif' },
		sideNav: { font: 'PT Sans' },
	},
};

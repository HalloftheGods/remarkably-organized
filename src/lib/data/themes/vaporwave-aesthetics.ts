import type { Theme } from '../themes';

export const VaporwaveAesthetics: Theme = {
	id: 'vaporwave-aesthetics',
	name: 'Vaporwave',
	description: 'Retro 80s synthwave vibes with a scattered emoji background.',
	icon: '🌴', // sunglasses
	config: {
		design: {
			font: 'VT323',
			fontDisplay: 'Orbitron',
			colorBg: '#200f2e',
			colorNavBg: '#130b1c',
			colorText: '#dedbe0',
			colorTextDisplay: '#f4f3f5',
			colorSideNavText: '#bae1ff',
			colorTopNavText: '#bae1ff',
			colorCoverText: '#f4f3f5',
			colorLines: '#6b3fa0',
			colorDots: '#4a2c66',
		},
		coverPage: {
			font: 'Righteous',
			darkBackground: true,
			backgroundStyle: 'emoji',
			backgroundSeed: 88,
			backgroundComplexity: 9,
			backgroundPalette: ['#2b1b54', '#ffb3ba', '#bae1ff'],
		},
		topNav: { font: 'Orbitron' },
		sideNav: { font: 'VT323' },
	},
};

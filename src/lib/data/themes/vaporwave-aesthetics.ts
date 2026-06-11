import type { Theme } from '../themes';

export const VaporwaveAesthetics: Theme = {
	id: 'vaporwave-aesthetics',
	name: 'Vaporwave',
	description: 'Retro 80s synthwave vibes with a scattered emoji background.',
	icon: '🌴', // sunglasses
	config: {
		design: {
			font: 'Orbitron',
			fontDisplay: 'Righteous',
			colorBg: '#200f2e',
			colorNavBg: '#130b1c',
			colorText: '#77559f',
			colorTextDisplay: '#6b4497',
			colorSideNavText: '#bae1ff',
			colorTopNavText: '#bae1ff',
			colorCoverText: '#6b4497',
			colorLines: '#6b3fa0',
			colorDots: '#4a2c66',
		},
		coverPage: {
			font: 'Bungee',
			darkBackground: true,
			backgroundStyle: 'holographic',
			backgroundSeed: 88,
			backgroundComplexity: 9,
			backgroundPalette: ['#2b1b54', '#ffb3ba', '#bae1ff'],
		},
		topNav: { font: 'Orbitron' },
		sideNav: { font: 'Orbitron' },
	},
};

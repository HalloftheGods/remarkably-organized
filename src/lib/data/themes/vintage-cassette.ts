import type { Theme } from '../themes';

export const VintageCassette: Theme = {
	id: 'vintage-cassette',
	name: 'Vintage Cassette',
	description: 'Retro analog colors, warm tape texture, and bold music-inspired type.',
	icon: '📼',
	config: {
		design: {
			font: 'Orbitron',
			fontDisplay: 'Righteous',
			colorBg: '#222222',
			colorNavBg: '#111111',
			colorText: '#6a6a6a',
			colorTextDisplay: '#5d5d5d',
			colorSideNavText: '#858585',
			colorTopNavText: '#858585',
			colorCoverText: '#5d5d5d',
			colorLines: '#555555',
			colorDots: '#333333',
		},
		coverPage: {
			font: 'Bungee',
			darkBackground: false,
			backgroundStyle: 'vintage-wallpaper',
			backgroundSeed: 181,
			backgroundComplexity: 7,
			backgroundPalette: ['#8c5b48', '#d6a673', '#f5ebe7'],
		},
		topNav: { font: 'Orbitron' },
		sideNav: { font: 'Orbitron' },
	},
};

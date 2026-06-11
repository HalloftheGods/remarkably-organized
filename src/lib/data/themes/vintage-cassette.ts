import type { Theme } from '../themes';

export const VintageCassette: Theme = {
	id: 'vintage-cassette',
	name: 'Vintage Cassette',
	description: 'Retro analog colors, warm tape texture, and bold music-inspired type.',
	icon: '📼',
	config: {
		design: {
			font: 'Inconsolata',
			fontDisplay: 'VT323',
			colorBg: '#222222',
			colorNavBg: '#111111',
			colorText: '#dedede',
			colorTextDisplay: '#f4f4f4',
			colorSideNavText: '#f5ebe7',
			colorTopNavText: '#f5ebe7',
			colorCoverText: '#f4f4f4',
			colorLines: '#555555',
			colorDots: '#333333',
		},
		coverPage: {
			font: 'VT323',
			darkBackground: false,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 181,
			backgroundComplexity: 7,
			backgroundPalette: ['#8c5b48', '#d6a673', '#f5ebe7'],
		},
		topNav: { font: 'VT323' },
		sideNav: { font: 'Inconsolata' },
	},
};

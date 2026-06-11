import type { Theme } from '../themes';

export const VintageCassette: Theme = {
	id: 'vintage-cassette',
	name: 'Vintage Cassette',
	description: 'Retro analog colors, warm tape texture, and bold music-inspired type.',
	icon: '📼',
	config: {
		design: {
			font: 'Roboto Mono',
			fontDisplay: 'Permanent Marker',
			colorBg: '#f5ebe7',
			colorNavBg: '#f1e2dc',
			colorText: '#2f241e',
			colorSideNavText: '#f5ebe7',
			colorTopNavText: '#f5ebe7',
			colorLines: '#e0c1b5',
			colorDots: '#e9d3ca',
		},
		coverPage: {
			font: 'Roboto Mono',
			darkBackground: false,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 181,
			backgroundComplexity: 7,
			backgroundPalette: ['#8c5b48', '#d6a673', '#f5ebe7'],
		},
		topNav: { font: 'Roboto Mono' },
		sideNav: { font: 'Roboto Mono' },
	},
};

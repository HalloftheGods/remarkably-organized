import type { Theme } from '../themes';

export const VintageCassette: Theme = {
		id: 'vintage-cassette',
		name: 'Vintage Cassette',
		description: 'Retro analog colors, warm tape texture, and bold music-inspired type.',
		icon: '📼',
		config: {
			design: {
				font: 'Lilita One',
				fontDisplay: 'Permanent Marker',
				colorBg: '#f5ebe7',
				colorNavBg: '#8c5b48',
				colorText: '#2f241e',
				colorSideNavText: '#f5ebe7',
				colorTopNavText: '#f5ebe7',
				colorLines: '#d6a673',
				colorDots: '#c3b0a0',
			},
			coverPage: {
				font: 'Permanent Marker',
				darkBackground: false,
				backgroundStyle: 'bauhaus',
				backgroundSeed: 181,
				backgroundComplexity: 7,
				backgroundPalette: ['#8c5b48', '#d6a673', '#f5ebe7'],
			},
			topNav: { font: 'Lilita One' },
			sideNav: { font: 'Lilita One' },
		},
	};

import type { Theme } from '../themes';

export const Monokai: Theme = {
	id: 'monokai',
	name: 'Monokai',
	description: 'High contrast, vibrant colors on a dark background.',
	icon: '🌈',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Roboto Slab',
			colorBg: '#272822',
			colorNavBg: '#1e1f1c',
			colorText: '#6a6a62',
			colorTextDisplay: '#5e5d55',
			colorSideNavText: '#fd971f',
			colorTopNavText: '#fd971f',
			colorCoverText: '#5e5d55',
			colorLines: '#49483e',
			colorDots: '#383830',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'neon-tubes',
			backgroundSeed: 123,
			backgroundComplexity: 4,
			backgroundPalette: ['#272822', '#3e3d32', '#75715e', '#fd971f', '#f92672'],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
	},
};

import type { Theme } from '../themes';

export const Monokai: Theme = {
	id: 'monokai',
	name: 'Monokai',
	description: 'High contrast, vibrant colors on a dark background.',
	icon: '🌈',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Fira Code',
			colorBg: '#272822',
			colorNavBg: '#2f3029',
			colorText: '#f8f8f2',
			colorTextDisplay: '#f8f8f2',
			colorSideNavText: '#f8f8f2',
			colorTopNavText: '#f8f8f2',
			colorCoverText: '#fd971f',
			colorLines: '#4d4f43',
			colorDots: '#3d3e35',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 123,
			backgroundComplexity: 4,
			backgroundPalette: ['#272822', '#3e3d32', '#75715e', '#fd971f', '#f92672'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
	},
};

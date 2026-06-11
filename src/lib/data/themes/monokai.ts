import type { Theme } from '../themes';

export const Monokai: Theme = {
	id: 'monokai',
	name: 'Monokai',
	description: 'High contrast, vibrant colors on a dark background.',
	icon: '🌈',
	config: {
		design: {
			font: 'Open Sans',
			fontDisplay: 'Source Code Pro',
			colorBg: '#272822',
			colorNavBg: '#1e1f1c',
			colorText: '#dfdfde',
			colorTextDisplay: '#f4f4f4',
			colorSideNavText: '#fd971f',
			colorTopNavText: '#fd971f',
			colorCoverText: '#f4f4f4',
			colorLines: '#49483e',
			colorDots: '#383830',
		},
		coverPage: {
			font: 'Ubuntu Mono',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 123,
			backgroundComplexity: 4,
			backgroundPalette: ['#272822', '#3e3d32', '#75715e', '#fd971f', '#f92672'],
		},
		topNav: { font: 'Source Code Pro' },
		sideNav: { font: 'Open Sans' },
	},
};

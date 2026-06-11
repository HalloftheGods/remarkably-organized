import type { Theme } from '../themes';

export const RosePine: Theme = {
	id: 'rose-pine',
	name: 'Rosé Pine',
	description: 'Alluring, minimalist design with muted floral tones.',
	icon: '🌹',
	config: {
		design: {
			font: 'Lora',
			fontDisplay: 'Playfair Display',
			colorBg: '#191724',
			colorNavBg: '#1f1d2e',
			colorText: '#5d5a6f',
			colorTextDisplay: '#4f4c62',
			colorSideNavText: '#ebbcba',
			colorTopNavText: '#ebbcba',
			colorCoverText: '#4f4c62',
			colorLines: '#44415a',
			colorDots: '#26233a',
		},
		coverPage: {
			font: 'Cormorant Garamond',
			darkBackground: true,
			backgroundStyle: 'starlight',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#191724","#1f1d2e","#403d52","#c4a7e7","#ebbcba"],
		},
		topNav: { font: 'Karla' },
		sideNav: { font: 'Karla' },
	},
};

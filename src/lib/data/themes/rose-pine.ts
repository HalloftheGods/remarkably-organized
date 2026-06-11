import type { Theme } from '../themes';

export const RosePine: Theme = {
	id: 'rose-pine',
	name: 'Rosé Pine',
	description: 'Alluring, minimalist design with muted floral tones.',
	icon: '🌹',
	config: {
		design: {
			font: 'Libre Franklin',
			fontDisplay: 'Lora',
			colorBg: '#191724',
			colorNavBg: '#1f1d2e',
			colorText: '#dddcde',
			colorTextDisplay: '#f4f3f4',
			colorSideNavText: '#ebbcba',
			colorTopNavText: '#ebbcba',
			colorCoverText: '#f4f3f4',
			colorLines: '#44415a',
			colorDots: '#26233a',
		},
		coverPage: {
			font: 'Playfair Display',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#191724","#1f1d2e","#403d52","#c4a7e7","#ebbcba"],
		},
		topNav: { font: 'Lora' },
		sideNav: { font: 'Libre Franklin' },
	},
};

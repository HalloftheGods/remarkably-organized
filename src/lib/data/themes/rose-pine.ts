import type { Theme } from '../themes';

export const RosePine: Theme = {
	id: 'rose-pine',
	name: 'Rosé Pine',
	description: 'Alluring, minimalist design with muted floral tones.',
	icon: '🌹',
	config: {
		design: {
			font: 'Patrick Hand',
			fontDisplay: 'Pacifico',
			colorBg: '#191724',
			colorNavBg: '#1f1d2d',
			colorText: '#e0def4',
			colorTextDisplay: '#ffffff',
			colorSideNavText: '#e0def4',
			colorTopNavText: '#e0def4',
			colorCoverText: '#c4a7e7',
			colorLines: '#373350',
			colorDots: '#2a273d',
		},
		coverPage: {
			font: 'Yellowtail',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#191724","#1f1d2e","#403d52","#c4a7e7","#ebbcba"],
		},
		topNav: { font: 'Caveat' },
		sideNav: { font: 'Great Vibes' },
	},
};

import type { Theme } from '../themes';

export const MidnightNerd: Theme = {
	id: 'midnight-nerd',
	name: 'Midnight Nerd',
	description:
		'Deep teal, vivid magenta, and dark voids. A homage to the beautiful aesthetic of MidnightNerd.com',
	icon: '🤓',
	config: {
		design: {
			font: 'VT323',
			fontDisplay: 'Press Start 2P',
			colorBg: '#0f0f1b',
			colorNavBg: '#090910',
			colorText: '#525267',
			colorTextDisplay: '#43435a',
			colorLines: '#2a2a46',
			colorDots: '#1c1c30',
			//
			colorSideNavText: '#0b8a9e',
			colorTopNavText: '#0b8a9e',
			colorCoverText: '#43435a',
		},
		coverPage: {
			font: 'Press Start 2P',
			darkBackground: true,
			backgroundStyle: 'cyber-grid',
			backgroundSeed: 404,
			backgroundComplexity: 6,
			backgroundPalette: ['#09131a', '#84205a', '#0b8a9e', '#04090d'],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
	},
};

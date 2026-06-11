import type { Theme } from '../themes';

export const MidnightNerd: Theme = {
	id: 'midnight-nerd',
	name: 'Midnight Nerd',
	description:
		'Deep teal, vivid magenta, and dark voids. A homage to the beautiful aesthetic of MidnightNerd.com',
	icon: '🤓',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'VT323',
			colorBg: '#09131a',
			colorNavBg: '#0d1b25',
			colorText: '#d1e8ed',
			colorLines: '#1b3a4f',
			colorDots: '#132938',
			//
			colorSideNavText: '#fff',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 404,
			backgroundComplexity: 6,
			backgroundPalette: ['#09131a', '#84205a', '#0b8a9e', '#04090d'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
	},
};

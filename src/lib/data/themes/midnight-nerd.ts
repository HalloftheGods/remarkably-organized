import type { Theme } from '../themes';

export const MidnightNerd: Theme = {
		id: 'midnight-nerd',
		name: 'Midnight Nerd',
		description:
			'Deep teal, vivid magenta, and dark voids. A homage to the beautiful aesthetic of MidnightNerd.com',
		icon: '🤓',
		config: {
			design: {
				font: 'Inter',
				fontDisplay: 'Outfit',
				colorBg: '#09131a',
				colorNavBg: '#84205a',
				colorText: '#d1e8ed',
				colorLines: '#0b8a9e',
				colorDots: '#84205a',
				//
				colorSideNavText: '#fff',
			},
			coverPage: {
				font: 'Outfit',
				darkBackground: true,
				backgroundStyle: 'mesh',
				backgroundSeed: 404,
				backgroundComplexity: 6,
				backgroundPalette: ['#09131a', '#84205a', '#0b8a9e', '#04090d'],
			},
			topNav: { font: 'Outfit' },
			sideNav: { font: 'Inter' },
		},
	};

import type { Theme } from '../themes';

export const VaporwaveAesthetics: Theme = {
		id: 'vaporwave-aesthetics',
		name: 'Vaporwave',
		description: 'Retro 80s synthwave vibes with a scattered emoji background.',
		icon: '🌴', // sunglasses
		config: {
			design: {
				font: 'VT323',
				fontDisplay: 'Righteous',
				colorBg: '#2b1b54',
				colorNavBg: '#1c1138',
				colorText: '#ffb3ba',
				colorLines: '#bae1ff',
				colorDots: '#baffc9',
			},
			coverPage: {
				font: 'Righteous',
				darkBackground: true,
				backgroundStyle: 'emoji',
				backgroundSeed: 88,
				backgroundComplexity: 9,
				backgroundPalette: ['#2b1b54', '#ffb3ba', '#bae1ff'],
			},
			topNav: { font: 'VT323' },
			sideNav: { font: 'VT323' },
		},
	};

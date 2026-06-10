import type { Theme } from '../themes';

export const PastelDreams: Theme = {
		id: 'pastel-dreams',
		name: 'Pastel Dreams',
		description: 'Soft pink lines and playful fonts.',
		icon: '🌸',
		config: {
			design: {
				font: 'Caveat',
				fontDisplay: 'Pacifico',
				colorBg: '#ffffff',
				colorNavBg: '#fff0f5',
				colorText: '#4a4a4a',
				colorLines: '#ffcce6',
				colorDots: '#cce6ff',
			},
			coverPage: {
				font: 'Pacifico',
				darkBackground: false,
				backgroundStyle: 'glassmorphism',
				backgroundSeed: 303,
				backgroundComplexity: 8,
				backgroundPalette: ['#ffcce6', '#cce6ff', '#e6ccff'],
			},
			topNav: { font: 'Caveat' },
			sideNav: { font: 'Caveat' },
		},
	};

import type { Theme } from '../themes';

export const PaperProAccents: Theme = {
		id: 'paper-pro-accents',
		name: 'Paper Pro Accents',
		description: 'Utilizes the new color display with subtle red and blue accents.',
		icon: '🎨',
		config: {
			design: {
				font: 'Montserrat',
				fontDisplay: 'Poppins',
				colorBg: '#ffffff',
				colorNavBg: '#f9f9f9',
				colorText: '#000000',
				colorLines: '#aaccff',
				colorDots: '#ffaaaa',
			},
			coverPage: {
				font: 'Poppins',
				darkBackground: true,
				backgroundStyle: 'waves',
				backgroundSeed: 202,
				backgroundComplexity: 6,
				backgroundPalette: ['#111111', '#aaccff', '#ffaaaa'],
			},
			topNav: { font: 'Montserrat' },
			sideNav: { font: 'Montserrat' },
		},
	};

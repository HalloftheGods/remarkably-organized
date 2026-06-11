import type { Theme } from '../themes';

export const PaperProAccents: Theme = {
	id: 'paper-pro-accents',
	name: 'Paper Pro Accents',
	description: 'Utilizes the new color display with subtle red and blue accents.',
	icon: '🎨',
	config: {
		design: {
			font: 'Kalam',
			fontDisplay: 'Pacifico',
			colorBg: '#ffffff',
			colorNavBg: '#ffffff',
			colorText: '#000000',
			colorLines: '#ffffff',
			colorDots: '#ffffff',
		},
		coverPage: {
			font: 'Amatic SC',
			darkBackground: true,
			backgroundStyle: 'waves',
			backgroundSeed: 202,
			backgroundComplexity: 6,
			backgroundPalette: ['#111111', '#aaccff', '#ffaaaa'],
		},
		topNav: { font: 'Pacifico' },
		sideNav: { font: 'Rancho' },
	},
};

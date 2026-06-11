import type { Theme } from '../themes';

export const FestivalFolio: Theme = {
	id: 'festival-folio',
	name: 'Festival Folio',
	description:
		'A striking red and black palette capturing the bold, energetic feeling of a vintage circus tent.',
	icon: '🎪',
	config: {
		design: {
			font: 'Indie Flower',
			fontDisplay: 'Amatic SC',
			colorBg: '#fdfbf7',
			colorNavBg: '#faf5eb',
			colorText: '#1a1a1a',
			colorLines: '#efdebe',
			colorDots: '#f5ebd6',
		},
		coverPage: {
			font: 'Pacifico',
			darkBackground: false,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 302,
			backgroundComplexity: 8,
			backgroundPalette: ['#d91e18', '#1a1a1a', '#fdfbf7'],
		},
		topNav: { font: 'Pacifico' },
		sideNav: { font: 'Rancho' },
	},
};

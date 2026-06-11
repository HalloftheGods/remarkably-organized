import type { Theme } from '../themes';

export const FestivalFolio: Theme = {
	id: 'festival-folio',
	name: 'Festival Folio',
	description:
		'A striking red and black palette capturing the bold, energetic feeling of a vintage circus tent.',
	icon: '🎪',
	config: {
		design: {
			font: 'Permanent Marker',
			fontDisplay: 'Satisfy',
			colorBg: '#fdfbf7',
			colorNavBg: '#d91e18',
			colorText: '#1a1a1a',
			colorLines: '#e74c3c',
			colorDots: '#2c3e50',
		},
		coverPage: {
			font: 'Satisfy',
			darkBackground: false,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 302,
			backgroundComplexity: 8,
			backgroundPalette: ['#d91e18', '#1a1a1a', '#fdfbf7'],
		},
		topNav: { font: 'Permanent Marker' },
		sideNav: { font: 'Permanent Marker' },
	},
};

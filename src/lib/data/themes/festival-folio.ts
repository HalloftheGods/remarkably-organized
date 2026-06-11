import type { Theme } from '../themes';

export const FestivalFolio: Theme = {
	id: 'festival-folio',
	name: 'Festival Folio',
	description:
		'A striking red and black palette capturing the bold, energetic feeling of a vintage circus tent.',
	icon: '🎪',
	config: {
		design: {
			font: 'Quicksand',
			fontDisplay: 'Fredoka One',
			colorBg: '#220033',
			colorNavBg: '#150022',
			colorText: '#6f358d',
			colorTextDisplay: '#642385',
			colorSideNavText: '#fdfbf7',
			colorTopNavText: '#fdfbf7',
			colorCoverText: '#642385',
			colorLines: '#550080',
			colorDots: '#33004d',
		},
		coverPage: {
			font: 'Pacifico',
			darkBackground: false,
			backgroundStyle: 'emoji',
			backgroundSeed: 302,
			backgroundComplexity: 8,
			backgroundPalette: ['#d91e18', '#1a1a1a', '#fdfbf7'],
		},
		topNav: { font: 'Nunito' },
		sideNav: { font: 'Nunito' },
	},
};

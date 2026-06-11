import type { Theme } from '../themes';

export const FestivalFolio: Theme = {
	id: 'festival-folio',
	name: 'Festival Folio',
	description:
		'A striking red and black palette capturing the bold, energetic feeling of a vintage circus tent.',
	icon: '🎪',
	config: {
		design: {
			font: 'Josefin Sans',
			fontDisplay: 'Bangers',
			colorBg: '#220033',
			colorNavBg: '#150022',
			colorText: '#ded9e0',
			colorTextDisplay: '#f4f2f5',
			colorSideNavText: '#fdfbf7',
			colorTopNavText: '#fdfbf7',
			colorCoverText: '#f4f2f5',
			colorLines: '#550080',
			colorDots: '#33004d',
		},
		coverPage: {
			font: 'Righteous',
			darkBackground: false,
			backgroundStyle: 'bauhaus',
			backgroundSeed: 302,
			backgroundComplexity: 8,
			backgroundPalette: ['#d91e18', '#1a1a1a', '#fdfbf7'],
		},
		topNav: { font: 'Bangers' },
		sideNav: { font: 'Josefin Sans' },
	},
};

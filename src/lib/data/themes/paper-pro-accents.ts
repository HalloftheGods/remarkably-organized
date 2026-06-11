import type { Theme } from '../themes';

export const PaperProAccents: Theme = {
	id: 'paper-pro-accents',
	name: 'Paper Pro Accents',
	description: 'Utilizes the new color display with subtle red and blue accents.',
	icon: '🎨',
	config: {
		design: {
			font: 'Work Sans',
			fontDisplay: 'Montserrat',
			colorBg: '#ffffff',
			colorNavBg: '#f0f0f0',
			colorText: '#a5a5a5',
			colorTextDisplay: '#b2b2b2',
			colorSideNavText: '#111111',
			colorTopNavText: '#111111',
			colorCoverText: '#b2b2b2',
			colorLines: '#cccccc',
			colorDots: '#eeeeee',
		},
		coverPage: {
			font: 'Montserrat',
			darkBackground: true,
			backgroundStyle: 'origami',
			backgroundSeed: 202,
			backgroundComplexity: 6,
			backgroundPalette: ['#111111', '#aaccff', '#ffaaaa'],
		},
		topNav: { font: 'Work Sans' },
		sideNav: { font: 'Work Sans' },
	},
};

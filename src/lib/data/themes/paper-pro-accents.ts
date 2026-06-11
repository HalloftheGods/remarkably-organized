import type { Theme } from '../themes';

export const PaperProAccents: Theme = {
	id: 'paper-pro-accents',
	name: 'Paper Pro Accents',
	description: 'Utilizes the new color display with subtle red and blue accents.',
	icon: '🎨',
	config: {
		design: {
			font: 'Noto Sans',
			fontDisplay: 'Noto Serif',
			colorBg: '#ffffff',
			colorNavBg: '#f0f0f0',
			colorText: '#262626',
			colorTextDisplay: '#0d0d0d',
			colorSideNavText: '#111111',
			colorTopNavText: '#111111',
			colorCoverText: '#0d0d0d',
			colorLines: '#cccccc',
			colorDots: '#eeeeee',
		},
		coverPage: {
			font: 'Noto Serif',
			darkBackground: true,
			backgroundStyle: 'waves',
			backgroundSeed: 202,
			backgroundComplexity: 6,
			backgroundPalette: ['#111111', '#aaccff', '#ffaaaa'],
		},
		topNav: { font: 'Noto Serif' },
		sideNav: { font: 'Noto Sans' },
	},
};

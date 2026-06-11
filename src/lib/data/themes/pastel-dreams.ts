import type { Theme } from '../themes';

export const PastelDreams: Theme = {
	id: 'pastel-dreams',
	name: 'Pastel Dreams',
	description: 'Soft pink lines and playful fonts.',
	icon: '🌸',
	config: {
		design: {
			font: 'Indie Flower',
			fontDisplay: 'Dancing Script',
			colorBg: '#ffffff',
			colorNavBg: '#fff0f5',
			colorText: '#4a4a4a',
			colorLines: '#dbdbdb',
			colorDots: '#ebebeb',
		},
		coverPage: {
			font: 'Satisfy',
			darkBackground: false,
			backgroundStyle: 'glassmorphism',
			backgroundSeed: 303,
			backgroundComplexity: 8,
			backgroundPalette: ['#ffcce6', '#cce6ff', '#e6ccff'],
		},
		topNav: { font: 'Dancing Script' },
		sideNav: { font: 'Parisienne' },
	},
};

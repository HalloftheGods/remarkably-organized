import type { Theme } from '../themes';

export const MinimalistMuji: Theme = {
		id: 'minimalist-muji',
		name: 'Minimalist Muji',
		description: 'A very warm, minimal paper feel with simple geometric backgrounds.',
		icon: '𑁍',
		config: {
			design: {
				font: 'Shadows Into Light Two',
				fontDisplay: 'Caveat',
				colorBg: '#f7f5f0',
				colorNavBg: '#eae7de',
				colorText: '#3a3835',
				colorTextDisplay: '#3a3835',
				colorSideNavText: '#3a3835',
				colorTopNavText: '#3a3835',
				colorCoverText: '#3a3835',
				colorLines: '#a09c95',
				colorDots: '#c0bbb4',
			},
			coverPage: {
				font: 'Caveat Brush',
				darkBackground: true,
				backgroundStyle: 'sacred-geometry',
				backgroundSeed: 88888888,
				backgroundComplexity: 6,
				backgroundPalette: ['#f7f5f0', '#a09c95', '#3a3835'],
			},
			topNav: { font: 'Satisfy' },
			sideNav: { font: 'Satisfy' },
		},
	};

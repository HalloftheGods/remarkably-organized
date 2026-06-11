import type { Theme } from '../themes';

export const AtomOneDark: Theme = {
	id: 'atom-one-dark',
	name: 'Atom One Dark',
	description: 'The iconic dark theme from the legendary Atom editor.',
	icon: '⚛️',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Fira Code',
			colorBg: '#282c34',
			colorNavBg: '#21252b',
			colorText: '#abb2bf',
			colorTextDisplay: '#ffffff',
			colorSideNavText: '#abb2bf',
			colorTopNavText: '#abb2bf',
			colorCoverText: '#61afef',
			colorLines: '#5c6370',
			colorDots: '#4b5263',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 321,
			backgroundComplexity: 4,
			backgroundPalette: ['#282c34', '#21252b', '#5c6370', '#61afef', '#c678dd'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
	},
};

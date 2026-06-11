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
			colorNavBg: '#2f333d',
			colorText: '#abb2bf',
			colorTextDisplay: '#ffffff',
			colorSideNavText: '#abb2bf',
			colorTopNavText: '#abb2bf',
			colorCoverText: '#61afef',
			colorLines: '#474e5c',
			colorDots: '#3a404b',
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

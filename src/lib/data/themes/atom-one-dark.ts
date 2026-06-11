import type { Theme } from '../themes';

export const AtomOneDark: Theme = {
	id: 'atom-one-dark',
	name: 'Atom One Dark',
	description: 'The iconic dark theme from the legendary Atom editor.',
	icon: '⚛️',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Roboto Slab',
			colorBg: '#282c34',
			colorNavBg: '#21252b',
			colorText: '#676c74',
			colorTextDisplay: '#545963',
			colorSideNavText: '#61afef',
			colorTopNavText: '#61afef',
			colorCoverText: '#545963',
			colorLines: '#3e4451',
			colorDots: '#2c313a',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'circuit-board',
			backgroundSeed: 321,
			backgroundComplexity: 4,
			backgroundPalette: ['#282c34', '#21252b', '#5c6370', '#61afef', '#c678dd'],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
	},
};

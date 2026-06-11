import type { Theme } from '../themes';

export const AtomOneDark: Theme = {
	id: 'atom-one-dark',
	name: 'Atom One Dark',
	description: 'The iconic dark theme from the legendary Atom editor.',
	icon: '⚛️',
	config: {
		design: {
			font: 'Inter',
			fontDisplay: 'Fira Code',
			colorBg: '#282c34',
			colorNavBg: '#21252b',
			colorText: '#dfdfe1',
			colorTextDisplay: '#f4f4f5',
			colorSideNavText: '#61afef',
			colorTopNavText: '#61afef',
			colorCoverText: '#f4f4f5',
			colorLines: '#3e4451',
			colorDots: '#2c313a',
		},
		coverPage: {
			font: 'Roboto Mono',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 321,
			backgroundComplexity: 4,
			backgroundPalette: ['#282c34', '#21252b', '#5c6370', '#61afef', '#c678dd'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Source Code Pro' },
	},
};

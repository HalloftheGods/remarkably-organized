import type { Theme } from '../themes';

export const Nord: Theme = {
	id: 'nord',
	name: 'Nord',
	description: 'An arctic, north-bluish clean and elegant color palette.',
	icon: '❄️',
	config: {
		design: {
			font: 'Rubik',
			fontDisplay: 'Archivo',
			colorBg: '#2e3440',
			colorNavBg: '#242933',
			colorText: '#e0e1e2',
			colorTextDisplay: '#f5f5f5',
			colorSideNavText: '#88c0d0',
			colorTopNavText: '#88c0d0',
			colorCoverText: '#f5f5f5',
			colorLines: '#434c5e',
			colorDots: '#3b4252',
		},
		coverPage: {
			font: 'Archivo',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 888,
			backgroundComplexity: 4,
			backgroundPalette: ['#2e3440', '#3b4252', '#4c566a', '#81a1c1', '#88c0d0'],
		},
		topNav: { font: 'Archivo' },
		sideNav: { font: 'Rubik' },
	},
};

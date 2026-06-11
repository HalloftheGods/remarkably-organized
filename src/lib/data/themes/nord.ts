import type { Theme } from '../themes';

export const Nord: Theme = {
	id: 'nord',
	name: 'Nord',
	description: 'An arctic, north-bluish clean and elegant color palette.',
	icon: '❄️',
	config: {
		design: {
			font: 'Inter',
			fontDisplay: 'Space Mono',
			colorBg: '#2e3440',
			colorNavBg: '#242933',
			colorText: '#6d7481',
			colorTextDisplay: '#5b6271',
			colorSideNavText: '#88c0d0',
			colorTopNavText: '#88c0d0',
			colorCoverText: '#5b6271',
			colorLines: '#434c5e',
			colorDots: '#3b4252',
		},
		coverPage: {
			font: 'DM Serif Display',
			darkBackground: true,
			backgroundStyle: 'waves',
			backgroundSeed: 888,
			backgroundComplexity: 4,
			backgroundPalette: ['#2e3440', '#3b4252', '#4c566a', '#81a1c1', '#88c0d0'],
		},
		topNav: { font: 'Inter' },
		sideNav: { font: 'Inter' },
	},
};

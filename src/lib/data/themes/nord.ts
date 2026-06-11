import type { Theme } from '$lib/types';

export const Nord: Theme = {
	id: 'nord',
	name: 'Nord',
	description: 'An arctic, north-bluish clean and elegant color palette.',
	icon: '❄️',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Fira Code',
			colorBg: '#2e3440',
			colorNavBg: '#3b4252',
			colorText: '#d8dee9',
			colorTextDisplay: '#eceff4',
			colorSideNavText: '#d8dee9',
			colorTopNavText: '#d8dee9',
			colorCoverText: '#88c0d0',
			colorLines: '#4c566a',
			colorDots: '#434c5e',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 888,
			backgroundComplexity: 4,
			backgroundPalette: ['#2e3440', '#3b4252', '#4c566a', '#81a1c1', '#88c0d0'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
	},
};

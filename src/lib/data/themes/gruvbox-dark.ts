import type { Theme } from '../themes';

export const GruvboxDark: Theme = {
	id: 'gruvbox-dark',
	name: 'Gruvbox Dark',
	description: 'A retro groove color scheme with warm, earthy tones.',
	icon: '🍂',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Fira Code',
			colorBg: '#282828',
			colorNavBg: '#303030',
			colorText: '#ebdbb2',
			colorTextDisplay: '#fbf1c7',
			colorSideNavText: '#ebdbb2',
			colorTopNavText: '#ebdbb2',
			colorCoverText: '#fe8019',
			colorLines: '#4c4c4c',
			colorDots: '#3c3c3c',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 789,
			backgroundComplexity: 4,
			backgroundPalette: ['#282828', '#3c3836', '#a89984', '#fe8019', '#fb4934'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
	},
};

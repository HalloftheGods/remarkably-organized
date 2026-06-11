import type { Theme } from '../themes';

export const GruvboxDark: Theme = {
	id: 'gruvbox-dark',
	name: 'Gruvbox Dark',
	description: 'A retro groove color scheme with warm, earthy tones.',
	icon: '🍂',
	config: {
		design: {
			font: 'IBM Plex Sans',
			fontDisplay: 'Zilla Slab',
			colorBg: '#282828',
			colorNavBg: '#1d2021',
			colorText: '#dfdfdf',
			colorTextDisplay: '#f4f4f4',
			colorSideNavText: '#fe8019',
			colorTopNavText: '#fe8019',
			colorCoverText: '#f4f4f4',
			colorLines: '#504945',
			colorDots: '#3c3836',
		},
		coverPage: {
			font: 'Bitter',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 789,
			backgroundComplexity: 4,
			backgroundPalette: ['#282828', '#3c3836', '#a89984', '#fe8019', '#fb4934'],
		},
		topNav: { font: 'Zilla Slab' },
		sideNav: { font: 'IBM Plex Sans' },
	},
};

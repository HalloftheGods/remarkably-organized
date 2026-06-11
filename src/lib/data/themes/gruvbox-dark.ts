import type { Theme } from '../themes';

export const GruvboxDark: Theme = {
	id: 'gruvbox-dark',
	name: 'Pumpkin King',
	description: 'A retro groove color scheme with warm, earthy tones.',
	icon: '🍂',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Roboto Slab',
			colorBg: '#282828',
			colorNavBg: '#1d2021',
			colorText: '#6f6a68',
			colorTextDisplay: '#635e5b',
			colorSideNavText: '#fe8019',
			colorTopNavText: '#fe8019',
			colorCoverText: '#635e5b',
			colorLines: '#504945',
			colorDots: '#3c3836',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'terrazzo',
			backgroundSeed: 789,
			backgroundComplexity: 4,
			backgroundPalette: ['#282828', '#3c3836', '#a89984', '#fe8019', '#fb4934'],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
	},
};

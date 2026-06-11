import type { Theme } from '../themes';

export const Dracula: Theme = {
	id: 'dracula',
	name: 'Dracula',
	description: 'A dark theme for vampires and nocturnal developers.',
	icon: '🧛',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Fira Code',
			colorBg: '#282a36',
			colorNavBg: '#21222c',
			colorText: '#f8f8f2',
			colorTextDisplay: '#f8f8f2',
			colorSideNavText: '#f8f8f2',
			colorTopNavText: '#f8f8f2',
			colorCoverText: '#bd93f9',
			colorLines: '#6272a4',
			colorDots: '#44475a',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 666,
			backgroundComplexity: 4,
			backgroundPalette: ['#282a36', '#44475a', '#6272a4', '#bd93f9', '#ff79c6'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
	},
};

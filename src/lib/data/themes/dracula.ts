import type { Theme } from '../themes';

export const Dracula: Theme = {
	id: 'dracula',
	name: 'Dracula',
	description: 'A dark theme for vampires and nocturnal developers.',
	icon: '🧛',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Roboto Slab',
			colorBg: '#282a36',
			colorNavBg: '#1e1f29',
			colorText: '#707b9e',
			colorTextDisplay: '#5b6892',
			colorSideNavText: '#ff79c6',
			colorTopNavText: '#ff79c6',
			colorCoverText: '#5b6892',
			colorLines: '#6272a4',
			colorDots: '#44475a',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'fractals',
			backgroundSeed: 666,
			backgroundComplexity: 4,
			backgroundPalette: ['#282a36', '#44475a', '#6272a4', '#bd93f9', '#ff79c6'],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
	},
};

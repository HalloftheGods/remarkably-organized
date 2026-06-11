import type { Theme } from '../themes';

export const Dracula: Theme = {
	id: 'dracula',
	name: 'Dracula',
	description: 'A dark theme for vampires and nocturnal developers.',
	icon: '🧛',
	config: {
		design: {
			font: 'Ubuntu',
			fontDisplay: 'Fira Code',
			colorBg: '#282a36',
			colorNavBg: '#1e1f29',
			colorText: '#dfdfe1',
			colorTextDisplay: '#f4f4f5',
			colorSideNavText: '#ff79c6',
			colorTopNavText: '#ff79c6',
			colorCoverText: '#f4f4f5',
			colorLines: '#6272a4',
			colorDots: '#44475a',
		},
		coverPage: {
			font: 'Creepster',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: 666,
			backgroundComplexity: 4,
			backgroundPalette: ['#282a36', '#44475a', '#6272a4', '#bd93f9', '#ff79c6'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Ubuntu Mono' },
	},
};

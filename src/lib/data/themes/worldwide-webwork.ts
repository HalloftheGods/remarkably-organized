import type { Theme } from '../themes';

export const WorldwideWebwork: Theme = {
	id: 'worldwide-webwork',
	name: 'Worldwide Webwork',
	description:
		'A dark, high-contrast theme featuring neon green and deep purple accents inspired by worldwidewebwork.com.',
	icon: '🌐',
	config: {
		design: {
			font: 'Arimo',
			fontDisplay: 'Arimo',
			colorBg: '#000080',
			colorNavBg: '#000055',
			colorText: '#d9d9ec',
			colorTextDisplay: '#f2f2f9',
			colorSideNavText: '#3dee98',
			colorTopNavText: '#3dee98',
			colorLines: '#0000ff',
			colorDots: '#0000aa',
			colorCoverText: '#f2f2f9',
		},
		coverPage: {
			font: 'Arimo',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 1989,
			backgroundComplexity: 8,
			backgroundPalette: ['#000000', '#3dee98', '#432C68'],
		},
		topNav: { font: 'Arimo' },
		sideNav: { font: 'Arimo' },
	},
};

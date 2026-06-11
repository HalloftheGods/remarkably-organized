import type { Theme } from '../themes';

export const WorldwideWebwork: Theme = {
	id: 'worldwide-webwork',
	name: 'Worldwide Webwork',
	description:
		'A dark, high-contrast theme featuring neon green and deep purple accents inspired by worldwidewebwork.com.',
	icon: '🌐',
	config: {
		design: {
			font: 'Orbitron',
			fontDisplay: 'Righteous',
			colorBg: '#000080',
			colorNavBg: '#000055',
			colorText: '#3d3dea',
			colorTextDisplay: '#2d2dea',
			colorSideNavText: '#3dee98',
			colorTopNavText: '#3dee98',
			colorLines: '#0000ff',
			colorDots: '#0000aa',
			colorCoverText: '#2d2dea',
		},
		coverPage: {
			font: 'Bungee',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 1989,
			backgroundComplexity: 8,
			backgroundPalette: ['#000000', '#3dee98', '#432C68'],
		},
		topNav: { font: 'Orbitron' },
		sideNav: { font: 'Orbitron' },
	},
};

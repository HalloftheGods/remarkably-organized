import type { Theme } from '../themes';

export const WorldwideWebwork: Theme = {
	id: 'worldwide-webwork',
	name: 'Worldwide Webwork',
	description:
		'A dark, high-contrast theme featuring neon green and deep purple accents inspired by worldwidewebwork.com.',
	icon: '🌐',
	config: {
		design: {
			font: 'Press Start 2P',
			fontDisplay: 'Orbitron',
			colorBg: '#000000',
			colorNavBg: '#080808',
			colorText: '#ADB5B7',
			colorLines: '#242424',
			colorDots: '#141414',
			colorCoverText: '#0a0a0a',
		},
		coverPage: {
			font: 'Press Start 2P',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 1989,
			backgroundComplexity: 8,
			backgroundPalette: ['#000000', '#3dee98', '#432C68'],
		},
		topNav: { font: 'Righteous' },
		sideNav: { font: 'Bungee' },
	},
};

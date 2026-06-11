import type { Theme } from '../themes';

export const NeonHacker: Theme = {
	id: 'neon-hacker',
	name: 'Neon Hacker',
	description: 'Dark cover with terminal-inspired fonts and sharp contrast.',
	icon: '💻',
	config: {
		design: {
			font: 'Inconsolata',
			fontDisplay: 'Fira Code',
			colorBg: '#050a05',
			colorNavBg: '#0a140a',
			colorText: '#39ff14',
			colorLines: '#1d3a1d',
			colorDots: '#132513',
		},
		coverPage: {
			font: 'Inconsolata',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 404,
			backgroundComplexity: 10,
			backgroundPalette: ['#000000', '#00ff00', '#003300'],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
		dashboardPage: { fontSize: 0.85 },
	},
};

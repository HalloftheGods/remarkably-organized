import type { Theme } from '../themes';

export const NeonHacker: Theme = {
	id: 'neon-hacker',
	name: 'Neon Hacker',
	description: 'Dark cover with terminal-inspired fonts and sharp contrast.',
	icon: '💻',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Share Tech Mono',
			colorBg: '#050a05',
			colorNavBg: '#0a140a',
			colorText: '#39ff14',
			colorLines: '#1b5e20',
			colorDots: '#2e7d32',
		},
		coverPage: {
			font: 'Share Tech Mono',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 404,
			backgroundComplexity: 10,
			backgroundPalette: ['#000000', '#00ff00', '#003300'],
		},
		topNav: { font: 'Fira Code' },
		sideNav: { font: 'Fira Code' },
		dashboardPage: { fontSize: 0.85 },
	},
};

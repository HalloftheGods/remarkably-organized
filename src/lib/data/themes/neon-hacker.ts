import type { Theme } from '../themes';

export const NeonHacker: Theme = {
	id: 'neon-hacker',
	name: 'Neon Hacker',
	description: 'Dark cover with terminal-inspired fonts and sharp contrast.',
	icon: '💻',
	config: {
		design: {
			font: 'VT323',
			fontDisplay: 'Press Start 2P',
			colorBg: '#050505',
			colorNavBg: '#000000',
			colorText: '#2d5c2d',
			colorTextDisplay: '#194e19',
			colorSideNavText: '#00ff00',
			colorTopNavText: '#00ff00',
			colorCoverText: '#194e19',
			colorLines: '#004400',
			colorDots: '#002200',
		},
		coverPage: {
			font: 'Press Start 2P',
			darkBackground: true,
			backgroundStyle: 'cyber-grid',
			backgroundSeed: 404,
			backgroundComplexity: 10,
			backgroundPalette: ['#000000', '#00ff00', '#003300'],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
		dashboardPage: { fontSize: 0.85 },
	},
};

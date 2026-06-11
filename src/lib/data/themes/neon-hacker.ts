import type { Theme } from '../themes';

export const NeonHacker: Theme = {
	id: 'neon-hacker',
	name: 'Neon Hacker',
	description: 'Dark cover with terminal-inspired fonts and sharp contrast.',
	icon: '💻',
	config: {
		design: {
			font: 'Space Mono',
			fontDisplay: 'Teko',
			colorBg: '#050505',
			colorNavBg: '#000000',
			colorText: '#dadada',
			colorTextDisplay: '#f3f3f3',
			colorSideNavText: '#00ff00',
			colorTopNavText: '#00ff00',
			colorCoverText: '#f3f3f3',
			colorLines: '#004400',
			colorDots: '#002200',
		},
		coverPage: {
			font: 'Orbitron',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 404,
			backgroundComplexity: 10,
			backgroundPalette: ['#000000', '#00ff00', '#003300'],
		},
		topNav: { font: 'Teko' },
		sideNav: { font: 'Space Mono' },
		dashboardPage: { fontSize: 0.85 },
	},
};

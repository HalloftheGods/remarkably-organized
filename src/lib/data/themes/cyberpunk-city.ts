import type { Theme } from '../themes';

export const CyberpunkCity: Theme = {
	id: 'cyberpunk-city',
	name: 'Cyberpunk City',
	description: 'Neon hues, dark mode, and a futuristic mesh background.',
	icon: '🌃',
	config: {
		design: {
			font: 'Rajdhani',
			fontDisplay: 'Orbitron',
			colorBg: '#1a0b2e',
			colorNavBg: '#210e3a',
			colorText: '#f0f0f0',
			colorLines: '#3b1968',
			colorDots: '#2d134f',
		},
		coverPage: {
			font: 'Rajdhani',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 777,
			backgroundComplexity: 8,
			backgroundPalette: ['#1a0b2e', '#0ea5e9', '#fcee0a'],
		},
		topNav: { font: 'Rajdhani' },
		sideNav: { font: 'Rajdhani' },
	},
};

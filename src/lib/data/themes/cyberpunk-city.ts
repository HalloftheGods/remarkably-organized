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
				colorNavBg: '#2d1b4e',
				colorText: '#f0f0f0',
				colorLines: '#0ea5e9',
				colorDots: '#fcee0a',
			},
			coverPage: {
				font: 'Orbitron',
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

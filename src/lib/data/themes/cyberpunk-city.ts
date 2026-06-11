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
			fontDisplayScale: 0.6,
			colorBg: '#0d0221',
			colorNavBg: '#060112',
			colorText: '#dbd9de',
			colorTextDisplay: '#f3f2f4',
			colorSideNavText: '#fcee0a',
			colorTopNavText: '#fcee0a',
			colorCoverText: '#f3f2f4',
			colorLines: '#0f380f',
			colorDots: '#071b07',
		},
		coverPage: {
			font: 'Bungee',
			darkBackground: true,
			backgroundStyle: 'mesh',
			backgroundSeed: 777,
			backgroundComplexity: 8,
			backgroundPalette: ['#1a0b2e', '#0ea5e9', '#fcee0a'],
		},
		topNav: { font: 'Orbitron' },
		sideNav: { font: 'Rajdhani' },
	},
};

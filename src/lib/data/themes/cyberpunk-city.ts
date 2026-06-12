import type { Theme } from '../themes';

export const CyberpunkCity: Theme = {
	id: 'cyberpunk-city',
	name: 'Teenage Mutant Cyberpunk',
	description: 'Neon hues, dark mode, and a futuristic mesh background.',
	icon: '🌃',
	config: {
		design: {
			font: 'VT323',
			fontDisplay: 'Press Start 2P',
			fontDisplayScale: 0.6,
			colorBg: '#0d0221',
			colorNavBg: '#060112',
			colorText: '#3f5a3f',
			colorTextDisplay: '#2e4c2e',
			colorSideNavText: '#ef4444',
			colorTopNavText: '#fcee0a',
			colorCoverText: '#2e4c2e',
			colorLines: '#0f380f',
			colorDots: '#071b07',
		},
		coverPage: {
			font: 'Press Start 2P',
			darkBackground: true,
			backgroundStyle: 'neon-tubes',
			backgroundSeed: 777,
			backgroundComplexity: 8,
			backgroundPalette: ['#1a0b2e', '#0ea5e9', '#fcee0a'],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
	},
};

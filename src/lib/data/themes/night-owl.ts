import type { Theme } from '../themes';

export const NightOwl: Theme = {
	id: 'night-owl',
	name: 'Night Owl',
	description: 'Designed for late-night coding and readability.',
	icon: '🦉',
	config: {
		design: {
			font: 'Inter',
			fontDisplay: 'Space Mono',
			colorBg: '#011627',
			colorNavBg: '#01111d',
			colorText: '#475e71',
			colorTextDisplay: '#375165',
			colorSideNavText: '#82aaff',
			colorTopNavText: '#82aaff',
			colorCoverText: '#375165',
			colorLines: '#1d3b53',
			colorDots: '#0b253a',
		},
		coverPage: {
			font: 'DM Serif Display',
			darkBackground: true,
			backgroundStyle: 'starlight',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#011627","#0b2942","#1d3b53","#82aaff","#c792ea"],
		},
		topNav: { font: 'Inter' },
		sideNav: { font: 'Inter' },
	},
};

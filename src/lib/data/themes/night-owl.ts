import type { Theme } from '../themes';

export const NightOwl: Theme = {
	id: 'night-owl',
	name: 'Night Owl',
	description: 'Designed for late-night coding and readability.',
	icon: '🦉',
	config: {
		design: {
			font: 'Indie Flower',
			fontDisplay: 'Caveat Brush',
			colorBg: '#011627',
			colorNavBg: '#011e36',
			colorText: '#d6deeb',
			colorTextDisplay: '#ffffff',
			colorSideNavText: '#d6deeb',
			colorTopNavText: '#d6deeb',
			colorCoverText: '#82aaff',
			colorLines: '#033d6d',
			colorDots: '#022c4f',
		},
		coverPage: {
			font: 'Parisienne',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#011627","#0b2942","#1d3b53","#82aaff","#c792ea"],
		},
		topNav: { font: 'Parisienne' },
		sideNav: { font: 'Great Vibes' },
	},
};

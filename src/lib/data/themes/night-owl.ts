import type { Theme } from '../themes';

export const NightOwl: Theme = {
	id: 'night-owl',
	name: 'Night Owl',
	description: 'Designed for late-night coding and readability.',
	icon: '🦉',
	config: {
		design: {
			font: 'Mulish',
			fontDisplay: 'Poppins',
			colorBg: '#011627',
			colorNavBg: '#01111d',
			colorText: '#d9dcdf',
			colorTextDisplay: '#f2f3f4',
			colorSideNavText: '#82aaff',
			colorTopNavText: '#82aaff',
			colorCoverText: '#f2f3f4',
			colorLines: '#1d3b53',
			colorDots: '#0b253a',
		},
		coverPage: {
			font: 'Montserrat',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#011627","#0b2942","#1d3b53","#82aaff","#c792ea"],
		},
		topNav: { font: 'Poppins' },
		sideNav: { font: 'Mulish' },
	},
};

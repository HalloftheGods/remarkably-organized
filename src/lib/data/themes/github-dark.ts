import type { Theme } from '../themes';

export const GitHubDark: Theme = {
	id: 'github-dark',
	name: 'GitHub Dark',
	description: 'Classic GitHub dark mode, optimized for accessibility.',
	icon: '🐙',
	config: {
		design: {
			font: 'Fira Code',
			fontDisplay: 'Roboto Slab',
			colorBg: '#0d1117',
			colorNavBg: '#161b22',
			colorText: '#585b61',
			colorTextDisplay: '#494d54',
			colorSideNavText: '#58a6ff',
			colorTopNavText: '#58a6ff',
			colorCoverText: '#494d54',
			colorLines: '#30363d',
			colorDots: '#21262d',
		},
		coverPage: {
			font: 'Fira Code',
			darkBackground: true,
			backgroundStyle: 'circuit-board',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#0d1117","#161b22","#30363d","#58a6ff","#8b949e"],
		},
		topNav: { font: 'Inconsolata' },
		sideNav: { font: 'Inconsolata' },
	},
};

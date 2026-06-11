import type { Theme } from '../themes';

export const GitHubDark: Theme = {
	id: 'github-dark',
	name: 'GitHub Dark',
	description: 'Classic GitHub dark mode, optimized for accessibility.',
	icon: '🐙',
	config: {
		design: {
			font: 'Roboto',
			fontDisplay: 'Inter',
			colorBg: '#0d1117',
			colorNavBg: '#161b22',
			colorText: '#dbdbdc',
			colorTextDisplay: '#f3f3f3',
			colorSideNavText: '#58a6ff',
			colorTopNavText: '#58a6ff',
			colorCoverText: '#f3f3f3',
			colorLines: '#30363d',
			colorDots: '#21262d',
		},
		coverPage: {
			font: 'Space Mono',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#0d1117","#161b22","#30363d","#58a6ff","#8b949e"],
		},
		topNav: { font: 'Inter' },
		sideNav: { font: 'Roboto Mono' },
	},
};

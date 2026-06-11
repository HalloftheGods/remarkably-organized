import type { Theme } from '../themes';

export const GitHubDark: Theme = {
	id: 'github-dark',
	name: 'GitHub Dark',
	description: 'Classic GitHub dark mode, optimized for accessibility.',
	icon: '🐙',
	config: {
		design: {
			font: 'Indie Flower',
			fontDisplay: 'Pacifico',
			colorBg: '#0d1117',
			colorNavBg: '#131821',
			colorText: '#c9d1d9',
			colorTextDisplay: '#f0f6fc',
			colorSideNavText: '#c9d1d9',
			colorTopNavText: '#c9d1d9',
			colorCoverText: '#58a6ff',
			colorLines: '#273345',
			colorDots: '#1c2431',
		},
		coverPage: {
			font: 'Satisfy',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#0d1117","#161b22","#30363d","#58a6ff","#8b949e"],
		},
		topNav: { font: 'Patrick Hand' },
		sideNav: { font: 'Sacramento' },
	},
};

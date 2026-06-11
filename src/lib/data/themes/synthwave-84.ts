import type { Theme } from '../themes';

export const SynthWave84: Theme = {
	id: 'synthwave-84',
	name: 'SynthWave 84',
	description: 'Neon nostalgia with glowing pinks and blues.',
	icon: '🌆',
	config: {
		design: {
			font: 'Rajdhani',
			fontDisplay: 'Righteous',
			colorBg: '#2b213a',
			colorNavBg: '#241b2f',
			colorText: '#dfdee1',
			colorTextDisplay: '#f4f4f5',
			colorSideNavText: '#36f9f6',
			colorTopNavText: '#36f9f6',
			colorCoverText: '#f4f4f5',
			colorLines: '#43325a',
			colorDots: '#36284a',
		},
		coverPage: {
			font: 'Orbitron',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#2b213a","#34294f","#4a3b71","#f92aad","#36f9f6"],
		},
		topNav: { font: 'Righteous' },
		sideNav: { font: 'Rajdhani' },
	},
};

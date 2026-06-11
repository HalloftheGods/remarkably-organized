import type { Theme } from '../themes';

export const SynthWave84: Theme = {
	id: 'synthwave-84',
	name: 'SynthWave 84',
	description: 'Neon nostalgia with glowing pinks and blues.',
	icon: '🌆',
	config: {
		design: {
			font: 'Patrick Hand',
			fontDisplay: 'Amatic SC',
			colorBg: '#2b213a',
			colorNavBg: '#322744',
			colorText: '#f8f8f2',
			colorTextDisplay: '#ffffff',
			colorSideNavText: '#f8f8f2',
			colorTopNavText: '#f8f8f2',
			colorCoverText: '#f92aad',
			colorLines: '#4d3b68',
			colorDots: '#3e3054',
		},
		coverPage: {
			font: 'Permanent Marker',
			darkBackground: true,
			backgroundStyle: 'abstract',
			backgroundSeed: Math.floor(Math.random() * 1000),
			backgroundComplexity: 4,
			backgroundPalette: ["#2b213a","#34294f","#4a3b71","#f92aad","#36f9f6"],
		},
		topNav: { font: 'Yellowtail' },
		sideNav: { font: 'Satisfy' },
	},
};

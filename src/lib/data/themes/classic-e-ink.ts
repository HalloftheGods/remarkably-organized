import type { Theme } from '../themes';

export const ClassicEInk: Theme = {
	id: "classic-e-ink",
	name: "Classic E-Ink",
	description: "Optimized high-contrast layout for e-ink devices.",
	icon: "🖋️",
	config: {
		design: {
			font: "Open Sans",
			fontDisplay: "Open Sans",
			fontScale: 1,
			fontDisplayScale: 1,
			colorBg: "#f4f4f4",
			colorNavBg: "#e9e9e9",
			colorText: "#000000",
			colorTextDisplay: "#000000",
			colorSideNavText: "#000000",
			colorTopNavText: "#000000",
			colorCoverText: "#000000",
			colorLines: "#bbbbbb",
			colorDots: "#dddddd"
		},
		coverPage: {
			font: "Open Sans",
			darkBackground: false,
			backgroundStyle: "vintage-wallpaper",
			backgroundSeed: 101,
			backgroundComplexity: 5,
			backgroundPalette: [
				"#000000",
				"#555555",
				"#aaaaaa"
			]
		},
		topNav: {
			font: "Open Sans",
			fontSize: 1
		},
		sideNav: {
			font: "Open Sans",
			fontSize: 1
		},
		dashboardPage: {
			fontSize: 0.75
		}
	}
};

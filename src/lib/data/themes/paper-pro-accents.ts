import type { Theme } from '../themes';

export const PaperProAccents: Theme = {
	id: "paper-pro-accents",
	name: "Paper Pro Accents",
	description: "Utilizes the new color display with subtle red and blue accents.",
	icon: "🎨",
	config: {
		design: {
			font: "Work Sans",
			fontDisplay: "Montserrat",
			fontScale: 1,
			fontDisplayScale: 1,
			colorBg: "#ffffff",
			colorNavBg: "#f0f0f0",
			colorText: "#2e3338",
			colorTextDisplay: "#a39e8f",
			colorSideNavText: "#a39e8f",
			colorTopNavText: "#a39e8f",
			colorCoverText: "#5e5955",
			colorLines: "#cccccc",
			colorDots: "#eeeeee"
		},
		coverPage: {
			font: "Montserrat",
			darkBackground: true,
			backgroundStyle: "origami",
			backgroundSeed: 202,
			backgroundComplexity: 6,
			backgroundPalette: [
				"#111111",
				"#aaccff",
				"#ffaaaa"
			]
		},
		topNav: {
			font: "Work Sans",
			fontSize: 1
		},
		sideNav: {
			font: "Work Sans",
			fontSize: 1
		},
		dashboardPage: {
			fontSize: 0.75
		}
	}
};

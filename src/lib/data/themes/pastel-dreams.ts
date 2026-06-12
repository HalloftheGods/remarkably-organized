import type { Theme } from '../themes';

export const PastelDreams: Theme = {
	id: "pastel-dreams",
	name: "Pastel Dreams",
	description: "Soft pink lines and playful fonts.",
	icon: "🌸",
	config: {
		design: {
			font: "Quicksand",
			fontDisplay: "Fredoka One",
			fontScale: 1,
			fontDisplayScale: 1,
			colorBg: "#fdf6e3",
			colorNavBg: "#f5ead2",
			colorText: "#f0a8a9",
			colorTextDisplay: "#f0a8a9",
			colorSideNavText: "#dd3c8e",
			colorTopNavText: "#dd3c8e",
			colorCoverText: "#f0a8a9",
			colorLines: "#e0d6c8",
			colorDots: "#f0e6d8"
		},
		coverPage: {
			font: "Pacifico",
			darkBackground: false,
			backgroundStyle: "holographic",
			backgroundSeed: 303,
			backgroundComplexity: 8,
			backgroundPalette: [
				"#ffcce6",
				"#cce6ff",
				"#e6ccff"
			]
		},
		topNav: {
			font: "Nunito",
			fontSize: 1
		},
		sideNav: {
			font: "Nunito",
			fontSize: 1
		},
		dashboardPage: {
			fontSize: 0.75
		}
	}
};

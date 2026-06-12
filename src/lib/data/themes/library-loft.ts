import type { Theme } from '../themes';

export const LibraryLoft: Theme = {
	id: "library-loft",
	name: "Library Loft",
	description: "Rich lounge tones with vintage bookshop warmth and quiet luxury.",
	icon: "📖",
	config: {
		design: {
			font: "Lora",
			fontDisplay: "Bitter",
			fontScale: 1,
			fontDisplayScale: 1,
			colorBg: "#3e342f",
			colorNavBg: "#2d2522",
			colorText: "#867a74",
			colorTextDisplay: "#766861",
			colorSideNavText: "#d2a572",
			colorTopNavText: "#d2a572",
			colorCoverText: "#766861",
			colorLines: "#6e5e56",
			colorDots: "#544741"
		},
		coverPage: {
			font: "Crimson Text",
			darkBackground: false,
			backgroundStyle: "vintage-wallpaper",
			backgroundSeed: 257,
			backgroundComplexity: 6,
			backgroundPalette: [
				"#7f5845",
				"#d8c4b2",
				"#f7efe6"
			]
		},
		topNav: {
			font: "Karla",
			fontSize: 1
		},
		sideNav: {
			font: "Karla",
			fontSize: 1
		},
		dashboardPage: {
			fontSize: 0.75
		}
	}
};

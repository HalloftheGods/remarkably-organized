export interface Theme {
	id: string;
	name: string;
	description: string;
	icon: string;
	config: {
		design: {
			font: string;
			fontDisplay: string;
			fontScale?: number;
			fontDisplayScale?: number;
			colorBg: string;
			colorNavBg: string;
			colorText: string;
			colorTextDisplay?: string;
			colorSideNavText?: string;
			colorTopNavText?: string;
			colorCoverText?: string;
			colorLines: string;
			colorDots: string;
		};
		coverPage: {
			font: string;
			darkBackground: boolean;
			backgroundStyle?:
				| 'none'
				| 'mesh'
				| 'waves'
				| 'bauhaus'
				| 'halftone'
				| 'glassmorphism'
				| 'sacred-geometry'
				| 'emoji'
				| 'fractals'
				| 'platonic'
				| 'pokerface'
				| 'magician';
			backgroundSeed?: number;
			backgroundComplexity?: number;
			backgroundPalette?: string[];
		};
		topNav: {
			font: string;
			fontSize?: number;
		};
		sideNav: {
			font: string;
			fontSize?: number;
		};
		dashboardPage?: {
			fontSize: number;
		};
	};
}

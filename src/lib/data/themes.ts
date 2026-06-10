export interface Theme {
	id: string;
	name: string;
	description: string;
	icon: string;
	config: {
		design: {
			font: string;
			fontDisplay: string;
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
		};
		sideNav: {
			font: string;
		};
		dashboardPage?: {
			fontSize: number;
		};
	};
}

export { THEMES } from './themes/index';

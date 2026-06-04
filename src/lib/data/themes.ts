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
				| 'geometry'
				| 'emoji';
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

export const THEMES: Theme[] = [
	{
		id: 'classic-e-ink',
		name: 'Classic E-Ink',
		description: 'The standard grayscale layout.',
		icon: '🖋️',
		config: {
			design: {
				font: 'Roboto',
				fontDisplay: 'Roboto Slab',
				colorBg: '#ffffff',
				colorNavBg: '#f2f2f2',
				colorText: '#000000',
				colorLines: '#cccccc',
				colorDots: '#7a7a7a',
			},
			coverPage: {
				font: 'Roboto Slab',
				darkBackground: false,
				backgroundStyle: 'halftone',
				backgroundSeed: 101,
				backgroundComplexity: 5,
				backgroundPalette: ['#e0e0e0', '#cccccc', '#999999'],
			},
			topNav: { font: 'Roboto' },
			sideNav: { font: 'Roboto' },
		},
	},
	{
		id: 'paper-pro-accents',
		name: 'Paper Pro Accents',
		description: 'Utilizes the new color display with subtle red and blue accents.',
		icon: '🎨',
		config: {
			design: {
				font: 'Montserrat',
				fontDisplay: 'Poppins',
				colorBg: '#ffffff',
				colorNavBg: '#f9f9f9',
				colorText: '#000000',
				colorLines: '#aaccff',
				colorDots: '#ffaaaa',
			},
			coverPage: {
				font: 'Poppins',
				darkBackground: true,
				backgroundStyle: 'waves',
				backgroundSeed: 202,
				backgroundComplexity: 6,
				backgroundPalette: ['#111111', '#aaccff', '#ffaaaa'],
			},
			topNav: { font: 'Montserrat' },
			sideNav: { font: 'Montserrat' },
		},
	},
	{
		id: 'pastel-dreams',
		name: 'Pastel Dreams',
		description: 'Soft pink lines and playful fonts.',
		icon: '🌸',
		config: {
			design: {
				font: 'Caveat',
				fontDisplay: 'Pacifico',
				colorBg: '#ffffff',
				colorNavBg: '#fff0f5',
				colorText: '#4a4a4a',
				colorLines: '#ffcce6',
				colorDots: '#cce6ff',
			},
			coverPage: {
				font: 'Pacifico',
				darkBackground: false,
				backgroundStyle: 'glassmorphism',
				backgroundSeed: 303,
				backgroundComplexity: 8,
				backgroundPalette: ['#ffcce6', '#cce6ff', '#e6ccff'],
			},
			topNav: { font: 'Caveat' },
			sideNav: { font: 'Caveat' },
		},
	},
	{
		id: 'midnight-hacker',
		name: 'Midnight Nerd',
		description: 'Dark cover with terminal-inspired fonts and sharp contrast.',
		icon: '💻',
		config: {
			design: {
				font: 'Roboto Condensed',
				fontDisplay: 'Anton',
				colorBg: '#000000',
				colorNavBg: '#222222',
				colorText: '#ffffff',
				colorLines: '#888888',
				colorDots: '#bbbbbb',
			},
			coverPage: {
				font: 'Anton',
				darkBackground: true,
				backgroundStyle: 'mesh',
				backgroundSeed: 404,
				backgroundComplexity: 10,
				backgroundPalette: ['#1a1a1a', '#00ff00', '#004400'],
			},
			topNav: { font: 'Roboto Condensed' },
			sideNav: { font: 'Roboto Condensed' },
			dashboardPage: { fontSize: 0.85 },
		},
	},
	{
		id: 'cyberpunk-city',
		name: 'Cyberpunk City',
		description: 'Neon hues, dark mode, and a futuristic mesh background.',
		icon: '🌃',
		config: {
			design: {
				font: 'Rajdhani',
				fontDisplay: 'Orbitron',
				colorBg: '#0b0b1a',
				colorNavBg: '#15152b',
				colorText: '#e0e0e0',
				colorLines: '#ff0099',
				colorDots: '#00ffff',
			},
			coverPage: {
				font: 'Orbitron',
				darkBackground: true,
				backgroundStyle: 'mesh',
				backgroundSeed: 777,
				backgroundComplexity: 8,
				backgroundPalette: ['#0b0b1a', '#ff0099', '#00ffff'],
			},
			topNav: { font: 'Rajdhani' },
			sideNav: { font: 'Rajdhani' },
		},
	},
	{
		id: 'minimalist-muji',
		name: 'Minimalist Muji',
		description: 'A very warm, minimal paper feel with simple geometric backgrounds.',
		icon: '📔',
		config: {
			design: {
				font: 'Inter',
				fontDisplay: 'Noto Sans',
				colorBg: '#f7f5f0',
				colorNavBg: '#eae7de',
				colorText: '#3a3835',
				colorLines: '#a09c95',
				colorDots: '#c0bbb4',
			},
			coverPage: {
				font: 'Noto Sans',
				darkBackground: false,
				backgroundStyle: 'bauhaus',
				backgroundSeed: 123,
				backgroundComplexity: 4,
				backgroundPalette: ['#d9534f', '#f0ad4e', '#5bc0de'],
			},
			topNav: { font: 'Inter' },
			sideNav: { font: 'Inter' },
		},
	},
	{
		id: 'nordic-forest',
		name: 'Nordic Forest',
		description: 'Premium earthy tones with intricate sacred geometry.',
		icon: '🌲',
		config: {
			design: {
				font: 'Merriweather',
				fontDisplay: 'Playfair Display',
				colorBg: '#f4f6f4',
				colorNavBg: '#e6ebe6',
				colorText: '#2d4a3e',
				colorLines: '#8ea89a',
				colorDots: '#b0c4b9',
			},
			coverPage: {
				font: 'Playfair Display',
				darkBackground: false,
				backgroundStyle: 'geometry',
				backgroundSeed: 15,
				backgroundComplexity: 7,
				backgroundPalette: ['#2d4a3e', '#5a7d6c', '#8ea89a'],
			},
			topNav: { font: 'Merriweather' },
			sideNav: { font: 'Merriweather' },
		},
	},
	{
		id: 'vaporwave-aesthetics',
		name: 'Vaporwave',
		description: 'Retro 80s synthwave vibes with a scattered emoji background.',
		icon: '🌴',
		config: {
			design: {
				font: 'VT323',
				fontDisplay: 'Righteous',
				colorBg: '#2b1b54',
				colorNavBg: '#1c1138',
				colorText: '#ffb3ba',
				colorLines: '#bae1ff',
				colorDots: '#baffc9',
			},
			coverPage: {
				font: 'Righteous',
				darkBackground: true,
				backgroundStyle: 'emoji',
				backgroundSeed: 88,
				backgroundComplexity: 9,
				backgroundPalette: ['#2b1b54', '#ffb3ba', '#bae1ff'],
			},
			topNav: { font: 'VT323' },
			sideNav: { font: 'VT323' },
		},
	},
	{
		id: 'hall-of-the-gods',
		name: 'Hall of the Gods',
		description: 'Deep browns, golds, and blacks. Perfect for dark mode journaling.',
		icon: '⚜️',
		config: {
			design: {
				font: 'Crimson Text',
				fontDisplay: 'Cinzel',
				colorBg: '#1a1818',
				colorNavBg: '#262323',
				colorText: '#e0d8c8',
				colorLines: '#d4af37',
				colorDots: '#8a7224',
			},
			coverPage: {
				font: 'Cinzel',
				darkBackground: true,
				backgroundStyle: 'geometry',
				backgroundSeed: 999,
				backgroundComplexity: 8,
				backgroundPalette: ['#1a1818', '#d4af37', '#8a7224'],
			},
			topNav: { font: 'Crimson Text' },
			sideNav: { font: 'Crimson Text' },
		},
	},
];

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
				| 'flower-of-life'
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
				backgroundStyle: 'flower-of-life',
				backgroundSeed: 999,
				backgroundComplexity: 8,
				backgroundPalette: ['#1a1818', '#d4af37', '#8a7224'],
			},
			topNav: { font: 'Crimson Text' },
			sideNav: { font: 'Crimson Text' },
		},
	},
	{
		id: 'midnight-nerd',
		name: 'Midnight Nerd',
		description:
			'Deep teal, vivid magenta, and dark voids. A homage to the beautiful aesthetic of MidnightNerd.com',
		icon: '🤓',
		config: {
			design: {
				font: 'Inter',
				fontDisplay: 'Outfit',
				colorBg: '#09131a',
				colorNavBg: '#04090d',
				colorText: '#d1e8ed',
				colorLines: '#0b8a9e',
				colorDots: '#84205a',
			},
			coverPage: {
				font: 'Outfit',
				darkBackground: true,
				backgroundStyle: 'mesh',
				backgroundSeed: 404,
				backgroundComplexity: 6,
				backgroundPalette: ['#09131a', '#84205a', '#0b8a9e', '#04090d'],
			},
			topNav: { font: 'Outfit' },
			sideNav: { font: 'Inter' },
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
		id: 'neon-hacker',
		name: 'Neon Hacker',
		description: 'Dark cover with terminal-inspired fonts and sharp contrast.',
		icon: '💻',
		config: {
			design: {
				font: 'Roboto Condensed',
				fontDisplay: 'Anton',
				colorBg: '#0a0b10',
				colorNavBg: '#363746ff',
				colorText: '#39ff14',
				colorLines: '#ff007f',
				colorDots: '#00ffff',
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
		id: 'nordic-forest',
		name: 'Nordic Forest',
		description: 'Premium earthy tones with intricate flower of life patterns.',
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
				backgroundStyle: 'flower-of-life',
				backgroundSeed: 15,
				backgroundComplexity: 7,
				backgroundPalette: ['#2d4a3e', '#5a7d6c', '#8ea89a'],
			},
			topNav: { font: 'Merriweather' },
			sideNav: { font: 'Merriweather' },
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
		id: 'vaporwave-aesthetics',
		name: 'Vaporwave',
		description: 'Retro 80s synthwave vibes with a scattered emoji background.',
		icon: '🌴', // sunglasses
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
		id: 'worldwide-webwork',
		name: 'Worldwide Webwork',
		description:
			'A dark, high-contrast theme featuring neon green and deep purple accents inspired by worldwidewebwork.com.',
		icon: '🌐',
		config: {
			design: {
				font: 'Inter',
				fontDisplay: 'Orbitron',
				colorBg: '#000000',
				colorNavBg: '#111111',
				colorText: '#ADB5B7',
				colorLines: '#3dee98',
				colorDots: '#432C68',
			},
			coverPage: {
				font: 'Orbitron',
				darkBackground: true,
				backgroundStyle: 'mesh',
				backgroundSeed: 1989,
				backgroundComplexity: 8,
				backgroundPalette: ['#000000', '#3dee98', '#432C68'],
			},
			topNav: { font: 'Inter' },
			sideNav: { font: 'Inter' },
		},
	},
	{
		id: 'sunset-studio',
		name: 'Sunset Studio',
		description: 'Warm ceramics, soft peach, and a hand-lettered editorial vibe.',
		icon: '🌇',
		config: {
			design: {
				font: 'PT Serif',
				fontDisplay: 'Abril Fatface',
				colorBg: '#fff3ec',
				colorNavBg: '#f1c9ab',
				colorText: '#4a2f24',
				colorLines: '#d98f72',
				colorDots: '#b46951',
			},
			coverPage: {
				font: 'Abril Fatface',
				darkBackground: false,
				backgroundStyle: 'bauhaus',
				backgroundSeed: 511,
				backgroundComplexity: 6,
				backgroundPalette: ['#f7c6a5', '#e39c78', '#6b4b41'],
			},
			topNav: { font: 'PT Serif' },
			sideNav: { font: 'PT Serif' },
		},
	},
	{
		id: 'coffee-shop',
		name: 'Coffee Shop',
		description: 'Mocha tones, paper textures, and a cozy café energy.',
		icon: '☕',
		config: {
			design: {
				font: 'DM Serif Display',
				fontDisplay: 'Lobster',
				colorBg: '#f8efdf',
				colorNavBg: '#6b4f35',
				colorText: '#2f1f15',
				colorLines: '#a27b58',
				colorDots: '#d8c3a5',
			},
			coverPage: {
				font: 'Lobster',
				darkBackground: false,
				backgroundStyle: 'glassmorphism',
				backgroundSeed: 622,
				backgroundComplexity: 7,
				backgroundPalette: ['#6b4f35', '#d8c3a5', '#f8efdf'],
			},
			topNav: { font: 'DM Serif Display' },
			sideNav: { font: 'DM Serif Display' },
		},
	},
	{
		id: 'garden-chapter',
		name: 'Garden Chapter',
		description: 'Fresh sage, terracotta clay, and botanical charm.',
		icon: '🪴',
		config: {
			design: {
				font: 'Indie Flower',
				fontDisplay: 'Caveat Brush',
				colorBg: '#f3f6f0',
				colorNavBg: '#d7e4d4',
				colorText: '#3f5642',
				colorLines: '#92aa8b',
				colorDots: '#b29b84',
			},
			coverPage: {
				font: 'Caveat Brush',
				darkBackground: false,
				backgroundStyle: 'flower-of-life',
				backgroundSeed: 720,
				backgroundComplexity: 5,
				backgroundPalette: ['#3f5642', '#d7e4d4', '#b29b84'],
			},
			topNav: { font: 'Indie Flower' },
			sideNav: { font: 'Indie Flower' },
		},
	},
	{
		id: 'studio-noir',
		name: 'Studio Noir',
		description: 'A modern editorial palette with soft shadow and cream contrast.',
		icon: '🎬',
		config: {
			design: {
				font: 'Bebas Neue',
				fontDisplay: 'Abril Fatface',
				colorBg: '#101115',
				colorNavBg: '#1e1d22',
				colorText: '#eeebe6',
				colorLines: '#7d7470',
				colorDots: '#c1b4aa',
			},
			coverPage: {
				font: 'Abril Fatface',
				darkBackground: true,
				backgroundStyle: 'halftone',
				backgroundSeed: 817,
				backgroundComplexity: 6,
				backgroundPalette: ['#101115', '#7d7470', '#eeebe6'],
			},
			topNav: { font: 'Bebas Neue' },
			sideNav: { font: 'Bebas Neue' },
		},
	},
	{
		id: 'stardust-notes',
		name: 'Stardust Notes',
		description:
			'A celestial palette of deep violet, silver shimmer, and starry accents.',
		icon: '🌌',
		config: {
			design: {
				font: 'Acme',
				fontDisplay: 'Rancho',
				colorBg: '#12162d',
				colorNavBg: '#1f2348',
				colorText: '#e8eaf9',
				colorLines: '#7a7fd6',
				colorDots: '#a3a7ff',
			},
			coverPage: {
				font: 'Rancho',
				darkBackground: true,
				backgroundStyle: 'fractals',
				backgroundSeed: 931,
				backgroundComplexity: 9,
				backgroundPalette: ['#12162d', '#7a7fd6', '#e8eaf9'],
			},
			topNav: { font: 'Acme' },
			sideNav: { font: 'Acme' },
		},
	},
	{
		id: 'pixel-punk',
		name: 'Pixel Punk',
		description: 'Electric pixel energy with neon contrast and arcade-inspired styling.',
		icon: '🕹️',
		config: {
			design: {
				font: 'VT323',
				fontDisplay: 'Bebas Neue',
				colorBg: '#07070d',
				colorNavBg: '#121224',
				colorText: '#f7f8ff',
				colorLines: '#ff28c4',
				colorDots: '#14e6ff',
			},
			coverPage: {
				font: 'Bebas Neue',
				darkBackground: true,
				backgroundStyle: 'mesh',
				backgroundSeed: 884,
				backgroundComplexity: 10,
				backgroundPalette: ['#07070d', '#ff28c4', '#14e6ff'],
			},
			topNav: { font: 'VT323' },
			sideNav: { font: 'VT323' },
			dashboardPage: { fontSize: 0.88 },
		},
	},
	{
		id: 'ocean-atelier',
		name: 'Ocean Atelier',
		description: 'Breezy blues, sandy neutrals, and a relaxed coastal feel.',
		icon: '🌊',
		config: {
			design: {
				font: 'Just Another Hand',
				fontDisplay: 'Caveat Brush',
				colorBg: '#eef7fa',
				colorNavBg: '#a1ced8',
				colorText: '#22515a',
				colorLines: '#79b1bf',
				colorDots: '#d5e8ee',
			},
			coverPage: {
				font: 'Caveat Brush',
				darkBackground: false,
				backgroundStyle: 'waves',
				backgroundSeed: 423,
				backgroundComplexity: 7,
				backgroundPalette: ['#a1ced8', '#eef7fa', '#22515a'],
			},
			topNav: { font: 'Just Another Hand' },
			sideNav: { font: 'Just Another Hand' },
		},
	},
	{
		id: 'chalkboard-atelier',
		name: 'Chalkboard Atelier',
		description: 'Dark green chalkboard textures with hand-drawn accent lines.',
		icon: '🪄',
		config: {
			design: {
				font: 'Shadows Into Light Two',
				fontDisplay: 'Dancing Script',
				colorBg: '#14240f',
				colorNavBg: '#1f3c21',
				colorText: '#f7f2dd',
				colorLines: '#7ca678',
				colorDots: '#b9c9a4',
			},
			coverPage: {
				font: 'Dancing Script',
				darkBackground: true,
				backgroundStyle: 'bauhaus',
				backgroundSeed: 532,
				backgroundComplexity: 5,
				backgroundPalette: ['#14240f', '#7ca678', '#f7f2dd'],
			},
			topNav: { font: 'Shadows Into Light Two' },
			sideNav: { font: 'Shadows Into Light Two' },
		},
	},
	{
		id: 'library-loft',
		name: 'Library Loft',
		description: 'Rich lounge tones with vintage bookshop warmth and quiet luxury.',
		icon: '📖',
		config: {
			design: {
				font: 'PT Serif',
				fontDisplay: 'Lilita One',
				colorBg: '#f7efe6',
				colorNavBg: '#7f5845',
				colorText: '#32261d',
				colorLines: '#b09280',
				colorDots: '#d8c4b2',
			},
			coverPage: {
				font: 'Lilita One',
				darkBackground: false,
				backgroundStyle: 'halftone',
				backgroundSeed: 257,
				backgroundComplexity: 6,
				backgroundPalette: ['#7f5845', '#d8c4b2', '#f7efe6'],
			},
			topNav: { font: 'PT Serif' },
			sideNav: { font: 'PT Serif' },
		},
	},
	{
		id: 'festival-folio',
		name: 'Festival Folio',
		description: 'Bright confetti hues and cheerful modern lettering.',
		icon: '🎪',
		config: {
			design: {
				font: 'Permanent Marker',
				fontDisplay: 'Satisfy',
				colorBg: '#fff8f1',
				colorNavBg: '#ffb600',
				colorText: '#2f2a22',
				colorLines: '#ff6f52',
				colorDots: '#4cbcc9',
			},
			coverPage: {
				font: 'Satisfy',
				darkBackground: false,
				backgroundStyle: 'emoji',
				backgroundSeed: 302,
				backgroundComplexity: 8,
				backgroundPalette: ['#ffb600', '#ff6f52', '#4cbcc9'],
			},
			topNav: { font: 'Permanent Marker' },
			sideNav: { font: 'Permanent Marker' },
		},
	},
	{
		id: 'meadow-memo',
		name: 'Meadow Memo',
		description: 'Light wildflower softness with a clean, handwritten note style.',
		icon: '🍃',
		config: {
			design: {
				font: 'Satisfy',
				fontDisplay: 'PT Serif',
				colorBg: '#f7fbf4',
				colorNavBg: '#cfe3c9',
				colorText: '#3a4d3b',
				colorLines: '#9eb99e',
				colorDots: '#d7e0d3',
			},
			coverPage: {
				font: 'PT Serif',
				darkBackground: false,
				backgroundStyle: 'waves',
				backgroundSeed: 752,
				backgroundComplexity: 6,
				backgroundPalette: ['#cfe3c9', '#f7fbf4', '#3a4d3b'],
			},
			topNav: { font: 'Satisfy' },
			sideNav: { font: 'Satisfy' },
		},
	},
	{
		id: 'vintage-cassette',
		name: 'Vintage Cassette',
		description: 'Retro analog colors, warm tape texture, and bold music-inspired type.',
		icon: '📼',
		config: {
			design: {
				font: 'Lilita One',
				fontDisplay: 'Permanent Marker',
				colorBg: '#f5ebe7',
				colorNavBg: '#8c5b48',
				colorText: '#2f241e',
				colorLines: '#d6a673',
				colorDots: '#c3b0a0',
			},
			coverPage: {
				font: 'Permanent Marker',
				darkBackground: false,
				backgroundStyle: 'bauhaus',
				backgroundSeed: 181,
				backgroundComplexity: 7,
				backgroundPalette: ['#8c5b48', '#d6a673', '#f5ebe7'],
			},
			topNav: { font: 'Lilita One' },
			sideNav: { font: 'Lilita One' },
		},
	},
];

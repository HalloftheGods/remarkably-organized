export interface Theme {
	id: string;
	name: string;
	description: string;
	icon: string;
	config: {
		design: {
			font: string;
			fontDisplay: string;
			colorText: string;
			colorLines: string;
			colorDots: string;
		};
		coverPage: {
			font: string;
			darkBackground: boolean;
		};
		topNav: {
			font: string;
		};
		sideNav: {
			font: string;
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
				font: 'Noto Sans',
				fontDisplay: 'Noto Serif',
				colorText: '#000000',
				colorLines: '#cccccc',
				colorDots: '#7a7a7a'
			},
			coverPage: { font: 'Noto Serif', darkBackground: false },
			topNav: { font: 'Noto Sans' },
			sideNav: { font: 'Noto Sans' }
		}
	},
	{
		id: 'paper-pro-accents',
		name: 'Paper Pro Accents',
		description: 'Utilizes the new color display with subtle red and blue accents.',
		icon: '🎨',
		config: {
			design: {
				font: 'Inter',
				fontDisplay: 'Outfit',
				colorText: '#000000',
				colorLines: '#aaccff',
				colorDots: '#ffaaaa'
			},
			coverPage: { font: 'Outfit', darkBackground: true },
			topNav: { font: 'Inter' },
			sideNav: { font: 'Inter' }
		}
	},
	{
		id: 'pastel-dreams',
		name: 'Pastel Dreams',
		description: 'Soft pink lines and playful fonts.',
		icon: '🌸',
		config: {
			design: {
				font: 'Quicksand',
				fontDisplay: 'Pacifico',
				colorText: '#4a4a4a',
				colorLines: '#ffcce6',
				colorDots: '#cce6ff'
			},
			coverPage: { font: 'Pacifico', darkBackground: false },
			topNav: { font: 'Quicksand' },
			sideNav: { font: 'Quicksand' }
		}
	},
	{
		id: 'midnight-hacker',
		name: 'Midnight Hacker',
		description: 'Dark cover with terminal-inspired fonts and sharp contrast.',
		icon: '💻',
		config: {
			design: {
				font: 'Fira Code',
				fontDisplay: 'Fira Code',
				colorText: '#000000',
				colorLines: '#888888',
				colorDots: '#bbbbbb'
			},
			coverPage: { font: 'Fira Code', darkBackground: true },
			topNav: { font: 'Fira Code' },
			sideNav: { font: 'Fira Code' }
		}
	}
];

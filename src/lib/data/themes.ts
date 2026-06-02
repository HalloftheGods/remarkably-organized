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
				font: 'Roboto',
				fontDisplay: 'Roboto Slab',
				colorBg: '#ffffff',
				colorNavBg: '#f2f2f2',
				colorText: '#000000',
				colorLines: '#cccccc',
				colorDots: '#7a7a7a',
			},
			coverPage: { font: 'Roboto Slab', darkBackground: false },
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
			coverPage: { font: 'Poppins', darkBackground: true },
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
			coverPage: { font: 'Pacifico', darkBackground: false },
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
			coverPage: { font: 'Anton', darkBackground: true },
			topNav: { font: 'Roboto Condensed' },
			sideNav: { font: 'Roboto Condensed' },
		},
	},
];

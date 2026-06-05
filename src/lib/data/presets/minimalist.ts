import type { Preset } from './types';
import { classicTheme } from './themes';

export const minimalist: Preset = {
	id: 'minimalist',
	name: 'The Minimalist',
	description:
		'A clean slate. Calendar views only, with no daily or weekly notes attached.',
	icon: '✨',
	category: 'essentials',
	config: {
		...classicTheme,
		dashboardPage: { title: '🕊️ Clarity', fontSize: 0.75 },
		weekPage: { disable: false, notePagesAmount: 0, template: 'blank' },
		dayPage: { disable: true },
		collections: [],
		emojis: { disable: true },
	},
};

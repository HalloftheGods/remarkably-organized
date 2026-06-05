import type { Preset } from './types';
import { classicTheme } from './themes';

export const standard: Preset = {
	id: 'standard',
	name: 'The Standard',
	description:
		'The default setup. Balanced layouts for managing daily tasks and schedules.',
	icon: '📅',
	category: 'essentials',
	config: {
		...classicTheme,
		dashboardPage: { title: '🚀 Dashboard' },
		emojis: {
			disable: false,
			q1: '🌱',
			q2: '☀️',
			q3: '🍂',
			q4: '❄️',
			january: '1️⃣',
			february: '2️⃣',
			march: '3️⃣',
			april: '4️⃣',
			may: '5️⃣',
			june: '6️⃣',
			july: '7️⃣',
			august: '8️⃣',
			september: '9️⃣',
			october: '🔟',
			november: '🦃',
			december: '❄️',
		},
	},
};

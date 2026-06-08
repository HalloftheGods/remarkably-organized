import type { Preset } from './types';
import { pastelTheme } from './themes';

export const contentCreator: Preset = {
	id: 'content-creator',
	name: 'The Content Creator',
	description: 'Plan your content pipeline from idea to publication across platforms.',
	icon: '🎥',
	category: 'work',
	config: {
		...pastelTheme,
		dashboardPage: { title: '🎥 Creator Studio' },
		quarterPage: { template: 'overview-quarter', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month-with-notes' },
		weekPage: {
			template: 'agenda-week-notes-columns',
			notePagesTemplate: 'content-planner',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'content-pipeline',
				name: '🎬 Pipeline',
				type: 'content-planner',
				total: 52,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'ideas',
				name: '💡 Ideas',
				type: 'lined',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: { disable: false },
	},
};

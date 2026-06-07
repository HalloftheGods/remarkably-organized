import type { Preset } from './types';
import { cyberpunkTheme } from './themes';

export const musicProducer: Preset = {
	id: 'music-producer',
	name: 'The Producer',
	description:
		'Track sessions, songwriting ideas, release schedules, and practice routines.',
	icon: '🎹',
	category: 'hobbies',
	config: {
		...cyberpunkTheme,
		dashboardPage: { title: '🎹 Studio Console' },
		monthPage: { template: 'calendar-month-with-notes' },
		weekPage: {
			template: 'agenda-week-notes-columns',
			notePagesTemplate: 'session-log',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-timebox',
			notePagesTemplate: 'session-log',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'sessions',
				name: 'Sessions',
				icon: '🎙️',
				type: 'session-log',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'songwriting',
				name: 'Writing',
				icon: '🎵',
				type: 'lined-large',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'releases',
				name: 'Releases',
				icon: '📀',
				type: 'content-planner',
				total: 20,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🎼',
			q2: '🎸',
			q3: '🥁',
			q4: '🎧',
			january: '🎹',
			february: '🎵',
			march: '🎤',
			april: '🎻',
			may: '🎺',
			june: '🪕',
			july: '🎷',
			august: '🎙️',
			september: '📻',
			october: '🎃',
			november: '📀',
			december: '🎄',
		},
	},
};

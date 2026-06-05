import type { Preset } from './types';
import { classicTheme } from './themes';

export const languagePolyglot: Preset = {
	id: 'language-polyglot',
	name: 'The Polyglot',
	description:
		'Track multiple languages with vocab logs, grammar drills, and immersion streaks.',
	icon: '🌍',
	category: 'hobbies',
	config: {
		...classicTheme,
		dashboardPage: { title: '🌍 Language Lab' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		monthPage: { template: 'calendar-month' },
		weekPage: {
			template: 'agenda-week-notes-rows',
			notePagesTemplate: 'language-learning',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-split',
			notePagesTemplate: 'language-learning',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'vocab',
				name: 'Vocabulary Log',
				icon: '📝',
				type: 'language-learning',
				total: 100,
				numPagesPerItem: 1,
				numIndexPages: 2,
			},
			{
				id: 'grammar',
				name: 'Grammar Notes',
				icon: '📐',
				type: 'lined',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		emojis: {
			disable: false,
			q1: '🇫🇷',
			q2: '🇩🇪',
			q3: '🇯🇵',
			q4: '🇰🇷',
			january: '📖',
			february: '🗣️',
			march: '✍️',
			april: '🎧',
			may: '📺',
			june: '🎬',
			july: '🗺️',
			august: '🎭',
			september: '📝',
			october: '🎃',
			november: '📚',
			december: '🌟',
		},
	},
};

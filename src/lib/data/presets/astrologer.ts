import type { Preset } from './types';
import { godTheme } from './themes';

export const astrologer: Preset = {
	id: 'astrologer',
	name: 'The Astrologer',
	description:
		'An occult study of the stars. Track lunar phases, chart transits, and manifest your intentions with this cosmic setup.',
	icon: '🔮',
	category: 'academic',
	config: {
		...godTheme,
		dashboardPage: { title: '🔮 Cosmic Dashboard' },
		yearPage: { notePagesTemplate: 'habit-year-by-month', notePagesAmount: 1 },
		monthPage: {
			template: 'calendar-month-with-notes',
			notePagesTemplate: 'dotted-small',
			notePagesAmount: 1,
		},
		weekPage: {
			template: 'agenda-week-notes',
			notePagesTemplate: 'tarot-draw',
			notePagesAmount: 1,
		},
		dayPage: {
			template: 'agenda-day-mindful',
			notePagesTemplate: 'natal-chart',
			notePagesAmount: 1,
		},
		collections: [
			{
				id: 'tarot-journal',
				name: 'Tarot Draws',
				icon: '🃏',
				type: 'tarot-draw',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'natal-charts',
				name: 'Natal Charts',
				icon: '✨',
				type: 'natal-chart',
				total: 20,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
			{
				id: 'transit-logs',
				name: 'Transit Logs',
				icon: '🔭',
				type: 'lined',
				total: 50,
				numPagesPerItem: 1,
				numIndexPages: 1,
			},
		],
		calendars: [
			{
				url: 'https://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics',
				name: '🌕 Moon Phases',
			},
			{
				url: 'https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics',
				name: '🎉 Public Holidays',
			},
		],
		emojis: {
			disable: false,
			q1: '🌬️',
			q2: '🌍',
			q3: '🔥',
			q4: '💧',
			january: '♑',
			february: '♒',
			march: '♓',
			april: '♈',
			may: '♉',
			june: '♊',
			july: '♋',
			august: '♌',
			september: '♍',
			october: '♎',
			november: '♏',
			december: '♐',
		},
	},
};

export interface Preset {
	id: string;
	name: string;
	description: string;
	icon: string;
	config: any;
}

export const PRESETS: Preset[] = [
	{
		id: 'standard',
		name: 'Standard Productivity',
		description: 'The default setup. Balanced layouts for managing daily tasks and schedules.',
		icon: '📅',
		config: {}
	},
	{
		id: 'minimalist',
		name: 'Minimalist',
		description: 'A clean slate. Calendar views only, with no daily or weekly notes attached.',
		icon: '✨',
		config: {
			weekPage: { disable: false, notePagesAmount: 0, template: 'blank' },
			dayPage: { disable: true },
			collections: []
		}
	},
	{
		id: 'academic',
		name: 'Academic & Student',
		description: 'Starts in August. Uses a 24-hour clock and includes a lined notebook collection.',
		icon: '🎓',
		config: {
			weekPage: { use24HourClock: true },
			dayPage: { use24HourClock: true },
			collections: [
				{
					id: "class-notes",
					name: "Class Notes",
					icon: "📚",
					type: "lined",
					total: 6,
					numPagesPerItem: 10,
					numIndexPages: 1
				}
			]
		}
	},
	{
		id: 'professional',
		name: 'Professional / Manager',
		description: 'Includes meeting minutes, habit trackers, and a finance tracker.',
		icon: '💼',
		config: {
			weekPage: { notePagesTemplate: 'meeting-minutes', notePagesAmount: 1 },
			dayPage: { notePagesTemplate: 'meeting-minutes', notePagesAmount: 1 },
			collections: [
				{
					id: "finance",
					name: "Finances",
					icon: "💰",
					type: "finance-tracker",
					total: 12,
					numPagesPerItem: 1,
					numIndexPages: 0
				},
				{
					id: "meetings",
					name: "Meeting Notes",
					icon: "🤝",
					type: "meeting-minutes",
					total: 20,
					numPagesPerItem: 2,
					numIndexPages: 1
				}
			]
		}
	},
	{
		id: 'author-setup',
		name: "Author's Setup",
		description: "Xopher's personal configuration with custom collections and dark mode.",
		icon: '👑',
		config: {
			"design": {
				"aspectRatio": 0.75,
				"width": 702,
				"font": "Rancho",
				"fontDisplay": "Bebas Neue",
				"colorText": "#000000",
				"colorLines": "#c8c8c8",
				"colorDots": "#646464"
			},
			"date": {
				"timezoneOffset": 7,
				"start": 1767225600000,
				"end": 1798675200000,
				"today": 1780272000000,
				"startWeekOnSunday": true
			},
			"sideNav": {
				"disable": false,
				"showCollectionLinks": true,
				"width": 52,
				"leftSide": false,
				"font": "Acme"
			},
			"topNav": {
				"disable": false,
				"showCollectionLinks": false,
				"height": 45,
				"font": "Acme"
			},
			"coverPage": {
				"disable": false,
				"name": "Xopher \"XP\" Pollard",
				"email": "x@youmeos.com",
				"title": "X's Planner ⌯⌲ 🗓️⋆｡˚2026˚｡⋆✅",
				"showCollectionLinks": true,
				"darkBackground": true,
				"showCurrentDay": false,
				"font": "Roboto Slab"
			},
			"dashboardPage": {
				"disable": false,
				"title": "👋 Welcome",
				"fontSize": 1
			},
			"yearPage": {
				"disable": false,
				"notePagesTemplate": "habit-year-by-month",
				"notePagesAmount": 1
			},
			"quarterPage": {
				"disable": false,
				"notePagesTemplate": "finance-tracker",
				"notePagesAmount": 3
			},
			"monthPage": {
				"disable": false,
				"template": "calendar-month",
				"notePagesTemplate": "tasklist-progress",
				"notePagesAmount": 1
			},
			"weekPage": {
				"disable": false,
				"notePagesTemplate": "dotted-small",
				"notePagesAmount": 1,
				"useWeekSinceYear": false,
				"useWeekNumbersInSideNav": true,
				"sideNavDisplay": "weeks-this-month",
				"template": "notes-week-rows"
			},
			"dayPage": {
				"disable": false,
				"notePagesTemplate": "dotted-large",
				"notePagesAmount": 1,
				"sideNavDisplay": "days-this-week",
				"template": "agenda-day"
			},
			"collections": [
				{
					"id": "1780292531894",
					"name": "🤝 Meet",
					"type": "meeting-minutes",
					"total": 84,
					"columns": 1,
					"numIndexPages": 1,
					"numPagesPerItem": 1
				},
				{
					"id": "1780288353819",
					"name": "✅ To-Do",
					"type": "todo-large",
					"total": 84,
					"columns": 2,
					"numIndexPages": 1,
					"numPagesPerItem": 1
				},
				{
					"id": "goals",
					"name": "📓 Jot",
					"type": "lined-large",
					"total": 84,
					"columns": 1,
					"numIndexPages": 2,
					"numPagesPerItem": 1
				},
				{
					"id": "1780288265006",
					"name": "🎨 Sketch",
					"type": "dotted",
					"total": 84,
					"columns": 1,
					"numIndexPages": 1,
					"numPagesPerItem": 1
				},
				{
					"id": "notes",
					"name": "👟 Walk",
					"type": "habit-year-by-week",
					"total": 1,
					"columns": 1,
					"numIndexPages": 0,
					"numPagesPerItem": 1
				}
			],
			"calendars": [
				{
					"url": "https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics",
					"name": "Public Holidays"
				},
				{
					"url": "https://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics",
					"name": "Moon Phases"
				}
			]
		}
	}
];

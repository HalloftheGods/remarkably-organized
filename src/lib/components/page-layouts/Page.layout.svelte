<script lang="ts">
	import type { Collection, PlannerSettings, Timeframe } from '$lib';
	import { Grid } from '$molecules';
	import * as T from '$templates';

	let {
		display = 'dotted' as Collection['type'] | 'cover',
		timeframe = {} as Timeframe,
		settings = {} as PlannerSettings,
		collection = undefined as Collection | undefined,
		columns = undefined as number | undefined,
		lines = undefined as number | undefined,
		aspectRatio = 1.5,
		padding = null as string | null,
		agendaStartTime = undefined as number | undefined,
		agendaEndTime = undefined as number | undefined,
		agendaInterval = undefined as number | undefined,
		use24HourClock = undefined as boolean | undefined,
	} = $props();

	const weekUse24HourClock = $derived(use24HourClock ?? settings.weekPage.use24HourClock);
	const weekStartTime = $derived(agendaStartTime ?? settings.weekPage.agendaStartTime);
	const weekEndTime = $derived(agendaEndTime ?? settings.weekPage.agendaEndTime);
	const weekInterval = $derived(agendaInterval ?? settings.weekPage.agendaInterval);

	const dayUse24HourClock = $derived(use24HourClock ?? settings.dayPage.use24HourClock);
	const dayStartTime = $derived(agendaStartTime ?? settings.dayPage.agendaStartTime);
	const dayEndTime = $derived(agendaEndTime ?? settings.dayPage.agendaEndTime);
	const dayInterval = $derived(agendaInterval ?? settings.dayPage.agendaInterval);

	const size = $derived(
		display.endsWith('large') ? 'large' : display.endsWith('small') ? 'small' : 'medium',
	);
	const cols = $derived(
		display.startsWith('lined') ||
			display.startsWith('numbered') ||
			display.startsWith('todo')
			? (columns ?? 1)
			: size === 'small'
				? 30
				: size === 'medium'
					? 25
					: 20,
	);
	const numLines = $derived(
		lines ?? (size === 'small' ? 40 : size === 'medium' ? 35 : 30),
	);
</script>

<div class="page {display.split('-')[0]}" data-template={display} style:padding>
	{#if display === 'notes-year'}
		<T.NotesYear
			months={settings.months.filter((m) => m.year === timeframe.year)}
			{settings} />
	{:else if display === 'tasklist-progress'}
		<T.TaskProgress {timeframe} />
	{:else if display === 'calendar-year'}
		<T.CalendarYear
			months={settings.months.filter((m) => m.year === timeframe.year)}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			{settings} />
	{:else if display === 'calendar-quarter'}
		<T.CalendarQuarter
			months={settings.months.filter(
				(m) => m.year === timeframe.year && m.quarter === timeframe.quarter,
			)}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			{settings} />
	{:else if display === 'goals-quarter'}
		<T.GoalsQuarter
			months={settings.months.filter(
				(m) => m.year === timeframe.year && m.quarter === timeframe.quarter,
			)}
			columns={settings.quarterPage.goalsColumns}
			{settings} />
	{:else if display === 'overview-quarter'}
		<T.OverviewQuarter
			months={settings.months.filter(
				(m) => m.year === timeframe.year && m.quarter === timeframe.quarter,
			)}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			{settings} />
	{:else if display === 'agenda-week'}
		<T.AgendaWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			use24HourClock={weekUse24HourClock}
			alignDayText={settings.weekPage.alignDayText}
			startTime={weekStartTime}
			endTime={weekEndTime}
			interval={weekInterval} />
	{:else if display === 'agenda-day'}
		<T.AgendaDay
			{settings}
			{timeframe}
			events={settings.events}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'agenda-day-executive'}
		<T.AgendaDayExecutive
			{timeframe}
			events={settings.events}
			{settings}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'agenda-day-timebox'}
		<T.AgendaDayTimebox
			{timeframe}
			events={settings.events}
			{settings}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'agenda-day-mindful'}
		<T.AgendaDayMindful
			{timeframe}
			events={settings.events}
			{settings}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'agenda-day-split'}
		<T.AgendaDaySplit
			{timeframe}
			events={settings.events}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'notes-quarter'}
		<T.NotesQuarter
			months={settings.months.filter(
				(m) => m.year === timeframe.year && m.quarter === timeframe.quarter,
			)}
			{settings} />
	{:else if display === 'calendar-month' || display === 'calendar-month-with-notes'}
		<T.CalendarMonth
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			showWeekLinks={!settings.weekPage.disable}
			useWeekSinceYear={settings.weekPage.useWeekSinceYear}
			showNotes={display === 'calendar-month-with-notes'} />
	{:else if display === 'agenda-week-notes'}
		<T.NotesWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			alignDayText={settings.weekPage.alignDayText}
			display="grid" />
	{:else if display === 'agenda-week-notes-columns'}
		<T.NotesWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			alignDayText={settings.weekPage.alignDayText}
			display="columns" />
	{:else if display === 'agenda-week-notes-rows'}
		<T.NotesWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			alignDayText={settings.weekPage.alignDayText}
			display="rows" />
	{:else if display === 'notes-day'}
		<T.NotesDay
			{timeframe}
			events={settings.events}
			use24HourClock={settings.dayPage.use24HourClock}
			startTime={settings.dayPage.agendaStartTime}
			endTime={settings.dayPage.agendaEndTime}
			interval={settings.dayPage.agendaInterval} />
	{:else if display === 'habit-year-by-week'}
		<T.HabitsYear
			{timeframe}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			groupBy="week"
			{settings} />
	{:else if display === 'habit-year-by-month'}
		<T.HabitsYear
			{timeframe}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			groupBy="month"
			{settings} />
	{:else if display.startsWith('lined')}
		<Grid {display} columns={cols} lines={numLines} {aspectRatio} />
	{:else if display.startsWith('numbered')}
		<Grid {display} columns={cols} lines={numLines} {aspectRatio} />
	{:else if display.startsWith('todo')}
		<Grid {display} columns={cols} lines={numLines} {aspectRatio} />
	{:else if display.startsWith('grid')}
		<Grid {display} {aspectRatio} />
	{:else if display.startsWith('dotted')}
		<Grid {display} {aspectRatio} />
	{:else if display === 'finance-tracker'}
		<T.FinanceTracker {settings} />
	{:else if display === 'meeting-minutes'}
		<T.MeetingMinutes {settings} />
	{:else if display === 'workout-log'}
		<T.WorkoutLog {settings} />
	{:else if display === 'meal-planner'}
		<T.MealPlanner startWeekOnSunday={settings.date.startWeekOnSunday} {settings} />
	{:else if display === 'sprint-planner'}
		<T.SprintPlanner {settings} />
	{:else if display === 'tarot-draw'}
		<T.TarotDraw {settings} />
	{:else if display === 'natal-chart'}
		<T.NatalChart {settings} />
	{:else if display === 'eisenhower-matrix'}
		<T.EisenhowerMatrix {settings} />
	{:else if display === 'garden-planner'}
		<T.GardenPlanner {settings} />
	{:else if display === 'project-planner'}
		<T.ProjectPlanner {settings} />
	{:else if display === 'content-planner'}
		<T.ContentPlanner {settings} />
	{:else if display === 'assignment-tracker'}
		<T.AssignmentTracker {settings} />
	{:else if display === 'wellness-journal'}
		<T.WellnessJournal {settings} />
	{:else if display === 'learning-tracker'}
		<T.LearningTracker {settings} />
	{:else if display === 'energy-matrix'}
		<T.EnergyMatrix {settings} />
	{:else if display === 'client-tracker'}
		<T.ClientTracker {settings} />
	{:else if display === 'side-quest-tracker'}
		<T.SideQuestTracker {settings} />
	{:else if display === 'okr-tracker'}
		<T.OkrTracker {settings} />
	{:else if display === 'pomodoro-tracker'}
		<T.PomodoroTracker {settings} />
	{:else if display === 'event-planner'}
		<T.EventPlanner {settings} />
	{:else if display === 'travel-planner'}
		<T.TravelPlanner {settings} />
	{:else if display === 'recipe-card'}
		<T.RecipeCard {settings} />
	{:else if display === 'reading-log'}
		<T.ReadingLog {settings} />
	{:else if display === 'media-tracker'}
		<T.MediaTracker {settings} />
	{:else if display === 'pet-care'}
		<T.PetCare {settings} />
	{:else if display === 'language-learning'}
		<T.LanguageLearning {settings} />
	{:else if display === 'chore-chart'}
		<T.ChoreChart {settings} />
	{:else if display === 'stoic-reflection'}
		<T.StoicReflection {settings} />
	{:else if display === 'session-log'}
		<T.SessionLog {settings} />
	{:else if display === 'lesson-plan'}
		<T.LessonPlan {settings} />
	{:else if display === 'grade-tracker'}
		<T.GradeTracker {settings} />
	{:else if display === 'property-listing'}
		<T.PropertyListing {settings} />
	{:else if display === 'character-sheet'}
		<T.CharacterSheet {settings} />
	{:else if display === 'word-count-tracker'}
		<T.WordCountTracker {settings} />
	{:else if display === 'meditation-log'}
		<T.MeditationLog {settings} />
	{:else if display === 'devotional-page'}
		<T.DevotionalPage {settings} />
	{:else if display === 'gratitude-page'}
		<T.GratitudePage {settings} />
	{:else if display === 'future-log-year'}
		<T.FutureLogYear
			months={settings.months.filter((m) => m.year === timeframe.year)}
			{settings} />
	{:else if display === 'agenda-week-split'}
		<T.AgendaWeekSplit
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday} />
	{:else if display === 'agenda-biweek'}
		<T.AgendaBiWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday} />
	{:else if display === 'agenda-week-timebox'}
		<T.AgendaWeekTimebox
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			use24HourClock={weekUse24HourClock}
			startTime={weekStartTime}
			endTime={weekEndTime} />
	{:else if display === 'agenda-day-high-performance'}
		<T.AgendaDayHighPerformance {settings} {timeframe} />
	{:else if display === 'agenda-week-focus'}
		<T.AgendaWeekFocus
			{settings}
			{timeframe}
			startWeekOnSunday={settings.date.startWeekOnSunday} />
	{:else if display === 'collection-index'}
		<T.CollectionIndex
			collection={collection || (timeframe?.collection as Collection)}
			{settings} />
	{:else if display === 'cover'}
		<T.CoverPage {settings} />
	{/if}
</div>

<style lang="scss">
	.page {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;

		&.cover {
			padding: 0 !important;
			height: 100%;
			display: flex;
			flex-direction: column;
			margin: 0;
			background: transparent;
		}

		&:not(.lined):not(.cover) {
			padding-top: 0.5rem;
		}
		&.dotted {
			height: calc(100% - 1rem);
		}
		&.grid {
			height: calc(100% - 1rem);
		}
		&.lined {
			padding: 0 2rem 1rem;
		}
		&.numbered {
			padding: 0 2rem 1rem;
		}
		&.todo {
			padding: 0.3in 2rem 1rem 0.3in;
		}
		&.agenda {
			padding: 0 0 1rem;
		}
	}
</style>

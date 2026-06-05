<script lang="ts">
	import type { Collection, PlannerSettings, Timeframe } from '$lib';
	import Grid from './Grid.svelte';
	import CalendarMonth from './CalendarMonth.svelte';
	import CalendarQuarter from './CalendarQuarter.svelte';
	import CalendarYear from './CalendarYear.svelte';
	import GoalsQuarter from './GoalsQuarter.svelte';
	import OverviewQuarter from './OverviewQuarter.svelte';
	import NotesQuarter from './NotesQuarter.svelte';
	import NotesYear from './NotesYear.svelte';
	import NotesWeek from './NotesWeek.svelte';
	import NotesDay from './NotesDay.svelte';
	import HabitsYear from './HabitsYear.svelte';
	import AgendaWeek from './AgendaWeek.svelte';
	import AgendaDay from './AgendaDay.svelte';
	import TaskProgress from './TaskProgress.svelte';
	import FinanceTracker from './FinanceTracker.svelte';
	import MeetingMinutes from './MeetingMinutes.svelte';
	import WorkoutLog from './WorkoutLog.svelte';
	import MealPlanner from './MealPlanner.svelte';
	import SprintPlanner from './SprintPlanner.svelte';
	import AgendaDayExecutive from './AgendaDayExecutive.svelte';
	import AgendaDayTimebox from './AgendaDayTimebox.svelte';
	import AgendaDayMindful from './AgendaDayMindful.svelte';
	import AgendaDaySplit from './AgendaDaySplit.svelte';
	import TarotDraw from './TarotDraw.svelte';
	import NatalChart from './NatalChart.svelte';
	import EisenhowerMatrix from './EisenhowerMatrix.svelte';
	import GardenPlanner from './GardenPlanner.svelte';
	import ProjectPlanner from './ProjectPlanner.svelte';
	import ContentPlanner from './ContentPlanner.svelte';
	import AssignmentTracker from './AssignmentTracker.svelte';
	import WellnessJournal from './WellnessJournal.svelte';
	import LearningTracker from './LearningTracker.svelte';
	import EnergyMatrix from './EnergyMatrix.svelte';
	import ClientTracker from './ClientTracker.svelte';
	import SideQuestTracker from './SideQuestTracker.svelte';
	import OkrTracker from './OkrTracker.svelte';
	import PomodoroTracker from './PomodoroTracker.svelte';
	import EventPlanner from './EventPlanner.svelte';
	import TravelPlanner from './TravelPlanner.svelte';
	import RecipeCard from './RecipeCard.svelte';
	import ReadingLog from './ReadingLog.svelte';
	import MediaTracker from './MediaTracker.svelte';
	import PetCare from './PetCare.svelte';
	import LanguageLearning from './LanguageLearning.svelte';
	import ChoreChart from './ChoreChart.svelte';
	import StoicReflection from './StoicReflection.svelte';
	import SessionLog from './SessionLog.svelte';
	import LessonPlan from './LessonPlan.svelte';
	import GradeTracker from './GradeTracker.svelte';
	import PropertyListing from './PropertyListing.svelte';
	import CharacterSheet from './CharacterSheet.svelte';
	import WordCountTracker from './WordCountTracker.svelte';
	import MeditationLog from './MeditationLog.svelte';
	import DevotionalPage from './DevotionalPage.svelte';
	import GratitudePage from './GratitudePage.svelte';
	import FutureLogYear from './FutureLogYear.svelte';
	import AgendaWeekSplit from './AgendaWeekSplit.svelte';
	import AgendaBiWeek from './AgendaBiWeek.svelte';
	import AgendaWeekTimebox from './AgendaWeekTimebox.svelte';
	import AgendaDayHighPerformance from './AgendaDayHighPerformance.svelte';
	import AgendaWeekFocus from './AgendaWeekFocus.svelte';
	import CollectionIndex from './CollectionIndex.svelte';
	import CoverPage from '../../routes/planner/CoverPage.svelte';

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
		<NotesYear
			months={settings.months.filter((m) => m.year === timeframe.year)}
			{settings} />
	{:else if display === 'tasklist-progress'}
		<TaskProgress {timeframe} />
	{:else if display === 'calendar-year'}
		<CalendarYear
			months={settings.months.filter((m) => m.year === timeframe.year)}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			{settings} />
	{:else if display === 'calendar-quarter'}
		<CalendarQuarter
			months={settings.months.filter(
				(m) => m.year === timeframe.year && m.quarter === timeframe.quarter,
			)}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			{settings} />
	{:else if display === 'goals-quarter'}
		<GoalsQuarter
			months={settings.months.filter(
				(m) => m.year === timeframe.year && m.quarter === timeframe.quarter,
			)}
			columns={settings.quarterPage.goalsColumns}
			{settings} />
	{:else if display === 'overview-quarter'}
		<OverviewQuarter
			months={settings.months.filter(
				(m) => m.year === timeframe.year && m.quarter === timeframe.quarter,
			)}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			{settings} />
	{:else if display === 'agenda-week'}
		<AgendaWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			use24HourClock={weekUse24HourClock}
			alignDayTextRight={settings.weekPage.alignDayText === 'right'}
			startTime={weekStartTime}
			endTime={weekEndTime}
			interval={weekInterval} />
	{:else if display === 'agenda-day'}
		<AgendaDay
			{timeframe}
			events={settings.events}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'agenda-day-executive'}
		<AgendaDayExecutive
			{timeframe}
			events={settings.events}
			{settings}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'agenda-day-timebox'}
		<AgendaDayTimebox
			{timeframe}
			events={settings.events}
			{settings}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'agenda-day-mindful'}
		<AgendaDayMindful
			{timeframe}
			events={settings.events}
			{settings}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'agenda-day-split'}
		<AgendaDaySplit
			{timeframe}
			events={settings.events}
			use24HourClock={dayUse24HourClock}
			startTime={dayStartTime}
			endTime={dayEndTime}
			interval={dayInterval} />
	{:else if display === 'notes-quarter'}
		<NotesQuarter
			months={settings.months.filter(
				(m) => m.year === timeframe.year && m.quarter === timeframe.quarter,
			)}
			{settings} />
	{:else if display === 'calendar-month' || display === 'calendar-month-with-notes'}
		<CalendarMonth
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			showWeekLinks={!settings.weekPage.disable}
			useWeekSinceYear={settings.weekPage.useWeekSinceYear}
			showNotes={display === 'calendar-month-with-notes'} />
	{:else if display === 'agenda-week-notes'}
		<NotesWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			alignDayText={settings.weekPage.alignDayText}
			display="grid" />
	{:else if display === 'agenda-week-notes-columns'}
		<NotesWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			alignDayText={settings.weekPage.alignDayText}
			display="columns" />
	{:else if display === 'agenda-week-notes-rows'}
		<NotesWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			alignDayText={settings.weekPage.alignDayText}
			display="rows" />
	{:else if display === 'notes-day'}
		<NotesDay
			{timeframe}
			events={settings.events}
			use24HourClock={settings.dayPage.use24HourClock}
			startTime={settings.dayPage.agendaStartTime}
			endTime={settings.dayPage.agendaEndTime}
			interval={settings.dayPage.agendaInterval} />
	{:else if display === 'habit-year-by-week'}
		<HabitsYear
			{timeframe}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			groupBy="week"
			{settings} />
	{:else if display === 'habit-year-by-month'}
		<HabitsYear
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
		<FinanceTracker {settings} />
	{:else if display === 'meeting-minutes'}
		<MeetingMinutes {settings} />
	{:else if display === 'workout-log'}
		<WorkoutLog {settings} />
	{:else if display === 'meal-planner'}
		<MealPlanner startWeekOnSunday={settings.date.startWeekOnSunday} {settings} />
	{:else if display === 'sprint-planner'}
		<SprintPlanner {settings} />
	{:else if display === 'tarot-draw'}
		<TarotDraw {settings} />
	{:else if display === 'natal-chart'}
		<NatalChart {settings} />
	{:else if display === 'eisenhower-matrix'}
		<EisenhowerMatrix {settings} />
	{:else if display === 'garden-planner'}
		<GardenPlanner {settings} />
	{:else if display === 'project-planner'}
		<ProjectPlanner {settings} />
	{:else if display === 'content-planner'}
		<ContentPlanner {settings} />
	{:else if display === 'assignment-tracker'}
		<AssignmentTracker {settings} />
	{:else if display === 'wellness-journal'}
		<WellnessJournal {settings} />
	{:else if display === 'learning-tracker'}
		<LearningTracker {settings} />
	{:else if display === 'energy-matrix'}
		<EnergyMatrix {settings} />
	{:else if display === 'client-tracker'}
		<ClientTracker {settings} />
	{:else if display === 'side-quest-tracker'}
		<SideQuestTracker {settings} />
	{:else if display === 'okr-tracker'}
		<OkrTracker {settings} />
	{:else if display === 'pomodoro-tracker'}
		<PomodoroTracker {settings} />
	{:else if display === 'event-planner'}
		<EventPlanner {settings} />
	{:else if display === 'travel-planner'}
		<TravelPlanner {settings} />
	{:else if display === 'recipe-card'}
		<RecipeCard {settings} />
	{:else if display === 'reading-log'}
		<ReadingLog {settings} />
	{:else if display === 'media-tracker'}
		<MediaTracker {settings} />
	{:else if display === 'pet-care'}
		<PetCare {settings} />
	{:else if display === 'language-learning'}
		<LanguageLearning {settings} />
	{:else if display === 'chore-chart'}
		<ChoreChart {settings} />
	{:else if display === 'stoic-reflection'}
		<StoicReflection {settings} />
	{:else if display === 'session-log'}
		<SessionLog {settings} />
	{:else if display === 'lesson-plan'}
		<LessonPlan {settings} />
	{:else if display === 'grade-tracker'}
		<GradeTracker {settings} />
	{:else if display === 'property-listing'}
		<PropertyListing {settings} />
	{:else if display === 'character-sheet'}
		<CharacterSheet {settings} />
	{:else if display === 'word-count-tracker'}
		<WordCountTracker {settings} />
	{:else if display === 'meditation-log'}
		<MeditationLog {settings} />
	{:else if display === 'devotional-page'}
		<DevotionalPage {settings} />
	{:else if display === 'gratitude-page'}
		<GratitudePage {settings} />
	{:else if display === 'future-log-year'}
		<FutureLogYear
			months={settings.months.filter((m) => m.year === timeframe.year)}
			{settings} />
	{:else if display === 'agenda-week-split'}
		<AgendaWeekSplit
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday} />
	{:else if display === 'agenda-biweek'}
		<AgendaBiWeek
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday} />
	{:else if display === 'agenda-week-timebox'}
		<AgendaWeekTimebox
			{settings}
			{timeframe}
			events={settings.events}
			startWeekOnSunday={settings.date.startWeekOnSunday}
			use24HourClock={weekUse24HourClock}
			startTime={weekStartTime}
			endTime={weekEndTime} />
	{:else if display === 'agenda-day-high-performance'}
		<AgendaDayHighPerformance {settings} {timeframe} />
	{:else if display === 'agenda-week-focus'}
		<AgendaWeekFocus
			{settings}
			{timeframe}
			startWeekOnSunday={settings.date.startWeekOnSunday} />
	{:else if display === 'collection-index'}
		<CollectionIndex
			collection={collection || (timeframe?.collection as Collection)}
			{settings} />
	{:else if display === 'cover'}
		<CoverPage {settings} />
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

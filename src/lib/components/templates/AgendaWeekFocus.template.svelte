<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe, type CalendarEvent } from '$lib';

	let {
		timeframe = {} as Timeframe,
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
</script>

<div class="week-focus">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if !settings?.emojis?.disable}🎯{/if} WEEKLY FOCUS & REVIEW
			</div>
			<div class="line"></div>
		</div>
		<div class="field week-dates">
			<div class="label">WEEK OF</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="main-layout">
		<!-- Top Half: Focus & Projects -->
		<div class="top-row">
			<div class="card focus-card">
				<div class="card-header">WEEKLY FOCUS & INTENTION</div>
				<div class="card-body">
					<div class="write-line"></div>
					<div class="write-line"></div>
					<div class="write-line"></div>
				</div>
			</div>

			<div class="card projects-card">
				<div class="card-header">ACTIVE PROJECTS</div>
				<div class="card-body">
					{#each Array(3) as _}
						<div class="project-item">
							<div class="project-box"></div>
							<div class="write-line"></div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Mid Section: Daily Highlight Trackers -->
		<div class="card highlights-card">
			<div class="card-header">DAILY HIGHLIGHTS & DEEP WORK TRACKER</div>
			<div class="card-body highlights-body">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(weekStart.getTime() + i * 86400000)}
					<div class="highlight-row">
						<span class="day-label">
							{date
								.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
								.toUpperCase()}
							{date.getUTCDate()}
						</span>
						<div class="write-line"></div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Bottom Section: Wins & Review -->
		<div class="bottom-row">
			<div class="card wins-card">
				<div class="card-header">WEEKLY WINS & SUCCESSES</div>
				<div class="card-body">
					{#each Array(3) as _}
						<div class="win-row">
							<span class="bullet">★</span>
							<div class="write-line"></div>
						</div>
					{/each}
				</div>
			</div>

			<div class="card review-card">
				<div class="card-header">REFLECTIONS & REVIEW NOTES</div>
				<div class="card-body">
					<div class="write-line"></div>
					<div class="write-line"></div>
					<div class="write-line"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.week-focus {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;

		.field {
			display: flex;
			flex-direction: column;
		}
		.title {
			flex: 3;
		}
		.week-dates {
			flex: 1;
		}
	}

	.label {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
		margin-bottom: 0.25rem;
		letter-spacing: 0.5px;
	}

	.line {
		border-bottom: 1px solid var(--outline);
		height: 1.5rem;
		width: 100%;
	}

	.main-layout {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 1;
		min-height: 0;
	}

	.top-row,
	.bottom-row {
		display: flex;
		gap: 1rem;
		flex: 1;
		min-height: 0;
	}

	.card {
		border: 1px solid var(--outline);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		flex: 1;
	}

	.card-header {
		background-color: var(--nav-bg-pdf, #f8f8f8);
		border-bottom: 2px solid var(--outline);
		padding: 0.4rem 0.5rem;
		font-size: 0.7rem;
		font-weight: bold;
		color: var(--text);
		letter-spacing: 0.5px;
	}

	.card-body {
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		flex: 1;
		justify-content: space-around;
	}

	.project-item,
	.win-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.project-box {
		width: 0.75rem;
		height: 0.75rem;
		border: 1px solid var(--outline);
		border-radius: 2px;
	}

	.bullet {
		font-size: 0.8rem;
		color: var(--text-low);
	}

	.write-line {
		border-bottom: 1px solid var(--outline-low, #e0e0e0);
		height: 1.2rem;
		flex: 1;
	}

	.highlights-card {
		flex: 1.5;
		min-height: 0;
	}

	.highlights-body {
		justify-content: space-between;
	}

	.highlight-row {
		display: flex;
		align-items: center;
		gap: 1rem;

		.day-label {
			font-size: 0.65rem;
			font-weight: bold;
			color: var(--text-low);
			width: 3.5rem;
		}
	}
</style>

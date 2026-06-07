<script lang="ts">
	import { getFirstDayOfWeek, type Timeframe } from '$lib';
	import { Box, Text } from '$atoms';
	import { SectionHeader, Field } from '$molecules';

	let {
		timeframe = {} as Timeframe,
		startWeekOnSunday = false,
		settings = undefined as any,
	} = $props();

	const weekStart = $derived(
		new Date(getFirstDayOfWeek(timeframe.start, startWeekOnSunday)),
	);
</script>

<Box class="week-focus">
	<Box class="header-section">
		<Field
			class="title"
			label="{!settings?.emojis?.disable ? '🎯 ' : ''}WEEKLY FOCUS & REVIEW"
			labelWeight="bold" />
		<Field class="week-dates" label="WEEK OF" labelWeight="bold" />
	</Box>

	<Box class="main-layout">
		<!-- Top Half: Focus & Projects -->
		<Box class="top-row">
			<Box class="card focus-card">
				<SectionHeader title="WEEKLY FOCUS & INTENTION" />
				<Box class="card-body">
					<Box class="write-line"></Box>
					<Box class="write-line"></Box>
					<Box class="write-line"></Box>
				</Box>
			</Box>

			<Box class="card projects-card">
				<SectionHeader title="ACTIVE PROJECTS" />
				<Box class="card-body">
					{#each Array(3) as _}
						<Box class="project-item">
							<Box class="project-box"></Box>
							<Box class="write-line"></Box>
						</Box>
					{/each}
				</Box>
			</Box>
		</Box>

		<!-- Mid Section: Daily Highlight Trackers -->
		<Box class="card highlights-card">
			<SectionHeader title="DAILY HIGHLIGHTS & DEEP WORK TRACKER" />
			<Box class="card-body highlights-body">
				{#each new Array(7) as _, i (i)}
					{@const date = new Date(weekStart.getTime() + i * 86400000)}
					<Box class="highlight-row">
						<a
							href="#{date.getUTCFullYear()}-{date.getUTCMonth() + 1}-{date.getUTCDate()}"
							class="day-label">
							<Text weight="bold">
								{date
									.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' })
									.toUpperCase()}
								{date.getUTCDate()}
							</Text>
						</a>
						<Box class="write-line"></Box>
					</Box>
				{/each}
			</Box>
		</Box>

		<!-- Bottom Section: Wins & Review -->
		<Box class="bottom-row">
			<Box class="card wins-card">
				<SectionHeader title="WEEKLY WINS & SUCCESSES" />
				<Box class="card-body">
					{#each Array(3) as _}
						<Box class="win-row">
							<Text class="bullet">★</Text>
							<Box class="write-line"></Box>
						</Box>
					{/each}
				</Box>
			</Box>

			<Box class="card review-card">
				<SectionHeader title="REFLECTIONS & REVIEW NOTES" />
				<Box class="card-body">
					<Box class="write-line"></Box>
					<Box class="write-line"></Box>
					<Box class="write-line"></Box>
				</Box>
			</Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.week-focus {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 1.5rem;
			box-sizing: border-box;
			gap: 1.5rem;

			.header-section {
				display: flex;
				gap: 2rem;

				.title {
					flex: 3;
				}
				.week-dates {
					flex: 1;
				}
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
				border-bottom: 1px solid var(--outline-low);
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
					text-decoration: none;
					color: var(--text-low);
					width: 3.5rem;
					font-size: 0.65rem;
					transition: color 0.2s ease;

					&:hover {
						color: var(--text);
					}
				}
			}
		}
	}
</style>

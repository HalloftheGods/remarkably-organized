<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page meditation-log">
	<div class="header-section">
		<div class="field title">
			<label>
				{#if showEmoji}
					<span class="emoji">🧘</span>
				{/if}
				<strong>MEDITATION & BREATHWORK LOG</strong>
			</label>
			<div class="content"></div>
		</div>
		<div class="field date">
			<label>
				<strong>DATE / WEEK</strong>
			</label>
			<div class="content"></div>
		</div>
	</div>

	<div class="content-section">
		<div class="sessions-block">
			<span class="section-label">DAILY SESSION TRACKER</span>
			<div class="sessions-header">
				<span class="col-day">DAY</span>
				<span class="col-time">TIME</span>
				<span class="col-dur">DUR</span>
				<span class="col-tech">TECHNIQUE / FOCUS</span>
				<span class="col-state">STATE OF MIND (PRE / POST)</span>
			</div>
			{#each ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as day}
				<div class="session-row">
					<span class="day-label">{day}</span>
					<div class="line time-line"></div>
					<div class="line dur-line"></div>
					<div class="line tech-line"></div>
					<div class="line state-line"></div>
				</div>
			{/each}
		</div>

		<div class="bottom-section">
			<div class="column observations">
				<span class="section-label">INSIGHTS / REVELATIONS / EXPERIENCES</span>
				{#each Array(7) as _}
					<div class="line"></div>
				{/each}
			</div>

			<div class="column goals">
				<span class="section-label">WEEKLY MIND MINDFULNESS GOALS</span>
				{#each Array(3) as _}
					<div class="todo-row">
						<Checkbox aria-label="Goal check" />
						<div class="line"></div>
					</div>
				{/each}

				<span class="section-label habits-label">BREATHWORK & HABITS</span>
				<div class="habits-check-grid">
					{#each ['Box Breathing', 'Wim Hof Method', '4-7-8 Technique', 'Anapanasati / Focus'] as habit}
						<div class="habit-check-row">
							<span class="habit-name">{habit}</span>
							<div class="check-boxes">
								{#each ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as dayChar}
									<div class="check-day">
										<span class="day-char">{dayChar}</span>
										<Checkbox aria-label="Day check" class="check-box" />
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.meditation-log {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.25rem;
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
		.date {
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

	.section-label {
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--text-low);
		border-bottom: 2px solid var(--outline);
		padding-bottom: 0.25rem;
		margin-bottom: 0.5rem;
		letter-spacing: 0.5px;
	}

	.habits-label {
		margin-top: 1rem;
	}

	.line {
		border-bottom: 1px solid var(--outline);
		height: 1.5rem;
		width: 100%;
	}

	.content-section {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		flex: 1;
	}

	.sessions-block {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.sessions-header {
		display: flex;
		font-size: 0.65rem;
		font-weight: bold;
		color: var(--text-low);
		border-bottom: 1px solid var(--outline);
		padding-bottom: 0.2rem;
	}

	.col-day {
		width: 3rem;
	}
	.col-time {
		width: 4rem;
	}
	.col-dur {
		width: 3rem;
	}
	.col-tech {
		flex: 1;
		padding-left: 0.5rem;
	}
	.col-state {
		flex: 1;
		padding-left: 0.5rem;
	}

	.session-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.day-label {
		width: 3rem;
		font-size: 0.7rem;
		font-weight: bold;
		color: var(--text-low);
		padding-bottom: 0.2rem;
	}

	.time-line {
		width: 4rem;
	}
	.dur-line {
		width: 3rem;
	}
	.tech-line {
		flex: 1;
	}
	.state-line {
		flex: 1;
	}

	.bottom-section {
		display: flex;
		gap: 2rem;
		flex: 1;
	}

	.column {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.todo-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.habits-check-grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 0.25rem;
	}

	.habit-check-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.habit-name {
		font-size: 0.7rem;
		color: var(--text-low);
	}

	.check-boxes {
		display: flex;
		gap: 0.35rem;
	}

	.check-day {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;

		.day-char {
			font-size: 0.55rem;
			font-weight: bold;
			color: var(--text-low);
		}

		.check-box {
			width: 0.85rem !important;
			height: 0.85rem !important;
		}
	}
</style>

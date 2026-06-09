<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { MonthEmoji } from '$molecules';

	let { settings = {} as PlannerSettings, months = [] as Month[] } = $props();

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	function getMonthName(index: number) {
		if (months[index]) return months[index].nameLong;
		return monthNames[index];
	}

	const isLandscape = $derived(settings.design.orientation === 'landscape');
</script>

<div class="planner page future-log">
	<div
		class="grid {isLandscape
			? 'grid-cols-4 grid-rows-3 grid-flow-col'
			: 'grid-cols-3 grid-rows-4'} gap-4 flex-1">
		{#each Array(12) as _, i}
			{@const hasMonth = !!months[i]}
			<div class="month-box">
				{#if hasMonth}
					<MonthEmoji {settings} month={months[i]} variant="watermark" />
				{/if}
				<strong class="month-name">{getMonthName(i).toUpperCase()}</strong>
				<div class="notes-area">
					{#each Array(5) as _}
						<div class="note-line"></div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.future-log {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 80%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.month-box {
		border: 1px solid var(--outline);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		position: relative;
		overflow: hidden;
	}

	.month-name {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text);
		border-bottom: 2px solid var(--outline);
		padding-bottom: 0.25rem;
		margin-bottom: 0.5rem;
		letter-spacing: 0.5px;
		position: relative;
		z-index: 1;
	}

	.notes-area {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		flex: 1;
		position: relative;
		z-index: 1;
	}

	.note-line {
		border-bottom: 1px dashed var(--outline-low, #e0e0e0);
		height: 1rem;
	}
</style>

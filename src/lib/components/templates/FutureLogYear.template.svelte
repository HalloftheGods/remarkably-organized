<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';
	import { MonthEmoji } from '$molecules';
	import { Box, Text } from '$atoms';

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
</script>

<Box class="future-log">
	<Box class="grid-container">
		{#each Array(12) as _, i}
			<Box class="month-box">
				{#if months[i]}
					<MonthEmoji {settings} month={months[i]} variant="watermark" />
				{/if}
				<Text class="month-name">{getMonthName(i).toUpperCase()}</Text>
				<Box class="notes-area">
					{#each Array(5) as _}
						<Box class="note-line"></Box>
					{/each}
				</Box>
			</Box>
		{/each}
	</Box>
</Box>

<style lang="scss">
	:global {
		.future-log {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 80%;
			padding: 1.5rem;
			box-sizing: border-box;
			gap: 1.5rem;
		}

		.grid-container {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(4, 1fr);
			gap: 1rem;
			flex: 1;
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
	}
</style>

<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text } from '$atoms';
	import { Field, Row } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<Box class="travel-planner">
	<Box class="header-section">
		<Field
			label="TRAVEL ITINERARY"
			emoji="✈️"
			{showEmoji}
			class="title" />
		<Field label="DATES" class="dates" />
	</Box>

	<Box class="content-section">
		<Box class="flight-info">
			<Text tag="strong" class="label">DEPARTURE / ARRIVAL</Text>
			<Box class="line"></Box>
			<Box class="line"></Box>
		</Box>

		<Box class="columns">
			<Box class="column">
				<Text tag="strong" class="label">ITINERARY</Text>
				{#each Array(10) as _}
					<Box class="time-row">
						<Box class="time-box"></Box>
						<Box class="line"></Box>
					</Box>
				{/each}
			</Box>
			<Box class="column">
				<Text tag="strong" class="label">PACKING LIST</Text>
				{#each Array(10) as _}
					<Row />
				{/each}
			</Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.travel-planner {
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

			.title {
				flex: 3;
			}
			.dates {
				flex: 1;
			}
		}

		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.25rem;
			letter-spacing: 0.5px;
			text-transform: uppercase;
		}

		.line {
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
			width: 100%;
		}

		.content-section {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			flex: 1;
		}

		.flight-info {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.columns {
			display: flex;
			gap: 2rem;
			flex: 1;

			.column {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}
		}

		.time-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;

			.time-box {
				width: 3rem;
				height: 1.5rem;
				border-bottom: 1px solid var(--outline);
				flex-shrink: 0;
			}
		}
	}
</style>


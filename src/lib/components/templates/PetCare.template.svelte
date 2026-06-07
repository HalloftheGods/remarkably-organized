<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text, Checkbox } from '$atoms';
	import { Field } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<Box class="pet-care">
	<Box class="header-section">
		<Field label="PET CARE LOG" emoji="🐾" {showEmoji} class="title" />
		<Field label="DATE / WEEK" class="date" />
	</Box>

	<Box class="content-section">
		<Box class="columns">
			<Box class="column">
				<Text class="label">FEEDING SCHEDULE</Text>
				{#each Array(7) as _}
					<Box class="check-row">
						<Checkbox aria-label="Feeding schedule check" />
						<Box class="line"></Box>
					</Box>
				{/each}
			</Box>
			<Box class="column">
				<Text class="label">WALKS / EXERCISE</Text>
				{#each Array(7) as _}
					<Box class="check-row">
						<Checkbox aria-label="Walks/Exercise check" />
						<Box class="line"></Box>
					</Box>
				{/each}
			</Box>
		</Box>

		<Box class="bottom-section">
			<Text class="label">VET NOTES & MEDICATION</Text>
			<Box class="lines">
				{#each Array(6) as _}
					<Box class="line"></Box>
				{/each}
			</Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.pet-care {
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

		.check-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
		}

		.bottom-section {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.lines {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}
		}
	}
</style>

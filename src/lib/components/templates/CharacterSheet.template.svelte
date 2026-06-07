<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text } from '$atoms';
	import { Field, Row, SectionHeader } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<Box class="character-sheet">
	<Box class="header-section">
		<Field label="CHARACTER SHEET" emoji="🎭" {showEmoji} class="title" />
		<Field label="ROLE / CLASS / TYPE" class="class-type" />
	</Box>

	<Box class="meta-section">
		<Box class="meta-row">
			<Field label="NAME" class="name" />
			<Field label="ARCHETYPE / BACKGROUND" class="archetype" />
		</Box>
	</Box>

	<Box class="content-section">
		<Box class="top-row">
			<Box class="column attributes">
				<SectionHeader label="ATTRIBUTES & ABILITIES" />
				<Box class="attr-grid">
					{#each ['Strength / Force', 'Agility / Speed', 'Intellect / Mind', 'Willpower / Soul', 'Presence / Charisma', 'Perception / Senses'] as attr}
						<Box class="attr-row">
							<Text class="attr-name">{attr}</Text>
							<Box class="attr-score"></Box>
						</Box>
					{/each}
				</Box>
			</Box>

			<Box class="column traits">
				<SectionHeader label="TRAITS, FLAWS & MOTIVATIONS" />
				{#each Array(6) as _}
					<Box class="line"></Box>
				{/each}
			</Box>
		</Box>

		<Box class="bottom-section">
			<Box class="column gear">
				<SectionHeader label="GEAR / INVENTORY / COMPANIONS" />
				{#each Array(6) as _}
					<Row />
				{/each}
			</Box>

			<Box class="column history">
				<SectionHeader label="HISTORY / NOTES / CAMPAIGN LOG" />
				{#each Array(6) as _}
					<Box class="line"></Box>
				{/each}
			</Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.character-sheet {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 1.5rem;
			box-sizing: border-box;
			gap: 1rem;
			border: 1px solid red;
		}

		.header-section {
			display: flex;
			gap: 2rem;

			.title {
				flex: 3;
			}
			.class-type {
				flex: 1;
			}
		}

		.meta-section {
			display: flex;
			flex-direction: column;
		}

		.meta-row {
			display: flex;
			gap: 2rem;

			.name {
				flex: 2;
			}
			.archetype {
				flex: 2;
			}
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

		.top-row,
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

		.attr-grid {
			display: grid;
			grid-template-rows: repeat(6, 1fr);
			gap: 0.4rem;
		}

		.attr-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px dashed var(--outline);
			padding-bottom: 0.2rem;
		}

		.attr-name {
			font-size: 0.75rem;
			color: var(--text-low);
			font-weight: 500;
		}

		.attr-score {
			width: 2.25rem;
			height: 1.5rem;
			border: 1px solid var(--outline);
		}
	}
</style>

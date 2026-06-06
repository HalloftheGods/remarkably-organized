<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text } from '$atoms';
	import { Field, SectionHeader } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<Box class="stoic-reflection">
	<Box class="header-section">
		<Field
			label="STOIC AM/PM JOURNAL"
			emoji="🏛️"
			{showEmoji}
			class="title" />
		<Field label="DATE" class="date" />
	</Box>

	<Box class="content-section">
		<Box class="half-section morning">
			<SectionHeader label="MORNING PREPARATION" />
			<Box class="prompt-block">
				<Text class="prompt-label">What is within my control today? What is not?</Text>
				{#each Array(4) as _}
					<Box class="line"></Box>
				{/each}
			</Box>
			<Box class="prompt-block">
				<Text class="prompt-label">Setting intention & anticipating obstacles:</Text>
				{#each Array(4) as _}
					<Box class="line"></Box>
				{/each}
			</Box>
		</Box>

		<Box class="half-section evening">
			<SectionHeader label="EVENING REVIEW" />
			<Box class="prompt-block">
				<Text class="prompt-label">Did I act in accordance with my values?</Text>
				{#each Array(3) as _}
					<Box class="line"></Box>
				{/each}
			</Box>
			<Box class="prompt-block">
				<Text class="prompt-label">Where did I falter, and what could I do better?</Text>
				{#each Array(3) as _}
					<Box class="line"></Box>
				{/each}
			</Box>
		</Box>

		<Box class="virtues-section">
			<SectionHeader label="VIRTUES CHECK-IN" />
			<Box class="virtues-grid">
				{#each ['Wisdom', 'Courage', 'Justice', 'Temperance'] as virtue}
					<Box class="virtue-row">
						<Text class="virtue-name">{virtue}</Text>
						<Box class="virtue-boxes">
							{#each Array(5) as _, idx}
								<Box class="dot-box"></Box>
							{/each}
						</Box>
					</Box>
				{/each}
			</Box>
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.stoic-reflection {
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

			.title {
				flex: 3;
			}
			.date {
				flex: 1;
			}
		}

		.prompt-label {
			font-size: 0.7rem;
			font-style: italic;
			color: var(--text-low);
			margin-top: 0.25rem;
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

		.half-section {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		.prompt-block {
			display: flex;
			flex-direction: column;
		}

		.virtues-section {
			margin-top: auto;
			display: flex;
			flex-direction: column;
		}

		.virtues-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;
			padding-top: 0.5rem;
		}

		.virtue-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px dashed var(--outline);
			padding-bottom: 0.25rem;
		}

		.virtue-name {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
		}

		.virtue-boxes {
			display: flex;
			gap: 0.4rem;
		}

		.dot-box {
			width: 0.75rem;
			height: 0.75rem;
			border: 1px solid var(--outline);
			border-radius: 50%;
		}
	}
</style>


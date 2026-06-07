<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text, Checkbox } from '$atoms';
	import { Field } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<Box class="gratitude-page">
	<Box class="header-section">
		<Field label="GRATITUDE & AFFIRMATIONS" emoji="💛" {showEmoji} class="title" />
		<Field label="DATE" class="date" />
	</Box>

	<Box class="content-section">
		<Box class="top-section">
			<Text class="section-label">THINGS I AM GRATEFUL FOR TODAY</Text>
			{#each Array(5) as _, idx}
				<Box class="gratitude-row">
					<Text tag="span" class="gratitude-num">{idx + 1}.</Text>
					<Box class="line"></Box>
				</Box>
			{/each}
		</Box>

		<Box class="split-section">
			<Box class="column affirmations">
				<Text class="section-label">DAILY POSITIVE AFFIRMATIONS</Text>
				{#each Array(4) as _}
					<Box class="bullet-row">
						<Text tag="span" class="heart">♥</Text>
						<Box class="line"></Box>
					</Box>
				{/each}
			</Box>

			<Box class="column kindness">
				<Text class="section-label">ACTS OF KINDNESS / CONNECTION</Text>
				{#each Array(4) as _}
					<Box class="bullet-row">
						<Checkbox aria-label="Acts of kindness check" />
						<Box class="line"></Box>
					</Box>
				{/each}
			</Box>
		</Box>

		<Box class="bottom-section">
			<Text class="section-label">TODAY'S HIGHLIGHTS / MOMENTS OF JOY</Text>
			{#each Array(3) as _}
				<Box class="line"></Box>
			{/each}
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global {
		.gratitude-page {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			padding: 1.5rem;
			box-sizing: border-box;
			gap: 1rem;
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

		.top-section {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		.gratitude-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
		}

		.gratitude-num {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			width: 1.25rem;
			padding-bottom: 0.2rem;
		}

		.split-section {
			display: flex;
			gap: 2rem;
		}

		.column {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		.bullet-row {
			display: flex;
			align-items: flex-end;
			gap: 0.5rem;
		}

		.heart {
			font-size: 0.9rem;
			color: var(--text-low);
			width: 1rem;
			text-align: center;
			padding-bottom: 0.15rem;
		}

		.bottom-section {
			display: flex;
			flex-direction: column;
			margin-top: auto;
		}
	}
</style>

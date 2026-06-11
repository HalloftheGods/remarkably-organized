<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import type { PlannerSettings } from '$lib';

	import { Field } from '$atoms';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();

	const virtuePairs = [
		{ vice: 'Gluttony', virtue: 'Temperance' },
		{ vice: 'Wrath', virtue: 'Justice' },
		{ vice: 'Envy', virtue: 'Kindness' },
		{ vice: 'Lust', virtue: 'Chastity' },
		{ vice: 'Sloth', virtue: 'Courage' },
		{ vice: 'Greed', virtue: 'Charity' },
		{ vice: 'Pride', virtue: 'Wisdom' }
	];
</script>

<div class="planner page padded stoic-reflection">
	<header>
		<div class="field flex-[3]">
			<Field i="🏛️">Stoic AM/PM Journal</Field>
		</div>
		<div class="field flex-[1]">
			<Field>Date</Field>
		</div>
	</header>

	<div class="content-section">
		<div class="half-section morning">
			<div class="section-header"><strong>Morning Preparation</strong></div>
			<div class="prompt-block">
				<span class="prompt-label">What is within my control today? What is not?</span>
				{#each Array(4) as _}
					<div class="line">
									<RowInput />
								</div>
				{/each}
			</div>
			<div class="prompt-block">
				<span class="prompt-label">Setting intention & anticipating obstacles:</span>
				{#each Array(4) as _}
					<div class="line">
									<RowInput />
								</div>
				{/each}
			</div>
		</div>

		<div class="half-section evening">
			<div class="section-header"><strong>Evening Review</strong></div>
			<div class="prompt-block">
				<span class="prompt-label">Did I act in accordance with my values?</span>
				{#each Array(3) as _}
					<div class="line">
									<RowInput />
								</div>
				{/each}
			</div>
			<div class="prompt-block">
				<span class="prompt-label">Where did I falter, and what could I do better?</span>
				{#each Array(3) as _}
					<div class="line">
									<RowInput />
								</div>
				{/each}
			</div>
		</div>

		<div class="virtues-section">
			<div class="section-header"><strong>Virtues Check-In</strong></div>
			<div class="virtues-grid">
				{#each virtuePairs as { vice, virtue }}
					<div class="virtue-row">
						<span class="vice-name">{vice}</span>
						<div class="virtue-boxes">
							{#each Array(5) as _, idx}
								<div class="dot-box"></div>
							{/each}
						</div>
						<span class="virtue-name">{virtue}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.stoic-reflection {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.25rem;
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
		gap: 0.75rem 1.25rem;
		padding-top: 0.5rem;
	}

	.virtue-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--outline);
		padding-bottom: 0.25rem;
	}

	.vice-name {
		flex: 1;
		font-size: 0.75rem;
		color: var(--text-low);
		text-align: left;
	}

	.virtue-name {
		flex: 1;
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
		text-align: right;
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
</style>

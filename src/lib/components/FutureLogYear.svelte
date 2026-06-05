<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();

	const months = [
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
</script>

<div class="future-log">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if !settings?.emojis?.disable}📅{/if} YEARLY FUTURE LOG
			</div>
			<div class="line"></div>
		</div>
		<div class="field year">
			<div class="label">YEAR</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="grid-container">
		{#each months as month}
			<div class="month-box">
				<div class="month-name">{month.toUpperCase()}</div>
				<div class="notes-area">
					{#each Array(6) as _}
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
		.year {
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
	}

	.month-name {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text);
		border-bottom: 2px solid var(--outline);
		padding-bottom: 0.25rem;
		margin-bottom: 0.5rem;
		letter-spacing: 0.5px;
	}

	.notes-area {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		flex: 1;
	}

	.note-line {
		border-bottom: 1px dashed var(--outline-low, #e0e0e0);
		height: 1rem;
	}
</style>

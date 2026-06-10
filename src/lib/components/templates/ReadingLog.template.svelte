<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import Field from '$atoms/Field.atom.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
</script>

<div class="planner page reading-log">
	<header>
		<div class="field flex-1">
			<Field i="📚">READING LOG</Field>
		</div>
	</header>

	<div class="box-container flex-1 mt-4">
		<div class="table-header section-header">
			<div class="col-title border-r border-[var(--outline)]">BOOK TITLE & AUTHOR</div>
			<div class="col-date border-r border-[var(--outline)]">DATE</div>
			<div class="col-rating">RATING</div>
		</div>
		{#each Array(15) as _}
			<div class="table-row">
				<div class="col-title border-r border-[var(--outline)]">
					<div class="line"></div>
				</div>
				<div class="col-date border-r border-[var(--outline)]">
					<div class="line"></div>
				</div>
				<div class="col-rating">
					{#each Array(5) as _}
						<span class="star">☆</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.reading-log {
		.table-header {
			display: flex;
			background-color: var(--nav-bg-pdf, var(--bg-high));
			border-bottom: 2px solid var(--outline);
			padding: 0;
			margin-bottom: 0;
			text-align: center;

			> div {
				padding: 0.5rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.table-row {
			display: flex;
			flex: 1;
			border-bottom: 1px solid var(--outline);

			&:last-child {
				border-bottom: none;
			}
			
			> div {
				padding: 0 0.5rem;
				height: 100%;
				display: flex;
				align-items: flex-end;
				padding-bottom: 0.5rem;
				box-sizing: border-box;
			}
		}

		.col-title {
			flex: 4;
		}
		.col-date {
			flex: 1;
		}
		.col-rating {
			flex: 1.5;
			display: flex;
			gap: 0.25rem;
			align-items: center;
			justify-content: center;
			padding-bottom: 0.5rem !important;

			.star {
				font-size: 1.25rem;
				color: var(--outline-high);
			}
		}
	}
</style>

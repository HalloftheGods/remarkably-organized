<script lang="ts">
	import type { Collection, PlannerSettings } from '$lib';

	let {
		collection = {} as Collection,
		settings = {} as any /* PlannerSettings */,
		indexPage = 0,
		isInteractive = false,
	} = $props<{
		collection: Collection;
		settings: PlannerSettings;
		indexPage?: number;
		isInteractive?: boolean;
	}>();

	const total = $derived(collection.total || 0);
	const cols = $derived(
		collection.indexColumns ||
			(total <= 20 ? 1 : total <= 60 ? 2 : total <= 108 ? 3 : total <= 144 ? 4 : 5),
	);
	const rows = $derived(Math.ceil(total / cols));
</script>

<div class="planner page padded collection-index" style:--rows={rows} style:--cols={cols}>
	{#each new Array(total) as _, i (i)}
		{@const r = (i % rows) + 1}
		{@const c = Math.floor(i / rows) + 1}
		{@const itemNumber = i + 1 + indexPage * total}
		{#if isInteractive}
			<a
				href="#{collection.id}-{itemNumber}"
				class="collection-item"
				style="grid-row: {r}; grid-column: {c};">
				<span class="number">{itemNumber}.</span>
			</a>
		{:else}
			<div class="collection-item" style="grid-row: {r}; grid-column: {c};">
				<span class="number">{itemNumber}.</span>
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	.collection-index {
		display: grid;
		grid-template-rows: repeat(var(--rows), minmax(1.5rem, 1fr));
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-gap: 0 1rem;
		flex: 1;
		width: 100%;
		height: 100%;
		padding: 0rem 2rem 1rem;
		font-weight: var(--font-weight-light);

		.collection-item {
			color: var(--text);
			border-bottom: solid 1px var(--outline);
			display: flex;
			align-items: end;
			padding: 0 0.25rem 0.1rem;
			line-height: 1;
			text-decoration: none;

			.number {
				font-size: 0.8em;
				opacity: 0.6;
			}
		}

		a.collection-item:hover {
			background-color: rgba(var(--action-rgb), 0.05);
		}
	}
</style>

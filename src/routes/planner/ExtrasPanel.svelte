<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import CaretUpIcon from '~icons/fa/caret-up';
	import CaretDownIcon from '~icons/fa/caret-down';
	import { toast } from '$lib/components/toast.state.svelte';

	let {
		settings,
		getAvailablePageTemplates,
	}: {
		settings: PlannerSettings;
		getAvailablePageTemplates: (location: 'collection' | 'year' | 'month' | 'quarter' | 'week' | 'day') => { name: string; value: string }[];
	} = $props();

	const handleDetailsToggle = (e: Event) => {
		const target = e.currentTarget as HTMLDetailsElement;
		const isOpened = target.open;
		if (isOpened) {
			setTimeout(() => {
				target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}, 100);
		}
	};

	const hasColumnsOption = (type: string) =>
		type.startsWith('numbered') || type.startsWith('lined') || type.startsWith('todo');

	const removeCollection = (i: number) => {
		const removed = settings.collections.splice(i, 1)[0];
		const restoreAt = i;
		toast.undo(`Removed "${removed.name}"`, () => {
			settings.collections.splice(restoreAt, 0, removed);
		});
	};

	const removeCalendar = (i: number) => {
		const removed = settings.calendars.splice(i, 1)[0];
		const restoreAt = i;
		toast.undo(`Removed "${removed.name || 'Calendar'}"`, () => {
			settings.calendars.splice(restoreAt, 0, removed);
		});
	};

	const moveCollectionUp = (i: number) => {
		const item = settings.collections.splice(i, 1)[0];
		settings.collections.splice(i - 1, 0, item);
	};

	const moveCollectionDown = (i: number) => {
		const item = settings.collections.splice(i, 1)[0];
		settings.collections.splice(i + 1, 0, item);
	};

	const addCollection = () => {
		settings.collections.push({
			name: 'Notes',
			id: `${Date.now()}`,
			total: 20,
			type: 'blank',
			numIndexPages: 1,
			numPagesPerItem: 1,
			columns: 1,
		});
	};

	const addCalendar = () => {
		settings.calendars.push({
			events: [],
			lastUpdated: 0,
			name: '',
			updating: false,
			url: '',
		});
	};

	const isAnyCalendarUpdating = $derived(settings.calendars.some((c) => c.updating));
</script>

<h2>Extra Settings</h2>
<form>
	<details ontoggle={handleDetailsToggle}>
		<summary>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.customCollections.disable}
					onchange={(e) => { settings.customCollections.disable = !e.currentTarget.checked; }}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3 style="margin: 0;">Collections</h3>
			</div>
		</summary>
		{#if !settings.customCollections.disable}
		<div class="collections">
			{#each settings.collections as collection, i (collection.id)}
				<fieldset>
					<div
						style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
						<label for="" style="margin: 0;">Collection {i + 1}</label>
						<div style="display: flex; gap: 0.25rem;">
							<button
								type="button"
								disabled={i === 0}
								onclick={() => moveCollectionUp(i)}
								title="Move Up"
								style="padding: 0.25rem 0.5rem; display: flex; align-items: center; justify-content: center;">
								<CaretUpIcon />
							</button>
							<button
								type="button"
								disabled={i === settings.collections.length - 1}
								onclick={() => moveCollectionDown(i)}
								title="Move Down"
								style="padding: 0.25rem 0.5rem; display: flex; align-items: center; justify-content: center;">
								<CaretDownIcon />
							</button>
						</div>
					</div>
					<input type="text" bind:value={collection.name} placeholder="Name" />
					<fieldset style="margin-top: 1rem;">
						<label for="collection-{collection.id}-type">Page Template</label>
						<select id="collection-{collection.id}-type" bind:value={collection.type}>
							{#each getAvailablePageTemplates('collection') as template}
								<option value={template.value}>{template.name}</option>
							{/each}
						</select>
					</fieldset>
					{#if hasColumnsOption(collection.type)}
						<fieldset style="margin-top: 1rem;">
							<label for="collection-{collection.id}-columns">Columns</label>
							<input type="number" placeholder="Columns" id="collection-{collection.id}-columns" min="1" step="1" bind:value={collection.columns} />
						</fieldset>
					{/if}
					<fieldset style="margin-top: 1rem;">
						<label for="collection-{collection.id}-numIndexPages">Number of Index Pages</label>
						<input type="number" placeholder="Number of Index Pages" id="collection-{collection.id}-numIndexPages" min="0" step="1" bind:value={collection.numIndexPages} />
					</fieldset>
					<fieldset style="margin-top: 1rem;">
						<label for="collection-{collection.id}-total">Number of Items Per Index Page</label>
						<input type="number" placeholder="Number of Items Per Index Page" id="collection-{collection.id}-total" min="1" max="180" step="1" bind:value={collection.total} />
					</fieldset>
					<fieldset style="margin-top: 1rem;">
						<label for="collection-{collection.id}-numPagesPerItem">Number of Pages Per Item</label>
						<input type="number" placeholder="Number of Pages Per Item" id="collection-{collection.id}-numPagesPerItem" min="1" step="1" bind:value={collection.numPagesPerItem} />
					</fieldset>
					<button type="button" class="btn-remove" onclick={() => removeCollection(i)}>
						Remove Collection
					</button>
				</fieldset>
			{/each}
			<button type="button" class="btn-add" onclick={addCollection}>
				➕ Add New Collection
			</button>
		</div>
		{/if}
	</details>

	<details ontoggle={handleDetailsToggle}>
		<summary><h3>Sync Calendar Events</h3></summary>
		<div class="calendar-panel-content">
			{#each settings.calendars as calendar, i (calendar.url)}
				<div class="calendar-item">
					<div class="calendar-header-row">
						<strong>{calendar.name || 'Custom Calendar'}</strong>
						<span class="event-count">({calendar.events.length} events)</span>
					</div>
					{#if calendar.lastUpdated}
						<span class="last-updated">
							Last Updated: {new Date(calendar.lastUpdated).toLocaleString()}
						</span>
					{/if}
					<fieldset style="margin-top: 0.5rem;">
						<label for="calendar-{i}-name">Name</label>
						<input type="text" id="calendar-{i}-name" bind:value={calendar.name} placeholder="Google Holidays, Personal..." />
					</fieldset>
					<fieldset style="margin-top: 0.5rem;">
						<label for="calendar-{i}-url">ICS URL</label>
						<input type="text" id="calendar-{i}-url" bind:value={calendar.url} placeholder="https://..." />
					</fieldset>
					<div class="calendar-actions">
						<button type="button" class="btn-import" disabled={isAnyCalendarUpdating} onclick={() => settings.importEvents(i)}>
							{calendar.updating ? 'Importing...' : 'Sync Events'}
						</button>
						<button type="button" class="btn-remove" disabled={isAnyCalendarUpdating} onclick={() => removeCalendar(i)}>
							Remove URL
						</button>
					</div>
				</div>
			{/each}
			<button type="button" class="btn-add" disabled={isAnyCalendarUpdating} onclick={addCalendar}>
				➕ Add Calendar URL
			</button>
		</div>
	</details>
</form>

<style lang="scss">
@import './_panels.scss';
</style>

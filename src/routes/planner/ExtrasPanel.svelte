<script lang="ts">
	import type { PlannerSettings, PageTemplate } from '$lib';
	import CaretUpIcon from '~icons/fa/caret-up';
	import CaretDownIcon from '~icons/fa/caret-down';
	import BookOpenIcon from '~icons/fa-solid/book-open';
	import HelpIcon from '~icons/fa/question-circle';
	import GalleryIcon from '~icons/fa/image';
	import { toast } from '$state';

	let {
		settings,
		getAvailablePageTemplates,
		openTemplatePicker = (() => {}) as (
			allowedTemplates: { name: string; value: string }[],
			onSelect: (value: string) => void,
		) => void,
	}: {
		settings: PlannerSettings;
		getAvailablePageTemplates: (
			location: 'collection' | 'year' | 'month' | 'quarter' | 'week' | 'day',
		) => { name: string; value: string }[];
		openTemplatePicker?: (
			allowedTemplates: { name: string; value: string }[],
			onSelect: (value: string) => void,
			currentTemplate?: string,
		) => void;
	} = $props();

	let helpDialog: HTMLDialogElement;

	const showHelpModal = (e: Event) => {
		e.preventDefault();
		e.stopPropagation();
		helpDialog?.showModal();
	};

	const closeHelpModal = () => {
		helpDialog?.close();
	};

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

	function scrollTo(id: string | undefined) {
		if (!id) return;
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
	}

	function handleTitleKey(e: KeyboardEvent, id: string | undefined) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.stopPropagation();
			e.preventDefault();
			scrollTo(id);
		}
	}
</script>

<h2>
	Collections & Events
	<BookOpenIcon style="opacity: 0.5;" />
</h2>

<dialog
	bind:this={helpDialog}
	class="help-dialog"
	onclick={(e) => {
		if (e.target === helpDialog) closeHelpModal();
	}}>
	<div class="dialog-inner">
		<h3>
			<HelpIcon style="vertical-align: -0.1em; opacity: 0.5; margin-right: 0.25rem;" /> Syncing
			Private Calendars
		</h3>
		<p>
			You can sync a private calendar by temporarily making it public, copying the ICS
			link here to import, and then immediately switching it back to private!
		</p>
		<div style="text-align: right; margin-top: 1.5rem;">
			<button
				type="button"
				onclick={closeHelpModal}
				style="padding: 0.5rem 1.5rem; background: var(--action); color: var(--action-text); border: none; border-radius: var(--radius-2); cursor: pointer; font-weight: 500;">
				Got it
			</button>
		</div>
	</div>
</dialog>

<form>
	<details ontoggle={handleDetailsToggle}>
		<summary
			onclick={(e) => {
				if (settings.customCollections.disable) e.preventDefault();
			}}
			style:cursor={settings.customCollections.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.customCollections.disable}
					onchange={(e) => {
						settings.customCollections.disable = !e.currentTarget.checked;
						if (settings.customCollections.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3
					class="scroll-title"
					data-tooltip="Scroll to Collections pages"
					role="button"
					tabindex="0"
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						scrollTo(settings.collections[0]?.id);
					}}
					onkeydown={(e) => handleTitleKey(e, settings.collections[0]?.id)}>
					Collections
				</h3>
			</div>
		</summary>
		{#if !settings.customCollections.disable}
			<div
				style="background: var(--surface-2); padding: 0.75rem 1rem; border-radius: var(--radius-2); font-size: 0.85em; margin-bottom: 1rem; border-left: 3px solid var(--action); color: var(--text-low);">
				<strong>Tip:</strong>
				Start a collection name with an emoji to display it in the top right corner of its pages.
			</div>
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
							<div style="display: flex; gap: 0.5rem; align-items: center;">
								<select
									id="collection-{collection.id}-type"
									bind:value={collection.type}
									style="flex: 1;">
									{#each getAvailablePageTemplates('collection') as template}
										<option value={template.value}>{template.name}</option>
									{/each}
								</select>
								<button
									class="picker-btn"
									type="button"
									aria-label="Select Template from Gallery"
									onclick={() =>
										openTemplatePicker(
											getAvailablePageTemplates('collection'),
											(val) => (collection.type = val as PageTemplate),
											collection.type,
										)}>
									<GalleryIcon />
								</button>
							</div>
						</fieldset>
						{#if hasColumnsOption(collection.type)}
							<fieldset style="margin-top: 1rem;">
								<label for="collection-{collection.id}-columns">Columns</label>
								<input
									type="number"
									placeholder="Columns"
									id="collection-{collection.id}-columns"
									min="1"
									step="1"
									bind:value={collection.columns} />
							</fieldset>
						{/if}
						<fieldset style="margin-top: 1rem;">
							<label for="collection-{collection.id}-indexColumns">
								Index Columns <small>(Leave blank for auto)</small>
							</label>
							<input
								type="number"
								placeholder="Auto"
								id="collection-{collection.id}-indexColumns"
								min="1"
								step="1"
								bind:value={collection.indexColumns} />
						</fieldset>
						<fieldset style="margin-top: 1rem;">
							<label for="collection-{collection.id}-numIndexPages">
								Number of Index Pages
							</label>
							<input
								type="number"
								placeholder="Number of Index Pages"
								id="collection-{collection.id}-numIndexPages"
								min="0"
								step="1"
								bind:value={collection.numIndexPages} />
						</fieldset>
						<fieldset style="margin-top: 1rem;">
							<label for="collection-{collection.id}-total">
								Number of Items Per Index Page
							</label>
							<input
								type="number"
								placeholder="Number of Items Per Index Page"
								id="collection-{collection.id}-total"
								min="1"
								max="180"
								step="1"
								bind:value={collection.total} />
						</fieldset>
						<fieldset style="margin-top: 1rem;">
							<label for="collection-{collection.id}-numPagesPerItem">
								Number of Pages Per Item
							</label>
							<input
								type="number"
								placeholder="Number of Pages Per Item"
								id="collection-{collection.id}-numPagesPerItem"
								min="1"
								step="1"
								bind:value={collection.numPagesPerItem} />
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
		<summary>
			<div
				style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
				<h3 style="margin: 0;">Sync Calendar Events</h3>
				<button
					type="button"
					class="help-btn"
					onclick={showHelpModal}
					aria-label="Help with syncing calendars">
					<HelpIcon />
				</button>
			</div>
		</summary>
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
						<input
							type="text"
							id="calendar-{i}-name"
							bind:value={calendar.name}
							placeholder="Google Holidays, Personal..." />
					</fieldset>
					<fieldset style="margin-top: 0.5rem;">
						<label for="calendar-{i}-url">ICS URL</label>
						<input
							type="text"
							id="calendar-{i}-url"
							bind:value={calendar.url}
							placeholder="https://..." />
					</fieldset>
					<div class="calendar-actions">
						<button
							type="button"
							class="btn-import"
							disabled={isAnyCalendarUpdating}
							onclick={() => settings.importEvents(i)}>
							{calendar.updating ? 'Importing...' : 'Sync Events'}
						</button>
						<button
							type="button"
							class="btn-remove"
							disabled={isAnyCalendarUpdating}
							onclick={() => removeCalendar(i)}>
							Remove URL
						</button>
					</div>
				</div>
			{/each}
			<button
				type="button"
				class="btn-add"
				disabled={isAnyCalendarUpdating}
				onclick={addCalendar}>
				➕ Add Calendar URL
			</button>
		</div>
	</details>
</form>

<style lang="scss">
	@import './_panels.scss';

	.scroll-title {
		margin: 0;
		cursor: pointer;
		text-decoration: none;
		transition: opacity 0.2s;
		&:hover,
		&:focus {
			text-decoration: underline;
			outline: none;
		}
	}

	.help-dialog {
		background: transparent;
		border: none;
		padding: 0;
		max-width: 400px;
		width: 90vw;
		&::backdrop {
			background: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(4px);
		}
		.dialog-inner {
			background: var(--bg);
			border: 1px solid var(--outline);
			padding: 1.5rem;
			border-radius: var(--radius-3);
			color: var(--text);
			box-shadow: var(--shadow-6);
			h3 {
				margin: 0 0 0.5rem;
				font-size: 1.2rem;
				padding-bottom: 0.5rem;
				border-bottom: 1px solid var(--outline);
			}
			p {
				margin: 1rem 0 0;
				font-size: 0.95rem;
				line-height: 1.5;
				opacity: 0.9;
			}
		}
	}

	.picker-btn {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-2);
		color: var(--text);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		transition:
			background-color 0.2s,
			color 0.2s;
		&:hover {
			background: var(--primary);
			color: white;
		}
	}
</style>

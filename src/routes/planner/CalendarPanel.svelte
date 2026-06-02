<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import CalendarIcon from '~icons/fa/calendar';

	let {
		settings,
		customTimeframe = $bindable(false),
		onTimeframeSelection,
		onStartDateChange,
		onEndDateChange,
		getAvailablePageTemplates,
	}: {
		settings: PlannerSettings;
		customTimeframe: boolean;
		onTimeframeSelection: (e: Event) => void;
		onStartDateChange: (e: Event) => void;
		onEndDateChange: (e: Event) => void;
		getAvailablePageTemplates: (
			location: 'collection' | 'year' | 'month' | 'quarter' | 'week' | 'day',
		) => { name: string; value: string }[];
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

	const isFullYear = $derived(
		settings.date.start.getUTCMonth() === 0 &&
			settings.date.start.getUTCDate() === 1 &&
			settings.date.end.getUTCMonth() === 11 &&
			settings.date.end.getUTCDate() === 31 &&
			!customTimeframe,
	);

	const isCustomRange = $derived(
		customTimeframe ||
			settings.date.start.getUTCMonth() !== 0 ||
			settings.date.start.getUTCDate() !== 1 ||
			settings.date.end.getUTCMonth() !== 11 ||
			settings.date.end.getUTCDate() !== 31,
	);

	const hasWeekNumbers = $derived(
		settings.weekPage.sideNavDisplay === 'weeks-this-month' ||
			settings.weekPage.sideNavDisplay === 'weeks-this-year',
	);
</script>

<h2>
	Calendar Views
	<CalendarIcon style="opacity: 0.5;" />
</h2>
<form>
	<fieldset>
		<label for="timeframeBasedOnYear">Year</label>
		<select
			id="timeframeBasedOnYear"
			value={isFullYear ? settings.date.start.getTime() : 0}
			onchange={onTimeframeSelection}>
			{#each new Array(5) as _, i (i)}
				{@const date = new Date(Date.UTC(new Date().getFullYear() + i))}
				<option value={date.getTime()}>
					{date.getUTCFullYear()}
				</option>
			{/each}
			<option value={0}>Custom Date Range</option>
		</select>
	</fieldset>
	{#if isCustomRange}
		<fieldset>
			<label for="start">Start Date</label>
			<input
				type="date"
				placeholder="Start Date"
				id="start"
				max={settings.date.end.toISOString().slice(0, 10)}
				value={settings.date.start.toISOString().slice(0, 10)}
				onchange={onStartDateChange} />
		</fieldset>
		<fieldset>
			<label for="end">End Date</label>
			<input
				type="date"
				placeholder="End Date"
				id="end"
				min={settings.date.start.toISOString().slice(0, 10)}
				value={settings.date.end.toISOString().slice(0, 10)}
				onchange={onEndDateChange} />
		</fieldset>
	{/if}
	<div class="checkbox" style="margin-bottom: 1rem;">
		<input
			type="checkbox"
			bind:checked={settings.date.startWeekOnSunday}
			id="startWeekOnSunday" />
		<label for="startWeekOnSunday">Start Week on Sunday</label>
	</div>

	<details ontoggle={handleDetailsToggle}>
		<summary onclick={(e) => { if (settings.yearPage.disable) e.preventDefault(); }} style:cursor={settings.yearPage.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.yearPage.disable}
					onchange={(e) => {
						settings.yearPage.disable = !e.currentTarget.checked;
						if (settings.yearPage.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3
					class="scroll-title"
					data-tooltip="Scroll to Yearly pages"
					role="button"
					tabindex="0"
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						scrollTo(settings.years[0]?.year?.toString());
					}}
					onkeydown={(e) => handleTitleKey(e, settings.years[0]?.year?.toString())}>
					Yearly
				</h3>
			</div>
		</summary>
		{#if !settings.yearPage.disable}
			<fieldset>
				<label for="yearNotePagesAmount">Additional Note Pages</label>
				<input
					type="number"
					placeholder="Additional Note Pages"
					id="yearNotePagesAmount"
					min="0"
					step="1"
					bind:value={settings.yearPage.notePagesAmount} />
			</fieldset>
			{#if settings.yearPage.notePagesAmount > 0}
				<fieldset>
					<label for="yearNotePagesTemplate">Additional Note Pages Template</label>
					<select
						id="yearNotePagesTemplate"
						bind:value={settings.yearPage.notePagesTemplate}>
						{#each getAvailablePageTemplates('year') as template (template.value)}
							<option value={template.value}>{template.name}</option>
						{/each}
					</select>
				</fieldset>
			{/if}
		{/if}
	</details>

	<details ontoggle={handleDetailsToggle}>
		<summary onclick={(e) => { if (settings.quarterPage.disable) e.preventDefault(); }} style:cursor={settings.quarterPage.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.quarterPage.disable}
					onchange={(e) => {
						settings.quarterPage.disable = !e.currentTarget.checked;
						if (settings.quarterPage.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3
					class="scroll-title"
					data-tooltip="Scroll to Quarterly pages"
					role="button"
					tabindex="0"
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						scrollTo(settings.quarters[0]?.id);
					}}
					onkeydown={(e) => handleTitleKey(e, settings.quarters[0]?.id)}>
					Quarterly
				</h3>
			</div>
		</summary>
		{#if !settings.quarterPage.disable}
			<fieldset>
				<label for="quarterNotePagesAmount">Additional Note Pages</label>
				<input
					type="number"
					placeholder="Additional Note Pages"
					id="quarterNotePagesAmount"
					min="0"
					step="1"
					bind:value={settings.quarterPage.notePagesAmount} />
			</fieldset>
			{#if settings.quarterPage.notePagesAmount > 0}
				<fieldset>
					<label for="quarterNotePagesTemplate">Additional Note Pages Template</label>
					<select
						id="quarterNotePagesTemplate"
						bind:value={settings.quarterPage.notePagesTemplate}>
						{#each getAvailablePageTemplates('quarter') as template (template.value)}
							<option value={template.value}>{template.name}</option>
						{/each}
					</select>
				</fieldset>
			{/if}
		{/if}
	</details>

	<details ontoggle={handleDetailsToggle}>
		<summary onclick={(e) => { if (settings.monthPage.disable) e.preventDefault(); }} style:cursor={settings.monthPage.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.monthPage.disable}
					onchange={(e) => {
						settings.monthPage.disable = !e.currentTarget.checked;
						if (settings.monthPage.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3
					class="scroll-title"
					data-tooltip="Scroll to Monthly pages"
					role="button"
					tabindex="0"
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						scrollTo(settings.months[0]?.id);
					}}
					onkeydown={(e) => handleTitleKey(e, settings.months[0]?.id)}>
					Monthly
				</h3>
			</div>
		</summary>
		{#if !settings.monthPage.disable}
			<fieldset>
				<label for="monthPageTemplate">Month Page Template</label>
				<select id="monthPageTemplate" bind:value={settings.monthPage.template}>
					{#each getAvailablePageTemplates('month') as template (template.value)}
						<option value={template.value}>{template.name}</option>
					{/each}
				</select>
			</fieldset>
			<fieldset>
				<label for="monthNotePagesAmount">Additional Note Pages</label>
				<input
					type="number"
					placeholder="Additional Note Pages"
					id="monthNotePagesAmount"
					min="0"
					step="1"
					bind:value={settings.monthPage.notePagesAmount} />
			</fieldset>
			{#if settings.monthPage.notePagesAmount > 0}
				<fieldset>
					<label for="monthNotePagesTemplate">Additional Note Pages Template</label>
					<select
						id="monthNotePagesTemplate"
						bind:value={settings.monthPage.notePagesTemplate}>
						{#each getAvailablePageTemplates('month') as template (template.value)}
							<option value={template.value}>{template.name}</option>
						{/each}
					</select>
				</fieldset>
			{/if}
		{/if}
	</details>

	<details ontoggle={handleDetailsToggle}>
		<summary onclick={(e) => { if (settings.weekPage.disable) e.preventDefault(); }} style:cursor={settings.weekPage.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.weekPage.disable}
					onchange={(e) => {
						settings.weekPage.disable = !e.currentTarget.checked;
						if (settings.weekPage.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3
					class="scroll-title"
					data-tooltip="Scroll to Weekly pages"
					role="button"
					tabindex="0"
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						scrollTo(settings.weeks[0]?.id);
					}}
					onkeydown={(e) => handleTitleKey(e, settings.weeks[0]?.id)}>
					Weekly
				</h3>
			</div>
		</summary>
		{#if !settings.weekPage.disable}
			<fieldset>
				<label for="weekPageTemplate">Week Page Template</label>
				<select id="weekPageTemplate" bind:value={settings.weekPage.template}>
					{#each getAvailablePageTemplates('week') as template (template.value)}
						<option value={template.value}>{template.name}</option>
					{/each}
				</select>
			</fieldset>
			<fieldset>
				<label for="weekNotePagesAmount">Additional Note Pages</label>
				<input
					type="number"
					placeholder="Additional Note Pages"
					id="weekNotePagesAmount"
					min="0"
					step="1"
					bind:value={settings.weekPage.notePagesAmount} />
			</fieldset>
			{#if settings.weekPage.notePagesAmount > 0}
				<fieldset>
					<label for="weekNotePagesTemplate">Additional Note Pages Template</label>
					<select
						id="weekNotePagesTemplate"
						bind:value={settings.weekPage.notePagesTemplate}>
						{#each getAvailablePageTemplates('week') as template (template.value)}
							<option value={template.value}>{template.name}</option>
						{/each}
					</select>
				</fieldset>
			{/if}
			<fieldset>
				<label for="weekSideNavDisplay">Sidebar Display</label>
				<select id="weekSideNavDisplay" bind:value={settings.weekPage.sideNavDisplay}>
					<option value="days-this-week">Days of the Week</option>
					<option value="days-this-month">Days of the Month</option>
					<option value="weeks-this-year">Weeks of the Year</option>
					<option value="weeks-this-month">Weeks of the Month</option>
					<option value="months">Months</option>
					<option value="none">None</option>
				</select>
			</fieldset>
			{#if hasWeekNumbers}
				<div class="checkbox">
					<input
						type="checkbox"
						bind:checked={settings.weekPage.useWeekNumbersInSideNav}
						id="useWeekNumbersInSideNav" />
					<label for="useWeekNumbersInSideNav">Show week numbers in side bar</label>
				</div>
			{/if}
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.weekPage.useWeekSinceYear}
					id="useWeekSinceYear" />
				<label for="useWeekSinceYear">Use week number from start of year</label>
			</div>
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.weekPage.use24HourClock}
					id="use24HourClockWeek" />
				<label for="use24HourClockWeek">Use 24-hour clock</label>
			</div>
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.weekPage.alignDayTextRight}
					id="alignDayTextRight" />
				<label for="alignDayTextRight">Align day text to the right</label>
			</div>
		{/if}
	</details>

	<details ontoggle={handleDetailsToggle}>
		<summary onclick={(e) => { if (settings.dayPage.disable) e.preventDefault(); }} style:cursor={settings.dayPage.disable ? 'default' : 'pointer'}>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.dayPage.disable}
					onchange={(e) => {
						settings.dayPage.disable = !e.currentTarget.checked;
						if (settings.dayPage.disable) {
							const details = (e.currentTarget as HTMLElement).closest('details');
							if (details) details.open = false;
						}
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3
					class="scroll-title"
					data-tooltip="Scroll to Daily pages"
					role="button"
					tabindex="0"
					onclick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						scrollTo(settings.days[0]?.id);
					}}
					onkeydown={(e) => handleTitleKey(e, settings.days[0]?.id)}>
					Daily
				</h3>
			</div>
		</summary>
		{#if !settings.dayPage.disable}
			<fieldset>
				<label for="dayPageTemplate">Day Page Template</label>
				<select id="dayPageTemplate" bind:value={settings.dayPage.template}>
					{#each getAvailablePageTemplates('day') as template (template.value)}
						<option value={template.value}>{template.name}</option>
					{/each}
				</select>
			</fieldset>
			<fieldset>
				<label for="dayNotePagesAmount">Additional Note Pages</label>
				<input
					type="number"
					placeholder="Additional Note Pages"
					id="dayNotePagesAmount"
					min="0"
					step="1"
					bind:value={settings.dayPage.notePagesAmount} />
			</fieldset>
			{#if settings.dayPage.notePagesAmount > 0}
				<fieldset>
					<label for="dayNotePagesTemplate">Additional Note Pages Template</label>
					<select
						id="dayNotePagesTemplate"
						bind:value={settings.dayPage.notePagesTemplate}>
						{#each getAvailablePageTemplates('day') as template (template.value)}
							<option value={template.value}>{template.name}</option>
						{/each}
					</select>
				</fieldset>
			{/if}
			<fieldset>
				<label for="daySideNavDisplay">Sidebar Display</label>
				<select id="daySideNavDisplay" bind:value={settings.dayPage.sideNavDisplay}>
					<option value="days-this-week">Days of the Week</option>
					<option value="days-this-month">Days of the Month</option>
					<option value="days-this-year">Days of the Year</option>
					<option value="weeks-this-year">Weeks of the Year</option>
					<option value="weeks-this-month">Weeks of the Month</option>
					<option value="months">Months</option>
					<option value="none">None</option>
				</select>
			</fieldset>
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.dayPage.use24HourClock}
					id="use24HourClockDay" />
				<label for="use24HourClockDay">Use 24-hour clock</label>
			</div>
		{/if}
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
</style>

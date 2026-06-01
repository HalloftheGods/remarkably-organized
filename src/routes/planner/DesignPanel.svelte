<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { fonts as fontsList } from '../fonts/fonts';

	type FontEntry = (typeof fontsList)[number];

	let {
		settings,
		fonts,
		enableHighResolution = $bindable(false),
	}: {
		settings: PlannerSettings;
		fonts: FontEntry[];
		enableHighResolution: boolean;
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
</script>

<h2>Design & Layout</h2>
<form>
	<div class="checkbox" style="margin-top: 1rem; margin-bottom: 1rem;">
		<input
			type="checkbox"
			bind:checked={enableHighResolution}
			id="enableHighResolution" />
		<label for="enableHighResolution">Print in high resolution (bigger file)</label>
	</div>
	<details ontoggle={handleDetailsToggle}>
		<summary><h3>Font & Colors</h3></summary>
		<fieldset>
			<label for="designFont">Font</label>
			<select id="designFont" bind:value={settings.design.font}>
				{#each fonts as font (font.name)}
					<option value={font.name}>{font.name}</option>
				{/each}
			</select>
		</fieldset>
		<fieldset>
			<label for="textColor">Text Color</label>
			<input
				type="color"
				placeholder="Text Color"
				id="textColor"
				bind:value={settings.design.colorText} />
		</fieldset>
		<fieldset>
			<label for="linesColor">Lines/Border Color</label>
			<input
				type="color"
				placeholder="Lines/Border"
				id="linesColor"
				bind:value={settings.design.colorLines} />
		</fieldset>
		<fieldset>
			<label for="dotsColor">Dots Color</label>
			<input
				type="color"
				placeholder="Dots Color"
				id="dotsColor"
				bind:value={settings.design.colorDots} />
		</fieldset>
	</details>
	<details ontoggle={handleDetailsToggle}>
		<summary>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.coverPage.disable}
					onchange={(e) => {
						settings.coverPage.disable = !e.currentTarget.checked;
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3 style="margin: 0;">Cover Page</h3>
			</div>
		</summary>
		{#if !settings.coverPage.disable}
			<fieldset>
				<label for="coverPageTitle">Cover Page Title</label>
				<input
					type="text"
					placeholder="Cover Page Title"
					id="coverPageTitle"
					bind:value={settings.coverPage.title} />
			</fieldset>
			<fieldset>
				<label for="name">Contact Name</label>
				<input
					type="text"
					placeholder="Name"
					id="name"
					bind:value={settings.coverPage.name} />
			</fieldset>
			<fieldset>
				<label for="email">Contact Email/Phone</label>
				<input
					type="text"
					placeholder="Contact Email/Phone"
					id="email"
					bind:value={settings.coverPage.email} />
			</fieldset>
			<fieldset>
				<label for="coverPageFont">Font</label>
				<select id="coverPageFont" bind:value={settings.coverPage.font}>
					{#each fonts as font (font.name)}
						<option value={font.name}>{font.name}</option>
					{/each}
				</select>
			</fieldset>
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.coverPage.showCollectionLinks}
					id="coverPageShowCollectionLinks" />
				<label for="coverPageShowCollectionLinks">Show Links to Collections</label>
			</div>
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.coverPage.darkBackground}
					id="coverPageDarkBackground" />
				<label for="coverPageDarkBackground">Dark Background</label>
			</div>
		{/if}
	</details>
	<details ontoggle={handleDetailsToggle}>
		<summary>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.dashboardPage.disable}
					onchange={(e) => {
						settings.dashboardPage.disable = !e.currentTarget.checked;
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3 style="margin: 0;">Dashboard Page</h3>
			</div>
		</summary>
		{#if !settings.dashboardPage.disable}
			<div class="row">
				<label for="dashboardPage-title">Title</label>
				<input
					type="text"
					id="dashboardPage-title"
					bind:value={settings.dashboardPage.title}
					placeholder="Dashboard" />
			</div>
			<fieldset style="margin-top: 1rem;">
				<label for="dashboardPage-fontSize">
					Font Size Scale: {settings.dashboardPage.fontSize.toFixed(2)}x
				</label>
				<input
					type="range"
					id="dashboardPage-fontSize"
					min="0.5"
					max="1.5"
					step="0.05"
					bind:value={settings.dashboardPage.fontSize}
					style="width: 100%; cursor: pointer;" />
			</fieldset>
		{/if}
	</details>
	<details ontoggle={handleDetailsToggle}>
		<summary>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.topNav.disable}
					onchange={(e) => {
						settings.topNav.disable = !e.currentTarget.checked;
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3 style="margin: 0;">Topbar Navigation</h3>
			</div>
		</summary>
		{#if !settings.topNav.disable}
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.topNav.showCollectionLinks}
					id="topNavShowCollectionLinks" />
				<label for="topNavShowCollectionLinks">Show Links to Collections</label>
			</div>
			<fieldset>
				<label for="topNavFont">Font</label>
				<select id="topNavFont" bind:value={settings.topNav.font}>
					{#each fonts as font (font.name)}
						<option value={font.name}>{font.name}</option>
					{/each}
				</select>
			</fieldset>
		{/if}
	</details>
	<details ontoggle={handleDetailsToggle}>
		<summary>
			<div style="display: flex; align-items: center; gap: 0.5rem;">
				<input
					type="checkbox"
					checked={!settings.sideNav.disable}
					onchange={(e) => {
						settings.sideNav.disable = !e.currentTarget.checked;
					}}
					onclick={(e) => e.stopPropagation()}
					style="margin: 0; width: 1.25rem; height: 1.25rem; cursor: pointer;" />
				<h3 style="margin: 0;">Sidebar Navigation</h3>
			</div>
		</summary>
		{#if !settings.sideNav.disable}
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.sideNav.leftSide}
					id="sideNavLeftSide" />
				<label for="sideNavLeftSide">Show Sidebar on Left</label>
			</div>
			<div class="checkbox">
				<input
					type="checkbox"
					bind:checked={settings.sideNav.showCollectionLinks}
					id="sideNavShowCollectionLinks" />
				<label for="sideNavShowCollectionLinks">Show Links to Collections</label>
			</div>
			<fieldset>
				<label for="sideNavFont">Font</label>
				<select id="sideNavFont" bind:value={settings.sideNav.font}>
					{#each fonts as font (font.name)}
						<option value={font.name}>{font.name}</option>
					{/each}
				</select>
			</fieldset>
		{/if}
	</details>
</form>

<style lang="scss">
@import './_panels.scss';
</style>

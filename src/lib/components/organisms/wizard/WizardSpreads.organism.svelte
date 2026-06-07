<script lang="ts">
	import { Box, Text, Input, Button, Toggle } from '$atoms';
	import { InteractivePlannerPreview } from '$molecules';
	import { fade } from 'svelte/transition';
	import type { PlannerSettings } from '$state';

	let { settings } = $props<{ settings: PlannerSettings }>();

	function updateDate(type: 'start' | 'end', event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const [year, month, day] = target.value.split('-').map(Number);
			settings.date[type] = new Date(Date.UTC(year, month - 1, day));
		}
	}

	function formatDateForInput(d: Date) {
		const year = d.getUTCFullYear();
		const month = String(d.getUTCMonth() + 1).padStart(2, '0');
		const day = String(d.getUTCDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
</script>

<Box class="step-content spreads-step" transition="fade" inDuration={150}>
	<Box class="spreads-wizard-layout">
		<Box class="spreads-controls">
			<Text tag="h3" class="welcome-headline-gradient">Spreads</Text>
			<Text tag="p">Generate highly structured, interlinked chronological spreads.</Text>

			<Text tag="h4" style="margin-top: 1.5rem;">Date Range</Text>
			<Box class="date-row">
				<Box class="date-field">
					<Text tag="label" for="guide-date-start">Start Date</Text>
					<Input
						type="date"
						id="guide-date-start"
						value={formatDateForInput(settings.date.start)}
						onclick={(e: any) => e.currentTarget.showPicker()}
						onchange={(e: any) => updateDate('start', e)} />
				</Box>
				<Box class="date-field">
					<Text tag="label" for="guide-date-end">End Date</Text>
					<Input
						type="date"
						id="guide-date-end"
						value={formatDateForInput(settings.date.end)}
						onclick={(e: any) => e.currentTarget.showPicker()}
						onchange={(e: any) => updateDate('end', e)} />
				</Box>
			</Box>

			<!-- <Text tag="h4">Enable Spreads</Text> -->
			<Box class="toggles-grid">
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={!settings.yearPage.disable}
						onchange={() => (settings.yearPage.disable = !settings.yearPage.disable)} />
					Yearly
				</Text>
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={!settings.quarterPage.disable}
						onchange={() =>
							(settings.quarterPage.disable = !settings.quarterPage.disable)} />
					Quarterly
				</Text>
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={!settings.monthPage.disable}
						onchange={() => (settings.monthPage.disable = !settings.monthPage.disable)} />
					Monthly
				</Text>
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={!settings.weekPage.disable}
						onchange={() => (settings.weekPage.disable = !settings.weekPage.disable)} />
					Weekly
				</Text>
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={!settings.dayPage.disable}
						onchange={() => (settings.dayPage.disable = !settings.dayPage.disable)} />
					Daily
				</Text>
			</Box>

			<Text tag="h4" style="margin-top: 1.5rem;">Navigation & Layout</Text>
			<Box class="toggles-grid">
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={!settings.topNav.disable}
						onchange={() => (settings.topNav.disable = !settings.topNav.disable)} />
					Top Navigation
				</Text>
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={!settings.sideNav.disable}
						onchange={() => (settings.sideNav.disable = !settings.sideNav.disable)} />
					Sidebar
				</Text>

				{#if !settings.sideNav.disable}
					<Text tag="label" class="toggle-label">
						<Toggle
							checked={settings.sideNav.leftSide}
							onchange={() => (settings.sideNav.leftSide = !settings.sideNav.leftSide)} />
						Sidebar on Left
					</Text>
				{/if}
				<Text tag="label" class="toggle-label">
					<Toggle
						checked={!settings.customCollections.disable}
						onchange={() =>
							(settings.customCollections.disable =
								!settings.customCollections.disable)} />
					Collections
				</Text>
				{#if !settings.sideNav.disable}
					{#if !settings.customCollections.disable}
						<Text tag="label" class="toggle-label">
							<Toggle
								checked={settings.sideNav.showCollectionLinks}
								onchange={() =>
									(settings.sideNav.showCollectionLinks =
										!settings.sideNav.showCollectionLinks)} />
							Side Collections
						</Text>
					{/if}
				{/if}
				{#if !settings.topNav.disable && !settings.customCollections.disable}
					<Text tag="label" class="toggle-label">
						<Toggle
							checked={settings.topNav.showCollectionLinks}
							onchange={() =>
								(settings.topNav.showCollectionLinks =
									!settings.topNav.showCollectionLinks)} />
						Top Collections
					</Text>
				{/if}
			</Box>
		</Box>

		<Box class="spreads-preview-column">
			<InteractivePlannerPreview {settings} />
		</Box>
	</Box>
</Box>

<style lang="scss">
	:global(.welcome-headline-gradient) {
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: gradient-shift 4s ease-in-out infinite;
	}
	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}

	:global(.spreads-step) {
		height: 100%;
		display: flex;
		flex-direction: column;

		@media (max-width: 768px) {
			height: auto;
		}
	}

	:global(.spreads-wizard-layout) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		height: 100%;
		min-height: 0;

		@media (max-width: 1024px) {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			height: auto;
			overflow: visible;
		}

		:global(.spreads-controls) {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			overflow-y: auto;
			padding-right: 0.5rem;

			@media (max-width: 1024px) {
				overflow: visible;
				padding-right: 0;
			}
		}

		:global(.spreads-preview-column) {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 2rem;
			min-width: 0;

			@media (max-width: 768px) {
				padding: 0;
			}

			:global(.interactive-preview-container) {
				width: 100%;
				max-width: 325px;

				:global(.template-thumbnail) {
					width: 100%;
					box-shadow: var(--shadow-5);
				}
			}
		}
	}

	:global(.spreads-controls) {
		h4 {
			margin: 0 0 0.5rem;
			font-size: 1rem;
			font-weight: 600;
			color: var(--text);
		}

		:global(.date-row) {
			display: flex;
			gap: 1rem;
			@media (min-width: 769px) {
				flex-direction: row;
			}
			:global(.date-field) {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				flex: 1;
				label {
					font-size: 0.75rem;
					font-weight: 600;
					color: var(--text-low);
					text-transform: uppercase;
					letter-spacing: 0.05em;
				}
				input[type='date'] {
					padding: 0.6rem;
					border-radius: var(--radius-2);
					border: 1px solid var(--outline);
					background-color: var(--bg);
					color: var(--text);
					font-family: inherit;
				}
			}
		}

		:global(.toggles-grid) {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			gap: 0.25rem;

			:global(.toggle-label) {
				display: flex;
				align-items: center;
				gap: 0.75rem;
				font-size: 0.9rem;
				cursor: pointer;
				user-select: none;
				padding: 0.25rem 0;
			}
		}
	}
</style>

<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Box, Text, Checkbox } from '$atoms';
	import { Field } from '$molecules';

	let { settings = {} as PlannerSettings } = $props();
	let agendaRows = new Array(12);
	let actionRows = new Array(8);
</script>

<div class="meeting-minutes">
	<Box class="header-section">
		<Box class="top-row">
			<Field class="subject-field" label="SUBJECT" />
			<Field
				class="date-field"
				label="DATE"
				emoji="📅"
				showEmoji={!settings?.emojis?.disable}>
				<Box class="date-slashes">
					<Text tag="span">/</Text>
					<Text tag="span">/</Text>
				</Box>
			</Field>
			<Field
				class="time-field"
				label="START TIME"
				emoji="⏱️"
				showEmoji={!settings?.emojis?.disable}>
				<Box class="time-colon">
					<Text tag="span">:</Text>
				</Box>
			</Field>
			<Field
				class="time-field"
				label="END TIME"
				emoji="⏳"
				showEmoji={!settings?.emojis?.disable}>
				<Box class="time-colon">
					<Text tag="span">:</Text>
				</Box>
			</Field>
			<Field class="time-field" label="TOTAL MINS" />
		</Box>
		<Box class="bottom-row">
			<Field
				class="attendees-field"
				label="ATTENDEES"
				emoji="👥"
				showEmoji={!settings?.emojis?.disable} />
			<Field
				class="location-field"
				label="LOCATION"
				emoji="📍"
				showEmoji={!settings?.emojis?.disable} />
		</Box>
	</Box>

	<Box class="agenda-section">
		<Text tag="h2" class="section-title">
			{#if !settings?.emojis?.disable}📝{/if} AGENDA & NOTES
		</Text>
		<Box class="lines">
			{#each agendaRows as _, i (i)}
				<Box class="line"></Box>
			{/each}
		</Box>
	</Box>

	<Box class="action-section">
		<Text tag="h2" class="section-title">
			{#if !settings?.emojis?.disable}✅{/if} ACTION ITEMS
		</Text>
		<Box class="action-grid">
			<Box class="grid-header">
				<Box class="check"></Box>
				<Box class="task"><Text>TASK / DECISION</Text></Box>
				<Box class="owner"><Text>OWNER</Text></Box>
				<Box class="deadline"><Text>DEADLINE</Text></Box>
			</Box>
			{#each actionRows as _, i (i)}
				<Box class="grid-row">
					<Box class="check">
						<Checkbox />
					</Box>
					<Box class="task"></Box>
					<Box class="owner"></Box>
					<Box class="deadline"></Box>
				</Box>
			{/each}
		</Box>
	</Box>
</div>

<style lang="scss">
	.meeting-minutes {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1rem 2rem 2rem;
		box-sizing: border-box;
		gap: 2rem;

		:global(.header-section) {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			width: 100%;
		}

		:global(.header-section .field) {
			flex: 1;
		}

		:global(.header-section .date-slashes),
		:global(.header-section .time-colon) {
			display: flex;
			align-items: flex-end;
			padding-bottom: 2px;
			color: var(--outline-high, #ccc);
			font-size: 1.2rem;
			font-weight: 300;
			width: 100%;
		}

		:global(.header-section .date-slashes span),
		:global(.header-section .time-colon span) {
			line-height: 1;
		}

		:global(.header-section .date-slashes) {
			justify-content: space-evenly;
		}

		:global(.header-section .time-colon) {
			justify-content: center;
		}

		:global(.header-section .time-colon span) {
			margin-bottom: 1px;
		}

		:global(.header-section .top-row) {
			display: flex;
			gap: 2rem;
		}

		:global(.header-section .top-row .subject-field) {
			flex: 3;
		}
		:global(.header-section .top-row .date-field) {
			flex: 1.5;
		}
		:global(.header-section .top-row .time-field) {
			flex: 1;
		}

		:global(.header-section .bottom-row) {
			display: flex;
			gap: 2rem;
		}

		:global(.header-section .bottom-row .attendees-field) {
			flex: 5;
		}
		:global(.header-section .bottom-row .location-field) {
			flex: 4;
		}

		:global(.section-title) {
			font-size: 1rem;
			font-weight: bold;
			color: var(--text);
			margin-bottom: 0.5rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
		}

		:global(.agenda-section) {
			display: flex;
			flex-direction: column;
			flex: 3;
		}

		:global(.agenda-section .lines) {
			display: flex;
			flex-direction: column;
			flex: 1;
			border-top: 1px solid var(--outline);
		}

		:global(.agenda-section .lines .line) {
			flex: 1;
			border-bottom: 1px solid var(--outline);
		}

		:global(.action-section) {
			display: flex;
			flex-direction: column;
			flex: 2;
		}

		:global(.action-section .action-grid) {
			display: flex;
			flex-direction: column;
			flex: 1;
			border: 1px solid var(--outline);
			border-radius: 4px;
			overflow: hidden;
		}

		:global(.action-section .action-grid .grid-header) {
			display: grid;
			grid-template-columns: 1fr 8fr 3fr 3fr;
			background-color: var(--nav-bg-pdf, #f8f8f8);
			border-bottom: 2px solid var(--outline);
			font-weight: bold;
			font-size: 0.8rem;
			text-align: center;
			color: var(--text-low);
		}

		:global(.action-section .action-grid .grid-header div) {
			padding: 0.5rem;
			border-right: 1px solid var(--outline);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		:global(.action-section .action-grid .grid-header div:last-child) {
			border-right: none;
		}

		:global(.action-section .action-grid .grid-row) {
			display: grid;
			grid-template-columns: 1fr 8fr 3fr 3fr;
			flex: 1;
			border-bottom: 1px solid var(--outline);
		}

		:global(.action-section .action-grid .grid-row:nth-child(even)) {
			background-color: rgba(128, 128, 128, 0.05);
		}

		:global(.action-section .action-grid .grid-row:last-child) {
			border-bottom: none;
		}

		:global(.action-section .action-grid .grid-row div) {
			border-right: 1px solid var(--outline);
			height: 100%;
		}

		:global(.action-section .action-grid .grid-row div:last-child) {
			border-right: none;
		}

		:global(.action-section .action-grid .grid-row .check) {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>

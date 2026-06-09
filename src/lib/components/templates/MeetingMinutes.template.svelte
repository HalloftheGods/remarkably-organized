<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';

	let { settings = {} as PlannerSettings } = $props();
	let agendaRows = new Array(12);
	let actionRows = new Array(8);
</script>

<div class="planner page meeting-minutes">
	<div class="header-section">
		<div class="top-row">
			<div class="field subject-field">
				<label>
					<strong>SUBJECT</strong>
				</label>
				<div class="content"></div>
			</div>
			<div class="field date-field">
				<label>
					{#if !settings?.emojis?.disable}
						<span class="emoji">📅</span>
					{/if}
					<strong>DATE</strong>
				</label>
				<div class="content">
					<div class="date-slashes">
						<span>/</span>
						<span>/</span>
					</div>
				</div>
			</div>
			>
			<div class="field time-field">
				<label>
					{#if !settings?.emojis?.disable}
						<span class="emoji">⏱️</span>
					{/if}
					<strong>START TIME</strong>
				</label>
				<div class="content">
					<div class="time-colon">
						<span>:</span>
					</div>
				</div>
			</div>
			>
			<div class="field time-field">
				<label>
					{#if !settings?.emojis?.disable}
						<span class="emoji">⏳</span>
					{/if}
					<strong>END TIME</strong>
				</label>
				<div class="content">
					<div class="time-colon">
						<span>:</span>
					</div>
				</div>
			</div>
			>
			<div class="field time-field">
				<label>
					<strong>TOTAL MINS</strong>
				</label>
				<div class="content"></div>
			</div>
		</div>
		<div class="bottom-row">
			<div class="field attendees-field">
				<label>
					{#if !settings?.emojis?.disable}
						<span class="emoji">👥</span>
					{/if}
					<strong>ATTENDEES</strong>
				</label>
				<div class="content"></div>
			</div>
			<div class="field location-field">
				<label>
					{#if !settings?.emojis?.disable}
						<span class="emoji">📍</span>
					{/if}
					<strong>LOCATION</strong>
				</label>
				<div class="content"></div>
			</div>
		</div>
	</div>

	<div class="agenda-section">
		<h2 class="section-title">
			{#if !settings?.emojis?.disable}📝{/if} AGENDA & NOTES
		</h2>
		<div class="lines">
			{#each agendaRows as _, i (i)}
				<div class="line"></div>
			{/each}
		</div>
	</div>

	<div class="action-section">
		<h2 class="section-title">
			{#if !settings?.emojis?.disable}✅{/if} ACTION ITEMS
		</h2>
		<div class="action-grid">
			<div class="grid-header">
				<div class="check"></div>
				<div class="task"><span>TASK / DECISION</span></div>
				<div class="owner"><span>OWNER</span></div>
				<div class="deadline"><span>DEADLINE</span></div>
			</div>
			{#each actionRows as _, i (i)}
				<div class="grid-row">
					<div class="check">
						<Checkbox />
					</div>
					<div class="task"></div>
					<div class="owner"></div>
					<div class="deadline"></div>
				</div>
			{/each}
		</div>
	</div>
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

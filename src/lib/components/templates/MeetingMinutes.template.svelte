<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Checkbox } from '$atoms';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	let agendaRows = new Array(12);
	let actionRows = new Array(8);
</script>

<div class="planner page meeting-minutes">
	<div class="header-section">
		<div class="top-row">
			<div class="field subject-field">
				<label>
					<strong>
						{#if !settings?.emojis?.disable}📌{/if} SUBJECT
					</strong>
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
		<div class="section-title">
			{#if !settings?.emojis?.disable}📝{/if}
			<strong>AGENDA & NOTES</strong>
		</div>
		<div class="lines">
			{#each agendaRows as _, i (i)}
				<div class="line"></div>
			{/each}
		</div>
	</div>

	<div class="action-section">
		<div class="section-title">
			{#if !settings?.emojis?.disable}✅{/if}
			<strong>ACTION ITEMS</strong>
		</div>
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
		.header-section {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			width: 100%;

			.field {
				flex: 1;
			}

			.date-slashes,
			.time-colon {
				display: flex;
				align-items: flex-end;
				padding-bottom: 2px;
				color: var(--outline-high, #ccc);
				font-size: 1.2rem;
				font-weight: 300;
				width: 100%;
			}

			.date-slashes span,
			.time-colon span {
				line-height: 1;
			}

			.date-slashes {
				justify-content: space-evenly;
			}

			.time-colon {
				justify-content: center;
			}

			.time-colon span {
				margin-bottom: 1px;
			}

			.top-row {
				display: flex;
				gap: 0.5rem;

				.subject-field {
					flex: 3;
				}
				.date-field {
					flex: 1.5;
				}
				.time-field {
					flex: 1;
				}
			}

			.bottom-row {
				display: flex;
				gap: 2rem;

				.attendees-field {
					flex: 5;
				}
				.location-field {
					flex: 4;
				}
			}
		}

		.section-title {
			margin-bottom: 0.5rem;
		}

		.agenda-section {
			display: flex;
			flex-direction: column;
			flex: 3;

			.lines {
				display: flex;
				flex-direction: column;
				flex: 1;
				border-top: 1px solid var(--outline);

				.line {
					flex: 1;
					border-bottom: 1px solid var(--outline);
				}
			}
		}

		.action-section {
			display: flex;
			flex-direction: column;
			flex: 2;

			.action-grid {
				display: flex;
				flex-direction: column;
				flex: 1;
				border: 1px solid var(--outline);
				border-radius: 4px;
				overflow: hidden;

				.grid-header {
					display: grid;
					grid-template-columns: 1fr 8fr 3fr 3fr;
					background-color: var(--nav-bg-pdf, #f8f8f8);
					border-bottom: 2px solid var(--outline);
					font-weight: bold;
					font-size: 0.8rem;
					text-align: center;

					div {
						padding: 0.5rem;
						display: flex;
						align-items: center;
						justify-content: center;

						&:last-child {
							border-right: none;
						}
					}
					color: var(--text-low);
				}

				.grid-row {
					display: grid;
					grid-template-columns: 1fr 8fr 3fr 3fr;
					flex: 1;
					border-bottom: 1px solid var(--outline);

					&:nth-child(even) {
						background-color: rgba(128, 128, 128, 0.05);
					}

					&:last-child {
						border-bottom: none;
					}

					div {
						border-right: 1px solid var(--outline);
					}

					div:last-child {
						border-right: none;
					}

					.check {
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>

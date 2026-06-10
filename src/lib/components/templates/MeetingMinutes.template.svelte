<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { Emoji } from '$atoms';
	import Field from '$atoms/Field.atom.svelte';
	import DateSlashes from '$molecules/DateSlashes.svelte';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	let agendaRows = new Array(12);
	let actionRows = new Array(8);
</script>

<div class="planner page meeting-minutes">
	<header class="flex-col gap-4 mb-4">
		<div class="flex gap-4 w-full">
			<div class="field flex-[3]">
				<Field i="📌">SUBJECT</Field>
			</div>
			<div class="field flex-[1.5]">
				<DateSlashes i="📅" label="DATE" />
			</div>
			<div class="field flex-1">
				<Field i="⏱️">START TIME</Field>
			</div>
			<div class="field flex-1">
				<Field i="⏳">END TIME</Field>
			</div>
			<div class="field flex-1">
				<Field>TOTAL MINS</Field>
			</div>
		</div>
		<div class="flex gap-8 w-full">
			<div class="field flex-[5]">
				<Field i="👥">ATTENDEES</Field>
			</div>
			<div class="field flex-[4]">
				<Field i="📍">LOCATION</Field>
			</div>
		</div>
	</header>

	<div class="agenda-section">
		<div class="section-title">
			<Emoji size="s">📝</Emoji>
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
			<Emoji size="s">✅</Emoji>
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
					background-color: var(--nav-bg-pdf, var(--bg-high));
					border-bottom: 2px solid var(--outline);
					font-weight: bold;
					font-size: 0.8rem;
					text-align: center;

					div {
						padding: 0.5rem;
						display: flex;
						align-items: center;
						justify-content: center;
						min-width: 0;

						&:last-child {
							border-right: none;
						}
					}
					color: var(--text-sidebar, var(--text-low));
				}

				.grid-row {
					display: grid;
					grid-template-columns: 1fr 8fr 3fr 3fr;
					flex: 1;
					border-bottom: 1px solid var(--outline);

					&:nth-child(even) {
						background-color: var(--bg-high);
					}

					&:last-child {
						border-bottom: none;
					}

					div {
						border-right: 1px solid var(--outline);
						min-width: 0;
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

<script lang="ts">
	let agendaRows = new Array(12);
	let actionRows = new Array(8);
</script>

<div class="meeting-minutes">
	<div class="header-section">
		<div class="top-row">
			<div class="field date-field">
				<div class="label">DATE</div>
				<div class="line"></div>
			</div>
			<div class="field time-field">
				<div class="label">TIME</div>
				<div class="line"></div>
			</div>
			<div class="field location-field">
				<div class="label">LOCATION / LINK</div>
				<div class="line"></div>
			</div>
		</div>
		<div class="bottom-row">
			<div class="field subject-field">
				<div class="label">SUBJECT</div>
				<div class="line"></div>
			</div>
			<div class="field attendees-field">
				<div class="label">ATTENDEES</div>
				<div class="line"></div>
			</div>
		</div>
	</div>

	<div class="agenda-section">
		<div class="section-title">AGENDA & NOTES</div>
		<div class="lines">
			{#each agendaRows as _, i (i)}
				<div class="line"></div>
			{/each}
		</div>
	</div>

	<div class="action-section">
		<div class="section-title">ACTION ITEMS</div>
		<div class="action-grid">
			<div class="grid-header">
				<div class="check"></div>
				<div class="task">TASK / DECISION</div>
				<div class="owner">OWNER</div>
				<div class="deadline">DEADLINE</div>
			</div>
			{#each actionRows as _, i (i)}
				<div class="grid-row">
					<div class="check">
						<div class="checkbox"></div>
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
	}

	.header-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;

		.label {
			font-size: 0.8rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.25rem;
		}

		.line {
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
		}

		.field {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		.top-row {
			display: flex;
			gap: 2rem;

			.date-field {
				flex: 2;
			}
			.time-field {
				flex: 2;
			}
			.location-field {
				flex: 4;
			}
		}

		.bottom-row {
			display: flex;
			gap: 2rem;

			.subject-field {
				flex: 1;
			}
			.attendees-field {
				flex: 1;
			}
		}
	}

	.section-title {
		font-size: 1rem;
		font-weight: bold;
		color: var(--text);
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
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
				background-color: #f8f8f8;
				border-bottom: 2px solid var(--outline);
				font-weight: bold;
				font-size: 0.8rem;
				text-align: center;
				color: var(--text-low);

				div {
					padding: 0.5rem;
					border-right: 1px solid var(--outline);
					display: flex;
					align-items: center;
					justify-content: center;

					&:last-child {
						border-right: none;
					}
				}
			}

			.grid-row {
				display: grid;
				grid-template-columns: 1fr 8fr 3fr 3fr;
				flex: 1;
				border-bottom: 1px solid var(--outline);

				&:last-child {
					border-bottom: none;
				}

				div {
					border-right: 1px solid var(--outline);
					height: 100%;

					&:last-child {
						border-right: none;
					}
				}

				.check {
					display: flex;
					align-items: center;
					justify-content: center;

					.checkbox {
						width: 1.2rem;
						height: 1.2rem;
						border: 2px solid var(--outline);
						border-radius: 3px;
					}
				}
			}
		}
	}
</style>

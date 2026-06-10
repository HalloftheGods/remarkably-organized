<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
	const isLandscape = $derived(settings?.design?.orientation === 'landscape');
	
	const nRows = $derived({
		objectives: isLandscape ? 2 : 3,
		standards: isLandscape ? 2 : 3,
		materials: isLandscape ? 2 : 3,
		differentiation: isLandscape ? 2 : 3,
		warmup: isLandscape ? 1 : 2,
		mainAct: isLandscape ? 4 : 8,
		wrapup: isLandscape ? 1 : 2,
		assessment: isLandscape ? 2 : 3,
		homework: isLandscape ? 2 : 3,
	});
</script>

<div class="planner page lesson-plan">
	<div class="header-section">
		<div class="field title">
			<div class="label">
				{#if showEmoji}🍎{/if} LESSON PLAN
			</div>
			<div class="line"></div>
		</div>
		<div class="field date">
			<div class="label">
				{#if showEmoji}📅{/if} DATE / CLASS
			</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field subject">
				<div class="label">
					{#if showEmoji}📘{/if} SUBJECT / TOPIC
				</div>
				<div class="line"></div>
			</div>
			<div class="field unit">
				<div class="label">
					{#if showEmoji}📚{/if} UNIT / CHAPTER
				</div>
				<div class="line"></div>
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="main-grid">
			<div class="planning-col">
				<div class="box-section">
					<div class="section-label">{#if showEmoji}🎯{/if} OBJECTIVES & OUTCOMES</div>
					{#each Array(nRows.objectives) as _}
						<div class="line"></div>
					{/each}
				</div>
				
				<div class="box-section">
					<div class="section-label">{#if showEmoji}📋{/if} STANDARDS / ALIGNMENT</div>
					{#each Array(nRows.standards) as _}
						<div class="line"></div>
					{/each}
				</div>

				<div class="box-section">
					<div class="section-label">{#if showEmoji}🛠️{/if} MATERIALS & RESOURCES</div>
					{#each Array(nRows.materials) as _}
						<div class="line"></div>
					{/each}
				</div>

				<div class="box-section">
					<div class="section-label">{#if showEmoji}🤝{/if} DIFFERENTIATION & ACCOM.</div>
					{#each Array(nRows.differentiation) as _}
						<div class="line"></div>
					{/each}
				</div>
			</div>

			<div class="execution-col">
				<div class="box-section activities">
					<div class="section-label">{#if showEmoji}⏱️{/if} ACTIVITIES & TIMELINE</div>
					<div class="activity-row">
						<span class="activity-tag">WARM-UP</span>
						<div class="activity-lines">
							{#each Array(nRows.warmup) as _}
								<div class="line"></div>
							{/each}
						</div>
					</div>
					<div class="activity-row">
						<span class="activity-tag">MAIN ACT.</span>
						<div class="activity-lines">
							{#each Array(nRows.mainAct) as _}
								<div class="line"></div>
							{/each}
						</div>
					</div>
					<div class="activity-row">
						<span class="activity-tag">WRAP-UP</span>
						<div class="activity-lines">
							{#each Array(nRows.wrapup) as _}
								<div class="line"></div>
							{/each}
						</div>
					</div>
				</div>

				<div class="box-section">
					<div class="section-label">{#if showEmoji}📝{/if} ASSESSMENT & FEEDBACK</div>
					{#each Array(nRows.assessment) as _}
						<div class="line"></div>
					{/each}
				</div>

				<div class="box-section">
					<div class="section-label">{#if showEmoji}🏠{/if} HOMEWORK / FOLLOW-UP</div>
					{#each Array(nRows.homework) as _}
						<div class="line"></div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.lesson-plan {
		.header-section {
			display: flex;
			gap: 1rem;

			.field {
				display: flex;
				flex-direction: column;
			}
			.title {
				flex: 3;
			}
			.date {
				flex: 1;
			}
		}

		.meta-section {
			display: flex;
			flex-direction: column;
			margin-top: 0.75rem;
		}

		.meta-row {
			display: flex;
			gap: 1rem;

			.field {
				display: flex;
				flex-direction: column;
			}
			.subject {
				flex: 3;
			}
			.unit {
				flex: 1;
			}
		}

		.label {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
			margin-bottom: 0.25rem;
			letter-spacing: 0.5px;
		}

		.section-label {
			font-size: 0.8rem;
			font-weight: bold;
			color: var(--text-low);
			border-bottom: 2px solid var(--outline);
			padding-bottom: 0.25rem;
			margin-bottom: 0.25rem;
			letter-spacing: 0.5px;
		}

		.line {
			border-bottom: 1px solid var(--outline);
			height: 1.5rem;
			width: 100%;
		}

		.content-section {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin-top: 1rem;
			flex: 1;
		}

		.main-grid {
			display: flex;
			gap: 1.5rem;
			flex: 1;
		}

		.planning-col {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		.execution-col {
			flex: 1.25;
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		.box-section {
			display: flex;
			flex-direction: column;
		}

		.activities {
			gap: 0.5rem;
		}

		.activity-row {
			display: flex;
			gap: 0.75rem;
			align-items: flex-start;
		}

		.activity-tag {
			font-size: 0.65rem;
			font-weight: bold;
			color: var(--text-low);
			background-color: var(--outline);
			padding: 0.2rem 0.4rem;
			border-radius: 3px;
			width: 4.5rem;
			text-align: center;
			margin-top: 0.25rem;
		}

		.activity-lines {
			flex: 1;
			display: flex;
			flex-direction: column;
		}
	}
</style>

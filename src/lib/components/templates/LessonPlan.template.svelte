<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import Emoji from '$atoms/Emoji.svelte';
	import Field from '$atoms/Field.atom.svelte';
	import Label from '$atoms/Label.svelte';
	import type { PlannerSettings } from '$lib';

	let { settings = {} as PlannerSettings }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);

	const nRows = $derived({
		objectives: settings?.isLandscape ? 2 : 3,
		standards: settings?.isLandscape ? 2 : 3,
		materials: settings?.isLandscape ? 2 : 3,
		differentiation: settings?.isLandscape ? 2 : 3,
		warmup: settings?.isLandscape ? 1 : 2,
		mainAct: settings?.isLandscape ? 4 : 8,
		wrapup: settings?.isLandscape ? 1 : 2,
		assessment: settings?.isLandscape ? 2 : 3,
		homework: settings?.isLandscape ? 2 : 3,
	});
</script>

<div class="planner page padded lesson-plan">
	<div class="header-section">
		<div class="field flex-[3]">
			<Field i="🍎">LESSON PLAN</Field>
		</div>
		<div class="field flex-1">
			<Field i="📅">DATE / CLASS</Field>
		</div>
	</div>

	<div class="meta-section">
		<div class="meta-row">
			<div class="field flex-[3]">
				<Field i="📘">SUBJECT / TOPIC</Field>
			</div>
			<div class="field flex-1">
				<Field i="📚">UNIT / CHAPTER</Field>
			</div>
		</div>
	</div>

	<div class="content-section">
		<div class="main-grid">
			<div class="planning-col">
				<div class="box-section">
					<div class="section-header">
						{#if showEmoji}🎯{/if} OBJECTIVES & OUTCOMES
					</div>
					{#each Array(nRows.objectives) as _}
						<div class="line">
							<RowInput />
						</div>
					{/each}
				</div>

				<div class="box-section">
					<div class="section-header">
						{#if showEmoji}📋{/if} STANDARDS / ALIGNMENT
					</div>
					{#each Array(nRows.standards) as _}
						<div class="line">
							<RowInput />
						</div>
					{/each}
				</div>

				<div class="box-section">
					<div class="section-header">
						{#if showEmoji}🛠️{/if} MATERIALS & RESOURCES
					</div>
					{#each Array(nRows.materials) as _}
						<div class="line">
							<RowInput />
						</div>
					{/each}
				</div>

				<div class="box-section">
					<div class="section-header">
						{#if showEmoji}🤝{/if} DIFFERENTIATION & ACCOM.
					</div>
					{#each Array(nRows.differentiation) as _}
						<div class="line">
							<RowInput />
						</div>
					{/each}
				</div>
			</div>

			<div class="execution-col">
				<div class="box-section activities-box">
					<div class="section-header">
						{#if showEmoji}⏱️{/if} ACTIVITIES & TIMELINE
					</div>
					<div class="activity-row">
						<span class="activity-tag">WARM-UP</span>
						<div class="activity-lines">
							{#each Array(nRows.warmup) as _}
								<div class="line">
									<RowInput />
								</div>
							{/each}
						</div>
					</div>
					<div class="activity-row">
						<span class="activity-tag">MAIN ACT.</span>
						<div class="activity-lines">
							{#each Array(nRows.mainAct) as _}
								<div class="line">
									<RowInput />
								</div>
							{/each}
						</div>
					</div>
					<div class="activity-row">
						<span class="activity-tag">WRAP-UP</span>
						<div class="activity-lines">
							{#each Array(nRows.wrapup) as _}
								<div class="line">
									<RowInput />
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div class="box-section">
					<div class="section-header">
						{#if showEmoji}📝{/if} ASSESSMENT & FEEDBACK
					</div>
					{#each Array(nRows.assessment) as _}
						<div class="line">
							<RowInput />
						</div>
					{/each}
				</div>

				<div class="box-section">
					<div class="section-header">
						{#if showEmoji}🏠{/if} HOMEWORK / FOLLOW-UP
					</div>
					{#each Array(nRows.homework) as _}
						<div class="line">
							<RowInput />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

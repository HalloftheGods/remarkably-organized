<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import Grid from './Grid.svelte';

	let { settings = {} as PlannerSettings } = $props();
</script>

<div class="brain-dump">
	<div class="header-section">
		<div class="label">
			{#if !settings?.emojis?.disable}🧠{/if} BRAIN DUMP / MIND MAP
		</div>
		<div class="line"></div>
	</div>
	
	<div class="content-section">
		<Grid display="dotted" />
	</div>
</div>

<style lang="scss">
	.brain-dump {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.label {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
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
		flex: 1;
		border: 1px solid var(--outline);
		border-radius: 4px;
		position: relative;
		overflow: hidden;
	}
</style>

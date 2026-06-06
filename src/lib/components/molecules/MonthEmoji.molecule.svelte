<script lang="ts">
	import type { Month, PlannerSettings } from '$lib';

	let {
		settings = {} as PlannerSettings,
		month = {} as Month,
		variant = 'inline' as 'inline' | 'watermark',
	} = $props();

	const emoji = $derived(settings.emojis.months[month.month - 1] || '');
</script>

{#if variant === 'inline'}
	{emoji}
{:else}
	<div
		class="month-emoji"
		style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -35%); font-size: 6rem; opacity: 0.4; pointer-events: none; z-index: -1;">
		{emoji}
	</div>
{/if}

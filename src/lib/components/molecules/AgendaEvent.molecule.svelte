<script lang="ts">
	import type { CalendarEvent } from '$lib';
	import { Box, Text } from '$atoms';
	import { getFormatterMechanic } from '$lib/mechanics';

	interface Props {
		event: CalendarEvent;
		type: 'timed' | 'all-day';
		style?: string;
		class?: string;
	}

	let { event, type, style = '', class: className = '' }: Props = $props();

	const formatter = getFormatterMechanic();
	const eventName = $derived(
		formatter ? formatter.formatEventName(event.name) : event.name,
	);
</script>

{#if type === 'all-day'}
	<Box class="event-all-day {className}" {style}>
		<Text tag="span">{eventName}</Text>
	</Box>
{:else}
	<Box class="event-timed {className}" {style}>
		<Box class="event-timed-inner">
			<Text tag="span">{eventName}</Text>
		</Box>
	</Box>
{/if}

<style lang="scss">
	:global {
		.event-all-day {
			font-family: var(--font-body, system-ui, sans-serif);
			font-size: 0.7em;
			letter-spacing: 1.25px;
			padding: 0.15rem 0.5rem;
			color: var(--text);
			background-color: transparent;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.event-timed {
			position: absolute;
			left: 0;
			width: 100%;
			padding: 1px;

			.event-timed-inner {
				font-size: 0.7em;
				padding: 0.15rem 0.35rem;
				width: 100%;
				height: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				color: var(--text);
				display: flex;
				align-items: flex-start;
				line-height: 1.2;
				letter-spacing: 1.25px;
				border-left: solid 2px var(--outline);
				background-color: transparent;
			}
		}
	}
</style>

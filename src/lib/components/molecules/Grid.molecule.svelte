<script lang="ts">
	import RowInput from '$atoms/RowInput.svelte';
	import { Checkbox } from '$atoms';
	import type { Collection } from '$lib';

	let {
		display = 'dotted' as Collection['type'],
		columns = undefined as number | undefined,
		lines = undefined as number | undefined,
		majorSize = 10,
		minorSize = 5,
		aspectRatio = 1.5,
		alternateColors = undefined as boolean | undefined,
	} = $props();

	const type = $derived(
		display.startsWith('lined') ||
			display.startsWith('numbered') ||
			display.startsWith('todo')
			? 'lined'
			: display.startsWith('dotted') || display.startsWith('grid')
				? 'grid'
				: display === 'blank'
					? 'blank'
					: 'special',
	);
	const size = $derived(
		display.endsWith('large') ? 'large' : display.endsWith('small') ? 'small' : 'medium',
	);
	const cols = $derived(
		type === 'lined'
			? Math.max(1, Number(columns) || 1)
			: size === 'small'
				? 30
				: size === 'medium'
					? 25
					: 20,
	);
	const numLines = $derived(
		lines ?? (size === 'small' ? 40 : size === 'medium' ? 35 : 30),
	);
	const dotDistance = $derived(
		size === 'small' ? '20px' : size === 'medium' ? '24px' : '30px',
	);
	const isAlternating = $derived(alternateColors ?? display.startsWith('todo'));
</script>

{#if display.startsWith('dotted')}
	<div
		class="dots"
		style:min-height={lines ? `calc(${dotDistance} * ${lines})` : undefined}
		style:--dot-distance={dotDistance}>
		<div class="dots-small"></div>
		<div class="dots-medium"></div>
		<div class="dots-large"></div>
	</div>
{/if}

{#if display.startsWith('grid')}
	<div class="grid" style:--cols={cols}>
		{#each new Array(Math.ceil(cols * cols * aspectRatio)) as _, i (i)}
			<div
				class="line"
				class:last-col={i % cols === cols - 1}
				class:major-col={(i % cols) % majorSize === 0}
				class:major-row={i % (cols * majorSize) < cols}
				class:minor-col={(i % cols) % minorSize === 0}
				class:minor-row={i % (cols * minorSize) < cols}
				class:wrap-major={cols % majorSize === 0}
				class:wrap-minor={cols % minorSize === 0}>
			</div>
		{/each}
	</div>
{/if}

{#if type === 'lined'}
	<div class="lined" class:alternating={isAlternating} style:--cols={cols} style:--lines={numLines}>
		{#each new Array(Math.ceil(numLines * cols)) as _, i (i)}
			{#if display.startsWith('numbered')}
				<div class="line" class:even-row={isAlternating && (i % numLines) % 2 !== 0}>
					<span class="number">{i + 1}.</span>
					<RowInput />
				</div>
			{:else if display.startsWith('todo')}
				<div class="line todo {size}" class:even-row={isAlternating && (i % numLines) % 2 !== 0}>
					<Checkbox />
					<RowInput />
				</div>
			{:else}
				<div class="line" class:even-row={isAlternating && (i % numLines) % 2 !== 0}>
					<RowInput />
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style lang="scss">
	.dots {
		display: grid;
		height: 100%;
		width: 100%;
		padding: 0 1rem;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		--dot-position: 8px;
		--dot-distance: 24px;
		--dot-large-size: 1px;
		--dot-medium-size: 1px;
		--dot-small-size: 1px;
		--dot-large-color: var(--outline-high, var(--outline));
		--dot-medium-color: var(--outline-high, var(--outline));
		--dot-small-color: var(--dots-color, var(--text));
		.dots-small {
			grid-column: 1 / 1;
			grid-row: 1 / 1;
			background-image: radial-gradient(
				circle at 1px 1px,
				var(--dot-small-color) var(--dot-small-size),
				transparent var(--dot-small-size)
			);
			background-position: var(--dot-position) 0px;
			background-size: var(--dot-distance) var(--dot-distance);
			height: 100%;
			width: 100%;
		}
		.dots-medium {
			grid-column: 1 / 1;
			grid-row: 1 / 1;
			background-image: radial-gradient(
				circle at 1px 1px,
				var(--dot-medium-color) var(--dot-medium-size),
				transparent var(--dot-large-size)
			);
			background-position: var(--dot-position) 0px;
			background-size: calc(var(--dot-distance) * 5) calc(var(--dot-distance) * 5);
			height: 100%;
			width: 100%;
		}
		.dots-large {
			grid-column: 1 / 1;
			grid-row: 1 / 1;
			background-image: radial-gradient(
				circle at 1px 1px,
				var(--dot-large-color) var(--dot-large-size),
				transparent var(--dot-large-size)
			);
			background-position: var(--dot-position) 0px;
			background-size: calc(var(--dot-distance) * 10) calc(var(--dot-distance) * 10);
			height: 100%;
			width: 100%;
		}
	}
	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		padding: 0 calc(100% / var(--cols));
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		--line-size: 1px;
		--minor-line-size: 1px;
		--major-line-size: 1px;
		--line-color: var(--outline);
		--minor-line-color: var(--outline-low, var(--outline));
		--major-line-color: var(--outline-high, var(--outline));
		.line {
			width: 100%;
			aspect-ratio: 1;
			position: relative;
			border-left: solid var(--line-size) var(--line-color);
			border-top: solid var(--line-size) var(--line-color);
			&.last-col {
				border-right: solid var(--line-size) var(--line-color);
				&.wrap-minor {
					border-right: solid var(--minor-line-size) var(--minor-line-color);
				}
				&.wrap-major {
					border-right: solid var(--major-line-size) var(--major-line-color);
				}
			}
			&.minor-col {
				border-left: solid var(--minor-line-size) var(--minor-line-color);
			}
			&.minor-row {
				border-top: solid var(--minor-line-size) var(--minor-line-color);
			}
			&.major-col {
				border-left: solid var(--major-line-size) var(--major-line-color);
			}
			&.major-row {
				border-top: solid var(--major-line-size) var(--major-line-color);
			}
		}
	}

	.lined {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-template-rows: repeat(var(--lines), 1fr);
		flex: 1;
		width: 100%;
		font-weight: var(--font-weight-light);
		height: 100%;
		gap: 0 0.25rem;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
		&.alternating .line {
			border-bottom: none;
		}
		.line {
			color: var(--text);
			border-bottom: solid 1px var(--outline);
			display: flex;
			align-items: end;
			font-size: 0.75em;
			line-height: 1;
			padding: 0 0.25rem 0.35rem;

			&.todo {
				&.medium {
					padding-bottom: 0.1rem;
				}
				&.small {
					padding-bottom: 0.1rem;
				}
			}
			&.even-row {
				background-color: var(--nav-bg-pdf, var(--bg-high));
			}
		}
	}
</style>

<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import { onMount } from 'svelte';
	import { trackUpvote } from '$lib/analytics';
	import HeartIcon from '~icons/fa/heart';

	interface Props {
		settings?: PlannerSettings;
		itemId: string;
		itemType?: string;
	}

	let { settings, itemId, itemType = 'theme' }: Props = $props();

	let count = $state(183);
	let hasUpvoted = $state(false);
	let isFetching = $state(false);

	// Load upvotes whenever the itemId changes
	$effect(() => {
		if (itemId) {
			fetchCount(itemId);
			checkLocalState(itemId);
		}
	});

	const checkLocalState = (id: string) => {
		if (typeof localStorage !== 'undefined') {
			hasUpvoted = localStorage.getItem(`upvoted_${id}`) === 'true';
		}
	};

	const fetchCount = async (id: string) => {
		isFetching = true;
		try {
			const res = await fetch(`/api/upvotes?id=${id}`);
			if (res.ok) {
				const data = await res.json();
				count = (data.count || 0) + 183;
			}
		} catch (error) {
			console.error('Failed to fetch upvotes', error);
		} finally {
			isFetching = false;
		}
	};

	const handleUpvote = async () => {
		if (hasUpvoted || !itemId) return;

		// Optimistic UI update
		count += 1;
		hasUpvoted = true;

		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(`upvoted_${itemId}`, 'true');
		}

		// Analytics
		trackUpvote(itemId, itemType);

		// Persist to KV Backend
		try {
			const res = await fetch(`/api/upvotes?id=${itemId}`, {
				method: 'POST',
			});
			if (res.ok) {
				const data = await res.json();
				count = data.count + 183; // Sync actual count
			}
		} catch (error) {
			console.error('Failed to post upvote', error);
			// Rollback if failed (optional, but good UX to just let them have it for now)
		}
	};

	// Determine styling based on settings if provided, else use defaults
	const bg1 = $derived(settings?.design?.colorBg || '#ffffff');
	const bg2 = $derived(settings?.design?.colorNavBg || '#f2f2f2');
	const textColor = $derived(settings?.design?.colorText || '#000000');
	const activeColor = '#ff4b4b'; // Universal red for likes
</script>

<button
	class="upvote-fab no-print tooltip-bottom"
	class:has-upvoted={hasUpvoted}
	data-tooltip={hasUpvoted ? 'You liked this!' : 'Like this'}
	style="--fab-bg-1: {bg1}; --fab-bg-2: {bg2}; --fab-text: {textColor}; --fab-active: {activeColor};"
	onclick={handleUpvote}
	disabled={hasUpvoted}>
	<div class="icon-container">
		<HeartIcon />
	</div>
	{#if count > 0}
		<span class="count-badge">{count}</span>
	{/if}
</button>

<style lang="scss">
	.upvote-fab {
		position: fixed;
		top: 5.5rem;
		left: 1rem;
		z-index: 50;
		@media screen and (min-width: 768px) {
			left: 2rem;
		}
		background: linear-gradient(
			135deg,
			var(--fab-bg-1) 0%,
			var(--fab-bg-1) 50%,
			var(--fab-bg-2) 50%,
			var(--fab-bg-2) 100%
		);
		color: var(--fab-text);
		border: 1px solid color-mix(in srgb, var(--fab-text) 10%, transparent);
		border-radius: 2rem;
		padding: 0.5rem 1rem;
		min-height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 1.1em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			filter 0.2s ease;

		&:hover:not(:disabled) {
			transform: scale(1.05) translateY(-2px);
			box-shadow: var(--shadow-5);
		}

		.icon-container {
			color: var(--fab-active);
		}

		&.has-upvoted {
			color: var(--fab-active);
			cursor: default;
			border-color: color-mix(in srgb, var(--fab-active) 30%, transparent);

			.icon-container {
				animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
			}

			.count-badge {
				opacity: 1;
			}
		}

		.count-badge {
			font-weight: 700;
			font-size: 0.9em;
			opacity: 0.5;
			transition: opacity 0.2s ease;
		}

		&:disabled {
			opacity: 0.9;
		}
	}

	@keyframes pop {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.3);
		}
		100% {
			transform: scale(1);
		}
	}
</style>

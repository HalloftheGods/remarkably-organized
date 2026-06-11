<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';
	import PlannerView from '$views/PlannerView.view.svelte';
	import SyncPromptModal from '$organisms/SyncPromptModal.organism.svelte';
	import PrintIcon from '~icons/fa/print';
	import LinkIcon from '~icons/fa-solid/link';
	import CoffeeIcon from '~icons/fa/coffee';
	import InfoIcon from '~icons/fa/info-circle';
	import Toast from '$molecules/Toast.molecule.svelte';
	import { toast } from '$state';
	import { Toggle } from '$atoms';
	let { data } = $props();

	let plannerView: ReturnType<typeof PlannerView> | undefined = $state();
	let pm = $derived(plannerView?.getPrintManager());
	let isPrintReady = $state(false);
	let showSyncPrompt = $state(false);
	let isSyncingBeforePrint = $state(false);
	let enableHighResolution = $state(page.url.searchParams.has('highres'));

	onMount(() => {
		if (data.preset) {
			fetch('/api/stats', {
				method: 'POST',
				body: JSON.stringify({ type: 'preset_loaded', presetId: data.preset.id }),
			}).catch(console.error);
		}

		// Use requestAnimationFrame to ensure the PlannerView is fully mounted and bound
		requestAnimationFrame(() => {
			setTimeout(async () => {
				const needsSync = data.settings.calendars.some(
					(c) => c.url && !c.events.length && !c.lastUpdated,
				);
				if (needsSync) {
					showSyncPrompt = true;
				} else {
					if (pm) {
						await pm.preparePrint();
						isPrintReady = true;
					}
				}
			}, 100);
		});
	});

	const handleSyncAndPrint = async () => {
		isSyncingBeforePrint = true;
		const syncPromises = data.settings.calendars.map(async (c, i) => {
			if (c.url && !c.events.length && !c.lastUpdated) {
				try {
					await data.settings.importEvents(i);
				} catch (e) {
					console.error('Failed to sync calendar', i, e);
				}
			}
		});
		await Promise.all(syncPromises);
		isSyncingBeforePrint = false;
		showSyncPrompt = false;
		await tick();
		setTimeout(async () => {
			if (pm) {
				await pm.preparePrint();
				isPrintReady = true;
			}
		}, 500);
	};

	const handleSkipSync = async () => {
		showSyncPrompt = false;
		await tick();
		if (pm) {
			await pm.preparePrint();
			isPrintReady = true;
		}
	};

	const handlePrintNow = () => {
		window.print();
	};

	const copyUrl = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success('Link copied to clipboard!');
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	const pageTitle = $derived(
		data.preset
			? `Print ${data.preset.name} Custom E-Ink Planner — My Remarkably Organized`
			: 'Print Custom E-Ink Planner — My Remarkably Organized',
	);

	const pageDescription = $derived(
		data.preset
			? `Print-ready custom ${data.preset.name} planner for reMarkable and other e-ink tablets.`
			: 'Print-ready custom planners, calendars, habit trackers, and organizers for the reMarkable and other e-ink tablets.',
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

{#if showSyncPrompt}
	<div class="no-print">
		<SyncPromptModal
			isSyncing={isSyncingBeforePrint}
			onSyncAndPrint={handleSyncAndPrint}
			onPrintAnyway={handleSkipSync}
			onClose={handleSkipSync} />
	</div>
{/if}

{#if pm && !isPrintReady && !showSyncPrompt}
	<div class="print-overlay no-print">
		<div class="print-modal">
			<h2>{pm.printProgress >= 1 ? 'Please wait...' : 'Drumroll please...'}</h2>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {pm.printProgress * 100}%"></div>
			</div>
			{#if pm.estimatedRemainingTime > 0 && pm.printProgress < 1}
				<p>{Math.round(pm.printProgress * 100)}% Complete</p>
				<p class="time-remaining">
					It's nearly time for the big reveal!
					<br />
					Estimated time remaining: {pm.remainingTimeFormatted}
				</p>
			{:else}
				<!-- Reading X number of pages -->
				<p>
					Now look closely as we magically weave your thoughts and colors you chose
					throughout the pages of your remarkably organized planner.
				</p>
			{/if}
			<p class="coffee-message">
				"Go grab a coffee, <br />
				and
				<a
					href="https://buymeacoffee.com/youmeos"
					target="_blank"
					rel="noopener noreferrer"
					class="coffee-link">
					one for me too please!
				</a>
				" ~X
			</p>
		</div>
	</div>
{/if}

{#if isPrintReady}
	<div class="print-actions no-print">
		<div class="print-actions-card">
			<button class="copy-link-row" onclick={copyUrl}>
				<span class="copy-link-icon">
					<LinkIcon />
				</span>
				<span class="copy-link-label">
					Copy the Magic Link to This Remarkably Organized Planner
				</span>
			</button>

			<div class="actions-divider"></div>

			<div class="toggle-row">
				<label for="enableHighResolution" class="toggle-label">
					Print in high resolution (bigger file)
				</label>
				<Toggle id="enableHighResolution" bind:checked={enableHighResolution} />
			</div>

			<button class="print-btn" onclick={handlePrintNow}>
				<PrintIcon />
				<span>Print Now</span>
			</button>

			<a
				href="https://buymeacoffee.com/youmeos"
				target="_blank"
				rel="noopener noreferrer"
				class="coffee-link">
				<CoffeeIcon />
				<span>Thank X.</span>
			</a>

			<div class="actions-divider"></div>

			<div class="helper-text">
				<p>
					<InfoIcon class="helper-icon" />
					When printing, ensure "Background graphics" is enabled and margins are set to "None".
				</p>
				<p>
					NOTE: Most mobile browsers do not let you set margins to none. For best results,
					print in a non-mobile browser.
				</p>
			</div>
		</div>
	</div>
{/if}

<div class="print-preview-container" class:generating={!isPrintReady}>
	<PlannerView
		bind:this={plannerView}
		bind:enableHighResolution
		settings={data.settings}
		preset={data.preset}
		isPrintPreview={true} />
</div>

<div class="no-print">
	<Toast />
</div>

<style>
	@media screen {
		:global(body) {
			background-color: #e0e0e0;
		}

		.print-preview-container {
			padding: 0.5rem;
			/* height: 100vh; */
			/* padding-top: 10rem; */
		}

		.print-preview-container :global(main) {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			/* align-items: center; */
			justify-content: center;
			/* height: 100vh; */
			max-height: none !important;
			overflow: visible !important;
		}

		.print-preview-container :global(main > article) {
			zoom: 0.15;
			margin: 0 !important;
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
			border-radius: 8px;
			flex-shrink: 0;
		}
	}

	.print-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		/* background: rgba(224, 224, 224, 0.9); */
		backdrop-filter: blur(10px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.print-modal {
		background: white;
		padding: 3rem;
		border-radius: 1rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		text-align: center;
		max-width: 550px;
		width: 90%;
	}
	.progress-bar {
		height: 8px;
		background: #e0e0e0;
		border-radius: 4px;
		margin: 2rem 0 1rem;
		overflow: hidden;
	}
	.progress-fill {
		height: 100%;
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
		transition: width 0.2s ease-out;
	}
	.time-remaining {
		color: #666;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}
	.coffee-message {
		margin-top: 1.5rem;
		font-style: italic;
		color: #555;
		font-size: 0.95rem;
	}
	.coffee-link {
		color: #7c3aed;
		text-decoration: none;
		font-weight: bold;
	}
	.coffee-link:hover {
		text-decoration: underline;
	}
	.print-actions {
		position: fixed;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		animation: print-actions-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes print-actions-enter {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(2rem);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	.print-actions-card {
		background: rgba(255, 255, 255, 0.88);
		backdrop-filter: blur(24px) saturate(1.8);
		-webkit-backdrop-filter: blur(24px) saturate(1.8);
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 1.25rem;
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.08),
			0 2px 8px rgba(0, 0, 0, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.6);
		padding: 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		min-width: 340px;
		max-width: 440px;
		width: max-content;
	}

	.actions-divider {
		width: 100%;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(124, 58, 237, 0.15) 20%,
			rgba(168, 85, 247, 0.2) 50%,
			rgba(124, 58, 237, 0.15) 80%,
			transparent
		);
	}

	.copy-link-row {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		background: none;
		border: none;
		padding: 0.375rem 0.125rem;
		cursor: pointer;
		width: 100%;
		text-align: left;
		border-radius: 0.625rem;
		transition: background 0.2s ease;
	}
	.copy-link-row:hover {
		background: rgba(124, 58, 237, 0.06);
	}
	.copy-link-row:active {
		background: rgba(124, 58, 237, 0.12);
	}

	.copy-link-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.1));
		color: #7c3aed;
		flex-shrink: 0;
		font-size: 0.85rem;
	}

	.copy-link-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: #7c3aed;
		line-height: 1.3;
		transition: color 0.2s ease;
	}
	.copy-link-row:hover .copy-link-label {
		color: #6d28d9;
	}

	.toggle-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		padding: 0.25rem 0.125rem;
	}

	.toggle-label {
		font-size: 0.8rem;
		color: #555;
		cursor: pointer;
		user-select: none;
	}

	.print-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
		background-size: 200% 200%;
		color: white;
		border: none;
		padding: 0.875rem 2.5rem;
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		border-radius: 2rem;
		cursor: pointer;
		width: 100%;
		box-shadow:
			0 4px 16px rgba(99, 102, 241, 0.3),
			0 2px 4px rgba(168, 85, 247, 0.2);
		transition:
			transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.25s ease;
		animation: print-btn-gradient-shift 5s ease infinite;
	}
	.print-btn:hover {
		transform: translateY(-1px) scale(1.02);
		box-shadow:
			0 8px 24px rgba(99, 102, 241, 0.35),
			0 4px 8px rgba(236, 72, 153, 0.25);
	}
	.print-btn:active {
		transform: translateY(0) scale(0.99);
	}

	@keyframes print-btn-gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.coffee-link {
		color: #7c3aed;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.85rem;
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.25rem 0;
		transition: color 0.2s ease;
	}
	.coffee-link:hover {
		color: #ec4899;
	}

	.helper-text {
		width: 100%;
		text-align: left;
	}
	.helper-text p {
		font-size: 0.72rem;
		line-height: 1.45;
		color: #888;
		margin: 0 0 0.25rem;
	}
	.helper-text p:last-child {
		margin-bottom: 0;
	}
	.helper-text :global(.helper-icon) {
		color: #a78bfa;
		margin-right: 0.25rem;
		font-size: 0.75rem;
		vertical-align: -1px;
	}

	.generating {
		opacity: 0.2;
		pointer-events: none;
	}

	@media print {
		.no-print {
			display: none !important;
		}
		.print-preview-container {
			display: block;
			padding: 0;
		}
		.print-preview-container :global(main > article) {
			zoom: 1;
			break-after: page;
			page-break-after: always;
			box-shadow: none !important;
			border-radius: 0;
		}
		.print-preview-container :global(main > article:last-of-type) {
			break-after: auto;
			page-break-after: auto;
		}
	}
</style>

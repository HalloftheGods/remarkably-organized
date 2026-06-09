<script lang="ts">
	import { onMount, tick } from 'svelte';
	import PlannerView from '$views/PlannerView.view.svelte';
	import SyncPromptModal from '$organisms/SyncPromptModal.organism.svelte';
	let { data } = $props();

	let plannerView: ReturnType<typeof PlannerView> | undefined = $state();
	let pm = $derived(plannerView?.getPrintManager());
	let isPrintReady = $state(false);
	let showSyncPrompt = $state(false);
	let isSyncingBeforePrint = $state(false);

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
			<h2>Generating your Planner...</h2>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {pm.printProgress * 100}%"></div>
			</div>
			<p>{Math.round(pm.printProgress * 100)}% Complete</p>
			{#if pm.estimatedRemainingTime > 0}
				<p class="time-remaining">
					Estimated time remaining: {pm.remainingTimeFormatted}
				</p>
			{/if}
		</div>
	</div>
{/if}

{#if isPrintReady}
	<div class="print-actions no-print">
		<button class="print-btn" onclick={handlePrintNow}>Print Now</button>
		<p class="helper-text">
			When printing, ensure "Background graphics" is enabled and margins are set to
			"None".
		</p>
	</div>
{/if}

<div class="print-preview-container" class:generating={!isPrintReady}>
	<PlannerView
		bind:this={plannerView}
		settings={data.settings}
		preset={data.preset}
		isPrintPreview={true} />
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
		max-width: 400px;
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
	.print-actions {
		position: fixed;
		top: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		text-align: center;
		background: white;
		padding: 1.5rem 2rem;
		border-radius: 1rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
	}
	.print-btn {
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
		color: white;
		border: none;
		padding: 1rem 3rem;
		font-size: 1.25rem;
		font-weight: bold;
		border-radius: 2rem;
		cursor: pointer;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s;
	}
	.print-btn:hover {
		transform: scale(1.05);
	}
	.helper-text {
		margin: 1rem 0 0;
		font-size: 0.85rem;
		color: #666;
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

import { tick } from 'svelte';
import * as htmlToImage from 'html-to-image';
import { toast } from '$state';
import type { PlannerSettings } from '$lib';

export class PrintManager {
	isPreparingPrint = $state(false);
	printProgress = $state(0);
	isExportingImage = $state(false);
	isExportMode = $state(false);
	renderedPages = $state(0);
	totalPages = $state(0);
	elapsedTime = $state(0);
	estimatedRemainingTime = $state(0);

	private getSettings: () => PlannerSettings;

	constructor(getSettings: () => PlannerSettings) {
		this.getSettings = getSettings;
	}

	get elapsedTimeFormatted(): string {
		return this.formatTime(this.elapsedTime);
	}

	get remainingTimeFormatted(): string {
		return this.formatTime(this.estimatedRemainingTime);
	}

	private formatTime(seconds: number): string {
		const isLessThanMinute = seconds < 60;
		if (isLessThanMinute) {
			return `${seconds}s`;
		}
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	}

	async captureTargetNode(targetNode: HTMLElement) {
		this.isExportingImage = true;
		this.isExportMode = false;

		let container: HTMLDivElement | undefined;
		try {
			const articles = Array.from(document.querySelectorAll('main > article'));
			const pageIndex = articles.indexOf(targetNode) + 1;

			const computedStyle = getComputedStyle(targetNode);
			const docWidth = parseFloat(computedStyle.getPropertyValue('--doc-width')) || 702;
			const docHeight = parseFloat(computedStyle.getPropertyValue('--doc-height')) || 702;

			container = document.createElement('div');
			container.style.position = 'absolute';
			container.style.top = '-9999px';
			container.style.left = '-9999px';
			container.style.pointerEvents = 'none';
			container.style.zIndex = '-9999';

			const clone = targetNode.cloneNode(true) as HTMLElement;
			clone.style.setProperty('zoom', '1', 'important');
			clone.style.setProperty('transform', 'none', 'important');
			clone.style.setProperty('margin', '0', 'important');
			clone.style.setProperty('position', 'relative', 'important');
			clone.style.setProperty('top', '0', 'important');
			clone.style.setProperty('left', '0', 'important');
			clone.style.setProperty('box-shadow', 'none', 'important');

			clone.style.setProperty('width', `${docWidth}px`, 'important');
			clone.style.setProperty('height', `${docHeight}px`, 'important');
			clone.style.setProperty('overflow', 'hidden', 'important');
			clone.style.setProperty('box-sizing', 'border-box', 'important');

			container.appendChild(clone);
			targetNode.parentNode?.appendChild(container);

			await new Promise((r) => setTimeout(r, 200));

			const dataUrl = await htmlToImage.toPng(clone, {
				quality: 1.0,
				pixelRatio: 2,
				backgroundColor: '#ffffff',
				width: docWidth,
				height: docHeight,
			});

			const pageDiv = targetNode.querySelector('.page');
			const templateName =
				pageDiv?.getAttribute('data-template') || targetNode.id || 'page';

			const link = document.createElement('a');
			link.download = `remarkably-organized-${templateName}-${pageIndex}.png`;
			link.href = dataUrl;
			link.click();
			toast.success(`Page ${pageIndex} exported successfully!`);
		} catch (error) {
			console.error(error);
			toast.error('Failed to export image.');
		} finally {
			container?.remove();
			this.isExportingImage = false;
		}
	}

	private mountQueue: (() => void)[] = [];
	private isMounting = false;

	registerMount(callback: () => void) {
		this.mountQueue.push(callback);
		if (this.isPreparingPrint && !this.isMounting) {
			this.processMountQueue();
		}
	}

	private async processMountQueue() {
		this.isMounting = true;
		const chunkSize = 77; // Mount 10 pages per frame to keep UI responsive

		while (this.mountQueue.length > 0) {
			const chunk = this.mountQueue.splice(0, chunkSize);
			for (const cb of chunk) {
				cb();
			}

			this.renderedPages += chunk.length;
			this.printProgress = this.totalPages > 0 ? this.renderedPages / this.totalPages : 0;

			// Wait a frame to let Svelte render and browser breathe
			await new Promise((r) => setTimeout(r, 0));
			await tick();
		}

		this.isMounting = false;
	}

	async executePrint(sendTimeCreating: () => void) {
		await tick();

		fetch('/api/stats', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				type: 'printed',
				themeId: this.getSettings().design.themeId,
			}),
			keepalive: true,
		}).catch(console.error);

		sendTimeCreating();

		const hasGtag = typeof window !== 'undefined' && 'gtag' in window;
		if (hasGtag) {
			(window as any).gtag('event', 'planner_printed');
		}

		// Calculate expected total pages before preparing
		const articles = Array.from(document.querySelectorAll('main > article'));
		// Total pages will be at least the current articles + expected newly mounted ones.
		// For simplicity, we can let the queue length dictate it, or rely on the total spreads expected.
		// PlannerView already calculates totalSpreadsExpected.

		// Reset state
		this.printProgress = 0;
		this.renderedPages = 0;
		this.elapsedTime = 0;
		this.estimatedRemainingTime = 0;
		this.mountQueue = [];
		this.isMounting = false;

		// This will trigger all LazyPages to register their mounts
		this.isPreparingPrint = true;

		await tick();

		// Wait for all registrations to complete. On mobile, Svelte prop propagation
		// and $effect execution can take hundreds of milliseconds, so we wait until
		// the queue stops growing.
		let lastQueueSize = -1;
		let stabilityCount = 0;
		while (stabilityCount < 4) {
			await new Promise((r) => setTimeout(r, 100));
			if (this.mountQueue.length === lastQueueSize) {
				stabilityCount++;
			} else {
				lastQueueSize = this.mountQueue.length;
				stabilityCount = 0;
			}
		}

		// The total pages is the amount of components that registered + already visible ones
		this.totalPages = this.mountQueue.length + this.renderedPages;

		const startTime = Date.now();
		let lastIntervalTime = startTime;
		let smoothedRemainingMs = -1;

		const timerInterval = setInterval(() => {
			const now = Date.now();
			const deltaMs = now - lastIntervalTime;
			lastIntervalTime = now;

			const elapsedMs = now - startTime;
			this.elapsedTime = Math.round(elapsedMs / 1000);

			if (this.renderedPages > 0 && this.totalPages > 0) {
				const msPerPage = elapsedMs / this.renderedPages;
				const pagesRemaining = Math.max(0, this.totalPages - this.renderedPages);
				const rawEstimateMs = pagesRemaining * msPerPage;

				if (smoothedRemainingMs === -1) {
					smoothedRemainingMs = rawEstimateMs;
				} else {
					smoothedRemainingMs -= deltaMs;

					// If the smooth timer drifts more than 1.5 seconds from the real math,
					// snap it back to reality so it doesn't get stuck.
					if (Math.abs(smoothedRemainingMs - rawEstimateMs) > 1500) {
						smoothedRemainingMs = rawEstimateMs;
					} else {
						// Otherwise gently pull it towards the raw estimate
						smoothedRemainingMs = smoothedRemainingMs * 0.8 + rawEstimateMs * 0.2;
					}
				}

				// Never drop below 0
				smoothedRemainingMs = Math.max(0, smoothedRemainingMs);

				// If pages are still remaining, don't show 0s until they are done
				if (pagesRemaining > 0 && smoothedRemainingMs < 1000) {
					smoothedRemainingMs = 1000;
				}

				this.estimatedRemainingTime = Math.round(smoothedRemainingMs / 1000);
			}
		}, 250);

		// Trigger processing if it hasn't started
		if (!this.isMounting && this.mountQueue.length > 0) {
			this.processMountQueue();
		}

		// Wait until queue is completely empty and mounting is done
		while (this.mountQueue.length > 0 || this.isMounting) {
			await new Promise((r) => setTimeout(r, 100));
		}

		clearInterval(timerInterval);
		this.printProgress = 1;

		// Ensure any final DOM updates are applied
		await tick();

		// Extra buffer to let browser load internal images or fonts
		await new Promise((r) => setTimeout(r, 1000));

		const onAfterPrint = () => {
			this.isPreparingPrint = false;
			window.removeEventListener('afterprint', onAfterPrint);
		};

		window.addEventListener('afterprint', onAfterPrint);

		// It might be possible the print dialog gets cancelled or afterprint doesn't fire immediately
		// So we also provide a fallback timeout if needed, but afterprint is well supported.
		window.print();
	}
}

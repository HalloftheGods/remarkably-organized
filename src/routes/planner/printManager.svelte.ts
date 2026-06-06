import { tick } from 'svelte';
import * as htmlToImage from 'html-to-image';
import { toast } from '$state';
import type { PlannerSettings } from '$lib';

export class PrintManager {
	isPreparingPrint = $state(false);
	printProgress = $state(0);
	isExportingImage = $state(false);
	isExportMode = $state(false);

	private getSettings: () => PlannerSettings;

	constructor(getSettings: () => PlannerSettings) {
		this.getSettings = getSettings;
	}

	async captureTargetNode(targetNode: HTMLElement) {
		this.isExportingImage = true;
		this.isExportMode = false;

		try {
			const articles = Array.from(document.querySelectorAll('main > article'));
			const pageIndex = articles.indexOf(targetNode) + 1;

			const computedStyle = getComputedStyle(targetNode);
			const docWidth = parseFloat(computedStyle.getPropertyValue('--doc-width')) || 702;
			const docHeight = parseFloat(computedStyle.getPropertyValue('--doc-height')) || 702;

			const container = document.createElement('div');
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

			container.remove();

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
			this.isExportingImage = false;
		}
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

		if (typeof window !== 'undefined' && 'gtag' in window) {
			// @ts-ignore
			window.gtag('event', 'planner_printed');
		}

		this.isPreparingPrint = true;
		this.printProgress = 0;

		const articles = document.querySelectorAll('main > article');
		const chunkSize = 50;
		let currentIndex = 0;

		const processChunk = () => {
			const end = Math.min(currentIndex + chunkSize, articles.length);
			for (let i = currentIndex; i < end; i++) {
				(articles[i] as HTMLElement).style.contentVisibility = 'visible';
			}
			currentIndex = end;
			this.printProgress = articles.length > 0 ? currentIndex / articles.length : 1;

			if (currentIndex < articles.length) {
				requestAnimationFrame(() => {
					setTimeout(processChunk, 10);
				});
			} else {
				setTimeout(() => {
					window.print();

					setTimeout(() => {
						this.isPreparingPrint = false;
						let revertIndex = 0;
						const revertChunk = () => {
							const revertEnd = Math.min(revertIndex + chunkSize, articles.length);
							for (let i = revertIndex; i < revertEnd; i++) {
								(articles[i] as HTMLElement).style.contentVisibility = '';
							}
							revertIndex = revertEnd;
							if (revertIndex < articles.length) {
								requestAnimationFrame(() => setTimeout(revertChunk, 10));
							}
						};
						revertChunk();
					}, 100);
				}, 500);
			}
		};

		if (articles.length > 0) {
			processChunk();
		} else {
			setTimeout(() => {
				window.print();
				this.isPreparingPrint = false;
			}, 100);
		}
	}
}

<script lang="ts">
	import type { PlannerSettings } from '$lib';
	let { seed, complexity, palette, settings }: { seed: number; complexity: number; palette: string[], settings: PlannerSettings } = $props();

	function LCG(s: number) {
		return function() {
			s = Math.imul(16807, s) | 0;
			return (s & 2147483647) / 2147483648;
		};
	}

	const texts = $derived.by(() => {
		const rand = LCG(seed);
		const numTexts = 2 + complexity;
		const result = [];
		const textContent = settings.coverPage.title || settings.years[0]?.year?.toString() || 'PLANNER';
		for(let i=0; i<numTexts; i++) {
			result.push({
				x: rand() * 100,
				y: rand() * 100,
				size: 10 + rand() * 30,
				rot: (rand() - 0.5) * 60,
				color: palette[i % palette.length],
				text: textContent
			});
		}
		return result;
	});
</script>

<div class="cover-bg-wrapper">
	<svg class="cover-bg-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
		<defs>
			<pattern id="halftone-{seed}" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
				<circle cx="1" cy="1" r="0.8" fill="currentColor" />
			</pattern>
		</defs>
		{#each texts as t}
			<text
				x="{t.x}%"
				y="{t.y}%"
				font-size="{t.size}"
				font-family={settings.coverPage.font}
				font-weight="bold"
				fill={t.color}
				opacity="0.2"
				transform="rotate({t.rot} {t.x} {t.y})"
			>
				{t.text}
			</text>
			<!-- Also a halftone outline version -->
			<text
				x="{t.x - 2}%"
				y="{t.y - 2}%"
				font-size="{t.size}"
				font-family={settings.coverPage.font}
				font-weight="bold"
				fill="url(#halftone-{seed})"
				color={t.color}
				opacity="0.3"
				transform="rotate({t.rot} {t.x} {t.y})"
			>
				{t.text}
			</text>
		{/each}
	</svg>
</div>

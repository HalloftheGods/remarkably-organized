<script lang="ts">
	let { seed, complexity, palette }: { seed: number; complexity: number; palette: string[] } = $props();

	// Deterministic random
	function LCG(s: number) {
		return function() {
			s = Math.imul(16807, s) | 0;
			return (s & 2147483647) / 2147483648;
		};
	}
	
	const lines = $derived.by(() => {
		const rand = LCG(seed);
		const numLines = 5 + complexity * 5;
		const result = [];
		for(let i=0; i<numLines; i++) {
			const yOffset = (i / numLines) * 120 - 10;
			let path = `M 0 ${yOffset} `;
			for(let j=1; j<=5; j++) {
				const cp1x = (j - 1 + 0.3) * 20;
				const cp1y = yOffset + (rand() - 0.5) * 30;
				const cp2x = (j - 1 + 0.7) * 20;
				const cp2y = yOffset + (rand() - 0.5) * 30;
				const endX = j * 20;
				const endY = yOffset + (rand() - 0.5) * 30;
				path += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY} `;
			}
			result.push({
				d: path,
				color: palette[i % palette.length],
				width: 0.1 + rand() * 0.5
			});
		}
		return result;
	});
</script>

<div class="cover-bg-wrapper">
	<svg class="cover-bg-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
		{#each lines as line}
			<path d={line.d} stroke={line.color} stroke-width={line.width} fill="none" opacity="0.6" />
		{/each}
	</svg>
</div>

<script lang="ts">
	let { seed, complexity, palette }: { seed: number; complexity: number; palette: string[] } = $props();

	// Deterministic random
	function LCG(s: number) {
		return function() {
			s = Math.imul(16807, s) | 0;
			return (s & 2147483647) / 2147483648;
		};
	}

	const blobs = $derived.by(() => {
		const rand = LCG(seed);
		const numBlobs = 3 + Math.floor(complexity / 2);
		const result = [];
		for (let i = 0; i < numBlobs; i++) {
			result.push({
				cx: rand() * 100,
				cy: rand() * 100,
				r: 30 + rand() * 50 * (complexity / 5),
				color: palette[Math.floor(rand() * palette.length)],
			});
		}
		return result;
	});
</script>

<div class="cover-bg-wrapper" style="background-color: {palette[0]}">
	<svg class="cover-bg-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
		<defs>
			<filter id="mesh-blur-{seed}" x="-20%" y="-20%" width="140%" height="140%">
				<feGaussianBlur stdDeviation="15" />
			</filter>
		</defs>
		<g filter="url(#mesh-blur-{seed})">
			{#each blobs as blob}
				<circle cx="{blob.cx}%" cy="{blob.cy}%" r="{blob.r}%" fill={blob.color} opacity="0.8" />
			{/each}
		</g>
	</svg>
</div>

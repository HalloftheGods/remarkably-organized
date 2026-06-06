<script lang="ts">
	let {
		seed,
		complexity,
		palette,
	}: { seed: number; complexity: number; palette: string[] } = $props();

	function LCG(s: number) {
		return function () {
			s = Math.imul(16807, s) | 0;
			return (s & 2147483647) / 2147483648;
		};
	}

	const orbs = $derived.by(() => {
		const rand = LCG(seed);
		const numOrbs = 3 + Math.floor(complexity / 2);
		const result = [];
		for (let i = 0; i < numOrbs; i++) {
			result.push({
				cx: rand() * 100,
				cy: rand() * 100,
				r: 20 + rand() * 40,
				color: palette[i % palette.length],
			});
		}
		return result;
	});
</script>

<div class="cover-bg-wrapper">
	<svg class="cover-bg-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
		<defs>
			<filter id="blur-{seed}" x="-50%" y="-50%" width="200%" height="200%">
				<feGaussianBlur stdDeviation="8" />
			</filter>
		</defs>
		<g filter="url(#blur-{seed})">
			{#each orbs as orb}
				<circle
					cx="{orb.cx}%"
					cy="{orb.cy}%"
					r="{orb.r}%"
					fill={orb.color}
					opacity="0.6" />
			{/each}
		</g>
	</svg>
	<!-- CSS Backdrop filter for the glass effect -->
	<div class="glass-overlay"></div>
</div>

<style>
	.glass-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	:global(#cover.dark) .glass-overlay {
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.05);
	}
</style>

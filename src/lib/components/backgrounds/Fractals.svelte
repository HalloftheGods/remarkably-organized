<script lang="ts">
	let { seed, complexity, palette }: { seed: number; complexity: number; palette: string[] } = $props();

	function LCG(s: number) {
		return function() {
			s = Math.imul(16807, s) | 0;
			return (s & 2147483647) / 2147483648;
		};
	}

	interface ShapeDef {
		type: string;
		points?: string;
		d?: string;
		color: string;
		width?: number;
		rot?: number;
	}

	const shapes = $derived.by<ShapeDef[]>(() => {
		const rand = LCG(seed);
		const result: ShapeDef[] = [];
		const globalRot = rand() * 360;

		const depth = 3 + Math.floor(complexity / 2);
		const size = 60 + rand() * 40;
		
		function drawSierpinski(x: number, y: number, s: number, d: number, rOffset: number, c: string) {
			if (d === 0) {
				const h = s * (Math.sqrt(3)/2);
				const pts = `${x},${y - h/2} ${x - s/2},${y + h/2} ${x + s/2},${y + h/2}`;
				result.push({ type: 'poly_raw', points: pts, color: c, rot: rOffset });
			} else {
				const h = s * (Math.sqrt(3)/2);
				drawSierpinski(x, y - h/4, s/2, d - 1, rOffset, c);
				drawSierpinski(x - s/4, y + h/4, s/2, d - 1, rOffset, c);
				drawSierpinski(x + s/4, y + h/4, s/2, d - 1, rOffset, c);
			}
		}
		
		const c1 = palette[Math.floor(rand()*palette.length)];
		drawSierpinski(0, size/10, size, Math.min(depth, 6), globalRot, c1);
		
		if (rand() > 0.3) {
			const c2 = palette[Math.floor(rand()*palette.length)];
			drawSierpinski(0, size/10, size, Math.min(depth, 6), globalRot + 180, c2);
		}
		
		if (rand() > 0.6) {
			const c3 = palette[Math.floor(rand()*palette.length)];
			drawSierpinski(0, size/10, size * (0.5 + rand()), Math.min(depth - 1, 5), globalRot + (rand()*90), c3);
		}

		return result;
	});
</script>

<div class="cover-bg-wrapper">
	<svg class="cover-bg-svg" viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice">
		<g opacity="0.6" stroke-width="0.3" fill="none">
			{#each shapes as shape}
				{#if shape.type === 'poly_raw'}
					<polygon points={shape.points} stroke={shape.color} transform="rotate({shape.rot || 0})" />
				{:else if shape.type === 'path'}
					<path d={shape.d} stroke={shape.color} stroke-width={shape.width || 0.3} fill="none" />
				{/if}
			{/each}
		</g>
	</svg>
</div>

<style>
	:global(.cover-bg-wrapper) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 0;
	}
	.cover-bg-svg {
		width: 100%;
		height: 100%;
	}
</style>

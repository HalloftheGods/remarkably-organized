<script lang="ts">
	let { seed, complexity, palette }: { seed: number; complexity: number; palette: string[] } = $props();

	function LCG(s: number) {
		return function() {
			s = Math.imul(16807, s) | 0;
			return (s & 2147483647) / 2147483648;
		};
	}

	interface MagicianDef {
		type: string;
		x?: number;
		y?: number;
		r?: number;
		points?: string;
		color: string;
		strokeWidth: number;
		rot?: number;
	}

	const elements = $derived.by<MagicianDef[]>(() => {
		const rand = LCG(seed);
		const result: MagicianDef[] = [];
		const globalRot = rand() * 360;

		const c1 = palette[0 % palette.length];
		const c2 = palette[1 % palette.length];
		const c3 = palette[2 % palette.length];

		// Magic Circle Base
		const radius = 60 + rand() * 20;
		result.push({ type: 'circle', x: 0, y: 0, r: radius, color: c1, strokeWidth: 1 });
		result.push({ type: 'circle', x: 0, y: 0, r: radius - 5, color: c2, strokeWidth: 0.5 });
		result.push({ type: 'circle', x: 0, y: 0, r: radius + 2, color: c3, strokeWidth: 0.2 });

		// Star inside
		const points = 5 + Math.floor(rand() * 4); // 5 to 8 pointed star
		let starPts = '';
		for (let i = 0; i < points * 2; i++) {
			const angle = (i * Math.PI) / points;
			const r = i % 2 === 0 ? radius - 5 : (radius - 5) * 0.4;
			starPts += `${Math.cos(angle) * r},${Math.sin(angle) * r} `;
		}
		result.push({ type: 'polygon', points: starPts, color: c1, strokeWidth: 0.5, rot: globalRot });

		// Outer runes / small circles
		const runes = 8 + complexity * 2;
		for (let i = 0; i < runes; i++) {
			const angle = (i * Math.PI * 2) / runes + (globalRot * Math.PI / 180);
			const rx = Math.cos(angle) * (radius + 15);
			const ry = Math.sin(angle) * (radius + 15);
			
			result.push({ type: 'circle', x: rx, y: ry, r: 2 + rand() * 3, color: c2, strokeWidth: 0.5 });
			
			// Connecting lines
			if (rand() > 0.5) {
				result.push({ type: 'line', x: rx, y: ry, r: radius, color: c3, strokeWidth: 0.2, rot: angle });
			}
		}

		// Crescent Moons
		if (rand() > 0.3) {
			const mx = Math.cos(globalRot) * (radius - 20);
			const my = Math.sin(globalRot) * (radius - 20);
			// We can draw a crescent moon using a path, but a circle is simpler for SVG arrays
			result.push({ type: 'circle', x: mx, y: my, r: 10, color: c3, strokeWidth: 0.8 });
			result.push({ type: 'circle', x: mx + 3, y: my - 3, r: 10, color: c1, strokeWidth: 0.2 });
		}

		return result;
	});
</script>

<div class="cover-bg-wrapper">
	<svg class="cover-bg-svg" viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice">
		<g opacity="0.65" fill="none">
			{#each elements as el}
				{#if el.type === 'circle'}
					<circle cx={el.x} cy={el.y} r={el.r} stroke={el.color} stroke-width={el.strokeWidth} />
				{:else if el.type === 'polygon'}
					<polygon points={el.points} stroke={el.color} stroke-width={el.strokeWidth} transform="rotate({el.rot || 0})" />
				{:else if el.type === 'line'}
					<!-- Drawing a line from the rune to the circle -->
					<line 
						x1={el.x} 
						y1={el.y} 
						x2={Math.cos(el.rot || 0) * (el.r || 0)} 
						y2={Math.sin(el.rot || 0) * (el.r || 0)} 
						stroke={el.color} 
						stroke-width={el.strokeWidth} 
					/>
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

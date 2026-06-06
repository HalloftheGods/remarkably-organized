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

	const grid = $derived.by(() => {
		const rand = LCG(seed);
		const size = 2 + Math.floor(complexity / 3); // 2x2 to 5x5 grid
		const cellW = 100 / size;
		const cellH = 100 / size;
		const result = [];
		for (let x = 0; x < size; x++) {
			for (let y = 0; y < size; y++) {
				const type = Math.floor(rand() * 4); // 0: circle, 1: arch, 2: rect, 3: empty
				const color = palette[Math.floor(rand() * palette.length)];
				result.push({
					x: x * cellW,
					y: y * cellH,
					w: cellW,
					h: cellH,
					type,
					color,
					rot: Math.floor(rand() * 4) * 90,
				});
			}
		}
		return result;
	});
</script>

<div class="cover-bg-wrapper">
	<svg class="cover-bg-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
		{#each grid as cell}
			<g
				transform="translate({cell.x + cell.w / 2}, {cell.y +
					cell.h / 2}) rotate({cell.rot}) translate({-cell.w / 2}, {-cell.h / 2})">
				{#if cell.type === 0}
					<circle
						cx={cell.w / 2}
						cy={cell.h / 2}
						r={(cell.w / 2) * 0.8}
						fill={cell.color} />
				{:else if cell.type === 1}
					<path
						d="M 0 {cell.h} A {cell.w / 2} {cell.h / 2} 0 0 1 {cell.w} {cell.h} Z"
						fill={cell.color} />
				{:else if cell.type === 2}
					<rect
						x={cell.w * 0.1}
						y={cell.h * 0.1}
						width={cell.w * 0.8}
						height={cell.h * 0.8}
						fill={cell.color} />
				{/if}
			</g>
		{/each}
	</svg>
</div>

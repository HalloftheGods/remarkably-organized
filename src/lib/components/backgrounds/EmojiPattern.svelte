<script lang="ts">
	import type { PlannerSettings } from '../../state/planner-settings.svelte';

	let { seed, complexity, palette, settings }: { seed: number; complexity: number; palette: string[], settings: PlannerSettings } = $props();

	function LCG(s: number) {
		return function() {
			s = Math.imul(16807, s) | 0;
			return (s & 2147483647) / 2147483648;
		};
	}

	const emojis = $derived.by(() => {
		const e = settings.emojis;
		const pool = [
			e.q1, e.q2, e.q3, e.q4, 
			e.january, e.february, e.march, e.april, e.may, e.june, 
			e.july, e.august, e.september, e.october, e.november, e.december
		].filter(Boolean);
		if (pool.length === 0) return ['✨', '⭐', '🌟', '💫', '☄️'];
		return pool;
	});

	interface EmojiItem {
		x: number;
		y: number;
		char: string;
		rot: number;
		s: number;
	}

	const grid = $derived.by<EmojiItem[]>(() => {
		const rand = LCG(seed);
		const result: EmojiItem[] = [];
		// complexity 1-10 -> base size of emojis
		const size = 35 - complexity * 2; 
		const cols = Math.ceil(200 / size) + 2;
		const rows = Math.ceil(200 / size) + 2;

		const patternType = Math.floor(rand() * 4); // 0: staggered, 1: scattered, 2: concentric, 3: dense mosaic

		if (patternType === 0 || patternType === 1 || patternType === 3) {
			for(let r = -rows/2; r < rows/2; r++) {
				for(let c = -cols/2; c < cols/2; c++) {
					let x = c * size;
					let y = r * size;
					
					if (patternType === 0 || patternType === 3) {
						// Hex stagger
						if (r % 2 !== 0) x += size / 2;
						if (patternType === 3) {
							// tighter packing for mosaic
							y *= 0.866; 
						}
					} else {
						// scatter
						x += (rand() - 0.5) * size;
						y += (rand() - 0.5) * size;
					}

					const emoji = emojis[Math.floor(rand() * emojis.length)];
					const rotation = patternType === 1 ? rand() * 360 : (rand() > 0.5 ? 15 : -15);
					const scale = patternType === 1 ? size * (0.6 + rand() * 0.8) : size;
					
					result.push({ x, y, char: emoji, rot: rotation, s: scale });
				}
			}
		} else {
			// concentric rings (Lotus style)
			for (let ring = 0; ring <= cols/1.5; ring++) {
				const num = ring === 0 ? 1 : ring * 6;
				for (let i = 0; i < num; i++) {
					const angle = (i / num) * Math.PI * 2;
					const radius = ring * size * 0.9;
					const x = Math.cos(angle) * radius;
					const y = Math.sin(angle) * radius;
					const emoji = emojis[Math.floor(rand() * emojis.length)];
					const rotation = angle * (180/Math.PI) + 90; // radiate outwards
					result.push({ x, y, char: emoji, rot: rotation, s: size });
				}
			}
		}
		
		return result;
	});
</script>

<div class="cover-bg-wrapper">
	<svg class="cover-bg-svg" viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice">
		<rect x="-100" y="-100" width="200" height="200" fill={palette[0] || 'transparent'} opacity="0.1" />
		<!-- Use CSS filter to give it an outline or shadow effect -->
		<g opacity="0.6" style="filter: drop-shadow(1px 1px 0px {palette[1] || 'rgba(0,0,0,0.5)'});">
			{#each grid as item}
				<text 
					x={item.x} 
					y={item.y} 
					font-size={item.s} 
					text-anchor="middle" 
					dominant-baseline="central"
					transform="rotate({item.rot}, {item.x}, {item.y})"
				>
					{item.char}
				</text>
			{/each}
		</g>
	</svg>
</div>

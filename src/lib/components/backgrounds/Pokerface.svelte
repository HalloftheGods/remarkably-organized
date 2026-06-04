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

	interface ShapeDef {
		x: number;
		y: number;
		scale: number;
		rot: number;
		suit: string;
		color: string;
		opacity: number;
	}

	const suits = [
		// Heart
		'M0,15 A15,15 0 0,1 -30,15 A15,15 0 0,1 0,-10 A15,15 0 0,1 30,15 A15,15 0 0,1 0,15 Z M0,15 L0,40 Z',
		// Spade
		'M0,-40 C10,-10 30,0 30,15 A15,15 0 0,1 0,15 A15,15 0 0,1 -30,15 C-30,0 -10,-10 0,-40 Z M0,15 L-10,40 L10,40 Z',
		// Club
		'M0,-15 A15,15 0 1,1 0,-45 A15,15 0 1,1 0,-15 M-15,10 A15,15 0 1,1 -45,10 A15,15 0 1,1 -15,10 M15,10 A15,15 0 1,1 45,10 A15,15 0 1,1 15,10 M0,15 L-10,40 L10,40 Z',
		// Diamond
		'M0,-30 L25,0 L0,30 L-25,0 Z',
	];

	// Adjust Heart path specifically for standard SVG center rendering
	const heartPath =
		'M0,-15 C0,-15 -25,-35 -25,-10 C-25,10 0,35 0,35 C0,35 25,10 25,-10 C25,-35 0,-15 0,-15 Z';
	const diamondPath = 'M0,-30 L20,0 L0,30 L-20,0 Z';

	const shapes = $derived.by<ShapeDef[]>(() => {
		const rand = LCG(seed);
		const result: ShapeDef[] = [];
		const count = 30 + complexity * 15;

		const paths = [
			heartPath,
			'M0,-35 C15,-10 25,0 25,10 C25,25 0,25 0,25 C0,25 -25,25 -25,10 C-25,0 -15,-10 0,-35 Z M0,25 L-10,45 L10,45 Z', // Spade
			'M0,-15 A13,13 0 1,1 0,-41 A13,13 0 1,1 0,-15 M-15,5 A13,13 0 1,1 -41,5 A13,13 0 1,1 -15,5 M15,5 A13,13 0 1,1 41,5 A13,13 0 1,1 15,5 M0,10 L-10,35 L10,35 Z', // Club
			diamondPath,
		];

		for (let i = 0; i < count; i++) {
			result.push({
				x: (rand() - 0.5) * 250,
				y: (rand() - 0.5) * 250,
				scale: 0.1 + rand() * (0.5 + complexity * 0.1),
				rot: rand() * 360,
				suit: paths[Math.floor(rand() * paths.length)],
				color: palette[Math.floor(rand() * palette.length)],
				opacity: 0.1 + rand() * 0.4,
			});
		}

		return result;
	});
</script>

<div class="cover-bg-wrapper">
	<svg
		class="cover-bg-svg"
		viewBox="-100 -100 200 200"
		preserveAspectRatio="xMidYMid slice">
		{#each shapes as shape}
			<path
				d={shape.suit}
				fill={shape.color}
				opacity={shape.opacity}
				transform="translate({shape.x}, {shape.y}) scale({shape.scale}) rotate({shape.rot})" />
		{/each}
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

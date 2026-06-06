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
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		color: string;
		width: number;
	}

	const shapes = $derived.by<ShapeDef[]>(() => {
		const rand = LCG(seed);
		const result: ShapeDef[] = [];
		const r = 40 + rand() * 20;

		// We will simulate 2D projections of a cube and octahedron
		const nodes: [number, number, number][] = [];
		const isCube = rand() > 0.5;

		if (isCube) {
			// Cube vertices
			for (let i of [-1, 1]) {
				for (let j of [-1, 1]) {
					for (let k of [-1, 1]) {
						nodes.push([i * r, j * r, k * r]);
					}
				}
			}
		} else {
			// Octahedron vertices
			nodes.push([r, 0, 0], [-r, 0, 0], [0, r, 0], [0, -r, 0], [0, 0, r], [0, 0, -r]);
		}

		// Random rotation angles
		const rx = rand() * Math.PI * 2;
		const ry = rand() * Math.PI * 2;
		const rz = rand() * Math.PI * 2;

		const rotate = (x: number, y: number, z: number) => {
			// X rot
			let y1 = y * Math.cos(rx) - z * Math.sin(rx);
			let z1 = y * Math.sin(rx) + z * Math.cos(rx);
			// Y rot
			let x1 = x * Math.cos(ry) + z1 * Math.sin(ry);
			let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
			// Z rot
			let x2 = x1 * Math.cos(rz) - y1 * Math.sin(rz);
			let y2 = x1 * Math.sin(rz) + y1 * Math.cos(rz);
			return [x2, y2];
		};

		const proj = nodes.map((n) => rotate(n[0], n[1], n[2]));

		const c1 = palette[0 % palette.length];
		const c2 = palette[1 % palette.length];

		const density = complexity / 10 + 0.3;

		for (let i = 0; i < proj.length; i++) {
			for (let j = i + 1; j < proj.length; j++) {
				if (rand() < density) {
					result.push({
						x1: proj[i][0],
						y1: proj[i][1],
						x2: proj[j][0],
						y2: proj[j][1],
						color: rand() > 0.5 ? c1 : c2,
						width: 0.5 + rand() * 1.5,
					});
				}
			}
		}

		// Let's add multiple solids
		const numSolids = Math.floor(complexity / 2) + 1;
		for (let s = 1; s < numSolids; s++) {
			const scale = 0.3 + rand() * 1.5;
			const dx = (rand() - 0.5) * 100;
			const dy = (rand() - 0.5) * 100;

			for (let i = 0; i < proj.length; i++) {
				for (let j = i + 1; j < proj.length; j++) {
					if (rand() < density) {
						result.push({
							x1: proj[i][0] * scale + dx,
							y1: proj[i][1] * scale + dy,
							x2: proj[j][0] * scale + dx,
							y2: proj[j][1] * scale + dy,
							color: palette[Math.floor(rand() * palette.length)],
							width: 0.2 + rand() * 0.8,
						});
					}
				}
			}
		}

		return result;
	});
</script>

<div class="cover-bg-wrapper">
	<svg
		class="cover-bg-svg"
		viewBox="-100 -100 200 200"
		preserveAspectRatio="xMidYMid slice">
		<g opacity="0.7">
			{#each shapes as line}
				<line
					x1={line.x1}
					y1={line.y1}
					x2={line.x2}
					y2={line.y2}
					stroke={line.color}
					stroke-width={line.width} />
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

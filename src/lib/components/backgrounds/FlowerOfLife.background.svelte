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
		type: string;
		cx?: number;
		cy?: number;
		r?: number;
		x1?: number;
		y1?: number;
		x2?: number;
		y2?: number;
		points?: string;
		d?: string;
		color: string;
		width?: number;
		rot?: number;
	}

	const shapes = $derived.by<ShapeDef[]>(() => {
		const rand = LCG(seed);
		const result: ShapeDef[] = [];
		const themeType = Math.floor(rand() * 4); // 0, 1, 2, 3

		const globalRot = rand() * 360;

		if (themeType === 0) {
			// Theme 0: Flower of Life
			const radius = 8 + rand() * 6 + (10 - complexity) * 0.5;
			const N = 1 + Math.floor(complexity / 1.5);

			const colorMap = [
				palette[Math.floor(rand() * palette.length)],
				palette[Math.floor(rand() * palette.length)],
				palette[Math.floor(rand() * palette.length)],
			];

			for (let q = -N; q <= N; q++) {
				for (let r_coord = -N; r_coord <= N; r_coord++) {
					if (Math.abs(q + r_coord) <= N) {
						const x = radius * (q + r_coord / 2);
						const y = radius * (Math.sqrt(3) / 2) * r_coord;

						// Rotate the whole flower
						const radRot = globalRot * (Math.PI / 180);
						const rotX = x * Math.cos(radRot) - y * Math.sin(radRot);
						const rotY = x * Math.sin(radRot) + y * Math.cos(radRot);

						result.push({
							type: 'circle_trans',
							cx: rotX,
							cy: rotY,
							r: radius * (0.8 + rand() * 0.4),
							color: colorMap[(Math.abs(q) + Math.abs(r_coord)) % colorMap.length],
						});
					}
				}
			}

			result.push({
				type: 'circle',
				r: radius * N + radius * (0.5 + rand()),
				color: palette[0],
				width: 0.5 + rand(),
			});
			if (rand() > 0.5)
				result.push({
					type: 'circle',
					r: radius * N + radius * (1.5 + rand()),
					color: palette[1 % palette.length],
					width: 0.2 + rand(),
				});
		} else if (themeType === 1) {
			// Theme 1: Sierpinski Triangle (Fractals)
			const depth = 2 + Math.floor(complexity / 2);
			const size = 50 + rand() * 60;

			function drawSierpinski(
				x: number,
				y: number,
				s: number,
				d: number,
				rOffset: number,
				c: string,
			) {
				if (d === 0) {
					const h = s * (Math.sqrt(3) / 2);
					const pts = `${x},${y - h / 2} ${x - s / 2},${y + h / 2} ${x + s / 2},${y + h / 2}`;
					result.push({ type: 'poly_raw', points: pts, color: c, rot: rOffset });
				} else {
					const h = s * (Math.sqrt(3) / 2);
					drawSierpinski(x, y - h / 4, s / 2, d - 1, rOffset, c);
					drawSierpinski(x - s / 4, y + h / 4, s / 2, d - 1, rOffset, c);
					drawSierpinski(x + s / 4, y + h / 4, s / 2, d - 1, rOffset, c);
				}
			}

			const c1 = palette[Math.floor(rand() * palette.length)];
			drawSierpinski(0, size / 10, size, Math.min(depth, 6), globalRot, c1);

			if (rand() > 0.3) {
				const c2 = palette[Math.floor(rand() * palette.length)];
				drawSierpinski(0, size / 10, size, Math.min(depth, 6), globalRot + 180, c2);
			}

			if (rand() > 0.6) {
				const c3 = palette[Math.floor(rand() * palette.length)];
				drawSierpinski(
					0,
					size / 10,
					size * (0.5 + rand()),
					Math.min(depth - 1, 5),
					globalRot + rand() * 90,
					c3,
				);
			}
		} else if (themeType === 2) {
			// Theme 2: Golden Spirals & Phyllotaxis
			const a_spir = 0.2 + rand() * 1.5;
			const b_spir = 0.15 + rand() * 0.2;
			const numPoints = 80 + complexity * 50;

			const spirals = 2 + Math.floor(rand() * 6); // 2 to 7 spirals
			for (let s = 0; s < spirals; s++) {
				let path = '';
				const rot = (s / spirals) * Math.PI * 2 + (globalRot * Math.PI) / 180;
				const c = palette[Math.floor(rand() * palette.length)];
				const turns = 2 + rand() * 4;

				for (let i = 0; i < numPoints; i++) {
					const theta = (i / numPoints) * Math.PI * turns;
					const rad = a_spir * Math.exp(b_spir * theta);
					const x = Math.cos(theta + rot) * rad;
					const y = Math.sin(theta + rot) * rad;
					if (i === 0) path += `M ${x} ${y} `;
					else path += `L ${x} ${y} `;
				}
				result.push({ type: 'path', d: path, color: c, width: 0.2 + rand() * 0.8 });
			}

			const numSeeds = 20 + complexity * 20 + rand() * 60;
			const c_scale = 1 + rand() * 2;
			for (let n = 0; n < numSeeds; n++) {
				const theta = n * 137.5 * (Math.PI / 180) + (globalRot * Math.PI) / 180;
				const rad = c_scale * Math.sqrt(n);
				const x = Math.cos(theta) * rad;
				const y = Math.sin(theta) * rad;
				const c = palette[Math.floor(rand() * palette.length)];
				result.push({
					type: 'circle_trans',
					cx: x,
					cy: y,
					r: 0.3 + (n / numSeeds) * (1 + rand() * 2.5),
					color: c,
				});
			}
		} else {
			// Theme 3: Metatron's Cube (Fruit of Life + Random nodes)
			const r = 4 + rand() * 6 + (10 - complexity) * 0.2;
			const centers = [[0, 0]];

			const radRot = globalRot * (Math.PI / 180);
			const addOuterRing = rand() > 0.5;

			for (let i = 0; i < 6; i++) {
				const angle = (i / 6) * Math.PI * 2 + radRot;
				centers.push([Math.cos(angle) * r * 2, Math.sin(angle) * r * 2]);
				centers.push([Math.cos(angle) * r * 4, Math.sin(angle) * r * 4]);
				if (addOuterRing) {
					centers.push([Math.cos(angle) * r * 6, Math.sin(angle) * r * 6]);
				}
			}

			const lineColor = palette[Math.floor(rand() * palette.length)];
			const lineDensity = complexity / 10 + 0.1 + rand() * 0.3;

			for (let i = 0; i < centers.length; i++) {
				for (let j = i + 1; j < centers.length; j++) {
					if (rand() < lineDensity) {
						result.push({
							type: 'line',
							x1: centers[i][0],
							y1: centers[i][1],
							x2: centers[j][0],
							y2: centers[j][1],
							color: lineColor,
							width: 0.1 + rand() * 0.4,
						});
					}
				}
			}

			centers.forEach((pt) => {
				const c = palette[Math.floor(rand() * palette.length)];
				result.push({
					type: 'circle_trans',
					cx: pt[0],
					cy: pt[1],
					r: r * (0.3 + rand() * 1.2),
					color: c,
				});
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
		<g opacity="0.4" stroke-width="0.3" fill="none">
			{#each shapes as shape}
				{#if shape.type === 'circle'}
					<circle
						cx="0"
						cy="0"
						r={shape.r}
						stroke={shape.color}
						stroke-width={shape.width || 0.3} />
				{:else if shape.type === 'circle_trans'}
					<circle cx={shape.cx} cy={shape.cy} r={shape.r} stroke={shape.color} />
				{:else if shape.type === 'line'}
					<line
						x1={shape.x1}
						y1={shape.y1}
						x2={shape.x2}
						y2={shape.y2}
						stroke={shape.color}
						stroke-width={shape.width || 0.3} />
				{:else if shape.type === 'poly_raw'}
					<polygon
						points={shape.points}
						stroke={shape.color}
						transform="rotate({shape.rot || 0})" />
				{:else if shape.type === 'path'}
					<path
						d={shape.d}
						stroke={shape.color}
						stroke-width={shape.width || 0.3}
						fill="none" />
				{/if}
			{/each}
		</g>

		<!-- Overlay duplicate with a slight rotation/scale for more depth -->
		<g opacity="0.15" stroke-width="0.2" fill="none" transform="rotate(15) scale(1.1)">
			{#each shapes as shape}
				{#if shape.type === 'circle'}
					<circle
						cx="0"
						cy="0"
						r={shape.r}
						stroke={shape.color}
						stroke-width={shape.width || 0.2} />
				{:else if shape.type === 'circle_trans'}
					<circle cx={shape.cx} cy={shape.cy} r={shape.r} stroke={shape.color} />
				{:else if shape.type === 'line'}
					<line
						x1={shape.x1}
						y1={shape.y1}
						x2={shape.x2}
						y2={shape.y2}
						stroke={shape.color}
						stroke-width={shape.width || 0.2} />
				{:else if shape.type === 'poly_raw'}
					<polygon
						points={shape.points}
						stroke={shape.color}
						transform="rotate({shape.rot || 0})" />
				{:else if shape.type === 'path'}
					<path
						d={shape.d}
						stroke={shape.color}
						stroke-width={shape.width || 0.2}
						fill="none" />
				{/if}
			{/each}
		</g>
	</svg>
</div>

<script lang="ts">
	import type { Timeframe, PlannerSettings } from '$lib';

	let {
		timeframe = {} as Timeframe,
		settings = {} as PlannerSettings,
	} = $props();

	// Timeline hours: 6 AM to 9 PM (16 hours total)
	const timelineHours = Array.from({ length: 16 }, (_, i) => 6 + i);

	const formatHour = (hour: number) => {
		if (hour === 12) return '12 PM';
		if (hour > 12) return `${hour - 12} PM`;
		return `${hour} AM`;
	};
</script>

<div class="high-performance-agenda">
	<div class="header-section">
		<div class="title-field">
			<div class="label">
				{#if !settings?.emojis?.disable}🚀{/if} HIGH-PERFORMANCE DAILY AGENDA
			</div>
			<div class="line"></div>
		</div>
		<div class="date-field">
			<div class="label">DATE</div>
			<div class="date-display">
				{#if timeframe.year}
					{timeframe.month}/{timeframe.daySinceMonth}/{timeframe.year}
				{/if}
			</div>
			<div class="line"></div>
		</div>
	</div>

	<div class="main-layout">
		<!-- Left Side: Focus & Timeline -->
		<div class="left-col">
			<!-- Top 3 Priorities -->
			<div class="card priorities-card">
				<div class="card-header">TOP 3 PRIORITIES</div>
				<div class="card-body">
					{#each [1, 2, 3] as num}
						<div class="priority-row">
							<span class="num">{num}</span>
							<div class="write-line"></div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Hourly Timeline -->
			<div class="card timeline-card">
				<div class="card-header">HOURLY SCHEDULE</div>
				<div class="card-body scroll-body">
					{#each timelineHours as hour}
						<div class="timeline-row">
							<span class="time-label">{formatHour(hour)}</span>
							<div class="schedule-space"></div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right Side: Energy, Connections, Reflection -->
		<div class="right-col">
			<!-- Energy Check-ins -->
			<div class="card energy-card">
				<div class="card-header">ENERGY & FOCUS CHECKS</div>
				<div class="card-body energy-rows">
					<div class="energy-row">
						<span class="check-label">AM Focus:</span>
						<div class="bubbles">
							{#each Array(5) as _, i}
								<div class="bubble"></div>
							{/each}
						</div>
					</div>
					<div class="energy-row">
						<span class="check-label">PM Energy:</span>
						<div class="bubbles">
							{#each Array(5) as _, i}
								<div class="bubble"></div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- Networking & Connections -->
			<div class="card networking-card">
				<div class="card-header">NETWORKING & OUTREACH</div>
				<div class="card-body">
					{#each Array(4) as _}
						<div class="network-row">
							<div class="box"></div>
							<div class="write-line"></div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Evening Reflection -->
			<div class="card reflection-card">
				<div class="card-header">EVENING REFLECTION & WINS</div>
				<div class="card-body reflection-body">
					<div class="reflection-prompt">What went well today?</div>
					<div class="write-line"></div>
					<div class="write-line"></div>
					<div class="reflection-prompt">How can I improve tomorrow?</div>
					<div class="write-line"></div>
					<div class="write-line"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.high-performance-agenda {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.header-section {
		display: flex;
		gap: 2rem;

		.title-field { flex: 3; display: flex; flex-direction: column; }
		.date-field { flex: 1; display: flex; flex-direction: column; }
	}

	.label {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
		margin-bottom: 0.25rem;
		letter-spacing: 0.5px;
	}

	.line {
		border-bottom: 1px solid var(--outline);
		height: 0.5rem;
		width: 100%;
	}

	.date-display {
		font-size: 0.9rem;
		font-weight: bold;
		color: var(--text);
		height: 1.2rem;
	}

	.main-layout {
		display: flex;
		gap: 1.5rem;
		flex: 1;
		min-height: 0;
	}

	.left-col {
		flex: 1.2;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 0;
	}

	.right-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 0;
	}

	.card {
		border: 1px solid var(--outline);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.card-header {
		background-color: var(--nav-bg-pdf, #f8f8f8);
		border-bottom: 2px solid var(--outline);
		padding: 0.4rem 0.5rem;
		font-size: 0.7rem;
		font-weight: bold;
		color: var(--text);
		letter-spacing: 0.5px;
	}

	.card-body {
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	.priorities-card {
		flex: 0.4;
	}

	.timeline-card {
		flex: 1;
		min-height: 0;
	}

	.scroll-body {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.priority-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		.num {
			font-size: 0.75rem;
			font-weight: bold;
			color: var(--text-low);
		}
	}

	.write-line {
		border-bottom: 1px solid var(--outline-low, #e0e0e0);
		height: 1.5rem;
		flex: 1;
	}

	.timeline-row {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		height: 1.5rem;

		.time-label {
			font-size: 0.6rem;
			font-weight: bold;
			color: var(--text-low);
			width: 2.8rem;
			text-align: right;
		}

		.schedule-space {
			border-bottom: 1px dashed var(--outline-low, #e0e0e0);
			flex: 1;
			height: 100%;
		}
	}

	.energy-card {
		flex: 0.3;
	}

	.energy-rows {
		justify-content: space-around;
	}

	.energy-row {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.check-label {
			font-size: 0.65rem;
			color: var(--text-low);
			font-weight: bold;
		}

		.bubbles {
			display: flex;
			gap: 0.4rem;
		}

		.bubble {
			width: 0.75rem;
			height: 0.75rem;
			border: 1px solid var(--outline);
			border-radius: 50%;
		}
	}

	.networking-card {
		flex: 0.5;
	}

	.network-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		.box {
			width: 0.75rem;
			height: 0.75rem;
			border: 1px solid var(--outline);
			border-radius: 2px;
		}
	}

	.reflection-card {
		flex: 1;
	}

	.reflection-body {
		gap: 0.25rem;
	}

	.reflection-prompt {
		font-size: 0.65rem;
		font-weight: bold;
		color: var(--text-low);
		margin-top: 0.25rem;
	}
</style>

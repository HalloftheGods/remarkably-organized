<script lang="ts">
	import { page } from '$app/state';

	const error = $derived(page.error as { message?: string; stack?: string } | null);
	const status = $derived(page.status);

	function resetSettings() {
		localStorage.clear();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>{status || 500} Error | Remarkably Organized</title>
</svelte:head>

<main class="error-container">
	<div class="glass-card">
		<div class="glow-bg"></div>

		<div class="icon-badge">
			<span>⚠️</span>
		</div>

		<h1>{status || 500}</h1>

		<h2>Something went wrong</h2>

		<p class="subtitle">
			{error?.message || 'An unexpected error occurred while rendering the planner.'}
		</p>

		{#if error?.stack}
			<details class="debug-details">
				<summary>Diagnostic Details</summary>
				<pre><code>{error.stack}</code></pre>
			</details>
		{/if}

		<div class="actions">
			<a href="/" class="primary-btn">Return to Planner</a>
			<button type="button" onclick={resetSettings} class="danger-btn">
				Reset Configuration
			</button>
		</div>
	</div>
</main>

<style lang="scss">
	@import '../lib/styles/_variables.scss';

	.error-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		width: 100vw;
		padding: 1.5rem;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		background-image: linear-gradient(
			180deg,
			#012b67 0%,
			#014082 25%,
			#01559d 50%,
			#016db0 75%,
			#0184ba 100%
		);
		@include desktop {
			background-image: linear-gradient(
				60deg,
				#012b67 0%,
				#014082 25%,
				#01559d 50%,
				#016db0 75%,
				#0184ba 100%
			);
		}
	}

	.glass-card {
		position: relative;
		width: 100%;
		max-width: 580px;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(20px) saturate(160%);
		-webkit-backdrop-filter: blur(20px) saturate(160%);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius-4);
		padding: 3rem 2rem;
		text-align: center;
		color: white;
		box-shadow: var(--shadow-6);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		overflow: hidden;
	}

	.glow-bg {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 0.03) 0%,
			rgba(255, 255, 255, 0) 70%
		);
		pointer-events: none;
	}

	.icon-badge {
		width: 4.5rem;
		height: 4.5rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius-round);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.1);
	}

	h1 {
		font-size: 5rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		margin: 0;
		line-height: 1;
		background: linear-gradient(135deg, #ffffff 30%, rgba(255, 255, 255, 0.6) 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	h2 {
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0;
		color: white;
	}

	.subtitle {
		font-size: 1.05rem;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
		max-width: 440px;
	}

	.debug-details {
		width: 100%;
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: var(--radius-3);
		text-align: left;
		margin: 0.5rem 0;

		summary {
			padding: 0.75rem 1rem;
			font-size: 0.85rem;
			font-weight: 600;
			color: rgba(255, 255, 255, 0.8);
			cursor: pointer;
			user-select: none;
			outline: none;
			&:hover {
				background: rgba(255, 255, 255, 0.03);
			}
		}

		pre {
			margin: 0;
			padding: 1rem;
			border-top: 1px solid rgba(255, 255, 255, 0.05);
			overflow-x: auto;
			max-height: 180px;
			font-family: var(--font-mono);
			font-size: 0.8rem;
			color: rgba(255, 255, 255, 0.6);
		}
	}

	.actions {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.75rem;
		margin-top: 1rem;

		@media (min-width: 480px) {
			flex-direction: row;
			justify-content: center;
			& > * {
				flex: 1;
			}
		}
	}

	.primary-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: white;
		color: #012b67;
		font-weight: 700;
		border-radius: var(--radius-3);
		padding: 0.85rem 1.75rem;
		font-size: 0.95rem;
		transition: all 0.2s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

		&:hover {
			background: rgba(255, 255, 255, 0.9);
			transform: translateY(-1px);
			box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
		}

		&:active {
			transform: translateY(0);
		}
	}

	.danger-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: rgba(239, 98, 98, 0.15);
		color: #ef6262;
		border: 1px solid rgba(239, 98, 98, 0.3);
		font-weight: 600;
		border-radius: var(--radius-3);
		padding: 0.85rem 1.75rem;
		font-size: 0.95rem;
		transition: all 0.2s ease;

		&:hover {
			background: rgba(239, 98, 98, 0.25);
			border-color: rgba(239, 98, 98, 0.45);
			color: #ff7d7d;
		}
	}
</style>

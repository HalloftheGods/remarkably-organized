<script lang="ts">
	interface Props {
		number: string | number;
		label: string;
		class?: string;
	}

	let { number, label, class: className = '' }: Props = $props();
</script>

<div class="stat-item {className}">
	<span class="stat-number">
		{number}
	</span>
	<span class="stat-label">
		{label}
	</span>
</div>

<style>
	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
	}

	.stat-number {
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
		font-size: 1.5rem;
		font-weight: 900;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		background: linear-gradient(135deg, #ffffff, #cbd5e1);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		white-space: nowrap;

		@media (min-width: 768px) {
			font-size: 2.25rem;
		}
	}

	.stat-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		opacity: 0.8;
		margin-top: 0.25rem;
		font-weight: 600;
		text-align: center;
		white-space: nowrap;

		@media (min-width: 768px) {
			font-size: 0.85rem;
		}
	}
</style>

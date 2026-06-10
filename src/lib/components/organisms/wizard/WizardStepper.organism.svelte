<script lang="ts">
	import CaretRightIcon from '~icons/fa/caret-right';
	
	let {
		steps = [],
		activeStep = $bindable(0)
	} = $props<{
		steps: { title: string; icon?: any }[];
		activeStep: number;
	}>();
</script>

<div class="wizard-progress">
	{#each steps as step, index}
		{@const Icon = step.icon}
		<button
			class="step-item"
			class:active={activeStep === index}
			class:completed={activeStep > index}
			onclick={() => (activeStep = index)}
			type="button">
			<div class="step-icon">
				{#if Icon}
					<Icon />
				{:else}
					<span>{index + 1}</span>
				{/if}
			</div>
			<span class="step-label">{step.title}</span>
		</button>
		{#if index < steps.length - 1}
			<div class="step-separator">
				<CaretRightIcon />
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	.wizard-progress {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2.5rem 1.5rem;
		border-bottom: 1px solid var(--outline);
		position: relative;
		z-index: 1;

		.step-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 1;
			opacity: 0.4;
			transition: opacity 0.3s ease;
			background: none;
			border: none;
			padding: 0;
			cursor: pointer;
			font-family: inherit;

			.step-icon {
				width: 2.5rem;
				height: 2.5rem;
				border-radius: 50%;
				background-color: var(--bg-high);
				border: 2px solid var(--outline);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1rem;
				color: var(--text-low);
				z-index: 2;
				transition: all 0.3s ease;
				
				span {
					font-weight: 700;
					font-size: 0.9rem;
				}
			}

			.step-label {
				margin-top: 0.5rem;
				font-size: 0.7rem;
				font-weight: 600;
				text-transform: uppercase;
				letter-spacing: 0.05em;
				color: var(--text-low);
				transition: all 0.3s ease;
			}

			&.active {
				opacity: 1;

				.step-icon {
					background: var(--brand-gradient);
					background-size: 200% 200%;
					animation: gradient-shift 4s ease-in-out infinite;
					border-color: transparent;
					color: #ffffff;
					:global(svg) {
						fill: white;
					}
				}
				.step-label {
					color: var(--text);
				}
			}

			&.completed {
				.step-icon {
					background-color: var(--bg-high);
					border-color: var(--outline);
					color: var(--text-low);
				}
				.step-label {
					color: var(--text-low);
				}
			}
		}

		.step-separator {
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--outline);
			opacity: 0.8;
			font-size: 0.95rem;
			height: 2.5rem;
			align-self: flex-start;
			margin: 0 -0.25rem;
		}

		@media (max-width: 768px) {
			padding: 0 1rem 1rem !important;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			row-gap: 0.75rem;

			.step-item {
				flex: 0 0 18%;
				.step-icon {
					width: 2rem;
					height: 2rem;
					font-size: 0.85rem;
					margin: 0 auto;
				}
				.step-label {
					display: none;
				}
			}

			.step-separator {
				display: none !important;
			}
		}
	}
	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}
</style>

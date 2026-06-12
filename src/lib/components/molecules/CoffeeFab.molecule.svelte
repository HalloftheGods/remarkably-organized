<script lang="ts">
	import CoffeeIcon from '~icons/fa-solid/coffee';
</script>

<a
	href="https://www.buymeacoffee.com/youmeos"
	target="_blank"
	class="coffee-fab tooltip-top"
	data-tooltip="Buy me a coffee">
	<CoffeeIcon />
</a>

<style lang="scss">
	.coffee-fab {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 100%;
		background-color: #6b46c1;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: transform 0.2s ease, background-color 0.2s ease;
		
		&:hover {
			transform: scale(1.05) translateY(-2px);
			background-color: #553c9a;
		}
	}
</style>

<script>
	const { value } = $props();
</script>

<input {value} />

<style lang="scss">
	input {
		font-family: var(--font-body);
		width: 100%;
		height: 100%;
		outline: none;
		padding-top: 0;
		padding-bottom: 0;
		padding-left: 0.25rem; /* Keep some side spacing for readability */
		line-height: 1; /* Makes the line height exactly match the text height */
		box-sizing: border-box; /* Ensures borders/padding don't warp your intended width */
		/* 1. Make the background invisible */
		background-color: transparent;

		/* 2. Remove the default resting border */
		border: none;

		/* 3. Strip away default Apple/browser styling (fixes iOS shadow issues) */
		appearance: none;
		-webkit-appearance: none;

		&:focus,
		&:focus-visible {
			outline: none;
			border: none;
			box-shadow: none;
		}
	}
</style>

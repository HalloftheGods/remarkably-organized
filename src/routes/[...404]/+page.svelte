<svelte:head>
	<title>Page Not Found | My Remarkably Organized</title>
</svelte:head>

<main>
	<h1>404</h1>
	<p>This page doesn't exist.</p>
	<a href="/">Back to Home</a>
</main>

<style lang="scss">
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		gap: 0.5rem;
		background-image: linear-gradient(
			180deg,
			#012b67 0%,
			#014082 25%,
			#01559d 50%,
			#016db0 75%,
			#0184ba 100%
		);
	}
	h1 {
		font-size: 8rem;
		font-weight: 800;
		margin: 0;
		line-height: 1;
		color: white;
		opacity: 0.15;
	}
	p {
		font-size: 1.25rem;
		color: white;
		opacity: 0.7;
		margin: 0;
	}
	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.12);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		padding: 0.75rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		margin-top: 1rem;
		backdrop-filter: blur(8px);
		transition: all 0.2s ease;
		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
			border-color: rgba(255, 255, 255, 0.35);
		}
	}
</style>

<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>
		Remarkably Organized v26 — Custom Planner Builder for reMarkable & E-Ink Tablets
	</title>
	<meta
		name="description"
		content="Design and export beautiful custom planners, calendars, habit trackers, and organizers for the reMarkable series and other e-ink tablets. Print-ready PDF output." />
</svelte:head>

<main>
	<section class="hero-section">
		<h1>
			<small><i>Remarkably Organized</i></small>
			<span class="title">PLANNER</span>
			<div class="version-banner">
				<svg class="ribbon-wave" viewBox="0 0 60 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="gold-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#FCD34D" stop-opacity="0" />
							<stop offset="50%" stop-color="#F59E0B" stop-opacity="0.9" />
							<stop offset="100%" stop-color="#FBBF24" stop-opacity="1" />
						</linearGradient>
					</defs>
					<path d="M 0 15 Q 15 -5 30 15 T 60 15" fill="none" stroke="url(#gold-grad-left)" stroke-width="2.5" />
					<path d="M 0 20 Q 15 0 30 20 T 60 20" fill="none" stroke="url(#gold-grad-left)" stroke-width="1.5" opacity="0.8" />
				</svg>

				<span class="v26-text">v26</span>

				<svg class="ribbon-wave" viewBox="0 0 60 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="gold-grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#FBBF24" stop-opacity="1" />
							<stop offset="50%" stop-color="#D97706" stop-opacity="0.9" />
							<stop offset="100%" stop-color="#FDE68A" stop-opacity="0" />
						</linearGradient>
					</defs>
					<path d="M 0 15 Q 15 35 30 15 T 60 15" fill="none" stroke="url(#gold-grad-right)" stroke-width="2.5" />
					<path d="M 0 10 Q 15 30 30 10 T 60 10" fill="none" stroke="url(#gold-grad-right)" stroke-width="1.5" opacity="0.8" />
				</svg>
			</div>
		</h1>
		<p>
			Create a custom planner & organizer for the e-ink tablets like the Remarkable
			series.
		</p>
		<a href="/planner{page.url.search}">Start Creating</a>
	</section>
	<section class="preview-section">
		<img
			src="/remarkably-organized-year-view.jpg?url"
			alt="Remarkably Organized Planner - Year View" />
	</section>
</main>

<style lang="scss">
	main {
		min-height: 100vh;
		background-color: #00326e;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 2rem 1rem;
		gap: 2rem;
		background-image: linear-gradient(
			135deg,
			#012b67 0%,
			#01559d 50%,
			#0184ba 100%
		);
		
		@include desktop {
			flex-direction: row;
			gap: 4rem;
			padding: 0 2rem;
		}
	}
	
	.hero-section, .preview-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 600px;
		
		@include desktop {
			flex: 1;
		}
	}

	.preview-section {
		@include desktop {
			max-width: 800px;
		}
	}

	img {
		max-width: 100%;
		max-height: 80vh;
		border-radius: 20px;
		object-fit: contain;
		box-shadow: 0px 10px 30px rgba(0,0,0,0.4);
	}

	h1 {
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		line-height: 1.1;
		margin: 0;
		width: 100%;
		
		small {
			font-size: 1.75rem;
			color: #ffffff;
			font-weight: 300;
			margin-bottom: -0.25rem;
			letter-spacing: 0.02em;
			i {
				font-style: italic;
			}
			@include tablet {
				font-size: 3rem;
				margin-bottom: -1rem;
			}
		}

		.title {
			font-size: 18vw;
			font-weight: 900;
			text-transform: uppercase;
			letter-spacing: -2px;
			text-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
			z-index: 2;
			@include tablet {
				font-size: 8rem;
				text-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
			}
			@include desktop {
				font-size: 9rem;
			}
		}
	}

	.version-banner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		margin-top: 1rem;
		
		.ribbon-wave {
			width: 60px;
			height: 30px;
			@include tablet {
				width: 80px;
				height: 40px;
			}
		}

		.v26-text {
			font-family: Georgia, 'Times New Roman', Times, serif;
			font-size: 2.25rem;
			font-weight: bold;
			color: white;
			text-shadow: 0px 2px 4px rgba(0,0,0,0.5);
			@include tablet {
				font-size: 2.75rem;
				padding: 0 0.5rem;
			}
		}
	}

	a {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		color: black;
		border-radius: 999px;
		padding: 1.25rem 3rem;
		font-size: 1.25rem;
		font-weight: 600;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s ease-in-out, background-color 0.2s ease;
		&:hover {
			background-color: #f1f5f9;
			transform: scale(1.05);
		}
		margin: 2.5rem 0 0;
		@include tablet {
			margin: 3.5rem 0 0;
			font-size: 1.5rem;
		}
	}
	
	p {
		max-width: 500px;
		color: rgba(255, 255, 255, 0.9);
		text-align: center;
		font-size: 1.1rem;
		line-height: 1.5;
		margin: 1.5rem auto 0;
		font-weight: 400;
		@include tablet {
			font-size: 1.3rem;
			margin: 2rem auto 0;
		}
	}
</style>

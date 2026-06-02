<script lang="ts">
	import { page } from '$app/state';
	import pkg from '../../package.json';

	const appVersion = pkg.version.split('.').slice(0, 2).join('.');
</script>

<svelte:head>
	<title>
		Remarkably Organized v{appVersion} — Custom Planner Builder for reMarkable & E-Ink Tablets
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
				<svg
					class="ribbon-wave"
					viewBox="0 0 60 30"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="gold-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#FCD34D" stop-opacity="0" />
							<stop offset="50%" stop-color="#F59E0B" stop-opacity="0.9" />
							<stop offset="100%" stop-color="#FBBF24" stop-opacity="1" />
						</linearGradient>
					</defs>
					<path
						d="M 0 15 Q 15 -5 30 15 T 60 15"
						fill="none"
						stroke="url(#gold-grad-left)"
						stroke-width="2.5" />
					<path
						d="M 0 20 Q 15 0 30 20 T 60 20"
						fill="none"
						stroke="url(#gold-grad-left)"
						stroke-width="1.5"
						opacity="0.8" />
				</svg>

				<span class="v26-text">v{appVersion}</span>

				<svg
					class="ribbon-wave"
					viewBox="0 0 60 30"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="gold-grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stop-color="#FBBF24" stop-opacity="1" />
							<stop offset="50%" stop-color="#D97706" stop-opacity="0.9" />
							<stop offset="100%" stop-color="#FDE68A" stop-opacity="0" />
						</linearGradient>
					</defs>
					<path
						d="M 0 15 Q 15 35 30 15 T 60 15"
						fill="none"
						stroke="url(#gold-grad-right)"
						stroke-width="2.5" />
					<path
						d="M 0 10 Q 15 30 30 10 T 60 10"
						fill="none"
						stroke="url(#gold-grad-right)"
						stroke-width="1.5"
						opacity="0.8" />
				</svg>
			</div>
		</h1>
		<p>
			Build beautiful, functional planners for the reMarkable and other e-ink tablets.
		</p>
		<a href="/planner{page.url.search}" class="primary-cta">Start Creating</a>
	</section>
	<section class="preview-section">
		<a href="/planner{page.url.search}" class="image-wrapper">
			<div class="free-badge">
				<svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
				100% FREE
			</div>
			<img
				src="/remarkably-organized-year-view.jpg?url"
				alt="Remarkably Organized Planner - Year View" />
		</a>
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
		background-image: linear-gradient(135deg, #012b67 0%, #01559d 50%, #0184ba 100%);

		@include desktop {
			flex-direction: row;
			gap: 4rem;
			padding: 0 2rem;
		}
	}

	.hero-section,
	.preview-section {
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

	.image-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: transform 0.3s ease-in-out;

		/* Adding a subtle float animation on hover for dynamic feel */
		&:hover {
			transform: scale(1.02) translateY(-5px);

			.free-badge {
				transform: rotate(-12deg) scale(1.1);
				box-shadow:
					0 15px 35px rgba(245, 158, 11, 0.6),
					inset 0 2px 4px rgba(255, 255, 255, 0.8);
			}
		}
	}

	.free-badge {
		position: absolute;
		top: -10px;
		left: -10px;
		background: linear-gradient(135deg, #fcd34d, #f59e0b);
		color: #5d2b00;
		font-weight: 900;
		font-size: 1rem;
		padding: 0.5rem 1.25rem;
		border-radius: 999px;
		box-shadow:
			0 10px 25px rgba(245, 158, 11, 0.4),
			inset 0 2px 4px rgba(255, 255, 255, 0.6);
		transform: rotate(-8deg);
		z-index: 10;
		border: 2px solid #fff;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		letter-spacing: 0.5px;
		transition:
			transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.4s ease;
		pointer-events: none;

		@include tablet {
			top: -15px;
			left: -20px;
			font-size: 1.25rem;
			padding: 0.75rem 2rem;
		}

		.star-icon {
			width: 18px;
			height: 18px;
			@include tablet {
				width: 22px;
				height: 22px;
			}
		}
	}

	img {
		max-width: 100%;
		max-height: 80vh;
		border-radius: 20px;
		object-fit: contain;
		box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
		transition: box-shadow 0.3s ease;

		.image-wrapper:hover & {
			box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.5);
		}
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
			text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
			@include tablet {
				font-size: 2.75rem;
				padding: 0 0.5rem;
			}
		}
	}

	.primary-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		color: black;
		text-decoration: none;
		border-radius: 999px;
		padding: 1.25rem 3rem;
		font-size: 1.25rem;
		font-weight: 600;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
		transition:
			transform 0.2s ease-in-out,
			background-color 0.2s ease;
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

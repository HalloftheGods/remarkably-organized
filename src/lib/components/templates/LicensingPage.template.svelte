<script lang="ts">
	import { type PlannerSettings } from '$lib';
	import { TopNav } from '$organisms';

	let {
		isPreparingPrint = false,
		forceVisible = false,
		settings = undefined as any,
	}: {
		isPreparingPrint?: any;
		forceVisible?: any;
		settings?: PlannerSettings;
	} = $props();

	const breadcrumbs = [{ name: 'About the Author', href: '#about-author' }];
</script>

<article
	id="about-author"
	class="planner-page about-author-page visible {forceVisible ? 'force-visible' : ''}">
	<div class="planner page padded about-author-content">
		<TopNav
			{settings}
			{breadcrumbs}
			hideBreadcrumbs={true}
			hideCollections={true}
			customPrevPageHref={undefined}
			customNextPageHref="#licensing"
			customTotalPages={3}
			customCurrentPage={1} />

		<div class="watermark-container">
			<img src="/webwork.png" alt="" class="watermark-img" />
		</div>

		<div class="content-wrapper">
			<header>
				<h1>The Remarkably Organized Wizard</h1>
			</header>

			<div class="prose">
				<div class="avatar-container">
					<img src="/headshot.png" alt="Xopher Pollard" class="avatar" />
				</div>
				<p>
					Hi! I'm X.P., also known as the Remarkably Organized Wizard, Xopher Pollard.
					It's true—I'm a wizard who has been obsessed with time for as long as I can
					remember, back when I was a little apprentice magician in my father's magic shop
					in Salt Lake City, Utah.
				</p>

				<p>
					It was there, surrounded by the smell of opening new playing cards and old wood,
					where I first started to study the stars. My father didn't just teach me the
					mystical ways of illusions and disillusions; he taught me the power of
					solutions. That foundation sparked a lifelong journey of rediscovery,
					reinvention, renovation, and relentless, rhetorical, rebellious repetition.
				</p>

				<p>
					To honor my love for time, chaos, order, and the beautiful space between them, I
					dedicate this project to my children: Krislynn Night, Khronus Infinidee, Gaia
					Rhæ-Satori, Ronan Tesla, and Kairos Sol.
				</p>

				<p>
					Thank you for finding use in this tool. I truly hope my magic brings some relief
					to your space and helps you navigate your own brand of time and chaos. If it
					has, please consider buying me a coffee to say thanks—it helps keep the magic
					flowing.
				</p>

				<p class="url-callout">buymeacoffee.com/youmeos</p>
			</div>
		</div>
	</div>
</article>

<style lang="scss">
	.about-author-page {
		position: relative;
		overflow: hidden;

		:global(.view-single) & {
			display: none;

			&.force-visible {
				display: block !important;
			}
		}
	}

	.about-author-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: calc(2rem + var(--margin-top)) calc(2rem + var(--margin-right))
			calc(2rem + var(--margin-bottom)) calc(2rem + var(--margin-left));
		padding-top: calc(var(--topnav-height) + var(--margin-top) + 1rem);
		box-sizing: border-box;
		height: 100%;
	}

	.watermark-container {
		position: absolute;

		top: -38%;
		// right: -15%;
		width: 95%;
		pointer-events: none;
		z-index: 0;
		opacity: 0.2;
		// transform: rotate(-12deg);
	}

	.watermark-img {
		width: 100%;
		height: auto;
		display: block;
	}

	.content-wrapper {
		position: relative;
		z-index: 1;
		max-width: 550px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.avatar-container {
		float: right;
		margin-left: 1.5rem;
		margin-bottom: 0.5rem;
		margin-top: 0.5rem;
		shape-outside: circle(50%);
	}

	.avatar {
		width: 140px;
		height: 140px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid var(--outline, #ddd);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
	}

	header {
		text-align: left;
		margin-bottom: 1rem;
		width: 100%;
		h2 {
			font-family: var(--font-cover);
			font-size: 2rem;
			color: var(--text);
			margin: 0;
		}
	}

	.prose {
		color: var(--text);
		font-family: var(--font-body);
		line-height: 1.5;
		font-size: 1.05rem;

		p {
			margin-bottom: 0.5rem;
		}
	}

	.url-callout {
		text-align: center;
		font-family: var(--font-display);
		font-size: 0.85rem;
		color: var(--text);
		opacity: 0.7;
		letter-spacing: 0.02em;
		margin-top: 0.5rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--outline, #ddd);
		border-radius: 8px;
		display: inline-block;
	}
</style>

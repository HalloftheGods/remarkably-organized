<script lang="ts">
	import { type PlannerSettings } from '$lib';

	let {
		isPreparingPrint = false,
		forceVisible = false,
		settings = undefined as any,
	}: {
		isPreparingPrint?: any;
		forceVisible?: any;
		settings?: PlannerSettings;
	} = $props();
</script>

<article
	id="licensing"
	class="planner page padded licensing-page visible {forceVisible
		? 'force-visible'
		: ''}">
	<div class="content-wrapper">
		<header>
			<h2>A Note from the Wizard</h2>
		</header>
		<div class="prose">
			<p>
				Hi! I'm X.P., also known as the Remarkable Organized Wizard, Xopher Pollard. It's
				true—I'm a wizard who has been obsessed with time for as long as I can remember,
				back when I was a little apprentice magician in my father's magic shop in Salt
				Lake City, Utah.
			</p>

			<p>
				It was there, surrounded by the smell of opening new playing cards and old wood,
				where I first started to study the stars. My father didn't just teach me the
				mystical ways of illusions and disillusions; he taught me the power of solutions.
				That foundation sparked a lifelong journey of rediscovery, reinvention,
				renovation, and relentless, rhetorical, rebellious repetition.
			</p>

			<p>
				To honor my love for time, chaos, order, and the beautiful space between them, I
				dedicate this project to my children: Krislynn Night, Khronus Infinidee, Gaia
				Rhæ-Satori, Ronan Tesla, and Kairos Sol.
			</p>

			<p>
				Thank you for finding use in this tool. I truly hope my magic brings some relief
				to your space and helps you navigate your own brand of time and chaos. If it has,
				please consider <a href="https://buymeacoffee.com/youmeos">buying me a coffee</a>
				 to say thanks—it helps keep the magic flowing.
			</p>

			<h2>Licensing &amp; Usage</h2>
			<p>
				I have licensed this planner for you to use as you see fit, with a few small,
				fair-play clarifications:
			</p>

			<ul>
				<li>
					<strong>Personal Use:</strong>
					 You are free to print, use, and adapt this planner for your own organization, goals,
					and daily life.
				</li>
				<li>
					<strong>Distribution:</strong>
					 Please do not sell, distribute, or claim the original design as your own work.
				</li>
				<li>
					<strong>Respect:</strong>
					 Please keep the credit intact as a reminder of the craftsmanship behind the pages.
				</li>
			</ul>

			<h2>Want to Customize?</h2>
			<p>
				I do offer a Premium Licensing Tier for those who want to make this planner feel
				like an extension of their own brand. A key perk of the premium tier is the
				ability to remove this note entirely and replace it with your own watermark or
				branding.
			</p>

			<p>
				If you are interested in leveling up your experience, you can find the details at <a
					href="https://remarkably-organized.com/premium">
					our Premium Licensing Page
				</a>
				.
			</p>
		</div>
	</div>
</article>

<style lang="scss">
	.planner.page.licensing-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: calc(2rem + var(--margin-top)) calc(2rem + var(--margin-right))
			calc(2rem + var(--margin-bottom)) calc(2rem + var(--margin-left));
		box-sizing: border-box;

		:global(.view-single) & {
			display: none;

			&.force-visible {
				display: flex !important;
			}
		}
	}

	.content-wrapper {
		max-width: 600px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	header {
		text-align: center;
		margin-bottom: 0.5rem;
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
		line-height: 1.4;
		font-size: 0.9rem;

		h2 {
			font-family: var(--font-display);
			font-size: 1.4rem;
			margin-top: 1rem;
			margin-bottom: 0.25rem;
		}

		p {
			margin-bottom: 0.5rem;
		}

		ul {
			margin-bottom: 0.5rem;
			padding-left: 1.5rem;
			li {
				margin-bottom: 0.25rem;
			}
		}

		a {
			color: var(--text);
			text-decoration: underline;
			font-weight: bold;
		}
	}
</style>

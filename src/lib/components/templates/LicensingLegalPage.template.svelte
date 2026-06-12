<script lang="ts">
	import { type PlannerSettings } from '$lib';
	import { TopNav } from '$organisms';

	let {
		isPreparingPrint = false,
		forceVisible = false,
		currentHash = '',
		settings = undefined as any,
	}: {
		isPreparingPrint?: boolean;
		forceVisible?: boolean;
		currentHash?: string;
		settings?: PlannerSettings;
	} = $props();

	const licenses = [
		{
			id: 'licensing',
			title: 'Licensing & Usage',
			type: 'usage',
			content: '',
		},
		{
			id: 'copyright-artwork',
			title: 'Artwork & Assets',
			type: 'text',
			content: `All illustrations, graphics, and visual assets included in this planner are the exclusive property of Xopher Pollard and Hall of the Gods Inc.

These assets may not be extracted, copied, or reused outside of the context of this planner without explicit written permission.

The artwork is designed to enhance your personal planning experience and is protected under applicable copyright laws.`,
		},
		{
			id: 'copyright-templates',
			title: 'Templates & Layouts',
			type: 'text',
			content: `The structural layouts, page designs, and organizational systems within the Remarkably Organized planner are designed for your personal productivity.

While you are encouraged to adapt and customize these templates for your own life, you may not repackage, resell, or distribute these layouts as competing products or templates.`,
		},
		{
			id: 'commercial-use',
			title: 'Commercial Restrictions',
			type: 'text',
			content: `This planner is provided strictly for personal, non-commercial use unless a Premium Licensing Tier has been obtained.

You may not reproduce, mass-print, or distribute physical or digital copies of this planner for profit. 

If you wish to use this planner within a corporate setting, for client distribution, or as part of a workshop, please obtain the appropriate commercial license.`,
		},
	];
</script>

{#each licenses as license, index}
	{@const isVisible = forceVisible && currentHash === license.id}
	{@const prev = index > 0 ? licenses[index - 1].id : 'about-author'}
	{@const next = index < licenses.length - 1 ? licenses[index + 1].id : null}
	{@const breadcrumbs = [{ name: license.title, href: '#' + license.id }]}

	<article
		id={license.id}
		class="planner-page licensing-legal-page visible"
		class:force-visible={isVisible}>
		<div class="planner page padded licensing-legal-content">
			<TopNav
				{settings}
				{breadcrumbs}
				hideBreadcrumbs={true}
				hideCollections={true}
				customPrevPageHref={prev ? '#' + prev : undefined}
				customNextPageHref={next ? '#' + next : undefined}
				customTotalPages={licenses.length + 1}
				customCurrentPage={index + 2} />

			<div class="watermark-container">
				<img src="/omega-logo.png" alt="" class="watermark-img" />
			</div>

			<div class="content-wrapper">
				<header>
					<h2>{license.title}</h2>
				</header>

				<div class="prose">
					{#if license.type === 'usage'}
						<p>
							I have licensed this planner for you to use as you see fit, with a few
							small, fair-play clarifications:
						</p>

						<ul>
							<li>
								<strong>Personal Use:</strong>
								You are free to print, use, and adapt this planner for your own organization,
								goals, and daily life.
							</li>
							<li>
								<strong>Distribution:</strong>
								Please do not sell, distribute, or claim the original design as your own work.
							</li>
							<li>
								<strong>Respect:</strong>
								Please keep the credit intact as a reminder of the craftsmanship behind the
								pages.
							</li>
						</ul>

						<h3>Want to Customize?</h3>
						<p>
							I do offer a Premium Licensing Tier for those who want to make this planner
							feel like an extension of their own brand. A key perk of the premium tier is
							the ability to remove this note entirely and replace it with your own
							watermark or branding.
						</p>

						<p>
							If you are interested in leveling up your experience, you can find the
							details at our Premium Licensing Page:
						</p>

						<p class="url-callout">remarkably-organized.com/premium</p>
					{:else}
						<div class="license-text">
							{#each license.content.split('\n\n') as paragraph}
								<p>{paragraph}</p>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</article>
{/each}

<style lang="scss">
	.licensing-legal-page {
		position: relative;
		overflow: hidden;

		:global(.view-single) & {
			display: none;

			&.force-visible {
				display: block !important;
			}
		}
	}

	.licensing-legal-content {
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
		top: 50%;
		left: 50%;
		width: 50%;
		pointer-events: none;
		z-index: 0;
		opacity: 0.08;
		transform: translate(-50%, -50%);
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

		h3 {
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
	}

	.license-text {
		font-family: monospace;
		font-size: 0.75rem;
		line-height: 1.3;
		opacity: 0.8;

		p {
			margin-bottom: 0.75rem;
		}
	}

	.url-callout {
		text-align: center;
		font-family: var(--font-display);
		font-size: 0.85rem;
		color: var(--text);
		opacity: 0.7;
		letter-spacing: 0.02em;
		margin-top: 0.25rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--outline, #ddd);
		border-radius: 8px;
		display: inline-block;
	}
</style>

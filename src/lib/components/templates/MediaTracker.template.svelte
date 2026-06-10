<script lang="ts">
	import type { PlannerSettings } from '$lib';

	let { settings = {} }: { settings?: PlannerSettings } = $props();
	const showEmoji = $derived(!settings?.emojis?.disable);
</script>

<div class="planner page media-tracker">
	<div class="header-section">
		<span class="label">
			{#if showEmoji}🎬{/if} MEDIA TRACKER
		</span>
		<div class="line"></div>
	</div>

	<div class="content-section">
		<div class="table-header">
			<div class="col-title"><span>TITLE (MOVIES, SHOWS, GAMES)</span></div>
			<div class="col-genre"><span>GENRE</span></div>
			<div class="col-rating"><span>RATING</span></div>
		</div>
		{#each Array(15) as _}
			<div class="table-row">
				<div class="col-title"><div class="line"></div></div>
				<div class="col-genre"><div class="line"></div></div>
				<div class="col-rating">
					{#each Array(5) as _}
						<span class="star">☆</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.media-tracker {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 1.5rem;
	}

	.label {
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--text-low);
		margin-bottom: 0.25rem;
		letter-spacing: 0.5px;
	}

	.line {
		border-bottom: 1px solid var(--outline);
		height: 1.5rem;
		width: 100%;
	}

	.content-section {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--outline);
		border-radius: 4px;
	}

	.table-header {
		display: flex;
		background-color: var(--nav-bg-pdf, #f8f8f8);
		border-bottom: 2px solid var(--outline);
		padding: 0.5rem;
		font-weight: bold;
		font-size: 0.65rem;
		color: var(--text-sidebar, var(--text-low));
		text-align: center;
		letter-spacing: 0.5px;

		> div {
			padding: 0 0.5rem;
		}
	}

	.table-row {
		display: flex;
		padding: 0 0.5rem;
		border-bottom: 1px solid var(--outline);
		height: 2.5rem;
		align-items: center;

		&:last-child {
			border-bottom: none;
		}
		> div {
			padding: 0 0.5rem;
			height: 100%;
			display: flex;
			align-items: flex-end;
			padding-bottom: 0.5rem;
		}
	}

	.col-title {
		flex: 4;
	}
	.col-genre {
		flex: 2;
	}
	.col-rating {
		flex: 1.5;
		display: flex;
		gap: 0.25rem;
		align-items: center;
		padding-bottom: 0.5rem !important;

		.star {
			font-size: 1.25rem;
			color: var(--outline-high);
		}
	}
</style>

<script lang="ts">
	import type { PlannerSettings } from '$lib';
	import MeshGradient from './MeshGradient.svelte';
	import TopographicWaves from './TopographicWaves.svelte';
	import BauhausArt from './BauhausArt.svelte';
	import KineticTypography from './KineticTypography.svelte';
	import Glassmorphism from './Glassmorphism.svelte';
	import SacredGeometry from './SacredGeometry.svelte';
	import EmojiPattern from './EmojiPattern.svelte';

	let { settings }: { settings: PlannerSettings } = $props();

	const style = $derived(settings.coverPage.backgroundStyle);
	const seed = $derived(settings.coverPage.backgroundSeed);
	const complexity = $derived(settings.coverPage.backgroundComplexity);
	const palette = $derived(settings.coverPage.backgroundPalette);
</script>

{#if style === 'mesh'}
	<MeshGradient {seed} {complexity} {palette} />
{:else if style === 'waves'}
	<TopographicWaves {seed} {complexity} {palette} />
{:else if style === 'bauhaus'}
	<BauhausArt {seed} {complexity} {palette} />
{:else if style === 'halftone'}
	<KineticTypography {seed} {complexity} {palette} {settings} />
{:else if style === 'glassmorphism'}
	<Glassmorphism {seed} {complexity} {palette} />
{:else if style === 'geometry'}
	<SacredGeometry {seed} {complexity} {palette} />
{:else if style === 'emoji'}
	<EmojiPattern {seed} {complexity} {palette} {settings} />
{/if}

<style>
	:global(.cover-bg-wrapper) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;
	}
	:global(.cover-bg-svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>

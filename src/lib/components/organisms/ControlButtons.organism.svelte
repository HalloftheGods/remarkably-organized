<script lang="ts">
	import MagicIcon from '~icons/fa/magic';
	import CalendarIcon from '~icons/fa/calendar';
	import SaveIcon from '~icons/fa/save';
	import HatWizardIcon from '~icons/fa-solid/hat-wizard';
	import PrintIcon from '~icons/fa/print';
	import BookIcon from '~icons/fa/book';
	import BookOpenIcon from '~icons/fa-solid/book-open';
	import CameraIcon from '~icons/fa/camera';
	import FileIcon from '~icons/fa/file';
	import LoadingIcon from '~icons/eos-icons/bubble-loading';

	interface Props {
		previewMode: 'single' | 'list' | 'grid' | 'carousel';
		isExportingImage: boolean;
		isExportMode: boolean;
		showConfigMenu: boolean;
		showMenu: boolean;
		showCalendarMenu: boolean;
		showCollectionsEventsMenu: boolean;
		showPageSizeMenu: boolean;
		showGalleryModal: boolean;
		handlePrint: () => void;
		toggleCalendarMenu: () => void;
		toggleCollectionsEventsMenu: () => void;
		togglePageSizeMenu: () => void;
		toggleMenu: () => void;
		toggleHelp: () => void;
	}

	let {
		previewMode,
		isExportingImage,
		isExportMode = $bindable(),
		showConfigMenu = $bindable(),
		showMenu = $bindable(),
		showCalendarMenu = $bindable(),
		showCollectionsEventsMenu = $bindable(),
		showPageSizeMenu = $bindable(),
		showGalleryModal = $bindable(),
		handlePrint,
		toggleCalendarMenu,
		toggleCollectionsEventsMenu,
		togglePageSizeMenu,
		toggleMenu,
		toggleHelp,
	}: Props = $props();
</script>

{#if previewMode === 'grid'}
	<button
		onclick={() => (isExportMode = !isExportMode)}
		class="export-image-trigger no-print tooltip-bottom {isExportMode ? 'active' : ''}"
		data-tooltip={isExportMode ? 'Click a page to export!' : 'Export Page Image'}>
		{#if isExportingImage}
			<LoadingIcon />
		{:else}
			<CameraIcon />
		{/if}
	</button>
{/if}
<button
	onclick={handlePrint}
	class="print-trigger no-print tooltip-bottom"
	data-tooltip="Download / Print PDF">
	<PrintIcon />
</button>
<button
	onclick={() => (showGalleryModal = true)}
	class="gallery-trigger no-print tooltip-bottom"
	data-tooltip="Template Gallery">
	<BookIcon />
</button>
<button
	onclick={() => {
		showConfigMenu = !showConfigMenu;
		if (showConfigMenu) {
			showMenu = false;
			showCalendarMenu = false;
			showCollectionsEventsMenu = false;
		}
	}}
	class="config-trigger no-print tooltip-bottom"
	data-tooltip="Backup & Restore">
	<SaveIcon />
</button>
<button
	onclick={toggleCalendarMenu}
	class="calendar-trigger no-print"
	data-tooltip="Calendar Views">
	<CalendarIcon />
</button>
<button
	onclick={toggleCollectionsEventsMenu}
	class="collections-trigger no-print"
	data-tooltip="Collections & Events">
	<BookOpenIcon />
</button>
<button
	onclick={togglePageSizeMenu}
	class="pagesize-trigger no-print"
	data-tooltip="Page Size">
	<FileIcon />
</button>
<button onclick={toggleMenu} class="menu-trigger no-print" data-tooltip="Design & Layout">
	<MagicIcon />
</button>
<button
	onclick={toggleHelp}
	class="help-trigger no-print tooltip-bottom"
	data-tooltip="Planner Wizard">
	<HatWizardIcon />
</button>

<style lang="scss">
	.menu-trigger {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 50;
		background-color: var(--bg);
		color: currentColor;
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		&:hover {
			color: black;
		}
		@include tablet {
			right: 2rem;
		}
	}
	.export-image-trigger {
		position: fixed;
		top: 1rem;
		right: 13rem;
		z-index: 50;
		background-color: var(--action);
		color: var(--action-text);
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: background-color 0.2s ease;
		&:hover {
			background-color: var(--action-high);
			color: var(--action-text-high);
		}
		@include tablet {
			right: 14rem;
		}
		&.active {
			background-color: var(--action-high);
			color: var(--action-text-high);
			box-shadow: 0 0 0 4px var(--text);
		}
	}
	.print-trigger {
		position: fixed;
		top: 1rem;
		right: 5rem;
		z-index: 50;
		background-color: var(--action);
		color: var(--action-text);
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: background-color 0.2s ease;
		&:hover {
			background-color: var(--action-high);
			color: var(--action-text-high);
		}
		@include tablet {
			right: 6rem;
		}
	}
	.gallery-trigger {
		position: fixed;
		top: 1rem;
		right: 9rem;
		z-index: 50;
		background-color: var(--action);
		color: var(--action-text);
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: background-color 0.2s ease;
		&:hover {
			background-color: var(--action-high);
			color: var(--action-text-high);
		}
		@include tablet {
			right: 10rem;
		}
	}
	.config-trigger {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 50;
		background-color: var(--bg);
		color: currentColor;
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: color 0.2s ease;
		&:hover {
			color: black;
		}
		@include tablet {
			right: 2rem;
		}
	}
	.calendar-trigger {
		position: fixed;
		bottom: 1rem;
		right: 9rem;
		z-index: 50;
		background-color: var(--bg);
		color: currentColor;
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: color 0.2s ease;
		&:hover {
			color: black;
		}
		@include tablet {
			right: 10rem;
		}
	}
	.collections-trigger {
		position: fixed;
		bottom: 1rem;
		right: 5rem;
		z-index: 50;
		background-color: var(--bg);
		color: currentColor;
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: color 0.2s ease;
		&:hover {
			color: black;
		}
		@include tablet {
			right: 6rem;
		}
	}
	.pagesize-trigger {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		background-color: var(--action);
		color: var(--action-text);
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition: background-color 0.2s ease;
		&:hover {
			background-color: var(--action-high);
			color: var(--action-text-high);
		}
	}
	@keyframes wizard-gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.help-trigger {
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 50;
		background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%);
		background-size: 200% 200%;
		animation: wizard-gradient-shift 4s ease-in-out infinite;
		color: white;
		border: none;
		border-radius: 100%;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.35em;
		box-shadow: var(--shadow-4);
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		&:hover {
			transform: scale(1.05) translateY(-2px);
			box-shadow: var(--shadow-5);
			color: white;
		}
		@include tablet {
			left: 2rem;
		}
		&::before {
			top: 100% !important;
			left: 50% !important;
			right: auto !important;
			bottom: auto !important;
			margin-top: 0.75rem !important;
			margin-left: 0 !important;
			margin-right: 0 !important;
			margin-bottom: 0 !important;
			transform: translateX(-50%) translateY(-0.25rem) scale(0.9) !important;
			transform-origin: top center !important;
		}
		&:hover::before {
			transform: translateX(-50%) translateY(0) scale(1) !important;
		}
	}
</style>

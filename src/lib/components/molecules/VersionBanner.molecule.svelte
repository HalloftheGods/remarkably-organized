<script lang="ts">
	interface Props {
		version: string;
	}

	let { version }: Props = $props();
</script>

<div class="flex items-center justify-center gap-[0.5rem] w-full mt-[1rem]">
	<svg
		class="w-[60px] h-[30px] tablet:w-[80px] tablet:h-[40px]"
		viewBox="0 0 60 30"
		preserveAspectRatio="none"
		xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="brand-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="#ec4899" stop-opacity="0" />
				<stop offset="50%" stop-color="#a855f7" stop-opacity="0.8" />
				<stop offset="100%" stop-color="#6366f1" stop-opacity="1" />
			</linearGradient>
		</defs>
		<path
			d="M 0 15 Q 15 -10 30 15 T 60 15"
			fill="none"
			stroke="url(#brand-grad-left)"
			stroke-width="3"
			stroke-linecap="round" />
		<path
			d="M 0 22 Q 15 2 30 22 T 60 22"
			fill="none"
			stroke="url(#brand-grad-left)"
			stroke-width="1.5"
			opacity="0.6"
			stroke-linecap="round" />
	</svg>
	<img src="/web-app-manifest-512x512.png" alt="Logo" class="w-32 h-32" />
	<span
		class="font-serif text-[2.25rem] font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tablet:text-[2.75rem] tablet:px-[0.5rem]">
		v{version}
	</span>

	<svg
		class="w-[60px] h-[30px] tablet:w-[80px] tablet:h-[40px]"
		viewBox="0 0 60 30"
		preserveAspectRatio="none"
		xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="brand-grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="#6366f1" stop-opacity="1" />
				<stop offset="50%" stop-color="#a855f7" stop-opacity="0.8" />
				<stop offset="100%" stop-color="#ec4899" stop-opacity="0" />
			</linearGradient>
		</defs>
		<path
			d="M 0 15 Q 15 40 30 15 T 60 15"
			fill="none"
			stroke="url(#brand-grad-right)"
			stroke-width="3"
			stroke-linecap="round" />
		<path
			d="M 0 8 Q 15 33 30 8 T 60 8"
			fill="none"
			stroke="url(#brand-grad-right)"
			stroke-width="1.5"
			opacity="0.6"
			stroke-linecap="round" />
	</svg>
</div>

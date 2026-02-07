<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import TextInputArea from '$lib/components/TextInputArea.svelte';
	import WordPlayer from '$lib/components/WordPlayer.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let text = $state('');
</script>

<div class="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
	<!-- Header -->
	<header class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
				ADHD Reader
			</h1>
			<p class="mt-0.5 text-xs text-text-muted sm:text-sm">
				{m.app_tagline()}
			</p>
		</div>
		<ThemeToggle />
	</header>

	<!-- Player section -->
	<section class="mb-6">
		<WordPlayer {text} />
	</section>

	<!-- Input section -->
	<section class="mt-auto">
		<TextInputArea bind:text />
	</section>

	<!-- Footer hint -->
	<footer class="mt-4 text-center">
		<p class="text-[11px] text-text-muted">
			<kbd class="rounded border border-(--color-border) px-1.5 py-0.5 font-mono text-[10px]"
				>Space</kbd
			>
			{m.space_play_pause()}
			&nbsp;&middot;&nbsp;
			<kbd class="rounded border border-(--color-border) px-1.5 py-0.5 font-mono text-[10px]"
				>&larr;</kbd
			>
			<kbd class="rounded border border-(--color-border) px-1.5 py-0.5 font-mono text-[10px]"
				>&rarr;</kbd
			>
			{m.arrows_skip()}
			&nbsp;&middot;&nbsp;
			<kbd class="rounded border border-(--color-border) px-1.5 py-0.5 font-mono text-[10px]">R</kbd
			>
			{m.r_reset()}
			&nbsp;&middot;&nbsp;
			<kbd class="rounded border border-(--color-border) px-1.5 py-0.5 font-mono text-[10px]">F</kbd>
			{m.enter_fullscreen()}
		</p>
	</footer>
</div>

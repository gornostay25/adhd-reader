<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import TextInputArea from '$lib/components/TextInputArea.svelte';
	import WordPlayer from '$lib/components/WordPlayer.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let text = $state('');
</script>

<svelte:head>
	<title>{m.app_title()}</title>
	<meta
		name="description"
		content="ADHD Reader displays text one word at a time at adjustable speed, helping people with ADHD and anyone who wants to stay focused while reading."
	/>
	<meta
		name="keywords"
		content="ADHD, reader, focus, reading tool, speed reading, word by word, concentration, accessibility"
	/>
	<meta name="author" content="Volodymyr Palamar (@gornostay25)" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://adhd-reader.app/" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://adhd-reader.app/" />
	<meta property="og:title" content="{m.app_title()} — Focus Reading Tool" />
	<meta
		property="og:description"
		content="ADHD Reader displays text one word at a time at adjustable speed, helping people with ADHD and anyone who wants to stay focused while reading."
	/>
	<meta property="og:image" content="https://adhd-reader.app/og-image.png" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="ADHD Reader" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://adhd-reader.app/" />
	<meta name="twitter:title" content="{m.app_title()} — Focus Reading Tool" />
	<meta
		name="twitter:description"
		content="ADHD Reader displays text one word at a time at adjustable speed, helping people with ADHD and anyone who wants to stay focused while reading."
	/>
	<meta name="twitter:image" content="https://adhd-reader.app/og-image.png" />

	<!-- PWA / Mobile -->
	<meta name="theme-color" content="#6366f1" />
	<meta name="application-name" content="ADHD Reader" />
	<meta name="apple-mobile-web-app-title" content="ADHD Reader" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
</svelte:head>

<div class="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
	<!-- Header -->
	<header class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
				{m.app_title()}
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
		</p>
	</footer>
</div>

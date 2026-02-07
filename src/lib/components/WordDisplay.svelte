<script lang="ts">
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';

	interface Props {
		words: string;
		isPlaying: boolean;
		fullscreen?: boolean;
		ontogglefullscreen?: () => void;
	}

	let { words, isPlaying, fullscreen = false, ontogglefullscreen }: Props = $props();

	let containerEl: HTMLDivElement | undefined = $state();

	const displayText = $derived(words || m.ready());
	const isEmpty = $derived(!words);

	async function toggleFullscreen() {
		if (!containerEl) return;

		if (!document.fullscreenElement) {
			await containerEl.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.code === 'KeyF') {
			e.preventDefault();
			toggleFullscreen();
		}
	}

	onMount(() => {
		const ac = new AbortController();

		function onFullscreenChange() {
			if (ontogglefullscreen) {
				ontogglefullscreen();
			}
		}

		document.addEventListener('fullscreenchange', onFullscreenChange, {
			signal: ac.signal
		});
		document.addEventListener('keydown', handleKeydown, {
			signal: ac.signal
		});

		return () => {
			ac.abort();
		};
	});

	export function requestFullscreen() {
		toggleFullscreen();
	}
</script>

<div
	bind:this={containerEl}
	class="relative flex min-h-[200px] items-center justify-center rounded-2xl border border-(--color-border) bg-surface p-8 transition-colors sm:min-h-[260px]"
	class:fullscreen-container={fullscreen}
>
	<p
		class="max-w-full text-center leading-tight font-bold tracking-tight transition-opacity duration-100 select-none"
		class:text-4xl={!fullscreen}
		class:sm:text-6xl={!fullscreen}
		class:md:text-7xl={!fullscreen}
		class:text-6xl={fullscreen}
		class:sm:text-8xl={fullscreen}
		class:md:text-9xl={fullscreen}
		class:text-[var(--color-text-muted)]={isEmpty}
		class:text-[var(--color-text-primary)]={!isEmpty}
		class:opacity-40={isEmpty && !isPlaying}
	>
		{displayText}
	</p>

	<!-- Fullscreen toggle button -->
	<button
		onclick={toggleFullscreen}
		class="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-(--color-surface-hover) hover:text-text-primary"
		aria-label={fullscreen ? m.exit_fullscreen() : m.enter_fullscreen()}
	>
		{#if fullscreen}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="4 14 10 14 10 20" />
				<polyline points="20 10 14 10 14 4" />
				<line x1="14" y1="10" x2="21" y2="3" />
				<line x1="3" y1="21" x2="10" y2="14" />
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="15 3 21 3 21 9" />
				<polyline points="9 21 3 21 3 15" />
				<line x1="21" y1="3" x2="14" y2="10" />
				<line x1="3" y1="21" x2="10" y2="14" />
			</svg>
		{/if}
	</button>
</div>

<style>
	.fullscreen-container {
		position: fixed;
		inset: 0;
		z-index: 50;
		border-radius: 0;
		border: none;
		min-height: 100vh;
		background-color: var(--color-bg);
	}
</style>

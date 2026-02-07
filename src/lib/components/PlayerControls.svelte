<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	interface Props {
		isPlaying: boolean;
		wpm: number;
		wordsPerStep: number;
		canPlay: boolean;
		onplay: () => void;
		onpause: () => void;
		onreset: () => void;
		onskipback: () => void;
		onskipforward: () => void;
		onwpmchange: (wpm: number) => void;
		onwordsperstepchange: (count: number) => void;
	}

	let {
		isPlaying,
		wpm,
		wordsPerStep,
		canPlay,
		onplay,
		onpause,
		onreset,
		onskipback,
		onskipforward,
		onwpmchange,
		onwordsperstepchange
	}: Props = $props();

	const wordStepOptions = [1, 2, 3, 4, 5];
</script>

<div class="flex flex-col gap-4">
	<!-- Main playback controls -->
	<div class="flex items-center justify-center gap-2">
		<!-- Reset -->
		<button
			onclick={onreset}
			disabled={!canPlay}
			class="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-(--color-surface-hover) hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
			aria-label={m.reset()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="1 4 1 10 7 10" />
				<path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
			</svg>
		</button>

		<!-- Skip backward -->
		<button
			onclick={onskipback}
			disabled={!canPlay}
			class="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-(--color-surface-hover) hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
			aria-label={m.skip_backward()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polygon points="19 20 9 12 19 4 19 20" />
				<line x1="5" y1="19" x2="5" y2="5" />
			</svg>
		</button>

		<!-- Play/Pause -->
		<button
			onclick={isPlaying ? onpause : onplay}
			disabled={!canPlay}
			class="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-accent) text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
			aria-label={isPlaying ? m.pause() : m.play()}
		>
			{#if isPlaying}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<rect x="6" y="4" width="4" height="16" rx="1" />
					<rect x="14" y="4" width="4" height="16" rx="1" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<polygon points="6 3 20 12 6 21 6 3" />
				</svg>
			{/if}
		</button>

		<!-- Skip forward -->
		<button
			onclick={onskipforward}
			disabled={!canPlay}
			class="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-(--color-surface-hover) hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
			aria-label={m.skip_forward()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polygon points="5 4 15 12 5 20 5 4" />
				<line x1="19" y1="5" x2="19" y2="19" />
			</svg>
		</button>

		<!-- placeholder for symmetry -->
		<div class="h-10 w-10"></div>
	</div>

	<!-- Speed and word count controls -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
		<!-- Speed (WPM) -->
		<div class="flex items-center gap-3">
			<label for="wpm-slider" class="min-w-fit text-xs font-medium text-text-muted">
				{m.speed()}
			</label>
			<input
				id="wpm-slider"
				type="range"
				min="50"
				max="600"
				step="10"
				value={wpm}
				oninput={(e) => onwpmchange(Number((e.target as HTMLInputElement).value))}
				class="h-1.5 w-28 cursor-pointer appearance-none rounded-full bg-(--color-progress-bg) accent-(--color-accent) sm:w-36"
			/>
			<span class="min-w-[4.5ch] text-right text-xs font-medium text-text-secondary tabular-nums">
				{wpm} <span class="text-text-muted">{m.wpm()}</span>
			</span>
		</div>

		<!-- Words per step -->
		<div class="flex items-center gap-3">
			<span class="text-xs font-medium text-text-muted">{m.words_label()}</span>
			<div class="flex gap-1">
				{#each wordStepOptions as option (option)}
					<button
						onclick={() => onwordsperstepchange(option)}
						class="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium transition-colors"
						class:bg-[var(--color-accent)]={wordsPerStep === option}
						class:text-white={wordsPerStep === option}
						class:bg-[var(--color-surface)]={wordsPerStep !== option}
						class:text-[var(--color-text-secondary)]={wordsPerStep !== option}
						class:hover:bg-[var(--color-surface-hover)]={wordsPerStep !== option}
					>
						{option}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>

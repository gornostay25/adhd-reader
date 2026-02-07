<script lang="ts">
	import { onMount } from 'svelte';
	import WordDisplay from './WordDisplay.svelte';
	import PlayerControls from './PlayerControls.svelte';
	import ProgressBar from './ProgressBar.svelte';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();

	let isPlaying = $state(false);
	let currentIndex = $state(0);
	let wpm = $state(200);
	let wordsPerStep = $state(1);
	let isFullscreen = $state(false);
	let timer: ReturnType<typeof setInterval> | null = null;

	const words = $derived(
		text
			.trim()
			.split(/\s+/)
			.filter((w) => w.length > 0)
	);

	const totalWords = $derived(words.length);
	const canPlay = $derived(totalWords > 0);

	const currentWords = $derived.by(() => {
		if (totalWords === 0) return '';
		const slice = words.slice(currentIndex, currentIndex + wordsPerStep);
		return slice.join(' ');
	});

	const intervalMs = $derived(Math.round((60 / wpm) * 1000));

	function startTimer() {
		stopTimer();
		timer = setInterval(() => {
			const nextIndex = currentIndex + wordsPerStep;
			if (nextIndex >= totalWords) {
				currentIndex = totalWords - 1;
				pause();
			} else {
				currentIndex = nextIndex;
			}
		}, intervalMs);
	}

	function stopTimer() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}

	function play() {
		if (!canPlay) return;
		if (currentIndex >= totalWords - 1) {
			currentIndex = 0;
		}
		isPlaying = true;
		startTimer();
	}

	function pause() {
		isPlaying = false;
		stopTimer();
	}

	function reset() {
		pause();
		currentIndex = 0;
	}

	function skipBack() {
		const newIndex = Math.max(0, currentIndex - wordsPerStep * 5);
		currentIndex = newIndex;
		if (isPlaying) startTimer();
	}

	function skipForward() {
		const newIndex = Math.min(totalWords - 1, currentIndex + wordsPerStep * 5);
		currentIndex = newIndex;
		if (isPlaying) startTimer();
	}

	function seek(index: number) {
		currentIndex = Math.max(0, Math.min(index, totalWords - 1));
		if (isPlaying) startTimer();
	}

	function handleWpmChange(newWpm: number) {
		wpm = newWpm;
		if (isPlaying) startTimer();
	}

	function handleWordsPerStepChange(count: number) {
		wordsPerStep = count;
		if (isPlaying) startTimer();
	}

	function handleFullscreenToggle() {
		isFullscreen = !!document.fullscreenElement;
	}

	// Reset when text changes
	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		text; // track dependency
		reset();
	});

	// Keyboard shortcuts
	function handleKeydown(e: KeyboardEvent) {
		if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;

		switch (e.code) {
			case 'Space':
				e.preventDefault();
				if (isPlaying) {
					pause();
				} else {
					play();
				}
				break;
			case 'ArrowLeft':
				e.preventDefault();
				skipBack();
				break;
			case 'ArrowRight':
				e.preventDefault();
				skipForward();
				break;
			case 'KeyR':
				if (e.metaKey || e.ctrlKey) return;
				e.preventDefault();
				reset();
				break;
		}
	}

	onMount(() => {
		const ac = new AbortController();
		document.addEventListener('keydown', handleKeydown, {
			signal: ac.signal
		});
		return () => {
			stopTimer();
			ac.abort();
		};
	});
</script>

<div class="flex flex-col gap-4">
	<WordDisplay
		words={currentWords}
		{isPlaying}
		fullscreen={isFullscreen}
		ontogglefullscreen={handleFullscreenToggle}
	/>

	<ProgressBar current={currentIndex} total={totalWords} onseek={seek} />

	<PlayerControls
		{isPlaying}
		{wpm}
		{wordsPerStep}
		{canPlay}
		onplay={play}
		onpause={pause}
		onreset={reset}
		onskipback={skipBack}
		onskipforward={skipForward}
		onwpmchange={handleWpmChange}
		onwordsperstepchange={handleWordsPerStepChange}
	/>
</div>

<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	interface Props {
		current: number;
		total: number;
		onseek?: (index: number) => void;
	}

	let { current, total, onseek }: Props = $props();

	const progress = $derived(total > 0 ? (current / total) * 100 : 0);

	function handleClick(e: MouseEvent) {
		if (!onseek || total <= 0) return;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
		onseek(Math.floor(ratio * total));
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!onseek || total <= 0) return;
		if (e.key === 'ArrowRight') {
			onseek(Math.min(current + 1, total - 1));
		} else if (e.key === 'ArrowLeft') {
			onseek(Math.max(current - 1, 0));
		}
	}
</script>

<div class="flex items-center gap-3">
	<span class="min-w-[3ch] text-right text-xs text-text-muted tabular-nums">
		{current + 1}
	</span>

	<div
		class="group relative h-1.5 flex-1 cursor-pointer rounded-full bg-(--color-progress-bg) transition-all hover:h-2"
		role="slider"
		tabindex="0"
		aria-valuenow={current}
		aria-valuemin={0}
		aria-valuemax={total}
		aria-label={m.reading_progress()}
		onclick={handleClick}
		onkeydown={handleKeydown}
	>
		<div
			class="absolute inset-y-0 left-0 rounded-full bg-(--color-progress) transition-all duration-150"
			style="width: {progress}%"
		></div>
	</div>

	<span class="min-w-[3ch] text-xs text-text-muted tabular-nums">
		{total}
	</span>
</div>

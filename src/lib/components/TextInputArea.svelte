<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	interface Props {
		text: string;
		disabled?: boolean;
	}

	let { text = $bindable(''), disabled = false }: Props = $props();

	const wordCount = $derived(
		text
			.trim()
			.split(/\s+/)
			.filter((w) => w.length > 0).length
	);

	function clear() {
		text = '';
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<label for="text-input" class="text-sm font-medium text-text-secondary">
			{m.paste_text()}
		</label>
		<div class="flex items-center gap-3">
			<span class="text-xs text-text-muted">
				{wordCount}
				{wordCount === 1 ? m.word() : m.words()}
			</span>
			{#if text.length > 0}
				<button
					onclick={clear}
					class="text-xs text-text-muted transition-colors hover:text-(--color-accent)"
					{disabled}
				>
					{m.clear()}
				</button>
			{/if}
		</div>
	</div>
	<textarea
		id="text-input"
		bind:value={text}
		{disabled}
		placeholder={m.placeholder()}
		class="h-40 w-full resize-none rounded-xl border border-(--color-border) bg-surface px-4 py-3 text-sm leading-relaxed text-text-primary transition-colors placeholder:text-text-muted focus:border-(--color-border-focus) focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
	></textarea>
</div>

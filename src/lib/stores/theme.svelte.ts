import { browser } from '$app/environment';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'adhd-reader-theme';

function getSystemTheme(): 'light' | 'dark' {
	if (!browser) return 'dark';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): ThemeMode {
	if (!browser) return 'system';
	return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'system';
}

function applyTheme(mode: ThemeMode) {
	if (!browser) return;
	const resolved = mode === 'system' ? getSystemTheme() : mode;
	document.documentElement.classList.toggle('dark', resolved === 'dark');
}

let mode = $state<ThemeMode>(getStoredTheme());

export function getThemeMode(): ThemeMode {
	return mode;
}

export function getResolvedTheme(): 'light' | 'dark' {
	return mode === 'system' ? getSystemTheme() : mode;
}

export function setTheme(newMode: ThemeMode) {
	mode = newMode;
	if (browser) {
		localStorage.setItem(STORAGE_KEY, newMode);
	}
	applyTheme(newMode);
}

export function cycleTheme() {
	const order: ThemeMode[] = ['light', 'dark', 'system'];
	const currentIndex = order.indexOf(mode);
	const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % order.length;
	setTheme(order[nextIndex]);
}

export function initTheme() {
	applyTheme(mode);

	if (browser) {
		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		mql.addEventListener('change', () => {
			if (mode === 'system') {
				applyTheme('system');
			}
		});
	}
}

# ADHD Reader

A minimalistic, focused reading tool that displays text **one word at a time** (or N words) at an adjustable speed. Designed to help people with ADHD — and anyone who wants to improve concentration while reading.

## How It Works

1. Paste or type any text into the input area.
2. Press **Play** (or hit `Space`).
3. Words appear one at a time in a large, centered display.
4. Adjust speed (WPM), words per step, pause, skip, or go fullscreen.

## Features

- **Word-by-word display** — large, centered text that keeps your focus on one chunk at a time
- **Adjustable speed** — 50 to 600 words per minute via a slider
- **Words per step** — show 1, 2, 3, 4, or 5 words at a time
- **Player controls** — play, pause, reset, skip forward/backward
- **Progress bar** — clickable/seekable reading progress indicator
- **Fullscreen mode** — distraction-free reading via the Fullscreen API
- **Dark & Light themes** — toggle between light, dark, and system preference
- **Keyboard shortcuts** — `Space` play/pause, `←` `→` skip, `R` reset
- **Internationalization** — English, Ukrainian, and Montenegrin (Latin, Ijekavian) via Paraglide
- **Static site** — deploys anywhere as a fully static SPA (GitHub Pages, Netlify, Vercel, etc.)

## Tech Stack

| Layer     | Technology                                                             |
| --------- | ---------------------------------------------------------------------- |
| Framework | [SvelteKit](https://svelte.dev/) (Svelte 5)                            |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com/)                            |
| i18n      | [Paraglide JS](https://inlang.com/m/gerre34r/paraglide-js)             |
| Build     | [Vite](https://vite.dev/)                                              |
| Adapter   | [@sveltejs/adapter-static](https://svelte.dev/docs/kit/adapter-static) |
| Linting   | ESLint + Prettier                                                      |
| Language  | TypeScript                                                             |

## Project Structure

```
src/
├── lib/
│   ├── assets/          # favicon SVG
│   ├── components/
│   │   ├── PlayerControls.svelte   # play/pause, speed, word count, skip
│   │   ├── ProgressBar.svelte      # clickable reading progress
│   │   ├── TextInputArea.svelte    # text input with word count
│   │   ├── ThemeToggle.svelte      # light/dark/system toggle
│   │   ├── WordDisplay.svelte      # large centered word + fullscreen
│   │   └── WordPlayer.svelte       # orchestrates playback logic
│   ├── paraglide/       # auto-generated i18n runtime
│   └── stores/
│       └── theme.svelte.ts         # theme state & persistence
├── routes/
│   ├── +layout.svelte   # root layout, theme init
│   ├── +page.svelte     # main page
│   └── layout.css       # global styles, CSS variables, dark mode
└── messages/
    ├── en.json           # English
    ├── uk.json           # Ukrainian
    └── sr.json           # Montenegrin (Latin)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20 or [Bun](https://bun.sh/)

### Install & Run

```sh
# Install dependencies
bun install

# Start dev server
bun run dev

# Open in browser
bun run dev -- --open
```

### Build

```sh
# Production build (static output)
bun run build

# Preview the build locally
bun run preview
```

### Lint & Format

```sh
bun run lint
bun run format
```

## License

MIT

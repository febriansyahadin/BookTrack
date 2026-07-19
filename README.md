# BookTrack

A small "reading ledger" web app: browse popular books, search the catalog,
and keep a personal shelf of favorites — saved locally in your browser.

Built with **Next.js (App Router)** + **Tailwind CSS**, using the free
[Open Library API](https://openlibrary.org/developers/api) for book data
(no API key required).

## Features

- **Home / Stacks** — popular books by subject (Fiction, Sci-Fi, Nonfiction,
  Biography), pulled live from Open Library.
- **Search** — search the full Open Library catalog by title, author, or
  keyword.
- **Book detail page** — cover, description, and subject tags for each title.
- **Favorites ("My Shelf")** — click the heart on any book to save it to
  `localStorage`; persists across reloads, no backend needed.
- **Responsive layout** — 2 columns on mobile up to 5 columns on large
  desktop screens.
- **Dark mode** — toggle in the navbar, respects system preference on first
  visit, remembers your choice.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.js          root layout, fonts, theme init script
  page.js             home page (popular books + search)
  book/[id]/page.js   book detail page
  favorites/page.js   "My Shelf" favorites page
components/
  Navbar.js, SearchBar.js, BookCard.js, BookGrid.js, ThemeToggle.js
hooks/
  useFavorites.js     localStorage-backed favorites hook
lib/
  api.js              Open Library fetch helpers
```

## Design notes

The visual language borrows from library card catalogs: index-card style
book tiles with a small "tab" notch, call-number style labels, and a
due-date "stamp" for publish years. Typeface pairing is Fraunces (display
serif) + Inter (body) + IBM Plex Mono (labels/metadata), on a warm
parchment palette in light mode and a deep ink/navy palette in dark mode.

## Notes / possible next steps

- Open Library's data is community-sourced, so a small number of titles
  may be missing covers or descriptions — the UI falls back gracefully.
- Favorites are stored per-browser (`localStorage`), not synced across
  devices; swapping in a backend (e.g. Supabase) would be a natural next
  step if accounts are needed.

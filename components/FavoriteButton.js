"use client";

import { useFavorites } from "@/hooks/useFavorites";

export default function FavoriteButton({ book }) {
  const { isFavorite, toggleFavorite, ready } = useFavorites();
  const favorited = ready && isFavorite(book.id);

  return (
    <button
      onClick={() => toggleFavorite(book)}
      aria-pressed={favorited}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-sm border transition-colors ${
        favorited
          ? "bg-gold dark:bg-gold-light border-gold dark:border-gold-light text-ink dark:text-night-bg"
          : "border-ink/20 dark:border-night-text/20 text-ink dark:text-night-text hover:border-gold dark:hover:border-gold-light"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 21s-6.716-4.35-9.428-8.06C.89 10.36 1.2 6.9 4.05 5.2 6.36 3.83 9.2 4.6 12 7.2c2.8-2.6 5.64-3.37 7.95-2 2.85 1.7 3.16 5.16 1.48 7.74C18.716 16.65 12 21 12 21z" />
      </svg>
      {favorited ? "Di favorit Anda" : "Tambahkan ke favorit"}
    </button>
  );
}

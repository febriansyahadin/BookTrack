"use client";

import BookGrid from "@/components/BookGrid";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, ready } = useFavorites();

  return (
    <div className="space-y-6">
      <section className="space-y-2 pt-2">
        <span className="call-number">Reserved · Personal Collection</span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-night-text">
          Favorites
        </h1>
        <p className="text-ink/60 dark:text-night-text/60 max-w-xl">
          Saved locally in your browser — nothing leaves your device.
        </p>
      </section>

      {!ready ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] rounded-sm bg-ink/5 dark:bg-night-surface animate-pulse"
            />
          ))}
        </div>
      ) : (
        <BookGrid
          books={favorites}
          emptyLabel="Your shelf is empty. Tap the ♡ on any book to file it here."
        />
      )}
    </div>
  );
}

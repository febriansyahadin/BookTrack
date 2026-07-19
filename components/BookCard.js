"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

export default function BookCard({ book }) {
  const { isFavorite, toggleFavorite, ready } = useFavorites();
  const favorited = ready && isFavorite(book.id);

  return (
    <div className="catalog-card rounded-sm p-3 pt-5 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/book/${book.id}`} className="block">
        <div className="aspect-[2/3] w-full bg-ink/5 dark:bg-night-bg/60 rounded-sm overflow-hidden mb-3 flex items-center justify-center">
          {book.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="font-display italic text-sm text-ink/40 dark:text-night-text/40 text-center px-3">
              {book.title}
            </span>
          )}
        </div>
      </Link>

      <div className="flex-1 flex flex-col">
        <Link href={`/book/${book.id}`}>
          <h3 className="font-display font-semibold leading-snug text-ink dark:text-night-text line-clamp-2 hover:text-gold dark:hover:text-gold-light transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-ink/60 dark:text-night-text/60 mt-1 line-clamp-1">
          {book.author}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          {book.firstPublishYear ? (
            <span className="stamp text-ink/50 dark:text-night-text/50">
              {book.firstPublishYear}
            </span>
          ) : (
            <span />
          )}
          <button
            onClick={() => toggleFavorite(book)}
            aria-pressed={favorited}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ink/5 dark:hover:bg-night-text/10 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={favorited ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.8"
              className={favorited ? "text-gold dark:text-gold-light" : "text-ink/40 dark:text-night-text/40"}
            >
              <path d="M12 21s-6.716-4.35-9.428-8.06C.89 10.36 1.2 6.9 4.05 5.2 6.36 3.83 9.2 4.6 12 7.2c2.8-2.6 5.64-3.37 7.95-2 2.85 1.7 3.16 5.16 1.48 7.74C18.716 16.65 12 21 12 21z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import BookGrid from "@/components/BookGrid";
import { getPopularBooks, searchBooks } from "@/lib/api";

const SUBJECTS = [
  { key: "fiction", label: "Fiksi" },
  { key: "science_fiction", label: "Fiksi Ilmiah" },
  { key: "nonfiction", label: "Non-Fiksi" },
  { key: "biography", label: "Biografi" },
];

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState("fiction");
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    if (searchTerm) return; // search effect handles this case
    let cancelled = false;
    setLoading(true);
    setError(null);
    getPopularBooks(subject)
      .then((data) => !cancelled && setBooks(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [subject, searchTerm]);

  useEffect(() => {
    if (!searchTerm) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    searchBooks(searchTerm)
      .then((data) => !cancelled && setBooks(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <section className="space-y-2 pt-2">
        <span className="call-number">Ruang Baca · Rak Terbuka</span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-night-text">
          Temukan buku bacaan Anda selanjutnya.
        </h1>
        <p className="text-ink/60 dark:text-night-text/60 max-w-xl">
          Jelajahi buku populer, cari di katalog yang lebih luas, dan simpan
          buku favorit ke rak Anda.
        </p>
      </section>

      <SearchBar
        onSearch={setSearchTerm}
        onClear={() => setSearchTerm(null)}
        defaultValue={searchTerm || ""}
      />

      {!searchTerm && (
        <div className="flex flex-wrap gap-2 -mt-2">
          {SUBJECTS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSubject(s.key)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded-sm border transition-colors ${
                subject === s.key
                  ? "bg-ink dark:bg-gold-light text-parchment dark:text-night-bg border-ink dark:border-gold-light"
                  : "border-ink/20 dark:border-night-text/20 text-ink/60 dark:text-night-text/60 hover:border-ink/40 dark:hover:border-night-text/40"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-ink dark:text-night-text">
            {searchTerm ? `Hasil pencarian untuk "${searchTerm}"` : "Populer saat ini"}
          </h2>
          {!loading && !error && (
            <span className="font-mono text-xs text-ink/40 dark:text-night-text/40">
              {books.length} judul
            </span>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] rounded-sm bg-ink/5 dark:bg-night-surface animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="border border-dashed border-red-400/40 rounded-sm py-12 text-center text-sm text-red-500">
            Tidak dapat menghubungi katalog ({error}). Coba lagi nanti.
          </div>
        )}

        {!loading && !error && (
          <BookGrid
            books={books}
            emptyLabel={
              searchTerm
                ? "Tidak ada buku yang cocok. Coba judul atau penulis lain."
                : "Tidak ada buku yang tersedia saat ini."
            }
          />
        )}
      </section>
    </div>
  );
}

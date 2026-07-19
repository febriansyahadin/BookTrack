"use client";

import { useState } from "react";

export default function SearchBar({ onSearch, onClear, defaultValue = "" }) {
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  function handleClear() {
    setValue("");
    onClear?.();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2" role="search">
      <div className="relative flex-1">
        <span className="call-number absolute -top-4 left-1">Cari di katalog</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Judul, penulis, atau kata kunci…"
          aria-label="Cari buku"
          className="w-full bg-parchment-card dark:bg-night-surface border border-ink/20 dark:border-night-text/20 rounded-sm px-4 py-2.5 text-sm text-ink dark:text-night-text placeholder:text-ink/40 dark:placeholder:text-night-text/40 focus:border-gold dark:focus:border-gold-light outline-none transition-colors"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2.5 text-sm font-medium bg-ink dark:bg-gold-light text-parchment dark:text-night-bg rounded-sm hover:bg-ink/90 dark:hover:bg-gold transition-colors"
      >
        Cari
      </button>
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="px-3 py-2.5 text-sm text-ink/60 dark:text-night-text/60 hover:text-ink dark:hover:text-night-text transition-colors"
        >
          Hapus
        </button>
      )}
    </form>
  );
}

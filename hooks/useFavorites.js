"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "booktrack_favorites";

function readFavorites() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setReady(true);
  }, []);

  // Keep multiple tabs/components in sync.
  useEffect(() => {
    function onStorage(e) {
      if (e.key === STORAGE_KEY) setFavorites(readFavorites());
    }
    function onLocalSync() {
      setFavorites(readFavorites());
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("local-storage-sync", onLocalSync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("local-storage-sync", onLocalSync);
    };
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((b) => b.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (book) => {
      const current = readFavorites();
      const exists = current.some((b) => b.id === book.id);
      const next = exists
        ? current.filter((b) => b.id !== book.id)
        : [...current, book];
      
      setFavorites(next);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("local-storage-sync"));
    },
    []
  );

  return { favorites, ready, isFavorite, toggleFavorite };
}

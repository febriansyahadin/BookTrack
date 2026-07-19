"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href) =>
    `text-sm tracking-wide transition-colors ${pathname === href
      ? "text-gold dark:text-gold-light"
      : "text-ink/70 dark:text-night-text/70 hover:text-ink dark:hover:text-night-text"
    }`;

  return (
    <header className="border-b border-ink/10 dark:border-night-text/10 sticky top-0 z-20 bg-parchment/90 dark:bg-night-bg/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-display italic text-xl font-semibold text-ink dark:text-night-text">
            BookTrack
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className={linkClass("/")}>
            Explore
          </Link>
          <Link href="/favorites" className={linkClass("/favorites")}>
            Favorites
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

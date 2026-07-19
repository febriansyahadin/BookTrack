import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "BookTrack — Catatan bacaan Anda",
  description:
    "Jelajahi buku populer, cari di katalog, dan simpan buku favorit — langsung di browser Anda.",
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('booktrack_theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-body min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
        <footer className="border-t border-ink/10 dark:border-night-text/10 py-6 mt-12">
          <p className="max-w-6xl mx-auto px-4 sm:px-6 font-mono text-[11px] tracking-widest uppercase text-ink/50 dark:text-night-text/50">
            BookTrack — data dari Open Library
          </p>
        </footer>
      </body>
    </html>
  );
}

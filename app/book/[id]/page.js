import Link from "next/link";
import { getBookDetail } from "@/lib/api";
import FavoriteButton from "@/components/FavoriteButton";

export default async function BookDetailPage({ params }) {
  const { id } = params;
  let book = null;
  let error = null;

  try {
    book = await getBookDetail(id);
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-block text-sm text-ink/60 dark:text-night-text/60 hover:text-ink dark:hover:text-night-text transition-colors"
      >
        ← Kembali ke daftar buku
      </Link>

      {error && (
        <div className="border border-dashed border-red-400/40 rounded-sm py-12 text-center text-sm text-red-500">
          Tidak dapat menemukan judul tersebut ({error}).{" "}
          <Link href="/" className="underline">
            Kembali ke beranda
          </Link>
        </div>
      )}

      {!error && book && (
        <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-8">
          <div className="catalog-card rounded-sm p-3 pt-5 max-w-[220px]">
            <div className="aspect-[2/3] w-full bg-ink/5 dark:bg-night-bg/60 rounded-sm overflow-hidden flex items-center justify-center">
              {book.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-display italic text-sm text-ink/40 dark:text-night-text/40 text-center px-3">
                  {book.title}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="call-number">ID Karya · {book.id}</span>
              <h1 className="font-display text-3xl font-semibold text-ink dark:text-night-text mt-1">
                {book.title}
              </h1>
            </div>

            <FavoriteButton book={book} />

            <p className="text-ink/80 dark:text-night-text/80 leading-relaxed whitespace-pre-line">
              {book.description}
            </p>

            {book.subjects?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {book.subjects.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] uppercase tracking-wide px-2 py-1 rounded-sm bg-ink/5 dark:bg-night-surface text-ink/60 dark:text-night-text/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

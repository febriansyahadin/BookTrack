export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="text-sm text-ink/60 dark:text-night-text/60">
        ← Kembali ke daftar buku
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-8">
        <div className="aspect-[2/3] w-full max-w-[220px] rounded-sm bg-ink/5 dark:bg-night-surface animate-pulse" />
        <div className="space-y-3">
          <div className="h-8 w-2/3 bg-ink/5 dark:bg-night-surface rounded-sm animate-pulse" />
          <div className="h-4 w-1/3 bg-ink/5 dark:bg-night-surface rounded-sm animate-pulse" />
          <div className="h-24 w-full bg-ink/5 dark:bg-night-surface rounded-sm animate-pulse" />
        </div>
      </div>
    </div>
  );
}

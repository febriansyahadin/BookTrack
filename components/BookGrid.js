import BookCard from "./BookCard";

export default function BookGrid({ books, emptyLabel = "No books found." }) {
  if (!books || books.length === 0) {
    return (
      <div className="border border-dashed border-ink/20 dark:border-night-text/20 rounded-sm py-16 text-center">
        <p className="font-display italic text-lg text-ink/60 dark:text-night-text/60">
          {emptyLabel}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

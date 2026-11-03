import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {book.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.image}
          alt={book.title}
          className="h-64 w-full object-cover"
        />
      ) : (
        <div className="flex h-64 w-full items-center justify-center bg-gray-100 text-gray-400">
          No image
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600">by {book.author}</p>
        <span className="mt-3 w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          {book.category}
        </span>

        <Link
          href={`/books/${book._id}`}
          className="mt-auto rounded-md bg-indigo-600 px-4 py-2 pt-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
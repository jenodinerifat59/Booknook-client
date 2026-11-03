
import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-700/30 hover:shadow-xl hover:shadow-emerald-950/10 dark:border-gray-700 dark:bg-[#171D1B]">

      {/* Book Cover */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-[#202925]">
        {book.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <div className="text-center">
              <span className="text-5xl">📚</span>
              <p className="mt-2 text-sm">No image available</p>
            </div>
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-[#18392D] transition-colors duration-300 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
          {book.title}
        </h3>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          by {book.author}
        </p>

        {/* Category */}
        <span className="mt-4 w-fit rounded-full border border-emerald-700/20 bg-emerald-700/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
          {book.category}
        </span>

        {/* View Details Button */}
        <Link
          href={`/books/${book._id}`}
          className="group/btn mt-auto mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#234C3D] px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-emerald-900/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#19392D] hover:shadow-lg active:scale-95"
        >
          View Details
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

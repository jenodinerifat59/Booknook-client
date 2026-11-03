
import Link from "next/link";
import BookCard from "@/app/component/BookCard";
import NewArrivalsClient from "./NewArrivalsClient";

async function getLatestBooks() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/latest`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function NewArrivals() {
  const books = await getLatestBooks();

  return (
    <NewArrivalsClient>
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-lime-500/10 blur-3xl" />

        {/* Section Heading */}
        <div className="relative z-10 animate-[fadeInUp_0.7s_ease_both]">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Fresh Collection
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#18392D] dark:text-white sm:text-4xl">
            New{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Arrivals
            </span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
            Explore the latest additions to our library and discover your
            next favorite book.
          </p>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="mt-12 animate-[fadeInUp_0.7s_ease_both] rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
            <div className="animate-bounce text-5xl">📚</div>

            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
              No books found yet
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              New books will appear here when readers add them.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.slice(3).map((book, index) => (
              <div
                key={book._id}
                className="animate-[fadeInUp_0.7s_ease_both] transition-all duration-300 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}

        {/* See All Books Button */}
        <div className="mt-12 text-center animate-[fadeInUp_0.8s_ease_both]">
          <Link
            href="/books"
            className="group inline-flex items-center gap-3 rounded-full bg-[#234C3D] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#234C3D]/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#19392D] hover:shadow-xl active:scale-95"
          >
            See All Books

            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </section>
    </NewArrivalsClient>
  );
}


"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const BooksPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = searchParams.get("category") || "All";
  const searchText = searchParams.get("search") || "";

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://booknook-server-5hv3.onrender.com/books",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Books fetch error:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(books.map((book) => book.category).filter(Boolean)),
  ];

  // Search and category filtering
  const filteredBooks = books.filter((book) => {
    const matchCategory =
      selectedCategory === "All" ||
      book.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchSearch = book.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return matchCategory && matchSearch;
  });

  // Update URL
  const updateFilters = (category, search) => {
    const params = new URLSearchParams();

    if (category && category !== "All") {
      params.set("category", category);
    }

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const query = params.toString();

    router.push(query ? `/books?${query}` : "/books", {
      scroll: false,
    });
  };

  return (
    <main className="min-h-screen bg-[#F8F6F0] px-4 py-12 dark:bg-[#0D1110]">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            Welcome to BookNook
          </span>

          <h1 className="mt-5 text-4xl font-extrabold text-[#234C3D] dark:text-white sm:text-5xl">
            Explore Our <span className="text-emerald-600">Books</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-400">
            Discover your next favorite book from our collection.
            Search by title or explore different categories.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mb-7 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search book by title..."
              value={searchText}
              onChange={(e) =>
                updateFilters(selectedCategory, e.target.value)
              }
              className="w-full rounded-full border border-gray-200 bg-white px-6 py-4 pr-12 text-gray-800 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-gray-700 dark:bg-[#171D1B] dark:text-white"
            />

            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
              🔍
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => updateFilters(category, searchText)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 ${
                selectedCategory === category
                  ? "bg-[#234C3D] text-white shadow-lg"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-emerald-600 hover:text-emerald-700 dark:border-gray-700 dark:bg-[#171D1B] dark:text-gray-300 dark:hover:text-emerald-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </div>

        {/* Loading / Empty / Books */}
        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-emerald-700" />
          </div>
        ) : filteredBooks.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-[#171D1B]">
            <div className="text-5xl">📚</div>

            <h2 className="mt-5 text-2xl font-bold text-gray-800 dark:text-white">
              No Books Found
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Try another book title or category.
            </p>

            <button
              onClick={() => updateFilters("All", "")}
              className="mt-6 rounded-full bg-[#234C3D] px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Books Grid */
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((book, index) => (
              <div
                key={book._id}
                style={{ animationDelay: `${index * 80}ms` }}
                className="group mx-auto w-full max-w-sm animate-[fadeInUp_0.6s_ease_both] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700 dark:bg-[#171D1B]"
              >
                {/* Cover Image */}
                <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title || "Book cover"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl">
                      📖
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#234C3D] shadow-sm backdrop-blur">
                    {book.category}
                  </span>
                </div>

                {/* Book Information */}
                <div className="p-5 text-center">
                  <h2 className="line-clamp-1 text-xl font-bold text-[#234C3D] transition-colors group-hover:text-emerald-600 dark:text-white">
                    {book.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    By {book.author}
                  </p>

                  <div className="my-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>📚</span>
                    <span>
                      {book.availableCopies ?? 0} copies available
                    </span>
                  </div>

                  <Link
                    href={`/books/${book._id}`}
                    className="block rounded-full bg-[#234C3D] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Animation */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
};

// Suspense boundary for useSearchParams
const BooksPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F8F6F0] dark:bg-[#0D1110]">
          <span className="loading loading-spinner loading-lg text-emerald-700" />
        </div>
      }
    >
      <BooksPageContent />
    </Suspense>
  );
};

export default BooksPage;


import Link from "next/link";

const BooksPage = async () => {
  const res = await fetch("http://localhost:5000/books", {
    cache: "no-store",
  });

  const books = await res.json();

  return (
    <div className="min-h-screen bg-[#F8F6F0] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-bold text-[#234C3D]">
          All Books
        </h1>

        <p className="mb-8 text-gray-600">
          Explore our collection of books.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="mb-2 text-xl font-bold text-[#234C3D]">
                  {book.title}
                </h2>

                <p className="text-gray-600">
                  Author: {book.author}
                </p>

                <p className="mb-4 text-gray-600">
                  Category: {book.category}
                </p>

                <Link
                  href={`/books/${book._id}`}
                  className="block rounded-lg bg-[#234C3D] px-4 py-3 text-center text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;

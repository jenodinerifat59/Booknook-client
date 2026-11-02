
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const MyBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: Better Auth থেকে logged-in user-এর email নেবে
  const userEmail = "user@email.com";

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/books?email=${userEmail}`
        );

        const data = await res.json();

        setBooks(data);
      } catch (error) {
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [userEmail]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/books/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setBooks((prev) =>
          prev.filter((book) => book._id !== id)
        );

        toast.success("Book deleted successfully!");
      } else {
        toast.error("Failed to delete book");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-bold text-[#234C3D]">
          My Books
        </h1>

        <p className="mb-8 text-gray-600">
          Manage the books you added to BookNook.
        </p>

        {books.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center">
            <h2 className="text-xl font-semibold">
              No books found
            </h2>

            <p className="mt-2 text-gray-600">
              You haven't added any books yet.
            </p>

            <Link
              href="/add-book"
              className="mt-5 inline-block rounded-lg bg-[#234C3D] px-6 py-3 text-white"
            >
              Add a Book
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[700px]">
              <thead className="bg-[#234C3D] text-white">
                <tr>
                  <th className="p-4 text-left">Book</th>
                  <th className="p-4 text-left">Author</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Copies</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="border-b border-gray-200"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="h-16 w-12 rounded object-cover"
                        />

                        <span className="font-semibold">
                          {book.title}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">{book.author}</td>

                    <td className="p-4">{book.category}</td>

                    <td className="p-4">
                      {book.availableCopies}/{book.totalCopies}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/my-books/${book._id}`}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(book._id)}
                          className="rounded-lg bg-red-600 px-4 py-2 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;

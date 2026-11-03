
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

const MyBooksPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const userEmail = session?.user?.email?.trim().toLowerCase();

  // Fetch books using logged-in user's email
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setBooks([]);
      setLoading(false);
      return;
    }

    const fetchMyBooks = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://booknook-server-5hv3.onrender.com/books/user/${encodeURIComponent(
            userEmail
          )}`,
          {
            cache: 'no-store',
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await res.json();

        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setBooks([]);
        toast.error('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [userEmail, isPending]);

  // Delete Book
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      const res = await fetch(
  `https://booknook-server-5hv3.onrender.com/books/${id}`,
  {
    method: 'DELETE',
  }

      );

      if (!res.ok) {
        throw new Error('Failed to delete book');
      }

      setBooks((prev) => prev.filter((book) => book._id !== id));

      toast.success('Book deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete book');
    } finally {
      setDeletingId(null);
    }
  };

  // Loading State
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F8F6F0] dark:bg-[#0D1110]">
        <span className="loading loading-spinner loading-lg text-emerald-700 dark:text-emerald-400" />

        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Loading your books...
        </p>
      </div>
    );
  }

  // Login Check
  if (!session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F8F6F0] px-4 dark:bg-[#0D1110]">
        <h2 className="text-2xl font-bold text-[#18392D] dark:text-white">
          Please Login First
        </h2>

        <p className="text-gray-500 dark:text-gray-400">
          Login to see your books.
        </p>

        <Link
          href="/login"
          className="rounded-xl bg-[#234C3D] px-6 py-3 font-semibold text-white"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F8F6F0] px-4 py-12 transition-colors duration-500 dark:bg-[#0D1110] sm:px-6 lg:px-8">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-72 w-72 rounded-full bg-lime-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Personal Library
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#18392D] dark:text-white sm:text-4xl">
              My{' '}
              <span className="text-emerald-600 dark:text-emerald-400">
                Books
              </span>
            </h1>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              Manage and organize all the books you have added to BookNook.
            </p>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Logged in as: {userEmail}
            </p>
          </div>

          <Link
            href="/add-book"
            className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#234C3D] px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#19392D] hover:shadow-xl sm:self-center"
          >
            <span className="text-xl">+</span>
            Add New Book
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total Books */}
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-[#171D1B]/90">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Books
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#234C3D] dark:text-emerald-400">
              {books.length}
            </h2>
          </div>

          {/* Total Copies */}
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-[#171D1B]/90">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Copies
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#234C3D] dark:text-emerald-400">
              {books.reduce(
                (total, book) =>
                  total + (Number(book.totalCopies) || 0),
                0
              )}
            </h2>
          </div>

          {/* Available Copies */}
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-[#171D1B]/90">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Available Copies
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#234C3D] dark:text-emerald-400">
              {books.reduce(
                (total, book) =>
                  total + (Number(book.availableCopies) || 0),
                0
              )}
            </h2>
          </div>
        </div>

        {/* Empty State */}
        {books.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white/80 px-6 py-16 text-center shadow-sm dark:border-gray-700 dark:bg-[#171D1B]/90">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-700/10 text-5xl">
              📚
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              Your Library is Empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
              You haven't added any books yet. Start building your personal
              collection by adding your first book.
            </p>

            <Link
              href="/add-book"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#234C3D] px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#19392D]"
            >
              + Add Your First Book
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#171D1B] md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left">
                  <thead className="bg-[#234C3D] text-white">
                    <tr>
                      <th className="px-6 py-5 text-sm font-semibold">
                        Book
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold">
                        Author
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold">
                        Category
                      </th>

                      <th className="px-6 py-5 text-sm font-semibold">
                        Copies
                      </th>

                      <th className="px-6 py-5 text-center text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {books.map((book) => (
                      <tr
                        key={book._id}
                        className="border-b border-gray-100 transition-colors duration-200 hover:bg-emerald-50/50 last:border-0 dark:border-gray-700 dark:hover:bg-[#202925]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                              {book.coverImage ? (
                                <Image
                                  src={book.coverImage}
                                  alt={book.title || 'Book cover'}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xl">
                                  📖
                                </div>
                              )}
                            </div>

                            <span className="font-bold text-gray-800 dark:text-gray-100">
                              {book.title}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {book.author}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-700/10 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                            {book.category}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {book.availableCopies}/{book.totalCopies}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <Link
                              href={`/my-books/${book._id}`}
                              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(book._id)}
                              disabled={deletingId === book._id}
                              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === book._id
                                ? 'Deleting...'
                                : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Book Cards */}
            <div className="grid gap-5 md:hidden">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-[#171D1B]"
                >
                  <div className="flex gap-4">
                    <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                      {book.coverImage ? (
                        <Image
                          src={book.coverImage}
                          alt={book.title || 'Book cover'}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-3xl">
                          📖
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-bold text-gray-900 dark:text-white">
                        {book.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        By {book.author}
                      </p>

                      <span className="mt-3 inline-block rounded-full bg-emerald-700/10 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                        {book.category}
                      </span>

                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Available: {book.availableCopies}/{book.totalCopies} copies
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4 dark:border-gray-700">
                    <Link
                      href={`/my-books/${book._id}`}
                      className="flex-1 rounded-lg bg-blue-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(book._id)}
                      disabled={deletingId === book._id}
                      className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                      {deletingId === book._id
                        ? 'Deleting...'
                        : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MyBooksPage;

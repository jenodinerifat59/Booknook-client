
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Image from 'next/image';

const API_URL = 'https://booknook-server-5hv3.onrender.com';

const MyBorrowsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const userEmail = session?.user?.email;

  // Format date without timezone shifting
  const formatDate = (date) => {
    if (!date) return 'N/A';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return 'N/A';

    return parsedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Fetch borrow and view history
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setBorrows([]);
      setLoading(false);
      return;
    }

    const fetchBorrows = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/borrows/user/${encodeURIComponent(userEmail)}`,
          { cache: 'no-store' }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await res.json();

        // Keep viewed history for 24 hours
        const activeBorrows = data.filter((item) => {
          if (item.status === 'viewed') {
            const viewedTime = new Date(item.createdAt).getTime();

            return (
              !Number.isNaN(viewedTime) &&
              Date.now() - viewedTime < 24 * 60 * 60 * 1000
            );
          }

          return ['borrowed', 'returned'].includes(item.status);
        });

        setBorrows(activeBorrows);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load history');
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [userEmail, isPending]);

  // Return Book
  const handleReturn = async (id) => {
    try {
      setReturningId(id);

      const res = await fetch(`${API_URL}/borrows/${id}/return`, {
        method: 'PATCH',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to return book');
      }

      setBorrows((previous) =>
        previous.map((borrow) =>
          borrow._id === id
            ? {
                ...borrow,
                status: 'returned',
                returnedAt: data.returnedAt || new Date().toISOString(),
              }
            : borrow
        )
      );

      toast.success('Book returned successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setReturningId(null);
    }
  };

  // Delete individual returned or viewed record
  const handleDelete = async (id) => {
    try {
      setDeletingId(id);

      const res = await fetch(`${API_URL}/borrows/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete record');
      }

      setBorrows((previous) =>
        previous.filter((borrow) => borrow._id !== id)
      );

      toast.success('Record deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to delete record');
    } finally {
      setDeletingId(null);
    }
  };

  // Summary
  const currentlyBorrowed = borrows.filter(
    (item) => item.status === 'borrowed'
  ).length;

  const returnedBooks = borrows.filter(
    (item) => item.status === 'returned'
  ).length;

  const viewedBooks = borrows.filter(
    (item) => item.status === 'viewed'
  ).length;

  // Loading
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f5ed] dark:bg-[#101b16]">
        <span className="loading loading-spinner loading-lg text-emerald-700" />
      </div>
    );
  }

  // Login Check
  if (!session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f7f5ed] px-4 dark:bg-[#101b16]">
        <h2 className="text-2xl font-bold text-[#193c2b] dark:text-white">
          Please Login First
        </h2>

        <p className="text-gray-500 dark:text-gray-400">
          Login to see your borrowed books.
        </p>

        <Link
          href="/login"
          className="rounded-xl bg-[#245c3b] px-6 py-3 font-semibold text-white"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5ed] px-4 py-12 text-[#193c2b] dark:bg-[#101b16] dark:text-gray-100 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-emerald-700 dark:text-emerald-400">
            Your Library
          </p>

          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Your Borrowed Collection
          </h1>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Manage your borrowed books and keep track of your reading journey.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            title="Currently Borrowed"
            value={currentlyBorrowed}
            color="text-amber-600 dark:text-amber-400"
          />

          <SummaryCard
            title="Returned Books"
            value={returnedBooks}
            color="text-emerald-600 dark:text-emerald-400"
          />

          <SummaryCard
            title="Viewed Books (24 Hours)"
            value={viewedBooks}
            color="text-blue-600 dark:text-blue-400"
          />
        </div>

        {/* Empty State */}
        {borrows.length === 0 ? (
          <div className="rounded-2xl border border-[#e7e5d9] bg-white px-5 py-20 text-center shadow-sm dark:border-[#294536] dark:bg-[#192b21]">
            <div className="mb-5 text-5xl">📚</div>

            <h2 className="text-2xl font-bold">
              No Borrowed Books Found
            </h2>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              You haven't borrowed or viewed any books yet.
            </p>

            <Link
              href="/books"
              className="mt-7 inline-block rounded-xl bg-[#245c3b] px-6 py-3 font-semibold text-white transition hover:bg-[#17452b]"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table - Large Screens Only */}
            <div className="hidden overflow-hidden rounded-2xl border border-[#e7e5d9] bg-white shadow-sm dark:border-[#294536] dark:bg-[#192b21] lg:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="bg-[#edf2e9] text-sm dark:bg-[#22392b]">
                    <tr>
                      <th className="px-6 py-5">Book Details</th>
                      <th className="px-6 py-5">Borrow Date</th>
                      <th className="px-6 py-5">Return Date</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-6 py-5">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {borrows.map((borrow) => {
                      const image =
                        borrow.book?.coverImage || borrow.bookImage;

                      const title =
                        borrow.book?.title ||
                        borrow.bookTitle ||
                        'Book not available';

                      return (
                        <tr
                          key={borrow._id}
                          className="border-t border-[#eeeade] transition hover:bg-[#f8faf5] dark:border-[#294536] dark:hover:bg-[#203529]"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              {image ? (
                                <Image
                                  width={70}
                                  height={85}
                                  src={image}
                                  alt={title}
                                  className="h-20 w-14 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="flex h-20 w-14 items-center justify-center rounded-lg bg-gray-100 text-xs dark:bg-gray-700">
                                  📖
                                </div>
                              )}

                              <span className="font-bold">{title}</span>
                            </div>
                          </td>

                          <td className="px-6 py-5 text-sm">
                            {borrow.status === 'viewed'
                              ? formatDate(borrow.createdAt)
                              : formatDate(
                                  borrow.borrowDate || borrow.createdAt
                                )}
                          </td>

                          <td className="px-6 py-5 text-sm">
                            {borrow.status === 'viewed'
                              ? 'N/A'
                              : formatDate(borrow.returnDate)}
                          </td>

                          <td className="px-6 py-5">
                            <StatusBadge status={borrow.status} />
                          </td>

                          <td className="px-6 py-5">
                            {borrow.status === 'borrowed' ? (
                              <button
                                onClick={() => handleReturn(borrow._id)}
                                disabled={returningId === borrow._id}
                                className="whitespace-nowrap rounded-lg bg-[#245c3b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#17452b] disabled:opacity-50"
                              >
                                {returningId === borrow._id
                                  ? 'Returning...'
                                  : 'Return Book'}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDelete(borrow._id)}
                                disabled={deletingId === borrow._id}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                              >
                                {deletingId === borrow._id
                                  ? 'Deleting...'
                                  : 'Delete'}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile & Tablet Cards */}
            <div className="grid gap-5 lg:hidden">
              {borrows.map((borrow) => {
                const image =
                  borrow.book?.coverImage || borrow.bookImage;

                const title =
                  borrow.book?.title ||
                  borrow.bookTitle ||
                  'Book not available';

                return (
                  <div
                    key={borrow._id}
                    className="rounded-2xl border border-[#e7e5d9] bg-white p-5 shadow-sm transition hover:shadow-md dark:border-[#294536] dark:bg-[#192b21]"
                  >
                    <div className="flex gap-4">
                      {image ? (
                        <Image
                          width={90}
                          height={120}
                          src={image}
                          alt={title}
                          className="h-32 w-24 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-32 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl dark:bg-gray-700">
                          📖
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h2 className="break-words text-base font-bold sm:text-lg">
                          {title}
                        </h2>

                        <div className="mt-3">
                          <StatusBadge status={borrow.status} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-[#f8f6f0] p-4 dark:bg-[#22392b]">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Borrow Date
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {borrow.status === 'viewed'
                            ? formatDate(borrow.createdAt)
                            : formatDate(
                                borrow.borrowDate || borrow.createdAt
                              )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Return Date
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {borrow.status === 'viewed'
                            ? 'N/A'
                            : formatDate(borrow.returnDate)}
                        </p>
                      </div>
                    </div>

                    {borrow.status === 'returned' && borrow.returnedAt && (
                      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        Actually returned on: {formatDate(borrow.returnedAt)}
                      </p>
                    )}

                    {borrow.status === 'borrowed' ? (
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        disabled={returningId === borrow._id}
                        className="mt-5 w-full rounded-xl bg-[#245c3b] py-3 font-semibold text-white transition hover:bg-[#17452b] disabled:opacity-50"
                      >
                        {returningId === borrow._id
                          ? 'Returning...'
                          : 'Return Book'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(borrow._id)}
                        disabled={deletingId === borrow._id}
                        className="mt-5 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                      >
                        {deletingId === borrow._id
                          ? 'Deleting...'
                          : 'Delete Record'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

// Summary Card
const SummaryCard = ({ title, value, color = '' }) => (
  <div className="rounded-2xl border border-[#e7e5d9] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-[#294536] dark:bg-[#192b21]">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {title}
    </p>

    <h2 className={`mt-3 text-4xl font-extrabold ${color}`}>
      {value}
    </h2>
  </div>
);

// Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    borrowed:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',

    returned:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',

    viewed:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
        styles[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  );
};

export default MyBorrowsPage;

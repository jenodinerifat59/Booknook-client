
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

const API_URL = "https://booknook-server-5hv3.onrender.com";

const getLocalDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
const BookDetailsPage = ({ book, user }) => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Set current date
  useEffect(() => {
    setBorrowDate(getLocalDate());
  }, []);

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6F0] px-4 dark:bg-[#0D1110]">
        <p className="text-lg font-semibold text-[#234C3D] dark:text-white">
          Book not found!
        </p>
      </div>
    );
  }

  const availableCopies = Number(book.availableCopies ?? 0);
  const totalCopies = Number(book.totalCopies ?? 0);

  const addedBy =
    typeof book.addedBy === "object"
      ? book.addedBy?.name || book.addedBy?.email
      : book.addedBy;

  // Borrow Book
  const handleBorrow = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first!");
      return;
    }

    if (!returnDate) {
      toast.error("Please select a return date!");
      return;
    }

    if (returnDate <= borrowDate) {
      toast.error("Return date must be after borrow date!");
      return;
    }

    if (availableCopies <= 0) {
      toast.error("This book is currently unavailable!");
      return;
    }

    try {
      setBorrowing(true);

      const res = await fetch(`${API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          bookTitle: book.title,
          bookImage: book.coverImage || "",
          borrowDate: new Date(`${borrowDate}T00:00:00`),
          returnDate: new Date(`${returnDate}T23:59:59`),
          status: "borrowed",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to borrow book");
      }

      toast.success("Book borrowed successfully!");

      setShowBorrowForm(false);
      setReturnDate("");

      router.refresh();
    } catch (error) {
      console.error("Borrow Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <main
      className={`relative isolate min-h-screen overflow-hidden px-4 py-10 transition-colors duration-500 sm:py-14 ${
        isDark ? "bg-[#0D1110]" : "bg-[#F8F6F0]"
      }`}
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute left-0 top-40 -z-10 h-72 w-72 rounded-full bg-[#234C3D]/10 blur-3xl" />

      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div
          className={`mb-6 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>All Books</span>
          <span className="mx-2">/</span>
          <span className={isDark ? "text-emerald-400" : "text-[#234C3D]"}>
            Book Details
          </span>
        </div>

        {/* Main Card */}
        <div
          className={`grid overflow-hidden rounded-3xl border shadow-xl transition-all duration-500 hover:shadow-2xl md:grid-cols-2 ${
            isDark
              ? "border-white/10 bg-[#171D1B] shadow-black/30"
              : "border-[#234C3D]/10 bg-white shadow-[#234C3D]/10"
          }`}
        >
          {/* Book Cover */}
          <div className="group relative flex items-center justify-center overflow-hidden p-6 sm:p-10 md:p-12">
            <div
              className={`absolute inset-0 ${
                isDark ? "bg-[#202925]" : "bg-[#F1F0E8]"
              }`}
            />

            <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl" />

            <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full bg-green-500/10 blur-2xl" />

            <div className="relative w-full max-w-sm">
              <div className="relative mx-auto aspect-[3/4] max-h-[480px] w-full overflow-hidden rounded-2xl bg-gray-200 shadow-2xl transition-transform duration-700 group-hover:scale-[1.03] group-hover:-rotate-1 dark:bg-gray-800">
                {book.coverImage ? (
                  <Image
                    src={book.coverImage}
                    alt={book.title || "Book cover"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl">
                    📖
                  </div>
                )}
              </div>

              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-[#234C3D]/20" />
            </div>
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center p-6 sm:p-10 md:p-12">
            {/* Category & Availability */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
                  isDark
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {book.category || "Uncategorized"}
              </span>

              <span
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                  availableCopies > 0
                    ? isDark
                      ? "bg-green-400/10 text-green-300"
                      : "bg-green-50 text-green-700"
                    : isDark
                      ? "bg-red-400/10 text-red-300"
                      : "bg-red-50 text-red-600"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    availableCopies > 0
                      ? "animate-pulse bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                {availableCopies > 0 ? "Available" : "Out of Stock"}
              </span>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  isDark
                    ? "bg-blue-400/10 text-blue-300"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                Book Details
              </span>
            </div>

            {/* Title */}
            <h1
              className={`mb-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${
                isDark ? "text-white" : "text-[#234C3D]"
              }`}
            >
              {book.title}
            </h1>

            {/* Author */}
            <p
              className={`mb-6 text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              By{" "}
              <span
                className={`font-semibold ${
                  isDark ? "text-emerald-300" : "text-[#234C3D]"
                }`}
              >
                {book.author?.trim() || "Unknown Author"}
              </span>
            </p>

            {/* Book Details Cards */}
            <div
              className={`mb-6 grid grid-cols-2 gap-4 rounded-2xl border p-4 sm:p-5 ${
                isDark
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-[#234C3D]/10 bg-[#F8F6F0]"
              }`}
            >
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Added By
                </p>

                <p
                  className={`break-words font-semibold ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {addedBy || "Unknown"}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </p>

                <p
                  className={`font-semibold ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {book.category || "N/A"}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total Copies
                </p>

                <p
                  className={`font-bold ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {totalCopies} Copies
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Available Copies
                </p>

                <p
                  className={`font-bold ${
                    isDark ? "text-emerald-300" : "text-[#234C3D]"
                  }`}
                >
                  {availableCopies} Copies
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2
                className={`mb-3 text-lg font-bold ${
                  isDark ? "text-white" : "text-[#234C3D]"
                }`}
              >
                About This Book
              </h2>

              <p
                className={`text-sm leading-7 sm:text-base ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {book.description ||
                  "No description available for this book."}
              </p>
            </div>

            {/* Borrow Button */}
            {user ? (
              <button
                type="button"
                onClick={() => setShowBorrowForm((previous) => !previous)}
                disabled={availableCopies <= 0}
                className="w-full rounded-xl bg-[#234C3D] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#234C3D]/20 transition hover:bg-[#18392D] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {availableCopies <= 0
                  ? "Currently Unavailable"
                  : showBorrowForm
                    ? "Close Borrow Form"
                    : "Borrow Book"}
              </button>
            ) : (
              <p className="rounded-xl bg-amber-50 p-4 text-center text-sm text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                Please login to borrow this book.
              </p>
            )}

            {/* Borrow Form */}
            {showBorrowForm && user && (
              <form
                onSubmit={handleBorrow}
                className={`mt-6 space-y-5 rounded-2xl border p-5 sm:p-6 ${
                  isDark
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-[#234C3D]/10 bg-[#F8F6F0]"
                }`}
              >
                <div>
                  <h2
                    className={`text-xl font-bold ${
                      isDark ? "text-white" : "text-[#234C3D]"
                    }`}
                  >
                    Borrow Book Form
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Fill in your borrowing information.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={user.name || ""}
                    readOnly
                    className="w-full rounded-xl border border-[#234C3D]/15 bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none dark:border-white/10 dark:bg-[#202925] dark:text-gray-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="w-full rounded-xl border border-[#234C3D]/15 bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none dark:border-white/10 dark:bg-[#202925] dark:text-gray-300"
                  />
                </div>

                {/* Borrow Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Borrow Date
                  </label>

                  <input
                    type="date"
                    value={borrowDate}
                    readOnly
                    required
                    className="w-full rounded-xl border border-[#234C3D]/15 bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none dark:border-white/10 dark:bg-[#202925] dark:text-gray-300"
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Current date is automatically selected.
                  </p>
                </div>

                {/* Return Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Return Date
                  </label>

                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={borrowDate}
                    required
                    className="w-full rounded-xl border border-[#234C3D]/20 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#234C3D] focus:ring-2 focus:ring-[#234C3D]/10 dark:border-white/10 dark:bg-[#202925] dark:text-white"
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Choose your preferred return date.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={borrowing || !borrowDate || !returnDate}
                  className="w-full rounded-xl bg-[#234C3D] px-6 py-3.5 font-bold text-white transition hover:bg-[#18392D] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {borrowing ? "Processing..." : "Confirm Borrow"}
                </button>
              </form>
            )}

            {/* View Information */}
            <div
              className={`mt-6 rounded-xl border p-4 ${
                isDark
                  ? "border-emerald-400/20 bg-emerald-400/5"
                  : "border-[#234C3D]/10 bg-green-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>

                <div>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-emerald-300" : "text-[#234C3D]"
                    }`}
                  >
                    Book Details
                  </p>

                  <p
                    className={`mt-1 text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Explore the book information and enjoy your reading journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        main {
          animation: fadeIn 0.6s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          main,
          main * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
};

export default BookDetailsPage;

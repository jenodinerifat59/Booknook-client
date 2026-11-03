
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'https://booknook-server-5hv3.onrender.com';

const getLocalDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// Animation Variants
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85, x: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const formVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -15,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -15,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const BookDetailsPage = ({ book, user }) => {
  const router = useRouter();

  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Set Current Date
  useEffect(() => {
    setBorrowDate(getLocalDate());
  }, []);

  if (!book) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-[#F8F6F0] px-4"
      >
        <p className="text-lg font-semibold text-[#234C3D]">
          Book not found!
        </p>
      </motion.div>
    );
  }

  const availableCopies = Number(book.availableCopies ?? 0);
  const totalCopies = Number(book.totalCopies ?? 0);

  const addedBy =
    typeof book.addedBy === 'object'
      ? book.addedBy?.name || book.addedBy?.email
      : book.addedBy;

  // Borrow Book
  const handleBorrow = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login first!');
      return;
    }

    if (!returnDate) {
      toast.error('Please select a return date!');
      return;
    }

    if (returnDate <= borrowDate) {
      toast.error('Return date must be after borrow date!');
      return;
    }

    if (availableCopies <= 0) {
      toast.error('This book is currently unavailable!');
      return;
    }

    try {
      setBorrowing(true);

      const res = await fetch(`${API_URL}/borrows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: book._id,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          bookTitle: book.title,
          bookImage: book.coverImage || '',
          borrowDate: new Date(`${borrowDate}T00:00:00`),
          returnDate: new Date(`${returnDate}T23:59:59`),
          status: 'borrowed',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to borrow book');
      }

      toast.success('Book borrowed successfully!');

      setShowBorrowForm(false);
      setReturnDate('');

      router.refresh();
    } catch (error) {
      console.error('Borrow Error:', error);
      toast.error(error.message || 'Something went wrong!');
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="relative isolate min-h-screen overflow-hidden bg-[#F8F6F0] px-4 py-10 sm:py-14"
    >
      {/* Background Decoration */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute left-0 top-40 -z-10 h-72 w-72 rounded-full bg-[#234C3D]/10 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <motion.div
          variants={itemVariants}
          className="mb-6 text-sm text-gray-500"
        >
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>All Books</span>
          <span className="mx-2">/</span>
          <span className="font-semibold text-[#234C3D]">
            Book Details
          </span>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className="grid overflow-hidden rounded-3xl border border-[#234C3D]/10 bg-white shadow-xl shadow-[#234C3D]/10 transition-shadow duration-500 hover:shadow-2xl md:grid-cols-2"
        >

          {/* Book Cover */}
          <motion.div
            variants={imageVariants}
            className="group relative flex items-center justify-center overflow-hidden p-6 sm:p-10 md:p-12"
          >
            <div className="absolute inset-0 bg-[#F1F0E8]" />

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute left-8 top-8 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl"
            />

            <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full bg-green-500/10 blur-2xl" />

            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-sm"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative mx-auto aspect-[3/4] max-h-[480px] w-full overflow-hidden rounded-2xl bg-gray-200 shadow-2xl"
              >
                {book.coverImage ? (
                  <Image
                    src={book.coverImage}
                    alt={book.title || 'Book cover'}
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
              </motion.div>

              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-[#234C3D]/20" />
            </motion.div>
          </motion.div>

          {/* Book Information */}
          <motion.div
            variants={pageVariants}
            className="flex flex-col justify-center p-6 sm:p-10 md:p-12"
          >

            {/* Category & Availability */}
            <motion.div
              variants={itemVariants}
              className="mb-5 flex flex-wrap items-center gap-3"
            >
              <motion.span
                whileHover={{ scale: 1.06 }}
                className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-green-800"
              >
                {book.category || 'Uncategorized'}
              </motion.span>

              <motion.span
                whileHover={{ scale: 1.06 }}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                  availableCopies > 0
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    availableCopies > 0
                      ? 'animate-pulse bg-green-500'
                      : 'bg-red-500'
                  }`}
                />

                {availableCopies > 0 ? 'Available' : 'Out of Stock'}
              </motion.span>

              <motion.span
                whileHover={{ scale: 1.06 }}
                className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
              >
                Book Details
              </motion.span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#234C3D] sm:text-4xl"
            >
              {book.title}
            </motion.h1>

            {/* Author */}
            <motion.p
              variants={itemVariants}
              className="mb-6 text-lg text-gray-600"
            >
              By{' '}
              <span className="font-semibold text-[#234C3D]">
                {book.author?.trim() || 'Unknown Author'}
              </span>
            </motion.p>

            {/* Book Details Cards */}
            <motion.div
              variants={itemVariants}
              className="mb-6 grid grid-cols-2 gap-4 rounded-2xl border border-[#234C3D]/10 bg-[#F8F6F0] p-4 sm:p-5"
            >
              {[
                {
                  label: 'Added By',
                  value: addedBy || 'Unknown',
                },
                {
                  label: 'Category',
                  value: book.category || 'N/A',
                },
                {
                  label: 'Total Copies',
                  value: `${totalCopies} Copies`,
                },
                {
                  label: 'Available Copies',
                  value: `${availableCopies} Copies`,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="min-w-0"
                >
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                    {item.label}
                  </p>

                  <p
                    className={`break-words font-semibold ${
                      item.label === 'Available Copies'
                        ? 'text-[#234C3D]'
                        : 'text-gray-800'
                    }`}
                  >
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <h2 className="mb-3 text-lg font-bold text-[#234C3D]">
                About This Book
              </h2>

              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                {book.description ||
                  'No description available for this book.'}
              </p>
            </motion.div>

            {/* Borrow Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {user ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowBorrowForm((previous) => !previous)
                  }
                  disabled={availableCopies <= 0}
                  className="w-full rounded-xl bg-[#234C3D] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#234C3D]/20 transition hover:bg-[#18392D] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {availableCopies <= 0
                    ? 'Currently Unavailable'
                    : showBorrowForm
                      ? 'Close Borrow Form'
                      : 'Borrow Book'}
                </button>
              ) : (
                <p className="rounded-xl bg-amber-50 p-4 text-center text-sm text-amber-700">
                  Please login to borrow this book.
                </p>
              )}
            </motion.div>

            {/* Borrow Form */}
            <AnimatePresence initial={false}>
              {showBorrowForm && user && (
                <motion.form
                  key="borrow-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleBorrow}
                  className="mt-6 space-y-5 overflow-hidden rounded-2xl border border-[#234C3D]/10 bg-[#F8F6F0] p-5 sm:p-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-[#234C3D]">
                      Borrow Book Form
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Fill in your borrowing information.
                    </p>
                  </div>

                  {/* Name */}
                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={user.name || ''}
                      readOnly
                      className="w-full rounded-xl border border-[#234C3D]/15 bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={user.email || ''}
                      readOnly
                      className="w-full rounded-xl border border-[#234C3D]/15 bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none"
                    />
                  </motion.div>

                  {/* Borrow Date */}
                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                      Borrow Date
                    </label>

                    <input
                      type="date"
                      value={borrowDate}
                      readOnly
                      required
                      className="w-full rounded-xl border border-[#234C3D]/15 bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none"
                    />

                    <p className="mt-1 text-xs text-gray-500">
                      Current date is automatically selected.
                    </p>
                  </motion.div>

                  {/* Return Date */}
                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                      Return Date
                    </label>

                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={borrowDate}
                      required
                      className="w-full rounded-xl border border-[#234C3D]/20 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#234C3D] focus:ring-2 focus:ring-[#234C3D]/10"
                    />

                    <p className="mt-1 text-xs text-gray-500">
                      Choose your preferred return date.
                    </p>
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      type="submit"
                      disabled={
                        borrowing || !borrowDate || !returnDate
                      }
                      className="w-full rounded-xl bg-[#234C3D] px-6 py-3.5 font-bold text-white transition hover:bg-[#18392D] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {borrowing
                        ? 'Processing...'
                        : 'Confirm Borrow'}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Information */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="mt-6 rounded-xl border border-[#234C3D]/10 bg-green-50 p-4"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="text-2xl"
                >
                  📚
                </motion.span>

                <div>
                  <p className="font-semibold text-[#234C3D]">
                    Book Details
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Explore the book information and enjoy your reading journey.
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default BookDetailsPage;

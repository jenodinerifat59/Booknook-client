
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

export default function BookCard({ book }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-500 hover:border-emerald-700/30 hover:shadow-xl hover:shadow-emerald-950/10"
    >
      {/* Book Cover */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        {book.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img
            src={book.coverImage}
            alt={book.title || 'Book cover'}
            initial={{ scale: 1.1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="h-full w-full object-cover"
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
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />
      </div>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-5">
        <motion.h3
          variants={cardVariants}
          className="line-clamp-1 text-lg font-bold text-[#18392D] transition-colors duration-300 group-hover:text-emerald-700"
        >
          {book.title}
        </motion.h3>

        <p className="mt-1 text-sm text-gray-600">
          by {book.author}
        </p>

        {/* Category */}
        <motion.span
          whileHover={{ scale: 1.07 }}
          className="mt-4 w-fit rounded-full border border-emerald-700/20 bg-emerald-700/10 px-3 py-1.5 text-xs font-semibold text-emerald-700"
        >
          {book.category}
        </motion.span>

        {/* View Details Button */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-auto pt-6"
        >
          <Link
            href={`/books/${book._id}`}
            className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#234C3D] px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-emerald-900/15 transition-all duration-300 hover:bg-[#19392D] hover:shadow-lg"
          >
            View Details

            <motion.span
              className="inline-block"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

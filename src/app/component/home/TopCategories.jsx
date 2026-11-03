'use client'
import Link from "next/link";

const categories = [
  { name: "Fiction", emoji: "📖", description: "Explore amazing stories" },
  { name: "Science", emoji: "🔬", description: "Discover the universe" },
  { name: "History", emoji: "🏛️", description: "Explore the past" },
  { name: "Technology", emoji: "💻", description: "Discover innovation" },
  { name: "Fantasy", emoji: "🐉", description: "Enter magical worlds" },
  { name: "Biography", emoji: "👤", description: "Read inspiring lives" },
];

export default function TopCategories() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F8F6F0] py-20 transition-colors duration-500 dark:bg-[#0D1110]">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-lime-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Explore Collections
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#18392D] dark:text-white sm:text-4xl lg:text-5xl">
            Top <span className="text-emerald-600 dark:text-emerald-400">Categories</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
            Find books that match your interests. Choose a category
            and discover something wonderful to read.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-700 to-lime-500" />
        </div>

        {/* Category Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.name}
              href={`/books?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-600/50 hover:shadow-xl hover:shadow-emerald-900/10 dark:border-gray-700 dark:bg-[#171D1B]/90 dark:hover:border-emerald-500/50"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-lime-500/0 transition-all duration-300 group-hover:from-emerald-500/10 group-hover:to-lime-500/10" />

              {/* Emoji */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F5EF] text-4xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 dark:bg-[#24352D]">
                {cat.emoji}
              </div>

              {/* Category Info */}
              <h3 className="relative mt-5 text-base font-bold text-gray-800 transition-colors group-hover:text-emerald-700 dark:text-gray-100 dark:group-hover:text-emerald-400">
                {cat.name}
              </h3>

              <p className="relative mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                {cat.description}
              </p>

              <span className="relative mt-4 text-sm font-semibold text-emerald-700 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:text-emerald-400">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

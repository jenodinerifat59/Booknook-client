
import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Borrows", href: "/my-borrows" },
];

const categories = [
  "Fiction",
  "Science",
  "History",
  "Technology",
  "Fantasy",
  "Biography",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-[#F8F6F0] pt-16 transition-colors duration-500 dark:border-gray-800 dark:bg-[#0D1110]">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-lime-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#234C3D] text-2xl shadow-lg shadow-emerald-900/20">
                📚
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-[#234C3D] dark:text-white">
                Book<span className="text-emerald-600 dark:text-emerald-400">Nook</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-600 dark:text-gray-400">
              Your cozy corner for discovering, sharing, and borrowing
              amazing books. Read more, explore more, and grow together.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-sm font-bold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:bg-[#234C3D] hover:text-white dark:border-gray-700 dark:text-gray-300"
              >
                f
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-sm font-bold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:bg-[#234C3D] hover:text-white dark:border-gray-700 dark:text-gray-300"
              >
                ig
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-sm font-bold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:bg-[#234C3D] hover:text-white dark:border-gray-700 dark:text-gray-300"
              >
                in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-600 transition-colors duration-300 hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Explore Categories
            </h3>

            <ul className="mt-6 space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/books?category=${encodeURIComponent(category)}`}
                    className="group inline-flex items-center gap-2 text-sm text-gray-600 transition-colors duration-300 hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Get in Touch
            </h3>

            <p className="mt-6 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Have questions or suggestions? We would love to hear from you.
            </p>

            <div className="mt-5 space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-center gap-3">
                <span className="text-lg">✉️</span>
                <a
                  href="mailto:support@booknook.com"
                  className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  support@booknook.com
                </a>
              </p>

              <p className="flex items-center gap-3">
                <span className="text-lg">📍</span>
                <span>Read Anywhere, Anytime</span>
              </p>
            </div>

            <Link
              href="/books"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#234C3D] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#19392D] hover:shadow-lg"
            >
              Explore Books <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-6 text-center dark:border-gray-800 sm:flex-row sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 BookNook. All rights reserved.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made with <span className="text-red-500">♥</span> for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}

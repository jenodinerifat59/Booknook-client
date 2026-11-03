
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

function NavbarContent() {
  const pathname = usePathname() || "/";
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const links = user
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  const linkClass = (href) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
      pathname === href
        ? "bg-[#234C3D]/10 text-[#234C3D]"
        : "text-gray-600 hover:bg-[#E8EFE5] hover:text-[#234C3D]"
    }`;

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setDropdownOpen(false);
      setMenuOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E5DB] bg-[#F8F6F0]/95 text-[#234C3D] backdrop-blur-md transition-all duration-500 ease-in-out">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/"
          className="group z-10 flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#234C3D] shadow-md shadow-[#234C3D]/20 transition-all duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 7v14" />
              <path d="M3 18V5a2 2 0 0 1 2-2h4a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3H5a2 2 0 0 0-2 0Z" />
              <path d="M21 18V5a2 2 0 0 0-2-2h-4a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3h4a2 2 0 0 1 2 0Z" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-[0.12em] text-[#234C3D] sm:text-lg">
              BOOKNOOK
            </span>

            <span className="text-[9px] font-semibold tracking-[0.3em] text-[#829482]">
              LIBRARY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="z-10 ml-auto flex items-center gap-2 sm:gap-3">

          {/* Authentication */}
          {isPending ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#234C3D]/20 bg-[#234C3D]/10 font-semibold text-[#234C3D] transition hover:scale-105"
                aria-label="Open user menu"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </span>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 animate-fadeIn rounded-xl border border-[#E7E5DB] bg-white py-2 shadow-xl">
                  <p className="truncate px-4 py-2 text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>

                  <hr className="my-1 border-gray-100" />

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                  >
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-[#234C3D] px-3 py-2 text-sm font-medium text-[#234C3D] transition hover:bg-[#234C3D]/10 sm:px-4"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[#234C3D] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#18392D] sm:px-4"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-[#234C3D] transition hover:bg-[#E8EFE5] md:hidden"
            aria-label="Toggle mobile menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <ul className="animate-fadeIn space-y-1 border-t border-[#E7E5DB] px-4 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block ${linkClass(link.href)}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 h-16 border-b border-[#E7E5DB] bg-[#F8F6F0]" />
      }
    >
      <NavbarContent />
    </Suspense>
  );
}

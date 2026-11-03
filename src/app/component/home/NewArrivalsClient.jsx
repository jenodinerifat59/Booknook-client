
"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function NewArrivalsClient({ children }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section
      ref={sectionRef}
      className={`relative isolate overflow-hidden py-20 transition-colors duration-500 ${
        isDark ? "bg-[#0D1110]" : "bg-[#F8F6F0]"
      }`}
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl animate-float" />

      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-lime-500/10 blur-3xl animate-float-delayed" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div
          className={`mx-auto max-w-2xl text-center ${
            isVisible ? "reveal-up" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Fresh Collection
          </span>

          <h2
            className={`mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
              isDark ? "text-white" : "text-[#18392D]"
            }`}
          >
            New{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Arrivals
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-lg text-sm leading-7 sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Discover the latest books added by our readers.
            Find your next favorite story and start reading today.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-700 to-lime-500" />
        </div>

        {/* Books Animation */}
        <div
          className={`mt-4 ${
            isVisible ? "reveal-up reveal-delay" : "opacity-0 translate-y-10"
          }`}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        .reveal-up {
          animation: fadeInUp 0.8s ease-out both;
        }

        .reveal-delay {
          animation-delay: 0.25s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-25px);
          }
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 9s ease-in-out infinite reverse;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-up,
          .animate-float,
          .animate-float-delayed {
            animation: none;
          }

          .opacity-0 {
            opacity: 1;
          }

          .translate-y-10 {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

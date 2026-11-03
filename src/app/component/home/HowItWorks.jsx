
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const steps = [
  {
    number: '01',
    title: 'Create an Account',
    text: 'Register for free and set up your reader profile in a minute.',
    icon: '👤',
  },
  {
    number: '02',
    title: 'Find a Book',
    text: 'Browse the collection and open any book to see its details.',
    icon: '🔍',
  },
  {
    number: '03',
    title: 'Borrow and Enjoy',
    text: 'Borrow with one click and track everything on My Borrows.',
    icon: '📚',
  },
];

export default function HowItWorks() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <section
      className={`relative overflow-hidden px-4 py-16 transition-colors duration-500 sm:py-20 ${
        isDark ? 'bg-[#0D1110]' : 'bg-[#F8F6F0]'
      }`}
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#234C3D]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`mb-4 inline-block rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] ${
              isDark
                ? 'bg-emerald-400/10 text-emerald-300'
                : 'bg-[#234C3D]/10 text-[#234C3D]'
            }`}
          >
            SIMPLE & EASY
          </span>

          <h2
            className={`text-3xl font-extrabold tracking-tight transition-colors duration-500 sm:text-4xl md:text-5xl ${
              isDark ? 'text-white' : 'text-[#234C3D]'
            }`}
          >
            How Borrowing Works
          </h2>

          <p
            className={`mt-4 text-sm leading-7 sm:text-base ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Start your reading journey with BookNook in just three simple
            steps. Discover, borrow, and enjoy your favorite books.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group relative rounded-2xl border p-7 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-9 ${
                isDark
                  ? 'border-white/10 bg-[#171D1B] shadow-black/20 hover:border-emerald-400/30 hover:shadow-emerald-900/10'
                  : 'border-[#234C3D]/10 bg-white shadow-[#234C3D]/5 hover:border-[#234C3D]/30 hover:shadow-[#234C3D]/15'
              }`}
              style={{
                animation: `stepFade 0.7s ease-out ${index * 0.15}s both`,
              }}
            >
              {/* Number Badge */}
              <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#234C3D] to-[#4A8065] text-2xl font-extrabold text-white shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                {step.number}

                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-400 text-sm text-[#234C3D]">
                  ✓
                </span>
              </div>

              {/* Icon */}
              <div className="mb-4 text-4xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">
                {step.icon}
              </div>

              {/* Title */}
              <h3
                className={`text-xl font-bold transition-colors duration-300 ${
                  isDark
                    ? 'text-white group-hover:text-emerald-300'
                    : 'text-[#234C3D] group-hover:text-emerald-700'
                }`}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className={`mt-3 text-sm leading-7 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {step.text}
              </p>

              {/* Bottom Decoration */}
              <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-[#234C3D] to-emerald-400 transition-all duration-500 group-hover:w-24" />

              {/* Step Connector */}
              {index !== steps.length - 1 && (
                <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-2xl font-light text-emerald-500/50 md:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div
          className={`mt-10 text-center text-sm font-medium ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <span className="text-emerald-500">✦</span> Your next favorite book
          is just a few clicks away!
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes stepFade {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          section *,
          section *::before,
          section *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}


'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    subtitle: 'WELCOME TO BOOKNOOK',
    title: 'Discover Your Next Great Read',
    text: 'Explore thousands of books across different genres and find your next favorite story.',
    button: 'Browse Books',
    link: '/books',
    icon: '📚',
    bg: 'from-[#234C3D] via-[#2E6650] to-[#173A2D]',
  },
  {
    subtitle: 'SHARE YOUR KNOWLEDGE',
    title: 'Share Your Own Books',
    text: 'Add books from your personal collection and give other readers a chance to enjoy them.',
    button: 'Add Your Book',
    link: '/add-book',
    icon: '📖',
    bg: 'from-[#245B4A] via-[#367B62] to-[#193E32]',
  },
  {
    subtitle: 'YOUR READING JOURNEY',
    title: 'Borrow Today, Read Tonight',
    text: 'Discover, borrow, and manage your favorite books with a simple and friendly library experience.',
    button: 'Explore Library',
    link: '/books',
    icon: '✨',
    bg: 'from-[#315E4A] via-[#477C5D] to-[#1B4031]',
  },
];

export default function HeroSlider() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <section
      className={`relative overflow-hidden px-3 py-6 transition-colors duration-500 sm:px-6 sm:py-10 ${
        isDark ? 'bg-[#0D1110]' : 'bg-[#F8F6F0]'
      }`}
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-6 text-center">
          <span
            className={`mb-3 inline-block rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] ${
              isDark
                ? 'bg-emerald-400/10 text-emerald-300'
                : 'bg-[#234C3D]/10 text-[#234C3D]'
            }`}
          >
            YOUR DIGITAL LIBRARY
          </span>

          <h2
            className={`text-2xl font-extrabold sm:text-3xl md:text-4xl ${
              isDark ? 'text-white' : 'text-[#234C3D]'
            }`}
          >
            A World of Books Awaits
          </h2>

          <p
            className={`mx-auto mt-3 max-w-xl text-sm sm:text-base ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Discover stories, explore knowledge, and enjoy reading with BookNook.
          </p>
        </div>

        {/* Slider */}
        <div
          className={`hero-slider group relative overflow-hidden rounded-3xl border shadow-xl transition-all duration-500 hover:shadow-2xl ${
            isDark
              ? 'border-white/10 shadow-black/40'
              : 'border-[#234C3D]/10 shadow-[#234C3D]/15'
          }`}
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.hero-next',
              prevEl: '.hero-prev',
            }}
            loop
            speed={900}
            className="h-[400px] sm:h-[450px] lg:h-[500px]"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.title}>
                <div
                  className={`relative flex h-full items-center overflow-hidden bg-gradient-to-br ${slide.bg} px-6 py-10 text-white sm:px-12 md:px-16 lg:px-24`}
                >
                  {/* Decorative Background */}
                  <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10" />

                  <div className="pointer-events-none absolute -right-10 -top-14 h-60 w-60 rounded-full border border-white/10" />

                  <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

                  <div className="relative z-10 grid w-full items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">

                    {/* Slide Content */}
                    <div className="animate-[heroFade_0.9s_ease-out] text-center md:text-left">
                      <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[0.2em] backdrop-blur-md sm:text-xs">
                        {slide.subtitle}
                      </span>

                      <h1 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:mx-0 md:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>

                      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base md:mx-0 md:text-lg">
                        {slide.text}
                      </p>

                      <Link
                        href={slide.link}
                        className="group/button relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#F8F6F0] px-7 py-3.5 font-bold text-[#234C3D] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl active:scale-95"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />

                        <span className="relative">{slide.button}</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="relative h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    {/* Decorative Book Icon */}
                    <div className="hidden items-center justify-center md:flex">
                      <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md transition-transform duration-700 hover:rotate-6 hover:scale-105 lg:h-64 lg:w-64">
                        <div className="absolute inset-4 rounded-full border border-white/20" />

                        <span className="animate-[float_4s_ease-in-out_infinite] text-8xl lg:text-9xl">
                          {slide.icon}
                        </span>

                        <div className="absolute -right-3 top-8 h-5 w-5 animate-pulse rounded-full bg-white/70" />

                        <div className="absolute -bottom-2 left-10 h-4 w-4 animate-pulse rounded-full bg-emerald-200" />
                      </div>
                    </div>
                  </div>

                  {/* Slide Number */}
                  <div className="absolute bottom-7 right-8 hidden text-sm font-semibold tracking-widest text-white/60 sm:block">
                    0{index + 1} / 0{slides.length}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button
            type="button"
            aria-label="Previous slide"
            className="hero-prev absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#234C3D] group-hover:opacity-100 sm:left-6 sm:h-12 sm:w-12"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next slide"
            className="hero-next absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#234C3D] group-hover:opacity-100 sm:right-6 sm:h-12 sm:w-12"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Bottom Info */}
        <div
          className={`mt-5 flex flex-wrap items-center justify-center gap-3 text-center text-xs sm:gap-6 sm:text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <span>📚 Explore Books</span>
          <span className="hidden sm:inline">•</span>
          <span>🤝 Share Knowledge</span>
          <span className="hidden sm:inline">•</span>
          <span>✨ Enjoy Reading</span>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .hero-slider .swiper-pagination {
          bottom: 18px !important;
        }

        .hero-slider .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .hero-slider .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 10px;
          opacity: 1;
        }

        @keyframes heroFade {
          from {
            opacity: 0;
            transform: translateY(25px);
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
            transform: translateY(-12px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slider *,
          .hero-slider *::before,
          .hero-slider *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

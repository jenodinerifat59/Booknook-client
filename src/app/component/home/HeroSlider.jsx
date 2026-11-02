"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Discover Your Next Great Read",
    text: "Thousands of books across every genre, ready to borrow in a few clicks.",
    bg: "from-indigo-600 to-purple-700",
  },
  {
    title: "Share Your Own Books",
    text: "Add books from your shelf and let other readers enjoy them too.",
    bg: "from-emerald-600 to-teal-700",
  },
  {
    title: "Borrow Today, Read Tonight",
    text: "Simple borrowing, easy tracking, and no late-night library trips.",
    bg: "from-rose-600 to-orange-600",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="h-[420px] [--swiper-theme-color:#ffffff]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div
            className={`flex h-full flex-col items-center justify-center bg-gradient-to-r ${slide.bg} px-6 text-center text-white`}
          >
            <h2 className="max-w-3xl text-3xl font-bold md:text-5xl">
              {slide.title}
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/90 md:text-lg">
              {slide.text}
            </p>
            <Link
              href="/books"
              className="mt-8 rounded-md bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Browse Books
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
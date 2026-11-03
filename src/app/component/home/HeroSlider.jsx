
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { authClient } from '@/lib/auth-client';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    subtitle: 'WELCOME TO BOOKNOOK',
    title: 'Discover Your Next',
    highlight: 'Favorite Book',
    description:
      'Explore thousands of books, discover amazing stories, and build your personal library with BookNook.',
    buttonText: 'Explore Books',
    buttonLink: '/books',
    secondaryText: 'Learn More',
    secondaryLink: '/about',
    icon: '📚',
    bg: 'bg-blue-50',
  },
  {
    subtitle: 'YOUR PERSONAL LIBRARY',
    title: 'Every Book Has',
    highlight: 'A Story to Tell',
    description:
      'Find your favorite books, borrow new ones, and keep track of your reading journey in one place.',
    buttonText: 'Browse Library',
    buttonLink: '/books',
    secondaryText: 'My Borrowed Books',
    secondaryLink: '/my-borrowed-books',
    icon: '📖',
    bg: 'bg-orange-50',
  },
  {
    subtitle: 'READ. LEARN. GROW.',
    title: 'Make Reading',
    highlight: 'Your Daily Habit',
    description:
      'Turn every page into a new experience. Start exploring our collection and discover something wonderful.',
    buttonText: 'Get Started',
    buttonLink: '/books',
    secondaryText: 'Join BookNook',
    secondaryLink: '/register',
    icon: '✨',
    bg: 'bg-green-50',
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.9,
      ease: 'easeOut',
    },
  },
};

export default function HeroSlider() {
  const [mounted, setMounted] = useState(false);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Session changes will remount Swiper
  const sliderKey = session?.user?.id || 'guest';

  return (
    <section className="w-full overflow-hidden bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl shadow-sm">

          {!mounted ? (
            // Loading Placeholder
            <div className="flex h-[400px] animate-pulse items-center justify-center bg-blue-50 sm:h-[450px] lg:h-[500px]">
              <div className="text-center">
                <div className="mb-4 text-6xl">📚</div>
                <p className="font-semibold text-gray-500">
                  Loading BookNook...
                </p>
              </div>
            </div>
          ) : (
            <Swiper
              key={sliderKey}
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
              speed={1000}
              className="h-[400px] sm:h-[450px] lg:h-[500px]"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  {({ isActive }) => (
                    <div
                      className={`relative flex h-full items-center ${slide.bg} px-6 py-10 sm:px-12 lg:px-20`}
                    >
                      <div className="grid w-full items-center gap-8 md:grid-cols-2">

                        {/* Text Content */}
                        <div className="z-10">
                          <motion.span
                            variants={textVariants}
                            initial="hidden"
                            animate={isActive ? 'visible' : 'hidden'}
                            className="mb-5 inline-block rounded-full bg-white px-4 py-2 text-xs font-bold tracking-widest text-blue-700 shadow-sm"
                          >
                            {slide.subtitle}
                          </motion.span>

                          <motion.h1
                            variants={textVariants}
                            initial="hidden"
                            animate={isActive ? 'visible' : 'hidden'}
                            transition={{ delay: 0.15 }}
                            className="mb-5 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl"
                          >
                            {slide.title}{' '}
                            <span className="text-blue-600">
                              {slide.highlight}
                            </span>
                          </motion.h1>

                          <motion.p
                            variants={textVariants}
                            initial="hidden"
                            animate={isActive ? 'visible' : 'hidden'}
                            transition={{ delay: 0.3 }}
                            className="mb-8 max-w-lg text-sm leading-7 text-gray-600 sm:text-base"
                          >
                            {slide.description}
                          </motion.p>

                          <motion.div
                            variants={textVariants}
                            initial="hidden"
                            animate={isActive ? 'visible' : 'hidden'}
                            transition={{ delay: 0.45 }}
                            className="flex flex-wrap gap-3"
                          >
                            <motion.div
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.96 }}
                            >
                              <Link
                                href={slide.buttonLink}
                                className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
                              >
                                {slide.buttonText}
                              </Link>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.96 }}
                            >
                              <Link
                                href={slide.secondaryLink}
                                className="inline-block rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
                              >
                                {slide.secondaryText}
                              </Link>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Animated Illustration */}
                        <motion.div
                          variants={imageVariants}
                          initial="hidden"
                          animate={isActive ? 'visible' : 'hidden'}
                          className="hidden items-center justify-center md:flex"
                        >
                          <motion.div
                            animate={{
                              y: [0, -15, 0],
                              rotate: [0, 3, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className="flex h-64 w-64 items-center justify-center rounded-full bg-white shadow-xl lg:h-80 lg:w-80"
                          >
                            <span className="text-8xl lg:text-9xl">
                              {slide.icon}
                            </span>
                          </motion.div>
                        </motion.div>

                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Previous and Next Buttons */}
          {mounted && (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                className="hero-prev absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition hover:scale-110 hover:bg-blue-600 hover:text-white sm:left-5 sm:h-12 sm:w-12"
              >
                ❮
              </button>

              <button
                type="button"
                aria-label="Next slide"
                className="hero-next absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition hover:scale-110 hover:bg-blue-600 hover:text-white sm:right-5 sm:h-12 sm:w-12"
              >
                ❯
              </button>
            </>
          )}

        </div>
      </div>
    </section>
  );
}

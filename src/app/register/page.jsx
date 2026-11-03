
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name.trim() || !email.trim() || !password) {
      return toast.error('Please fill in all fields');
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    if (!/[A-Z]/.test(password)) {
      return toast.error('Password must contain an uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      return toast.error('Password must contain a lowercase letter');
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || 'Registration failed');
        return;
      }

      toast.success('Account created successfully!');

      router.push('/');
      router.refresh();

    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F6F0] px-4 py-16 transition-colors duration-500 dark:bg-[#0D1110]">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full bg-lime-500/10 blur-3xl" />

      {/* Register Card */}
      <div className="w-full max-w-md animate-[fadeInUp_0.7s_ease-out_both]">

        <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white/90 p-7 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl dark:border-gray-700 dark:bg-[#171D1B]/95 sm:p-9">

          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#234C3D] text-2xl shadow-lg shadow-emerald-900/20">
              📚
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-[#234C3D] dark:text-white">
              Book<span className="text-emerald-600 dark:text-emerald-400">Nook</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-700/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Join Our Community
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Create Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Create your BookNook account and start your reading journey.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-[#0D1110] dark:text-white dark:focus:border-emerald-500 dark:focus:bg-[#111815]"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-[#0D1110] dark:text-white dark:focus:border-emerald-500 dark:focus:bg-[#111815]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10 dark:border-gray-700 dark:bg-[#0D1110] dark:text-white dark:focus:border-emerald-500 dark:focus:bg-[#111815]"
                required
              />

              <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Use at least 6 characters, including uppercase and lowercase letters.
              </p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#234C3D] py-3.5 font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#19392D] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create My Account
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-emerald-700 transition-colors hover:underline dark:text-emerald-400"
            >
              Login
            </Link>
          </p>

        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400"
          >
            ← Back to Home
          </Link>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
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
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default RegisterPage;
